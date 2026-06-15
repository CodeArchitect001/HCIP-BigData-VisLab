# HBase 知识点整理（HCIP-Big Data Developer V2.0）

> 来源：基于 HCIP-Big Data Developer V2.0 考试大纲、培训教材、实验手册提取  
> 提取日期：2026-06-08  
> 本文档从原 MECE 知识点文档中提取所有 HBase 相关内容，按逻辑结构重新组织。

---

## 一、HBase 总体定位

### 1.1 在四大模块中的位置

HBase 属于**第三模块：大数据实时检索场景化解决方案**（考试占比 30%）。

| 模块 | 考试占比 | 核心内容 |
|------|---------|---------|
| 第一模块 | 15% | 大数据基础概念、Hadoop 生态、FusionInsight MRS 产品方案 |
| 第二模块 | 25% | HDFS、Hive、SparkSQL、数据采集工具、数仓分层 |
| **第三模块** | **30%** | **HBase 主键查询**、ElasticSearch 全文检索、GES 图引擎、组件选型与联合检索 |
| 第四模块 | 30% | Flume、Kafka、Flink、Structured Streaming、Redis |

### 1.2 在 Hadoop 生态中的定位

| 组件 | 类别 | 功能描述 |
|------|------|---------|
| HBase | NoSQL 数据库 | 分布式列式存储数据库，**支持实时随机读写** |

HBase 位于**数据存储层**，为实时检索提供海量数据主键查询能力。

### 1.3 在 MRS 产品中的定位

在华为 FusionInsight MRS 解决方案中，HBase 属于**数据存储与 NoSQL** 类别的核心组件：

| 组件 | 功能 |
|------|------|
| **HBase** | **分布式列式 NoSQL 数据库** |
| Redis | 内存键值数据库 |
| GraphBase | 图数据库（支持图分析算法） |
| OBS/HDFS | 对象存储/分布式文件系统 |

---

## 二、HBase 核心定义与特性

### 2.1 基本定义

- **分布式 NoSQL 数据库**
- **四大核心特性**：高可靠、高性能、**面向列**、可伸缩

### 2.2 适用场景

- 海量数据存储（TB/PB 级）
- 高吞吐量读写
- **高效随机读取（Get/Scan）**
- 性能要求高且需要灵活伸缩
- 结构化和非结构化数据混合存储

### 2.3 不适用场景

- 需要完整 ACID 特性的场景（**不支持完整 ACID**）

### 2.4 实时检索中的功能定位

在实时检索解决方案架构中，HBase 负责**主键（RowKey）精确查询**：

| 组件 | 定位 | 负责查询类型 |
|------|------|------------|
| **HBase** | **海量数据主键查询** | **主键（RowKey）精确查询** |
| ElasticSearch (ES) | 实时搜索/文档检索 | 非主键查询、全文检索、条件检索 |
| GES (图引擎服务) | 图查询分析 | 图结构查询、关联分析 |

---

## 三、HBase 系统架构

### 3.1 架构概览

```
Client -> ZooKeeper -> HMaster -> HRegionServer -> HRegion -> Store(MemStore + StoreFile/HFile) -> HDFS
```

### 3.2 架构组件说明

| 组件 | 功能描述 |
|------|---------|
| **Client** | 客户端，提供访问接口 |
| **ZooKeeper** | 协调服务，管理集群状态、Master 选举 |
| **HMaster** | 主节点，管理元数据、Region 分配、负载均衡 |
| **HRegionServer** | 区域服务器，处理实际读写请求 |
| **HRegion** | 数据分片单元，按 RowKey 范围划分 |
| **Store** | Region 内的列族存储单元 |
| **MemStore** | 内存写缓存 |
| **StoreFile/HFile** | 磁盘数据文件 |
| **HDFS** | 底层分布式文件系统 |

---

## 四、HBase 存储模型

### 4.1 数据存储形式

**KeyValue 形式**：所有数据以 KeyValue 对存储。

### 4.2 KeyValue 核心要素

| 要素 | 说明 |
|------|------|
| **RowKey** | 行键，唯一标识一行数据 |
| **Column Family** | 列族，逻辑分组 |
| **Qualifier** | 列限定符（具体列名） |
| **Value** | 实际值 |
| **Timestamp** | 时间戳，支持多版本 |
| **Type** | 操作类型（Put/Delete 等） |

