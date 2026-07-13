---
title: 90_System
date: 2026-07-11
doc_level: L4
version: v1.0.0
last_sync: 2026-07-11
status: active
tags:
  - 系统文档
  - MOC
related_docs:
  - "[[01_知识库统一规范总纲]]"
  - "[[16_系统文档总索引]]"
dependent_skills: []
---

# ⚙️ 90_System · 系统文档总览

> 本文件是系统文档的统一导航入口。所有系统文档按层级和模块分类。

## 按层级浏览

```dataview
TABLE WITHOUT ID
  file.link AS "文档",
  doc_level AS "层级",
  version AS "版本",
  file.mtime AS "最后修改"
FROM "90_System"
WHERE doc_level
  AND status = "active"
  AND !contains(file.folder, "_备份")
SORT doc_level ASC, file.name ASC
```

## 按模块浏览

### 信息流
- Ingest 编译：[[06_Inbox 素材处理全流程规范]]、[[06_Inbox 素材处理全流程规范]]
- 素材采集：[[06_Inbox 素材处理全流程规范#素材入口统一化规则]]

### 工作流
- 日常操作：[[08_日工作流操作手册]]
- 归档维护：[[05_Vault Management 全流程操作规范]]

### 管理
- Lint 与合规：HERMES §六
- 审计与健康度：HERMES §六

### 文档治理
- 依赖关系：[[16_系统文档总索引]]
- 交叉引用：参见月度 Lint 报告

## ⚠️ 待同步文档

> 以下文档的 `last_sync` 早于其上游文档的最近修改时间，可能存在版本不同步风险。
> **自动过滤**：新建文档（`version: v0.0.0` 或创建不足 7 天）不显示在此视图中。

```dataview
TABLE WITHOUT ID
  file.link AS "文档",
  last_sync AS "最后同步",
  file.mtime AS "最后修改"
FROM "90_System"
WHERE doc_level
  AND status = "active"
  AND typeof(last_sync) = "date"
  AND last_sync < date(file.mtime)
  AND version != "v0.0.0"
  AND file.cday < date(today) - dur(7 days)
  AND !contains(file.folder, "_备份")
SORT last_sync ASC
```

## 废弃/归档文档

```dataview
TABLE WITHOUT ID
  file.link AS "文档",
  file.mtime AS "最后修改"
FROM "90_System"
WHERE (status = "deprecated" OR status = "archived")
  AND !contains(file.folder, "_备份")
SORT file.mtime DESC
```