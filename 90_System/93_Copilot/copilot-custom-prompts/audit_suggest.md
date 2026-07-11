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
