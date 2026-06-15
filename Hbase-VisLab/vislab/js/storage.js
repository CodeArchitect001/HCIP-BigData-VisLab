/**
 * HBase Storage Model Visualization
 * HCIP-Big Data Developer V2.0
 */

// ===== Tab Switching =====
function switchTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.dataset.tab === tabId);
    });

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.toggle('active', content.id === `tab-${tabId}`);
    });
}

// ===== KeyValue Detail Data =====
const kvDetails = {
    rowkey: {
        title: 'RowKey（行键）',
        content: `
            <p>RowKey 是唯一标识一行数据的键，在 HBase 中具有至关重要的作用。</p>
            <ul>
                <li><strong>唯一性：</strong>同一表中 RowKey 不能重复</li>
                <li><strong>字典序排列：</strong>数据按 RowKey 的字典序存储</li>
                <li><strong>索引作用：</strong>RowKey 是 HBase 的唯一索引</li>
                <li><strong>查询方式：</strong>只能通过 RowKey 精确查询或范围扫描</li>
            </ul>
            <p><strong>设计原则：</strong>短、小、散</p>
        `
    },
    family: {
        title: 'Column Family（列族）',
        content: `
            <p>列族是列的逻辑分组，是 HBase 表结构的核心组成部分。</p>
            <ul>
                <li><strong>建表时定义：</strong>列族必须在创建表时指定</li>
                <li><strong>动态列：</strong>列族内的列可以动态添加，无需预先定义</li>
                <li><strong>物理隔离：</strong>每个列族对应一个 Store，物理上分开存储</li>
                <li><strong>数量建议：</strong>建议 1-3 个列族，过多影响性能</li>
            </ul>
            <p><strong>示例：</strong>info（基本信息）、extra（扩展信息）</p>
        `
    },
    qualifier: {
        title: 'Qualifier（列限定符）',
        content: `
            <p>Qualifier 是列族内的具体列名，可以动态添加。</p>
            <ul>
                <li><strong>动态扩展：</strong>无需预先定义，写入时自动创建</li>
                <li><strong>灵活结构：</strong>每行可以有不同的列</li>
                <li><strong>稀疏存储：</strong>空值不占用存储空间</li>
            </ul>
            <p><strong>示例：</strong>info:name、info:age、extra:email</p>
        `
    },
    timestamp: {
        title: 'Timestamp（时间戳）',
        content: `
            <p>时间戳用于实现数据的多版本控制。</p>
            <ul>
                <li><strong>自动生成：</strong>写入时自动生成或手动指定</li>
                <li><strong>多版本存储：</strong>同一单元格可存储多个版本</li>
                <li><strong>版本控制：</strong>通过 Max Version 参数控制保留版本数</li>
                <li><strong>数据过期：</strong>通过 TTL 设置数据过期时间</li>
            </ul>
            <p><strong>默认行为：</strong>读取时返回最新版本的数据</p>
        `
    },
    type: {
        title: 'Type（操作类型）',
        content: `
            <p>Type 标识该 KeyValue 的操作类型。</p>
            <ul>
                <li><strong>Put：</strong>插入或更新数据</li>
                <li><strong>Delete：</strong>删除整行数据</li>
                <li><strong>DeleteFamily：</strong>删除某个列族的所有数据</li>
                <li><strong>DeleteColumn：</strong>删除某个列的数据</li>
            </ul>
            <p><strong>注意：</strong>HBase 的删除是通过添加删除标记实现的</p>
        `
    },
    value: {
        title: 'Value（实际值）',
        content: `
            <p>Value 是存储的实际数据内容。</p>
            <ul>
                <li><strong>二进制存储：</strong>所有数据以字节数组形式存储</li>
                <li><strong>类型无关：</strong>HBase 不感知数据类型</li>
                <li><strong>序列化：</strong>由客户端负责数据的序列化和反序列化</li>
            </ul>
            <p><strong>示例：</strong>字符串、数字、JSON 等都可以作为 Value</p>
        `
    }
};

