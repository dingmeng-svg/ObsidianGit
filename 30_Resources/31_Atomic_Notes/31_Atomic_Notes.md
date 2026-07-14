---
title: 原子笔记索引
date: 2026-07-14
doc_level: L4
version: 1.0
status: active
tags: [系统文档, MOC]
human_edited: true
---

# 🧠 原子笔记索引

> 卡片盒永久知识沉淀，按领域与类型双重维度组织。

## 按领域

```dataview
TABLE rows.type AS "类型", rows.file.link AS "笔记"
FROM "30_Resources/31_Atomic_Notes"
WHERE file.name != "31_Atomic_Notes"
SORT file.name ASC
GROUP BY file.folder
```

## 全部原子笔记

```dataview
LIST
FROM "30_Resources/31_Atomic_Notes"
WHERE file.name != "31_Atomic_Notes"
SORT file.ctime DESC
```

---

*💡 每篇原子笔记聚焦一个核心概念，通过双链建立知识网络*