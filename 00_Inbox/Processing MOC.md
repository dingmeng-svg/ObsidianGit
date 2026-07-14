---
title: "Processing MOC"
tags: [MOC, Inbox]
---

# 📥 加工区总览

> 7 天内待提炼素材，目标：每日原子化处理至少 1 篇。

## 🔴 待处理（需原子化）

```dataview
LIST FROM "00_Inbox/processing"
WHERE file.name != "Processing MOC"
SORT file.mtime ASC
```

## 🟢 已处理（沉淀至资源库）

```dataview
LIST FROM "00_Inbox/processing"
WHERE status = "done"
SORT file.mtime DESC
LIMIT 10
```

## 📊 统计

- 待处理总数：`$= dv.pages('"00_Inbox/processing"').where(p => p.status != "done").length`
- 今日已处理：`$= dv.pages('"00_Inbox/processing"').where(p => p.status == "done" && p.file.mtime.toFormat("yyyy-MM-dd") == dv.date("now").toFormat("yyyy-MM-dd")).length`

---

*💡 使用 `status: done` 标记已处理的素材*