---
title: "Insight · Weekly"
date: "2026-07-26"
period_type: weekly
period_range: "2026-07-20 ~ 2026-07-26"
status: active
insight_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Daily]]"
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
触发规则：每周日 21:00 自动生成
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

# Insight · Weekly

## 🌐 观全局

**本周关键词**：系统文档重构 · Insight 定稿 · 三批次闭环

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

const genDate = dv.date("2026-07-26");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

    const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
        .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

    if (pages.length === 0) {
        dv.paragraph("⚠️ 本周无 Daily 记录。");
    } else {
        let totalHabits = 0;
        let completedHabits = 0;
        for (let p of pages) {
            if (p.file.tasks) {
                const habitTasks = p.file.tasks.filter(t => t.text.includes("[habit::"));
                totalHabits += habitTasks.length;
                completedHabits += habitTasks.filter(t => t.completed).length;
            }
        }
        const habitRate = totalHabits > 0 ? Math.round(completedHabits / totalHabits * 100) : 0;

        const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
            .where(p => p.file.cday && p.file.cday >= weekStart && p.file.cday <= weekEnd);

        const items = [
            { label: "习惯投票率", pct: habitRate, displayText: `${habitRate}% (${completedHabits}/${totalHabits})` },
            { label: "原子笔记新增", pct: Math.min(notes.length * 10, 100), displayText: `${notes.length} 篇` },
            { label: "_raw 待编译", pct: 0, displayText: "0 篇" }
        ];
        dv.span(items.map(d => renderGreenBar(d.label, d.pct, d.displayText)).join(""));
    }
}
```

**本周概述**：本周是「架构维护周」——前半周生命之花炼金 + Archive 清理，后半周 Insight 体系定稿 + 系统文档三批次重构。整体节奏为「知识生产 20% + 系统建设 80%」，34 项系统文档任务闭环。

---

## 🌊 察潜流

> 本周重复出现的主题、模式或认知波动。

1. **系统文档负债的集中清理**：7/22-7/26 连续 5 天聚焦系统文档体系。从冲突审查到三批次执行，11 份系统文档完成版本升级。这种集中处理比零散修改效率高得多——连读审查时发现的交叉冲突，分批执行时能一次性解决。

2. **知识生产 vs 系统建设的节奏切换**：本周前段（7/20-7/22）有知识生产（生命之花炼金、金融英语语料库），后段完全转入系统建设。这种切换是健康的，但需要注意不要让系统建设吞噬知识生产连续超过 3 天。

---

## 🪸 拂遗珠

> 被忽略但值得回捡的存量。

- **Inbox 超期预警**：6 篇外部导入待处理（金融语料库 250KB 超 5 天、分镜台本 32KB 超 6 天）
- **DeepSeek 笔记未归档**：A1 MOC 新增了「商业·战略认知」板块挂入了 6 篇 DeepSeek 笔记，但这些笔记本身的提炼和链接网络尚未完成

---

## 🔦 照暗面

> 系统阻力点分析。

1. **问题**：patch 工具在 markdown table 场景下不稳定
   - **根因**：引号转义（`\\"` 序列化问题）和 `||` 前缀误加会导致 patch 失败
   - **影响**：在执行 `06_Inbox` 的表格内容修改时，浪费了额外轮次修复格式
   - **应对**：对表格密集的文档，优先用 sed 行号定位或 write_file 整体覆盖

2. **问题**：Insight 入口文件被覆写时失去了标准热力图代码
   - **根因**：批次执行时 write_file 覆盖了入口文件，使用了热力图的非标准写法
   - **影响**：冷读验证时才发现热力图不工作
   - **应对**：下次大改后必须执行冷读验证

**判定**：🟡 有阻力（已修复，系统已稳定）

---

## 🍃 辨风势

> 本周新增笔记类型分布。

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

const genDate = dv.date("2026-07-26");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

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
}
```

**趋势判断**：本周新增原子笔记集中在生命之花炼金（3 篇 concept），无大量新增。知识库的注意力从「新建」转向「系统维护」，这是健康的知识库生命周期中的必要阶段。预计下周新建节奏会恢复。

---

## 🌡️ 测热力

> 本周活跃度热力图。

```dataviewjs
try {
    const genDate = dv.date("2026-07-26");
    if (!genDate || !genDate.isValid) {
        dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
    } else {
        const weekStart = genDate.startOf('week');
        const weekEnd = genDate.endOf('week');
        const pages = dv.pages('"20_Areas" or "30_Resources" or "10_Projects" or "00_Inbox"')
            .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);
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

**本周活跃度概览**：7/25-7/26 是活跃高峰（Insight 定稿 + 系统文档重构），7/20-7/24 保持中高活跃度（生命之花炼金 + Archive 清理 + 日常 BuJo）。整周无低活跃日。

---

## 🎯 践一诺

> [!note] 本周唯一承诺
> 候选承诺从本周 Daily 的 `daily_promise` 字段聚合。

```dataviewjs
const genDate = dv.date("2026-07-26");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

    const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
        .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

    if (pages.length === 0) {
        dv.paragraph("⚠️ 本周无 Daily 记录。");
    } else {
        const promises = [];
        for (let p of pages) {
            if (p.daily_promise) {
                promises.push({ date: p.file.day.toFormat("MM-dd"), promise: p.daily_promise });
            }
        }
        if (promises.length === 0) {
            dv.paragraph("📌 本周 Daily 中未提取到承诺（请在 Daily 模板 YAML 中填写 daily_promise 字段）。");
        } else {
            dv.table(["日期", "承诺"], promises.map(d => [d.date, d.promise]));
        }
    }
}
```

**P0 — 恢复知识生产节奏：编译 1 篇外部导入素材**

本周系统架构工作已完成，下周首要任务是从外部导入素材中选择 1 篇完成编译入库，打破连续多日的知识生产低输出状态。优先选择 `market language chunk.md`（11KB，与 Language Chunk MOC 直接衔接）。

⬅️ 上期：[[A2_能力接口/Insight/Daily]] | 🏠 入口：[[Habit Tracker]] | ➡️ 下期：[[A2_能力接口/Insight/Monthly]]