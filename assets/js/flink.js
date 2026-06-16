// Flink & Structured Streaming Visualization (namespaced to avoid conflicts)

document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal
    const sections = document.querySelectorAll('.fl-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Mobile nav toggle
    const navToggle = document.querySelector('.fl-nav-toggle');
    const navLinks = document.querySelector('.fl-nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Architecture node interaction
    const archNodes = document.querySelectorAll('.fl-arch-node');
    const archInfo = document.getElementById('fl-arch-info');
    if (archNodes.length && archInfo) {
        archNodes.forEach(node => {
            node.addEventListener('click', function() {
                archNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                const info = this.getAttribute('data-info');
                archInfo.innerHTML = `<p style="color: var(--fl-primary); font-weight: 600;">${info}</p>`;
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('.fl-nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 130;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.fl-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
        });
    }
});

// Watermark demo
let flWatermarkTimer = null;

function flPlayWatermarkDemo() {
    flResetWatermarkDemo();
    const events = document.querySelectorAll('#fl-event-stream .fl-event');
    const line = document.getElementById('fl-watermark-line');
    const result = document.getElementById('fl-watermark-result');
    const watermarkDelay = 2; // 允许迟到 2 秒

    let maxEventTime = 0;
    events.forEach(ev => {
        const t = parseInt(ev.getAttribute('data-time'));
        if (t > maxEventTime) maxEventTime = t;
    });

    let currentTime = 0;
    result.innerHTML = '<p style="color: var(--fl-primary);">开始模拟事件时间处理...</p>';

    flWatermarkTimer = setInterval(() => {
        currentTime++;
        const watermark = Math.max(0, currentTime - watermarkDelay);

        // Update watermark line width
        const progress = (currentTime / (maxEventTime + 3)) * 100;
        line.style.width = Math.min(progress, 100) + '%';

        // Process events
        events.forEach(ev => {
            const t = parseInt(ev.getAttribute('data-time'));
            if (!ev.classList.contains('processed') && t <= watermark) {
                ev.classList.add('processed');
                ev.classList.remove('late');
            }
        });

        // Show late data that arrived after watermark
        const lateEvents = [];
        events.forEach(ev => {
            const t = parseInt(ev.getAttribute('data-time'));
            if (ev.classList.contains('late') && t <= currentTime && t > watermark) {
                lateEvents.push(t);
            }
        });

        if (currentTime > maxEventTime + 1) {
            clearInterval(flWatermarkTimer);
            const processedCount = document.querySelectorAll('#fl-event-stream .fl-event.processed').length;
            const totalCount = events.length;
            result.innerHTML = `
                <p><strong style="color: var(--fl-primary);">演示完成</strong></p>
                <p>已处理事件：${processedCount}/${totalCount}</p>
                <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    原理：Watermark = ${watermarkDelay}s 延迟，事件时间 ≤ Watermark 的数据才会被处理
                </p>
            `;
            setTimeout(flResetWatermarkDemo, 3000);
        } else {
            result.innerHTML = `
                <p>当前处理时间：<strong style="color: var(--fl-primary);">t=${currentTime}</strong></p>
                <p>Watermark：<strong style="color: var(--fl-primary);">t=${watermark}</strong></p>
                <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    事件时间 ≤ Watermark 的事件被处理，迟到数据可能被丢弃
                </p>
            `;
        }
    }, 800);
}

function flResetWatermarkDemo() {
    if (flWatermarkTimer) clearInterval(flWatermarkTimer);
    const events = document.querySelectorAll('#fl-event-stream .fl-event');
    events.forEach(ev => ev.classList.remove('processed'));
    const line = document.getElementById('fl-watermark-line');
    if (line) line.style.width = '0%';
    const result = document.getElementById('fl-watermark-result');
    if (result) {
        result.innerHTML = '点击播放查看 Watermark 如何处理迟到数据';
    }
}

// Checkpoint animation
let flCheckpointTimer = null;

function flPlayCheckpoint() {
    flResetCheckpoint();
    const steps = ['fl-cp-step1', 'fl-cp-step2', 'fl-cp-step3', 'fl-cp-step4'];
    const details = [
        'JobManager 周期性向 Source 发送 barrier，触发 Checkpoint',
        'Source 记录消费 offset 后，将 barrier 注入数据流并向下游传递',
        '每个算子收到 barrier 后，异步保存当前状态到 State Backend',
        '所有算子完成快照后向 JobManager 确认，Checkpoint 完成'
    ];
    const result = document.getElementById('fl-checkpoint-result');

    let current = 0;
    result.innerHTML = '<p style="color: var(--fl-primary);">开始 Checkpoint 流程...</p>';

    flCheckpointTimer = setInterval(() => {
        if (current > 0) {
            document.getElementById(steps[current - 1]).classList.remove('active');
        }
        if (current < steps.length) {
            document.getElementById(steps[current]).classList.add('active');
            result.innerHTML = `<p><strong style="color: var(--fl-primary);">步骤 ${current + 1}：</strong>${details[current]}</p>`;
            current++;
        } else {
            clearInterval(flCheckpointTimer);
            result.innerHTML = `
                <p><strong style="color: var(--fl-primary);">Checkpoint 完成</strong></p>
                <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    当作业失败时，可以从最近一次成功的 Checkpoint 恢复，保证 Exactly-once 语义
                </p>
            `;
            setTimeout(flResetCheckpoint, 3000);
        }
    }, 1500);
}

function flResetCheckpoint() {
    if (flCheckpointTimer) clearInterval(flCheckpointTimer);
    document.querySelectorAll('.fl-checkpoint-step').forEach(step => step.classList.remove('active'));
    const result = document.getElementById('fl-checkpoint-result');
    if (result) {
        result.innerHTML = '点击播放查看 Checkpoint 完整流程';
    }
}

// Micro-batch vs Continuous processing animation
let flModeTimer = null;
const flEvents = [
    { id: 'e1', label: 'E1' },
    { id: 'e2', label: 'E2' },
    { id: 'e3', label: 'E3' },
    { id: 'e4', label: 'E4' },
    { id: 'e5', label: 'E5' },
    { id: 'e6', label: 'E6' }
];

function flResetProcessingMode() {
    if (flModeTimer) clearInterval(flModeTimer);

    const mbEvents = document.getElementById('fl-microbatch-events');
    const mbBatches = document.getElementById('fl-microbatch-batches');
    const cEvents = document.getElementById('fl-continuous-events');
    const cOutput = document.getElementById('fl-continuous-output');
    const result = document.getElementById('fl-mode-result');

    if (mbEvents) mbEvents.innerHTML = '';
    if (cEvents) cEvents.innerHTML = '';
    if (cOutput) cOutput.innerHTML = '';
    if (mbBatches) mbBatches.innerHTML = '';
    if (result) result.innerHTML = '点击按钮对比两种处理模式';
}

function flRenderEvents() {
    const mbEvents = document.getElementById('fl-microbatch-events');
    const cEvents = document.getElementById('fl-continuous-events');

    mbEvents.innerHTML = flEvents.map((e, i) =>
        `<div class="fl-mode-event" id="fl-mb-${e.id}" style="transition-delay: ${i * 50}ms">${e.label}</div>`
    ).join('');

    cEvents.innerHTML = flEvents.map((e, i) =>
        `<div class="fl-mode-event" id="fl-c-${e.id}" style="transition-delay: ${i * 50}ms">${e.label}</div>`
    ).join('');
}

function flPlayMicroBatch() {
    flResetProcessingMode();
    flRenderEvents();

    const mbBatches = document.getElementById('fl-microbatch-batches');
    const result = document.getElementById('fl-mode-result');

    const batches = [
        { name: 'Batch 1', indices: [0, 1, 2] },
        { name: 'Batch 2', indices: [3, 4, 5] }
    ];

    mbBatches.innerHTML = batches.map((b, i) => `
        <div class="fl-batch-box" id="fl-batch-${i}">
            <div class="fl-batch-box-title">${b.name}</div>
            <div class="fl-batch-items">${b.indices.map(idx => `
                <div class="fl-batch-item" id="fl-batch-${i}-item-${idx}">${flEvents[idx].label}</div>
            `).join('')}</div>
        </div>
    `).join('');

    result.innerHTML = '<p style="color: var(--fl-primary);">微批处理：将流数据切分为小批次，按批次触发计算...</p>';

    let step = 0;
    flModeTimer = setInterval(() => {
        if (step === 0) {
            document.getElementById('fl-batch-0').classList.add('active');
            batches[0].indices.forEach(idx => {
                setTimeout(() => {
                    document.getElementById(`fl-mb-${flEvents[idx].id}`).classList.add('processed');
                    document.getElementById(`fl-batch-0-item-${idx}`).classList.add('active');
                }, idx * 400);
            });
            result.innerHTML = '<p><strong style="color: var(--fl-primary);">Batch 1 触发：</strong>收集 E1-E3，统一计算</p>';
        } else if (step === 1) {
            document.getElementById('fl-batch-0').classList.remove('active');
            document.getElementById('fl-batch-1').classList.add('active');
            batches[1].indices.forEach(idx => {
                setTimeout(() => {
                    document.getElementById(`fl-mb-${flEvents[idx].id}`).classList.add('processed');
                    document.getElementById(`fl-batch-1-item-${idx}`).classList.add('active');
                }, (idx - 3) * 400);
            });
            result.innerHTML = '<p><strong style="color: var(--fl-primary);">Batch 2 触发：</strong>收集 E4-E6，统一计算</p>';
        } else {
            clearInterval(flModeTimer);
            result.innerHTML = `
                <p><strong style="color: var(--fl-primary);">微批处理完成</strong></p>
                <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    特点：秒级延迟、强一致性、吞吐高、适合聚合类查询
                </p>
            `;
            setTimeout(flResetProcessingMode, 4000);
        }
        step++;
    }, 1800);
}

function flPlayContinuous() {
    flResetProcessingMode();
    flRenderEvents();

    const cOutput = document.getElementById('fl-continuous-output');
    const result = document.getElementById('fl-mode-result');

    result.innerHTML = '<p style="color: #10b981;">持续处理：每条数据到达后立即处理，毫秒级延迟...</p>';

    flEvents.forEach((e, i) => {
        setTimeout(() => {
            document.getElementById(`fl-c-${e.id}`).classList.add('continuous-processed');
            const item = document.createElement('div');
            item.className = 'fl-continuous-item';
            item.textContent = e.label;
            cOutput.appendChild(item);
            setTimeout(() => item.classList.add('active'), 30);
        }, i * 500);
    });

    setTimeout(() => {
        result.innerHTML = `
            <p><strong style="color: #10b981;">持续处理完成</strong></p>
            <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                特点：毫秒级延迟、逐条处理、吞吐相对较低、适合端到端低延迟场景
            </p>
        `;
        setTimeout(flResetProcessingMode, 4000);
    }, flEvents.length * 500 + 500);
}

// Structured Streaming output modes animation
let flOutputTimer = null;

const flOutputData = [
    { ts: 1, user: 'A', count: 1 },
    { ts: 2, user: 'B', count: 1 },
    { ts: 3, user: 'A', count: 2 },
    { ts: 4, user: 'B', count: 2 },
    { ts: 5, user: 'C', count: 1 }
];

function flResetOutputMode() {
    if (flOutputTimer) clearInterval(flOutputTimer);

    const inputRows = document.querySelectorAll('#fl-output-input .fl-input-row');
    inputRows.forEach(row => row.classList.remove('active', 'append-active', 'update-active'));

    const result = document.getElementById('fl-output-result');
    if (result) {
        result.innerHTML = '<div class="fl-result-placeholder">选择模式并播放</div>';
    }

    const desc = document.getElementById('fl-output-desc');
    if (desc) {
        desc.textContent = '三种输出模式：Complete 输出完整结果集，Append 仅追加新增，Update 仅输出变化';
    }
}

function flPlayOutputMode(mode) {
    flResetOutputMode();

    const inputRows = document.querySelectorAll('#fl-output-input .fl-input-row');
    const result = document.getElementById('fl-output-result');
    const desc = document.getElementById('fl-output-desc');
    if (!result || !inputRows.length) return;

    const activeClass = mode === 'append' ? 'append-active' : (mode === 'update' ? 'update-active' : 'active');
    const color = mode === 'append' ? '#3b82f6' : (mode === 'update' ? '#a855f7' : 'var(--fl-primary)');
    const modeName = mode === 'complete' ? 'Complete 完整模式' : (mode === 'append' ? 'Append 追加模式' : 'Update 更新模式');

    let step = 0;
    const totals = {};

    desc.innerHTML = `<p style="color: ${color};">${modeName} 演示中...</p>`;

    flOutputTimer = setInterval(() => {
        if (step >= flOutputData.length) {
            clearInterval(flOutputTimer);
            const summary = mode === 'complete'
                ? '每次触发都输出完整的聚合结果表'
                : (mode === 'append'
                    ? '每次只追加最新到达的数据行'
                    : '每次只输出聚合值发生变化的数据行');
            desc.innerHTML = `
                <p><strong style="color: ${color};">${modeName} 完成</strong></p>
                <p style="color: var(--fl-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">${summary}</p>
            `;
            setTimeout(flResetOutputMode, 4000);
            return;
        }

        const data = flOutputData[step];
        inputRows[step].classList.add(activeClass);
        totals[data.user] = (totals[data.user] || 0) + data.count;

        let rowsHTML = '';
        if (mode === 'complete') {
            const users = Object.keys(totals).sort();
            rowsHTML = users.map((u, i) => `
                <div class="fl-result-row" style="transition-delay: ${i * 80}ms">
                    <span class="fl-input-kv">user=${u}, count=${totals[u]}</span>
                </div>
            `).join('');
        } else if (mode === 'append') {
            rowsHTML = flOutputData.slice(0, step + 1).map((e, i) => `
                <div class="fl-result-row" style="transition-delay: ${i * 60}ms">
                    <span class="fl-input-kv">t=${e.ts}, user=${e.user}, count=${e.count}</span>
                </div>
            `).join('');
        } else {
            const prevTotals = {};
            for (let i = 0; i < step; i++) {
                const e = flOutputData[i];
                prevTotals[e.user] = (prevTotals[e.user] || 0) + e.count;
            }
            const changed = Object.keys(totals)
                .filter(u => totals[u] !== prevTotals[u])
                .sort();
            rowsHTML = changed.map((u, i) => `
                <div class="fl-result-row" style="transition-delay: ${i * 80}ms">
                    <span class="fl-input-kv">user=${u}, count=${totals[u]}</span>
                </div>
            `).join('');
            if (!changed.length) {
                rowsHTML = '<div class="fl-result-placeholder">本触发无变化行</div>';
            }
        }

        result.innerHTML = rowsHTML;
        requestAnimationFrame(() => {
            result.querySelectorAll('.fl-result-row').forEach((row, i) => {
                setTimeout(() => row.classList.add(activeClass), i * 80);
            });
        });

        desc.innerHTML = `<p><strong style="color: ${color};">t=${data.ts}</strong> user=${data.user}, count=${data.count} 到达</p>`;

        step++;
    }, 1200);
}
