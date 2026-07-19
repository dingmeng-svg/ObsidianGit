---
title: "习惯记分卡 · 总 MOC"
tags: [MOC, Habits, Tracking]
---

# ✅ 习惯管理仪表盘

> 5 份联动习惯记分卡统一管理，日常行为追踪。

## 📋 当前追踪的习惯

```dataview
LIST FROM "20_Areas/22_个人成长/Habit Tracking"
WHERE file.name != "习惯总MOC"
SORT file.name ASC
```

## 📊 今日概览

```dataviewjs
const habits = dv.pages('"20_Areas/22_个人成长/Habit Tracking"')
  .where(p => p.file.name != "习惯总MOC");

if (habits.length > 0) {
  const today = dv.date("now").toFormat("yyyy-MM-dd");
  let checked = 0;
  habits.forEach(h => {
    if (h.file.frontmatter && h.file.frontmatter.date === today) checked++;
  });
  dv.span(`✅ 今日已打卡：${checked} / ${habits.length}`);
} else {
  dv.span("📌 暂无习惯追踪文件，请创建");
}
```

---

*💡 每个习惯独立文件，使用 frontmatter `date: YYYY-MM-DD` 记录每日打卡*