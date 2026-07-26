---
title: "Insight · Annual"
date: "{{date:YYYY-MM-DD}}"
period_type: annual
period_range: "{{date:YYYY-01-01}} ~ {{date:YYYY-12-31}}"
status: active
fit_content_type: insight_report
tags: [洞察, 系统文档]
related:
  - "[[A2_能力接口/Insight/Quarterly]]"
  - "[[{{date:YYYY}} Annual Compass]]"
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
触发规则：每年 12 月 31 日 21:00 自动生成
性能约束：本层级禁止大范围全库扫描，依赖下层季度沉淀结论
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

# Insight · Annual

## 🌐 观全局

**年度关键词**：

**📸 年度身份投票宣言**

> "Every action is a vote for the type of person you wish to become."

**这一年，我是一个____________的人。**

（年度身份叙事：用 100-200 字描述这一年的身份演化）

**年度高光时刻**（Top 3）：

1.
2.
3.


## 🌊 察潜流

> 全年趋势 + 习惯演化

1. （年度知识生产节奏：哪个月是高峰？哪个月是低谷？）
2. （Areas 各透镜的年度生长曲线）
3. （身份投票的年度叙事）

### 习惯体系演化

| 习惯 | 年度完成率 | 阶段 | 备注 |
|:---|:---:|:---|:---|
| 曦·启明 | —% | 追踪中 / 稳定期 / 已内化 | |
| 午·承势 | —% | 追踪中 / 稳定期 / 已内化 | |
| 夕·观成 | —% | 追踪中 / 稳定期 / 已内化 | |


## 🪸 拂遗珠

> 全年被忽略但值得关注的存量。

- 年度未完成的高价值目标
- 被搁置的重要构想
- 全年未被触达的 Areas 透镜

### 年度审计

```dataviewjs
const year = "{{date:YYYY}}";
if (!year || year === "YYYY") {
    dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
} else {
    const yStart = dv.luxon.DateTime.fromObject({ year: parseInt(year), month: 1, day: 1 });
    const yEnd = dv.luxon.DateTime.fromObject({ year: parseInt(year), month: 12, day: 31 });
    const cutoff180 = yEnd.minus({ days: 180 });

    const allNotes = dv.pages('"30_Resources/31_Atomic_Notes"');
    const orphaned = allNotes.where(p => p.file.inlinks.length === 0);
    const orphanedCount = orphaned.length;

    const rawFiles = dv.pages('"00_Inbox/_raw"')
        .where(p => p.file.ctime && p.file.ctime < cutoff180 && p.ingest_status !== "ingested");
    const rawCount = rawFiles.length;

    const areas = ["A1_认知算法", "A2_能力接口", "A3_精力底盘", "A4_内核定力"];
    const areaFiles = dv.pages('"20_Areas"')
        .where(p => p.file.day && p.file.day >= yStart && p.file.day <= yEnd);
    const touchedAreas = new Set();
    for (let p of areaFiles) {
        for (let a of areas) {
            if (p.file.path.startsWith("20_Areas/" + a + "/")) touchedAreas.add(a);
        }
    }
    const untouched = areas.filter(a => !touchedAreas.has(a));

    dv.header(3, "年度盘点");
    dv.paragraph(`- 🧩 **孤立笔记（无入链）**：${orphanedCount} 篇`);
    if (orphanedCount > 0) {
        dv.list(orphaned.slice(0, 5).file.link);
        if (orphanedCount > 5) dv.paragraph(`*…另有 ${orphanedCount - 5} 篇未列出*`);
    }
    dv.paragraph(`- 📂 **_raw 滞留 >180 天未编译**：${rawCount} 篇`);
    if (rawCount > 0) {
        dv.list(rawFiles.slice(0, 5).file.link);
        if (rawCount > 5) dv.paragraph(`*…另有 ${rawCount - 5} 篇未列出*`);
    }
    dv.paragraph(`- 🔭 **全年未触达 Areas**：${untouched.length > 0 ? untouched.join("、") : "✅ 全部 Areas 均有活跃记录"}`);
}
```

### ⏳ 体系变更记录

| 版本 | 日期 | 变更内容 | 核心价值 |
|:---:|:---|:---|:---|
| | | | |


## 🔦 照暗面

1. **问题**：
   - **深层原因**：
   - **下一年应对**：


## 🍃 辨风势

> 年度知识版图审视。

（从季度洞察聚合得出的知识生产方向判断：4 个季度的 type 分布趋势、领域重心的年度偏移、下一年知识战略重心预测）


## 🌡️ 测热力

> 全年活跃度分布。

```dataviewjs
try {
    const year = "{{date:YYYY}}";
    if (!year || year === "YYYY") {
        dv.paragraph("📌 模板预览模式 — 生成文件后 Dataview 将自动渲染。");
    } else {
        const yStart = dv.luxon.DateTime.fromObject({ year: parseInt(year), month: 1, day: 1 });
        const yEnd = dv.luxon.DateTime.fromObject({ year: parseInt(year), month: 12, day: 31 });
        const pages = dv.pages('"20_Areas" or "30_Resources" or "10_Projects" or "00_Inbox"')
            .where(p => p.file.day && p.file.day >= yStart && p.file.day <= yEnd);
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

> [!note] 年度身份承诺
> 这不是"待办事项"。这是身份宣言。

**年度核心关键词 — （下一年唯一的身份锚点与成长方向）**

**下一年度战略方向**：

1. （身份级 — 对应 A4_内核定力）
2. （战略级 — 对应 A1 或 A2）
3. （战略级 — 对应 A3 或 D1）

⬅️ 上期：[[A2_能力接口/Insight/Quarterly]] | 🏠 入口：[[Habit Tracker]] | ➡️ 下期：待生成