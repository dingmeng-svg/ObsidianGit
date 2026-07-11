---
title: 2026-Q2 Review
date: 2026-07-02
status: active
tags:
  - 个人成长
type: quarterly-review
aliases: []
related:
  - "[[2026 Annual Compass]]"
  - "[[2026 Future Log]]"
---

# 📅 2026 Q2 (04月 ~ 06月) 季度复盘

> 🎯 年度战略与月度执行之间的校准层。季度末用 2 小时完成。
> 完成后请手动勾选 [[2026 Annual Compass]] 中的对应季度检查点。

---

## 1. 本季月报回顾

> 在深入分析前，请先快速重读以下三份月报的「月末复盘」区块：

- [[2026-04]]（第 1 月）
- [[2026-05]]（第 2 月）
- [[2026-06]]（第 3 月）

---

## 2. 三大目标达成情况

> 💡 以下自动聚合本季三个月报中「本月目标」的完成情况。请在表格后补充定性评估。

```dataviewjs
const now = new Date();
const y = now.getFullYear().toString();
const m = now.getMonth();
const q = Math.floor(m / 3) + 1;
const qStart = String((q - 1) * 3 + 1).padStart(2, "0");
const qEnd = String(q * 3).padStart(2, "0");

const targetFolder = "20_Areas/22_个人成长/Bullet Journal/Monthly";

const pages = dv.pages(`"${targetFolder}"`)
    .where(p => p.file.name >= `${y}-${qStart}` && p.file.name <= `${y}-${qEnd}`)
    .sort(p => p.file.name, 'asc');

const data = pages.map(p => {
    const goals = p.file.tasks.filter(t => 
        t.section && t.section.subpath && t.section.subpath.includes("本月目标")
    );

    const goalItems = goals.map(t => {
        const icon = t.completed ? "✅" : "❌";
        return `${icon} ${t.text}`;
    }).join("<br>");

    const completedCount = goals.filter(t => t.completed).length;
    const uncompletedCount = goals.filter(t => !t.completed).length;

    return [
        p.file.link,
        goalItems || "—",
        completedCount,
        uncompletedCount
    ];
});

if (data.length === 0) {
    dv.paragraph("> ⚠️ 未找到本季月报文件，请确认路径和文件名格式是否正确。");
} else {
    dv.table(["月报", "本月目标项", "已完成", "未完成"], data);
}
```

### ✏️ 定性补充（自动表格未覆盖的关键成果）

-   
-   
-   

---

## 3. 身份对齐检查

> 参考 [[身份认同（原子习惯）]]

-   我的行为是否在为我想成为的人投票？
    -   [ ] 是
    -   [ ] 部分
    -   [ ] 偏离了
-   **本季最符合该身份的一个行为：**
-   **本季最背离该身份的一个行为：**

---

## 4. 月度趋势洞察

> 💡 请直接查阅以下资源后，记录跨越三个月的模式与趋势：
> -   [[Habit Scorecard]]（三个月打卡数据一览）
> -   上方 2 中的月报链接 → 各月「月末复盘」区块

| 维度 | 观察到的模式 | 是否需要调整 |
| :--- | :--- | :--- |
|      |              |              |
|      |              |              |
|      |              |              |

---

## 5. 重要转折点

-   

---

## 6. 年度进度校准

> 年度目标详见 [[2026 Annual Compass]]

| 年度关键成果 | 本季推进 | 全年进度判断                |
| :----------- | :------- | :-------------------------- |
|              |          | 🟢 正常 / 🟡 滞后 / 🔴 需调整 |
|              |          |                             |
|              |          |                             |

---

## 7. 下季度规划

### 下季主题：

### 核心聚焦：

1.  
2.  
3.  

### 决定放弃的：

> 停止做某事，往往比开始做某事更重要。

---
