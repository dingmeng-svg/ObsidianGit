---
title: PicGo + Image Auto Upload 图床链路搭建
date: 2026-07-17
status: active
type: practice
tags: [技术]
source: "[[Obsidian 图床搭建全指南：解决笔记库臃肿、同步慢痛点（MacWindows双平台适配）-2026年07月12日-来自【Get 笔记】]]"
author: "Get达人"
aliases: []
related:
  - "[[图床解耦——图片与笔记分离的存储原理]]"
---

## 原子笔记

**触点判定**：潜在启发
**提纯**：Image Auto Upload + PicGo 的图床链路通过"插件拦截粘贴事件、客户端处理上传"的职责分离架构，实现了低故障率与全局通用的图床搭建。

---

**类型**：实践

**正文**：
这套图床链路的核心在于"各司其职"的职责分离设计。Image Auto Upload Plugin 只做一件事——拦截 Obsidian 内的粘贴/拖拽图片事件，将图片传给系统级客户端 PicGo。PicGo 则负责实际的上传逻辑：接收图片、调用云存储 API（如腾讯云 COS）、返回云端链接、自动插入笔记。整个过程 1-2 秒内完成，几乎无感。

**关键配置步骤**：
1. **腾讯云 COS 准备**：创建存储桶（访问权限选「公有读私有写」），生成 SecretID 和 SecretKey，预充 10 元即可长期使用。
2. **PicGo 配置**：安装后进入「图床设置→腾讯云 COS」，填写 COS 版本 V5、SecretID/SecretKey、存储桶名称和区域。切换至上传区测试单张图片。
3. **Obsidian 插件**：安装 Image Auto Upload Plugin，默认设置即可生效。
4. **可选增强**：使用 Paste Image Rename 自定义图片命名；在插件设置中配置 `|400` 统一约束图片展示尺寸。

**为什么选 PicGo：「插件做得越少，出问题的概率越小」**
- PicGo 是独立客户端，`Ctrl/Cmd+Shift+U` 可在任意软件中截图上传，不限于 Obsidian
- PicGo 插件生态覆盖腾讯云 COS、阿里云 OSS、AWS S3、Cloudflare R2、WebDAV 等
- 替代方案 Image Uploader 更轻量（无需额外客户端），但各存储服务配置项差异大

**Windows 平台差异**：仅 PicGo 默认开机自启（可关闭）；快捷键统一为 `Ctrl+Shift+U`；PicGo Cloud 跨平台同步配置。

**关键限定**：适合高频截图写教程类笔记、多设备同步、或笔记库已膨胀至数 GB 的用户。偶尔贴图的用户无需折腾。

**强对话链接**：
- 链接至 [[图床解耦——图片与笔记分离的存储原理]] | 理由：提供了该原理的具体实施链路
- 链接至 [[Obsidian 附件存放策略四选一切换自由]] | 理由：图床是附件管理的进阶方案，本地附件无法满足跨平台发布需求

**弱索引链接**：
- 待链接：PicGo 与其他截图工具（Snipaste、微信截图）的快捷键协同 #待补理由

**播种**：
1. 如果 PicGo Cloud 服务停止运营，多设备配置迁移的成本有多高？
2. Image Auto Upload 在 Obsidian 移动端的粘贴事件拦截是否可行？
3. Cloudflare R2 的免费额度在个人图床场景下能支撑多久？

**元数据**：
- 来源：[[Obsidian 图床搭建全指南：解决笔记库臃肿、同步慢痛点（MacWindows双平台适配）-2026年07月12日-来自【Get 笔记】]]
- 生命周期：种子
- 创建日期：2026-07-17
