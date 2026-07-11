---
tags: [weekly, bujo]
week: 2026-W18
start_date: 5月n0下午2026
end_date: 2un0下午2026
month: 2026-05
---
# 📅 周记录：2026年第18周
> 从 `undefined` 到 `undefined`

## 🎯 本周三大目标（来自月度目标拆解）
1. 
2. 
3. 

## 📌 本周固定日程 / 事件
- ! 
- ! 

## ✅ 本周习惯追踪（打卡）
- 运动：⚪⚪⚪⚪⚪⚪⚪（一二三四五六日）
- 阅读：⚪⚪⚪⚪⚪⚪⚪
- 冥想：⚪⚪⚪⚪⚪⚪⚪

## 🔥 本周未完成任务汇总（来自每日日志）

```dataview

TASK
FROM "Bullet Journal/Daily Logs"
WHERE !completed
  AND file.day >= date("undefined")
  AND file.day <= date("undefined")
GROUP BY file.link
SORT file.day ASC
```

## 📝 本周笔记 / 反思

**成就：**

**障碍：**

**下周计划：**

## 🔄 迁移到下周

手动复制本周未完成但重要的任务到下周周模板的「本周三大目标」或「下周计划」

- [ ]
    
- [ ]

## 🔄 迁移到下周

自动读取上周未完成的任务，请在新的一周内点击运行：

```dataviewjs
// 计算上一周的周记文件名
const lastWeek = moment().subtract(1, 'weeks');
const lastWeekStart = lastWeek.startOf('week').format('YYYY-MM-DD');
const lastWeekEnd = lastWeek.endOf('week').format('YYYY-MM-DD');
const lastWeeklyFile = 'Weekly Logs/' + lastWeek.format('YYYY-[W]WW');  // 请根据你的周记实际存放位置修改

async function rolloverTasks() {
    const file = app.vault.getAbstractFileByPath(lastWeeklyFile + '.md');
    if (!file) {
        dv.paragraph('⚠️ 未找到上周周记文件，请手动迁移。');
        return;
    }
    
    const content = await app.vault.read(file);
    const taskLines = content.split('\n')
        .filter(line => line.trim().startsWith('- [ ]') && !line.includes('⚪'));
    
    if (taskLines.length === 0) {
        dv.paragraph('✅ 上周没有未完成的任务，恭喜！');
        return;
    }
    
    const taskList = taskLines.map(line => {
        const cleaned = line.replace(/- \[ \] /, '').trim();
        return `- [ ] ${cleaned} (来自 [[${lastWeeklyFile}]])`;
    }).join('\n');
    
    dv.span('📋 以下是上周未完成的任务，请复制到下方列表：\n\n' + taskList);
}

rolloverTasks();
```
