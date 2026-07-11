---
title: "10_MOC 索引维护规范"
date: 2026-07-11
status: active
tags:
  - 系统文档
aliases:
  - "MOC 规范"
  - "Map of Content 规范"
related:
  - "[[05_Vault Management 操作规范]]"
  - "[[01_知识库统一规范总纲]]"
---

# 18_MOC 索引维护规范

> **地位声明**：本文件是知识库 MOC（Map of Content）索引的维护规范。所有 MOC 创建、更新、维护操作均以此为准。
>
> **版本**：v1.0.0
> **生效日期**：2026-07-11
>
> **执行层文档**：本文件是规则标准。具体执行流程、脚本、故障排查见 `vault-management` Skill。
>
> **对应 Skill**：`vault-management`（执行时自动加载）

---

## 一、核心原则

### 1.1 MOC 定位

| 维度 | 说明 |
|:---|:---|
| **本质** | 目录索引笔记，不是内容笔记 |
| **作用** | 导航枢纽，帮助发现和定位内容 |
| **位置** | 对应目录的根目录下 |

### 1.2 MOC 命名铁律

| 铁律 | 说明 |
|:---|:---|
| **必须与目录名一致** | `00_Inbox/00_Inbox.md`，不是 `00_Inbox/MOC.md` |
| **禁止使用 `MOC.md`** | 使用目录名作为文件名 |
| **禁止添加版本号** | `00_Inbox.md` 不是 `00_Inbox v1.0.md` |

### 1.3 MOC 放置铁律

| 铁律 | 说明 |
|:---|:---|
| **放在对应目录的根目录** | 不是 Vault 根目录 |
| **不要放在 Dataview 查询目标内** | 否则 Dataview 会抓取 MOC 自己 |
| **使用 WHERE 过滤排除自己** | `WHERE file.name != "MOC文件名"` |

---

## 二、MOC 文件位置

### 2.1 标准位置

| 目录 | MOC 文件路径 |
|:---|:---|
| `00_Inbox/` | `00_Inbox/00_Inbox.md` |
| `10_Projects/` | `10_Projects/10_Projects.md` |
| `20_Areas/` | `20_Areas/20_Areas.md` |
| `30_Resources/` | `30_Resources/30_Resources.md` |
| `40_Archive/` | `40_Archive/40_Archive.md` |
| `90_System/` | `90_System/90_System.md` |

### 2.2 子目录 MOC

| 目录 | MOC 文件路径 |
|:---|:---|
| `30_Resources/31_Atomic_Notes/` | `30_Resources/31_Atomic_Notes/31_Atomic_Notes.md` |
| `30_Resources/32_MOCs/` | `30_Resources/32_MOCs/32_MOCs.md` |

### 2.3 放置注意事项

**错误做法**：
```
Language Chunk 笔记/
├── MOC.md          ← ❌ MOC 和数据文件混在一起
├── 01. word.md
└── 02. word.md
```

**正确做法（二选一）**：

**方案 A：MOC 放在上一层**
```
05_产出/
├── MOC.md              ← ✅ MOC 在上级目录
└── Language Chunk 笔记/
    ├── 01. word.md
    └── 02. word.md
```

**方案 B：MOC 放在同一层，用 WHERE 过滤**
```dataview
WHERE file.name != "MOC文件名"
```

---

## 三、MOC 标准结构

### 3.1 必需组成部分

| 序号 | 组成部分 | 说明 |
|:---:|:---|:---|
| 1 | YAML frontmatter | `title`、`date`、`tags: [MOC]`、`aliases` |
| 2 | 标题（带 emoji） | `📥 🚀 🌱 🧠 📦 ⚙️` 等 |
| 3 | 简短说明 | 1-2 句话描述该目录定位 |
| 4 | 📝 最近更新 | Dataview 动态列表 |
| 5 | 目录结构表格 | 子目录说明 |
| 6 | 各子目录 Dataview 列表 | 按领域分区 |
| 7 | 领域特定规则 | 如 ZK 核心规则、归档规则 |
| 8 | 相关文档链接 | 指向规范、操作手册等 |

### 3.2 YAML 模板

```yaml
---
title: [目录名]
date: YYYY-MM-DD
tags: [MOC]
aliases:
  - "[旧名称]"
related:
  - "[[相关文档]]"
---
```

