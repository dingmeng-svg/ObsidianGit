---
title: "Obsidian 多端同步方案摘要"
date: 2026-07-16
tags: [技术, 素材]
source: "[[Obsidian 高性价比多端同步方案：Remotely Save + 腾讯云COS 全流程实操指南-2026年07月12日-来自【Get 笔记】]]"
related:
  - "[[同步与图床的存储桶复用原则]]"
  - "[[Remotely Save + COS 同步配置方案]]"
---

# Obsidian 多端同步方案摘要

**来源**：Get 笔记
**提炼产物**：
- [[同步与图床的存储桶复用原则]]（concept）
- [[Remotely Save + COS 同步配置方案]]（practice）

## 核心内容

### 方案架构
Remotely Save 插件 + 腾讯云 COS 对象存储，实现 Windows/Mac/Android/iOS 全平台同步。

### 关键原则
同一 COS 存储桶可通过不同访问权限策略同时承载图床和同步功能（存储桶复用）。

### 配置步骤
1. 创建 COS 存储桶
2. 获取 SecretId 和 SecretKey
3. 安装 Remotely Save 插件
4. 配置 S3 兼容连接
5. 设置同步策略（双向/单向）
6. 移动端同样配置