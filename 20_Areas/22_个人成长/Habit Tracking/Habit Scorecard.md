---
title: 习惯记分卡
date: 2026-07-11
status: active
type: practice
tags: [个人成长, 习惯]
---

# 习惯记分卡

> **数据源**：每日 BuJo 日记中的习惯打卡行。本页面为 Dataview 自动聚合看板，不手动维护。

## 本月概览

```dataview
TABLE WITHOUT ID
  file.link AS "日期",
  any(map(filter(file.tasks, (t) => contains(t.text, "habit:: 读书") AND t.completed), (t) => "✅")) AS "读书",
  any(map(filter(file.tasks, (t) => contains(t.text, "habit:: 运动") AND t.completed), (t) => "✅")) AS "运动",
  any(map(filter(file.tasks, (t) => contains(t.text, "habit:: 冥想") AND t.completed), (t) => "✅")) AS "冥想"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily"
WHERE file.day >= date(2026-07-01) AND file.day <= date(2026-07-31)
SORT file.day ASC
```

> 如需查看全周期历史数据，请发送「查看全部历史习惯记录」。
> （该指令仅临时输出统计结果，不生成永久文件。）
