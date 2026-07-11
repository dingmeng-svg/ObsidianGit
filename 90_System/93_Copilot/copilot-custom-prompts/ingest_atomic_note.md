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