function highlightPart(partId) {
    // Clear previous selection
    document.querySelectorAll('.kv-part').forEach(p => p.classList.remove('selected'));

    // Select current
    const part = document.querySelector(`[data-part="${partId}"]`);
    if (part) {
        part.classList.add('selected');
    }

    // Update detail panel
    const detail = kvDetails[partId];
    if (detail) {
        document.getElementById('kvDetailPanel').innerHTML = `
            <div class="kv-detail-content">
                <h3>${detail.title}</h3>
                ${detail.content}
            </div>
        `;
    }
}

// ===== Multi Version Demo =====
let versionCounter = 1;
const versionData = [
    { rowkey: 'user:10086', family: 'info', qualifier: 'name', timestamp: 1717833600000, type: 'Put', value: '张三' }
];

function addVersion() {
    versionCounter++;
    const names = ['张三', '李四', '王五', '赵六', '孙七'];
    const newName = names[versionCounter % names.length];
    const newTimestamp = 1717833600000 + versionCounter * 3600000;

    versionData.unshift({
        rowkey: 'user:10086',
        family: 'info',
        qualifier: 'name',
        timestamp: newTimestamp,
        type: 'Put',
        value: newName
    });

    renderVersionTable();
}

function resetVersions() {
    versionCounter = 1;
    versionData.length = 0;
    versionData.push({
        rowkey: 'user:10086',
        family: 'info',
        qualifier: 'name',
        timestamp: 1717833600000,
        type: 'Put',
        value: '张三'
    });
    renderVersionTable();
}

function renderVersionTable() {
    const tbody = document.getElementById('versionTableBody');
    tbody.innerHTML = '';

    versionData.forEach((v, index) => {
        const tr = document.createElement('tr');
        tr.className = index === 0 ? 'version-row latest' : 'version-row';
        tr.innerHTML = `
            <td>${v.rowkey}</td>
            <td>${v.family}</td>
            <td>${v.qualifier}</td>
            <td>${v.timestamp}</td>
            <td><span class="badge badge-put">${v.type}</span></td>
            <td>${v.value}</td>
            <td><span class="badge badge-latest">${index === 0 ? '最新版本' : `版本 ${versionData.length - index}`}</span></td>
        `;
        tbody.appendChild(tr);
    });
}

// ===== Column Family Detail =====
const cfDetails = {
    info: {
        title: 'info 列族',
        content: `
            <p><strong>用途：</strong>存储用户的基本信息</p>
            <ul>
                <li>name - 用户姓名</li>
                <li>age - 用户年龄</li>
                <li>address - 用户地址</li>
                <li>gender - 性别</li>
            </ul>
            <p><strong>特点：</strong>访问频率高，数据量相对较小</p>
        `
    },
    extra: {
        title: 'extra 列族',
        content: `
            <p><strong>用途：</strong>存储用户的扩展信息</p>
            <ul>
                <li>email - 电子邮箱</li>
                <li>phone - 电话号码</li>
                <li>preference - 用户偏好</li>
            </ul>
            <p><strong>特点：</strong>访问频率较低，可与 info 列族分开存储优化性能</p>
        `
    }
};

function showCFDetail(cfId) {
    const detail = cfDetails[cfId];
    if (detail) {
        document.getElementById('cfDetailPanel').innerHTML = `
            <div class="kv-detail-content">
                <h3>${detail.title}</h3>
                ${detail.content}
            </div>
        `;
    }
}

// ===== Hotspot Simulation =====
let hotspotData = [0, 0, 0];

