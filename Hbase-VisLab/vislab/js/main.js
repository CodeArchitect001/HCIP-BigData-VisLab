/**
 * HBase Architecture Visualization
 * HCIP-Big Data Developer V2.0
 */

// ===== Component Details Data =====
const componentDetails = {
    client: {
        title: 'Client（客户端）',
        subtitle: '访问接口层',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '提供访问 HBase 的接口',
                    '负责与 ZooKeeper 通信获取元数据信息',
                    '直接与 HRegionServer 进行数据读写交互',
                    '封装了 RPC 调用细节，提供 Java API'
                ]
            },
            {
                heading: '关键 API',
                type: 'list',
                items: [
                    'Admin.createTable() - 创建表',
                    'Table.put() - 写入数据',
                    'Table.get() - 读取数据',
                    'Table.delete() - 删除数据',
                    'Table.getScanner() - 扫描数据'
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['依赖', 'ZooKeeper（获取元数据）'],
                    ['直接通信', 'HRegionServer（读写数据）']
                ]
            }
        ]
    },
    zookeeper: {
        title: 'ZooKeeper（协调服务）',
        subtitle: '分布式协调层',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '管理集群状态，维护集群配置信息',
                    'HMaster 选举：确保集群只有一个活跃的 HMaster',
                    '存储元数据信息：如 Region 分布位置',
                    '监控 RegionServer 心跳，检测节点存活状态'
                ]
            },
            {
                heading: '核心作用',
                type: 'table',
                headers: ['作用', '说明'],
                rows: [
                    ['集群状态管理', '维护集群中各节点的状态信息'],
                    ['Master 选举', '通过 ZAB 协议确保只有一个主 Master'],
                    ['元数据存储', '存储 .META. 表等关键元数据'],
                    ['故障检测', '通过心跳机制检测节点是否存活']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被依赖', 'Client、HMaster、HRegionServer'],
                    ['协调', 'HMaster（选举与状态同步）']
                ]
            }
        ]
    },
    hmaster: {
        title: 'HMaster（主节点）',
        subtitle: '管理节点层',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '管理元数据：维护表结构、Region 分布等',
                    'Region 分配：为 RegionServer 分配 Region',
                    '负载均衡：在 RegionServer 间均衡 Region 分布',
                    '故障恢复：RegionServer 故障时重新分配 Region',
                    'DDL 操作：处理建表、删表、修改表结构等'
                ]
            },
            {
                heading: '管理内容',
                type: 'table',
                headers: ['管理项', '说明'],
                rows: [
                    ['命名空间', '管理表的逻辑分组（Namespace）'],
                    ['表结构', '管理表的列族、属性等元数据'],
                    ['Region', '管理 Region 的分裂、合并、迁移'],
                    ['RegionServer', '监控 RegionServer 状态，分配 Region']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['依赖', 'ZooKeeper（选举与状态同步）'],
                    ['管理', 'HRegionServer（分配 Region、负载均衡）'],
                    ['响应', 'Client（DDL 请求）']
                ]
            }
        ]
    },
    regionserver: {
        title: 'HRegionServer（区域服务器）',
        subtitle: '服务节点层 - 处理实际读写请求',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '处理 Client 发来的实际读写请求',
                    '管理多个 HRegion（数据分片）',
                    '维护 MemStore（写缓存）和 BlockCache（读缓存）',
                    '写入数据时先写 WAL，保证数据不丢失',
                    '执行 Region 的 Flush（刷写）和 Compaction（合并）',
                    '向 HMaster 汇报心跳和负载信息'
                ]
            },
            {
                heading: '内部组成',
                type: 'table',
                headers: ['组件', '说明'],
                rows: [
                    ['BlockCache', '读缓存，所有 Region 共享，缓存热点数据块'],
                    ['WAL / HLog', '预写日志，写入数据先记录到 WAL 保证可靠性'],
                    ['HRegion', '数据分片单元，按 RowKey 范围划分'],
                    ['Store', '列族存储单元，每个列族对应一个 Store'],
                    ['MemStore', '内存写缓存，数据先写入此处'],
                    ['StoreFile / HFile', '磁盘数据文件，MemStore 刷写后生成']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被管理', 'HMaster（Region 分配与负载均衡）'],
                    ['直接服务', 'Client（处理读写请求）'],
                    ['底层存储', 'HDFS（持久化 StoreFile）']
                ]
            }
        ]
    },
    blockcache: {
        title: 'BlockCache（读缓存）',
        subtitle: 'RegionServer 级别 - 所有 Region 共享',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '缓存从 HFile 读取的数据块（Block），加速读操作',
                    'RegionServer 中所有 Region 共享同一块 BlockCache',
                    '读取数据时优先检查 BlockCache，命中则直接返回',
                    'LRU 淘汰策略：缓存满时淘汰最久未使用的数据块'
                ]
            },
            {
                heading: '缓存层级',
                type: 'table',
                headers: ['层级', '说明'],
                rows: [
                    ['L1 BlockCache', '默认实现，使用 BucketCache 或 LRUBlockCache'],
                    ['L2 BucketCache', '可配置为堆外内存缓存，避免 GC 压力'],
                    ['CombinedBlockCache', '结合 L1 和 L2，DataBlock 放 L2，IndexBlock 放 L1']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'HRegionServer（RegionServer 级别共享）'],
                    ['缓存来源', 'StoreFile / HFile（读取磁盘数据时缓存）'],
                    ['配合', 'MemStore（读取时先查 MemStore，再查 BlockCache）']
                ]
            }
        ]
    },
    wal: {
        title: 'WAL / HLog（预写日志）',
        subtitle: 'RegionServer 级别 - 保证写入可靠性',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    'Write Ahead Log：写入数据前先记录日志，保证数据不丢失',
                    'RegionServer 崩溃后，通过重放 WAL 恢复未刷写到磁盘的数据',
                    '每个 RegionServer 维护一个 WAL（HLog），所有 Region 共享',
                    'WAL 写入 HDFS，利用 HDFS 的多副本保证日志可靠性'
                ]
            },
            {
                heading: '写入流程',
                type: 'table',
                headers: ['顺序', '操作'],
                rows: [
                    ['1', 'Client 发送 Put 请求到 RegionServer'],
                    ['2', '数据先写入 WAL（HLog）'],
                    ['3', 'WAL 同步到 HDFS（默认同步策略）'],
                    ['4', '再写入 MemStore'],
                    ['5', '返回写入成功给 Client'],
                    ['崩溃恢复', '重放 WAL 日志，恢复 MemStore 中的数据']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'HRegionServer（RegionServer 级别共享）'],
                    ['写入来源', 'Client 的 Put/Delete 操作'],
                    ['存储', 'HDFS（WAL 文件存储在 HDFS 上）'],
                    ['恢复对象', 'MemStore（崩溃后重放 WAL 恢复 MemStore 数据）']
                ]
            }
        ]
    },
    hregion: {
        title: 'HRegion（数据分片）',
        subtitle: 'RegionServer 内部组件',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '数据分片单元，按 RowKey 范围划分',
                    '一张表可划分为多个 Region，分布在不同 RegionServer 上',
                    'Region 包含多个 Store（每个列族对应一个 Store）',
                    'Region 分裂：当 Region 过大时自动分裂为两个子 Region',
                    'Region 合并：相邻小 Region 可合并以减少元数据开销'
                ]
            },
            {
                heading: '特点',
                type: 'table',
                headers: ['特性', '说明'],
                rows: [
                    ['RowKey 范围', '每个 Region 管理一段连续的 RowKey 范围'],
                    ['自动分裂', 'Region 大小超过阈值时自动分裂'],
                    ['负载均衡', 'HMaster 负责将 Region 均衡分布到各 RegionServer'],
                    ['数据局部性', '同一 Region 的数据存储在同一节点上']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'HRegionServer（RegionServer 管理多个 Region）'],
                    ['包含', 'Store（列族存储单元）']
                ]
            }
        ]
    },
    store: {
        title: 'Store（列族存储单元）',
        subtitle: 'Region 内部组件',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '每个列族（Column Family）对应一个 Store',
                    'Store 由 MemStore（内存）和 StoreFile（磁盘）组成',
                    '数据写入时先进入 MemStore，达到阈值后刷写到 StoreFile',
                    'StoreFile 过多时会触发 Compaction（合并）'
                ]
            },
            {
                heading: '内部组成',
                type: 'table',
                headers: ['组件', '说明'],
                rows: [
                    ['MemStore', '内存写缓存，新写入数据先进入此处'],
                    ['StoreFile / HFile', '磁盘数据文件，MemStore 刷写后生成']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'HRegion（Region 包含多个 Store）'],
                    ['包含', 'MemStore、StoreFile'],
                    ['底层', 'HDFS（StoreFile 存储在 HDFS 上）']
                ]
            }
        ]
    },
    memstore: {
        title: 'MemStore（内存写缓存）',
        subtitle: 'Store 内部组件 - 写缓存',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    '内存中的写入缓冲区，新数据首先写入 MemStore',
                    '数据在 MemStore 中按 RowKey 排序存储',
                    '达到阈值（默认 128MB）后触发 Flush 操作',
                    'Flush 时将数据写入磁盘生成 StoreFile（HFile）'
                ]
            },
            {
                heading: '刷写条件',
                type: 'table',
                headers: ['条件', '说明'],
                rows: [
                    ['内存阈值', 'MemStore 大小达到阈值（默认 128MB）'],
                    ['时间阈值', '超过一定时间未刷写（默认 1 小时）'],
                    ['手动触发', '通过 API 或 Shell 手动触发 Flush'],
                    ['RegionServer 级别', 'RegionServer 内存不足时强制刷写']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'Store（Store 包含 MemStore 和 StoreFile）'],
                    ['刷写生成', 'StoreFile / HFile'],
                    ['读写', 'Client（写入数据先到 MemStore，读取也先查 MemStore）']
                ]
            }
        ]
    },
    storefile: {
        title: 'StoreFile / HFile',
        subtitle: 'Store 内部组件 - 磁盘数据文件',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    'HFile 是 HBase 底层存储文件格式',
                    'MemStore 刷写（Flush）后生成的磁盘数据文件',
                    '存储在 HDFS 上，利用 HDFS 的容错和高吞吐特性',
                    'HFile 中数据按 KeyValue 格式存储，按 RowKey 排序',
                    '支持 BloomFilter 加速随机读取'
                ]
            },
            {
                heading: 'HFile 结构',
                type: 'table',
                headers: ['部分', '说明'],
                rows: [
                    ['Data Block', '存储实际数据（KeyValue 对）'],
                    ['Index Block', 'Data Block 的索引，加速查找'],
                    ['BloomFilter', '快速判断数据是否存在于该 HFile 中'],
                    ['Meta Block', '存储元数据信息'],
                    ['Trailer', '文件尾，指向其他部分的偏移量']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被包含', 'Store（Store 包含 MemStore 和 StoreFile）'],
                    ['来源', 'MemStore（Flush 操作生成）'],
                    ['存储', 'HDFS（HFile 存储在 HDFS 上）']
                ]
            }
        ]
    },
    hdfs: {
        title: 'HDFS（Hadoop 分布式文件系统）',
        subtitle: '底层存储层',
        sections: [
            {
                heading: '功能描述',
                type: 'list',
                items: [
                    'HBase 的底层分布式文件系统',
                    '存储所有 HFile（StoreFile）数据文件',
                    '利用 HDFS 的高容错性（默认 3 副本）',
                    '利用 HDFS 的高吞吐量特性适合大文件存储'
                ]
            },
            {
                heading: '在 HBase 中的作用',
                type: 'table',
                headers: ['作用', '说明'],
                rows: [
                    ['数据持久化', 'HFile 最终存储在 HDFS 上，保证数据不丢失'],
                    ['高可靠性', 'HDFS 默认 3 副本机制保证数据安全'],
                    ['水平扩展', 'HDFS 支持动态扩容，支撑 PB 级数据'],
                    ['读写分离', 'HDFS 适合大文件顺序读写，与 HBase 随机读互补']
                ]
            },
            {
                heading: '相关组件',
                type: 'table',
                headers: ['关系', '组件'],
                rows: [
                    ['被存储', 'StoreFile / HFile（HBase 数据文件）'],
                    ['被包含', 'HRegionServer（RegionServer 将 HFile 写入 HDFS）']
                ]
            }
        ]
    }
};

