// Redis Visualization (namespaced to avoid conflicts)

let reRankingTimer = null;

function rePlayRankingDemo() {
    reResetRankingDemo();
    const items = [
        { name: '商品 A', score: 120 },
        { name: '商品 B', score: 95 },
        { name: '商品 C', score: 150 },
        { name: '商品 D', score: 80 },
        { name: '商品 E', score: 110 }
    ];
    const list = document.getElementById('re-ranking-list');
    const result = document.getElementById('re-ranking-result');
    if (!list || !result) return;

    list.innerHTML = '';
    result.innerHTML = '<p style="color: var(--re-primary);">使用 ZADD 逐步写入商品销量分数...</p>';

    items.forEach((item, idx) => {
        setTimeout(() => {
            const row = document.createElement('div');
            row.className = 're-ranking-item';
            row.innerHTML = `
                <span class="re-rank-num">${idx + 1}</span>
                <span class="re-rank-name">${item.name}</span>
                <span class="re-rank-score">${item.score}</span>
            `;
            list.appendChild(row);
            setTimeout(() => row.classList.add('active'), 30);

            result.innerHTML = `<p><strong style="color: var(--re-primary);">ZADD sales ${item.score} "${item.name}"</strong> 写入完成</p>`;
        }, idx * 700);
    });

    reRankingTimer = setTimeout(() => {
        const sorted = [...items].sort((a, b) => b.score - a.score);
        list.innerHTML = sorted.map((item, idx) => `
            <div class="re-ranking-item active">
                <span class="re-rank-num">${idx + 1}</span>
                <span class="re-rank-name">${item.name}</span>
                <span class="re-rank-score">${item.score}</span>
            </div>
        `).join('');

        result.innerHTML = `
            <p><strong style="color: var(--re-primary);">ZREVRANGE sales 0 4 WITHSCORES</strong> 获取 Top5</p>
            <p style="color: var(--re-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                Sorted Set 按 score 自动排序，适合排行榜、热搜等场景
            </p>
        `;
        reRankingTimer = setTimeout(reResetRankingDemo, 4000);
    }, items.length * 700 + 500);
}

function reResetRankingDemo() {
    if (reRankingTimer) clearTimeout(reRankingTimer);
    const list = document.getElementById('re-ranking-list');
    if (list) list.innerHTML = '<div class="re-demo-result">点击播放查看排行榜写入与查询过程</div>';
    const result = document.getElementById('re-ranking-result');
    if (result) result.innerHTML = '点击播放查看 Sorted Set 排行榜演示';
}

let reCounterTimer = null;
let reCounterValue = 0;

function rePlayCounterDemo() {
    reResetCounterDemo();
    const display = document.getElementById('re-counter-value');
    const result = document.getElementById('re-counter-result');
    if (!display || !result) return;

    result.innerHTML = '<p style="color: var(--re-primary);">使用 INCR 实现原子计数器...</p>';
    reCounterValue = 0;
    display.textContent = reCounterValue;

    let step = 0;
    const max = 10;
    reCounterTimer = setInterval(() => {
        step++;
        reCounterValue++;
        display.textContent = reCounterValue;
        result.innerHTML = `<p>执行 <strong style="color: var(--re-primary);">INCR page:view</strong>，当前值：${reCounterValue}</p>`;

        if (step >= max) {
            clearInterval(reCounterTimer);
            result.innerHTML = `
                <p><strong style="color: var(--re-primary);">计数器完成</strong>，最终值：${reCounterValue}</p>
                <p style="color: var(--re-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    String 类型的 INCR/DECR 是原子操作，适合 PV/UV、库存扣减等计数场景
                </p>
            `;
            reCounterTimer = setTimeout(reResetCounterDemo, 4000);
        }
    }, 400);
}

function reResetCounterDemo() {
    if (reCounterTimer) clearInterval(reCounterTimer);
    const display = document.getElementById('re-counter-value');
    if (display) display.textContent = '0';
    const result = document.getElementById('re-counter-result');
    if (result) result.innerHTML = '点击播放查看 String 计数器演示';
    reCounterValue = 0;
}

