---
title: "07_YAML FrontMatter 规范"
date: 2026-07-11
status: active
tags:
  - 系统文档
aliases:
  - "YAML 规范"
  - "FrontMatter 规范"
related:
  - "[[01_知识库统一规范总纲]]"
  - "[[05_Vault Management 全流程操作规范]]"
---

# 16_Obsidian YAML FrontMatter 规范

> **地位声明**：本文件是知识库所有笔记 YAML FrontMatter 的编写规范。每次处理笔记归档前必须检查是否符合本规范。
>
> **版本**：v1.0.0
> **生效日期**：2026-07-11
>
> **相关规范**：
> - [[01_知识库统一规范总纲]] — 元数据规范（META-01~03）
> - [[05_Vault Management 全流程操作规范]] — 归档操作流程
> - [[14_知识库规范速查卡]] — 核心规则摘要

---

## 一、标签字典（16 种）

### 1.1 核心标签（9 个）

| 标签 | 说明 | 父领域 |
|:---|:---|:---|
| `个人成长` | 认知、学习、写作、传统文化 | — |
| `工作` | 职场、管理、创业、项目文件 | — |
| `生活` | 日常、烹饪、运动、健康、旅行 | — |
| `关系` | 人际、亲密关系、家庭、沟通 | — |
| `财务` | 投资、理财、记账、资产 | — |
| `技术` | 编程、架构、AI、工具 | — |
| `心理学` | 心理现象、心理模型 | 个人成长 |
| `知识管理` | 笔记方法、知识体系 | 个人成长 |
| `语言` | 语言习得、外语学习、语言学、翻译 | 个人成长 |

### 1.2 功能性标签（8 个）

| 标签 | 说明 | 用途 |
|:---|:---|:---|
| `国际政治` | 时政、国际关系、地缘 | 领域标记 |
| `科学` | 物理、生物、化学、数学 | 领域标记 |
| `系统文档` | 90_System/ 下所有文件 | 目录标记 |
| `归档` | 40_Archive/ 下所有文件 | 目录标记 |
| `素材` | 外部摘抄、灵感收集 | 类型标记 |
| `日记` | 每日日记 | 类型标记 |
| `习惯` | 习惯方法论专用 | 类型标记 |
| `Insight` | 洞察分析报告 | 类型标记 |

### 1.3 标签使用规则

| 规则 | 说明 |
|:---|:---|
| **只能从 16 种中选择** | 不可自创标签 |
| **细分标签与父标签互斥** | 打细分标签不打父标签 |
| **功能性标签不计入双标签统计** | 仅用于检索分类 |
| **项目名不在标签中** | 用 `project:` 字段 |

**示例**：
```yaml
# 正确
tags: [心理学]

# 错误（细分+父标签重复）
tags: [个人成长, 心理学]

# 错误（自创标签）
tags: [营销, 品牌]
```

---

## 二、status 合法值（5 种）

| 值 | 说明 | 适用场景 |
|:---|:---|:---|
| `draft` | 灵感碎片，概念尚未成型 | 新建笔记、未完成提炼 |
| `active` | 概念清晰，仍在打磨中 | 大多数原子笔记 |
| `mature` | 提炼完成，内容稳定 | 可作为可靠引用源 |
| `deprecated` | 内容已过时、被证伪或无引用价值 | 文件名须加 `⚠️` 前缀 |
| `archived` | 已完结项目或内容，保留检索价值 | 归档文件 |

**非法值**：`standard`、`reference`、`final`、`completed` 等均不合法

---

## 三、type 合法值（5 种）

| 值 | 说明 | 适用内容 |
|:---|:---|:---|
| `concept` | 概念笔记 | 定义、解释、概念阐述 |
| `model` | 模型/框架 | 理论模型、思维框架 |
| `practice` | 实践方法 | 方法论、操作指南 |
| `critique` | 批判性思考 | 质疑、反思、批判 |
| `moc` | MOC 索引笔记 | 目录索引文件 |

**原子笔记必须填写 `type` 字段**

---

## 四、标准字段

### 4.1 必填字段

| 字段 | 说明 | 格式 |
|:---|:---|:---|
| `title` | 笔记标题 | 不加引号 |
| `date` | 创建日期 | YYYY-MM-DD |
| `status` | 状态 | 5 种合法值之一 |
| `tags` | 标签数组 | `[标签名]` |

