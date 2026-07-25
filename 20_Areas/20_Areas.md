---
title: 20_Areas
date: 2026-07-20
tags: [MOC, 系统文档]
aliases: [领域总览, Areas 入口]
---

# 🌱 领域

持续性的角色、责任与生活领域。与 Projects 不同，Areas 没有终点——它们是"需要维持在某个标准"的事情。

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.folder AS "路径"
FROM "20_Areas"
WHERE !startswith(file.name, "20_Areas") AND file.name != "Areas：My roles and responsibilities MOC"
SORT file.mtime DESC
LIMIT 20
```

---

## 目录结构

| 编号 | 领域 | 类型 | 核心角色 |
|:-----|:-----|:-----|:---------|
| A1 | 认知算法 | 成长透镜 | 真相的追寻者 |
| A2 | 能力接口 | 成长透镜 | 践行的信徒 |
| A3 | 精力底盘 | 成长透镜 | 生命的守护者 |
| A4 | 内核定力 | 成长透镜 | 意义的守望者 |
| D1 | 工作 | 物理领域 | 创业者、操盘手 |
| X1 | 关系 | 跨层交互 | 伴侣、家人、朋友 |
| X2 | 财务 | 跨层交互 | 财务管理者 |

---

## 📂 A1_认知算法

> 底层思维系统。看清本质、规避偏差、搭建多元心智模型。

- 心智模型（概念层）— 认知偏误、思维框架
- 方法论（实践层）— 知识管理、思维工具
- 个人原创思维框架 — 四层金字塔、积分模型、认知进化公式

```dataview
LIST
FROM "20_Areas/A1_认知算法"
WHERE file.name != "A1_认知算法"
SORT file.mtime DESC
```

---

## 📂 A2_能力接口

> 执行系统。将认知转化为现实影响的工具集。

- **Bullet Journal/** — 时间执行中枢（Daily/Weekly/Monthly/Quarterly/Yearly/Future Log）
- **Atomic Habits/** — 习惯体系（三层飞轮：设计层/执行层/觉察层）

```dataview
LIST
FROM "20_Areas/A2_能力接口"
WHERE file.name != "A2_能力接口"
SORT file.mtime DESC
```

---

## 📂 A3_精力底盘

> 身体与能量。认知和能力的物理载体。

- **健身/** — 方案、动作、习惯、训练记录
- **食物/** — 烘焙、食谱、营养

```dataview
LIST
FROM "20_Areas/A3_精力底盘"
WHERE file.name != "A3_精力底盘"
SORT file.mtime DESC
```

---

## 📂 A4_内核定力

> 身份与意义。在漫长的成长周期中抵御诱惑、穿越低谷、对抗虚无。

- (待建设)

```dataview
LIST
FROM "20_Areas/A4_内核定力"
WHERE file.name != "A4_内核定力"
SORT file.mtime DESC
```

---

## 📂 D1_工作

> 职业责任田。公司运营、业务增长、团队管理。

```dataview
LIST
FROM "20_Areas/D1_工作"
WHERE file.name != "D1_工作"
SORT file.mtime DESC
```

---

## 📂 X1_关系

> 跨层交互系统。伴侣、家人、朋友、社群。

```dataview
LIST
FROM "20_Areas/X1_关系"
WHERE file.name != "X1_关系"
SORT file.mtime DESC
```

---

## 📂 X2_财务

> 跨层交互系统。理财规划、资产配置、记账。

```dataview
LIST
FROM "20_Areas/X2_财务"
WHERE file.name != "X2_财务"
SORT file.mtime DESC
```

---

## 与 Projects 的关系

```
Projects（有终点）            Areas（持续责任）
完成一件事 → 归档             维持一个标准 → 永远在线

例：
10_Projects/操盘手骑士        20_Areas/D1_工作
     ↑ 项目结束后归档              ↑ 持续运营
```

---

## 边界铁律

- A 系列目录存放成长模块自身产出内容
- D/X 系列目录存放各自领域的业务文件
- 禁止将 D/X 系列文件物理移入 A 系列
- 允许在 A 系列 MOC 中引用 D/X 系列文件

---

## 相关文档

- [[01_知识库统一规范总纲]] — 目录层级标准
- [[03_知识库融合架构设计]] — AREA 体系说明
- [[08_日工作流操作手册]] — 领域维护

---

*最后更新于 2026-07-20*