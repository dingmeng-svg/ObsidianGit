---
title: 习惯记分卡
date: 2026-07-12
status: active
type: practice
tags: [个人成长, 习惯]
---

# 习惯记分卡

> **数据源**：每日 BuJo 日记中的习惯打卡行。本页面为 Dataview 自动聚合看板，不手动维护。
>
> **查询说明**：匹配日记中"🌅 曦 · 启明 · 以守筑基" "🌤️ 午 · 承势 · 以执笃行 ""🌙 🌙 夕 · 观成 · 以校归正" 三类习惯打卡行。

## 本月概览

```dataviewjs
let diaryFolder = '"20_Areas/22_个人成长/Bullet Journal/Daily"';
let pages = dv.pages(diaryFolder)
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM").startsWith("2026-07") && p.file.name != "BuJo Daily MOC")
    .sort(p => p.file.day);

let habits = [
    { key: "曦 · 启明 · 以守筑基", emoji: "🌅", label: "曦·启明·以守筑基" },
    { key: "午 · 承势 · 以执笃行", emoji: "🌤️", label: "午·承势·以执笃行" },
    { key: "夕 · 观成 · 以校归正", emoji: "🌙", label: "夕·观成·以校归正" }
];

let rows = [];
for (let p of pages) {
    let tasks = p.file.tasks;
    let day = p.file.day.toFormat("dd");
    let row = { day: day };
    for (let h of habits) {
        let found = tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
        row[h.key] = found ? (found.completed ? "✅" : "☐") : "—";
    }
    rows.push(row);
}

let totals = {};
for (let h of habits) {
    totals[h.key] = rows.filter(r => r[h.key] === "✅").length;
}

dv.paragraph(`**本月打卡**：${rows.length} 天 | ${habits.map(h => `${h.emoji} ${h.label} ${totals[h.key]}/${rows.length}`).join(" · ")}`);

dv.table(
    ["日", ...habits.map(h => `${h.emoji} ${h.label}`)],
    rows.map(r => [r.day, ...habits.map(h => r[h.key])])
);
```

---

## 习惯定义

| 习惯             | 身份        | 具体动作                 |   时间   | 极简版               |
| :------------- | :-------- | :------------------- | :----: | :---------------- |
| **🌅 曦·启明·以守筑基** | 珍视生命容器的人 | 门框胸肌拉伸 + 下巴后缩 + 肩胛后缩 | 晨起5min | 下巴后缩10次+门框拉伸每侧15s |
| **🌤️ 午·承势·以执笃行** | 用行动定义认知的人 | 完成最重要那件事（先投一票） | 上午 | 做1件事 |
| **🌙 夕·观成·以校归正** | 清醒的观察者 | 复盘+终局过滤+丢弃烦恼 | 睡前5min | 问自己今天值不值得 |

---

## 连续天数追踪

| 习惯 | 当前连续 | 最长连续 | 状态 |
|:---|:---:|:---:|:---:|
| 🌅 曦·启明·以守筑基 | — | — | 执行中 |
| 🌤️ 午·承势·以执笃行 | — | — | 执行中 |
| 🌙 夕·观成·以校归正 | — | — | 执行中 |

---

## 退出规则

| 阶段 | 条件 | 操作 |
|:---|:---|:---|
| 执行中 | 每日打卡追踪 | 无 |
| 稳定中 | 连续21天不间断 | 进入维护模式，不再每日追踪 |
| 退出 | 转为无意识习惯 | 从记分卡移除 |