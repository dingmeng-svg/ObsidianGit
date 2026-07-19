---
title: Monthly Template
tags:
  - 系统文档
  - 知识管理/Bujo
month: <% tp.date.now("YYYY-MM") %>
date: <% tp.date.now("YYYY-MM-DD") %>
---
<%*
let fileName = tp.date.now("YYYY-MM");
await tp.file.rename(fileName);
await tp.file.move("20_Areas/22_个人成长/Bullet Journal/Monthly/" + fileName);
_%>
# 📆 <% tp.date.now("YYYY年MM月") %> 月度日志

## 🎯 本月目标
1. 
2. 
3. 

## ✅ 本月习惯回顾
> 💡 每日打卡请前往 [[Habit Scorecard]]，周度汇总请查看各周周报。

## 📌 本月重要事件 / 截止日
- ! 
- ! 

## 📅 日历概览
```dataview
CALENDAR file.day
FROM "20_Areas/22_个人成长/Bullet Journal/Daily" OR "20_Areas/22_个人成长/Bullet Journal/Monthly"
WHERE dateformat(file.day, "yyyy-MM") = this.month
```

## 🔗 本月每日日志快速跳转
```dataview
LIST
FROM "20_Areas/22_个人成长/Bullet Journal/Daily" OR "20_Areas/22_个人成长/Bullet Journal/Monthly"
WHERE dateformat(file.day, "yyyy-MM") = this.month
SORT file.day ASC
```

## 🔥 本月未完成任务汇总
```dataview
TASK
FROM "20_Areas/22_个人成长/Bullet Journal/Daily" OR "20_Areas/22_个人成长/Bullet Journal/Monthly"
WHERE !completed AND dateformat(file.day, "yyyy-MM") = this.month
GROUP BY file.link
SORT file.day ASC
```

## 🔄 上月任务自动迁移
> ⚡ 点击按钮即可将上月未完成任务追加到「本月目标」下方

```dataviewjs
const lastMonth = moment().subtract(1, 'months');
const folder = "20_Areas/22_个人成长/Bullet Journal/Monthly";
const lastMonthlyPath = `${folder}/${lastMonth.format('YYYY-MM')}.md`;

if (!dv.app.vault.getAbstractFileByPath(lastMonthlyPath)) {
    dv.paragraph("⚠️ 未找到上月月记文件，请检查路径或手动迁移。");
} else {
    dv.button({
        label: "📥 拉取上月未完成任务",
        action: async () => {
            const page = dv.page(lastMonthlyPath);
            if (!page) return;
            
            const tasks = page.file.tasks
                .where(t => !t.completed && !t.header.subpath.includes("习惯"));
            
            if (tasks.length === 0) {
                new Notice("✅ 上月没有未完成的任务！");
                return;
            }
            
            const lines = tasks.map(t => `- [ ] ${t.text} *(来自 ${lastMonth.format('YYYY-MM')})*`);
            const currentFile = dv.app.workspace.getActiveFile();
            if (!currentFile) return;
            
            const content = await dv.app.vault.read(currentFile);
            const marker = "## 🎯 本月目标";
            const idx = content.indexOf(marker);
            if (idx === -1) {
                new Notice("❌ 未找到本月目标区块标记，请检查模板结构。");
                return;
            }
            
            const nextSection = content.indexOf("\n## ", idx + marker.length);
            const insertPos = nextSection === -1 ? content.length : nextSection;
            
            const newContent = content.slice(0, insertPos) 
                + "\n\n### 📋 上月遗留任务\n" + lines.join("\n") + "\n" 
                + content.slice(insertPos);
            
            await dv.app.vault.modify(currentFile, newContent);
            new Notice(`✅ 已迁移 ${tasks.length} 条任务`);
        }
    });
}
```

## 📓 本月笔记 / 灵感合集
- 

## 📝 月末复盘

**成就：**

**未完成及原因：**

**下月关键调整：**

### 📊 深度月复盘（原子习惯） `⏳ 每月末 1 小时`

> 以下为结构化深度复盘，为季复盘积累原始数据。

- **本月最大成就：**
- **本月最大障碍及应对：**
- **习惯系统调整：**（是否新增/废弃/调整习惯）
- **下月主题/关键词预设：**

> [!note]- 🌱 提炼与行动校准（点击展开）
> 本周/月/季度是否产生了值得固化的通用方法论、模型或教训？
> - [ ] 提炼为原子笔记：[[笔记名]]
> - [ ] 转化为下一步行动
> - [ ] 暂无可萃取内容

---
## 🏋️ 本月体态矫正汇总

```dataview
TABLE 
  filter(rows.file.name, (x) => contains(x, "Daily-Log")) AS "训练日",
  round(avg(rows.pain_score), 1) AS "均痛感",
  length(filter(rows, (r) => r.complete_level >= 3)) AS "达标天数"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily"
WHERE 
  contains(file.content, "pain_score:") AND 
  file.month = <% tp.date.now("YYYY-MM") %>
GROUP BY ""
```

### 月度里程碑确认
- [ ] W1-W2 唤醒期完成
- [ ] W3-W6 强化期完成
- [ ] W7-W8 整合期完成
