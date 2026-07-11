---
title: 复盘SOP —— HTML产出标准
project: 操盘手骑士
type: visual-spec
tags:
  - 工作
status: active
version: "3.0"
last_update: 2026-07-01
usage: |
  将 Markdown 复盘稿转换为 HTML 网页的视觉呈现标准。 定义颜色系统、CSS 组件库、响应式布局、打印适配。 适用于交易日复盘和休市日审计两种场景的 HTML 发布。
related:
  - "[[操盘手骑士-MOC]]"
  - "[[每日A股复盘播报 SOP V4.1]]"
  - "[[A股每日复盘与休市审计 · 操作手册（人类阅读版）]]"
  - "[[股市数据播报 MOC]]"
---

# 📋 复盘SOP —— HTML产出标准

> **版本：V3.0 | 基于 V2.4 升级**
> **定位**：将 Markdown 复盘稿转换为 HTML 网页的视觉呈现标准。与 SOP_V4.0 配套使用。
> **修订记录**：V3.0（2026-07-01）—— 去宗教化（CSS 类名/模块名中性化）、修正非标准 CSS 值、关联 SOP 版本更新至 V4.0。


## 一、HTML设计原则

### 1.1 核心理念
**"信息即界面"——让读者在滚动中完成一次完整的认知旅程，而非阅读一份文档。**

### 1.2 设计四原则

| 原则 | 说明 | 实现方式 |
|:---|:---|:---|
| **情绪可视化** | 让读者在阅读前就知道"这趟旅程的情绪节奏" | 顶部固定情绪曲线条（😤→😊→🤔→💪） |
| **数据可扫描** | 关键数据在2秒内被捕捉 | 数据卡片网格（grid布局）+ 红绿颜色编码 |
| **节奏可感知** | 读者能感知"现在到哪个模块了" | 记忆锚点标签（蓝色胶囊按钮）+ 固定模块标题格式 |
| **暗色仪式感** | 收尾模块需与正文形成"空间切换" | 深色背景（#0f172a）+ 金色关键词（#facc15） |

### 1.3 颜色系统

| 用途 | 颜色值 | 使用场景 |
| :--- | :--- | :--- |
| 主蓝 | #3b82f6 | 模块标题左边框、记忆锚点标签、链接 |
| 涨/正 | #16a34a | 正收益、净流入、放量 |
| 跌/负 | #dc2626 | 负收益、净流出、缩量 |
| 警告/中性 | #f59e0b / #d97706 | 需注意的数据、金句框 |
| 卡片背景 | #f8fafc | 数据卡片、假设卡片 |
| 收尾深色背景 | #0f172a | `.theme-block`（每日市场心态主题模块） |
| 收尾金色 | #facc15 | 主题标题、关键词 |


## 二、HTML完整模板

