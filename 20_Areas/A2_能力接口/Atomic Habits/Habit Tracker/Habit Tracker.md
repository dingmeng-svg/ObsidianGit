---
title: Habit Tracker
date: 2026-06-28
status: active
type: practice
fit_content_type: habit_tracker
tags: [个人成长, 习惯, 习惯追踪, Atomic Habits]
aliases: [习惯追踪器, 身份投票板]
---

# 身份投票板

> **这不是一个打卡工具。这是一台投票机。**
>
> 每一次 ✅ 都是向"我想成为的那个人"投出一票。
>
> > "Every action you take is a vote for the type of person you wish to become."
> > — James Clear, *Atomic Habits*, Ch.2


## 当前追踪文件

📅 本月自动识别：

```dataviewjs
let trackerFolder = '"20_Areas/A2_能力接口/Atomic Habits/Habit Tracker"';
let now = dv.luxon.DateTime.now();
let currMonth = now.toFormat("yyyy-MM");
let currMonthFile = dv.pages(trackerFolder)
    .where(p => p.file.name.startsWith(currMonth))
    .first();
if (currMonthFile) {
    dv.paragraph(`📅 [[${currMonthFile.file.name}]]`);
} else {
    dv.paragraph(`⚠️ 未检测到 ${currMonth} 月度追踪文件，请从模板生成。`);
}
```

📊 年度看板：[[2026 Annual Habit Tracker]]

📂 所有月度文件：

```dataviewjs
let trackerFolder = '"20_Areas/A2_能力接口/Atomic Habits/Habit Tracker"';
let monthFiles = dv.pages(trackerFolder)
    .where(p => p.file.name.match(/^\d{4}-\d{2}/))
    .sort(p => p.file.name, "desc");
dv.list(monthFiles.file.link);
```

> 每月 1 日：复制 `90_System/91_Templates/Habit Tracker Template.md` 到本目录，重命名为 `YYYY-MM Habit Tracker.md`，YAML 中 `month` 改为当前月份。


## 中断处理：永不连续错过两次

> > "Missing once is an accident. Missing twice is the start of a new habit."
> > — James Clear, *Atomic Habits*, Ch.16

| 情况 | 判定 | 行动 |
|:---|:---|:---|
| 漏 1 天 | 正常波动 | 次日正常执行。不补打，不自责。你投过的每一票都算数 |
| 连续漏 2 天 | ⚠️ 信号 | 执行极简版，用最小动作保住"我还在投票"的感觉 |
| 连续漏 3 天+ | 🔴 信号 | 在 Daily Log 写一句"发生了什么"，次日极简版重启 |

> 同一习惯 30 天内出现 2 次连续 3 天+ 断签 → 回 [[Habit Design Reference]] 做四定律排查。
> 单次断签不触发回流。


## 习惯定义与四定律

### 🌅 曦·启明·以守筑基

| 维度 | 设计 |
|:---|:---|
| **身份投票** | "我是一个珍视生命容器的人" |
| **提示（显而易见）** | 晨起双脚落地（习惯叠加） |
| **渴求（有吸引力）** | 做完后喝一大杯温水 |
| **反应（简便易行）** | 标准：膈肌呼吸 2min + 收下巴 ×5 + 门框拉伸 |
| | 极简：收下巴 ×3（10 秒） |
| **奖励（令人满足）** | 身体唤醒感 + Tracker 上的一勾 ✅ |

### 🌤️ 午·承势·以执笃行

| 维度 | 设计 |
|:---|:---|
| **身份投票** | "我是一个用行动定义认知的人" |
| **提示（显而易见）** | 打开电脑看到桌面（环境提示） |
| **渴求（有吸引力）** | 做完后允许 10 分钟自由浏览 |
| **反应（简便易行）** | 标准：完成最重要的一件事并投币 |
| | 极简：写下"今天最重要的一件事是___" |
| **奖励（令人满足）** | 划掉时的"咔哒"声 + Tracker 上的一勾 ✅ |

### 🌙 夕·观成·以校归正

| 维度 | 设计 |
|:---|:---|
| **身份投票** | "我是一个清醒的观察者" |
| **提示（显而易见）** | 躺在床上闭眼（习惯叠加） |
| **渴求（有吸引力）** | 复盘后调整枕头到最舒适姿势 |
| **反应（简便易行）** | 标准：一句话复盘 + 丢弃烦恼 |
| | 极简：问自己"今天值不值得"（1 分钟） |
| **奖励（令人满足）** | 安宁感 + Tracker 上的一勾 ✅ |


## 追踪强度分级

> 没有"毕业移除"，只有追踪强度降级。目的是释放注意力，同时防止退化。

| 追踪等级 | 判定标准 | 操作 |
|:---|:---|:---|
| 每日追踪 | 需要刻意提醒才能执行 | 保留在月度文件每日统计 |
| 每周抽查 | 自然发生，无需提醒；完成率 ≥ 90% | 每周日复盘确认 1 次 |
| 月度巡检 | 完全融入身份，执行无心理阻力 | 纳入 [[Habit Scorecard#稳定正向行为库]]，每月审计确认 |


## 刻意练习：防止自动化退化

> > "Habits + Deliberate Practice = Mastery." — Ch.11

| 习惯 | 当前版本 | 刻意练习方向（进入身份期后启用） |
|:---|:---|:---|
| 曦·启明 | 膈肌呼吸 2min + 收下巴 ×5 + 门框拉伸 | 延长呼吸至 3min；加入胸椎旋转；关注呼吸质量 |
| 午·承势 | 完成最重要的一件事并投币 | 90 分钟时间盒；完成后写一句"我学到了什么" |
| 夕·观成 | 一句话复盘 + 丢弃烦恼 | 写 3 句话；每周一次完整复盘（绑定周复盘） |


## 连续投票

> 起始日期：2026-06-28
> 归零不代表之前的票作废——你已经是那种人了，只是今天没投票。

```dataviewjs
let diaryFolder = '"20_Areas/A2_能力接口/Bullet Journal/Daily"';
let now = dv.luxon.DateTime.now();

let pages = dv.pages(diaryFolder)
    .where(p => p.file.day && p.file.day >= dv.date("2026-06-28") && p.file.name != "Bullet Journal Daily")
    .sort(p => p.file.day, "desc");

let habits = ["曦 · 启明 · 以守筑基", "午 · 承势 · 以执笃行", "夕 · 观成 · 以校归正"];
let emojis = { "曦 · 启明 · 以守筑基": "🌅", "午 · 承势 · 以执笃行": "🌤️", "夕 · 观成 · 以校归正": "🌙" };

let result = [];
for (let h of habits) {
    let currentStreak = 0;
    let maxStreak = 0;
    let tempStreak = 0;
    let inStreak = false;
    
    for (let p of pages) {
        let tasks = p.file.tasks;
        let found = tasks.find(t => t.text.includes(`[habit:: ${h}]`));
        let completed = found && found.completed;
        
        if (completed) {
            if (!inStreak) { inStreak = true; tempStreak = 0; }
            tempStreak++;
            if (tempStreak > maxStreak) maxStreak = tempStreak;
        } else {
            if (inStreak) {
                if (currentStreak === 0) currentStreak = tempStreak;
                inStreak = false;
            }
        }
    }
    if (inStreak && currentStreak === 0) currentStreak = tempStreak;
    
    result.push([`${emojis[h]} ${h}`, currentStreak, maxStreak]);
}

dv.table(["习惯", "当前连续投票", "最长连续投票"], result);
```