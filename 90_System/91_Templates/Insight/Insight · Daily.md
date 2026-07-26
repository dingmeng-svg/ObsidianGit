---
title: "Insight · Daily"
date: "{{date:YYYY-MM-DD}}"
period_type: daily
period_range: "{{date:YYYY-MM-DD}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
daily_promise: ""
related:
  - "[[Habit Tracker]]"
  - "[[A2_能力接口/Insight/Weekly]]"
---

<!--
═══════════════════════════════════════════════════════════════
renderGreenBar v1.0 基准版本
任何样式、色阶、尺寸修改，必须同步更新全部 5 份 Insight 模板
═══════════════════════════════════════════════════════════════
-->

<!--
触发规则：每日生成
性能约束：查询限定明确文件夹范围，禁止无边界 dv.pages() 全库扫描
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

# Insight · Daily

## 🌐 观全局

**今日关键词**：

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

const today = dv.date("{{date:YYYY-MM-DD}}");
if (!today || !today.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
        .where(p => p.file.day && p.file.day.toFormat("yyyy-MM-dd") === today.toFormat("yyyy-MM-dd"));

    if (pages.length === 0) {
        dv.paragraph("⚠️ 今日无 Daily 记录。");
    } else {
        const items = [
            { label: "今日习惯投票", pct: 0, displayText: "0/3" },
            { label: "原子笔记新增", pct: 0, displayText: "0 篇" },
            { label: "_raw 待编译", pct: 0, displayText: "0 篇" }
        ];
        dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
    }
}
```


## 🌊 察潜流

> 今日认知模式与注意力流向。

1.
2.


## 🪸 拂遗珠

> 今日被忽略但值得关注的存量。

- **今日未处理素材**：


## 🔦 照暗面

> 系统阻力点分析。

1. **问题**：
   - **根因**：
   - **影响**：

**判定**：🟢 顺畅 / 🟡 有阻力 / 🔴 需干预


## 🍃 辨风势

> 今日新增笔记类型分布。

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

const today = dv.date("{{date:YYYY-MM-DD}}");
if (!today || !today.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday.toFormat("yyyy-MM-dd") === today.toFormat("yyyy-MM-dd"));
    if (notes.length === 0) {
        dv.paragraph("⚠️ 今日无新增原子笔记。");
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
}
```


## 🌡️ 测热力

> 今日活跃度热力图。

```dataviewjs
try {
    const today = dv.date("{{date:YYYY-MM-DD}}");
    if (!today || !today.isValid) {
        dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
    } else {
        const pages = dv.pages('"20_Areas" or "30_Resources" or "10_Projects" or "00_Inbox"')
            .where(p => p.file.day && p.file.day.toFormat("yyyy-MM-dd") === today.toFormat("yyyy-MM-dd"));
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

> [!note] 今日唯一承诺

**P0 — （今日唯一核心行动项）**

⬅️ 上期：（首篇无上期） | 🏠 入口：[[Habit Tracker]] | ➡️ 下期：[[A2_能力接口/Insight/Weekly]]