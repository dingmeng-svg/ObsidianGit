---
title: 🌅 {{date:YYYY年MM月DD日}} · Insight
date:
  "{ date:YYYY-MM-DD }":
tags:
  - 洞察
  - 系统文档
---

# 🗓️ {{date:YYYY年MM月DD日}} · Insight

> **生成时间**：{{date:YYYY-MM-DD HH:mm}}
> **执行者**：Hermes Agent

## 🌐 观全局

今日关键词：（一句话概括今日核心工作）

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#F4FCF6";
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
  { label: "原子笔记总数", val: "— 篇", pct: 100 },
  { label: "Bullet Journal 本月活跃", val: "— 天", pct: 60 },
  { label: "_raw 待编译", val: "— 篇", pct: 15 },
  { label: "外部导入待处理", val: "— 篇", pct: 15 },
  { label: "归档总数", val: "— 篇", pct: 70 }
];

let html = "";
for (let d of items) { html += renderGreenBar(d.label, d.pct, d.val, false); }
dv.span(html);
```

## 🌊 察潜流

近 30 天原子笔记按 type 分布分析。描述实践型/概念型/模型型/批判型各自占比和变化趋势。

1. （趋势分析点一）
2. （趋势分析点二）
3. （趋势分析点三）

## 🪸 拂遗珠

- 被忽略但值得关注的存量素材
- _raw 待编译 / 外部导入待处理状态
- Inbox 超期预警

## 🔦 照暗面

1. （问题一：描述+根因+影响）
2. （问题二）
3. （问题三）

**判定**：（整体评估）

## 🍃 辨风势

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#F4FCF6";
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
  { label: "practice 实践", count: 0 },
  { label: "concept 概念", count: 0 },
  { label: "model 模型", count: 0 },
  { label: "critique 批判", count: 0 }
];

let tagHtml = "";
for (let i = 0; i < tagsData.length; i++) {
    let d = tagsData[i];
    let rankPct = (tagsData.length - i - 1) / (tagsData.length - 1);
    tagHtml += renderGreenBar(d.label, rankPct, `${d.count} 篇`, true);
}
dv.span(tagHtml);
```

**趋势**：（总结性判断）

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

### 近 30 天注意力分布概览

```dataviewjs
function renderGreenBar(label, pctOrRank, displayText = null, useRankMode = false) {
    let barColor = "#F4FCF6";
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

const data = [
  { label: "领域一", pct: 0 },
  { label: "领域二", pct: 0 },
  { label: "领域三", pct: 0 },
  { label: "领域四", pct: 0 }
];

let barHtml = "";
for (let d of data) { barHtml += renderGreenBar(d.label, d.pct, null, false); }
dv.span(barHtml);
```

## 🎯 践一诺

> [!note] 唯一承诺
> 本周洞察收敛为唯一可执行承诺。多则失焦，少则无力。
>
> **约束**：此区块仅保留 1 条最高优先级行动项。多个候选须在 `## 察潜流` 或 `## 辨风势` 中完成筛选，只有胜出者方可进入此处。

1. **P0 — （唯一行动项）**

*本报告由 Hermes Agent 于 {{date:YYYY-MM-DD HH:mm}} 自动生成。*