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
