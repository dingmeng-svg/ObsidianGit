---
title: "Bullet Journal MOC"
date: 2026-07-20
status: active
tags: [MOC, 系统文档]
type: moc
---

# 📋 Bullet Journal MOC

> Bullet Journal 系统总索引。路径：`20_Areas/A2_能力接口/Bullet Journal/`

---

## 📊 结构化统计

```dataviewjs
const folder = '"20_Areas/20_Areas/A2_能力接口/Bullet Journal"';

// 各子目录文件数
const daily = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Daily"').where(p => p.file.name != "Bullet Journal Daily").length;
const weekly = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Weekly"').length;
const monthly = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Monthly"').length;
const quarterly = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Quarterly"').length;
const yearly = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Yearly"').length;
const future = dv.pages('"20_Areas/A2_能力接口/Bullet Journal/Future Log"').length;

// 复盘统计 = weekly + monthly + quarterly + yearly
const reviews = weekly + monthly + quarterly + yearly;

dv.paragraph(`
| 类型 | 文件数 |
|:---|:---:|
| 📝 Daily | ${daily} |
| 📅 Weekly | ${weekly} |
| 📆 Monthly | ${monthly} |
| 📊 Quarterly | ${quarterly} |
| 🎯 Yearly | ${yearly} |
| 🔮 Future Log | ${future} |
| **复盘合计** | **${reviews}** |
`);
```

---

## 各子目录索引

### 📝 Daily

> 每日日记，按月归档。格式：`YYYY-MM-DD-Daily-Log.md`

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Daily"
WHERE file.name != "Bullet Journal Daily"
SORT file.name DESC
LIMIT 10
```

📜 [[Bullet Journal Daily|→ 完整索引]]

### 📅 Weekly

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Weekly"
SORT file.name DESC
```

### 📆 Monthly

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Monthly"
SORT file.name DESC
```

### 📊 Quarterly

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Quarterly"
SORT file.name DESC
```

### 🎯 Yearly

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Yearly"
SORT file.name DESC
```

### 🔮 Future Log

```dataview
LIST
FROM "20_Areas/A2_能力接口/Bullet Journal/Future Log"
SORT file.name DESC
```

---

## 关联

- [[20_Areas/20_Areas.md|20_Areas 总索引]]
- [[Atomic Habits/Atomic Habits|📊 习惯追踪]]