// ===== Connection Definitions =====
const connections = [
    { from: 'client', to: 'zookeeper', type: 'dashed' },
    { from: 'zookeeper', to: 'hmaster', type: 'dashed' },
    { from: 'zookeeper', to: 'regionserver', type: 'dashed' },
    { from: 'hmaster', to: 'regionserver', type: 'dashed' },
    { from: 'client', to: 'regionserver', type: 'solid' },
    { from: 'regionserver', to: 'hdfs', type: 'solid' }
];

// ===== Flow Paths =====
const flowPaths = {
    write: [
        { from: 'client', to: 'zookeeper' },
        { from: 'client', to: 'regionserver' },
        { from: 'regionserver', to: 'wal' },
        { from: 'regionserver', to: 'memstore' },
        { from: 'memstore', to: 'storefile' },
        { from: 'storefile', to: 'hdfs' }
    ],
    read: [
        { from: 'client', to: 'zookeeper' },
        { from: 'client', to: 'regionserver' },
        { from: 'regionserver', to: 'memstore' },
        { from: 'regionserver', to: 'blockcache' },
        { from: 'regionserver', to: 'storefile' },
        { from: 'regionserver', to: 'client' }
    ]
};

// ===== State =====
let selectedComponent = null;
let currentFlow = null;

// ===== Draw Connections =====
function drawConnections() {
    const svg = document.getElementById('connections');
    svg.innerHTML = '';

    connections.forEach((conn, index) => {
        const fromEl = document.getElementById(conn.from);
        const toEl = document.getElementById(conn.to);
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
        const y1 = fromRect.bottom - svgRect.top;
        const x2 = toRect.left + toRect.width / 2 - svgRect.left;
        const y2 = toRect.top - svgRect.top;

        // Create path with bezier curve
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const controlY = (y1 + y2) / 2;
        const d = `M ${x1} ${y1} C ${x1} ${controlY}, ${x2} ${controlY}, ${x2} ${y2}`;

        path.setAttribute('d', d);
        path.setAttribute('class', 'connection-line');
        path.setAttribute('id', `conn-${conn.from}-${conn.to}`);
        path.setAttribute('data-from', conn.from);
        path.setAttribute('data-to', conn.to);
        svg.appendChild(path);

        // Add arrow marker
        const markerId = `arrow-${index}`;
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');
        marker.setAttribute('id', markerId);
        marker.setAttribute('markerWidth', '10');
        marker.setAttribute('markerHeight', '10');
        marker.setAttribute('refX', '9');
        marker.setAttribute('refY', '3');
        marker.setAttribute('orient', 'auto');
        marker.setAttribute('markerUnits', 'strokeWidth');

        const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
        polygon.setAttribute('points', '0,0 0,6 9,3');
        polygon.setAttribute('fill', '#475569');

        marker.appendChild(polygon);
        defs.appendChild(marker);
        svg.appendChild(defs);

        path.setAttribute('marker-end', `url(#${markerId})`);
    });

    // Draw internal connections for RegionServer
    drawInternalConnections();
}

