// Elasticsearch Visualization (namespaced to avoid conflicts with HBase pages)

document.addEventListener('DOMContentLoaded', function() {
    // Scroll reveal
    const sections = document.querySelectorAll('.es-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    // Mobile nav toggle
    const navToggle = document.querySelector('.es-nav-toggle');
    const navLinks = document.querySelector('.es-nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }

    // Architecture node interaction
    const archNodes = document.querySelectorAll('.es-arch-node');
    const archInfo = document.getElementById('es-arch-info');
    if (archNodes.length && archInfo) {
        archNodes.forEach(node => {
            node.addEventListener('click', function() {
                archNodes.forEach(n => n.classList.remove('active'));
                this.classList.add('active');
                const info = this.getAttribute('data-info');
                archInfo.innerHTML = `<p style="color: var(--es-primary); font-weight: 600;">${info}</p>`;
            });
        });
    }

    // Demo search input enter key
    const demoSearchInput = document.getElementById('es-demo-search');
    if (demoSearchInput) {
        demoSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') esDemoSearch();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('.es-nav-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 130;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
            // Close mobile menu if open
            if (navLinks) navLinks.classList.remove('active');
        });
    });

    // Navbar shadow on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.es-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            lastScroll = currentScroll;
        });
    }
});

// Inverted index demo search
function esDemoSearch() {
    const query = document.getElementById('es-demo-search').value.trim().toLowerCase();
    const docs = document.querySelectorAll('.es-demo-doc');
    const resultDiv = document.getElementById('es-demo-result');

    if (!query) {
        resultDiv.innerHTML = '<p style="color: var(--es-text-secondary);">请输入关键词</p>';
        return;
    }

    const matchedDocs = [];
    docs.forEach(doc => {
        const words = doc.getAttribute('data-words').toLowerCase();
        if (words.includes(query)) {
            doc.classList.add('highlight');
            const docId = doc.querySelector('strong').textContent;
            matchedDocs.push(docId);
        } else {
            doc.classList.remove('highlight');
        }
    });

    if (matchedDocs.length > 0) {
        resultDiv.innerHTML = `
            <p><strong style="color: var(--es-primary);">搜索 "${query}" 的结果：</strong></p>
            <p>命中文档：${matchedDocs.join(', ')}</p>
            <p style="color: var(--es-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                原理：通过倒排索引直接定位包含 "${query}" 的文档，无需遍历所有文档
            </p>
        `;
    } else {
        resultDiv.innerHTML = `<p style="color: var(--es-highlight);">未找到包含 "${query}" 的文档</p>`;
    }
}

// Index flow animation
let esIndexFlowTimer = null;

function esPlayIndexFlow() {
    esResetIndexFlow();
    const steps = ['es-idx-step1', 'es-idx-step2', 'es-idx-step3', 'es-idx-step4', 'es-idx-step5'];
    const details = [
        '客户端发送索引请求到集群中的任意节点',
        '接收节点根据 _routing 计算目标分片位置',
        'Primary Shard（主分片）执行实际的写入操作',
        '数据并行复制到所有 Replica Shard（副本分片）',
        '收到足够数量的副本确认后，返回客户端成功响应'
    ];
    const detailDiv = document.getElementById('es-index-detail');

    let current = 0;
    detailDiv.innerHTML = `<p style="color: var(--es-primary);">开始索引流程...</p>`;

    esIndexFlowTimer = setInterval(() => {
        if (current > 0) {
            document.getElementById(steps[current - 1]).classList.remove('active');
        }
        if (current < steps.length) {
            document.getElementById(steps[current]).classList.add('active');
            detailDiv.innerHTML = `<p><strong style="color: var(--es-primary);">步骤 ${current + 1}：</strong>${details[current]}</p>`;
            current++;
        } else {
            clearInterval(esIndexFlowTimer);
            detailDiv.innerHTML = `<p style="color: var(--es-primary);">索引流程完成！</p>`;
            setTimeout(esResetIndexFlow, 2000);
        }
    }, 1500);
}

function esResetIndexFlow() {
    if (esIndexFlowTimer) clearInterval(esIndexFlowTimer);
    document.querySelectorAll('#es-index-flow-container .es-flow-step').forEach(step => step.classList.remove('active'));
    const detailDiv = document.getElementById('es-index-detail');
    if (detailDiv) {
        detailDiv.innerHTML = '<p style="color: var(--es-text-secondary);">点击播放查看索引流程</p>';
    }
}

// Search flow animation
let esSearchFlowTimer = null;

function esPlaySearchFlow() {
    esResetSearchFlow();
    const queryPhase = document.getElementById('es-query-phase');
    const fetchPhase = document.getElementById('es-fetch-phase');
    if (!queryPhase || !fetchPhase) return;

    queryPhase.classList.add('active');

    esSearchFlowTimer = setTimeout(() => {
        queryPhase.classList.remove('active');
        fetchPhase.classList.add('active');

        esSearchFlowTimer = setTimeout(() => {
            fetchPhase.classList.remove('active');
        }, 2000);
    }, 2000);
}

function esResetSearchFlow() {
    if (esSearchFlowTimer) clearTimeout(esSearchFlowTimer);
    const queryPhase = document.getElementById('es-query-phase');
    const fetchPhase = document.getElementById('es-fetch-phase');
    if (queryPhase) queryPhase.classList.remove('active');
    if (fetchPhase) fetchPhase.classList.remove('active');
}

// Command tabs
function esShowCmdTab(tab) {
    document.querySelectorAll('.es-cmd-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.es-cmd-content').forEach(c => c.classList.remove('active'));

    if (event && event.target) {
        event.target.classList.add('active');
    } else {
        const targetTab = document.querySelector(`.es-cmd-tab[data-tab="${tab}"]`);
        if (targetTab) targetTab.classList.add('active');
    }

    const content = document.getElementById('es-' + tab + '-cmds');
    if (content) content.classList.add('active');
}