function simulateSequentialWrite() {
    resetHotspot();
    const log = document.getElementById('hotspotLog');
    log.innerHTML = '';

    // Simulate sequential writes (all go to first region)
    let count = 0;
    const interval = setInterval(() => {
        count++;
        hotspotData[0]++;
        updateHotspotViz();

        const entry = document.createElement('div');
        entry.className = 'log-entry hot';
        entry.textContent = `[写入] RowKey: user_${String(10000 + count).padStart(5, '0')} -> Region 1 (热点!)`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;

        if (count >= 15) {
            clearInterval(interval);
            const summary = document.createElement('div');
            summary.className = 'log-entry';
            summary.style.color = '#ef4444';
            summary.style.fontWeight = '600';
            summary.textContent = '结果：顺序写入导致 Region 1 成为热点，负载不均衡！';
            log.appendChild(summary);
        }
    }, 200);
}

function simulateHashWrite() {
    resetHotspot();
    const log = document.getElementById('hotspotLog');
    log.innerHTML = '';

    // Simulate hash writes (distributed across regions)
    let count = 0;
    const interval = setInterval(() => {
        count++;
        const regionIndex = Math.floor(Math.random() * 3);
        hotspotData[regionIndex]++;
        updateHotspotViz();

        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[写入] RowKey: hash(user_${String(10000 + count).padStart(5, '0')}) -> Region ${regionIndex + 1}`;
        log.appendChild(entry);
        log.scrollTop = log.scrollHeight;

        if (count >= 15) {
            clearInterval(interval);
            const summary = document.createElement('div');
            summary.className = 'log-entry';
            summary.style.color = '#10b981';
            summary.style.fontWeight = '600';
            summary.textContent = '结果：散列后写入均匀分布到各个 Region，负载均衡！';
            log.appendChild(summary);
        }
    }, 200);
}

function updateHotspotViz() {
    const total = hotspotData.reduce((a, b) => a + b, 0) || 1;
    const max = Math.max(...hotspotData) || 1;

    hotspotData.forEach((count, i) => {
        const fill = document.getElementById(`fill${i}`);
        const countEl = document.getElementById(`count${i}`);
        const percentage = (count / max) * 100;

        fill.style.width = `${Math.max(percentage, 5)}%`;
        fill.classList.toggle('hot', count > total / 2 && count > 5);
        countEl.textContent = count;
    });
}

function resetHotspot() {
    hotspotData = [0, 0, 0];
    document.getElementById('hotspotLog').innerHTML = '<div class="log-empty">点击上方按钮开始模拟</div>';
    updateHotspotViz();
}

// ===== HFile Detail Data =====
const hfileDetails = {
    data: {
        title: 'Data Block（数据块）',
        content: `
            <p><strong>作用：</strong>存储实际的 KeyValue 数据</p>
            <ul>
                <li>HFile 中占比最大的部分</li>
                <li>每个 Data Block 默认大小为 64KB</li>
                <li>数据按 KeyValue 对顺序存储</li>
                <li>支持压缩以减少存储空间</li>
            </ul>
            <p><strong>读取方式：</strong>通过 Index Block 定位到目标 Data Block</p>
        `
    },
    index: {
        title: 'Index Block（索引块）',
        content: `
            <p><strong>作用：</strong>Data Block 的索引，加速数据查找</p>
            <ul>
                <li>记录每个 Data Block 的起始 RowKey 和偏移量</li>
                <li>支持多级索引（Root Index → Leaf Index）</li>
                <li>查找时先查 Index，再定位到具体 Data Block</li>
                <li>Index Block 常驻内存，避免频繁读取磁盘</li>
            </ul>
        `
    },
    bloom: {
        title: 'BloomFilter（布隆过滤器）',
        content: `
            <p><strong>作用：</strong>快速判断某条数据是否可能存在于 HFile 中</p>
            <ul>
                <li>一定误判率（可能误判存在，但不会误判不存在）</li>
                <li>显著减少不必要的磁盘 IO</li>
                <li>特别适合随机读取（Get 操作）</li>
                <li>存储在 HFile 中，查询时加载到内存</li>
            </ul>
        `
    },
    meta: {
        title: 'Meta Block（元数据块）',
        content: `
            <p><strong>作用：</strong>存储 HFile 的元数据信息</p>
            <ul>
                <li>文件版本信息</li>
                <li>压缩算法类型</li>
                <li>创建时间、修改时间</li>
                <li>其他文件级别的元数据</li>
            </ul>
        `
    },
    trailer: {
        title: 'Trailer（文件尾）',
        content: `
            <p><strong>作用：</strong>HFile 的尾部固定区域</p>
            <ul>
                <li>记录其他部分（Data/Index/BloomFilter）的偏移量</li>
                <li>固定大小，便于快速定位</li>
                <li>打开 HFile 时首先读取 Trailer</li>
                <li>包含文件版本和压缩信息</li>
            </ul>
        `
    }
};

function showHFileDetail(partId) {
    // Clear previous selection
    document.querySelectorAll('.hfile-part').forEach(p => p.classList.remove('selected'));

    // Select current
    const part = document.querySelector(`[data-hfile="${partId}"]`);
    if (part) {
        part.classList.add('selected');
    }

    // Update detail panel
    const detail = hfileDetails[partId];
    if (detail) {
        document.getElementById('hfileDetailPanel').innerHTML = `
            <div class="kv-detail-content">
                <h3>${detail.title}</h3>
                ${detail.content}
            </div>
        `;
    }
}

// ===== Read Path Demo =====
const readPathSteps = {
    1: {
        title: '步骤 1：检查 MemStore',
        content: `
            <p><strong>MemStore 优先：</strong>读取时首先检查 MemStore，因为 MemStore 中存放的是最新写入但尚未刷写到磁盘的数据。</p>
            <ul>
                <li>MemStore 是内存结构，读取速度极快</li>
                <li>如果数据在 MemStore 中命中，直接返回结果</li>
                <li>未命中则继续查询 BlockCache</li>
            </ul>
        `
    },
    2: {
        title: '步骤 2：BloomFilter 过滤',
        content: `
            <p><strong>快速过滤：</strong>检查目标 RowKey 是否可能存在于 HFile 中。</p>
            <ul>
                <li>BloomFilter 判断"不存在"是 100% 准确的</li>
                <li>如果 BloomFilter 判断不存在，直接跳过该 HFile</li>
                <li>避免读取不必要的 HFile，大幅减少 IO</li>
            </ul>
        `
    },
    3: {
        title: '步骤 3：Index Block 定位',
        content: `
            <p><strong>索引定位：</strong>通过 Index Block 找到目标 Data Block 的位置。</p>
            <ul>
                <li>Index Block 记录每个 Data Block 的起始 Key 和偏移量</li>
                <li>二分查找快速定位目标 Data Block</li>
                <li>多级索引结构支持大文件高效查找</li>
            </ul>
        `
    },
    4: {
        title: '步骤 4：Data Block 读取',
        content: `
            <p><strong>读取数据：</strong>从定位到的 Data Block 中读取目标 KeyValue。</p>
            <ul>
                <li>Data Block 中的数据按 Key 排序</li>
                <li>在 Data Block 内二分查找目标 Key</li>
                <li>读取命中后缓存到 BlockCache 供下次使用</li>
                <li>返回结果给 Client</li>
            </ul>
        `
    }
};

function playReadStep(stepNum) {
    // Clear previous selection
    document.querySelectorAll('.read-step').forEach(s => s.classList.remove('active'));

    // Select current step
    const step = document.getElementById(`readStep${stepNum}`);
    if (step) {
        step.classList.add('active');
    }

    // Update result panel
    const detail = readPathSteps[stepNum];
    if (detail) {
        document.getElementById('readPathResult').innerHTML = `
            <h4 style="color: var(--highlight); margin-bottom: 10px;">${detail.title}</h4>
            ${detail.content}
        `;
    }
}

// ===== Row vs Column Store Query Simulation =====

function simulateRowQuery() {
    resetQuerySim();
    const result = document.getElementById('queryResult');

    // Highlight all cells in row store blocks
    const rowBlocks = document.querySelectorAll('.row-store-blocks .data-cell');
    rowBlocks.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('highlight');
            setTimeout(() => cell.classList.remove('highlight'), 600);
        }, index * 80);
    });

    setTimeout(() => {
        result.innerHTML = `
            <div class="result-content">
                <h4 class="result-row">行式存储查询过程</h4>
                <p>查询需求：读取所有用户的 <strong>Age</strong></p>
                <p>行式存储需要读取 <strong>所有数据块</strong>，因为 Age 和 Name、City 混存在同一个块里：</p>
                <ul style="margin: 10px 0; padding-left: 20px; color: var(--text-secondary);">
                    <li>Block 1：读 [001, 张三, <strong>25</strong>, 北京] → 取出 25 ✓</li>
                    <li>Block 2：读 [002, 李四, <strong>30</strong>, 上海] → 取出 30 ✓</li>
                    <li>Block 3：读 [003, 王五, <strong>28</strong>, 广州] → 取出 28 ✓</li>
                </ul>
                <p><strong>问题：</strong>读 3 个块，但有效数据只占 25%（只关心 Age，却读了 Name 和 City）</p>
                <div class="result-stats">
                    <div class="stat-item">
                        <span class="stat-value row-stat">3</span>
                        <span class="stat-label">读取块数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value row-stat">12</span>
                        <span class="stat-label">读取字段数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value row-stat">25%</span>
                        <span class="stat-label">有效数据比</span>
                    </div>
                </div>
            </div>
        `;
    }, rowBlocks.length * 80 + 300);
}

function simulateColQuery() {
    resetQuerySim();
    const result = document.getElementById('queryResult');

    // Highlight only age cells in column store blocks
    const ageCells = document.querySelectorAll('.col-store-blocks .col-age');
    const idCells = document.querySelectorAll('.col-store-blocks .col-id');

    idCells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('highlight');
            setTimeout(() => cell.classList.remove('highlight'), 400);
        }, index * 60);
    });

    ageCells.forEach((cell, index) => {
        setTimeout(() => {
            cell.classList.add('highlight');
            setTimeout(() => cell.classList.remove('highlight'), 400);
        }, (index + idCells.length) * 60);
    });

    setTimeout(() => {
        result.innerHTML = `
            <div class="result-content">
                <h4 class="result-col">列式存储查询过程</h4>
                <p>查询需求：读取所有用户的 <strong>Age</strong></p>
                <p>列式存储只需读取 <strong>Age 所在的列族</strong>，跳过其他列族：</p>
                <ul style="margin: 10px 0; padding-left: 20px; color: var(--text-secondary);">
                    <li>CF: info 块：直接定位 age 列组 → 取出 [25, 30, 28] ✓</li>
                    <li>CF: extra 块：<strong>完全跳过</strong>（不需要 city）</li>
                </ul>
                <p><strong>优势：</strong>只读 1 个列族，有效数据占比 100%，无浪费 IO</p>
                <div class="result-stats">
                    <div class="stat-item">
                        <span class="stat-value col-stat">1</span>
                        <span class="stat-label">读取块数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value col-stat">3</span>
                        <span class="stat-label">读取字段数</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value col-stat">100%</span>
                        <span class="stat-label">有效数据比</span>
                    </div>
                </div>
            </div>
        `;
    }, (ageCells.length + idCells.length) * 60 + 300);
}

function resetQuerySim() {
    document.getElementById('queryResult').innerHTML = `
        <div class="result-empty">点击上方按钮查看查询过程对比</div>
    `;
    document.querySelectorAll('.data-cell').forEach(cell => {
        cell.classList.remove('highlight');
    });
}

// ===== Cache Mechanism - Write Simulation =====
let memstoreLevel = 0;
let hfileCount = 0;

function simulateWrite() {
    const bucketFill = document.getElementById('bucketFill');
    const bucketStatus = document.getElementById('bucketStatus');
    const steps = document.querySelectorAll('.write-step');

    // Animate steps
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            setTimeout(() => step.classList.remove('active'), 600);
        }, index * 400);
    });

    // Increase memstore level
    setTimeout(() => {
        memstoreLevel += 25;
        if (memstoreLevel > 100) memstoreLevel = 100;

        bucketFill.style.height = `${memstoreLevel}%`;
        bucketStatus.textContent = `MemStore 已使用: ${memstoreLevel}%`;
        bucketStatus.style.color = memstoreLevel >= 100 ? '#ef4444' : 'var(--text-secondary)';

        if (memstoreLevel >= 100) {
            setTimeout(() => {
                bucketFill.classList.add('flushing');
                bucketFill.style.setProperty('--current-height', '100%');
                bucketStatus.textContent = '正在 Flush 到 HFile...';

                setTimeout(() => {
                    bucketFill.classList.remove('flushing');
                    bucketFill.style.height = '0%';
                    memstoreLevel = 0;
                    hfileCount++;

                    const hfileList = document.getElementById('hfileList');
                    const hfileItem = document.createElement('div');
                    hfileItem.className = 'hfile-item';
                    hfileItem.textContent = `StoreFile_${Date.now()}.hfile (MemStore Flush #${hfileCount})`;
                    hfileList.appendChild(hfileItem);

                    bucketStatus.textContent = 'Flush 完成，MemStore 已清空';
                    bucketStatus.style.color = '#10b981';
                }, 800);
            }, 500);
        }
    }, 1600);
}