function drawInternalConnections() {
    const svg = document.getElementById('connections');
    const internalConns = [
        { from: 'regionserver', to: 'blockcache' },
        { from: 'regionserver', to: 'wal' },
        { from: 'regionserver', to: 'hregion' },
        { from: 'hregion', to: 'store' },
        { from: 'store', to: 'memstore' },
        { from: 'store', to: 'storefile' }
    ];

    internalConns.forEach((conn, index) => {
        const fromEl = document.getElementById(conn.from);
        const toEl = document.getElementById(conn.to);
        if (!fromEl || !toEl) return;

        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
        const y1 = fromRect.bottom - svgRect.top;
        const x2 = toRect.left + toRect.width / 2 - svgRect.left;
        const y2 = toRect.top - svgRect.top;

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        const d = `M ${x1} ${y1} L ${x2} ${y2}`;

        path.setAttribute('d', d);
        path.setAttribute('class', 'connection-line');
        path.setAttribute('style', 'stroke-opacity: 0.3;');
        path.setAttribute('id', `conn-${conn.from}-${conn.to}`);
        svg.appendChild(path);
    });
}

// ===== Component Selection =====
function selectComponent(componentId) {
    // Clear previous selection
    document.querySelectorAll('.component, .sub-component, .store-item').forEach(el => {
        el.classList.remove('selected', 'highlighted', 'dimmed');
    });

    selectedComponent = componentId;

    // Highlight selected component
    const el = document.getElementById(componentId);
    if (el) {
        el.classList.add('selected');
    }

    // Highlight related components
    highlightRelated(componentId);

    // Update detail panel
    updateDetailPanel(componentId);
}

