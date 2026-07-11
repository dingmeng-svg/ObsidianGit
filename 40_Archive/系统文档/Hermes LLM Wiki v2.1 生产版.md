
---
title: "Hermes LLM Wiki v2.1 生产版"
date: 2026-06-28
status: archived
tags:
  - 归档
  - 系统文档
aliases:
  - "LLM Wiki 生产版"
source: "内部编译"
related:
  - "[[LLM Wiki]]（旧链接）"
---

这套方案的核心哲学是：**让 Hermes 成为知识网络的"共建者"而非"隔壁邻居"，通过元数据控制替代物理隔离，实现"融合但不混淆"。**
以下是你可以直接复制、部署到 Obsidian 仓库中的全套定稿文件与执行指南。
---
### 一、 目录结构微调（兼容现有 v1.0 体系）
无需大改现有结构，只需在对应层级新增几个关键目录：
```text
Vault/
├── 00_Inbox/
│   └── _raw/                 # 🆕 唯一原料入口（零分类，Hermes 只读不删不移动）
├── 30_Resources_…/
│   ├── 31_Atomic_Notes/      # 【人机融合区】AI 产物与人类笔记按子类共存
│   ├── 32_MOCs/              # 【索引层】统一链接 31 层的所有页面
│   ├── 33_Summaries/         # 🆕 逐篇源文件摘要页
│   └── 34_Synthesis/         # 🆕 综合问答/深度分析归档
├── 40_Archive_…/             # 冷启动时的语义检索源
└── 90_System/
    ├── HERMES.md             # 🆕 Hermes 操作规则与 SOP（最高准则）
    ├── audit/
    │   └── resolved/         # 🆕 已处理的反馈记录归档
    ├── 记忆交接快照/         # Hermes 每次操作后更新“知识库状态摘要”
    ├── Worklogs/             # Hermes 操作日志（含并发写入保护）
    └── 93_Copilot/
        └── copilot-custom-prompts/ # 存放下方三个调度微码模板
```
---
### 二、 核心规则手册：`90_System/HERMES.md`
请将以下内容保存为 `90_System/HERMES.md`。这是 Hermes 执行任务前的必读文件。
```markdown
# Hermes 知识库操作规则 v2.1 (生产版)
> 本文件是 Hermes Agent 在知识库中执行 LLM Wiki 编译、维护、纠错任务的最高准则与 SOP。
> 核心策略：所有 AI 产物与人类笔记通过 YAML 元数据分级控制，实现“融合但不混淆”。
## 一、核心铁律
1. **Raw 只读原则**：`00_Inbox/_raw/` 是唯一的编译输入源。永远只读、不改、不删、不移。
2. **人类领地尊重原则**：
   - `31_Atomic_Notes/` 中 `human_edited: true` 的页面 → **绝对禁止覆盖正文**。Hermes 仅可在文末 `## 🤖 Hermes 补充` 区块追加内容，并标注 `suggested_at: YYYY-MM-DD`。
   - `31_Atomic_Notes/` 中无此标记的页面 → 允许增量更新，但必须在 YAML 中添加 `last_ai_edit: YYYY-MM-DD` 和 `ai_edit_summary: "简述本次修改"`。
3. **统一归位原则**：
   - 取消任何形式的 AI 独立物理目录。AI 编译产物必须按内容属性落入现有 PARA 结构：
     - 概念/模型/批判/实践/人物 → `30_Resources/31_Atomic_Notes/` 对应子类
     - 摘要 → `30_Resources/33_Summaries/`
     - 综合分析/MOC → `30_Resources/32_MOCs/` 或 `34_Synthesis/`
   - 所有 AI 生成页面必须包含 `ai_generated: true` 字段。
4. **日志强制记录**：
   - 任何 Ingest、Lint、Audit 操作完成后，必须按日期追加记录到 `90_System/Worklogs/`，并更新 `90_System/记忆交接快照/` 中的知识库状态摘要。
   - **[工程加固] 并发写入保护**：写入 Worklogs 时，若当日文件已存在，必须先读取全文 → 在内存中追加新条目 → 再整体写回。**禁止使用 append-only 模式直接追加**，防止并发覆盖。每次写入前检查文件最后修改时间，若距上次写入 < 3秒，主动等待 3 秒后再执行。