### 3.3 Dataview 最近更新模板

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.mtime AS "更新时间"
FROM "当前目录"
WHERE !startswith(file.name, "_") AND file.name != "MOC文件名"
SORT file.mtime DESC
LIMIT 15
```

---

## 四、MOC 更新时机

### 4.1 必须更新 MOC 的操作

| 操作 | 说明 |
|:---|:---|
| **新增重要笔记** | 特别是原子笔记、项目笔记 |
| **重命名文件** | 更新 MOC 中的链接 |
| **移动文件到其他目录** | 检查 MOC 是否需要同步移动 |
| **创建新的子目录** | 在 MOC 中添加目录说明 |

### 4.2 不需要更新 MOC 的操作

| 操作 | 说明 |
|:---|:---|
| **修改笔记内容** | MOC 只管索引，不管内容 |
| **修改笔记 YAML** | 不影响 MOC 结构 |
| **删除临时文件** | 临时文件不在 MOC 索引中 |

---

## 五、MOC 合并模式

### 5.1 触发场景

当目录下存在旧的 MOC 文件（如 `Areas：My roles and responsibilities MOC.md`）和新的标准命名 MOC（如 `20_Areas.md`）时。

### 5.2 合并流程

```
步骤1：先读旧 MOC 内容
  └─ 保留有价值的结构化内容

步骤2：合并到新 MOC
  └─ 将旧内容融入新 MOC 对应位置

步骤3：删除旧文件
  └─ 合并完成后删除

步骤4：验证无残留
  └─ 检查旧文件确实已删除
```

### 5.3 典型案例

| 旧 MOC | 新 MOC | 合并内容 |
|:---|:---|:---|
| `_Project_Index.md` | `10_Projects.md` | 进行中项目表、项目模板 |
| `Areas：My roles MOC.md` | `20_Areas.md` | 领域总览表、各领域详细说明 |
| `Archive 归档.md` | `40_Archive.md` | 归档分类表、各目录详细说明 |

---

## 六、Worklog MOC 特殊规范

### 6.1 目录结构

```
90_System/Worklogs/
├── Worklog MOC.md
├── 2026-06/
│   ├── 2026-06-28.md
│   ├── 2026-06-29.md
│   └── 2026-06-30.md
└── 2026-07/
    ├── 2026-07-01.md
    └── ...
```

### 6.2 双链规范

每个 Worklog 的 `related` 字段必须包含：
1. `[[Worklog MOC]]`
2. 前一天的 worklog
3. 后一天的 worklog

**示例**：
```yaml
related:
  - "[[Worklog MOC]]"
  - "[[2026-07-08]]"
  - "[[2026-07-10]]"
```

---

## 七、MOC 自动聚合方案

新建 MOC 的核心概念列表使用 Dataview 自动聚合：

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.mtime AS "最后更新"
FROM "30_Resources/31_Atomic_Notes"
WHERE contains(tags, "替换为对应标签") AND (status = "active" OR status = "mature")
SORT file.mtime DESC
```

**人工在 MOC 中只负责**：
- 「主题简述」：1-2 句话描述该领域核心特征
- 「概念间关系说明」：机器无法替代的高阶思考
- 「里程碑笔记置顶」：手动推荐 ≤ 5 篇核心笔记

人工手动置顶的核心笔记，必须在 MOC 的 YAML `related` 字段中添加双向链接。

**存量兼容**：存量混合式 MOC 不强制改造。新建 MOC 一律使用纯 Dataview 方案。
月度审计不校验存量混合 MOC 的手动列表完整性。

---

## 八、检查清单

### ✅ 创建 MOC 必检

- [ ] 文件名是否与目录名一致？
- [ ] 是否放在对应目录的根目录？
- [ ] YAML 是否包含 `tags: [MOC]`？
- [ ] Dataview 是否过滤掉自己？

### ✅ 更新 MOC 必检

- [ ] 最近更新列表是否正常显示？
- [ ] 新增的笔记是否出现在列表中？
- [ ] 子目录 Dataview 是否正确？

### 🔴 STOP 信号

遇到以下情况**立即停止**，人工确认：

- ❌ MOC 文件名与目录名不一致
- ❌ MOC 放在 Dataview 查询的目标目录内
- ❌ 不确定是否应该创建新的 MOC

---

## 变更日志

| 版本 | 日期 | 变更内容 |
|:---|:---|:---|
| v1.0.0 | 2026-07-11 | 首次发布。从 `vault-management` Skill 提取 MOC 维护规则。 |