function highlightRelated(componentId) {
    const related = getRelatedComponents(componentId);

    document.querySelectorAll('.component, .sub-component, .store-item').forEach(el => {
        const id = el.id;
        if (id === componentId) return;
        if (related.includes(id)) {
            el.classList.add('highlighted');
        } else {
            el.classList.add('dimmed');
        }
    });

    // Highlight connections
    document.querySelectorAll('.connection-line').forEach(line => {
        const from = line.getAttribute('data-from');
        const to = line.getAttribute('data-to');
        if (from === componentId || to === componentId) {
            line.classList.add('active');
        }
    });
}

function getRelatedComponents(componentId) {
    const relationMap = {
        client: ['zookeeper', 'regionserver', 'hmaster'],
        zookeeper: ['client', 'hmaster', 'regionserver'],
        hmaster: ['zookeeper', 'regionserver', 'client'],
        regionserver: ['client', 'hmaster', 'zookeeper', 'hdfs', 'hregion', 'store', 'memstore', 'storefile', 'blockcache', 'wal'],
        blockcache: ['regionserver', 'storefile'],
        wal: ['regionserver', 'hdfs', 'memstore'],
        hregion: ['regionserver', 'store'],
        store: ['hregion', 'memstore', 'storefile'],
        memstore: ['store', 'storefile', 'regionserver', 'wal'],
        storefile: ['store', 'memstore', 'hdfs', 'blockcache'],
        hdfs: ['regionserver', 'storefile', 'wal']
    };
    return relationMap[componentId] || [];
}