function resetWriteSim() {
    memstoreLevel = 0;
    hfileCount = 0;
    document.getElementById('bucketFill').style.height = '0%';
    document.getElementById('bucketStatus').textContent = '等待写入...';
    document.getElementById('bucketStatus').style.color = 'var(--text-secondary)';
    document.getElementById('hfileList').innerHTML = '';
    document.querySelectorAll('.write-step').forEach(s => s.classList.remove('active'));
}

// ===== Cache Mechanism - Read Simulation =====
let readSimData = {
    inMemStore: true,    // First read: data is in MemStore
    inBlockCache: false  // After first read, data goes to BlockCache
};

function simulateReadHit() {
    resetReadSim();
    const result = document.getElementById('readCacheResult');

    // Scenario: Data is in BlockCache (2nd read)
    const layers = [
        { id: 'rLayerMemstore', status: 'statusMemstore', found: false, name: 'MemStore' },
        { id: 'rLayerBlockCache', status: 'statusBlockCache', found: true, name: 'BlockCache' }
    ];

    processReadLayers(layers, result, true);
}

function simulateReadMiss() {
    resetReadSim();
    const result = document.getElementById('readCacheResult');

    // Scenario: Data only in HFile (cold read)
    const layers = [
        { id: 'rLayerMemstore', status: 'statusMemstore', found: false, name: 'MemStore' },
        { id: 'rLayerBlockCache', status: 'statusBlockCache', found: false, name: 'BlockCache' },
        { id: 'rLayerHFile', status: 'statusHFile', found: true, name: 'HFile' }
    ];

    processReadLayers(layers, result, false);
}

