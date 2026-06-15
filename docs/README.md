# HCIP-BigData VisLab 文档中心

> 全局统一的文档目录，按 HCIP-Big Data Developer V2.0 考试四大模块组织，遵循 MECE 原则。

---

## 目录结构

```
docs/
├── 01-bigdata-overview/          # 第一模块：大数据场景化解决方案总览
├── 02-offline-batch/             # 第二模块：大数据离线批处理场景化解决方案
├── 03-realtime-search/           # 第三模块：大数据实时检索场景化解决方案
│   ├── hbase-knowledge-summary.md
│   ├── hbase-failure-scenarios.md
│   └── zookeeper-hmaster-relation.md
├── 04-realtime-streaming/        # 第四模块：大数据实时流计算场景化解决方案
└── shared/                       # 跨模块共享资料
    ├── HCIP_BigData_Developer_V2_Knowledge_MECE.md
    ├── HCIP_BigData_Developer_V2_Knowledge_MECE.docx
    ├── Hbase-VisLab-README.md
    └── ElasticSearch-VisLab-README.md
```

---

## 模块划分（MECE）

| 目录 | 模块 | 考试占比 | 核心组件/主题 |
|------|------|---------|--------------|
| `01-bigdata-overview` | 大数据场景化解决方案总览 | 15% | 4V 特征、Hadoop 生态、FusionInsight MRS、数据湖演进 |
| `02-offline-batch` | 离线批处理场景化解决方案 | 25% | HDFS、Hive、SparkSQL、数仓分层 |
| `03-realtime-search` | 实时检索场景化解决方案 | 30% | **HBase**、ElasticSearch、GES、组件选型 |
| `04-realtime-streaming` | 实时流计算场景化解决方案 | 30% | Flume、Kafka、Flink、Redis |

---

## 共享资料

- `shared/HCIP_BigData_Developer_V2_Knowledge_MECE.md`：完整知识点 MECE 整理
- `shared/HCIP_BigData_Developer_V2_Knowledge_MECE.docx`：完整知识点 Word 版
- `shared/Hbase-VisLab-README.md`：HBase 可视化实验室说明
- `shared/ElasticSearch-VisLab-README.md`：Elasticsearch 可视化实验室说明

---

## 去重说明

- 原 `Hbase-VisLab/docs/temp_extracted.txt` 与 `ElasticSearch-VisLab/docs/temp_extracted.txt` 内容完全一致，已合并到 `shared/HCIP_BigData_Developer_V2_Knowledge_MECE.md`。
- 各项目的 `README.md` 迁移到 `shared/` 保留原始说明。
- HBase 相关专题文档统一归入 `03-realtime-search/`。
