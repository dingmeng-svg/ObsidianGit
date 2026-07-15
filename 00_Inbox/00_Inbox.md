---
title: 00_Inbox
date: 2026-07-09
tags:
  - MOC
  - Inbox
doc_level: L4
aliases:
  - Inbox MOC
---

# 📥 Inbox 总览

> 所有外部信息的统一入口，按处理方式分流至 `_raw/`（系统自动 Ingest）或 `外部导入/`（人工处理）。

## 🔴 待处理

```dataview
TABLE WITHOUT ID file.link AS "文件", file.mtime AS "更新时间"
FROM "00_Inbox/_raw" OR "00_Inbox/外部导入"
WHERE status != "archived"
SORT file.mtime ASC
```

## 🟢 已处理

```dataview
TABLE WITHOUT ID file.link AS "文件", file.mtime AS "处理时间"
FROM "00_Inbox/_raw" OR "00_Inbox/外部导入"
WHERE status = "archived"
SORT file.mtime DESC
LIMIT 10
```

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "文件", file.mtime AS "更新时间"
FROM "00_Inbox"
WHERE file.name != "00_Inbox"
SORT file.mtime DESC
LIMIT 15
```

## 📊 统计

```dataviewjs
const rawTotal = dv.pages('"00_Inbox/_raw"').where(p => p.file.name != "_raw MOC").length;
const rawPending = dv.pages('"00_Inbox/_raw"').where(p => p.file.name != "_raw MOC" && p.status != "archived").length;
const extTotal = dv.pages('"00_Inbox/外部导入"').where(p => p.file.name != "_说明").length;
const extPending = dv.pages('"00_Inbox/外部导入"').where(p => p.file.name != "_说明" && p.status != "archived").length;
const archivedToday = dv.pages('"00_Inbox"').where(p => p.status == "done" && p.file.mtime.toFormat("yyyy-MM-dd") == dv.date("now").toFormat("yyyy-MM-dd")).length;
dv.span(`📊 _raw: ${rawPending}/${rawTotal} 待处理  ·  外部导入: ${extPending}/${extTotal} 待处理  ·  🟢 今日已处理 ${archivedToday}`);
```

## 目录结构

| 目录 | 说明 | 处理方式 |
|:---|:---|:---|
| `_raw/` | 原始素材暂存 | 系统自动 Ingest |
| `外部导入/` | 外部剪藏内容 | 人工处理 |

## 相关文档

- [[_raw|📦 _raw 素材 MOC]]
- [[外部导入|📥 外部导入 MOC]]
- [[90_System/10_日工作流操作手册|日工作流操作手册]]

---

*💡 使用 `status: archived` 标记已处理的素材。*