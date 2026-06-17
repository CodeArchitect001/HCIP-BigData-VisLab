// Kafka Visualization (namespaced to avoid conflicts)

document.addEventListener('DOMContentLoaded', function() {
    const archNodes = document.querySelectorAll('.ka-arch-node');
    archNodes.forEach(node => {
        node.addEventListener('click', function() {
            archNodes.forEach(n => n.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function selectArchNode(node) {
    document.querySelectorAll('.ka-arch-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
}

let kaReplicaTimer = null;

function kaPlayReplicaDemo() {
    kaResetReplicaDemo();
    const leaders = document.querySelectorAll('.ka-replica-partition.leader');
    const followers = document.querySelectorAll('.ka-replica-partition.follower');
    const result = document.getElementById('ka-replica-result');

    if (!leaders.length || !result) return;

    result.innerHTML = '<p style="color: var(--ka-primary);">生产者发送消息到 Leader Partition...</p>';

    setTimeout(() => {
        leaders.forEach(l => l.classList.add('active'));
        result.innerHTML = '<p><strong style="color: var(--ka-primary);">Leader 写入成功</strong>，开始复制到 Follower</p>';

        setTimeout(() => {
            followers.forEach(f => f.classList.add('sync'));
            result.innerHTML = `
                <p><strong style="color: var(--ka-primary);">副本同步完成</strong></p>
                <p style="color: var(--ka-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    Leader 负责读写，Follower 实时同步，Leader 故障时自动切换
                </p>
            `;
            kaReplicaTimer = setTimeout(kaResetReplicaDemo, 4000);
        }, 1200);
    }, 600);
}

function kaResetReplicaDemo() {
    if (kaReplicaTimer) clearTimeout(kaReplicaTimer);
    document.querySelectorAll('.ka-replica-partition').forEach(p => {
        p.classList.remove('active', 'sync');
    });
    const result = document.getElementById('ka-replica-result');
    if (result) result.innerHTML = '点击播放查看 Leader-Follower 副本同步机制';
}

let kaPartitionTimer = null;

function kaPlayPartitionDemo() {
    kaResetPartitionDemo();
    const partitions = document.querySelectorAll('#ka-partition-brokers .ka-partition');
    const messages = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6'];
    const result = document.getElementById('ka-partition-result');

    if (!partitions.length || !result) return;

    result.innerHTML = '<p style="color: var(--ka-primary);">按 key 的 hash 值路由到不同 Partition...</p>';

    let step = 0;
    kaPartitionTimer = setInterval(() => {
        if (step >= messages.length) {
            clearInterval(kaPartitionTimer);
            result.innerHTML = `
                <p><strong style="color: var(--ka-primary);">分区路由完成</strong></p>
                <p style="color: var(--ka-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    相同 key 的消息进入同一 Partition，保证分区内的顺序性
                </p>
            `;
            setTimeout(kaResetPartitionDemo, 4000);
            return;
        }

        const index = step % partitions.length;
        partitions.forEach(p => p.classList.remove('active'));
        partitions[index].classList.add('active');
        partitions[index].textContent = messages[step];
        result.innerHTML = `<p>消息 <strong style="color: var(--ka-primary);">${messages[step]}</strong> 路由到 Partition ${index + 1}</p>`;
        step++;
    }, 900);
}

function kaResetPartitionDemo() {
    if (kaPartitionTimer) clearInterval(kaPartitionTimer);
    const partitions = document.querySelectorAll('#ka-partition-brokers .ka-partition');
    partitions.forEach((p, i) => {
        p.classList.remove('active');
        p.textContent = `P${i + 1}`;
    });
    const result = document.getElementById('ka-partition-result');
    if (result) result.innerHTML = '点击播放查看消息如何分发到不同 Partition';
}

let kaConsumerTimer = null;

function kaPlayConsumerGroupDemo() {
    kaResetConsumerGroupDemo();
    const consumers = [
        document.getElementById('ka-consumer-1'),
        document.getElementById('ka-consumer-2')
    ];
    const result = document.getElementById('ka-consumer-result');
    if (!consumers[0] || !result) return;

    const assignment = [
        { consumer: 0, partitions: ['P0', 'P1'] },
        { consumer: 1, partitions: ['P2', 'P3'] }
    ];

    result.innerHTML = '<p style="color: var(--ka-primary);">Consumer Group 启动，开始分配 Partition...</p>';

    assignment.forEach((item, idx) => {
        setTimeout(() => {
            consumers[item.consumer].classList.add('active');
            const container = consumers[item.consumer].querySelector('.ka-assigned-partitions');
            container.innerHTML = item.partitions.map(p =>
                `<div class="ka-partition active">${p}</div>`
            ).join('');
            result.innerHTML = `<p>Consumer ${item.consumer + 1} 分配到 <strong style="color: var(--ka-primary);">${item.partitions.join(', ')}</strong></p>`;
        }, idx * 1200);
    });

    kaConsumerTimer = setTimeout(() => {
        result.innerHTML = `
            <p><strong style="color: var(--ka-primary);">分配完成</strong></p>
            <p style="color: var(--ka-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                同一 Group 内，一个 Partition 只能被一个 Consumer 消费；增加 Consumer 可水平扩展
            </p>
        `;
        setTimeout(kaResetConsumerGroupDemo, 4000);
    }, assignment.length * 1200 + 500);
}

function kaResetConsumerGroupDemo() {
    if (kaConsumerTimer) clearTimeout(kaConsumerTimer);
    document.querySelectorAll('.ka-consumer').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.ka-assigned-partitions').forEach(c => c.innerHTML = '');
    const result = document.getElementById('ka-consumer-result');
    if (result) result.innerHTML = '点击播放查看 Consumer Group 分区分配';
}

let kaProduceTimer = null;

function kaPlayProduceFlow() {
    kaResetProduceFlow();
    const boxes = [
        document.getElementById('ka-produce-step1'),
        document.getElementById('ka-produce-step2'),
        document.getElementById('ka-produce-step3'),
        document.getElementById('ka-produce-step4')
    ];
    const result = document.getElementById('ka-produce-result');
    const details = [
        'Producer 序列化 key/value，选择目标 Topic',
        '根据分区策略（key hash / round-robin）选择 Partition',
        '消息发送到 Leader Broker，写入 segment 日志文件',
        'Follower 同步副本，返回 ACK 后 Producer 收到确认'
    ];

    if (!boxes[0] || !result) return;
    result.innerHTML = '<p style="color: var(--ka-primary);">开始演示消息生产流程...</p>';

    let step = 0;
    kaProduceTimer = setInterval(() => {
        boxes.forEach(b => b.classList.remove('active'));
        if (step >= boxes.length) {
            clearInterval(kaProduceTimer);
            result.innerHTML = `
                <p><strong style="color: var(--ka-primary);">消息生产完成</strong></p>
                <p style="color: var(--ka-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    Producer 发送消息到 Broker，副本同步后返回 ACK
                </p>
            `;
            setTimeout(kaResetProduceFlow, 4000);
            return;
        }
        boxes[step].classList.add('active');
        result.innerHTML = `<p><strong style="color: var(--ka-primary);">步骤 ${step + 1}：</strong>${details[step]}</p>`;
        step++;
    }, 1200);
}

function kaResetProduceFlow() {
    if (kaProduceTimer) clearInterval(kaProduceTimer);
    document.querySelectorAll('#ka-produce-flow .ka-stage-box').forEach(b => b.classList.remove('active'));
    const result = document.getElementById('ka-produce-result');
    if (result) result.innerHTML = '点击播放查看 Producer → Broker 完整流程';
}

let kaConsumeTimer = null;

function kaPlayConsumeFlow() {
    kaResetConsumeFlow();
    const boxes = [
        document.getElementById('ka-consume-step1'),
        document.getElementById('ka-consume-step2'),
        document.getElementById('ka-consume-step3'),
        document.getElementById('ka-consume-step4')
    ];
    const result = document.getElementById('ka-consume-result');
    const details = [
        'Consumer 加入 Group，Coordinator 分配 Partition',
        'Consumer 从分配 Partition 的 Leader 拉取消息',
        '处理消息后更新 offset 到 __consumer_offsets',
        '下次消费从最新 offset 继续，支持从 beginning 回溯'
    ];

    if (!boxes[0] || !result) return;
    result.innerHTML = '<p style="color: var(--ka-primary);">开始演示消息消费流程...</p>';

    let step = 0;
    kaConsumeTimer = setInterval(() => {
        boxes.forEach(b => b.classList.remove('active'));
        if (step >= boxes.length) {
            clearInterval(kaConsumeTimer);
            result.innerHTML = `
                <p><strong style="color: var(--ka-primary);">消息消费完成</strong></p>
                <p style="color: var(--ka-text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                    Consumer Group 实现负载均衡，offset 持久化保证断点续传
                </p>
            `;
            setTimeout(kaResetConsumeFlow, 4000);
            return;
        }
        boxes[step].classList.add('active');
        result.innerHTML = `<p><strong style="color: var(--ka-primary);">步骤 ${step + 1}：</strong>${details[step]}</p>`;
        step++;
    }, 1200);
}

function kaResetConsumeFlow() {
    if (kaConsumeTimer) clearInterval(kaConsumeTimer);
    document.querySelectorAll('#ka-consume-flow .ka-stage-box').forEach(b => b.classList.remove('active'));
    const result = document.getElementById('ka-consume-result');
    if (result) result.innerHTML = '点击播放查看 Consumer Group 消费流程';
}