function updateDetailPanel(componentId) {
    const detail = componentDetails[componentId];
    if (!detail) return;

    const panel = document.getElementById('panelContent');
    const titleEl = document.getElementById('panelTitle');
    const subtitleEl = document.getElementById('panelSubtitle');

    titleEl.textContent = detail.title;
    subtitleEl.textContent = detail.subtitle;

    let html = '';
    detail.sections.forEach(section => {
        html += `<div class="detail-section">`;
        html += `<h3>${section.heading}</h3>`;

        if (section.type === 'list') {
            html += `<ul class="detail-list">`;
            section.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += `</ul>`;
        } else if (section.type === 'table') {
            html += `<table class="detail-table">`;
            html += `<thead><tr>`;
            section.headers.forEach(h => {
                html += `<th>${h}</th>`;
            });
            html += `</tr></thead><tbody>`;
            section.rows.forEach(row => {
                html += `<tr>`;
                row.forEach(cell => {
                    html += `<td>${cell}</td>`;
                });
                html += `</tr>`;
            });
            html += `</tbody></table>`;
        }

        html += `</div>`;
    });

    panel.innerHTML = html;
}

// ===== Flow Animations =====
function playFlow(flowType) {
    clearFlow();
    currentFlow = flowType;

    // Update button states
    document.getElementById('btn-write-flow').classList.toggle('active', flowType === 'write');
    document.getElementById('btn-read-flow').classList.toggle('active', flowType === 'read');

    // Show flow description
    document.getElementById('writeFlowDesc').style.display = flowType === 'write' ? 'block' : 'none';
    document.getElementById('readFlowDesc').style.display = flowType === 'read' ? 'block' : 'none';

    const paths = flowPaths[flowType];
    if (!paths) return;

    // Highlight components in sequence
    const componentSequence = flowType === 'write'
        ? ['client', 'zookeeper', 'regionserver', 'wal', 'memstore', 'storefile', 'hdfs']
        : ['client', 'zookeeper', 'regionserver', 'memstore', 'blockcache', 'storefile', 'client'];

    animateSequence(componentSequence, 0);

    // Create particles
    paths.forEach((path, index) => {
        setTimeout(() => {
            createParticle(path.from, path.to);
        }, index * 600);
    });
}

