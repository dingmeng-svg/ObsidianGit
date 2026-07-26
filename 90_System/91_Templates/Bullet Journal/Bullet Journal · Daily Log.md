---
title: "<% tp.date.now('YYYY-MM-DD') %>"
tags:
  - 日记
date: <% tp.date.now("YYYY-MM-DD") %>
weekday: <% tp.date.now("dddd", 0, tp.date.now("YYYY-MM-DD"), "zh-cn") %>
month: <% tp.date.now("YYYY-MM") %>
daily_promise: ""
---
<%*
let fileName = tp.date.now("YYYY-MM-DD") + "-Daily-Log";
let month = tp.date.now("YYYY-MM");
await tp.file.rename(fileName);
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
> ⚠️ 待处理 ≤ 7 条，超 14 天未动 → 删 | 跨日灵感请同步至 [[Collector|📥 Collector]]
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
let folder = '"A2_能力接口/Bullet Journal/Daily"';
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
FROM "20_Areas/A2_能力接口/Bullet Journal/Daily"
WHERE !completed 
  AND file.day = date(today) - dur(1 day)
  AND !contains(header.subpath, "今日闪念捕获")  
```

## A – 🌙 晚间反思 （解决问题的行动）
- 今日成就：
- 改进点：

## 习惯打卡

**此刻的清醒责任人**

- [ ] [habit:: 曦 · 启明 · 以守筑基] — 膈肌呼吸 2min + 收下巴自检 ×5
- [ ] [habit:: 午 · 承势 · 以执笃行] — 完成最重要那件事（先投一票）
- [ ] [habit:: 夕 · 观成 · 以校归正] — 复盘 + 丢弃烦恼

<details>
<summary>🏋️ 上交叉矫正训练 · 今日记录</summary>

> **W1 唤醒期**：全程自重/最轻弹力带，动作控制优先。疼痛 ≥4 分立即降阶或停止。

### 晨间（5 分钟）
- [ ] 膈肌呼吸 2min（仰卧屈膝，吸气鼓腹，呼气收腹，不耸肩）
- [ ] 收下巴自检 ×5（照镜子，水平后收）

### 正式训练（30 分钟，训练日填）
- [ ] 门框胸大肌拉伸 每侧 30s ×2
- [ ] 上斜方肌拉伸 每侧 30s ×2
- [ ] 胸锁乳突肌拉伸 每侧 30s ×2
- [ ] 网球松解枕下肌群 60s
- [ ] 泡沫轴胸椎伸展 8-10 次
- [ ] 靠墙收下巴 3×15
- [ ] Y-T-W 伸展 各 2×10
- [ ] 弹力带面拉 3×15
- [ ] 靠墙天使 3×12
- [ ] 猫牛式 ×10
- [ ] 膈肌呼吸 2min

### 工位重置（每 45 分钟）
- [ ] 收下巴 ×10 + 肩胛后缩 ×10

### 晚间复盘
**疼痛评分**：___/10  **完成等级**：___（0=未做 1=晨间 2=晨间+工位 3=全套）
**亮点**：
**不足**：
**明日调整**：

</details>

**周报种子**（选填）：[本周复盘时我想记住的一件事]

### 🌙 睡前三口气
1. 原谅今天没做好的：
2. 放下今天刺到我的：
3. 明天会更好一点，哪怕一点点：