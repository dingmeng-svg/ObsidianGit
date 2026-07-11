---
title: 收件箱
date: 2026-07-09
tags: [MOC]
---

# 📥 收件箱

待处理内容入口，所有外部信息先进入这里。

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "文件", file.mtime AS "更新时间"
FROM "00_Inbox"
WHERE !startswith(file.name, "_") AND file.name != "00_Inbox"
SORT file.mtime DESC
```

---

## 目录结构

| 目录      | 说明                  |
| :------ | :------------------ |
| `_raw/` | 原始素材暂存，等待 Ingest 处理 |
| `外部导入/` | 外部剪藏内容              |

---

## 相关文档

- [[90_System/10_日工作流操作手册|日工作流操作手册]] — Inbox 处理流程
- [[90_System/09_数据流全景图|数据流全景图]] — 信息流入路径

---

*最后更新于 2026-07-09*