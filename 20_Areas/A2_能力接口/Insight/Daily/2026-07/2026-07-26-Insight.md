---
title: "🌅 2026-07-26 洞察日报"
tags: [洞察, 系统文档]
date: 2026-07-26
created: 2026-07-26
---

## 🗓️ 2026年7月26日 · 星期日

> 今日洞察扫描全库 534 篇原子笔记 + 29 篇 BuJo 日记 + 375 篇归档，生成七维知行循环体检报告。

---

## 🌐 观全局

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#c6e48b";
    let targetVal = pctOrRank;
    if (useRankMode) {
        if (targetVal > 0.8) barColor = "#196127";
        else if (targetVal > 0.6) barColor = "#2e8840";
        else if (targetVal > 0.4) barColor = "#49af5d";
        else if (targetVal > 0.2) barColor = "#7bc96f";
        else barColor = "#c6e48b";
    } else {
        if (targetVal <= 15) barColor = "#c6e48b";
        else if (targetVal <= 30) barColor = "#7bc96f";
        else if (targetVal <= 45) barColor = "#49af5d";
        else if (targetVal <= 60) barColor = "#2e8840";
        else barColor = "#196127";
    }
    let rightText = displayText !== null ? displayText : `${pctOrRank}%`;
    return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <span style="min-width: 150px; font-size: 13px; color: #4B5563; flex-shrink: 0; text-align: right;">${label}</span>
        <div style="flex: 1; max-width: 460px; height: 8px; background-color: #F3F4F6; border-radius: 99px; overflow: hidden;">
            <div style="width: ${useRankMode ? (targetVal * 100) : targetVal}%; height: 100%; border-radius: 99px; background-color: ${barColor};"></div>
        </div>
        <span style="min-width: 30px; font-size: 13px; font-weight: 600; color: #4B5563; text-align: right; white-space: nowrap; flex-shrink: 0;">${rightText}</span>
    </div>`;
}

const items = [
    { label: "原子笔记", val: "534 篇", pct: 100 },
    { label: "BuJo 日记（本月）", val: "29 篇", pct: 97 },
    { label: "归档", val: "375 篇", pct: 70 },
    { label: "外部导入待处理", val: "7 篇", pct: 1.3 },
    { label: "raw 待编译", val: "0 篇", pct: 0 },
];

let html = `<div style="margin: 1rem 0; font-family: -apple-system, sans-serif;">`;
for (let d of items) {
    html += renderGreenBar(d.label, d.pct, d.val, false);
}
html += `</div>`;
dv.paragraph(html);
```

**判断**：输出端持续活跃（534 篇原子笔记 + 29 篇 BuJo 全勤），输入端积压可控（7 篇外部导入待处理，_raw 待编译 0 篇）。整体处于「输出端旺盛」的健康状态。

---

## 🌊 察潜流

**全库 type 分布**（按数量降序排列）：

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#c6e48b";
    let targetVal = pctOrRank;
    if (useRankMode) {
        if (targetVal > 0.8) barColor = "#196127";
        else if (targetVal > 0.6) barColor = "#2e8840";
        else if (targetVal > 0.4) barColor = "#49af5d";
        else if (targetVal > 0.2) barColor = "#7bc96f";
        else barColor = "#c6e48b";
    } else {
        if (targetVal <= 15) barColor = "#c6e48b";
        else if (targetVal <= 30) barColor = "#7bc96f";
        else if (targetVal <= 45) barColor = "#49af5d";
        else if (targetVal <= 60) barColor = "#2e8840";
        else barColor = "#196127";
    }
    let rightText = displayText !== null ? displayText : `${pctOrRank}%`;
    return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <span style="min-width: 150px; font-size: 13px; color: #4B5563; flex-shrink: 0; text-align: right;">${label}</span>
        <div style="flex: 1; max-width: 460px; height: 8px; background-color: #F3F4F6; border-radius: 99px; overflow: hidden;">
            <div style="width: ${useRankMode ? (targetVal * 100) : targetVal}%; height: 100%; border-radius: 99px; background-color: ${barColor};"></div>
        </div>
        <span style="min-width: 30px; font-size: 13px; font-weight: 600; color: #4B5563; text-align: right; white-space: nowrap; flex-shrink: 0;">${rightText}</span>
    </div>`;
}

const types = [
    { label: "practice 实践", count: 123 },
    { label: "concept 概念", count: 111 },
    { label: "model 模型", count: 12 },
    { label: "critique 批判", count: 3 },
    { label: "moc 知识地图", count: 1 },
];

let maxCount = Math.max(...types.map(d => d.count));
let html = `<div style="margin: 1rem 0; font-family: -apple-system, sans-serif;">`;
for (let d of types) {
    let pct = Math.round((d.count / maxCount) * 100);
    html += renderGreenBar(d.label, pct, `${d.count} 篇`, false);
}
html += `</div>`;
dv.paragraph(html);
```