## 二、首次写入协议
当 Hermes 首次在 `31_Atomic_Notes/` 中创建新页面时，除了标记 `ai_generated: true` 和 `status: draft`，必须在页面顶部添加以下 Callout（使用默认展开语法以确保兼容性）：
> [!note] 🤖 Hermes 自动生成 · 待人类审核
> 本文由 Hermes 从原始资料编译生成，尚未审核。
> 如需保留并防止 AI 后续覆盖，请在 YAML 中添加 `human_edited: true`。
## 三、Ingest 编译规则
- **触发条件**：当 `00_Inbox/_raw/` 中有新增文件，或收到人类针对特定文件的显式编译指令时。
- **工作流**：
  1. **[工程加固] 路径解析**：若显式指令中的文件路径变量（如 `{{file_path}}`）未被自动替换或为空，必须立即停止并询问：“请提供需要编译的原始文件完整路径。”**禁止猜测或扫描整个 `_raw/` 目录。**
  2. 读取目标原始资料，生成结构化摘要，存入 `30_Resources/33_Summaries/`。摘要 YAML 必须包含 `sources: [[00_Inbox/_raw/.../文件名]]` 和 `ai_generated: true`。
  3. 提取概念/实体 → **先查 `31_Atomic_Notes/` 是否已有同名或近义页面**：
     - 已有 + `human_edited: true` → 仅在文末追加 `## 🤖 Hermes 补充` 区块。
     - 已有 + 无人类编辑标记 → 增量更新正文，YAML 记录 `last_ai_edit` 和 `ai_edit_summary`。
     - 不存在 → 新建页面，严格执行【首次写入协议】，标记 `ai_generated: true`, `status: draft`。
  4. 建立双向链接：优先链接到 `31_Atomic_Notes/` 中的人类笔记，其次才是其他 AI 生成页。
  5. 更新 `32_MOCs/` 下的相关索引页（如 `_Master_Index.md`），使其链接到所有相关的 31 层笔记。
  6. 被动推荐：基于语义相似度，从 `40_Archive/` 检索 ≤3 篇相关旧笔记，在 Summary 末尾以 `## 📚 可能相关的历史笔记` 列出（仅标题+链接）。
## 四、Lint 健康检查规则
- **触发条件**：收到人类显式指令，或定期维护时。
- **扫描范围**：全库（含 `31_Atomic_Notes/`, `33_Summaries/`, `32_MOCs/`, `34_Synthesis/`）。
- **检查项**：
  1. 孤儿页面（无入链）。
  2. 断链。
  3. **跨层矛盾检测**：当 `31_Atomic_Notes/` 中某概念的描述与 `33_Summaries/` 中源文件摘要明显冲突时，自动在冲突页面 YAML 中添加 `audit: "high: 跨层概念矛盾"`。
  4. **人类编辑陈旧检测**：`human_edited: true` 且 `modified` 日期超过 90 天的页面，在 Lint 报告中提醒人类复核。
- **报告输出**：输出到 `90_System/Worklogs/` 当日日志中，并向人类汇报核心发现。
## 五、Audit 反馈处理规则
- **信号识别**：扫描笔记 YAML 中的 `audit: "high"` 或 `audit: "low"` 字段，或正文中的 `%% audit_high: ... %%` 注释。
- **处理优先级**：
  - `high`：立即中断当前低优任务，优先处理。
  - `low`：加入待办队列，在 Weekly Review 或批量处理时统一修正。
- **闭环归档**：
  - 若目标页面 `human_edited: false`：直接修正错误内容，移除 audit 标记。
  - 若目标页面 `human_edited: true`：**绝对禁止直接修改原文**。在 `90_System/audit/resolved/` 生成建议文档，并在原页面文末追加 `## ⚠️ Audit 建议待确认` 区块，等待人类手动采纳。
```
---
### 三、 配套 Copilot Prompt 模板（调度微码）
将以下三个文件放入 `90_System/93_Copilot/copilot-custom-prompts/` 目录。
#### 1. `ingest_atomic_note.md`
```markdown
---
name: Ingest Raw to Wiki
description: 将选定的原始资料编译为摘要和原子笔记，并归位到 PARA 结构中。
---
你现在是 Hermes Agent。请严格按照 `90_System/HERMES.md` 中的【Ingest 编译规则】执行任务。
**任务目标**：
对当前打开的文件（或指定的文件路径：`{{file_path}}`）执行 Ingest 编译。
**执行步骤**：
1. 阅读目标文件内容。
2. 生成摘要：在 `30_Resources/33_Summaries/` 下创建/更新对应的摘要页，包含 YAML `sources: [[当前文件名]]` 和 `ai_generated: true`。
3. 提取概念/实体：
   - 在 `30_Resources/31_Atomic_Notes/` 的对应子目录中检查是否已存在。
   - 若存在且 `human_edited: true`：仅在文末追加 `## 🤖 Hermes 补充`。
   - 若存在且无保护标记：增量更新正文，YAML 记录 `last_ai_edit`。
   - 若不存在：新建页面，遵循【首次写入协议】添加顶部 Callout 和 YAML (`ai_generated: true`, `status: draft`)。
