---
title: _raw
date: 2026-07-09
tags:
  - MOC
  - Inbox
  - Raw
doc_level: L4
aliases:
  - Raw 素材 MOC
---

# 🗄️ 原料仓总览

> 系统自动 Ingest 的原始素材。只读不改，永久存档。
>
> 处理流程：外部导入 → 进入 `_raw/` → Hermes Agent 自动 Ingest → 提炼为原子笔记或归档。

## 🔴 待处理（等待 Ingest）

```dataview
TABLE file.ctime AS "创建时间", file.mtime AS "修改时间"
FROM "00_Inbox/_raw"
WHERE file.name != "_raw 素材总MOC" AND status != "archived"
SORT file.ctime ASC
```

## 📦 全部原始素材

```dataview
LIST FROM "00_Inbox/_raw"
WHERE file.name != "_raw 素材总MOC"
SORT file.ctime DESC
```

## 📊 统计

```dataviewjs
const total = dv.pages('"00_Inbox/_raw"').where(p => p.file.name != "_raw 素材总MOC").length;
const pending = dv.pages('"00_Inbox/_raw"').where(p => p.file.name != "_raw 素材总MOC" && p.status != "archived").length;
dv.span(`📊 总素材 ${total}  ·  🔴 待处理 ${pending}`);
```

---

*💡 使用 `status: archived` 标记已 Ingest 的素材。文件只读不改，Ingest 产物写入 `31_Atomic_Notes/`。*