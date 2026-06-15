Table of Contents
HCIP-Big Data Developer V2.0 考试知识点全览（MECE结构）
来源：基于HCIP-Big Data Developer V2.0考试大纲、培训教材、实验手册提取 提取日期：2026-05-25 组织原则：MECE（Mutually Exclusive, Collectively Exhaustive）—— 相互独立、完全穷尽 考试代码：H13-723
MECE原则说明
本文档按照MECE（相互独立、完全穷尽）原则组织所有考试知识点：
相互独立（Mutually Exclusive）：四大模块的知识点分类不重叠，每个知识点只属于一个模块
完全穷尽（Collectively Exhaustive）：覆盖HCIP-Big Data Developer V2.0考试大纲的全部考试范围，无遗漏
考试四大模块总览
模块
名称
考试占比
核心内容
第一模块
大数据场景化解决方案总览
15%
大数据基础概念、Hadoop生态、FusionInsight MRS产品方案、数据湖演进、行业趋势
第二模块
大数据离线批处理场景化解决方案
25%
HDFS分布式存储、Hive数据仓库、SparkSQL内存计算、数据采集工具、数仓分层设计
第三模块
大数据实时检索场景化解决方案
30%
HBase主键查询、ElasticSearch全文检索、GES图引擎服务、组件选型与联合检索
第四模块
大数据实时流计算场景化解决方案
30%
Flume实时采集、Kafka消息队列、Flink流处理引擎、Structured Streaming、Redis缓存
HCIP-Big Data Developer V2.0 考试知识点（MECE结构）├── 第一模块：大数据场景化解决方案总览（考试占比15%）│   ├── 大数据基础概念（4V特征、技术起源）│   ├── Hadoop生态系统（HDFS/MapReduce/YARN及生态组件）│   ├── 企业级数据分析平台演进趋势│   ├── 云化趋势与ROADS体验标准│   ├── 融合趋势（计算/数据/基础设施融合）│   ├── 数据湖演进（存算一体→存算分离）│   └── 华为FusionInsight MRS解决方案（产品定位、核心组件、四大能力、多租户等）├── 第二模块：大数据离线批处理场景化解决方案（考试占比25%）│   ├── HDFS分布式文件系统（架构、Shell命令、回收站）│   ├── Hive数据仓库工具（架构、存储模型、函数体系、调优）│   ├── SparkSQL离线分析引擎（RDD、依赖关系、Transformation/Action）│   ├── 数据采集工具（Sqoop、Loader）│   └── 离线批处理实战（电商网站日志分析、数仓分层ODS→DWD→DWS→ADS）├── 第三模块：大数据实时检索场景化解决方案（考试占比30%）│   ├── 实时检索架构与核心诉求│   ├── HBase分布式NoSQL数据库（存储模型、缓存机制、Java API、性能优化）│   ├── ElasticSearch全文检索引擎（倒排索引、分片副本、搜索流程、Java API）│   ├── GES图引擎服务（属性图模型、Gremlin、REST接口）│   └── 组件对比与选型（HBase vs ES vs GES、联合检索模式）└── 第四模块：大数据实时流计算场景化解决方案（考试占比30%）    ├── 实时流处理概述（7大诉求、技术架构）    ├── Flume实时数据采集（Source/Channel/Sink、拦截器、级联架构）    ├── Kafka消息队列（Topic/Broker/ConsumerGroup、命令行/Java API）    ├── Flink流处理引擎（Window/Checkpoint/DataStream API/Table API/SQL API）    ├── Structured Streaming（微批处理、输出模式、Watermark）    ├── Redis高速缓存（数据类型、持久化、Pipeline）    └── 实时流项目实战（电商订单实时统计）
模块间关联关系说明
四个模块之间存在紧密的上下游和数据流转关系：
第一模块 → 其他三个模块：第一模块提供基础概念框架和产品平台支撑，是理解后续三个技术模块的前提。 - 大数据4V特征（第一模块）→ 决定了离线批处理、实时检索、实时流三种不同处理模式的产生 - Hadoop生态系统（第一模块）→ HDFS为第二/三/四模块提供统一存储底座 - FusionInsight MRS产品方案（第一模块）→ 为第二/三/四模块提供统一的运行平台和组件支撑
第二模块 ↔ 第三/四模块： - 离线批处理（第二模块）处理历史存量数据，实时检索（第三模块）和实时流处理（第四模块）处理实时增量数据 - 数据仓库分层（第二模块ODS→ADS）产生的汇总数据，可为实时检索提供查询基础 - 实时流处理（第四模块Flink）的结果可以写入HBase（第三模块）供实时检索查询
第三模块 ↔ 第四模块： - 实时流处理（第四模块）产生的结果数据（如Flink计算结果）→ 写入HBase/Redis（第三模块的存储组件）供实时查询 - Flume（第四模块采集层）→ Kafka（第四模块消息层）→ Flink（第四模块计算层）→ HBase（第三模块存储层）→ 前端检索展示，形成完整实时数据链路
第一模块：大数据场景化解决方案总览（考试占比15%）
来源：HCIP-Big Data Developer V2.0 考试大纲 + 培训教材第1章
一、认证基本信息
1.1 认证概况
认证名称：HCIP-Big Data Developer V2.0
考试代码：H13-723
1.2 考试内容覆盖范围（四大模块）
大数据场景化解决方案总览
离线批处理
实时检索
实时流处理
1.3 第1章教材结构
大数据主流技术
大数据场景化解决方案
大数据应用开发
二、大数据基础概念
2.1 大数据定义
大数据（Big Data）：指无法在一定时间范围内用常规软件工具进行捕捉、管理和处理的数据集合
需采用新的处理模式（分布式、并行计算等）才能应对
2.2 大数据4V特征
特征
英文
核心描述
关键数据/细节
容量
Volume
数据规模巨大
非结构化数据占比80%-90%；数据增长速度10-50倍
多样性
Variety
数据类型繁多
文本、图像、视频、机器数据等；数据无模式或模式不明显
价值
Value
价值密度低
需通过深度复杂分析（机器学习、数据挖掘）才能提取价值
高效
Velocity
处理速度要求高
需实时分析、实时呈现；强调数据处理的时效性
2.3 4V特征考点要点
Volume强调数据量的规模和非结构化数据的主导地位
Variety强调数据类型的多样化和无模式/弱模式特征
Value强调价值密度低与分析复杂度高的矛盾
Velocity强调实时性要求（区别于传统批处理）
关联提示：Velocity特征是区分离线批处理（第二模块）与实时检索（第三模块）、实时流处理（第四模块）的关键依据。Velocity要求高的场景需要采用实时技术方案。
三、大数据技术起源与生态系统
3.1 大数据技术起源
起点时间：2005年
源头：Apache开源项目
核心思想：基于分布式计算处理海量数据
3.2 Hadoop核心组件
3.2.1 HDFS（Hadoop Distributed File System）
分布式文件系统
核心功能：大数据的分布式存储
设计特点：高容错、高吞吐、适合大文件存储
关联提示：HDFS是第二模块（离线批处理）的核心存储组件，同时也是第三模块（HBase底层存储）和第四模块（实时流处理结果落地存储）的统一数据底座。详见第二模块”二、HDFS”章节。
3.2.2 MapReduce
分布式计算编程模型
核心思想：分而治之（Map阶段拆分处理 + Reduce阶段汇总结果）
适用场景：离线批处理
3.2.3 YARN（Yet Another Resource Negotiator）
定位：Hadoop资源管理系统
核心功能：统一管理和调度集群计算资源
作用：为上层应用（MapReduce、Spark等）提供资源隔离和调度能力
3.3 大数据生态关键组件
组件/技术
类别
功能描述
Spark
计算引擎
内存计算框架，支持批处理、交互式查询、流处理、机器学习
Hive
数据仓库
基于Hadoop的数据仓库工具，提供SQL-like查询（HiveQL）
HBase
NoSQL数据库
分布式列式存储数据库，支持实时随机读写
Kafka
消息队列
高吞吐分布式消息系统，用于数据采集和流式数据传输
Storm
流处理引擎
早期实时流计算框架
Flume
数据采集
分布式日志采集、聚合和传输系统
Elasticsearch(ES)
搜索引擎
分布式全文搜索引擎
Solr
搜索引擎
基于Lucene的搜索平台
Pig
数据流处理
高级数据流编程语言和执行框架
Python
编程语言
常用于大数据分析与AI开发
关联提示：上表中的组件在后续三个模块中有详细展开： - Hive/Spark → 详见第二模块（离线批处理） - HBase/ES/Solr → 详见第三模块（实时检索） - Kafka/Flume → 详见第四模块（实时流处理）
3.4 生态系统层次结构
层级
定位
典型组件
数据流向
（输入→输出）
核心职责
备注/概念归属
应用层 
最终价值呈现 
BI工具、AI平台、数据科学工作台、业务系统 
服务层数据 → 报表/决策/可视化 
面向终端用户消费数据产生业务价值 
数据流终点 
数据服务层 
高速查询接口 
Elasticsearch、Solr、Kylin、Druid、ClickHouse 
查询/处理结果 → 预聚合/索引数据 
提供低延迟、高并发的即查即用接口 
预计算换速度；空间换时间；比查询层更快 
数据查询层 
SQL分析引擎 
Hive、Spark SQL、Impala、Presto、Phoenix 
存储层数据 → SQL查询结果集 
用类SQL方式查询和分析大规模数据 
"查询"概念：只读操作，向系统索要结果 
数据处理/计算层 
分布式任务执行 
MapReduce、Spark、Flink、Storm、Tez 
存储层原始数据 → 清洗/聚合后结果 
执行ETL、离线/实时计算、数据加工 
"处理"=业务目标（ETL）；"计算"=执行动作（过滤/排序/JOIN/聚合） 
数据存储层 
持久化存储 
HDFS、HBase、S3、OSS、Cassandra 
传输层数据 → 持久化文件/表 
数据的持久化存储和读写 
数据流中转站 
数据传输层 
消息队列/数据管道 
Kafka、Pulsar、RabbitMQ、RocketMQ 
采集层数据 → 缓冲后数据流 
数据中转、缓冲、异步解耦 
数据流管道 
数据采集层 
数据接入/同步 
Flume、Sqoop、Logstash、Canal、Maxwell 
业务系统/数据库/日志 → 原始数据 
从数据源采集数据，导入大数据体系 
数据流起点 
资源管理层 
集群资源调度 
YARN、Kubernetes、Mesos 
非数据流，横向贯穿支撑 
为存储层以上各环节分配CPU/内存/容器 
"调度"概念：任务拆分与资源分配；不属于数据流 
四、企业级数据分析平台演进趋势
4.1 演进路线（四阶段）
传统数据仓库 → Hadoop平台 → 内存计算 → 融合的大数据平台
阶段
特点
关键能力
传统数据仓库
结构化数据、关系型数据库
结构化查询、BI报表
Hadoop平台
分布式存储+计算、批处理
HDFS+MapReduce、支持非结构化数据
内存计算
内存级处理速度
Spark等内存计算引擎
融合大数据平台
统一资源+统一存储+多计算模式
批计算+内存计算+流计算融合
4.2 核心演进方向
4.2.1 统一管理
统一资源管理：YARN/Superior等统一调度计算资源
统一数据存储：单一存储层支撑多种计算引擎
4.2.2 多计算模式融合
批计算（Batch）：大规模离线数据处理
内存计算（In-memory）：高速交互式分析
流计算（Streaming）：实时数据处理
关联提示：三种计算模式分别对应后续三个模块：批计算→第二模块（离线批处理）、内存计算→第二模块（SparkSQL）、流计算→第四模块（实时流处理）。
4.3 架构理念演进
阶段
理念
含义
第一阶段
One size fits all
一套系统解决所有问题（理想化，实际难以实现）
第二阶段
One size fits domain
不同领域采用不同专用系统
第三阶段
One stack rules them all
统一技术栈融合多种能力（华为FusionInsight方向）
五、云化趋势
5.1 主流云厂商/产品
国际：Amazon（AWS EMR）、Google（Google Cloud Dataproc）、Snowflake
国内：华为云（FusionInsight MRS）、阿里云（E-MapReduce、MaxCompute）
5.2 行业云化动向
Cloudera：向混合云转型（Cloudera Data Platform, CDP）
华为：30年数字化变革经验，云上数据分析战略
5.3 ROADS体验标准
云化服务需提供的五大用户体验特征：
字母
英文
中文含义
描述
R
Real-time
实时
服务实时响应
O
On-demand
按需
按需提供资源和服务
A
All online
全在线
所有服务在线化
D
DIY
自助
用户自助服务
S
Social
社交化
社交化协作与共享
六、融合趋势
6.1 计算融合
批-交互式融合：批处理引擎与交互式查询引擎共享数据和资源
批-流融合：同一平台同时支持批处理和流处理（如Spark Batch + Spark Streaming）
6.2 数据融合
数据湖 + 数据仓库 + BI + AI融合
打破数据孤岛，实现统一数据底座
支撑从数据存储到分析到智能决策的全链路
6.3 基础设施融合
云数融合：云计算与大数据技术融合
算力融合：多样化算力（X86/ARM/GPU）统一调度
6.4 行业数字化转型案例
行业
案例
核心应用
金融业
金融数字化转型
实时风控、智能营销、监管合规
运营商
智慧运营平台
网络优化、精准营销、客户体验管理
政务
新型智慧城市
城市大脑、交通治理、公共安全
七、数据湖演进
7.1 数据湖发展三阶段
1980年数据仓库 ──→ 2010年数据湖 ──→ 2019+云数据湖
维度
数据仓库（1980s）
数据湖（2010s）
云数据湖（2019+）
数据类型
关系型结构化数据
关系型 + 非关系型
多种数据类型（结构化/半结构化/非结构化）
计算资源
物理机
虚拟机/裸金属
云虚机/BMS/容器
存储架构
专有存储
HDFS存算一体
对象存储存算分离
7.2 存储架构演进详解
7.2.1 存算一体（HDFS）
存储和计算耦合在同一节点
扩展时需同时扩展存储和计算资源
资源利用率低，成本较高
7.2.2 存算分离（对象存储OBS + 计算集群）
存储和计算独立扩展
存储使用对象存储（如华为OBS）
计算使用弹性计算资源
优势：资源按需分配、成本优化、弹性伸缩
八、华为FusionInsight MRS解决方案
8.1 产品定位与演进
演进路径：FusionInsight HD（本地部署版）→ FusionInsight MRS（混合云/云服务版）
产品形态：托管式大数据云服务（MapReduce Service）
8.2 MRS控制面功能（8大功能域）
序号
功能域
具体说明
1
服务申请
用户申请和开通大数据服务
2
资源管理
集群计算/存储资源的统一管理
3
集群部署
自动化大数据集群部署
4
租户管理
多租户创建、配置与隔离
5
运维管理
集群监控、告警、日志管理
6
弹性扩容
按需水平扩展集群节点
7
补丁升级
组件版本升级和补丁管理
8
Manager驾驶舱
可视化运维管理界面
8.3 MRS核心组件清单
8.3.1 计算引擎
组件
功能
Spark
内存计算引擎（批处理+交互式+流+ML）
Flink
实时流处理引擎
Hive
数据仓库与SQL查询
HetuEngine
高性能交互式查询引擎（对标Presto/Trino）
8.3.2 数据存储与NoSQL
组件
功能
HBase
分布式列式NoSQL数据库
Redis
内存键值数据库
GraphBase
图数据库（支持图分析算法）
OBS/HDFS
对象存储/分布式文件系统
8.3.3 数据采集与消息
组件
功能
Kafka
高吞吐消息队列
Flume
日志数据采集传输
8.3.4 检索与搜索
组件
功能
ElasticSearch
分布式搜索引擎
Solr
搜索平台
8.3.5 资源管理与调度
组件
功能
YARN
基础资源调度框架
Superior
增强型调度器（支持多租户资源隔离）
8.3.6 元数据与安全
组件
功能
Catalog
统一元数据管理
Security
统一安全管理（认证、授权、审计）
关联提示：MRS的各组件在后续三个模块中有深入的讲解和实操： - 计算引擎（Spark/Hive） → 第二模块详细讲解 - 存储组件（HBase/Redis） → 第三模块详细讲解 - 采集与消息（Kafka/Flume）+ Flink → 第四模块详细讲解
8.4 MRS四大核心能力
能力
描述
关键指标/特征
一站式平台
数据湖/数仓/BI/AI融合
统一数据底座，支持全链路数据分析
永远在线
企业级高可用
可靠性5个9（99.999%）
易用低成本
降低使用门槛和TCO
存算分离，TCO下降50%+
可持续演进
平滑升级和功能扩展
组件升级不影响业务运行
8.5 多场景融合架构
8.5.1 批-交互式融合
Hive/Spark（批处理） + HetuEngine（交互式查询）
共享底层数据存储，无需数据搬迁
适用：T+1报表 + 即席查询混合负载
8.5.2 批-流融合
Spark/Flink同时支持批处理和流处理
统一编程接口（如Spark统一API、Flink Table API）
适用：离线数仓 + 实时计算统一平台
8.6 大数据+AI融合
智能数据湖：数据湖与AI开发深度集成
对接华为AI开发平台ModelArts
数据预处理、特征工程、模型训练、推理全链路贯通
8.7 高可用与容灾
同城容灾：同一城市内多AZ部署，RPO≈0
异地容灾：跨城市容灾备份
可靠性指标：5个9（99.999%年度可用性）
8.8 弹性伸缩
水平扩展：按需增减计算节点
成本优化：弹性伸缩可降低成本48%
适用场景：业务波峰波谷明显的场景
8.9 多租户资源隔离
8.9.1 隔离模式
模式
特点
适用场景
独占模式
租户独享计算资源，物理隔离
核心生产业务、高安全要求
共享模式
多租户共享资源池，逻辑隔离
开发测试、通用分析任务
8.9.2 隔离维度
CPU资源隔离
内存资源隔离
存储配额隔离
网络带宽隔离
8.10 Manager运维驾驶舱
可视化集群监控界面
提供：服务状态、资源使用、告警管理、日志审计、运维操作入口
九、关键技术详解
9.1 统一元数据管理（Catalog）
功能：统一管理全量数据的元数据信息
作用：
数据发现与数据血缘追踪
跨组件元数据共享
支撑数据治理与合规审计
技术要点：基于数据湖的元数据统一管理，打破各组件元数据孤岛
9.2 基于数据湖的AI开发平台（ModelArts）
ModelArts：华为云AI开发平台
与MRS集成：
直接从数据湖读取数据进行模型训练
特征工程结果回写数据湖
模型推理结果回流大数据平台
价值：实现数据→特征→模型→应用的全链路打通
9.3 图数据库与图分析（GraphBase）
GraphBase：华为自研图数据库
融合能力：图数据存储 + 图分析算法一体化
应用场景：社交网络分析、金融反欺诈、知识图谱、关系推理
9.4 弹性伸缩技术
实现机制：
基于云基础设施的自动化扩缩容
支持按负载/时间/手动触发策略
核心优势：计算资源按需使用，非峰值时段释放资源
9.5 组件混合负载与统一调度
混合负载：同一集群同时运行批处理、交互查询、流处理等多种任务
统一调度：Superior调度器协调不同组件的资源需求
技术挑战：
不同负载的资源特征差异（批处理重吞吐、交互查询重延迟）
需要智能调度策略避免资源争抢
9.6 多租户资源隔离技术
实现层：基于YARN/Superior的容器化资源隔离
隔离机制：
物理隔离（独占模式）：独立资源池
逻辑隔离（共享模式）：CGroup/命名空间隔离
管理面：Manager提供租户创建、配额设置、权限管控
十、实践案例
10.1 XX银行实时风控案例
业务场景：银行交易实时风险监控
技术方案：MRS + Flink实时流处理
核心价值：
毫秒级风险识别与拦截
实时规则引擎+机器学习模型融合
保障资金安全，降低欺诈损失
关联提示：此案例综合运用了第一模块（MRS平台能力）、第四模块（Flink实时流处理），处理结果可通过第三模块（HBase/Redis）进行实时查询展示。
10.2 XX移动在线滚动升级案例
业务场景：运营商大数据平台不停机升级
技术方案：MRS在线滚动升级能力
核心价值：
升级过程业务零中断
逐节点替换，不影响线上服务
体现”永远在线”5个9可靠性
10.3 ARM与X86混合部署
技术场景：异构算力混合部署
技术方案：MRS支持ARM和X86服务器混合组网
核心价值：
算力融合：充分利用ARM低功耗和X86高性能优势
灵活选型：根据不同负载选择最优算力
国产化替代：支持ARM架构国产芯片
十一、知识点关联图谱
大数据场景化解决方案总览│├─ 基础篇│  ├─ 4V特征（Volume/Variety/Value/Velocity）│  └─ Hadoop生态（HDFS/MapReduce/YARN + 周边组件）│├─ 趋势篇│  ├─ 平台演进（数据仓库→Hadoop→内存→融合平台）│  ├─ 云化趋势（ROADS体验 + 主流云厂商）│  ├─ 融合趋势（计算融合/数据融合/算力融合）│  └─ 数据湖演进（1980→2010→2019+，存算分离）│├─ 方案篇│  └─ 华为FusionInsight MRS│     ├─ 产品定位（HD→MRS云服务）│     ├─ 控制面8大功能│     ├─ 核心组件（计算/存储/采集/搜索/调度/元数据/安全）│     ├─ 四大能力（一站式/5个9/低成本/可演进）│     ├─ 多场景融合（批-交互式/批-流）│     ├─ 大数据+AI（ModelArts集成）│     ├─ 高可用容灾（同城/异地/5个9）│     ├─ 弹性伸缩（降本48%）│     └─ 多租户隔离（独占/共享）│├─ 技术篇│  ├─ 统一元数据管理（Catalog）│  ├─ 数据湖AI平台（ModelArts）│  ├─ 图数据库（GraphBase）│  ├─ 弹性伸缩技术│  ├─ 混合负载统一调度（Superior）│  └─ 多租户资源隔离技术│└─ 案例篇   ├─ 银行实时风控（Flink流处理 → 详见第四模块）   ├─ 移动在线滚动升级（零停机）   └─ ARM+X86混合部署（异构算力）
十二、高频考点速记
12.1 关键数字
数字
知识点
4V
大数据四大特征
2005年
大数据技术起源（Apache）
80%~90%
非结构化数据占比
10~50倍
数据增长速度
5个9
MRS可靠性指标（99.999%）
50%+
TCO降低幅度
48%
弹性伸缩成本降低
1980/2010/2019+
数据湖三阶段时间线
12.2 关键概念对应
4V → Volume/Variety/Value/Velocity
ROADS → Real-time/On-demand/All online/DIY/Social
演进路线 → 数据仓库→Hadoop→内存计算→融合平台
架构理念 → One size fits all → fits domain → One stack rules them all
隔离模式 → 独占模式 vs 共享模式
容灾模式 → 同城容灾 vs 异地容灾
12.3 MRS组件分类速记
计算：Spark、Flink、Hive、HetuEngine
存储：HBase、Redis、GraphBase、OBS/HDFS
采集/消息：Kafka、Flume
搜索：ElasticSearch、Solr
调度：YARN、Superior
治理：Catalog（元数据）、Security（安全）
第二模块：大数据离线批处理场景化解决方案（考试占比25%）
来源：HCIP-Big Data Developer V2.0 培训材料（第2章 + 实验手册第1章）
一、离线批处理方案概述
1.1 离线批处理定义
定义：对海量历史数据进行处理和分析，生成结果数据的技术方案
处理对象：海量历史数据（非实时数据）
核心输出：经过处理和分析的结果数据
1.2 核心诉求（四大特征）
处理时间要求不高：非实时场景，允许分钟级/小时级/天级延迟
处理数据量巨大：TB级至PB级数据量
处理数据格式多样：支持结构化、半结构化、非结构化数据
支持SQL类和自定义作业：既支持标准SQL查询，也支持自定义编程作业
1.3 常用技术组件
组件
功能定位
HDFS
分布式数据存储
YARN
集群资源管理调度
MapReduce
分布式批处理计算框架
Hive
数据仓库/类SQL查询
Spark / Spark SQL
内存分布式批处理/结构化查询
1.4 离线批处理完整流程
数据源 -> 数据采集(Flume/Sqoop) -> 离线批处理引擎(Hive/MapReduce/Spark) -> 数据仓库/专题库/数据集市 -> 业务应用
流程各阶段说明： - 数据源：原始业务数据产生地 - 数据采集：Flume（日志采集）、Sqoop（数据库导入导出） - 离线批处理引擎：Hive、MapReduce、Spark等计算框架 - 数据存储层：数据仓库（分层存储）、专题库、数据集市 - 业务应用：数据可视化、报表分析、决策支持等
二、HDFS（Hadoop分布式文件系统）
2.1 HDFS基础概念
设计来源：基于Google GFS（Google File System）论文设计
定位：Hadoop生态系统的核心存储组件
2.2 HDFS核心特性
特性
说明
高容错性
自动数据副本机制，默认3副本，故障自动恢复
高吞吐量
适合大规模数据批量读写，而非低延迟单条访问
大文件存储
专为TB~PB级大文件存储优化
2.3 HDFS适用与不适用场景
适用场景： - 大文件存储与访问 - 流式数据访问（顺序读取）
不适用场景： - 大量小文件存储（NameNode内存压力大） - 随机写入（仅支持追加写，不支持随机修改） - 低延迟读取（高吞吐量但延迟较高）
2.4 HDFS架构组件
┌─────────────────────────────────────┐│           NameNode (NN)              ││  ├─ 元数据管理（文件目录树、块映射）  ││  └─ 管理命名空间、协调客户端访问      │└─────────────────────────────────────┘                   │    ┌──────────────┼──────────────┐    ▼              ▼              ▼┌────────┐   ┌────────┐   ┌────────┐│DataNode│   │DataNode│   │DataNode││(Block 1)│   │(Block 2)│   │(Block 3)││(副本)   │   │(副本)   │   │(副本)   │└────────┘   └────────┘   └────────┘
组件
职责
NameNode
元数据管理节点，管理文件系统命名空间，维护文件到数据块的映射关系，处理客户端的读写请求
DataNode
数据存储节点，负责存储实际的数据块（Block），执行数据的读写操作，定期向NameNode汇报块信息
2.5 HDFS常用Shell命令
命令
功能说明
hdfs dfs -cat <路径>
查看文件内容
hdfs dfs -ls <路径>
列出目录内容
hdfs dfs -rm <路径>
删除文件/目录
hdfs dfs -put <本地源> <HDFS目标>
上传本地文件到HDFS
hdfs dfs -get <HDFS源> <本地目标>
从HDFS下载文件到本地
hdfs dfs -mkdir <路径>
创建目录
hdfs dfs -chmod <权限> <路径>
修改文件/目录权限
hdfs dfs -chown <用户:组> <路径>
修改文件/目录所有者
hdfs dfsadmin -safemode <enter/leave/get>
安全模式管理
hdfs dfsadmin -report
查看HDFS状态报告
2.6 HDFS回收站机制
配置参数：fs.trash.interval
默认状态：关闭（值为0）
开启方式：修改core-site.xml配置文件，设置fs.trash.interval为大于0的值（单位：分钟）
作用：删除的文件先移至回收站，超期后自动清理，防止误删数据
三、Hive（数据仓库工具）
3.1 Hive基础概念
定义：基于Hadoop的数据仓库软件，用于查询和管理PB级分布式存储的数据
定位：将类SQL查询转换为MapReduce/Tez/Spark任务执行
本质：Hadoop之上的数据仓库层，非独立存储系统
3.2 Hive核心特性
灵活ETL能力：支持复杂的数据抽取、转换、加载操作
多计算引擎支持：支持MapReduce、Tez、Spark三种计算引擎
多数据源访问：可直接访问HDFS和HBase中的数据
类SQL语法：降低大数据开发门槛，SQL开发者可快速上手
3.3 Hive架构
┌──────────────┐│ Web Interface │  <-- Web UI（如Hue）└──────┬───────┘       │┌──────▼─────────────┐│   Thrift Server    │  <-- 提供JDBC/ODBC接口，支持外部客户端连接└──────┬─────────────┘       │┌──────▼──────────────────────────────────────────┐│                      Driver                      ││  ┌──────────┐  ┌──────────┐  ┌──────────┐      ││  │ Compiler │->│ Optimizer│->│ Executor │      ││  │ (编译器)  │  │ (优化器)  │  │ (执行器)  │      ││  └──────────┘  └──────────┘  └──────────┘      │└──────┬──────────────────────────────────────────┘       │┌──────▼─────────────┐       ┌────────────────────┐│     MetaStore      │       │   计算引擎          ││  (元数据存储服务)    │       │  ┌─────┐┌───┐┌────┐││  - 表结构信息       │       │  │ Tez ││MR ││Spark│││  - 分区信息         │       │  └─────┘└───┘└────┘││  - 位置信息         │       └────────────────────┘└────────────────────┘
架构组件说明：
组件
功能描述
Web Interface
Web用户界面，如Hue等可视化工具
Thrift Server
提供JDBC/ODBC服务接口，支持外部BI工具连接
Driver
核心驱动，包含Compiler（编译HQL）、Optimizer（优化执行计划）、Executor（执行任务）
MetaStore
元数据存储服务，存储表结构、分区、位置等元信息，通常使用MySQL/PostgreSQL作为底层存储
计算引擎
Tez / MapReduce / Spark，实际执行数据处理任务
3.4 Hive数据存储模型
Hive数据组织层级：
数据库（Database）    └── 表（Table）            ├── 内部表（Managed Table）            ├── 外部表（External Table）            ├── 分区（Partition）            └── 桶/分桶（Bucket）
3.4.1 数据库（Database）
命名空间隔离，相当于关系数据库中的database
3.4.2 内部表（Managed Table）
Hive管理表的生命周期
CREATE：数据会被移动到Hive仓库目录
DROP：同时删除元数据和实际数据
3.4.3 外部表（External Table）
Hive仅管理元数据，不管理实际数据
CREATE：仅记录数据位置，不移动数据
DROP：仅删除元数据，不删除实际数据
适用场景：数据被多个工具共享、需要保护原始数据不被误删
3.4.4 内部表 vs 外部表对比
对比维度
内部表
外部表
数据管理
Hive管理数据和元数据
仅Hive管理元数据，数据由HDFS管理
CREATE时
数据移动到Hive仓库目录
不移动数据，仅记录位置
DROP时
同时删除元数据和数据
仅删除元数据，保留实际数据
数据位置
默认在Hive仓库目录
可指定任意HDFS路径
适用场景
临时数据、Hive专用数据
共享数据、需要保护原始数据
3.4.5 表类型修改与查看
修改表类型：
ALTER TABLE tableName SET TBLPROPERTIES('EXTERNAL'='TRUE');   -- 改为外部表ALTER TABLE tableName SET TBLPROPERTIES('EXTERNAL'='FALSE');  -- 改为内部表
查看表类型：
DESC FORMATTED tableName;  -- 查看表的详细格式信息，包含表类型
3.4.6 分区（Partition）
概念：将表数据按某个/某些列的值划分为不同的目录存储
作用：避免全表扫描，提高查询效率（分区裁剪）
使用场景：按日期、地区等维度划分数据
3.4.7 桶/分桶（Bucket）
概念：将数据按哈希函数分散到固定数量的文件中
作用：提高采样效率、优化join操作
3.5 Hive函数体系
3.5.1 内置函数（Built-in Functions）
类别
函数
功能
数学函数
round(x[, d])
四舍五入，d为小数位
abs(x)
取绝对值
rand()
返回0~1的随机数
日期函数
to_date(string timestamp)
从时间戳提取日期部分
current_date()
返回当前日期
字符串函数
trim(string A)
去除字符串两端空格
length(string A)
返回字符串长度
substr(string A, int start[, int len])
截取子字符串
3.5.2 自定义函数（UDF）分类
类型
全称
输入输出特征
典型应用
UDF
User Defined Function
单行输入 -> 单行输出
数据格式转换、字段解析
UDAF
User Defined Aggregation Function
多行输入 -> 单行输出
自定义聚合计算（如AVG/SUM类）
UDTF
User Defined Table-generating Function
单行输入 -> 多行输出
行转列、数组展开
3.5.3 UDF开发完整步骤
继承UDF类：创建Java类，继承org.apache.hadoop.hive.ql.exec.UDF
实现evaluate()方法：编写业务逻辑，可重载多个evaluate方法
打包上传：将项目打包为JAR文件，上传到HDFS
创建临时函数：
ADD JAR hdfs://path/to/your.jar;CREATE TEMPORARY FUNCTION function_name AS 'com.example.YourUDFClass';
3.6 Hive调优
3.6.1 数据倾斜问题
定义：某些key的数据量远大于其他key，导致部分Reduce任务处理量过大，整体作业延迟
常见原因：
GROUP BY 某些值出现频率过高
DISTINCT 去重时热点值集中
JOIN 时某张表存在大量相同key
解决参数： | 参数 | 说明 | |——|——| | hive.map.aggr=true | 开启Map端预聚合，减少Reduce端数据量 | | hive.groupby.skewindata=true | 开启GROUP BY数据倾斜优化，启用两阶段聚合 |
3.6.2 Map Side Join优化
参数：hive.auto.convert.join=true
原理：自动将小表加载到内存，在Map端完成Join，避免Shuffle
触发条件：参与Join的某张表大小小于阈值（默认25MB）
3.6.3 并行化执行
参数
说明
hive.exec.parallel=true
开启无依赖任务的并行执行
hive.exec.parallel.thread.number
设置并行执行的线程数量
3.7 HQL开发要点
3.7.1 常用HQL操作
创建表：CREATE TABLE [IF NOT EXISTS] ... [PARTITIONED BY ...] [ROW FORMAT ...]
加载数据：LOAD DATA [LOCAL] INPATH 'path' [OVERWRITE] INTO TABLE tableName [PARTITION ...]
JOIN查询：支持INNER JOIN、LEFT JOIN、RIGHT JOIN、FULL JOIN等
分区插入：INSERT OVERWRITE TABLE ... PARTITION(...) SELECT ...
统计查询：聚合函数（COUNT/SUM/AVG/MAX/MIN）、GROUP BY、HAVING
3.7.2 JSON解析函数
get_json_object(json_string, path)：从JSON字符串中提取指定路径的字段
示例：get_json_object(json_col, '$.user_id')
3.8 数据仓库分层设计
3.8.1 分层架构
┌─────────────────────────────────────┐│            ADS 层                    │  <-- 应用数据层（面向业务）│    （报表、可视化、决策支持）          │├─────────────────────────────────────┤│            DWS 层                    │  <-- 轻度汇总层（面向分析主题）│    （主题宽表、汇总指标）              │├─────────────────────────────────────┤│            DWD 层                    │  <-- 明细数据层（面向业务过程）│    （清洗、标准化、维度退化）          │├─────────────────────────────────────┤│            ODS 层                    │  <-- 原始数据层（面向数据源）│    （原始数据，与源系统一致）          │└─────────────────────────────────────┘
3.8.2 各层定义与职责
层级
全称
职责描述
ODS
Operational Data Store（原始数据层）
存储从源系统采集的原始数据，结构与源系统保持一致，几乎不做处理
DWD
Data Warehouse Detail（明细数据层）
对ODS层数据进行清洗、转换、标准化处理，进行维度退化，形成业务过程明细表
DWS
Data Warehouse Summary（轻度汇总层）
以分析主题为维度，对DWD层数据进行轻度汇总，形成主题宽表
ADS
Application Data Store（应用数据层）
面向具体业务应用，提供可直接使用的报表数据、指标数据
3.8.3 分层优点
复杂问题简单化：每层只处理本层职责内的问题，降低复杂度
减少重复开发：公共逻辑下沉到DWS层，上层直接复用
隔离原始数据：ODS层保留原始数据，下游处理不影响数据源
3.8.4 数据集市 vs 数据仓库
对比维度
数据仓库（Data Warehouse）
数据集市（Data Mart）
数据范围
企业级全量数据
部门级/主题级局部数据
数据来源
多个异构数据源
通常从数据仓库获取
建设方式
自顶向下（Top-Down）
自底向上（Bottom-Up）
面向对象
全企业
特定部门/业务线
数据粒度
多种粒度
汇总粒度为主
典型用途
企业级决策分析
部门级业务分析
四、SparkSQL（离线分析引擎）
4.1 Spark基础概念
定义：基于内存的分布式批处理系统
核心特点：中间计算结果存储在内存中，而非磁盘
4.2 Spark应用场景
场景
说明
数据处理
ETL、数据清洗、格式转换
迭代计算
机器学习算法、图计算等需要多次迭代的场景
数据挖掘
模式发现、关联分析、聚类分类
流式处理
Spark Streaming实时数据处理
查询分析
Spark SQL结构化数据查询分析
4.3 Spark对比MapReduce
对比维度
MapReduce
Spark
性能
较慢
提升可达100倍（内存计算）
中间数据存储
写入HDFS磁盘
存储在内存中
数据集操作类型
仅Map和Reduce
丰富的转换操作（map/filter/join等）
迭代计算支持
差（每次迭代读写磁盘）
优（内存中迭代）
编程模型
仅Map+Reduce
DAG（有向无环图）执行模型
4.4 RDD（弹性分布式数据集）
4.4.1 RDD定义与特性
全称：Resilient Distributed Dataset（弹性分布式数据集）
本质：Spark的基本数据抽象，只读的、可分区的记录集合
五大特性：
分区列表（A list of partitions）
每个分区的计算函数（A function for computing each split）
依赖列表（A list of dependencies on other RDDs）
分区器（Optionally, a Partitioner for key-value RDDs）
优先位置（Optionally, a list of preferred locations）
4.4.2 RDD数据来源
从HDFS等外部存储系统加载
从父RDD通过Transformation转换得到
从Scala/Java数据集合并行化创建
4.4.3 RDD存储机制
默认存储：内存（RAM）
溢出策略：内存不足时，溢写到磁盘（Disk）
持久化级别：MEMORY_ONLY、MEMORY_AND_DISK、DISK_ONLY等
4.5 Spark依赖关系与Stage划分
4.5.1 Shuffle概念
定义：数据在Map端和Reduce端之间的重新分发过程
作用：划分Stage的标识，Shuffle操作处会切分Stage
4.5.2 窄依赖（Narrow Dependency）
定义：父RDD的每个分区只被子RDD的一个分区使用
特点：不需要Shuffle，可在同一Stage内流水线执行
典型操作：map、filter、union
图示：一对一或少数对少数的分区映射
4.5.3 宽依赖（Wide Dependency）
定义：父RDD的每个分区被子RDD的多个分区使用
特点：需要Shuffle操作，会切分Stage
典型操作：groupByKey、reduceByKey、join（非co-partitioned时）
图示：一对多的分区映射
4.5.4 Stage划分
划分依据：以Shuffle操作为边界划分Stage
Stage类型：
ShuffleMapStage：中间Stage，输出供其他Stage使用
ResultStage：最终Stage，输出结果到驱动程序或外部存储
4.6 Spark操作类型
4.6.1 Transformation（转换操作）
特征：返回值是RDD，懒执行（不会立即触发计算）
本质：定义RDD之间的依赖关系，构建DAG执行图
常见操作： | 操作 | 功能 | |——|——| | map(func) | 对每个元素应用函数，返回新RDD | | flatMap(func) | 先map再flatten，一个输入可能产生多个输出 | | filter(func) | 保留满足条件的元素 | | union(otherRDD) | 合并两个RDD | | reduceByKey(func) | 按Key聚合Value（Shuffle操作） | | groupByKey() | 按Key分组（Shuffle操作） | | join(otherRDD) | 按Key关联两个RDD（Shuffle操作） |
4.6.2 Action（行动操作）
特征：返回值不是RDD，触发实际计算
本质：触发DAG图的执行，将结果返回驱动程序或写入外部存储
常见操作： | 操作 | 功能 | |——|——| | collect() | 将所有元素收集到驱动程序 | | reduce(func) | 使用函数聚合所有元素 | | saveAsTextFile(path) | 将RDD保存到文本文件 | | count() | 返回元素总数 | | take(n) | 返回前n个元素 | | first() | 返回第一个元素 |
4.7 Spark核心对象与配置
4.7.1 SparkConf（配置对象）
用途：任务参数配置
配置优先级（从高到低）：
代码中显式设置：sparkConf.set("key", "value")
动态参数：spark-submit --conf key=value
配置文件：spark-defaults.conf
4.7.2 SparkContext
定位：Spark应用程序的入口
职责：与集群管理器（YARN/Mesos/Standalone）建立连接，创建RDD，协调任务执行
创建方式：
val conf = new SparkConf().setAppName("AppName").setMaster("yarn")val sc = new SparkContext(conf)
4.7.3 SparkSession（Spark 2.0+）
引入版本：Spark 2.0
设计目的：统一SQL、DataFrame、Dataset、Streaming的编程入口
封装关系：SparkSession = SparkConf + SparkContext + SQLContext + HiveContext
创建方式：
val spark = SparkSession.builder()  .appName("AppName")  .master("yarn")  .enableHiveSupport()  // 启用Hive支持  .getOrCreate()
4.8 SparkSQL详解
4.8.1 SparkSQL定义
定位：Spark中处理结构化数据的模块
核心机制：将SQL解析为逻辑执行计划，经Catalyst优化器优化后生成RDD物理执行计划
4.8.2 SparkSQL使用方式
方式
说明
SparkSession.sql()
通过SparkSession直接提交SQL语句
JDBC/ODBC
通过JDBCServer提供远程SQL访问服务
4.8.3 Dataset
定义：强类型的数据集合，以Catalyst逻辑执行计划表示
特点：兼具RDD的强类型和DataFrame的查询优化能力
与DataFrame关系：DataFrame = Dataset[Row]（Row类型的Dataset）
4.8.4 SparkSQL适用与不适用场景
适用场景： - 结构化数据处理 - PB级大数据离线分析
不适用场景： - 实时数据查询（SparkSQL是批处理引擎，非实时引擎）
4.8.5 SparkSQL开发示例要点
典型场景：统计网购停留时间超过2小时的女性网民
流程：创建SparkSession -> 读取数据源 -> 注册临时视图 -> 执行SQL分析 -> 输出结果
4.8.6 YARN-Cluster模式作业提交
spark-submit \  --master yarn-cluster \  --class com.example.MainClass \  --executor-memory 4g \  --executor-cores 2 \  --num-executors 10 \  application.jar
关键参数说明： | 参数 | 说明 | |——|——| | --master yarn-cluster | YARN集群模式，Driver运行在集群中 | | --class | 主类全限定名 | | --executor-memory | 每个Executor的内存大小 | | --executor-cores | 每个Executor的CPU核数 | | --num-executors | Executor数量 |
五、数据采集工具
5.1 Sqoop
5.1.1 Sqoop基础概念
定义：Hadoop与传统关系型数据库（RDBMS）之间数据传递的工具
定位：Hadoop生态的数据交换桥梁
版本说明：Sqoop1（命令行驱动）、Sqoop2（Server-Client架构）
5.1.2 Sqoop核心功能
功能
方向
说明
Import
RDBMS -> HDFS/Hive/HBase
从关系型数据库导入数据到Hadoop生态
Export
HDFS -> RDBMS
从HDFS导出数据到关系型数据库
5.1.3 Sqoop Import原理
数据切分：根据--split-by参数指定的列，将数据范围划分为多个切片（split）
并行处理：每个Map任务处理一个split，通过JDBC并行读取数据
数据写入：各Map任务将数据写入HDFS对应目录
5.1.4 Sqoop Export原理
Schema获取：连接目标数据库，获取表结构信息
并行导入：多个Map任务并行从HDFS读取数据
批量插入：通过JDBC批量插入到目标数据库表中
5.1.5 Sqoop常用参数
参数
说明
--connect <jdbc-url>
JDBC连接字符串
--username <user>
数据库用户名
--password <pwd>
数据库密码
--table <table>
源/目标表名
--target-dir <dir>
HDFS目标目录（Import）
--export-dir <dir>
HDFS源目录（Export）
--split-by <column>
指定切分列（并行度控制）
--m <num>
Map任务数量
--hive-import
直接导入到Hive表
--hive-table <table>
指定Hive表名
5.2 Loader
5.2.1 Loader基础概念
定义：FusionInsight数据加载工具
技术基础：基于Sqoop优化扩展
定位：华为FusionInsight HD提供的可视化数据迁移工具
5.2.2 Loader核心特点
特点
说明
图形化
可视化向导式配置，降低使用门槛
高性能
基于MapReduce并行处理
高可靠
主备双机部署，故障自动切换
安全
支持Kerberos认证
定时调度
支持定时作业调度
多种数据源
支持关系型数据库、HDFS、Hive、HBase等多种数据源
5.2.3 Loader vs Sqoop对比
维度
Sqoop
Loader
操作方式
命令行
图形化界面
配置复杂度
需记忆大量参数
向导式配置
调度能力
需借助外部调度（如Oozie）
内置定时调度
部署模式
客户端工具
服务端（主备双机）
安全性
基础认证
Kerberos安全认证
适用场景
技术人员单次操作
企业级常态化数据迁移
六、离线批处理实战（电商网站日志分析）
6.1 项目背景与目标
场景：购物网站用户行为日志分析
数据源：网站日志文件 + 业务数据库（MySQL）
分析目标：多维度用户行为统计分析
6.2 核心分析指标
指标
说明
活跃用户数
日活(DAU)、周活(WAU)、月活(MAU)
新增用户
每日新注册用户/新设备数
转化率
从浏览到下单、从下单到支付等转化漏斗
GMV
Gross Merchandise Volume，商品交易总额
6.3 方案架构
┌──────────────┐     ┌──────────────┐     ┌──────────────┐│  网站日志     │     │  业务数据库    │     │   MySQL      ││  (Log Files) │     │   (MySQL)     │     │  (结果库)     │└──────┬───────┘     └──────┬───────┘     └──────▲───────┘       │                    │                      │       ▼                    │                      │┌──────────────┐            │               ┌──────┴───────┐│    HDFS      │            │               │   Loader     ││  (原始存储)   │            │               │  (数据导出)   │└──────┬───────┘            │               └──────▲───────┘       │                    │                      │       ▼                    │                      │┌─────────────────────────────────────────────────────────┐│                      Hive 数据仓库                        ││  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    ││  │ ODS层   │->│ DWD层   │->│ DWS层   │->│ ADS层   │    ││  │(原始数据)│  │(明细层) │  │(汇总层) │  │(应用层) │    ││  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │└─────────────────────────────────────────────────────────┘       │       ▼┌─────────────────────────────────────────────────────────┐│                  可视化展示层                            ││         Echarts + Spring Boot / BI工具                   │└─────────────────────────────────────────────────────────┘
6.4 数据分层设计详解
6.4.1 ODS层（原始数据层）
表名
说明
ods_start_log
启动日志原始数据
ods_event_log
事件日志原始数据
特点：结构与原始日志完全一致，几乎不做处理
6.4.2 DWD层（明细数据层）
表名
说明
dwd_start_log
启动日志明细（解析公共字段）
dwd_base_event_log
事件日志基础明细（使用UDF/UDTF解析JSON）
dwd_display_log
曝光事件明细
dwd_newsdetail_log
资讯详情事件明细
dwd_comment_log
评论事件明细
dwd_favorites_log
收藏事件明细
技术要点： - 使用UDF解析JSON公共字段（如设备信息、用户信息等） - 使用UDTF展平事件数组（一条原始记录可能包含多个事件） - 使用get_json_object函数解析JSON字段
6.4.3 DWS层（轻度汇总层）
表名
说明
dws_uv_detail_day
活跃设备日汇总
dws_uv_detail_wk
活跃设备周汇总
dws_uv_detail_mn
活跃设备月汇总
dws_new_mid_day
新增用户日汇总
dws_user_action
用户行为宽表（包含下单、支付、评论等行为）
特点：以分析主题为核心，形成轻度汇总数据，供上层直接使用
6.4.4 ADS层（应用数据层）
表名
说明
ads_uv_count
活跃用户数统计（日/周/月）
ads_new_mid_count
新增用户统计
ads_user_convert_day
用户转化率统计
ads_user_action_convert_day
漏斗分析（浏览->下单->支付转化）
ads_gmv_sum_day
每日GMV统计
特点：面向具体业务指标，可直接用于可视化展示
6.5 关键技术实现
6.5.1 UDF开发（BaseUDF）
功能：解析JSON公共字段
实现：继承UDF类，实现evaluate()方法，使用JSON解析库提取指定字段
应用：在DWD层创建表时使用，解析日志中的公共头信息
6.5.2 UDTF开发（EventUDTF）
功能：展平事件数组（一行变多行）
实现：继承GenericUDTF，实现process()和close()方法
应用：将包含多个事件的一条原始日志记录，展开为多行事件记录
6.5.3 JSON解析技术
函数：get_json_object(json_string, '$.field.path')
用途：在HQL中直接提取JSON字符串中的字段值
示例：get_json_object(event_json, '$.event_name')
6.5.4 数据互导（Loader）
Hive -> MySQL：使用Loader将ADS层统计结果导出到MySQL结果库
MySQL -> Hive：使用Loader将业务数据库维度表导入Hive
6.5.5 可视化展示
前端：Echarts（百度开源图表库）
后端：Spring Boot（Java Web框架）
数据流：MySQL结果库 -> Spring Boot提供API -> Echarts渲染图表
6.6 完整数据处理流程
Step 1: 数据采集  网站日志 ──Flume/SFTP──> HDFS ──> ODS层(ods_start_log / ods_event_log)  MySQL业务库 ──Loader/Sqoop──> HDFS ──> ODS层Step 2: 数据清洗（DWD层构建）  ODS层 ──UDF/UDTF解析JSON──> dwd_start_log / dwd_base_event_log  dwd_base_event_log ──事件分类──> dwd_display_log / dwd_newsdetail_log /                                     dwd_comment_log / dwd_favorites_logStep 3: 数据汇总（DWS层构建）  DWD层 ──GROUP BY聚合──> dws_uv_detail_day/wk/mn  DWD层 ──新用户识别──> dws_new_mid_day  DWD层 ──多表JOIN──> dws_user_action（用户行为宽表）Step 4: 指标计算（ADS层构建）  DWS层 ──COUNT/DISTINCT──> ads_uv_count（活跃统计）  DWS层 ──新增统计──> ads_new_mid_count  DWS层 ──转化率计算──> ads_user_convert_day / ads_user_action_convert_day  DWS层 ──SUM汇总──> ads_gmv_sum_dayStep 5: 结果导出与展示  ADS层 ──Loader──> MySQL结果库 ──Spring Boot──> Echarts可视化
七、知识点关联图谱
离线批处理解决方案│├── 数据存储层│   └── HDFS（NameNode + DataNode）│├── 数据采集层│   ├── Sqoop（RDBMS <-> HDFS/Hive）│   └── Loader（FusionInsight可视化工具）│├── 数据计算层│   ├── Hive（类SQL数据仓库）│   │   ├── 架构：Driver + MetaStore + 计算引擎│   │   ├── 存储模型：内部表/外部表/分区/桶│   │   ├── 函数：内置函数 + UDF/UDAF/UDTF│   │   ├── 调优：数据倾斜/MapSideJoin/并行化│   │   └── HQL：DDL/DML/查询语句│   ││   └── SparkSQL（内存计算）│       ├── RDD（弹性分布式数据集）│       ├── 依赖：窄依赖 vs 宽依赖│       ├── 操作：Transformation vs Action│       ├── 核心对象：SparkConf/SparkContext/SparkSession│       └── Catalyst优化器（SQL -> 执行计划）│├── 数据仓库层│   └── 分层设计：ODS -> DWD -> DWS -> ADS│└── 业务应用层    └── 可视化：Echarts + Spring Boot
八、重点考点速查表
考点类别
具体考点
关键记忆点
HDFS
架构组件
NameNode(元数据) + DataNode(数据)
HDFS
不适合场景
小文件、随机写入、低延迟读取
HDFS
回收站配置
fs.trash.interval，默认关闭
Hive
架构
WebUI -> Thrift -> Driver -> MetaStore -> 引擎
Hive
表类型
内部表(DROP删数据) vs 外部表(DROP不删数据)
Hive
修改表类型
ALTER TABLE SET TBLPROPERTIES(‘EXTERNAL’=‘TRUE’)
Hive
UDF分类
UDF(单行->单行)、UDAF(多行->单行)、UDTF(单行->多行)
Hive
数据倾斜参数
hive.map.aggr / hive.groupby.skewindata
Hive
MapSideJoin
hive.auto.convert.join
Hive
分层
ODS(原始) -> DWD(明细) -> DWS(汇总) -> ADS(应用)
Spark
RDD特性
分布式、弹性、只读、可分区
Spark
依赖类型
窄依赖(无Shuffle) vs 宽依赖(有Shuffle)
Spark
操作类型
Transformation(懒执行，返回RDD) vs Action(触发计算)
Spark
Stage划分
以Shuffle为边界
Spark
SparkSession
Spark2.0引入，统一入口，封装SparkConf+SparkContext
Spark
性能对比
Spark比MapReduce快100倍（内存计算）
Spark
提交命令
spark-submit –master yarn-cluster
Sqoop
Import原理
split-by参数切分，多Map并行处理
Sqoop
Export原理
获取schema，并行导入
Loader
特点
图形化、高性能(MapReduce)、高可靠(主备)、安全(Kerberos)
实战
UDF用途
解析JSON公共字段
实战
UDTF用途
展平事件数组（一行变多行）
实战
JSON解析
get_json_object(json_string, path)
实战
指标
DAU/WAU/MAU、新增、转化率、GMV
第三模块：大数据实时检索场景化解决方案（考试占比30%）
来源：HCIP-Big Data Developer V2.0 培训教材第3章 + 实验手册第2章
一、实时检索概述与解决方案架构
1.1 实时检索基本概念
知识点
内容
定义
根据关键词对系统内信息快速搜索，即搜即得，强调实时低延迟
核心特征
高并发、查询速度快、查询条件简单、海量小文件
1.2 行业应用（金融场景）
日志信息查询
交易记录查询
信用记录查询
反洗钱分析
1.3 核心诉求
诉求维度
具体指标
检索性能
秒级响应
并发能力
>100并发
数据规模
PB级数据、1000+节点
数据类型
支持结构化和非结构化数据
数据加载
TB/小时的高效数据加载
图检索
支持图检索能力
1.4 解决方案整体架构
数据采集层 -> 数据存储层 -> 实时检索业务
1.4.1 数据采集层
批量数据采集：Loader / Spark
实时数据采集：Spark Streaming
1.4.2 数据存储层（三大组件）
组件
定位
负责查询类型
HBase
海量数据主键查询
主键（RowKey）精确查询
ElasticSearch (ES)
实时搜索/文档检索
非主键查询、全文检索、条件检索
GES (图引擎服务)
图查询分析
图结构查询、关联分析
1.4.3 各组件功能定位
HBase：海量数据主键查询
ES：实时搜索/文档检索
GES：图查询分析
二、HBase（分布式NoSQL数据库）
2.1 HBase核心定义与特性
2.1.1 基本定义
分布式NoSQL数据库
四大核心特性：高可靠、高性能、面向列、可伸缩
2.1.2 适用场景
海量数据存储（TB/PB级）
高吞吐量读写
高效随机读取（Get/Scan）
性能要求高且需要灵活伸缩
结构化和非结构化数据混合存储
2.1.3 不适用场景
需要完整ACID特性的场景（不支持完整ACID）
2.2 HBase系统架构
Client -> ZooKeeper -> HMaster -> HRegionServer -> HRegion -> Store(MemStore + StoreFile/HFile) -> HDFS
2.2.1 架构组件说明
组件
功能描述
Client
客户端，提供访问接口
ZooKeeper
协调服务，管理集群状态、Master选举
HMaster
主节点，管理元数据、Region分配、负载均衡
HRegionServer
区域服务器，处理实际读写请求
HRegion
数据分片单元，按RowKey范围划分
Store
Region内的列族存储单元
MemStore
内存写缓存
StoreFile/HFile
磁盘数据文件
HDFS
底层分布式文件系统
2.3 存储模型
2.3.1 数据存储形式
KeyValue形式：所有数据以KeyValue对存储
2.3.2 KeyValue核心要素
RowKey：行键，唯一标识一行数据
Column Family：列族，逻辑分组
Qualifier：列限定符（具体列名）
Value：实际值
Timestamp：时间戳，支持多版本
Type：操作类型（Put/Delete等）
多版本：同一单元格可存储多个版本（按时间戳区分）
2.4 缓存机制
缓存类型
作用
特点
MemStore
写缓存 + 读缓存
内存中的写入缓冲区，达到阈值后刷写到HFile
BlockCache
文件块缓存
缓存HFile中的数据块，加速读操作
2.5 BloomFilter（布隆过滤器）
属性
说明
作用
优化随机读取（Get场景），快速判断数据是否可能存在
特点
存在一定误判率（可能误判存在但不会误判不存在）
存储位置
保存在HFile中
优势
减少不必要的磁盘IO
2.6 HBase客户端命令（hbase shell）
命令
功能
hbase shell
进入HBase命令行客户端
list
列出所有表
create
创建表
create_namespace
创建命名空间
put
插入/更新数据
scan
扫描表数据
get
根据RowKey获取数据
2.7 SQL On HBase
方案
特点
Apache Phoenix
毫秒级查询性能，专为HBase优化的SQL层
Hive
通过Hive映射HBase表，适合批处理分析
Spark SQL
通过Spark读取HBase，适合大数据量分析
2.8 HBase Java API
2.8.1 表管理操作（Admin类）
创建表：Admin.createTable(HTableDescriptor)
删除表：Admin.disableTable() -> Admin.deleteTable()（先disable再delete）
2.8.2 数据写入操作（Table.put）
单条插入：Table.put(Put)
Put对象构造：new Put(byte[] rowKey) -> put.addColumn(family, qualifier, value)
2.8.3 数据删除操作（Table.delete）
删除数据：Table.delete(Delete)
Delete对象构造：new Delete(byte[] rowKey)
2.8.4 数据读取操作（Get）
单条读取：Table.get(Get)
Get对象构造：new Get(byte[] rowKey)
返回结果：Result对象
2.8.5 批量扫描操作（Scan）
扫描读取：Table.getScanner(Scan)
Scan对象配置：
scan.withStartRow(byte[] startRow)：起始RowKey
scan.withStopRow(byte[] stopRow)：结束RowKey
scan.addFamily(byte[] family)：指定列族
返回结果：ResultScanner迭代器
2.8.6 Filter过滤器
主要过滤器：SingleColumnValueFilter
作用：基于单列值进行条件过滤
构造方法：new SingleColumnValueFilter(byte[] family, byte[] qualifier, CompareOperator op, byte[] value)
比较操作符：CompareOperator.EQUAL、GREATER、LESS等
2.9 HBase性能优化 - 表设计层面
优化方向
具体策略
说明
Region预创建
预先创建Region避免自动分裂
避免数据热点和分裂开销
RowKey设计
短、小、散列
短减少IO、散列避免热点
Column Family数量
不宜太多
建议1-3个，过多影响性能
Max Version
设置最大版本数
控制历史版本数量
Time To Live (TTL)
设置数据过期时间
自动清理过期数据
2.10 HBase性能优化 - 写操作
优化手段
说明
Write Buffer
客户端写缓冲区，批量提交减少RPC次数
WAL Flag
关闭WAL（Mutation.setWriteToWAL(false)）提升写入速度（牺牲部分可靠性）
批量写
使用Table.put(List<Put>)批量写入
2.11 HBase性能优化 - 读操作
优化手段
说明
Scanner Caching
scan.setCaching(int)设置每次RPC获取的行数，减少RPC次数
批量读
使用Table.get(List<Get>)批量读取
三、ElasticSearch（全文检索引擎）
3.1 ElasticSearch核心定义与特性
3.1.1 基本定义
高性能基于Lucene的全文检索服务
分布式Restful搜索和数据分析引擎
3.1.2 四大特点
特点
说明
高性能
基于Lucene倒排索引，查询速度快
扩展性
分布式架构，支持水平扩展
相关度
基于TF-IDF/BM25等算法计算相关性评分
可靠性
支持分片和副本机制，保证数据可靠
3.2 应用场景
日志搜索分析
时空检索
时序检索
智能搜索
3.3 ELK/ELKB生态圈
组件
功能
ElasticSearch
搜索和数据分析引擎
Logstash
数据收集和处理管道
Kibana
数据可视化平台
Beats
轻量级数据采集器
3.4 ElasticSearch整体架构
Client -> EsMaster -> EsNode(Shard + Replica) -> 磁盘
3.4.1 架构组件说明
组件
功能描述
Client
客户端，发送搜索/索引请求
EsMaster
主节点，管理集群元数据、索引创建、分片分配
EsNode
数据节点，存储分片数据、执行CRUD和搜索
Shard（分片）
索引的数据分片，分布式存储的基本单位
Replica（副本）
分片的副本，提供高可用和读扩展
磁盘
底层数据持久化存储
3.5 核心概念
概念
说明
类比
Index（索引）
逻辑命名空间，类似数据库
数据库
Type（文档类型）
文档的分类/类型（6.x后逐步废弃）
表
Document（文档）
可被索引的基本单位，JSON格式
行记录
Mapping（映射）
约束字段的数据类型
Schema
3.6 内部架构层次
Restful Style API  -> Transport / Http / Thrift    -> Discovery / Scripting / Plugins      -> Index Module / Search Module        -> Gateway
层次
功能
Restful Style API
对外提供RESTful接口
Transport/Http/Thrift
通信协议层
Discovery
节点发现和集群管理
Scripting
脚本支持
Plugins
插件扩展机制
Index Module
索引模块
Search Module
搜索模块
Gateway
数据持久化网关
3.7 缓存机制
缓存类型
级别
作用
说明
Query Cache
Node级
缓存查询结果
节点级别共享
Fielddata Cache
分片级
缓存分词字段数据
用于聚合和排序，内存消耗大
Request Cache
Shard级
缓存分片级请求结果
每个分片独立缓存
3.8 倒排索引（Inverted Index）
3.8.1 基本概念
定义：通过Value找Key的索引结构（vs 正排索引Key找Value）
核心思想：将文档中的词项映射到包含该词项的文档列表
优势：快速全文搜索
3.8.2 倒排索引 vs 正排索引
对比维度
正排索引
倒排索引
索引方向
Key -> Value（文档ID -> 内容）
Value -> Key（词项 -> 文档ID列表）
适用场景
精确查询
全文检索
查询方式
遍历文档
直接定位文档
3.9 索引流程（Index Flow）
客户端发送索引请求 -> 接收节点 -> 转发到目标主分片(Primary Shard)   -> 主分片写入 -> 并行复制到副本分片(Replica Shard)     -> 副本确认 -> 返回客户端成功响应
步骤
说明
1. 客户端请求
发送索引请求到任意节点
2. 路由转发
根据_routing计算目标分片
3. 主分片写入
Primary Shard执行写入操作
4. 并行复制
同时复制到所有Replica Shard
5. 确认返回
收到足够副本确认后返回客户端
3.10 搜索流程（Search Flow）
客户端发送搜索请求 -> 接收节点(Coordinating Node)   -> 转发到所有相关分片(包括主分片和副本分片)并行查询     -> 各分片返回局部结果 -> 汇总排序       -> 返回客户端最终结果
阶段
名称
说明
阶段1
Query Phase
协调节点将查询分发到各分片，收集文档ID和评分
阶段2
Fetch Phase
协调节点根据ID获取完整文档内容
3.11 客户端curl命令
3.11.1 HTTP方法对应操作
HTTP方法
操作类型
GET
查询数据
POST
创建/更新/查询
PUT
创建/更新索引或文档
DELETE
删除索引或文档
3.11.2 常用curl命令
操作
命令示例
查看集群健康状态
curl -X GET "localhost:9200/_cluster/health"
新建索引
curl -X PUT "localhost:9200/index_name"
写入数据
curl -X POST "localhost:9200/index/_doc/id" -d '{"field":"value"}'
查询数据
curl -X GET "localhost:9200/index/_search" -d '{"query":{...}}'
3.12 ElasticSearch SQL
属性
说明
支持版本
6.3.0+
特点
兼容JDBC协议
用途
用SQL语法查询ES数据，降低学习成本
3.13 ElasticSearch Java API
3.13.1 API类型对比
API类型
特点
适用场景
TransportClient
原生API、功能全面
需要完整功能的场景（已废弃）
RestClient
基于HTTP、可移植性高
推荐使用的标准API
3.13.2 TransportClient操作
1) 获取客户端
Settings settings = Settings.builder()    .put("cluster.name", "集群名称")    .put("transport.sniff", true)  // 自动发现集群节点    .build();TransportClient client = new PreBuiltTransportClient(settings)    .addTransportAddress(new TransportAddress(InetAddress.getByName("host"), 9300));
关键配置参数：cluster.name（集群名称）、transport.sniff（自动嗅探节点）
端口：9300（Transport协议端口）
2) 索引管理（IndicesAdminClient） - 创建索引：client.admin().indices().create(CreateIndexRequest) - 删除索引：client.admin().indices().delete(DeleteIndexRequest)
3) 设置Mapping - 通过PutMappingRequest设置字段类型映射
4) 查询操作（QueryBuilder） - QueryBuilders.queryStringQuery(String queryString)：字符串查询 - QueryBuilders.termQuery(String name, Object value)：精确匹配 - QueryBuilders.matchQuery(String name, Object text)：分词匹配 - QueryBuilders.boolQuery()：布尔组合查询
3.13.3 RestClient操作
1) 构建客户端
RestClient client = RestClient.builder(    new HttpHost("host", 9200))    .build();
2) 创建索引 - HTTP方法：PUT - 端点：/{index_name}
3) 删除索引 - HTTP方法：DELETE - 端点：/{index_name}
4) 查询文档 - HTTP方法：GET - 端点：/{index}/_doc/{id} 或 /{index}/_search
3.14 性能优化 - 分片与副本
优化项
建议值
说明
分片数
不超过节点数的3倍
避免过多分片消耗资源
副本数
建议1个
保证高可用的最小副本数
分片最大容量
不超过32GB
超过32G会影响性能和恢复速度
3.15 性能优化 - 快速平衡配置
配置参数
作用
cluster.routing.allocation.cluster_concurrent_rebalance
控制集群并发重平衡的分片数量
indices.recovery.max_bytes_per_sec
控制分片恢复的最大传输速率
四、GES（图引擎服务）
4.1 GES核心定义与特性
4.1.1 基本定义
基于HBase和ES的分布式图数据库
采用属性图模型（Property Graph Model）存储
4.1.2 四大特点
特点
说明
大规模
支持百亿节点、千亿关系
高性能
秒级多层关联查询
查询分析一体
同时支持图查询和图分析
简单易用
提供标准REST/Gremlin接口
4.2 应用场景
金融反欺诈
工业领域
社交分析
物流网规
4.3 技术架构
接口层(Gremlin API / REST API)   -> 应用层     -> 接入层(LoadBalancer)       -> 计算层(GES图核心引擎)         -> 存储层(HBase + ES)
4.3.1 各层说明
层级
组件
功能
接口层
Gremlin API、REST API
对外提供查询接口
应用层
-
业务应用层
接入层
LoadBalancer
负载均衡
计算层
GES图核心引擎
图计算和查询引擎
存储层
HBase + ES
HBase存储图数据、ES建索引加速查询
4.4 技术原理
技术点
说明
分布式存储
基于HBase实现图的分布式存储
分布式计算导入
基于Spark分布式内存计算进行数据导入
索引快速查询
基于ES建立索引实现快速查询
4.5 图基本概念
4.5.1 核心概念一览
概念
英文
说明
图
Graph
数据结构，包含点、边、属性
节点/顶点
Vertex
实体对象，图的基本单元
节点类型
Vertex Label
对节点进行分类（如”人”、“公司”）
边
Edge
连接两个节点的关系，有向边
边类型
Edge Label
对边进行分类（如”朋友”、“交易”）
属性
Property
Key-Value结构，描述节点或边的特征
属性类型
Property Key
属性的名称（如”name”、“age”）
4.5.2 属性图模型特征
每个节点/边都可以有属性
节点和边都有类型标签
边是有方向的
属性以Key-Value对形式存储
4.6 REST接口操作
操作
接口功能
创建图
新建一个图实例
删除图
删除图实例
创建propertyKey
定义属性类型
创建vertexLabel
定义节点类型
创建edgeLabel
定义边类型
创建节点
添加顶点数据
创建边
添加边数据
查询节点
根据条件查询顶点
查询边
根据条件查询边
全图查询
遍历整个图
路径查询
查找两节点间的路径
创建索引
为属性创建索引加速查询
4.7 Gremlin（图遍历语言）
4.7.1 基本概念
定义：Apache TinkerPop图遍历语言
特点：函数式数据流语言
用途：图的遍历、查询和分析
4.7.2 Gremlin客户端常用命令
命令
功能
说明
g.V()
查询所有节点
V = Vertex
g.V().valueMap()
获取所有节点的属性
返回属性的键值对
g.V().hasLabel("label").values("prop")
按标签过滤节点并获取属性
链式操作
g.E()
查询所有边
E = Edge
g.E().valueMap()
获取所有边的属性
返回边的属性键值对
4.7.3 Gremlin Java API
1) 客户端连接
// 创建集群连接Cluster cluster = Cluster.open("conf/remote.yaml");Client client = cluster.connect();
2) 查询提交方式 - 同步提交：client.submit(String gremlin).all().get() - 异步提交：client.submit(String gremlin) 返回异步结果
3) 图遍历（GraphTraversalSource）
GraphTraversalSource g = traversal().withRemote(DriverRemoteConnection.using(cluster));// 遍历所有节点g.V().valueMap();// 遍历所有边g.E().valueMap();
五、实时检索实际案例与项目实践
5.1 业务需求
根据身份证号查询住宿/通关/网吧登记信息
根据姓名查询
根据地址查询
根据时间查询
目标数据类型：住宿登记、通关记录、网吧登记
5.2 项目开发流程
环境准备 -> 安全认证 -> 样例工程学习 -> 代码开发 -> 单元测试 -> 应用部署 -> 上线运维
5.3 项目结构
模块
功能
数据导入
将原始数据导入HBase和ES
数据查询
实现检索业务逻辑
服务部署
部署应用服务
数据可视化
前端展示查询结果
5.4 实验技术细节
5.4.1 HBase表设计
设计要素
具体方案
列族1
Basic - 基础信息
列族2
OtherInfo - 其他信息
RowKey设计
根据查询场景设计（如身份证号反转等）
5.4.2 ES索引设计
设计要素
具体方案
Mapping设置
定义字段数据类型
keyword类型
用于精确匹配（身份证号、姓名等）
text类型
用于全文检索（地址等）
date类型
用于时间范围查询
5.4.3 搜索逻辑设计
用户输入查询条件 -> ES执行搜索 -> ES返回匹配文档的ID列表   -> 根据ID查询HBase获取完整数据 -> 返回完整结果
核心流程：先搜ES返回id，再查HBase获取完整数据
5.4.4 复合查询封装（ES Query类型）
Query类型
用途
termQuery
精确匹配（不分词）
matchPhraseQuery
短语匹配（保持词序）
rangeQuery
范围查询（时间、数字范围）
termsQuery
多值精确匹配
notTermsQuery
排除多值匹配
5.4.5 前端技术栈
技术
用途
Spring Boot
后端应用框架
Thymeleaf
服务端模板引擎
Bootstrap
前端UI框架
5.4.6 Maven工程依赖配置
项目使用Maven管理依赖
需要配置HBase客户端依赖
需要配置ES客户端依赖
需要配置Spring Boot相关依赖
5.5 华为云环境搭建
资源
用途
VPC
虚拟私有云，网络隔离
MRS
托管HBase集群
CSS (Cloud Search Service)
托管ElasticSearch集群
ECS
弹性云服务器，部署应用
安全组
配置网络访问策略，开放必要端口
六、组件对比与选型总结
6.1 三大组件能力对比
维度
HBase
ElasticSearch
GES
核心定位
海量数据主键查询
实时搜索/文档检索
图查询分析
数据模型
KeyValue / 宽列存储
文档型(JSON)
属性图模型
查询类型
RowKey精确查询、Scan范围扫描
全文检索、条件过滤、聚合
图遍历、关联分析
存储引擎
HFile/MemStore
Lucene倒排索引
HBase + ES
最佳场景
主键查询、海量随机读
关键词搜索、日志分析
关系分析、反欺诈
并发能力
高
高
高
延迟
毫秒级
秒级
秒级
6.2 实时检索方案选型原则
查询需求
推荐组件
主键/ID精确查询
HBase
关键词全文搜索
ElasticSearch
非主键字段条件检索
ElasticSearch
图关系/关联分析
GES
组合场景（先条件检索再取详情）
ES + HBase联合
七、关键技术要点速查
7.1 HBase关键技术点
RowKey设计原则：短（节省存储）、小（减少IO）、散（避免热点）
版本控制：通过Timestamp和Max Version控制
BloomFilter作用：减少无效IO，优化Get查询
MemStore刷写条件：内存阈值、时间阈值、手动触发
SQL支持：Phoenix性能最优（毫秒级）
7.2 ElasticSearch关键技术点
倒排索引：全文检索的核心数据结构
分片与副本：Shard=数据分片，Replica=高可用副本
搜索两阶段：Query Phase + Fetch Phase
API演进：TransportClient(已废弃) -> RestClient(推荐)
Mapping类型：keyword（精确匹配）、text（全文检索）、date（日期）
7.3 GES关键技术点
底层依赖：HBase存储 + ES索引
查询语言：Gremlin（图遍历）+ REST API
数据模型：属性图（节点+边+属性）
规模能力：百亿节点、千亿关系
典型场景：金融反欺诈（多层关联分析）
7.4 检索方案设计要点
联合检索模式：ES负责条件检索返回ID，HBase负责根据ID取完整数据
数据双写：数据导入时需同时写入HBase和ES
一致性保证：需要考虑HBase和ES的数据一致性策略
第四模块：大数据实时流计算场景化解决方案（考试占比30%）
来源：HCIP-Big Data Developer V2.0 培训教材第4章 & 实验手册第3章
一、实时流处理概述
1.1 数据实时处理流程
数据生成 -> 实时采集 -> 实时缓存存储 -> 实时计算 -> 实时落地 -> 实时展示 -> 实时分析
时效要求：秒级甚至毫秒级
1.2 实时处理核心意义
数据价值随时间迅速减少：数据产生后的价值随时间推移快速衰减，处理速度至关重要
核心价值：在数据价值最高的时间段内完成处理和分析
1.3 典型场景：信用卡反欺诈
交易渠道 -> 欺诈识别(数据清洗/神经网络/业务规则) -> 主机(账务/冻结)
1.4 实时流处理系统诉求（7大诉求）
诉求
说明
处理速度快
秒级响应
吞吐量高
数十兆/秒/节点
可靠性高
不丢失、不重复
水平扩展
可弹性扩容
多数据源支持
适配多种数据源接入
数据权限和资源隔离
多租户安全隔离
第三方工具对接
支持与其他系统集成
1.5 华为实时流处理技术架构
Flume(数据采集) -> Kafka(消息队列) -> Flink/Structured Streaming(实时计算) -> Redis/MySQL(数据存储) -> 可视化展示
组件
角色定位
Flume
数据采集
Kafka
消息队列（实时缓存）
Flink / Structured Streaming
实时计算引擎
Redis / MySQL
实时数据存储落地
可视化工具
实时展示与分析
二、Flume
2.1 Flume基础概念
2.1.1 定义与定位
定义：分布式、高可靠、高可用的海量日志采集、聚合与传输系统
定位：实时数据采集层核心组件
2.1.2 核心能力
能力
说明
固定目录采集
监控指定目录下的文件变化
实时采集(taildir)
实时追踪文件尾部新增内容
级联合并
多Agent级联实现数据汇聚
定制采集
支持自定义开发采集逻辑
2.1.3 核心数据单元：Event
定义：Flume中数据传输的基本单元
结构：
Header：Key-Value键值对形式，存储元数据
Body：ByteArray字节数组，存储实际数据内容
2.2 Flume核心组件架构
2.2.1 组件关系
Source(数据源) -> Channel(缓存队列) -> Sink(数据目的地)
2.2.2 Source（数据源）
作用：接收events，是数据进入Flume的入口
分类：
驱动型(Driven)：外部系统主动发送数据到Source
轮询型(Polling)：Flume主动从外部系统获取数据
Source类型清单：
Source类型
说明
exec
执行命令采集（如tail -F）
avro
Avro协议接收数据（用于级联）
thrift
Thrift协议接收数据
http
HTTP请求接收数据
syslog
Syslog协议采集
spooling directory
监控目录文件
jms
JMS消息队列
kafka
Kafka消费者
2.2.3 Channel（缓存队列）
作用：Source和Sink之间的缓存队列，解耦生产与消费速率
Channel类型对比：
Channel类型
持久化
特点
适用场景
Memory Channel
不持久化
高吞吐，数据存内存
容忍数据丢失，追求性能
File Channel
基于WAL持久化
数据安全，落盘存储
不允许数据丢失
JDBC Channel
基于Derby数据库持久化
数据库级可靠性
高可靠要求场景
2.2.4 Sink（数据目的地）
作用：将events传输到下一跳或最终目的地
Sink类型清单：
Sink类型
说明
hdfs
写入HDFS
avro
通过Avro协议发送到下一跳Agent
thrift
通过Thrift协议发送
file roll
本地文件滚动写入
hbase
写入HBase
kafka
发送到Kafka
MorphlineSolr
发送到Solr
2.3 Flume部署架构
2.3.1 单Agent架构
适用场景：集群内部数据采集
结构：单个Source -> Channel -> Sink
2.3.2 多Agent级联架构
适用场景：集群外数据汇聚到集群内
结构：Agent1(采集) -> Agent2(汇聚) -> 最终存储
级联方式：通过avro/thrift Sink和Source实现跨节点传输
2.4 Flume高级组件
2.4.1 Interceptors（拦截器）
作用：在Event传输过程中对数据进行拦截和处理
类型清单：
拦截器
功能
Timestamp
添加时间戳到Header
Host
添加主机名到Header
Static
添加静态KV到Header
UUID
添加唯一标识到Header
Regex Filtering
基于正则表达式过滤
自定义
用户自定义拦截逻辑
2.4.2 Channel Selectors（选择器）
作用：决定Source接收的Event分发到哪个Channel
类型：
选择器
说明
配置
Replicating
默认，复制到所有Channel
所有Channel收到相同数据
Multiplexing
根据Header内容分发
按Header的key值路由到不同Channel
2.4.3 Sink Processor
作用：管理Sink组的处理策略
类型：
处理器
说明
Default
默认，单个Sink
Failover
故障转移，主Sink故障时切换到备用Sink
Load balance
负载均衡，多个Sink间分发数据
2.5 Flume高级配置
2.5.1 负载均衡配置
# Sink组配置sinkgroups.processor.type = load_balancesinkgroups.processor.selector = round_robin
说明：多个Sink间按round_robin轮询方式分发数据
2.5.2 故障转移配置
# Sink组故障转移配置sinkgroups.processor.type = failoversinkgroups.processor.priority.<sink_name> = <优先级数值>
说明：优先级数值高的Sink优先工作，故障时自动切换到次高优先级Sink
2.5.3 典型配置示例（spooldir -> memory -> hdfs）
# Agent组件定义agent.sources = src1agent.channels = ch1agent.sinks = sink1# Source配置（监控目录）agent.sources.src1.type = spooldiragent.sources.src1.spoolDir = /var/log/app/agent.sources.src1.channels = ch1# Channel配置（内存通道）agent.channels.ch1.type = memoryagent.channels.ch1.capacity = 10000agent.channels.ch1.transactionCapacity = 1000# Sink配置（HDFS）agent.sinks.sink1.type = hdfsagent.sinks.sink1.hdfs.path = hdfs://namenode/flume/data/%Y/%m/%dagent.sinks.sink1.hdfs.fileType = DataStreamagent.sinks.sink1.channel = ch1
三、Kafka
3.1 Kafka基础概念
3.1.1 定义与定位
定义：高吞吐、分布式、基于发布/订阅模式的消息系统
开发方：LinkedIn开发
开发语言：Scala编写
定位：实时流处理中的消息队列/缓存层
3.1.2 核心特点
特点
说明
高吞吐量
支持每秒百万级消息
分布式
支持集群部署，水平扩展
发布/订阅
支持多消费者独立消费
持久化
消息落盘存储，可回溯消费
3.2 Kafka拓扑结构
Producer(生产者) -> Broker(代理) -> Consumer(消费者)                    |              ZooKeeper(协调服务)
依赖：Kafka集群依赖ZooKeeper进行协调管理
3.3 Kafka核心概念
3.3.1 Topic（主题）
定义：消息类别/队列，生产者按Topic发送消息，消费者按Topic订阅消息
特点：逻辑上的消息分类单元
3.3.2 Broker（代理）
定义：Kafka集群中的一台或多台服务器
功能：缓存代理，接收和存储消息
机制：
buffer消息到一定阈值后flush到磁盘
无状态机制：
无副本（注：较旧版本描述，新版本支持副本）
不保存订阅者状态
基于时间SLA删除消息（默认7天）
支持rewind回溯消费
3.3.3 Logs（日志存储）
结构：Topic的Partition是一个大文件，分成多个小文件段（segment）
优势：分段便于清理和恢复
3.3.4 Log Cleanup（日志清理策略）
策略
说明
配置参数
delete（删除）
按时间或大小删除旧日志
log.cleanup.policy=delete
compact（压缩）
保留同一key的最新value
log.cleanup.policy=compact
关键配置参数：
log.retention.hours：日志保留时间，默认168小时（7天）
log.retention.bytes：日志保留大小上限
3.3.5 Consumer Group（消费组）
机制：
组内：同一Group内的Consumer消费不同的Partition，实现负载均衡
组间：不同Group之间独立消费，互不影响
特点：一个Partition只能被同一Group内的一个Consumer消费
3.4 Kafka命令行操作
3.4.1 创建主题
kafka-topics.sh --create \  --topic <topic_name> \  --partitions <分区数> \  --replication-factor <副本数> \  --bootstrap-server <broker_host:port>
3.4.2 生产数据
kafka-console-producer.sh \  --topic <topic_name> \  --bootstrap-server <broker_host:port>
3.4.3 消费数据
# 从最新位置消费kafka-console-consumer.sh \  --topic <topic_name> \  --bootstrap-server <broker_host:port># 从头开始消费kafka-console-consumer.sh \  --topic <topic_name> \  --from-beginning \  --bootstrap-server <broker_host:port>
3.5 Kafka Java API操作
3.5.1 Maven依赖
<dependency>    <groupId>org.apache.kafka</groupId>    <artifactId>kafka_2.12</artifactId>    <version>${kafka.version}</version></dependency>
3.5.2 Java Producer（生产者）
// 配置Properties props = new Properties();props.put("bootstrap.servers", "host1:9092,host2:9092");props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");KafkaProducer<String, String> producer = new KafkaProducer<>(props);// 发送消息ProducerRecord<String, String> record = new ProducerRecord<>("topic_name", "key", "value");producer.send(record);producer.close();
关键配置参数：
参数
说明
bootstrap.servers
Kafka Broker地址列表
key.serializer
Key的序列化器
value.serializer
Value的序列化器
3.5.3 Java Consumer（消费者）
// 配置Properties props = new Properties();props.put("bootstrap.servers", "host1:9092,host2:9092");props.put("group.id", "my_consumer_group");props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);// 订阅主题consumer.subscribe(Arrays.asList("topic_name"));// 消费消息while (true) {    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));    for (ConsumerRecord<String, String> record : records) {        System.out.printf("offset=%d, key=%s, value=%s%n",             record.offset(), record.key(), record.value());    }}
关键配置参数：
参数
说明
bootstrap.servers
Kafka Broker地址列表
group.id
消费者组ID
key.deserializer
Key的反序列化器
value.deserializer
Value的反序列化器
3.6 Kafka应用场景
场景
说明
消息队列
异步消息通信
行为数据跟踪
用户行为日志采集
元信息监控
系统监控数据流转
流处理
实时数据管道
日志收集
集中式日志汇聚
四、Flink
4.1 Flink基础概念
4.1.1 定义与定位
定义：批处理和流处理结合的统一计算框架，流数据处理引擎
定位：实时计算层核心组件
4.1.2 部署模式
部署模式
说明
YARN
在Hadoop YARN上部署
Mesos
在Mesos资源管理器上部署
Kubernetes
在K8s容器平台部署
裸机(Standalone)
独立集群部署
4.1.3 核心特点
特点
说明
高可用
无单点故障
高吞吐低延迟
兼顾吞吐量和延迟
准确结果
支持无序/延迟数据处理，保证结果正确性
状态化容错
Exactly-once一致性语义
大规模运行
支持大规模集群部署
4.1.4 应用场景
场景
说明
欺诈识别
实时交易风险判断
异常检测
系统/数据异常实时发现
规则警报
基于规则的实时告警
业务流程管理
实时业务流程监控
Web应用
实时Web数据分析
4.2 Flink关键概念
4.2.1 事件驱动（Event-Driven）
定义：根据事件流提取数据、执行计算和更新状态
特点：以事件为基本处理单元，而非时间驱动
4.2.2 时间语义
时间类型
英文
定义
说明
事件时间
Event Time
数据产生的时间
业务时间，推荐使用时钟
处理时间
Processing Time
机器处理数据的时间
机器本地时间
4.2.3 有状态流处理（Stateful Stream Processing）
定义：在处理过程中保持计算状态和依赖关系
特点：支持复杂计算逻辑，如聚合、连接等需要维护中间结果的运算
4.2.4 状态快照：Checkpoint机制
定义：分布式快照机制，周期性保存流处理状态
存储位置：JobManager内存或HDFS
实现原理：barriers（屏障）周期性插入数据流，将数据流切分为不同快照周期
一致性保证：
Exactly Once：精确一次处理
At Least Once：至少一次处理
4.3 流数据类型
4.3.1 无界流（Unbounded Stream）
特点：有开始，无结束
处理要求：需要持续处理，不能等待数据全部到达
摄取方式：按序摄取（必须按数据产生顺序处理）
4.3.2 有界流（Bounded Stream）
特点：有开始，有结束
处理方式：可等待数据全部读取后再进行计算
本质：即批处理（Batch Processing）
4.4 Window（窗口）
4.4.1 窗口分类
按时间划分：
窗口类型
英文
特点
滚动时间窗口
Tumbling Time Window
固定大小、不重叠、无间隙
滑动时间窗口
Sliding Time Window
固定大小、可重叠、有滑动步长
会话窗口
Session Window
根据活动间隙动态划分
按计数划分：
窗口类型
英文
特点
滚动计数窗口
Tumbling Count Window
固定元素个数、不重叠
滑动计数窗口
Sliding Count Window
固定元素个数、可重叠
4.4.2 Window API
使用前提：必须在KeyBy之后才能使用窗口
常用API：
.timeWindow(Time.seconds(x))：时间窗口
.countWindow(n)：计数窗口
4.4.3 窗口分配器（Window Assigner）
分配器
说明
tumbling
滚动窗口，固定大小不重叠
sliding
滑动窗口，固定大小可重叠
session
会话窗口，按活动间隙划分
global
全局窗口，统一处理
4.4.4 窗口函数（Window Function）
函数类型
具体函数
说明
增量聚合
ReduceFunction
逐步归约计算
增量聚合
AggregateFunction
逐步聚合计算
全窗口
ProcessWindowFunction
收集窗口全部数据后处理
4.4.5 其他Window API
API
说明
trigger
触发器，定义窗口何时触发计算
evictor
移除器，定义窗口中哪些数据被移除
allowedLateness
允许迟到数据的时间
sideOutputLateData
侧输出流，收集迟到数据
4.5 Checkpoint机制详解
4.5.1 工作原理
JobManager周期性向Source发送barrier
barrier随数据流向下游传播
每个算子收到barrier后快照当前状态
所有算子完成快照后，Checkpoint完成
4.5.2 一致性级别
级别
说明
性能
Exactly Once
精确一次，不丢不重复
相对较低
At Least Once
至少一次，不丢但可能重复
相对较高
4.6 Flink程序组成
4.6.1 三要素
Stream(数据流) + Transformation(转换算子) + Sink(输出)
4.7 DataStream API详解
4.7.1 执行环境
环境获取方式
适用场景
getExecutionEnvironment()
自动判断（本地/集群）
createLocalEnvironment()
本地开发调试
createRemoteEnvironment()
远程集群提交
4.7.2 Source（数据源）
Source类型
说明
集合
从Java集合读取
消息队列
Kafka等消息队列
文件
从文件系统读取
自定义
实现自定义SourceFunction
4.7.3 Transformation（转换算子）
算子
说明
KeyBy
按key的hash值分区
sum
滚动求和
min
滚动取最小值
max
滚动取最大值
minBy
取最小值及对应记录
maxBy
取最大值及对应记录
window
窗口计算
4.7.4 Sink（数据输出）
Sink类型
说明
Kafka
输出到Kafka
ES
输出到Elasticsearch
Redis
输出到Redis
JDBC
输出到关系型数据库
HDFS
输出到HDFS
4.8 Table API
定位：集成查询API，将DataStream注册为表进行查询
支持语言：Scala / Java
4.9 SQL API
定位：标准ANSI SQL接口
支持语法：
FROM：数据源
WHERE：过滤条件
GROUP BY：分组聚合
JOIN：表连接
时间窗口：TUMBLE / HOP / SESSION
INSERT：结果输出
4.10 Flink CEP
全称：Complex Event Processing（复杂事件处理）
定位：Flink的复杂事件处理库
核心API：Pattern API，用于定义事件模式
应用场景：欺诈检测、模式匹配、规则引擎
4.11 Flink SQL Hive Streaming
版本要求：Flink 1.11+
功能：实现Hive的流批一体处理
意义：统一批处理和流处理的SQL接口
五、Structured Streaming
5.1 Structured Streaming基础概念
5.1.1 定义与定位
定义：构建在Spark SQL引擎上的流式数据处理引擎
开发语言：Scala编写
内置功能：容错功能
定位：Spark生态中的实时流处理组件
5.1.2 两种处理模式
模式
延迟
一致性
说明
微批处理（默认）
有一定延迟（秒级）
强一致性
将流数据切分为小批次处理
持续处理
毫秒级延迟
牺牲一致性
持续处理每条数据
5.2 核心编程模型
5.2.1 核心抽象
核心思想：流式数据 = 不断增加的无界数据库表
处理方式：对不断增加的表执行标准SQL查询操作
结果产出：每次查询产生的结果写入Result Table
5.2.2 Result Table（结果表）
定义：查询操作产生的结果集
特点：随新数据到达持续更新
5.3 Output模式
模式
英文
说明
适用场景
完整模式
Complete Mode
输出完整结果集
聚合查询
追加模式
Append Mode
仅输出新增数据
非聚合查询
更新模式
Update Mode
仅输出更新/变化的数据
有更新的查询
5.4 时间窗口
5.4.1 时间语义
时间类型
说明
处理时间
数据被处理的时间
事件时间
数据产生的时间
5.4.2 Watermark（水位线）
作用：处理事件时间下的滞后数据
机制：允许一定时间延迟的数据到达后仍可被处理
5.5 触发器（Trigger）
触发器类型
说明
默认
微批模式下的默认触发
ProcessingTime
按固定时间间隔触发
Once
仅执行一次处理
Continuous
连续处理模式
5.6 流连接（Stream Join）
版本要求：Spark 2.x+
功能：支持流与流的连接操作
机制：缓冲过去输入流的数据以匹配未来到达的输入
5.7 Source数据源
数据源
说明
HDFS
文件系统数据源
Kafka
Kafka消费者
RateStream
速率生成流（测试用）
RDBMS
关系型数据库
Socket
Socket流（测试用）
5.8 Sink输出源
输出源
说明
HDFS
写入文件系统
ForeachSink
自定义foreach处理
RDBMS
写入关系型数据库
Kafka
发送到Kafka
Console
控制台输出（调试用）
六、Redis
6.1 Redis基础概念
6.1.1 定义与定位
定义：高性能key-value内存数据库
定位：实时流处理中的高速缓存/结果存储层
6.1.2 使用场景特点
特点
说明
高性能
内存操作，读写速度极快
低时延
亚毫秒级响应
数据类型丰富
支持String/Hash/List/Set/Sorted Set等多种类型
支持持久化
RDB快照和AOF日志两种方式
6.2 应用场景清单
场景
实现方式
取最新N个数据
List的lpush + lrange
排行榜(TOP N)
Sorted Set的zrevrange
精准过期时间(会话)
expire设置TTL
计数器
String的incr/decr
队列系统
List的lpush/rpop
缓存
String的set/get
发布订阅
pub/sub命令
手机验证码
String + expire
6.3 架构特点
架构模式：无中心自组织结构
节点通信：Gossip协议交换节点状态
客户端请求：Client可向任意节点发起请求
6.4 多数据库
配置/命令
说明
默认数据库数量
16个（编号0-15）
SELECT
切换数据库，如 SELECT 0
flushall
清空所有数据库
flushdb
清空当前数据库
6.5 基础命令
命令
说明
示例
keys
按表达式查找键
keys user:
exists
判断key是否存在
exists mykey
del
删除key
del mykey
type
返回key的数据类型
type mykey
6.6 数据类型及命令详解
6.6.1 String（字符串）
特点：最基本数据类型，单个value最大1GB
命令清单：
命令
功能
示例
set
设置key-value
set name "zhang"
get
获取value
get name
mset
批量设置
mset k1 v1 k2 v2
mget
批量获取
mget k1 k2
incr
自增1
incr count
decr
自减1
decr count
incrby
按指定值自增
incrby count 5
decrby
按指定值自减
decrby count 3
incrbyfloat
按浮点数自增
incrbyfloat price 1.5
append
追加内容
append name "san"
strlen
获取字符串长度
strlen name
6.6.2 Hash（哈希）
特点：字段映射表，最多2^32-1个字段
命令清单：
命令
功能
示例
hset
设置字段值
hset user:1 name "zhang"
hget
获取字段值
hget user:1 name
hmset
批量设置字段
hmset user:1 name "zhang" age 20
hmget
批量获取字段
hmget user:1 name age
hgetall
获取所有字段和值
hgetall user:1
hexists
判断字段是否存在
hexists user:1 name
hincrby
字段值按整数自增
hincrby user:1 age 1
hdel
删除字段
hdel user:1 age
hkeys
获取所有字段名
hkeys user:1
hvals
获取所有字段值
hvals user:1
hlen
获取字段数量
hlen user:1
6.6.3 List（有序双向链表）
特点：有序双向链表，最多2^32-1个元素
命令清单：
命令
功能
示例
lpush
左侧插入元素
lpush mylist "a"
rpush
右侧插入元素
rpush mylist "b"
lpop
左侧弹出元素
lpop mylist
rpop
右侧弹出元素
rpop mylist
llen
获取列表长度
llen mylist
lrange
获取指定范围元素
lrange mylist 0 -1
lrem
删除指定元素
lrem mylist 1 "a"
lindex
获取指定索引元素
lindex mylist 0
lset
设置指定索引值
lset mylist 0 "new"
ltrim
保留指定范围
ltrim mylist 0 9
linsert
在指定元素前后插入
linsert mylist before "a" "new"
rpoplpush
右弹出左插入（原子操作）
rpoplpush src dst
6.6.4 Set（不重复无序集合）
特点：元素不重复、无序，最多2^32-1个元素
命令清单：
命令
功能
示例
sadd
添加元素
sadd myset "a"
smembers
获取所有元素
smembers myset
srem
删除元素
srem myset "a"
sismember
判断元素是否存在
sismember myset "a"
sdiff
差集
sdiff set1 set2
sinter
交集
sinter set1 set2
sunion
并集
sunion set1 set2
sdiffstore
差集存储到新set
sdiffstore dst set1 set2
sinterstore
交集存储到新set
sinterstore dst set1 set2
sunionstore
并集存储到新set
sunionstore dst set1 set2
scard
获取元素个数
scard myset
spop
随机弹出元素
spop myset
srandmember
随机获取元素（不移除）
srandmember myset 1
6.6.5 Sorted Set（有序集合）
特点：每个元素关联一个分数(score)，按分数排序
命令清单：
命令
功能
示例
zadd
添加元素（带分数）
zadd myzset 100 "member1"
zscore
获取元素分数
zscore myzset "member1"
zrange
按分数升序获取
zrange myzset 0 -1
zrevrange
按分数降序获取
zrevrange myzset 0 9
zrangebyscore
按分数范围获取
zrangebyscore myzset 0 100
zincrby
元素分数自增
zincrby myzset 10 "member1"
zcard
获取元素总数
zcard myzset
zcount
获取分数范围内元素数
zcount myzset 0 100
zrem
删除元素
zrem myzset "member1"
zremrangebyrank
按排名范围删除
zremrangebyrank myzset 0 9
zremrangebyscore
按分数范围删除
zremrangebyscore myzset 0 100
6.7 键生存时间（TTL）
命令
单位
功能
示例
expire
秒
设置过期时间
expire mykey 60
pexpire
毫秒
设置过期时间
pexpire mykey 60000
ttl
秒
查询剩余过期时间
ttl mykey
pttl
毫秒
查询剩余过期时间
pttl mykey
persist
-
移除过期时间（持久化）
persist mykey
expireat
秒级时间戳
指定时间过期
expireat mykey 1893456000
pexpireat
毫秒级时间戳
指定时间过期
pexpireat mykey 1893456000000
6.8 Pipeline管道
功能：批量操作命令，减少网络往返，提升性能
性能对比：1000条数据从328ms降至37ms（提升约9倍）
6.9 持久化机制
6.9.1 RDB（快照持久化）
特性
说明
触发命令
save（阻塞）/ bgsave（后台）
机制
定时快照保存内存数据到磁盘
条件触发配置
save 900 1（900秒内1次变更触发）
save 300 10（300秒内10次变更触发）
save 60 10000（60秒内10000次变更触发）
6.9.2 AOF（日志持久化）
特性
说明
开启配置
appendonly yes
机制
记录每个写操作到日志文件
同步策略
always（每次写入都同步）
everysec（每秒同步，默认推荐）
no（由操作系统决定同步时机）
6.9.3 RDB vs AOF 对比与选择
对比维度
RDB
AOF
恢复优先级
低
高（优先使用AOF恢复）
文件大小
紧凑（二进制）
较大（文本日志）
恢复速度
快
相对慢
数据安全性
可能丢失最后一次快照后的数据
最多丢失1秒数据（everysec）
RDB切换AOF：使用 CONFIG SET appendonly yes 命令
6.10 Java操作Redis
6.10.1 JedisCluster连接
// 集群模式连接Set<HostAndPort> nodes = new HashSet<>();nodes.add(new HostAndPort("192.168.1.10", 6379));nodes.add(new HostAndPort("192.168.1.11", 6379));// ... 更多节点JedisCluster jedisCluster = new JedisCluster(nodes);// 基本操作jedisCluster.set("key", "value");String value = jedisCluster.get("key");
七、实时流项目实战
7.1 项目背景
业务需求：电商平台交易订单金额实时统计、每10分钟Top10商品
技术目标：实现实时数据处理与实时可视化展示
7.2 数据格式
字段
说明
ID
记录唯一标识
用户名
用户名称
年龄
用户年龄
性别
用户性别
商品ID
购买的商品标识
购物行为
购买/浏览/收藏等行为类型
电话
用户联系电话
邮箱
用户邮箱地址
购买日期
交易时间
7.3 技术架构
Python(生成测试数据)   -> Flume(数据采集)     -> Kafka(消息队列)       -> Flink(总销售额计算 / 门店排行)       -> Structured Streaming(Top10商品统计)         -> Redis/MySQL(结果存储)           -> 可视化展示
7.4 架构组件分工
组件
职责
Python脚本
模拟生成测试订单数据
Flume
实时采集测试数据
Kafka
消息队列，解耦生产与消费
Flink
实时计算总销售额、门店排行
Structured Streaming
实时统计每10分钟Top10商品
Redis
缓存实时计算结果
MySQL
持久化存储统计结果
可视化工具
展示实时统计图表
7.5 处理流程
数据生成：Python脚本模拟生成电商订单数据
数据采集：Flume实时采集生成的日志数据
消息队列：数据发送到Kafka进行缓存
实时计算：
Flink消费Kafka数据，计算总销售额和门店排行
Structured Streaming消费Kafka数据，统计每10分钟Top10商品
结果存储：计算结果写入Redis（缓存）和MySQL（持久化）
实时展示：可视化工具读取展示实时统计结果
八、综合对比与选型
8.1 实时计算引擎对比
维度
Flink
Structured Streaming
底层引擎
自研流处理引擎
Spark SQL引擎
处理模式
纯流处理（批是流的特例）
微批处理 + 持续处理
延迟
毫秒级
微批秒级 / 持续毫秒级
一致性
Exactly-once
Exactly-once
时间语义
事件时间/处理时间/摄入时间
事件时间/处理时间
SQL支持
Flink SQL
Spark SQL
与Hive集成
Flink SQL Hive Streaming
Spark原生集成
8.2 各组件在架构中的定位总结
层级
组件
核心职责
数据采集
Flume
实时日志采集、聚合、传输
消息缓存
Kafka
高吞吐消息队列、数据缓冲
实时计算
Flink / Structured Streaming
流数据处理与计算
结果存储
Redis / MySQL
实时结果缓存与持久化
数据展示
可视化工具
实时数据可视化