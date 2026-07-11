---
title: T_Video_Source
date: <% tp.date.now("YYYY-MM-DD") %>
time: <% tp.date.now("HH:mm") %>
tags:
  - source/video
  - status/inbox
platform: <% tp.系统文档.suggester(["微信视频号", "抖音", "B站", "YouTube", "小红书", "其他"], ["微信视频号", "抖音", "B站", "YouTube", "小红书", "其他"]) %>
creator:
video_title: <% tp.file.title %>
snapshot:
url:
---
tags: [系统文档]
---

# <% tp.file.title %>

## 📌 溯源信息

| 字段 | 内容 |
| :--- | :--- |
| **平台** | `= this.platform` |
| **博主/UP主** | `填入博主昵称或ID` |
| **视频标题** | `<% tp.file.title %>` |
| **原始链接** | `[若有URL请粘贴]` |
| **采集日期** | `= this.date` |
| **截图存档** | `!截图_<% tp.date.now("YYYYMMDD") %>_<% tp.file.title %>.png` |

> [!info] 微信视频号特别说明
> 若为微信视频号，暂无公开URL。回看方式：在微信搜索 `博主昵称` 或视频标题关键词。

## 🎬 内容摘要

### 核心观点
- 

### 关键信息点
- 
- 

### 金句摘录
> 

### 博主立场/视角
- [ ] 情感咨询
- [ ] 心理学专业
- [ ] 个人经验分享
- [ ] 社会评论
- [ ] 其他：___

## 📎 附件与备注

- **截图/录屏**：`90_System/Attachments/截图_<% tp.date.now("YYYYMMDD") %>_<% tp.file.title %>.png`
- **个人第一反应**：

## 🔗 后续加工入口

- [ ] 待提炼原子概念 → `20_Atomic_Notes/Concepts/`
- [ ] 待批判反驳 → `20_Atomic_Notes/Critiques/`
- [ ] 待归纳模型 → `20_Atomic_Notes/Models/`
- **关联笔记**：``

---
*Created: <% tp.date.now("YYYY-MM-DD HH:mm") %>*