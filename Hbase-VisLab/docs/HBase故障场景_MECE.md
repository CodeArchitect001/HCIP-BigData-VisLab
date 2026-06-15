# HBase 架构故障场景（MECE 分析）

> 基于 MECE（相互独立、完全穷尽）原则，从 HBase 架构组件维度拆分所有故障场景

---

## 一、故障场景总览（MECE 树）

```
HBase 架构故障场景
├── HMaster 故障
│   ├── Active HMaster 进程崩溃（正常故障转移）
│   ├── Active HMaster 网络分区（ZK 会话超时）
│   ├── 脑裂（Split-brain：两个 HMaster 都认为自己是 Active）
│   └── 所有 HMaster 同时故障（无备份可切换）
├── RegionServer 故障
│   ├── RegionServer 进程崩溃
│   ├── RegionServer 网络分区（ZK 失联但进程存活）
│   └── RegionServer GC 停顿 / OOM（假死）
├── ZooKeeper 故障
│   ├── ZK Leader 节点故障（选举新 Leader）
│   ├── ZK Follower 节点故障（Quorum 机制容忍）
│   ├── ZK 集群多数节点故障（服务不可用）
│   └── ZK 网络分区（脑裂）
├── HDFS 底层故障
│   ├── DataNode 故障（副本机制自动恢复）
│   ├── NameNode Active 故障（HA 切换）
│   └── HDFS 网络分区（读写异常）
└── 特殊故障
    ├── .META. 表 Region 故障（元数据不可访问）
    ├── WAL / HLog 损坏（数据丢失风险）
    └── Client 元数据缓存过期（读写路由错误）
```

---

## 二、各故障场景详解

### 2.1 HMaster 故障（核心场景）

#### 场景 2.1.1：Active HMaster 进程崩溃

**触发条件：**
- HMaster 进程被 kill / 崩溃 / 内存溢出

**处理流程：**
1. HMaster 的 ZK 会话（Ephemeral Node）超时消失
2. ZK 触发 watcher 通知所有 Standby HMaster
3. Standby HMaster 竞争创建锁节点，成功者成为新 Active
4. 新 Active HMaster 接管集群元数据管理

**影响：**
- 短暂中断（秒级），期间无法执行 DDL（建表/删表）
- 不影响现有数据读写（RegionServer 继续服务）

---

#### 场景 2.1.2：Active HMaster 网络分区（ZK 失联）

**触发条件：**
- HMaster 与 ZK 集群网络断开，但 HMaster 进程仍在运行

**处理流程：**
1. ZK 检测到会话超时（默认 40s）
2. ZK 删除 HMaster 的 Ephemeral Node
3. HMaster 发现自己不再是 Active，自动降级或退出
4. Standby HMaster 竞争成为新 Active

**风险：**
- 旧 Active 可能继续认为自己有效（需 fencing 机制）
- 可能导致短暂的元数据不一致

---

#### 场景 2.1.3：脑裂（Split-brain）

**触发条件：**
- 网络分区导致 Active HMaster 与 ZK 失联
- 同时 Standby 成为新 Active
- 旧 Active 进程仍在运行且未正确退出

**处理流程：**
1. ZK 负责唯一性保证（只有一个 HMaster 能创建锁节点）
2. 旧 Active 尝试操作 ZK 时失败，被迫退出
3. 依赖 fencing 机制（如 SSH 杀掉旧进程）

**风险：**
- 最严重的 HMaster 故障，可能导致元数据冲突
- 需要 ZK + fencing 双重保障

---

#### 场景 2.1.4：所有 HMaster 同时故障

**触发条件：**
- 没有配置 Standby HMaster，或所有 HMaster 同时宕机

**影响：**
- 无法执行 DDL 操作
- 不影响数据读写（RegionServer 独立运行）
- 新 RegionServer 无法加入集群
- Region 无法自动均衡和故障恢复

---

### 2.2 RegionServer 故障

#### 场景 2.2.1：RegionServer 进程崩溃

**处理流程：**
1. ZK 检测到 RegionServer 的 Ephemeral Node 消失
2. ZK 通知 HMaster
3. HMaster 将崩溃节点上的 Region 分配给其他 RegionServer
4. WAL 重放（Replay）恢复未刷写的数据