let rePipelineTimer = null;

function rePlayPipelineDemo() {
    reResetPipelineDemo();
    const normalPackets = document.querySelectorAll('#re-pipeline-normal .re-packet');
    const pipelinePackets = document.querySelectorAll('#re-pipeline-batched .re-packet');
    const normalBar = document.getElementById('re-normal-bar');
    const pipelineBar = document.getElementById('re-pipeline-bar');
    const result = document.getElementById('re-pipeline-result');

    if (!normalPackets.length || !result) return;

    result.innerHTML = '<p style="color: var(--re-primary);">对比普通 10 次请求 vs Pipeline 批量请求...</p>';

    normalPackets.forEach((p, i) => {
        setTimeout(() => {
            p.classList.add('active');
            normalBar.style.width = ((i + 1) / normalPackets.length) * 100 + '%';
        }, i * 300);
    });

    setTimeout(() => {
        pipelinePackets.forEach((p, i) => {
            setTimeout(() => {
                p.classList.add('active');
                pipelineBar.style.width = ((i + 1) / pipelinePackets.length) * 100 + '%';
            }, i * 80);
        });

        rePipelineTimer = setTimeout(() => {
            result.innerHTML = `
                <p><strong style="color: var(--re-primary);">Pipeline 完成</strong>：将多次 RTT 压缩为一次往返</p>
                <p style="color: var(--re-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    示例：1000 条数据从 328ms 降至 37ms，提升约 9 倍吞吐
                </p>
            `;
            rePipelineTimer = setTimeout(reResetPipelineDemo, 4000);
        }, pipelinePackets.length * 80 + 400);
    }, normalPackets.length * 300 + 400);
}

function reResetPipelineDemo() {
    if (rePipelineTimer) clearTimeout(rePipelineTimer);
    document.querySelectorAll('.re-packet').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.re-timeline-bar').forEach(b => b.style.width = '0%');
    const result = document.getElementById('re-pipeline-result');
    if (result) result.innerHTML = '点击播放查看 Pipeline 批量操作对比';
}

let rePersistTimer = null;

function rePlayPersistDemo() {
    reResetPersistDemo();
    const rdbCard = document.getElementById('re-rdb-card');
    const aofCard = document.getElementById('re-aof-card');
    const result = document.getElementById('re-persist-result');
    if (!rdbCard || !aofCard || !result) return;

    result.innerHTML = '<p style="color: var(--re-primary);">Redis 持久化机制对比：RDB vs AOF</p>';

    setTimeout(() => {
        rdbCard.classList.add('active');
        result.innerHTML = '<p><strong style="color: var(--re-primary);">RDB</strong>：定时快照，文件紧凑，恢复速度快</p>';
    }, 500);

    setTimeout(() => {
        aofCard.classList.add('active');
        result.innerHTML = `
            <p><strong style="color: var(--re-primary);">AOF</strong>：记录每个写操作，数据更安全，默认 everysec</p>
            <p style="color: var(--re-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                生产环境通常同时开启 RDB + AOF，AOF 优先用于恢复
            </p>
        `;
        rePersistTimer = setTimeout(reResetPersistDemo, 4000);
    }, 1800);
}

function reResetPersistDemo() {
    if (rePersistTimer) clearTimeout(rePersistTimer);
    document.querySelectorAll('.re-persistence-card').forEach(c => c.classList.remove('active'));
    const result = document.getElementById('re-persist-result');
    if (result) result.innerHTML = '点击播放查看 RDB / AOF 持久化对比';
}

function reShowDataType(type) {
    document.querySelectorAll('.re-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.re-tab-content').forEach(c => c.classList.remove('active'));

    const tab = document.querySelector(`.re-tab[data-type="${type}"]`);
    const content = document.getElementById(`re-type-${type}`);
    if (tab) tab.classList.add('active');
    if (content) content.classList.add('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const defaultTab = document.querySelector('.re-tab[data-type="string"]');
    if (defaultTab) defaultTab.click();
});
