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