function processReadLayers(layers, resultPanel, isHit) {
    let delay = 0;

    layers.forEach((layer, index) => {
        setTimeout(() => {
            const el = document.getElementById(layer.id);
            const statusEl = document.getElementById(layer.status);

            if (layer.found) {
                el.classList.add('found');
                statusEl.textContent = '命中!';
                statusEl.className = 'layer-status hit';

                // Show result
                resultPanel.innerHTML = generateReadResult(layers, isHit);
            } else {
                el.classList.add('missed');
                statusEl.textContent = '未命中';
                statusEl.className = 'layer-status miss';
            }
        }, delay);
        delay += 600;
    });
}

function generateReadResult(layers, isHit) {
    const foundLayer = layers.find(l => l.found);
    const path = layers.map(l => {
        if (l.found) {
            return `<span style="color: #10b981; font-weight: 600;">${l.name} ✓ 命中</span>`;
        } else {
            return `<span style="color: #64748b;">${l.name} ✗ 未命中</span>`;
        }
    }).join(' → ');

    const ioDesc = isHit
        ? '数据在 BlockCache 中命中，直接从内存返回，无需磁盘 IO'
        : '数据不在 MemStore 和 BlockCache 中，需要从 HFile 磁盘读取，读取后缓存到 BlockCache 供下次使用';

    return `
        <div class="result-content">
            <h4 style="color: ${isHit ? '#10b981' : '#f59e0b'}; margin-bottom: 10px;">
                ${isHit ? '缓存命中 (Cache Hit)' : '缓存未命中 (Cache Miss)'}
            </h4>
            <p style="margin-bottom: 10px;"><strong>查找路径：</strong> ${path}</p>
            <p style="color: var(--text-secondary);">${ioDesc}</p>
            ${!isHit ? '<p style="color: var(--text-secondary); margin-top: 8px;"><strong>下次读取：</strong>同一份数据将从 BlockCache 直接返回（缓存命中）</p>' : ''}
        </div>
    `;
}