### 4.2 原子笔记必填

| 字段 | 说明 | 格式 |
|:---|:---|:---|
| `type` | 笔记类型 | 5 种合法值之一 |

### 4.3 推荐字段

| 字段 | 说明 | 格式 |
|:---|:---|:---|
| `source` | 核心主来源（仅 1 个） | 中文全名或 `原创` |
| `author` | 原作者 | 作者名 |
| `project` | 归属项目名 | 纯文本，不加双链 |
| `aliases` | 搜索别名 | `[别名1, 别名2]` |
| `related` | 关联笔记 | `["[[笔记名]]"]` |

### 4.4 系统扩展字段（不计入 META-02 配额）

`modified` 字段由 Obsidian 文件系统元数据（`file.mtime`）自动维护，**无需手动填写，禁止手动编辑**。Agent 进行陈旧检测时以此为准。

| 字段 | 适用笔记类型 | 说明 |
|:---|:---|:---|:---|
| `human_edited` | 全库 | AI 写入权限锁。`true` = 禁止 Agent 覆盖正文。若笔记 YAML 中无此字段，视为 `false` |
| `deep_reviewed` | 仅语言组块笔记 | 是否完成至少一轮人工深回流修正 |
| `ai_generated` | AI 编译产物 | 标记 AI 生成 |
| `last_ai_edit` | Agent 修改过的笔记 | 最近 AI 修改日期 |
| `ai_edit_summary` | Agent 修改过的笔记 | AI 修改内容简述 |
| `extraction_context` | 从项目萃取的原子笔记 | 一句话记录提炼动机和原始语境（可选字段） |
| `extraction_decision` | 项目主文档 | 结项萃取决策记录。格式：`["extracted: 笔记A", "project_only: 文件C", "pending: 文件D"]` |
| `doc_level` | 系统文档 | 文档层级标识。固定取值 L0/L1/L2/L3/L4。无此字段不认定为正式系统文档 |
| `version` | 系统文档 | 语义化版本号。`v0.0.0` 为草稿，正式启用须升级至 `v1.0.0` |
| `last_sync` | 系统文档 | 最后与上游真值源规则对齐的日期，非文件修改时间 |
| `related_docs` | 系统文档 | 关联文档的双链列表 |
| `dependent_skills` | 系统文档 | 依赖本文档的 Skill 列表 |

### 4.5 全局字段白名单

| 字段分类 | 特化字段清单 | 适用范围 |
|:---|:---|:---|:---|
| 食谱笔记 | `cuisine, dish_type, prep_time, cook_time, servings, difficulty, ingredients_main, diet_type, difficulty_display, temperature, rating` | 仅 `20_Areas/23_生活与健康/食物/` |
| 健身方案 | `fit_type, fit_cycle, target_muscle, fit_level, train_duration, train_frequency, fit_goal, rest_rule, equipment, injury_note, diet_strategy, demo_gif, training_date` | 仅 `20_Areas/23_生活与健康/健身/` |

### 溯源字段标准化

| 字段 | 适用场景 | 格式 | 是否必填 |
|:---|:---|:---|:---|
| `source` | 原始出处 | 单一来源名称或数组 `["来源A", "来源B"]` | 推荐 |
| `extraction_context` | 萃取动机 | 一句话描述提炼原因 | 回流/萃取产物必填 |
| `ai_edit_summary` | AI 修改记录 | 修改内容简述 | Agent 修改时必填 |
| `last_ai_edit` | AI 最后修改日期 | YYYY-MM-DD | Agent 修改时必填 |

**多源素材 `source` 数组书写规范**：网页填完整链接、书籍填书名、短视频填「标题+平台」。

### 4.5 非标准字段（禁止使用）

| 禁止 | 原因 |
|:---|:---|
| ❌ `version` | 不是标准字段 |
| ❌ `priority` | 不是标准字段 |
| ❌ `category` | 用 `tags` 代替 |
| ❌ 自创字段 | 超出 12 个字段上限 |

---

## 五、YAML 书写规范

### 5.1 基本规则

| 规则 | 说明 |
|:---|:---|
| **枚举值全小写** | `draft` 而非 `Draft` |
| **字段顺序** | `title → date → status → type → tags → project → source → author → aliases → related` |
| **source 字段** | 中文译本用中文全名，原创内容填 `原创` |
| **related 字段** | 使用双链格式 |