### 2.1 文件头与样式（固定不变）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>YYYY-MM-DD [标题]</title>
    <style>
        /* ===== 1. 全局重置 ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background-color: #f5f7fa;
            font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'PingFang SC', 'Microsoft YaHei', sans-serif;
            padding: 2rem 1rem;
            line-height: 1.7;
            color: #1e293b;
        }

        .container {
            max-width: 880px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
            padding: 2.5rem 2.8rem;
        }

        /* ===== 2. 标题与副标题 ===== */
        h1 {
            font-size: 2.2rem;
            font-weight: 700;
            letter-spacing: -0.01em;
            margin-bottom: 0.15em;
            color: #0f172a;
        }

        .subhead {
            font-size: 1rem;
            color: #64748b;
            border-bottom: 1px solid #e9edf2;
            padding-bottom: 1.2rem;
            margin-bottom: 2rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }

        /* ===== 3. 情绪曲线 ===== */
        .emotion-bar {
            background: #f1f5f9;
            border-radius: 30px;
            padding: 0.5rem 1.2rem;
            margin-bottom: 1.8rem;
            display: inline-flex;
            align-items: center;
            gap: 0.8rem;
            font-size: 0.95rem;
            flex-wrap: wrap;
        }
        .emotion-bar .emoji { font-size: 1.4rem; }
        .emotion-bar .label { color: #475569; font-weight: 500; }
        .emotion-bar .arrow { color: #94a3b8; }

        /* ===== 4. 记忆锚点标签 ===== */
        .anchor-tag {
            display: inline-block;
            background: #dbeafe;
            color: #1d4ed8;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.15rem 0.8rem;
            border-radius: 30px;
            letter-spacing: 0.03em;
            margin-right: 0.5rem;
        }

        /* ===== 5. 模块标题 ===== */
        h2 {
            font-size: 1.5rem;
            font-weight: 600;
            margin-top: 2.2rem;
            margin-bottom: 0.6rem;
            color: #0f172a;
            border-left: 5px solid #3b82f6;
            padding-left: 1rem;
        }

        h3 {
            font-size: 1.2rem;
            font-weight: 600;
            margin-top: 1.6rem;
            margin-bottom: 0.4rem;
            color: #1e293b;
        }

        /* ===== 6. 数据卡片网格 ===== */
        .data-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
            gap: 0.8rem;
            background: #f8fafc;
            padding: 1.4rem 1.6rem;
            border-radius: 16px;
            margin: 1.2rem 0 1.8rem 0;
            border: 1px solid #eef2f6;
        }
        .data-item { display: flex; flex-direction: column; }
        .data-item .label {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.04em;
            color: #64748b;
        }
        .data-item .value {
            font-size: 1.2rem;
            font-weight: 600;
            color: #0f172a;
        }
        .data-item .value.green { color: #16a34a; }
        .data-item .value.red { color: #dc2626; }
        .data-item .value .small {
            font-size: 0.75rem;
            font-weight: 400;
            color: #64748b;
        }

        /* ===== 7. 可视化提示框 ===== */
        .viz-box {
            background: #f0fdf4;
            border-left: 4px solid #22c55e;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            margin: 0.6rem 0 1rem 0;
            font-size: 0.95rem;
            color: #166534;
        }
        .viz-box.red-box {
            background: #fef2f2;
            border-left-color: #ef4444;
            color: #991b1b;
        }
        .viz-box.blue-box {
            background: #eff6ff;
            border-left-color: #3b82f6;
            color: #1e3a8a;
        }

        /* ===== 8. 数据表格 ===== */
        .data-table-wrap {
            overflow-x: auto;
            margin: 1rem 0 1.6rem 0;
            border-radius: 12px;
            border: 1px solid #eef2f6;
        }
        .data-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.95rem;
        }
        .data-table th {
            background: #f1f5f9;
            text-align: left;
            padding: 0.6rem 1rem;
            font-weight: 600;
            color: #334155;
            border-bottom: 2px solid #dce1e9;
        }
        .data-table td {
            padding: 0.6rem 1rem;
            border-bottom: 1px solid #e9edf2;
        }
        .data-table tr:last-child td { border-bottom: none; }
        .data-table .highlight-green { color: #16a34a; font-weight: 600; }
        .data-table .highlight-red { color: #dc2626; font-weight: 600; }

        /* ===== 9. 新闻列表 ===== */
        .news-list {
            list-style: none;
            padding: 0;
            margin: 1rem 0 1.6rem 0;
        }
        .news-list li {
            padding: 0.5rem 0 0.5rem 1.8rem;
            border-bottom: 1px solid #f1f4f9;
            position: relative;
            font-size: 0.95rem;
        }
        .news-list li:last-child { border-bottom: none; }
        .news-list li::before {
            content: "▸";
            position: absolute;
            left: 0;
            color: #3b82f6;
            font-weight: 600;
        }
        .news-list .tag {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 600;
            padding: 0.05rem 0.6rem;
            border-radius: 30px;
            margin-right: 0.3rem;
        }
        .news-list .tag.green { background: #dcfce7; color: #16a34a; }
        .news-list .tag.red { background: #fee2e2; color: #dc2626; }
        .news-list .tag.gold { background: #fef3c7; color: #d97706; }
        .news-list .tag.blue { background: #dbeafe; color: #1d4ed8; }

        /* ===== 10. 深度拆解区块 ===== */
        .deep-dive {
            background: #fafcff;
            border-radius: 12px;
            padding: 1.2rem 1.6rem;
            margin: 1.2rem 0;
            border-left: 4px solid #3b82f6;
        }
        .deep-dive h4 {
            font-size: 1.05rem;
            font-weight: 600;
            margin-bottom: 0.3rem;
            color: #0f172a;
        }
        .deep-dive .emotion-tag {
            font-size: 0.85rem;
            color: #64748b;
            margin-bottom: 0.3rem;
        }

        /* ===== 11. 金句框 ===== */
        .golden-quote {
            background: #fffbeb;
            border-radius: 12px;
            padding: 1rem 1.4rem;
            margin: 1.2rem 0;
            border-left: 4px solid #f59e0b;
            font-size: 1.05rem;
            font-weight: 500;
            color: #78350f;
            text-align: center;
        }

        /* ===== 12. 假设卡片 ===== */
        .hypothesis-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin: 1rem 0 1.6rem 0;
        }
        .hypothesis-card {
            background: #f8fafc;
            border-radius: 12px;
            padding: 1rem 1.2rem;
            border: 1px solid #eef2f6;
        }
        .hypothesis-card .id {
            font-size: 0.7rem;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.04em;
        }
        .hypothesis-card .content {
            font-weight: 500;
            margin: 0.3rem 0 0.2rem 0;
            color: #0f172a;
        }
        .hypothesis-card .criteria {
            font-size: 0.85rem;
            color: #475569;
        }
        .hypothesis-card .confidence {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 600;
            padding: 0.1rem 0.6rem;
            border-radius: 30px;
            margin-top: 0.3rem;
        }
        .hypothesis-card .confidence.high { background: #dcfce7; color: #16a34a; }
        .hypothesis-card .confidence.medium { background: #fef3c7; color: #d97706; }
        .hypothesis-card .confidence.medium-high { background: #dbeafe; color: #1d4ed8; }

        /* ===== 13. 观察点列表 ===== */
        .watch-list {
            list-style: none;
            padding: 0;
            margin: 0.8rem 0 1.2rem 0;
        }
        .watch-list li {
            padding: 0.3rem 0 0.3rem 1.6rem;
            position: relative;
            border-bottom: 1px solid #f1f4f9;
            font-size: 0.95rem;
        }
        .watch-list li:last-child { border-bottom: none; }
        .watch-list li::before {
            content: "🔍";
            position: absolute;
            left: 0;
            font-size: 0.9rem;
        }

        /* ===== 14. 每日市场心态主题模块 ===== */
        .theme-block {
            background: #0f172a;
            color: #e2e8f0;
            border-radius: 20px;
            padding: 2rem 2.2rem;
            margin: 2.4rem 0 1.8rem 0;
        }
        .theme-block .day-title {
            font-size: 1.8rem;
            font-weight: 700;
            color: #facc15;
            letter-spacing: -0.01em;
        }
        .theme-block .sub {
            font-size: 0.85rem;
            color: #94a3b8;
            margin-top: -0.1rem;
            margin-bottom: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.06em;
        }
        .theme-block .verse {
            font-size: 0.9rem;
            color: #94a3b8;
            font-style: italic;
            border-left: 2px solid #475569;
            padding-left: 1rem;
            margin: 0.6rem 0 1rem 0;
        }
        .theme-block .mapping {
            font-size: 1.05rem;
            font-weight: 500;
            color: #f1f5f9;
            border-left: 3px solid #facc15;
            padding-left: 1rem;
            margin: 0.8rem 0 1rem 0;
        }
        .theme-block .keyword {
            font-size: 1.4rem;
            font-weight: 700;
            color: #facc15;
            letter-spacing: 0.02em;
        }
        .theme-block .keyword-desc {
            margin-top: 0.4rem;
            color: #cbd5e1;
        }
        .theme-block .closing {
            margin-top: 1.2rem;
            font-weight: 500;
            color: #f8fafc;
            font-size: 1.05rem;
        }

        /* ===== 15. 信息源表格 ===== */
        .source-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.85rem;
            margin: 1.2rem 0 1.6rem 0;
        }
        .source-table th {
            background: #f1f5f9;
            text-align: left;
            padding: 0.5rem 0.8rem;
            font-weight: 600;
            color: #334155;
            border-bottom: 2px solid #dce1e9;
        }
        .source-table td {
            padding: 0.5rem 0.8rem;
            border-bottom: 1px solid #e9edf2;
            word-break: break-all;
        }
        .source-table a {
            color: #2563eb;
            text-decoration: none;
        }
        .source-table a:hover { text-decoration: underline; }

        /* ===== 16. 免责声明 ===== */
        .disclaimer {
            margin-top: 2.4rem;
            padding: 1rem 1.4rem;
            background: #f8fafc;
            border-radius: 12px;
            font-size: 0.8rem;
            color: #64748b;
            border: 1px solid #eef2f6;
        }

        /* ===== 17. 响应式（移动端） ===== */
        @media (max-width: 640px) {
            .container { padding: 1.2rem 1rem; border-radius: 16px; }
            h1 { font-size: 1.6rem; }
            .data-grid { grid-template-columns: 1fr 1fr; gap: 0.4rem; padding: 0.8rem 1rem; }
            .data-item .value { font-size: 1rem; }
            .hypothesis-grid { grid-template-columns: 1fr; }
            .theme-block { padding: 1.4rem 1.2rem; }
            .theme-block .day-title { font-size: 1.3rem; }
            .source-table { font-size: 0.7rem; }
            .source-table th, .source-table td { padding: 0.3rem 0.4rem; }
            .emotion-bar { font-size: 0.8rem; padding: 0.3rem 0.8rem; gap: 0.3rem; }
            .emotion-bar .emoji { font-size: 1.1rem; }
            .deep-dive { padding: 0.8rem 1rem; }
            .viz-box { font-size: 0.85rem; padding: 0.4rem 0.8rem; }
        }

        /* ===== 18. 打印适配 ===== */
        @media print {
            body { background: white; padding: 0.2in; }
            .container { box-shadow: none; padding: 0; }
            .theme-block { background: #1e293b !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .data-grid { background: #f1f5f9 !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .viz-box { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .emotion-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .golden-quote { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- ===== 页面内容从此开始 ===== -->
    </div>
</body>
</html>
```


## 三、模块-HTML元素映射表

> **AI在将Markdown转换为HTML时，按此映射表将SOP模块对应到HTML元素**

| 对应模块 | HTML元素 | CSS类 | 说明 |
|:---|:---|:---|:---|
| **情绪曲线** | `<div class="emotion-bar">` | `.emotion-bar` | 顶部固定，显示😤→😊→🤔→💪 |
| **记忆锚点标签** | `<span class="anchor-tag">` | `.anchor-tag` | 蓝色胶囊按钮，如"休市不停更！" |
| **模块标题（h2）** | `<h2>` | 固定样式 | 带蓝色左边框，如"📊 一、本周行情回顾" |
| **数据卡片网格** | `<div class="data-grid">` + `<div class="data-item">` | `.data-grid`, `.data-item` | 10-12个数据项，红绿颜色标注 |
| **可视化提示框** | `<div class="viz-box">` | `.viz-box`, `.viz-box.red-box`, `.viz-box.blue-box` | 关键剪刀差/量能信号 |
| **数据表格** | `<div class="data-table-wrap">` + `<table class="data-table">` | `.data-table-wrap`, `.data-table` | 指数表现/量能情绪表格 |
| **板块分化** | 双列grid | 内联style | 左列绿色（涨幅），右列红色（跌幅） |
| **新闻列表** | `<ul class="news-list">` + `<li>` | `.news-list` | 10条新闻，带情绪标签（😤/😊/🤔） |
| **深度拆解区块** | `<div class="deep-dive">` | `.deep-dive` | 蓝色左边框，含h4标题 |
| **金句框** | `<div class="golden-quote">` | `.golden-quote` | 黄色背景，居中加粗 |
| **假设卡片** | `<div class="hypothesis-grid">` + `<div class="hypothesis-card">` | `.hypothesis-grid`, `.hypothesis-card` | 2列网格，含置信度标签 |
| **观察点列表** | `<ul class="watch-list">` + `<li>` | `.watch-list` | 带🔍图标，5-6条 |
| **每日市场心态主题模块** | `<div class="theme-block">` | `.theme-block` | 深色背景，金色关键词 |
| **信息源表格** | `<table class="source-table">` | `.source-table` | 4列：序号/平台/标题/链接 |
| **免责声明** | `<div class="disclaimer">` | `.disclaimer` | 灰色背景，小字 |


## 四、颜色速查表

| 用途 | CSS值 | 使用场景 |
|:---|:---|:---|
| 涨/正收益 | `#16a34a` | `.value.green`, `.highlight-green` |
| 跌/负收益 | `#dc2626` | `.value.red`, `.highlight-red` |
| 主蓝色 | `#3b82f6` | 模块边框、锚点标签、链接 |
| 金色 | `#facc15` | 主题模块标题、关键词 |
| 警告黄 | `#f59e0b` | 金句框边框 |
| 卡片背景 | `#f8fafc` | 数据卡片、假设卡片 |
| 收尾深色背景 | `#0f172a` | `.theme-block` |


## 五、AI执行清单：HTML产出

> **在完成Markdown稿件后，转换为HTML时按此清单检查：**

### ✅ HTML转换检查清单

```
[ ] 页面标题（<title>）已更新为"YYYY-MM-DD [标题]"
[ ] 情绪曲线已嵌入（😤→😊→🤔→💪）
[ ] 所有数据卡片（.data-grid）数值与YAML一致
[ ] 红绿颜色标注正确（涨/正=绿色，跌/负=红色）
[ ] 所有表格（.data-table）数据与Markdown一致
[ ] 新闻列表（.news-list）包含所有新闻条目
[ ] 深度拆解区块（.deep-dive）数量与Markdown一致
[ ] 假设卡片（.hypothesis-card）数量与Markdown一致
[ ] 观察点列表（.watch-list）数量与Markdown一致
[ ] 每日市场心态主题模块（.theme-block）主题/关键词与Markdown一致
[ ] 信息源表格（.source-table）≥8条，链接有效
[ ] 免责声明完整
[ ] 报告生成时间+版本号+下期审计日期已更新
[ ] 响应式（移动端）显示正常
```


## 六、版本演进记录

| 版本 | 核心能力 | 解决的问题 |
|:---:|:---|:---|
| V1.0 | 信息播报框架 | "休市日说什么" |
| V2.0 | 认知闭环系统 | "休市日如何创造独特价值" |
| V2.1 | 自适应认知进化系统 | "如何记住、验证、容错" |
| V2.2 | 带免疫系统的自适应系统 | "如何防止语义漂移、如何让SOP自我迭代" |
| V2.3 | 用户视角优化的实战版 | "术语通俗化、数据缺失规范化、完整示例模板" |
| V2.4 | HTML视觉呈现标准 | "如何将Markdown转化为可发布的HTML页面" |
| **V3.0** | **去宗教化 + SOP_V4.0 配套** | **CSS类名/模块名中性化，关联版本更新，修正非标准CSS** |


## 七、配套关系

| 文件 | 关系 |
|:---|:---|
| 《每日A股复盘播报 SOP V4.1》 | 执行标准——定义 Markdown 产出内容 |
| 《A股每日复盘与休市审计 · 操作手册（人类阅读版）》 | 人类指南——定义手动操作流程 |
| **本文件** | **视觉标准——定义 HTML 呈现方式** |

三者各司其职：SOP_V4.0 管"生成什么内容"，操作手册管"人怎么做"，本文件管"发布时长什么样"。

---

**状态：✅ 现行 | 版本：V3.0 | 最后更新：2026-07-01**
