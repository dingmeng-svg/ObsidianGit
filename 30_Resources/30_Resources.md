---
title: 资源库
date: 2026-07-09
tags: [MOC]
aliases:
  - "Resources 资源 Things I'm interested in"
  - "Resources 资源-MOC"
status: active
---

# 🧠 资源库

这里是我感兴趣的一切——从认知科学到亲密关系，从健身到媒体。本索引提供全局导航。

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.mtime AS "更新时间"
FROM "30_Resources"
WHERE !startswith(file.name, "_") AND file.name != "30_Resources"
SORT file.mtime DESC
LIMIT 15
```

---

## 目录结构

| 目录 | 说明 |
|:-----|:-----|
| `31_Atomic_Notes/` | 原子笔记，按领域分类 |
| `32_MOCs/` | 索引层，主题聚合 |
| `33_Summaries/` | 摘要 |
| `34_Synthesis/` | 综合 |
| `Attachments/` | 附件资源 |
| `工具链/` | 工具链相关 |
| `Obsidian个人OS体验包v2.2/` | 体验包 |

---

## 🧠 原子笔记库 (31_Atomic_Notes)

按 8 个领域分类，每个领域下有概念/模型/批判/实践等子目录。

### 领域目录

| 领域 | 子目录 | 说明 |
|:-----|:-------|:-----|
| `个人成长/` | 概念、模型、批判、实践 | 个人成长与习惯系统 |
| `工作/` | 概念、模型、实践 | 工作相关原子笔记 |
| `关系/` | 概念、模型、批判、实践 | 亲密关系与人际 |
| `心理学/` | 概念、模型 | 心理学知识 |
| `知识管理/` | 概念、模型、实践 | ZK 与知识管理 |
| `科学/` | 概念 | 科学相关 |
| `生活/` | 菜谱、概念、模型 | 生活与烹饪 |
| `国际政治/` | 概念 | 国际政治 |

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.folder AS "路径"
FROM "30_Resources/31_Atomic_Notes"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
LIMIT 20
```

---

## 📚 MOC 索引层 (32_MOCs)

| MOC | 说明 |
|:----|:-----|
| [[认知与学习方法 MOC]] | 认知科学、学习方法、知识管理（核心入口） |
| [[卡片笔记写作法 MOC]] | 卡片笔记方法论 |
| [[亲密关系中的沉默与博弈 MOC]] | 亲密关系专题 |
| [[高效能体系 MOC]] | 效能系统 |
| [[第二语言习得 × 卡片盒 MOC]] | 语言学习 |
| [[拆解一切问题 MOC]] | 问题解决 |
| [[打造第二大脑 MOC]] | 第二大脑 |
| [[穷查理宝典 MOC]] | 投资与决策 |
| [[影响力的六大原则 MOC]] | 影响力 |
| [[贪婪的多巴胺 MOC]] | 神经科学 |
| [[子弹笔记 MOC]] | 子弹笔记 |
| [[金惟纯 MOC]] | 人物研究 |
| [[翟东升访谈 MOC]] | 访谈整理 |
| [[LLM Wiki 知识构建系统 MOC]] | LLM 知识库 |

```dataview
LIST
FROM "30_Resources/32_MOCs"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📖 摘要 (33_Summaries)

```dataview
LIST
FROM "30_Resources/33_Summaries"
SORT file.mtime DESC
```

---

## 🔧 工具链

```dataview
LIST
FROM "30_Resources/工具链"
SORT file.mtime DESC
```

---

## 📦 其他目录

| 目录 | 说明 |
|:-----|:-----|
| `34_Synthesis/` | 综合层（待填充） |
| `Attachments/` | 附件资源 |
| `Obsidian个人OS体验包v2.2/` | 体验包资料 |

---

## ZK 核心规则

- **原子笔记**：一卡一意，纯概念名
- **双链连接**：通过 `[[wikilink]]` 互联
- **MOC 涌现**：同主题 ≥5 条时创建索引
- **永久笔记**：不进 Archive

---

## 相关文档

- [[90_System/07_知识库融合架构设计|融合架构设计]] — ZK 体系说明
- [[90_System/01_知识库统一规范总纲|总纲 v3.0]] — 原子笔记命名规范

---

*最后更新于 2026-07-09*