**多版本**：同一单元格可存储多个版本（按时间戳区分）。

---

## 五、HBase 缓存机制

| 缓存类型 | 作用 | 特点 |
|---------|------|------|
| **MemStore** | 写缓存 + 读缓存 | 内存中的写入缓冲区，达到阈值后刷写到 HFile |
| **BlockCache** | 文件块缓存 | 缓存 HFile 中的数据块，加速读操作 |

---

## 六、BloomFilter（布隆过滤器）

| 属性 | 说明 |
|------|------|
| **作用** | 优化随机读取（Get 场景），快速判断数据是否可能存在 |
| **特点** | 存在一定误判率（可能误判存在但不会误判不存在） |
| **存储位置** | 保存在 HFile 中 |
| **优势** | 减少不必要的磁盘 IO |

---

## 七、HBase 客户端命令（hbase shell）

| 命令 | 功能 |
|------|------|
| `hbase shell` | 进入 HBase 命令行客户端 |
| `list` | 列出所有表 |
| `create` | 创建表 |
| `create_namespace` | 创建命名空间 |
| `put` | 插入/更新数据 |
| `scan` | 扫描表数据 |
| `get` | 根据 RowKey 获取数据 |

---

## 八、SQL On HBase

| 方案 | 特点 |
|------|------|
| **Apache Phoenix** | 毫秒级查询性能，专为 HBase 优化的 SQL 层 |
| Hive | 通过 Hive 映射 HBase 表，适合批处理分析 |
| Spark SQL | 通过 Spark 读取 HBase，适合大数据量分析 |

---

## 九、HBase Java API

### 9.1 表管理操作（Admin 类）

- **创建表**：`Admin.createTable(HTableDescriptor)`
- **删除表**：`Admin.disableTable()` -> `Admin.deleteTable()`（先 disable 再 delete）

### 9.2 数据写入操作（Table.put）

- **单条插入**：`Table.put(Put)`
- **Put 对象构造**：`new Put(byte[] rowKey)` -> `put.addColumn(family, qualifier, value)`

### 9.3 数据删除操作（Table.delete）

- **删除数据**：`Table.delete(Delete)`
- **Delete 对象构造**：`new Delete(byte[] rowKey)`

### 9.4 数据读取操作（Get）

- **单条读取**：`Table.get(Get)`
- **Get 对象构造**：`new Get(byte[] rowKey)`
- **返回结果**：Result 对象

### 9.5 批量扫描操作（Scan）

- **扫描读取**：`Table.getScanner(Scan)`
- **Scan 对象配置**：
  - `scan.withStartRow(byte[] startRow)`：起始 RowKey
  - `scan.withStopRow(byte[] stopRow)`：结束 RowKey
  - `scan.addFamily(byte[] family)`：指定列族
- **返回结果**：ResultScanner 迭代器

### 9.6 Filter 过滤器

- **主要过滤器**：`SingleColumnValueFilter`
- **作用**：基于单列值进行条件过滤
- **构造方法**：`new SingleColumnValueFilter(byte[] family, byte[] qualifier, CompareOperator op, byte[] value)`
- **比较操作符**：`CompareOperator.EQUAL`、`GREATER`、`LESS` 等

---

## 十、HBase 性能优化

### 10.1 表设计层面

| 优化方向 | 具体策略 | 说明 |
|---------|---------|------|
| **Region 预创建** | 预先创建 Region 避免自动分裂 | 避免数据热点和分裂开销 |
| **RowKey 设计** | 短、小、散列 | 短减少 IO、散列避免热点 |
| **Column Family 数量** | 不宜太多 | 建议 1-3 个，过多影响性能 |
| **Max Version** | 设置最大版本数 | 控制历史版本数量 |
| **Time To Live (TTL)** | 设置数据过期时间 | 自动清理过期数据 |

### 10.2 写操作优化

| 优化手段 | 说明 |
|---------|------|
| **Write Buffer** | 客户端写缓冲区，批量提交减少 RPC 次数 |
| **WAL Flag** | 关闭 WAL（`Mutation.setWriteToWAL(false)`）提升写入速度（牺牲部分可靠性） |
| **批量写** | 使用 `Table.put(List<Put>)` 批量写入 |

### 10.3 读操作优化

| 优化手段 | 说明 |
|---------|------|
| **Scanner Caching** | `scan.setCaching(int)` 设置每次 RPC 获取的行数，减少 RPC 次数 |
| **批量读** | 使用 `Table.get(List<Get>)` 批量读取 |

