---
title: "Insight · Quarterly"
date: "{{date:YYYY-MM-DD}}"
period_type: quarterly
period_range: "{{date:YYYY}}-Q{{date:Q}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Monthly]]"
  - "[[Habit Tracker]]"
  - "[[A2_能力接口/Bullet Journal/_MOC]]"
---

<!--
═══════════════════════════════════════════════════════════════
renderGreenBar v1.0 基准版本
任何样式、色阶、尺寸修改，必须同步更新全部 5 份 Insight 模板
═══════════════════════════════════════════════════════════════
-->

<!--
触发规则：每季度最后一天 21:00 自动生成
性能约束：本层级优先依赖下层沉淀结论，禁止大范围全库扫描
-->

<!--
═══════════════════════════════════════════════════════════════
分层定位
- BuJo 周期复盘（执行层）：聚焦事务、任务、待办、项目进度，回答「做了什么」
- Insight 周期洞察（系统层）：聚焦知识库健康、成长飞轮、身份校准、长期趋势，回答「系统运转得怎么样」
二者互补，互不重复。
数据继承规则：底层周期保存原始明细；高层周期只沉淀结论，不重复搬运原始数据。
═══════════════════════════════════════════════════════════════
-->

# Insight · Quarterly

## 🌐 观全局

**季度关键词**：

```dataviewjs
/* ========== renderGreenBar v1.0 | 统一基准版本 ========== */
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

const genDate = dv.date("{{date:YYYY-MM-DD}}");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const quarter = genDate.quarter;
    const year = genDate.year;
    const qStart = dv.luxon.DateTime.fromObject({ year, month: (quarter - 1) * 3 + 1, day: 1 });
    const qEnd = qStart.plus({ months: 3 }).minus({ days: 1 });

    const monthlies = dv.pages('"20_Areas/A2_能力接口/Insight/Monthly"')
        .where(p => p.file.day && p.file.day >= qStart && p.file.day <= qEnd);

    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday >= qStart && p.file.cday <= qEnd);

    const items = [
        { label: "Monthly Insight 完成", pct: Math.round(monthlies.length / 3 * 100), displayText: `${monthlies.length}/3 月` },
        { label: "原子笔记季度新增", pct: Math.min(notes.length * 2, 100), displayText: `${notes.length} 篇` }
    ];
    dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
}
```


## 🌊 察潜流

> 本季度模式识别与趋势判断。

1.
2.
3.
4.


## 🪸 拂遗珠

- 本季度 3 篇 Monthly Insight 中仍未处理的积压项
- _raw 中超过 90 天未编译的条目（强制决策：编译 / 归档 / 删除）
- 本季度创建但从未被引用的孤立笔记清单

### ⏳ 体系变更记录

| 日期 | 变更内容 | 影响范围 | 触发原因 |
|:---|:---|:---|:---|
| | | | |


## 🔦 照暗面

> 结构性问题复盘。

1. **问题**：
   - **根源分析**：
   - **长期风险**：


## 🍃 辨风势

> 知识生产方向、战略校准 + OKR 红绿灯

### 知识方向判断

```dataviewjs
/* ========== renderGreenBar v1.0 | 统一基准版本 ========== */
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

const genDate = dv.date("{{date:YYYY-MM-DD}}");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const quarter = genDate.quarter;
    const year = genDate.year;
    const qStart = dv.luxon.DateTime.fromObject({ year, month: (quarter - 1) * 3 + 1, day: 1 });
    const qEnd = qStart.plus({ months: 3 }).minus({ days: 1 });

    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday >= qStart && p.file.cday <= qEnd);

    if (notes.length === 0) {
        dv.paragraph("⚠️ 本季度无新增原子笔记。");
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
        dv.paragraph(`本季度共新增 ${total} 篇原子笔记。`);
    }
}
```

### 🚦 OKR 红绿灯

| 目标 | 关键结果 | 进度 | 状态 |
|:---|:---|:---:|:---:|
| O1 | KR1 | —% | 🟢/🟡/🔴 |
| O2 | KR1 | —% | 🟢/🟡/🔴 |

> 判定标准：🟢 按时推进 · 🟡 有风险需干预 · 🔴 严重滞后

### 👤 身份对齐评估

- **身份锚点 1**：匹配度 —%
- **身份锚点 2**：匹配度 —%


## 🌡️ 测热力

> 本季度活跃度热力图。

```dataviewjs
try {
    const genDate = dv.date("{{date:YYYY-MM-DD}}");
    if (!genDate || !genDate.isValid) {
        dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
    } else {
        const quarter = genDate.quarter;
        const year = genDate.year;
        const qStart = dv.luxon.DateTime.fromObject({ year, month: (quarter - 1) * 3 + 1, day: 1 });
        const qEnd = qStart.plus({ months: 3 }).minus({ days: 1 });
        const pages = dv.pages('"20_Areas" or "30_Resources" or "10_Projects" or "00_Inbox"')
            .where(p => p.file.day && p.file.day >= qStart && p.file.day <= qEnd);
        const countMap = {};
        pages.forEach(p => {
            const key = p.file.day.toFormat("yyyy-MM-dd");
            countMap[key] = (countMap[key] || 0) + 1;
        });
        const entries = Object.entries(countMap).map(([date, count]) => ({ date, intensity: count }));
        renderHeatmapCalendar(this.container, { colors: "default", entries });
    }
} catch(e) {
    dv.paragraph("⚠️ Heatmap Calendar 插件未启用");
}
```


## 🎯 践一诺

> [!note] 下季度核心承诺

**P0 — （下季度唯一核心行动项）**

⬅️ 上期：[[A2_能力接口/Insight/Monthly]] | 🏠 入口：[[Habit Tracker]] | ➡️ 下期：[[A2_能力接口/Insight/Annual]]