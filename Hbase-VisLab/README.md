# HBase VisLab

> 基于 HCIP-Big Data Developer V2.0 考试知识点的 HBase 可视化学习工具

一个交互式的 HBase 架构与存储模型可视化网站，帮助理解 HBase 的核心概念、系统架构和数据存储原理。

---

## 在线预览

打开 `vislab/index.html` 即可在浏览器中本地运行，无需安装任何依赖。

---

## 项目结构

```
├── docs/                              # 知识点文档
│   ├── HBase知识点整理.md               # HBase 知识点整理（从考试文档提取）
│   └── HCIP_BigData_Developer_V2_知识点_MECE.docx  # 原始考试知识点文档
└── vislab/                            # 可视化网站
    ├── index.html                     # HBase 架构可视化页面
    ├── storage.html                   # 存储模型可视化页面
    ├── css/
    │   ├── style.css                  # 架构图样式
    │   └── storage.css                # 存储模型样式
    └── js/
        ├── main.js                    # 架构图交互逻辑
        └── storage.js                 # 存储模型交互逻辑
```

---

## 功能特性

### 1. HBase 架构可视化 (`index.html`)

完整展示 HBase 五层架构，支持交互式探索：

| 层级 | 组件 | 交互功能 |
|------|------|---------|
| 客户端层 | Client | 点击查看 API 与职责 |
| 协调层 | ZooKeeper | 点击查看集群协调机制 |
| 管理节点 | HMaster | 点击查看元数据管理 |
| 服务节点 | HRegionServer / HRegion / Store / MemStore / StoreFile | 点击查看内部结构与关系 |
| 存储层 | HDFS | 点击查看底层存储原理 |

**特色交互：**
- **组件高亮**：点击组件自动高亮关联组件，其他组件变暗
- **详情面板**：右侧面板展示组件功能、职责、关联关系
- **写入流程动画**：播放数据从 Client → MemStore → HFile → HDFS 的完整写入路径
- **读取流程动画**：播放数据读取路径动画

### 2. 存储模型可视化 (`storage.html`)

五个标签页深入讲解 HBase 存储原理：

| 标签页 | 内容 |
|--------|------|
| **KeyValue 结构** | 拆解 RowKey、Column Family、Qualifier、Timestamp、Type、Value 六大要素 |
| **逻辑存储视图** | Table → Namespace → RowKey → Column Family → Cell 层级 |
| **物理存储视图** | Table → Region → Store → MemStore → HFile → HDFS 物理层级 |
| **RowKey 设计** | 短/小/散三大原则 + 热点问题动态模拟 |
| **HFile 结构** | Data Block / Index Block / BloomFilter / Meta Block / Trailer + 读取路径分步演示 |

---

## 使用方式

### 本地打开

```bash
# 方式一：直接打开文件
# 用浏览器打开 vislab/index.html

# 方式二：启动本地服务器（推荐）
cd vislab
python -m http.server 8080
# 浏览器访问 http://localhost:8080
```

### 页面导航

- **架构图页面** (`/`) → 点击顶部「存储模型视图」切换到存储模型
- **存储模型页面** (`/storage.html`) → 点击顶部「返回架构图」切换回架构图

---

## 技术栈

- **前端**：原生 HTML5 + CSS3 + JavaScript（无框架依赖）
- **样式**：CSS 变量主题系统，深色模式
- **可视化**：SVG 连接线 + CSS 动画 + JavaScript 粒子效果
- **响应式**：支持桌面端和移动端适配

---

## 数据来源

基于 HCIP-Big Data Developer V2.0 考试大纲、培训教材和实验手册提取整理：

- 考试代码：H13-723
- 覆盖模块：第三模块「大数据实时检索场景化解决方案」（考试占比 30%）
- 原始文档：`docs/HCIP_BigData_Developer_V2_知识点_MECE.docx`

---

## 核心知识点速查

### HBase 四大特性
- 高可靠
- 高性能
- 面向列
- 可伸缩

### 存储模型六要素
| 要素 | 说明 |
|------|------|
| RowKey | 行键，唯一标识一行数据 |
| Column Family | 列族，逻辑分组（建议 1-3 个） |
| Qualifier | 列限定符，具体列名 |
| Timestamp | 时间戳，支持多版本 |
| Type | 操作类型（Put/Delete） |
| Value | 实际值 |

### RowKey 设计原则
- **短**：减少存储空间和 IO
- **小**：减少内存占用
- **散**：避免热点问题

---

## 许可证

本项目为学习整理资料，仅供个人学习参考使用。

---

> 项目地址：[https://github.com/CodeArchitect001/Hbase-VisLab](https://github.com/CodeArchitect001/Hbase-VisLab)
