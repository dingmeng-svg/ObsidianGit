---
title: "Obsidian 图床搭建全指南摘要"
date: 2026-07-16
tags: [技术, 素材]
source: "[[Obsidian 图床搭建全指南：解决笔记库臃肿、同步慢痛点（MacWindows双平台适配）-2026年07月12日-来自【Get 笔记】]]"
related:
  - "[[图床解耦——图片与笔记分离的存储原理]]"
  - "[[PicGo + Image Auto Upload 图床链路搭建]]"
---

# Obsidian 图床搭建全指南摘要

**来源**：Get 笔记
**提炼产物**：
- [[图床解耦——图片与笔记分离的存储原理]]（concept）
- [[PicGo + Image Auto Upload 图床链路搭建]]（practice）

## 核心内容

### 图床原理
图片上传到云端 COS 存储桶，本地笔记只保留文本链接，实现图片与笔记分离。

### 架构
- **Image Auto Upload 插件**：拦截粘贴行为，自动上传
- **PicGo 客户端**：处理实际上传到 COS
- 两者职责分离，互补工作

### 优势
- 笔记库大幅瘦身（图片不占本地空间）
- 多端同步更快（只需同步文本）
- 图片统一管理