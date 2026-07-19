---
title: Weekly Template
tags:
  - 系统文档
  - 知识管理/Bujo
week: <% tp.date.now("YYYY-[W]WW") %>
start_date: <% tp.date.weekday("Monday", "YYYY-MM-DD") %>
end_date: <% tp.date.weekday("Sunday", "YYYY-MM-DD") %>
month: <% tp.date.now("YYYY-MM") %>
---
<%*
let fileName = tp.date.now("YYYY-[W]WW");
await tp.file.rename(fileName);
await tp.file.move("20_Areas/22_个人成长/Bullet Journal/Weekly/" + fileName);
_%>
# 📅 周记录：<% tp.date.now("YYYY年[第]WW周") %>
> 从 `<% tp.frontmatter.start_date %>` 到 `<% tp.frontmatter.end_date %>`

## 📋 本周日记种子摘要

> Weekly Review 执行流程中，由 Hermes 自动读取本周日记的「周报种子」行，汇总为此列表。

<!-- Hermes 填充区域 -->

## 🎯 本周三大目标（来自月度目标拆解）
1. 
2. 
3. 
## 📌 本周固定日程 / 事件
- ! 
- ! 
## ✅ 本周习惯追踪
> 💡 每日打卡请前往 [[Habit Scorecard]] | 月末可用 Dataview 自动聚合统计
- [ ] 运动（周一）
- [ ] 运动（周二）
- [ ] 运动（周三）
- [ ] 运动（周四）
- [ ] 运动（周五）
- [ ] 运动（周六）
- [ ] 运动（周日）
- [ ] 阅读（周一）
- [ ] 阅读（周二）
- [ ] 阅读（周三）
- [ ] 阅读（周四）
- [ ] 阅读（周五）
- [ ] 阅读（周六）
- [ ] 阅读（周日）
- [ ] 冥想（周一）
- [ ] 冥想（周二）
- [ ] 冥想（周三）
- [ ] 冥想（周四）
- [ ] 冥想（周五）
- [ ] 冥想（周六）
- [ ] 冥想（周日）
## 🔥 本周未完成任务汇总（来自每日日志）
```dataview
TASK
FROM "20_Areas/22_个人成长/Bullet Journal/Daily" OR "20_Areas/22_个人成长/Bullet Journal/Weekly"
WHERE !completed
  AND file.day >= date("<% tp.frontmatter.start_date %>")
  AND file.day <= date("<% tp.frontmatter.end_date %>")
GROUP BY file.link
SORT file.day ASC
```
## 📊 深度周复盘（原子习惯） `⏳ 每周日晚 30min`

> 以下为结构化深度复盘。日常快速反思在上方「周反思」区完成。

### 本周 MIT 回顾
| MIT | 完成? | 备注 |
|-----|-------|------|
| | ✓ / ✗ | |

### 习惯趋势（本周打卡汇总）
> 由 [[Habit Scorecard]] 手动汇总，或前往各日记查看

### 学到了什么
- 

### 下周 MIT 规划
1. 
2. 
3. 

---

## 📝 本周笔记 / 反思
**成就：**
**障碍：**
**下周计划：**
## 🔄 上周任务自动迁移
> ⚡ 点击按钮即可将上周未完成任务追加到下方列表
```dataviewjs
const lastWeek = moment().subtract(1, 'weeks');
const folder = "20_Areas/22_个人成长/Bullet Journal/Weekly";
const lastWeeklyPath = `${folder}/${lastWeek.format('YYYY-[W]WW')}.md`;
if (!dv.app.vault.getAbstractFileByPath(lastWeeklyPath)) {
    dv.paragraph("⚠️ 未找到上周周记文件，请检查路径或手动迁移。");
} else {
    dv.button({
        label: "📥 拉取上周未完成任务",
        action: async () => {
            const page = dv.page(lastWeeklyPath);
            if (!page) return;
            
            const tasks = page.file.tasks
                .where(t => !t.completed && !t.header.subpath.includes("习惯追踪"));
            
            if (tasks.length === 0) {
                new Notice("✅ 上周没有未完成的任务！");
                return;
            }
            
            const lines = tasks.map(t => `- [ ] ${t.text} *(来自 ${lastWeek.format('[W]WW')})*`);
            const currentFile = dv.app.workspace.getActiveFile();
            if (!currentFile) return;
            
            const content = await dv.app.vault.read(currentFile);
            const marker = "## 🔄 上周任务自动迁移";
            const idx = content.indexOf(marker);
            if (idx === -1) {
                new Notice("❌ 未找到迁移区块标记，请检查模板结构。");
                return;
            }
            
            const nextSection = content.indexOf("\n## ", idx + marker.length);
            const insertPos = nextSection === -1 ? content.length : nextSection;
            
            const newContent = content.slice(0, insertPos) 
                + "\n" + lines.join("\n") + "\n" 
                + content.slice(insertPos);
            
            await dv.app.vault.modify(currentFile, newContent);
            new Notice(`✅ 已迁移 ${tasks.length} 条任务`);
        }
    });
}
```
## 📋 本周待办（含上周迁移项）
- [ ] 
- [ ] 

> [!note]- 🌱 提炼与行动校准（点击展开）
> 本周/月/季度是否产生了值得固化的通用方法论、模型或教训？
> - [ ] 提炼为原子笔记：[[笔记名]]
> - [ ] 转化为下一步行动
> - [ ] 暂无可萃取内容

> 🗓️ **月末操作**：若本月第一个周复盘，执行 [[操盘手骑士 · 产出物归档 SOP|上月股市数据播报产出物归档]]

---

## 📊 体态矫正周复盘

```dataview
TABLE 
  file.name AS "日期",
  pain_score AS "痛感分",
  complete_level AS "完成等级"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily"
WHERE 
  contains(file.content, "pain_score:") AND 
  file.week = <% tp.date.now("YYYY-[W]WW") %>
SORT file.name ASC
```

**本周核心指标**：
- 完整训练达标天数：___/7（完成等级 ≥3）
- 平均疼痛评分：___
- 体态改善直观感受：
- 下周微调方案：