function resetReadSim() {
    document.getElementById('readCacheResult').innerHTML = `
        <div class="result-empty">点击上方按钮模拟读取过程</div>
    `;

    ['rLayerMemstore', 'rLayerBlockCache', 'rLayerHFile'].forEach(id => {
        const el = document.getElementById(id);
        el.classList.remove('checked', 'missed', 'found');
    });

    ['statusMemstore', 'statusBlockCache', 'statusHFile'].forEach(id => {
        const el = document.getElementById(id);
        el.textContent = '未检查';
        el.className = 'layer-status';
    });
}

// ===== BloomFilter Simulation =====
const BIT_ARRAY_SIZE = 12;
const HASH_FUNCTIONS = 3;
let bloomBitArray = new Array(BIT_ARRAY_SIZE).fill(0);
let bloomElements = [];

function hash1(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash) % BIT_ARRAY_SIZE;
}

function hash2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash) % BIT_ARRAY_SIZE;
}

function hash3(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash * 31 + str.charCodeAt(i)) % BIT_ARRAY_SIZE;
    }
    return Math.abs(hash) % BIT_ARRAY_SIZE;
}

function getHashes(str) {
    return [hash1(str), hash2(str), hash3(str)];
}

function updateBitArrayVisual() {
    const cells = document.querySelectorAll('.bit-cell');
    cells.forEach((cell, index) => {
        cell.classList.remove('set', 'checking', 'matched', 'missed');
        cell.textContent = '';
        if (bloomBitArray[index] === 1) {
            cell.classList.add('set');
            cell.textContent = '1';
        }
    });
}