**判断**：**实践输出型**（practice 123 : concept 111 ≈ 1.1:1，两者均衡且占绝对主导）。concept 占比 44% 说明概念输入基础扎实，practice 占比 49% 说明实践转化能力较强。但 **moc 仅 1 篇**，知识地图建设处于空白状态，全库 534 篇原子笔记缺乏结构化索引，长期将导致信息碎片化。

**近7天增量**：10 篇原子笔记有修改，活跃度较低（7天窗口仅 10/534 ≈ 1.9%），警惕「知识库沉睡」倾向。

---

## 🪸 拂遗珠

### 外部导入待处理清单（7 篇）

`00_Inbox/外部导入/`：

| 文件 | 大小 | 来源 |
|:---|:---:|:---|
| 词汇表.md | 22KB | 7/26 最新 |
| 纯金融高频词表.md | 35KB | 7/25 |
| 富贵包矫正 · 唤醒期每日执行计划.md | 10KB | 7/25 |
| 金融语料库.md | 250KB | 7/21 |
| 知→行→进化 分镜台本.md | 32KB | 7/20 |
| market language chunk.md | 11KB | 7/24 |
| stock language chunk.md | 4KB | 7/24 |

### _raw 待编译

**0 篇** ✅ — 全部 6 篇素材已标记 `ingest_status: ingested`，无积压。

### ai_generated 待审核清单（7 篇）

全库 `ai_generated` 笔记共 7 篇，**均无 `human_edited` 标记**，需人工审核：

- **关系领域**（4 篇）：
  - `关系/实践/情绪表达的习得性无助与结构化表达框架.md`
  - `关系/实践/指责的动机分类模型（曹雪敏）.md`
  - `关系/概念/冲突即韧性建设（亲密关系）.md`
  - `关系/概念/被凝视的自我审视（曹雪敏）.md`
- **生活领域**（3 篇）：
  - `生活/概念/上热下寒（中医）.md`
  - `生活/概念/姜枣茶（中医）.md`
  - `生活/模型/五运六气（中医）.md`

### Inbox 超期检查

**0 篇** — 无放置超过 14 天的文件 ✅

---

## 🔦 照暗面

### 1. 近7天原子笔记活跃度偏低

近 7 天仅 10 篇原子笔记有修改，占全库 534 篇的 1.9%。BuJo 日记全勤 29 天但知识产出未同步，存在「日记写了不少，笔记没怎么动」的输入输出剪刀差。

### 2. moc 知识地图建设空白

全库仅 1 篇 moc 类型笔记，对应 17 个 MOC 目录文件。534 篇原子笔记缺乏结构化索引，信息检索效率受限。

### 3. ai_generated 笔记无人审核

7 篇 AI 生成笔记（关系 4 + 生活 3 篇）均无 `human_edited` 标记，属于「生成即归档」状态，未经过人工校验。

### 4. 外部导入待处理清单积压

7 篇外部导入文件，其中 `金融语料库.md` 达 250KB，体量巨大，编译成本高。

---

## 🍃 辨风势

**近7天标签热度**（按活跃度降序排列）：

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#c6e48b";
    let targetVal = pctOrRank;
    if (useRankMode) {
        if (targetVal > 0.8) barColor = "#196127";
        else if (targetVal > 0.6) barColor = "#2e8840";
        else if (targetVal > 0.4) barColor = "#49af5d";
        else if (targetVal > 0.2) barColor = "#7bc96f";
        else barColor = "#c6e48b";
    } else {
        if (targetVal <= 15) barColor = "#c6e48b";
        else if (targetVal <= 30) barColor = "#7bc96f";
        else if (targetVal <= 45) barColor = "#49af5d";
        else if (targetVal <= 60) barColor = "#2e8840";
        else barColor = "#196127";
    }
    let rightText = displayText !== null ? displayText : `${pctOrRank}%`;
    return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <span style="min-width: 150px; font-size: 13px; color: #4B5563; flex-shrink: 0; text-align: right;">${label}</span>
        <div style="flex: 1; max-width: 460px; height: 8px; background-color: #F3F4F6; border-radius: 99px; overflow: hidden;">
            <div style="width: ${useRankMode ? (targetVal * 100) : targetVal}%; height: 100%; border-radius: 99px; background-color: ${barColor};"></div>
        </div>
        <span style="min-width: 30px; font-size: 13px; font-weight: 600; color: #4B5563; text-align: right; white-space: nowrap; flex-shrink: 0;">${rightText}</span>
    </div>`;
}

const tagsData = [
    { label: "语言", count: 95 },
    { label: "心理学", count: 48 },
    { label: "健身", count: 32 },
    { label: "知识管理", count: 29 },
    { label: "个人成长", count: 24 },
    { label: "模型", count: 11 },
    { label: "实践", count: 9 },
    { label: "认知算法", count: 6 },
    { label: "习惯", count: 5 },
    { label: "生活", count: 2 },
];

let totalTags = tagsData.length;
let tagHtml = `<div style="margin: 1rem 0; font-family: -apple-system, sans-serif;">`;
for (let i = 0; i < totalTags; i++) {
    let d = tagsData[i];
    let rankPct = (totalTags - i - 1) / (totalTags - 1);
    tagHtml += renderGreenBar(d.label, rankPct, `${d.count} 篇`, true);
}
tagHtml += `</div>`;
dv.paragraph(tagHtml);
```