4. 建立双链：确保新建/更新的页面与相关笔记互链。
5. 被动推荐：尝试从 `40_Archive/` 检索 ≤3 篇相关旧笔记，链接在摘要页的 `## 📚 可能相关的历史笔记` 下。
6. 完成后，在 `90_System/Worklogs/` 的今日日志中追加记录（注意并发写入保护）。
```
#### 2. `lint_cross_layer.md`
```markdown
---
name: Lint Cross Layer Health
description: 扫描全库孤儿页、断链以及人机概念矛盾，输出健康报告。
---
你现在是 Hermes Agent。请严格按照 `90_System/HERMES.md` 中的【Lint 健康检查规则】执行任务。
**任务目标**：
对知识库的 `30_Resources/`（含 31, 32, 33 目录）进行跨层健康检查。
**执行步骤**：
1. 扫描 `31_Atomic_Notes/`, `33_Summaries/`, `32_MOCs/`。
2. 识别无入链的孤儿页面。
3. 识别指向不存在文件的断链。
4. 跨层矛盾检测：抽样检查 `31_Atomic_Notes/Concepts/` 中的核心概念定义，与 `33_Summaries/` 中源文件摘要是否冲突。若冲突，在原子笔记的 YAML 中添加 `audit: "high: 跨层概念矛盾"`。
5. 人类编辑陈旧检测：列出 `human_edited: true` 且 `modified` 日期 > 90 天的笔记。
6. 将完整的体检报告输出/追加到 `90_System/Worklogs/` 的今日日志中，并在屏幕上向我汇报核心发现。
```
#### 3. `audit_suggest.md`
```markdown
---
name: Process Audit Signal
description: 扫描并处理全库的 audit 信号，针对人类保护区生成建议而非直接修改。
---
你现在是 Hermes Agent。请严格按照 `90_System/HERMES.md` 中的【Audit 反馈处理规则】执行任务。
**任务目标**：
扫描并处理知识库中的 Audit 反馈信号。
**执行步骤**：
1. 扫描全库 YAML 中的 `audit` 字段和正文中的 `%% audit_%%` 注释。
2. 提取所有 `high` 优先级信号，立即处理：
   - 检查目标页面是否标记 `human_edited: true`。
   - 若否：直接修正错误内容，移除 audit 标记。
   - 若是：**绝对不修改原文**。在 `90_System/audit/resolved/` 新建建议文档，并在目标页面文末追加 `## ⚠️ Audit 建议待确认` 区块（包含修改建议）。
3. 汇总所有 `low` 优先级信号，列入待办列表等待后续批量处理。
4. 完成后，在 `90_System/Worklogs/` 的今日日志中记录处理结果，并通知我确认。
```
---
### 四、 部署检查清单与试点策略
在你执行第一次 Ingest 之前，请逐项确认：
| # | 检查项 | 状态 |
| :--- | :--- | :--- |
| 1 | `00_Inbox/_raw/` 目录已创建且为空 | ☐ |
| 2 | `30_Resources/33_Summaries/` 目录已创建 | ☐ |
| 3 | `90_System/audit/resolved/` 目录已创建 | ☐ |
| 4 | `HERMES.md` 已放入 `90_System/` 根目录 | ☐ |
| 5 | 三个 Prompt 模板已放入 `93_Copilot/copilot-custom-prompts/` | ☐ |
| 6 | 已在 Hermes 记忆交接快照中记录 `HERMES.md` 和 `_Master_Index.md` 的路径 | ☐ |
| 7 | Callout 已改为默认展开语法，兼容性已验证 | ☐ |
| 8 | 并发写入保护规则已写入 `HERMES.md` | ☐ |
**🎯 首次试点策略（碰撞测试）**：
不要选纯陌生内容，**选一篇你已经读过且有自己笔记的文章**放入 `_raw/`。这样一次测试就能验证两条核心链路：
1. **新建路径**：Hermes 能否正确生成新 Summary + 新 Atomic Note + Callout。
2. **碰撞路径**：当提取的概念与你已有的 `human_edited: true` 笔记重合时，是否正确触发了“仅追加补充”的保护机制。
完成部署和首次测试后，随时把 Hermes 的 Worklog 贴给我，我们一起来做“产后体检”！
