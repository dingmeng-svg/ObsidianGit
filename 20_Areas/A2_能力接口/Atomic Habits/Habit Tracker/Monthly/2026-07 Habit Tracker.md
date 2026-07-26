---
title: 2026-07 Habit Tracker
date: 2026-07-01
status: active
type: practice
fit_content_type: habit_tracker
month: "2026-07"
tags: [个人成长, 习惯, 习惯追踪, 月度数据]
---

# 2026-07 习惯追踪器

> 每天在 BuJo 日记中打勾，本表自动汇总当月数据。
> 数据源：`20_Areas/A2_能力接口/Bullet Journal/Daily/`


## 本月日历

```dataviewjs
const current = dv.current();
const month = current.month;
// 支持字符串和 DateTime 两种格式
let monthStr = typeof month === "string" ? month : (month ? month.toFormat("yyyy-MM") : "");
if (!monthStr) {
    dv.paragraph("❌ 请在 YAML 中设置 month: YYYY-MM");
}
const diaryFolder = '"20_Areas/A2_能力接口/Bullet Journal/Daily"';

let targetMonth = dv.luxon.DateTime.fromISO(monthStr);
let daysInMonth = targetMonth.daysInMonth;

let pages = dv.pages(diaryFolder)
    .where(p => p.file.day && p.file.day.toFormat("yyyy-MM") == monthStr && p.file.name != "Bullet Journal Daily")
    .sort(p => p.file.day);

let habits = [
    { key: "曦 · 启明 · 以守筑基", emoji: "🌅" },
    { key: "午 · 承势 · 以执笃行", emoji: "🌤️" },
    { key: "夕 · 观成 · 以校归正", emoji: "🌙" }
];

let rows = [];
let totals = {};
for (let h of habits) totals[h.key] = 0;

for (let d = 1; d <= daysInMonth; d++) {
    let dayStr = String(d).padStart(2, "0");
    let page = pages.find(p => p.file.day.toFormat("dd") == dayStr);
    let row = { day: dayStr };
    for (let h of habits) {
        if (page) {
            let tasks = page.file.tasks;
            let found = tasks.find(t => t.text.includes(`[habit:: ${h.key}]`));
            if (found) {
                row[h.key] = found.completed ? "✅" : "☐";
                if (found.completed) totals[h.key]++;
            } else {
                row[h.key] = "—";
            }
        } else {
            row[h.key] = "—";
        }
    }
    rows.push(row);
}

dv.paragraph(`**${monthStr} 汇总**：${habits.map(h => `${h.emoji} ${h.key} ${totals[h.key]}/${daysInMonth}`).join(" · ")}`);
dv.table(["日", ...habits.map(h => `${h.emoji} ${h.key}`)], rows.map(r => [r.day, ...habits.map(h => r[h.key])]));
```


## 月度备注

- **本月亮点**：7月16日-26日连续 11 天三习惯全勤 ✅
- **本月问题**：
- **下月调整**：