---
title: Future Log Template
tags:
  - 系统文档
  - 知识管理/Bujo
date: <% tp.date.now("YYYY-MM-DD") %>
---
<%*
let fileName = "Future Log";
await tp.file.rename(fileName);
await tp.file.move("20_Areas/22_个人成长/Bullet Journal/Future Log/" + fileName);
_%>
# 🗓️ Future Log
> 📌 记录未来 6-12 个月的已知事件、截止日和长期计划。每月复盘时更新，过期月份自然移除。
## <% tp.date.now("YYYY年MM月") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P1M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P2M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P3M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P4M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P5M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P6M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P7M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P8M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P9M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P10M") %>
- ! 
- [ ] 
## <% tp.date.now("YYYY年MM月", "P11M") %>
- ! 
- [ ] 
---
> 🗑️ 每月复盘时，删除已过期的月份区块，并在末尾新增未来第 12 个月。