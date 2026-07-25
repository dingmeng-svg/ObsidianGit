---
title: 2026 Annual Habit Tracker
date: 2026-01-01
status: active
type: practice
fit_content_type: habit_tracker
tags: [个人成长, 习惯, 习惯追踪, 年度汇总]
aliases: [2026年度习惯看板]
---

# 2026 Annual Habit Tracker

> 全年数据汇总，按月展示趋势。


## 2026 全年趋势

```dataviewjs
let diaryFolder = '"20_Areas/A2_能力接口/Bullet Journal/Daily"';
let now = dv.luxon.DateTime.now();
let startMonth = dv.luxon.DateTime.fromObject({ year: 2026, month: 1, day: 1 });

let habits = [
    { key: "曦 · 启明 · 以守筑基", emoji: "🌅", short: "曦" },
    { key: "午 · 承势 · 以执笃行", emoji: "🌤️", short: "午" },
    { key: "夕 · 观成 · 以校归正", emoji: "🌙", short: "夕" }
];

let months = [];
let current = startMonth;
while (current <= now) {
    months.push(current);
    current = current.plus({ months: 1 });
}

let pages = dv.pages(diaryFolder)
    .where(p => p.file.day && p.file.day >= startMonth && p.file.day <= now && p.file.name != "Bullet Journal Daily");

let rows = [];
for (let m of months) {
    let monthStr = m.toFormat("yyyy-MM");
    let monthPages = pages.filter(p => p.file.day.toFormat("yyyy-MM") == monthStr);
    let daysInMonth = m.daysInMonth;
    let row = { month: m.toFormat("MMM") };
    for (let h of habits) {
        let completed = 0;
        for (let p of monthPages) {
            let tasks = p.file.tasks;
            let found = tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
            if (found && found.completed) completed++;
        }
        row[h.key] = `${completed}/${daysInMonth}`;
    }
    rows.push(row);
}

dv.table(
    ["月份", ...habits.map(h => `${h.emoji} ${h.key}`)],
    rows.map(r => [r.month, ...habits.map(h => r[h.key])])
);
```


## 年度汇总

```dataviewjs
let diaryFolder = '"20_Areas/A2_能力接口/Bullet Journal/Daily"';
let startMonth = dv.luxon.DateTime.fromObject({ year: 2026, month: 1, day: 1 });

let habits = [
    { key: "曦 · 启明 · 以守筑基", emoji: "🌅", short: "曦" },
    { key: "午 · 承势 · 以执笃行", emoji: "🌤️", short: "午" },
    { key: "夕 · 观成 · 以校归正", emoji: "🌙", short: "夕" }
];

let pages = dv.pages(diaryFolder)
    .where(p => p.file.day && p.file.day >= startMonth && p.file.name != "Bullet Journal Daily");

let totals = {};
for (let h of habits) totals[h.key] = 0;

for (let p of pages) {
    let tasks = p.file.tasks;
    for (let h of habits) {
        let found = tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
        if (found && found.completed) totals[h.key]++;
    }
}

dv.paragraph(`**2026 年汇总（截至 ${pages.length} 天）**：${habits.map(h => `${h.emoji} ${h.key} ${totals[h.key]}/${pages.length}`).join(" · ")}`);

dv.table(
    ["习惯", "完成天数", "完成率"],
    habits.map(h => [`${h.emoji} ${h.key}`, totals[h.key], `${Math.round(totals[h.key] / pages.length * 100)}%`])
);
```