---

## 十一、HBase 与其他组件的关系

### 11.1 与 Hive 的关系

Hive 可直接访问 HBase 中的数据，实现多数据源访问。

### 11.2 与 Sqoop/Loader 的关系

- **Sqoop**：支持 Import 数据到 HBase，Export 数据从 HBase 导出
- **Loader**：华为 FusionInsight 可视化数据迁移工具，支持 HBase 作为数据源和目标

### 11.3 与 Flume 的关系

Flume Sink 支持直接写入 HBase，实现实时数据采集到 HBase。

### 11.4 与 ElasticSearch 的联合检索（ES + HBase）

这是实时检索场景中的**核心联合方案**：

```
用户输入查询条件 -> ES 执行搜索 -> ES 返回匹配文档的 ID 列表 -> 根据 ID 查询 HBase 获取完整数据 -> 返回完整结果
```

**核心流程**：先搜 ES 返回 id，再查 HBase 获取完整数据。

**数据双写**：数据导入时需同时写入 HBase 和 ES。

### 11.5 与 GES（图引擎服务）的关系

GES 底层存储基于 HBase：

| 层级 | 组件 | 功能 |
|------|------|------|
| 存储层 | **HBase + ES** | **HBase 存储图数据、ES 建索引加速查询** |

---

## 十二、项目实践：实时检索中的 HBase 应用

### 12.1 业务需求场景

- 根据身份证号查询住宿/通关/网吧登记信息
- 根据姓名、地址、时间查询

### 12.2 HBase 表设计

| 设计要素 | 具体方案 |
|---------|---------|
| **列族 1** | Basic - 基础信息 |
| **列族 2** | OtherInfo - 其他信息 |
| **RowKey 设计** | 根据查询场景设计（如身份证号反转等，避免热点） |

### 12.3 Maven 工程依赖

项目需要配置 HBase 客户端依赖、ES 客户端依赖以及 Spring Boot 相关依赖。

---

## 十三、关键技术要点速查

### 13.1 HBase 核心考点

| 要点 | 内容 |
|------|------|
| **RowKey 设计原则** | 短（节省存储）、小（减少 IO）、散（避免热点） |
| **版本控制** | 通过 Timestamp 和 Max Version 控制 |
| **BloomFilter 作用** | 减少无效 IO，优化 Get 查询 |
| **MemStore 刷写条件** | 内存阈值、时间阈值、手动触发 |
| **SQL 支持** | Phoenix 性能最优（毫秒级） |

### 13.2 与 ES/GES 对比

| 维度 | HBase | ElasticSearch | GES |
|------|-------|---------------|-----|
| **核心定位** | 海量数据主键查询 | 实时搜索/文档检索 | 图查询分析 |
| **数据模型** | KeyValue / 宽列存储 | 文档型(JSON) | 属性图模型 |
| **查询类型** | RowKey 精确查询、Scan 范围扫描 | 全文检索、条件过滤、聚合 | 图遍历、关联分析 |
| **存储引擎** | HFile/MemStore | Lucene 倒排索引 | HBase + ES |
| **最佳场景** | 主键查询、海量随机读 | 关键词搜索、日志分析 | 关系分析、反欺诈 |
| **并发能力** | 高 | 高 | 高 |
| **延迟** | 毫秒级 | 秒级 | 秒级 |

### 13.3 选型原则

| 查询需求 | 推荐组件 |
|---------|---------|
| 主键/ID 精确查询 | **HBase** |
| 关键词全文搜索 | ElasticSearch |
| 非主键字段条件检索 | ElasticSearch |
| 图关系/关联分析 | GES |
| 组合场景（先条件检索再取详情） | **ES + HBase 联合** |

---

## 十四、数据流中的 HBase

### 14.1 在实时数据链路中的位置

```
Flume(数据采集) -> Kafka(消息队列) -> Flink(实时计算) -> HBase(存储层) -> 前端检索展示
```

### 14.2 在离线批处理链路中的位置

```
数据源 -> 数据采集(Sqoop/Loader) -> 离线批处理引擎(Hive/Spark) -> HBase
```

Hive 可通过映射直接访问 HBase 表数据，Spark SQL 可通过读取 HBase 进行大数据量分析。

---

*本文档为 HBase 知识点的专项整理，便于集中复习和查阅。*