---

#### 场景 2.2.2：RegionServer 网络分区（ZK 失联）

**处理流程：**
1. ZK 会话超时后删除临时节点
2. HMaster 认为 RegionServer 已死
3. 将 Region 分配给其他节点
4. **风险**：原 RegionServer 可能继续服务，导致脑裂

**解决方案：**
- RegionServer 与 ZK 失联后自毁（自杀机制）
- 防止同时有两个节点服务同一个 Region

---

#### 场景 2.2.3：RegionServer GC 停顿 / OOM（假死）

**处理流程：**
1. GC 停顿超过 ZK 会话超时时间
2. ZK 删除临时节点，HMaster 触发重新分配
3. 原 RegionServer GC 恢复后发现 Region 已被移走
4. 自毁或重启

---

### 2.3 ZooKeeper 故障

#### 场景 2.3.1：ZK Leader 节点故障

**处理流程：**
1. Follower 检测到 Leader 失联
2. 触发 ZK Leader 选举（ZAB 协议）
3. 选举出新 Leader（需多数节点同意）
4. 服务恢复（秒级）

**影响：**
- 选举期间 ZK 不可用
- HBase 组件无法注册/发现
- 现有连接不受影响

---

#### 场景 2.3.2：ZK Follower 节点故障

**影响：**
- 不影响服务（Quorum 机制容忍少数节点故障）
- 降低集群容错能力

---

#### 场景 2.3.3：ZK 集群多数节点故障

**影响：**
- ZK 完全不可用
- HBase 无法执行任何需要协调的操作
- 现有 RegionServer 继续运行，但无法故障恢复
- 新节点无法加入

---

#### 场景 2.3.4：ZK 网络分区（脑裂）

**风险：**
- 分区后两边都可能形成自己的 Quorum
- 需要配置正确的 ZK 节点数量（奇数）避免双主

---

### 2.4 HDFS 底层故障

#### 场景 2.4.1：DataNode 故障

**处理流程：**
- HDFS 自动检测缺失副本
- 从其他 DataNode 复制副本到新的节点
- 不影响 HBase 读写（只要还有副本可用）

---

#### 场景 2.4.2：NameNode Active 故障

**处理流程：**
- HA 模式下 Standby NameNode 自动接管
- HBase 通过客户端重试恢复

---

### 2.5 特殊故障

#### 场景 2.5.1：.META. 表 Region 故障

**影响：**
- Client 无法定位 Region 位置
- 所有读写操作无法进行
- HBase 完全不可用

---

#### 场景 2.5.2：WAL / HLog 损坏

**影响：**
- RegionServer 故障时无法重放 WAL
- 未刷写到 HFile 的数据丢失
- 需要手动修复或忽略损坏的 WAL

---

#### 场景 2.5.3：Client 元数据缓存过期

**触发条件：**
- Client 缓存的 Region 位置已过时（Region 已迁移）

**处理流程：**
1. Client 向错误的 RegionServer 发送请求
2. 收到 NotServingRegionException
3. Client 重新查询 .META. 表获取新位置
4. 重试请求

---

## 三、可视化优先级建议

针对用户核心需求（ZK 与 HMaster 关系），建议按以下优先级制作动画：

| 优先级 | 场景 | 价值 |
|--------|------|------|
| **P0** | Active HMaster 崩溃 → Standby 接管 | 最核心，展示 ZK 选举机制 |
| **P0** | Active HMaster 网络分区 → ZK 超时 → 新 Active 选举 | 最核心，展示 ZK 会话超时机制 |
| **P1** | RegionServer 崩溃 → HMaster 通过 ZK 感知 → Region 重新分配 | 高频故障场景 |
| **P1** | RegionServer 网络分区 → 自杀机制 | 防止脑裂的关键设计 |
| **P2** | ZK Leader 故障 → ZAB 选举 | 底层依赖理解 |
| **P2** | Client 元数据过期 → 重新定位 | 帮助理解读写流程 |

---

*本文档为 HBase 故障场景的 MECE 分析，用于指导可视化动画设计。*
