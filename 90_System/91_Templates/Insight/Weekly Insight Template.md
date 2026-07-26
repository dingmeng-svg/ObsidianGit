---
title: "Insight · Weekly"
date: "{{date:YYYY-MM-DD}}"
period_type: weekly
period_range: "{{monday:YYYY-MM-DD}} ~ {{sunday:YYYY-MM-DD}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Daily]]"
  - "[[Habit Tracker]]"
  - "[[A2_能力接口/Bullet Journal/_MOC]]"
---

<!-- 触发规则：每周日 21:00 自动生成 -->
<!-- 性能约束：所有查询限定明确文件夹范围 -->

# Insight · Weekly

> **分层定位**：BuJo 管执行细节，Insight 管系统健康度。
> **数据继承**：周度洞察聚合本周全部 Daily Insight，定性结论向上沉淀。

## 🌐 观全局

**本周关键词**：

```dataviewjs
/* ========== renderGreenBar v1.0 ========== */
/* 修改此函数时，必须同步更新全部 Insight 模板 */
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
/* ================================================================ */

const weekStart = dv.date("{{monday:YYYY-MM-DD}}");
const weekEnd = dv.date("{{sunday:YYYY-MM-DD}}");

const dailies = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
    .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

if (dailies.length === 0) {
    dv.paragraph("⚠️ 本周无 Daily 记录。");
} else {
    const completed = dailies.filter(p => p.daily_promise && p.daily_promise.length > 0).length;
    const items = [
        { label: "Daily Insight 完成", pct: Math.round(completed / 7 * 100), displayText: `${completed}/7 天` }
    ];
    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday >= weekStart && p.file.cday <= weekEnd);
    items.push({ label: "原子笔记新增", pct: Math.min(notes.length * 10, 100), displayText: `${notes.length} 篇` });
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
}
```

### 本周习惯投票

```dataviewjs
const weekStart = dv.date("{{monday:YYYY-MM-DD}}");
const weekEnd = dv.date("{{sunday:YYYY-MM-DD}}");

const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
    .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

if (pages.length === 0) {
    dv.paragraph("⚠️ 本周无 Daily 记录。");
} else {
    const habits = [
        { key: "曦 · 启明 · 以守筑基", emoji: "🌅" },
        { key: "午 · 承势 · 以执笃行", emoji: "🌤️" },
        { key: "夕 · 观成 · 以校归正", emoji: "🌙" }
    ];
    const totals = {};
    for (let h of habits) totals[h.key] = 0;
    for (let p of pages) {
        for (let h of habits) {
            const found = p.file.tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
            if (found && found.completed) totals[h.key]++;
        }
    }
    dv.paragraph(habits.map(h => `${h.emoji} ${totals[h.key]}/7`).join(" · "));
}
```

## 🌊 察潜流

1. （本周模式一）
2. （本周模式二）

## 🪸 拂遗珠

- **Inbox 超期预警**：
- **Daily 提及未跟进**：

## 🔦 照暗面

1. **问题**：
   - **根因**：
   - **影响**：

**判定**：🟢 顺畅 / 🟡 有阻力 / 🔴 需干预

## 🍃 辨风势

```dataviewjs
const weekStart = dv.date("{{monday:YYYY-MM-DD}}");
const weekEnd = dv.date("{{sunday:YYYY-MM-DD}}");

const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
    .where(p => p.file.cday && p.file.cday >= weekStart && p.file.cday <= weekEnd);

if (notes.length === 0) {
    dv.paragraph("⚠️ 本周无新增原子笔记。");
} else {
    const types = { practice: 0, concept: 0, model: 0, critique: 0 };
    notes.forEach(p => { if (p.type && types[p.type] !== undefined) types[p.type]++; });
    const total = notes.length || 1;
    const items = [
        { label: "practice 实践", pct: Math.round(types.practice / total * 100) },
        { label: "concept 概念", pct: Math.round(types.concept / total * 100) },
        { label: "model 模型", pct: Math.round(types.model / total * 100) },
        { label: "critique 批判", pct: Math.round(types.critique / total * 100) }
    ];
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, `${d.pct}%`)).join(""));
}
```

## 🌡️ 测热力

```dataviewjs
try {
    const weekStart = dv.date("{{monday:YYYY-MM-DD}}");
    const weekEnd = dv.date("{{sunday:YYYY-MM-DD}}");
    const pages = dv.pages('"20_Areas" or "30_Resources" or "10_Projects" or "00_Inbox"')
        .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);
    const countMap = {};
    pages.forEach(p => {
        const key = p.file.day.toFormat("yyyy-MM-dd");
        countMap[key] = (countMap[key] || 0) + 1;
    });
    const entries = Object.entries(countMap).map(([date, count]) => ({ date, intensity: count }));
    renderHeatmapCalendar(this.container, { colors: "default", entries });
} catch(e) {
    dv.paragraph("⚠️ Heatmap Calendar 插件未启用");
}
```

## 🎯 践一诺

### 候选池

```dataviewjs
const weekStart = dv.date("{{monday:YYYY-MM-DD}}");
const weekEnd = dv.date("{{sunday:YYYY-MM-DD}}");

const dailies = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
    .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

if (dailies.length === 0) {
    dv.paragraph("⚠️ 本周无 Daily 记录。");
} else {
    const promises = [];
    for (let p of dailies) {
        const promise = p.daily_promise;
        if (promise) promises.push({ date: p.file.day.toFormat("MM-dd"), promise });
    }
    if (promises.length === 0) {
        dv.paragraph("本周 Daily 中未提取到承诺（请在 Daily 模板 YAML 中填写 daily_promise 字段）。");
    } else {
        dv.table(["日期", "承诺"], promises.map(d => [d.date, d.promise]));
    }
}
```

> [!note] 本周唯一承诺

**P0 — （下周唯一核心行动项）**

**导航**：⬅️ [[A2_能力接口/Insight/Weekly]] | 🏠 [[Habit Tracker]] | ➡️ [[A2_能力接口/Insight/Monthly]]