**趋势判断**：**语言领域持续领跑**（95 篇，占近7天活跃标签的 38%），与近期金融语料库、词汇表等外部导入方向一致。**心理学**（48 篇）和 **健身**（32 篇）位居第二梯队，**知识管理**（29 篇）异军突起，反映近期对 Obsidian 工作流的调优密集期。**认知算法**（6 篇）和 **习惯**（5 篇）虽低频但持续出现，说明微习惯和认知科学是稳定的长期关注。

---

## 🌡️ 测热力

以下为 Heatmap Calendar 渲染的每日活跃度分布（色块越深表示当天修改笔记越多）：

```dataviewjs
try {
  const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal" or "00_Inbox" or "10_Projects" or "20_Areas" or "30_Resources"')
    .where(p => p.file.day);
  const countMap = {};
  pages.forEach(p => {
    const key = p.file.day.toFormat("yyyy-MM-dd");
    countMap[key] = (countMap[key] || 0) + 1;
  });
  const entries = Object.entries(countMap).map(([date, count]) => ({ date: date, intensity: count }));
  renderHeatmapCalendar(this.container, { colors: "default", entries: entries });
} catch(e) {
  dv.span("⚠️ Heatmap Calendar 插件未启用，请安装后查看热力图");
}
```

**近30天注意力分布概览**：

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#c6e48b";
    let targetVal = pctOrRank;
    if (useRankMode) {
        if (targetVal > 0.8) barColor = "#196127";
        else if (targetVal > 0.6) barColor = "#2e8840";
        else if (targetVal > 0.4) barColor = "#49af5d";
        else if (targetVal > 0.2) barColor = "#7bc96f";
        else barColor = "#c6e48b";
    } else {
        if (targetVal <= 15) barColor = "#c6e48b";
        else if (targetVal <= 30) barColor = "#7bc96f";
        else if (targetVal <= 45) barColor = "#49af5d";
        else if (targetVal <= 60) barColor = "#2e8840";
        else barColor = "#196127";
    }
    let rightText = displayText !== null ? displayText : `${pctOrRank}%`;
    return `<div style="display: flex; align-items: center; gap: 12px; margin-bottom: 10px;">
        <span style="min-width: 150px; font-size: 13px; color: #4B5563; flex-shrink: 0; text-align: right;">${label}</span>
        <div style="flex: 1; max-width: 460px; height: 8px; background-color: #F3F4F6; border-radius: 99px; overflow: hidden;">
            <div style="width: ${useRankMode ? (targetVal * 100) : targetVal}%; height: 100%; border-radius: 99px; background-color: ${barColor};"></div>
        </div>
        <span style="min-width: 30px; font-size: 13px; font-weight: 600; color: #4B5563; text-align: right; white-space: nowrap; flex-shrink: 0;">${rightText}</span>
    </div>`;
}

const attentionData = [
    { label: "BuJo 日记（本月）", pct: 100 },
    { label: "原子笔记（7天活跃）", pct: 1.9 },
    { label: "外部导入处理", pct: 1.3 },
    { label: "归档新增", pct: 0 },
];

let html = `<div style="margin: 1rem 0; font-family: -apple-system, sans-serif;">`;
for (let d of attentionData) {
    html += renderGreenBar(d.label, d.pct, null, false);
}
html += `</div>`;
dv.paragraph(html);
```

**注意力分布结论**：BuJo 日记全勤 29 天占据绝对主导，占注意力资源的 95%+。原子笔记修改仅 10 篇，说明知识产出节奏放缓。**注意力集中在日记记录，但知识提炼和结构化加工不足。**

---

## 🎯 践一诺

### 本周唯一承诺：打破知识产出僵局

**数据支撑**：近7天仅 10 篇原子笔记修改（1.9%），但外部导入待处理 7 篇 — 输入与输出失衡。BuJo 日记全勤（29 天）但知识转化率低。

**行动项**：从外部导入中选取 **1 篇**完成编译入库（建议从 `词汇表.md` 或 `market language chunk.md` 这类体量适中的语言类素材入手），打破「只收不产」循环。

> [!note] 唯一承诺
> 本周洞察收敛为唯一可执行承诺。多则失焦，少则无力。
>
> **约束**：此区块仅保留 1 条最高优先级行动项。多个候选须在 `## 察潜流` 或 `## 辨风势` 中完成筛选，只有胜出者方可进入此处。

---

*本报告由 Hermes Agent 于 2026-07-26 22:03 自动生成。*