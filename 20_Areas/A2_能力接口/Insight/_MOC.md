---
title: "Insight · MOC"
date: "2026-07-25"
status: active
fit_content_type: moc
tags: [MOC, 洞察]
---

# Insight · MOC

> Insight 是系统层面的周期复盘，聚焦知识库健康度、习惯稳定性、认知模式、战略对齐。
> 与 BuJo 复盘（执行层）互补，不重复。

## 目录结构

```
Insight/
├── Daily/          → YYYY-MM-DD · Insight.md
├── Weekly/         → YYYY-WXX · Insight.md
├── Monthly/        → YYYY-MM · Insight.md
├── Quarterly/      → YYYY-QX · Insight.md
└── Yearly/         → YYYY · Insight.md
```

## 数据继承链

```
Daily（7篇）→ Weekly（4篇）→ Monthly（3篇）→ Quarterly（4篇）→ Annual
```

## 导航

- [[A2_能力接口/Bullet Journal/_MOC]]（执行层）
- [[Habit Tracker]]（习惯投票）
- [[90_System/91_Templates/Insight]]（模板）

## 最近洞察

```dataview
TABLE file.day AS "日期", period_type AS "周期"
FROM "20_Areas/A2_能力接口/Insight"
WHERE status = "active"
SORT file.day DESC
LIMIT 10
```