### 5.2 project 字段格式

```yaml
# 正确
project: 操盘手骑士

# 错误（加了双链）
project: "[[操盘手骑士-MOC]]"
```

---

## 六、原子笔记 YAML 模板

```yaml
---
title: 概念名
date: YYYY-MM-DD
status: active
type: concept
tags: [领域]
source: 核心来源
author: 原作者
aliases: []
related: []
---
```

---

## 七、常见错误清单

| 错误 | 正确 | 问题类型 |
|:---|:---|:---|
| `tags: [营销, 品牌]` | `tags: [工作]` | 自创标签 |
| `tags: [个人成长, 心理学]` | `tags: [心理学]` | 细分+父标签重复 |
| `status: standard` | `status: active` | 非法状态值 |
| `status: reference` | `status: active` | 非法状态值 |
| 缺少 `type` 字段 | `type: concept` | 原子笔记必填 |
| `version: 1.0` | 删除此字段 | 非标准字段 |
| `project: "[[项目名]]"` | `project: 项目名` | project 不加双链 |
| `source: [A, B]` | `source: A` | source 只能单值 |

---

## 八、故障排查（if-then fallback）

| 触发条件 | 观测现象 | 一线修复 | 仍失败兜底 |
|:---|:---|:---|:---|
| 标签不在字典中 | `tags: [营销]` 等自创标签 | 改为 16 种字典中的领域标签 | 查阅 `01_知识库统一规范总纲` §标签体系 |
| status 非法值 | `status: standard` | 改为合法值 | 同上查阅 status 定义节 |
| 原子笔记缺 type | YAML 没有 `type` 字段 | 添加 `type: concept/model/practice/critique` | 判断内容性质后选择最匹配类型 |
| source 多值 | `source: [A, B]` 数组格式 | 改为单值：`source: A` | 原创内容填 `source: 原创` |
| project 带双链 | `project: "[[项目名]]"` | 改为纯文本：`project: 项目名` | 确认项目名正确（不加 -MOC 后缀） |
| 非标准字段 | `version` / `priority` 等自创字段 | 删除该字段 | 仅保留规范定义的标准字段 |

---

## 九、检查清单

### ✅ 必检清单

每次处理笔记归档时，**必须**执行以下检查：

1. ✅ `tags` 是否从 16 种标签字典中选择？
2. ✅ `status` 是否为合法值？
3. ✅ 原子笔记是否填写 `type`？
4. ✅ `source` 是否只填 1 个来源？
5. ✅ `project` 是否不加双链？
6. ✅ 是否删除了非标准字段？

### 🔴 STOP 信号

遇到以下情况**立即停止**，查阅主文档确认：

- ❌ 不确定标签归属哪个领域
- ❌ 笔记类型难以判断（concept/model/practice/critique）
- ❌ source 字段涉及多个来源引用
- ❌ 原子笔记路径判断不确定（是否应归入 31_Atomic_Notes）

---

## 十、反例黑名单

| # | 反模式 | 为什么不要做 | 替代做法 |
|:---|:---|:---|:---|
| 1 | 自创标签如 `[营销]` `[品牌]` | 破坏标签体系，导致检索失效 | 从 16 种字典中选择最接近的领域标签 |
| 2 | `status: standard` `reference` | 非法状态值，不符合流转规范 | 使用合法值：`draft/active/mature/deprecated/archived` |
| 3 | 原子笔记不写 `type` 字段 | 无法区分笔记性质，检索不完整 | 必填 `type: concept/model/practice/critique` |
| 4 | `source` 写多个来源 | 违反 META-01 规范（单值限制） | 核心来源单值，次要来源放正文引用 |
| 5 | `project: "[[项目名]]"` | project 字段不加双链 | 写纯文本：`project: 项目名` |
| 6 | 添加 `version` 等非标准字段 | 超出 12 个字段上限，污染元数据 | 仅保留规范定义的标准字段 |
| 7 | 不查阅主文档直接修改 | 可能引入新错误 | 遇不确定情况先查 `01_知识库统一规范总纲` |

---

## 变更日志

| 版本 | 日期 | 变更内容 |
|:---|:---|:---|
| v1.0.0 | 2026-07-11 | 首次发布。从 `obsidian-yaml-spec` Skill 提取 YAML FrontMatter 规范，精简为系统文档。 |