function animateBitSet(indices, callback) {
    const cells = document.querySelectorAll('.bit-cell');
    let delay = 0;

    indices.forEach(index => {
        setTimeout(() => {
            const cell = cells[index];
            cell.classList.add('checking');
            setTimeout(() => {
                cell.classList.remove('checking');
                cell.classList.add('set');
                cell.textContent = '1';
                bloomBitArray[index] = 1;
            }, 300);
        }, delay);
        delay += 400;
    });

    if (callback) {
        setTimeout(callback, delay + 200);
    }
}

function simulateBloomAdd() {
    const inputValue = document.getElementById('bloomInputValue');
    const result = document.getElementById('bloomResult');

    // Generate random element
    const userIds = ['10086', '10087', '10088', '10089', '10090'];
    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
    const element = `user:${randomId}`;

    if (bloomElements.includes(element)) {
        result.innerHTML = `
            <div class="result-content">
                <p><strong>"${element}"</strong> 已在过滤器中，无需重复添加</p>
            </div>
        `;
        return;
    }

    bloomElements.push(element);
    inputValue.textContent = `"${element}"`;
    inputValue.style.color = 'var(--accent-green)';

    const hashes = getHashes(element);
    result.innerHTML = `
        <div class="result-content">
            <p>正在添加 <strong>"${element}"</strong> 到布隆过滤器...</p>
            <p style="color: var(--text-muted);">计算 3 个哈希值：${hashes.join(', ')}</p>
        </div>
    `;

    animateBitSet(hashes, () => {
        result.innerHTML = `
            <div class="result-content">
                <p><span style="color: #10b981;">&#9989;</span> <strong>"${element}"</strong> 已添加到过滤器</p>
                <p style="color: var(--text-muted);">位数组位置 ${hashes.join(', ')} 已设置为 1</p>
            </div>
        `;
        inputValue.style.color = 'var(--accent-purple)';
    });
}

