---
title: "Insight · Quarterly"
date: "{{date:YYYY-MM-DD}}"
period_type: quarterly
period_range: "{{date:YYYY}}Q{{date:Q}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Monthly]]"
  - "[[Habit Tracker]]"
  - "[[A2_能力接口/Bullet Journal/_MOC]]"
---

<!-- 触发规则：每季度最后一天 21:00 自动生成 -->
<!-- 性能约束：本层级禁止大范围全库扫描，优先依赖下层沉淀结论 -->

# Insight · Quarterly

> **核心目标**：OKR 红绿灯 + 身份对齐。
> **数据继承**：本季度数据来自 3 篇月度洞察的沉淀结论。

## 🌐 观全局

**季度关键词**：

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

const q = "{{date:YYYY}}Q{{date:Q}}";
const [year, qNum] = q.split("Q").map(Number);
const qStart = dv.luxon.DateTime.fromObject({ year, month: (qNum - 1) * 3 + 1, day: 1 });
const qEnd = qStart.plus({ months: 3 }).minus({ days: 1 });

const monthlies = dv.pages('"20_Areas/A2_能力接口/Insight/Monthly"')
    .where(p => p.file.day && p.file.day >= qStart && p.file.day <= qEnd);

if (monthlies.length === 0) {
    dv.paragraph("⚠️ 本季度无月度洞察记录。");
} else {
    const items = [
        { label: "Monthly Insight 完成", pct: Math.round(monthlies.length / 3 * 100), displayText: `${monthlies.length}/3 月` }
    ];
    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday >= qStart && p.file.cday <= qEnd);
    items.push({ label: "原子笔记季度新增", pct: Math.min(notes.length * 2, 100), displayText: `${notes.length} 篇` });
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
}
```

### 本季度习惯投票趋势

```dataviewjs
const [year, qNum] = "{{date:YYYY}}Q{{date:Q}}".split("Q").map(Number);
const qStart = dv.luxon.DateTime.fromObject({ year, month: (qNum - 1) * 3 + 1, day: 1 });
const qEnd = qStart.plus({ months: 3 }).minus({ days: 1 });

const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
    .where(p => p.file.day && p.file.day >= qStart && p.file.day <= qEnd);

if (pages.length === 0) {
    dv.paragraph("⚠️ 本季度无 Daily 记录。");
} else {
    const habits = [
        { key: "曦 · 启明 · 以守筑基", emoji: "🌅" },
        { key: "午 · 承势 · 以执笃行", emoji: "🌤️" },
        { key: "夕 · 观成 · 以校归正", emoji: "🌙" }
    ];
    const totals = {};
    for (let h of habits) totals[h.key] = 0;
    const totalDays = pages.length;
    for (let p of pages) {
        for (let h of habits) {
            const found = p.file.tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
            if (found && found.completed) totals[h.key]++;
        }
    }
    dv.paragraph(habits.map(h => `${h.emoji} ${Math.round(totals[h.key]/totalDays*100)}%`).join(" · "));
}
```

## 🚦 OKR 红绿灯

| 目标 | 关键结果 | 进度 | 状态 |
|:---|:---|:---:|:---:|
| O1 | KR1 | —% | 🟢/🟡/🔴 |
| O2 | KR1 | —% | 🟢/🟡/🔴 |

## 🍃 身份对齐评估

- **身份锚点 1**：匹配度 —%
- **身份锚点 2**：匹配度 —%

## 🔦 照暗面

1. **问题**：
   - **根源分析**：
   - **长期风险**：

## 🪸 体系变更记录

| 日期 | 变更内容 | 影响范围 | 触发原因 |
|:---|:---|:---|:---|
| | | | |

## 🪸 拂遗珠

- （季度积压的长期待办）

## 🎯 践一诺

> [!note] 下季度核心承诺

**P0 — （下季度唯一核心行动项）**

**导航**：⬅️ [[A2_能力接口/Insight/Monthly]] | 🏠 [[Habit Tracker]] | ➡️ [[A2_能力接口/Insight/Yearly]]