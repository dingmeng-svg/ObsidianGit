---
title: "Insight · Weekly"
date: "2026-08-17"
period_type: weekly
period_range: "2026-08-17 ~ 2026-08-23"
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

**本周关键词**：新周期启动 · 安全审计余波 · 知识生产待重启

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

const genDate = dv.date("2026-08-17");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

    const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
        .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

    if (pages.length === 0) {
        dv.paragraph("⚠️ 本周无 Daily 记录（周一 09:38 生成，周度数据尚未积累）。");
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

**本周概述**：W34 周一清晨生成，周度数据尚未积累。上周五（08-14）为 AI Agent 全机安全审计日——MCP 硬编码 Key 修复、8 个 Cron 全部 pin 到 sfkey-glm、Typeless 开机自启清理。周末（08-15~08-16）无用户活动记录。本周为新周期启动：知识生产待重启，Inbox 积压 6 篇待处理，原子笔记库 564 篇（concept 141 / practice 123 / model 12 / critique 3）。

---

## 🌊 察潜流

> 本周重复出现的主题、模式或认知波动。

1. **安全审计后的系统稳定期**：08-14 完成全机 AI Agent 审计后，Cron 基础设施已稳定（7 个 LLM 任务 + Git 备份全部 pin 到 sfkey-glm/glm-5.2）。这是自 7 月以来首次确保所有定时任务有可靠 provider。周末无中断，说明修复生效。

2. **知识生产暂停模式**：自 08-14 安全审计日以来，无新增原子笔记。08-12~08-14 的 Daily Log 也无习惯打卡记录（[habit:: 任务数为 0]）。这说明用户进入了「系统维护 > 知识生产」的偏重模式，与 W30 观察到的模式一致。

---

## 🪸 拂遗珠

> 被忽略但值得回捡的存量。

- **Inbox 超期预警**：00_Inbox 下 6 篇文件待处理，其中 4 篇超 14 天（`_raw.md` 自 07-19、`00_Inbox.md` 自 07-15、`Collector.md` 自 07-27、`外部导入.md` 自 07-15）。近期新增 2 篇：**📘 操盘手英语 · A to Z 核心金融词表**（08-14，20KB，金融英语教学素材）和 **爱和信任，都是一种珍贵的心理资源**（08-14，0.8KB，心理学短文）
- **ai_generated 待审核**：7 篇未审核笔记（关系领域 4 篇、生活领域 3 篇），均位于 `30_Resources/31_Atomic_Notes/` 下。无人审核意味着这些笔记可能含有 AI 幻觉或格式偏差
- **raw 待编译**：0 篇（_raw 目录为空，所有素材已标记）

---

## 🔦 照暗面

> 系统阻力点分析。

1. **问题**：W33 周末（08-15~08-16）全无活动，知识生产连续 3 天停滞
   - **根因**：安全审计日（08-14）消耗了大量认知带宽，周末自然进入恢复期
   - **影响**：知识生产日历上出现 3 天空白，Inbox 超期率上升

2. **问题**：操盘手骑士项目积累了大量资料（16 个文件含工具箱体系），但 08 月无任何项目执行记录
   - **根因**：项目处于「基建完善」阶段而非「执行推进」阶段
   - **影响**：工具箱内容（七色体系、九字真言、五方佛等）缺乏实战验证

**判定**：🟡 有阻力（系统已稳定，但知识生产节奏待恢复）

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

const genDate = dv.date("2026-08-17");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

    const notes = dv.pages('"30_Resources/31_Atomic_Notes"')
        .where(p => p.file.cday && p.file.cday >= weekStart && p.file.cday <= weekEnd);

    if (notes.length === 0) {
        dv.paragraph("⚠️ 本周无新增原子笔记（W34 周一生成，数据尚未积累）。");
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

**趋势判断**：W34 周一，暂无新增数据。全库 564 篇原子笔记中 concept（141）略多于 practice（123），比例约 1.15:1，属于健康的知识输入-输出平衡。但 critique 仅 3 篇（0.5%），说明批判性思考仍是知识库的短板。

---

## 🌡️ 测热力

> 本周活跃度热力图。

```dataviewjs
try {
    const genDate = dv.date("2026-08-17");
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

**本周活跃度概览**：W34 周一 09:38 生成，全库无当日修改记录。本周活跃数据将在未来几天逐步积累。上周五（08-14）是最后活跃峰值日（AI Agent 安全审计 + 21 篇原子笔记 mtime 更新）。

---

## 🎯 践一诺

> [!note] 本周唯一承诺
> 候选承诺从本周 Daily 的 `daily_promise` 字段聚合。

```dataviewjs
const genDate = dv.date("2026-08-17");
if (!genDate || !genDate.isValid) {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const weekStart = genDate.startOf('week');
    const weekEnd = genDate.endOf('week');

    const pages = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"')
        .where(p => p.file.day && p.file.day >= weekStart && p.file.day <= weekEnd);

    if (pages.length === 0) {
        dv.paragraph("⚠️ 本周无 Daily 记录（W34 周一生成，数据尚未积累）。");
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

**P0 — 恢复知识生产节奏：编译 1 篇 Inbox 素材**

全库 6 篇 Inbox 文件待处理，其中 4 篇超 14 天。优先选择 **📘 操盘手英语 · A to Z 核心金融词表**（08-14 入库，20KB，与操盘手骑士项目直接关联）完成编译入库。同时推进 7 篇 ai_generated 笔记（关系 4 篇 + 生活 3 篇）的审核流程。

⬅️ 上期：[[A2_能力接口/Insight/Weekly/Insight · Weekly — 2026-W30]] | 🏠 入口：[[Habit Tracker]] | ➡️ 下期：[[A2_能力接口/Insight/Monthly]]