---
title: "Obsidian 踩坑记录 —— Callout 色条无法覆盖"
date: 2026-07-16
tags: [系统文档, 技术, 知识管理]
status: active
type: practice
source: 原创
author: 丁萌
related:
  - "[[90_System/系统文档/15_Hermes Agent Skill 清单]]"
  - "[[🏠 首页]]"
---

# Obsidian 踩坑记录 —— Callout 色条无法覆盖

## 问题描述

首页底部两个 Callout 模块（`[!faq]` 洞察模块和 `[!example]` 系统规范模块）左侧有一条紫色竖条，无法通过 CSS 片段清除。

## 尝试过的方案（全部失败）

| 轮次 | 方案 | 选择器 | 结果 |
|------|------|--------|------|
| 1 | `border-left: none !important` | `.homepage .callout` | ❌ |
| 2 | `border-left: none !important` | `.homepage .callout[data-callout="faq"]` | ❌ |
| 3 | 无前缀全局选择器 | `.callout[data-callout="faq"]` | ❌ |
| 4 | `--callout-color: transparent !important` | `.callout[data-callout="faq"]` | ❌ |
| 5 | `::before { display: none }` | `.callout::before` | ❌ |
| 6 | `--callout-color: 0, 0, 0 !important` | `.callout[data-callout="faq"]` | ❌ |
| 7 | `outline: 1px solid #fff` | `.callout[data-callout="faq"]` | ❌ |
| 8 | `--callout-color: 255,255,255 !important` | `.callout[data-callout="faq"]` | ❌（开发者工具显示被划删除线） |
| 9 | `border-inline-start: none !important` | `.callout[data-callout="faq"]` | ❌ |
| 10 | `border-inline-start-color: #fff !important` | `.callout[data-callout="faq"]` | ❌ |

## 根因

Obsidian 的 Callout 左侧色条由 **`--callout-color` CSS 变量**控制，该变量在 Obsidian 核心样式 `app.css` 中定义。CSS 片段（snippets）的 `!important` **无法覆盖**核心样式中的 CSS 变量定义——这是 Obsidian 渲染引擎的已知行为，属于内核层级的限制，不是选择器权重问题。

开发者工具中确认：我们的 `--callout-color: 255,255,255 !important` 被 `app.css` 的原始规则以**删除线**标记覆盖。

## 影响范围

- 所有使用 `[!faq]` 和 `[!example]` 类型 Callout 的页面
- 仅影响左侧色条颜色，不影响 Callout 功能、布局、背景
- 浅色模式下为紫色（RGB: `162, 124, 209`），深色模式待确认

## 结论

**无法通过 CSS 片段解决。** 这是 Obsidian 核心样式的保护机制，属于已知限制。如需彻底解决，需要修改 Obsidian 主题或使用 CSS 主题覆写（非 snippets 方式）。

## 参考

- 涉及文件：`knowledge-home.css`（第 1178-1225 行有所有尝试过的代码）
- 相关系统文档：`90_System/系统文档/15_Hermes Agent Skill 清单.md`