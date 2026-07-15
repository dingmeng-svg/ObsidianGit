---
title: Daily Template
tags:
  - 系统文档
  - 知识管理/Bujo
date: <% tp.date.now("YYYY-MM-DD") %>
weekday: <% tp.date.now("dddd", 0, tp.date.now("YYYY-MM-DD"), "zh-cn") %>
month: <% tp.date.now("YYYY-MM") %>
---
<%*
let fileName = tp.date.now("YYYY-MM-DD");
let month = tp.date.now("YYYY-MM");
await tp.file.rename(fileName);
await tp.file.move("20_Areas/22_个人成长/Bullet Journal/Daily/" + month + "/" + fileName);
_%>
# <% fileName %>

# <% tp.date.now("YYYY-MM-DD dddd") %>

| 符号  | Markdown 写法     | 含义          |
| --- | --------------- | ----------- |
| •   | `- [ ]`         | 任务（未完成）     |
| ✔   | `- [x]`         | 任务完成        |
| >   | `>` 或 `- [ ] >` | 迁移到未来/其他日期  |
| <   | `- [ ] <`       | 计划中（日程待定）   |
| 👁  | `- !`           | 事件（用感叹号或表情） |
| 📝  | `- Note`        | 普通笔记        |
| *   | `*` 重点 / C 检查  | 优先标记或检查确认项 |

> 🗣️ 今天输入的每一行字，都在编译明天的我。
> 我的系统在运转，我的注意在到位。
> 一步，就一步。

---

## P – 今日计划（时间）

## 🎯 今日优先任务（最多3件）
- [ ] 
- [ ] 
- [ ] 

## 📅 事件 / 日程
- ! 
- ! 

## D – 执行记录 （结果）
> 随手记录：灵感、临时任务、观察、闪念

## 📋 任务清单（待办）
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 

## ⚡ 今日闪念捕获
> ⚠️ 待处理 ≤ 7 条，超 14 天未动 → 删 | 跨日灵感请同步至 [[Inbox_快速捕获|📥 全局收集箱]]
> 格式：`- [ ] 时间 来源/关键词 ｜ 触动点 ｜ 待处理动作`
- [ ] 
- [ ] 
- [ ] 
- [ ] 
- [ ] 

## 📝 快速笔记
- Note 灵感或观察
- 
- 
- 
- 

## 📌 从昨天迁移的闪念
```dataviewjs
let yesterday = dv.date("today").minus({days: 1});
let folder = '"20_Areas/22_个人成长/Bullet Journal/Daily"';
let yesterdayPage = dv.pages(folder)
    .where(p => p.file.day && p.file.day.ts === yesterday.ts)
    .first();
if (yesterdayPage) {
    let tasks = yesterdayPage.file.tasks
        .where(t => !t.completed && t.header.subpath.includes("今日闪念捕获"));
    if (tasks.length) {
        dv.taskList(tasks);
    } else {
        dv.paragraph("✅ 昨天没有遗留的闪念。");
    }
} else {
    dv.paragraph("📭 未找到昨天的日记文件。");
}
```

## 🔁 从昨天迁移的任务
```dataview
TASK
FROM "20_Areas/22_个人成长/Bullet Journal/Daily"
WHERE !completed 
  AND file.day = date(today) - dur(1 day)
  AND !contains(header.subpath, "今日闪念捕获")  
```

## A – 🌙 晚间反思 （解决问题的行动）
- 今日成就：
- 改进点：

## 习惯打卡

- [ ] [habit:: 读书] - 
- [ ] [habit:: 运动] - 
- [ ] [habit:: 冥想] - 

**周报种子**（选填）：[本周复盘时我想记住的一件事]

### 🌙 睡前三口气
1. 原谅今天没做好的：
2. 放下今天刺到我的：
3. 明天会更好一点，哪怕一点点：