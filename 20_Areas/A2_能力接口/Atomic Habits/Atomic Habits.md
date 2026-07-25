---
title: "Atomic Habits"
date: 2026-07-20
status: active
tags: [MOC, 习惯, 个人成长]
type: moc
---

# Atomic Habits · 习惯体系总 MOC

> 路径：`20_Areas/A2_能力接口/Atomic Habits/`
>
> 三层闭环体系：**设计层 → 执行层 → 觉察层**

---

## 体系结构

```dataview
TABLE file.mtime AS "最后更新"
FROM "20_Areas/A2_能力接口/Atomic Habits"
WHERE file.name != "Atomic Habits"
SORT file.name ASC
```

| 层级 | 文件 | 职责 |
|:---|:---|:---|
| 🎨 设计层 | [[Habit Design Reference]] | 孵化新习惯、叠加逻辑、坏习惯阻断 |
| 📊 执行层 | [[Habit Tracker/Habit Tracker]] | 3 个核心习惯的每日打卡追踪 |
| 🔍 觉察层 | [[Habit Scorecard]] | 全量行为审计与内化归档 |

---

## 流转链路

```
孵化清单 → 双周评审 → Tracker 追踪 → 稳定内化 → Scorecard 归档
（本表）   （周日周复盘）  （21天）    （90天）     （永久保留）
```