function simulateBloomCheck() {
    const inputValue = document.getElementById('bloomInputValue');
    const result = document.getElementById('bloomResult');

    // Generate random element to check
    const userIds = ['10086', '10087', '10088', '10089', '10090', '99999'];
    const randomId = userIds[Math.floor(Math.random() * userIds.length)];
    const element = `user:${randomId}`;

    inputValue.textContent = `"${element}"`;

    const hashes = getHashes(element);
    const cells = document.querySelectorAll('.bit-cell');

    result.innerHTML = `
        <div class="result-content">
            <p>正在查询 <strong>"${element}"</strong> 是否可能存在...</p>
            <p style="color: var(--text-muted);">检查哈希位置：${hashes.join(', ')}</p>
        </div>
    `;

    let delay = 0;
    let allMatched = true;

    hashes.forEach(index => {
        setTimeout(() => {
            const cell = cells[index];
            cell.classList.add('checking');
            setTimeout(() => {
                cell.classList.remove('checking');
                if (bloomBitArray[index] === 1) {
                    cell.classList.add('matched');
                } else {
                    cell.classList.add('missed');
                    allMatched = false;
                }
            }, 300);
        }, delay);
        delay += 400;
    });

    setTimeout(() => {
        if (allMatched) {
            const isActuallyIn = bloomElements.includes(element);
            result.innerHTML = `
                <div class="result-content">
                    <p><span style="color: #f59e0b;">&#9888;</span> <strong>"${element}" 可能存在</strong></p>
                    <p style="color: var(--text-secondary);">3 个哈希位置均为 1，需要<strong>读取 HFile 确认</strong></p>
                    ${!isActuallyIn ? '<p style="color: #ef4444; margin-top: 8px;">&#10060; 实际不存在（误判！）</p>' : '<p style="color: #10b981; margin-top: 8px;">&#9989; 实际存在</p>'}
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="result-content">
                    <p><span style="color: #10b981;">&#9989;</span> <strong>"${element}" 肯定不存在</strong></p>
                    <p style="color: var(--text-secondary);">某个哈希位置为 0，<strong>直接跳过该 HFile</strong>，无需磁盘 IO</p>
                </div>
            `;
        }
    }, delay + 200);
}

function resetBloom() {
    bloomBitArray = new Array(BIT_ARRAY_SIZE).fill(0);
    bloomElements = [];
    updateBitArrayVisual();
    document.getElementById('bloomInputValue').textContent = '"user:10086"';
    document.getElementById('bloomInputValue').style.color = 'var(--accent-purple)';
    document.getElementById('bloomResult').innerHTML = `
        <div class="result-empty">点击上方按钮演示布隆过滤器的添加和查询过程</div>
    `;
}

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    // Select RowKey by default in KV demo
    highlightPart('rowkey');

    // Show first CF detail
    showCFDetail('info');

    // Show first HFile detail
    showHFileDetail('data');
});

