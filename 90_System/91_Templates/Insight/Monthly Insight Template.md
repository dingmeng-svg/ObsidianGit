---
title: "Insight · Monthly"
date: "{{date:YYYY-MM-DD}}"
period_type: monthly
period_range: "{{date:YYYY-MM}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Weekly]]"
  - "[[Habit Tracker]]"
  - "[[A2_能力接口/Bullet Journal/_MOC]]"
---

<!-- 触发规则：每月最后一天 21:00 自动生成 -->
<!-- 性能约束：本层级禁止大范围全库扫描，优先依赖下层沉淀结论 -->

# Insight · Monthly

> **分层定位**：BuJo 管执行细节，Insight 管系统健康度。
> **数据继承**：月度洞察聚合 4 篇周度洞察，仅存结论性判定。

## 🌐 观全局

**本月关键词**：

```dataviewjs
/* ========== renderGreenBar v1.0 ========== */
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

const month = "{{date:YYYY-MM}}";
const weeklies = dv.pages('"20_Areas/A2_能力接口/Insight/Weekly"')
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") === month);

if (weeklies.length === 0) {
    dv.paragraph("⚠️ 本月无周度洞察记录。");
} else {
    const items = [
        { label: "Weekly Insight 完成", pct: Math.round(weeklies.length / 4 * 100), displayText: `${weeklies.length}/4 周` }
    ];
    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday.toFormat("yyyy-MM") === month);
    items.push({ label: "原子笔记新增", pct: Math.min(notes.length * 5, 100), displayText: `${notes.length} 篇` });
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
}
```

### 本月习惯投票总览

```dataviewjs
const month = "{{date:YYYY-MM}}";
const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") === month);

if (pages.length === 0) {
    dv.paragraph("⚠️ 本月无 Daily 记录。");
} else {
    const habits = [
        { key: "曦 · 启明 · 以守筑基", emoji: "🌅" },
        { key: "午 · 承势 · 以执笃行", emoji: "🌤️" },
        { key: "夕 · 观成 · 以校归正", emoji: "🌙" }
    ];
    const totals = {};
    for (let h of habits) totals[h.key] = 0;
    const daysInMonth = pages.length;
    for (let p of pages) {
        for (let h of habits) {
            const found = p.file.tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
            if (found && found.completed) totals[h.key]++;
        }
    }
    dv.paragraph(habits.map(h => `${h.emoji} ${totals[h.key]}/${daysInMonth} (${Math.round(totals[h.key]/daysInMonth*100)}%)`).join(" · "));
}
```

## 🌡️ 测热力

### 习惯稳定性审计

| 习惯 | 本月完成率 | 稳定性判定 |
|:---|:---:|:---|
| 曦·启明 | —% | □ 继续追踪 / □ 降级维护 |
| 午·承势 | —% | □ 继续追踪 / □ 降级维护 |
| 夕·观成 | —% | □ 继续追踪 / □ 降级维护 |

### Areas 健康度

```dataviewjs
const month = "{{date:YYYY-MM}}";
const areas = ["A1_认知算法", "A2_能力接口", "A3_精力底盘", "A4_内核定力"];
const counts = {};
for (let a of areas) counts[a] = 0;
const pages = dv.pages('"20_Areas"')
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") === month);
if (pages.length === 0) {
    dv.paragraph("⚠️ 本月 Areas 无修改记录。");
} else {
    for (let p of pages) {
        for (let a of areas) {
            if (p.file.path.includes(a)) counts[a]++;
        }
    }
    const total = Object.values(counts).reduce((s, v) => s + v, 0) || 1;
    const items = Object.entries(counts).map(([label, count]) => ({
        label: label.replace("_", "/"),
        pct: Math.round(count / total * 100),
        displayText: `${count} 次`
    }));
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
}
```

## 🪸 体系变更记录

| 日期 | 变更内容 | 影响范围 | 触发原因 |
|:---|:---|:---|:---|
| | | | |

## 🔦 照暗面

**系统性障碍**：

1. **问题**：
   - **根因**：
   - **影响**：

**判定**：🟢 健康 / 🟡 有风险 / 🔴 需干预

## 🎯 践一诺

> [!note] 下月唯一承诺

**P0 — （下月核心行动项）**

**导航**：⬅️ [[A2_能力接口/Insight/Weekly]] | 🏠 [[Habit Tracker]] | ➡️ [[A2_能力接口/Insight/Quarterly]]