function animateSequence(components, index) {
    if (index >= components.length) {
        // Restart animation after a delay
        setTimeout(() => {
            if (currentFlow) {
                animateSequence(components, 0);
                flowPaths[currentFlow].forEach((path, i) => {
                    setTimeout(() => createParticle(path.from, path.to), i * 600);
                });
            }
        }, 1000);
        return;
    }

    const componentId = components[index];
    const el = document.getElementById(componentId);
    if (el) {
        el.classList.add('highlighted');
        setTimeout(() => {
            el.classList.remove('highlighted');
        }, 1000);
    }

    setTimeout(() => {
        animateSequence(components, index + 1);
    }, 800);
}

function createParticle(fromId, toId) {
    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);
    if (!fromEl || !toEl) return;

    const container = document.getElementById('particles');
    const particle = document.createElement('div');
    particle.className = 'particle';

    const fromRect = fromEl.getBoundingClientRect();
    const toRect = toEl.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const startX = fromRect.left + fromRect.width / 2 - containerRect.left;
    const startY = fromRect.top + fromRect.height / 2 - containerRect.top;
    const endX = toRect.left + toRect.width / 2 - containerRect.left;
    const endY = toRect.top + toRect.height / 2 - containerRect.top;

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    container.appendChild(particle);

    // Animate
    const duration = 1200;
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic

        const currentX = startX + (endX - startX) * easeProgress;
        const currentY = startY + (endY - startY) * easeProgress;

        particle.style.left = `${currentX}px`;
        particle.style.top = `${currentY}px`;
        particle.style.opacity = progress < 0.8 ? 1 : 1 - (progress - 0.8) * 5;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }

    requestAnimationFrame(animate);
}

function clearFlow() {
    currentFlow = null;

    // Clear button states
    document.getElementById('btn-write-flow').classList.remove('active');
    document.getElementById('btn-read-flow').classList.remove('active');

    // Hide flow descriptions
    document.getElementById('writeFlowDesc').style.display = 'none';
    document.getElementById('readFlowDesc').style.display = 'none';

    // Clear particles
    document.getElementById('particles').innerHTML = '';

    // Clear highlights
    document.querySelectorAll('.component, .sub-component, .store-item').forEach(el => {
        el.classList.remove('highlighted');
    });
}

function resetView() {
    selectedComponent = null;
    clearFlow();

    // Clear all visual states
    document.querySelectorAll('.component, .sub-component, .store-item').forEach(el => {
        el.classList.remove('selected', 'highlighted', 'dimmed');
    });

    document.querySelectorAll('.connection-line').forEach(line => {
        line.classList.remove('active');
    });

    // Reset detail panel
    document.getElementById('panelTitle').textContent = '组件详情';
    document.getElementById('panelSubtitle').textContent = '点击架构图中的组件查看详细信息';
    document.getElementById('panelContent').innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">&#128269;</div>
            <p>点击左侧架构图中的任意组件</p>
            <p class="empty-hint">查看该组件的详细信息、职责和与其他组件的关系</p>
        </div>
    `;
}

// ===== Sub-component Click Handlers =====
document.querySelectorAll('.sub-component, .store-item, .store-wrapper').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
        const componentId = el.getAttribute('data-component');
        if (componentId) {
            selectComponent(componentId);
        }
    });
});

// ===== Initialization =====
function init() {
    // Draw connections after layout is complete
    setTimeout(() => {
        drawConnections();
    }, 300);

    // Redraw on resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(drawConnections, 200);
    });

    // Select RegionServer by default to show something
    setTimeout(() => {
        selectComponent('regionserver');
    }, 600);
}

// Run initialization
document.addEventListener('DOMContentLoaded', init);
