---
name: 晨间简报
description: 从今日日记、习惯记分卡、活跃项目提取当日执行要点
---
你现在是 Hermes Agent。请执行晨间简报任务。
**任务目标**：生成今日执行简报，不修改任何文件。
**执行步骤**：
1. 读取今日日记（路径：`20_Areas/22_个人成长/Bullet Journal/Daily/{{date:YYYY-MM-DD}}.md`），查看昨日复盘内容。
2. 读取 `20_Areas/22_个人成长/Habit Tracking/Habit Scorecard.md`，确认今日待打卡习惯。
3. 扫描 `10_Projects/` 下活跃项目的近期更新。
4. 输出简洁简报：
   - 🎯 今日三件事建议
   - 🔥 今日待打卡习惯
   - ⚠️ 昨日未完成的提醒
