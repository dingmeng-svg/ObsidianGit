---
title: 归档
date: 2026-07-09
tags: [MOC]
---

# 📦 归档

已完成或不再活跃的内容，冷存储区。此处内容已不再活跃，但保留以备将来查阅。

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.folder AS "路径"
FROM "40_Archive"
WHERE !startswith(file.name, "_") AND file.name != "40_Archive" AND file.name != "Archive 归档 Completed or inactive things"
SORT file.mtime DESC
LIMIT 15
```

---

## 目录结构

| 目录 | 说明 | 文件数 |
|:-----|:-----|:------:|
| `个人成长/` | 金惟纯、马斯克、钱穆、认知进化、矛盾论 | 17 |
| `项目存档/` | Kickstarter、SeaTurtle、SSAVED | 8 |
| `猫行为学/` | 认证备考 · 商业规划 · 内容素材 | 7 |
| `杂项/` | 备注图文、参考信息 | 6 |
| `技术/` | Obsidian首页、Dify指南 | 6 |
| `营销与品牌/` | 品牌框架、官网SOP、课程介绍 | 5 |
| `财务与税务/` | 开票SOP、税务截图 | 5 |
| `关系/` | 代际沟通、亲密关系、婚姻思考 | 5 |
| `电商/` | 淘宝/支付宝SOP、上架指南 | 5 |
| `商业与法务/` | 公司注册、注销、银行开户 | 4 |
| `国际政治/` | 翟东升访谈、爱泼斯坦案 | 4 |
| `心理学与行为科学/` | 情绪词典、贪婪的多巴胺 | 3 |
| `英语/` | 学习资料 | 3 |
| `职业档案/` | 简历、项目宣传 | 2 |
| `时间表/` | 历史时间表 | 2 |
| `外贸/` | 转型建议、Gmail注册 | 2 |
| `生活/` | 健身、风水 | 2 |
| `日记存档/` | 旧日记 | — |
| `Bullet Journal/` | 旧版 BJ 归档 | — |
| `系统文档/` | 已归档的旧版设计文档 | — |

---

## 📂 个人成长

金惟纯访谈系列、马斯克商业操作系统、钱穆人生十论、高效能体系、矛盾论、认知进化等。

```dataview
LIST
FROM "40_Archive/个人成长"
SORT file.mtime DESC
```

---

## 📂 项目存档

- **Kickstarter** — 数据爬虫、众筹痛点分析、英语引导课
- **SeaTurtle** — 企业结构、股权变更
- **SSAVED** — 交付计划排期

```dataview
LIST
FROM "40_Archive/项目存档"
SORT file.mtime DESC
```

---

## 📂 猫行为学

- **认证备考/** — IAABC 备考计划、书单、认证路径
- **商业规划/** — 商业计划框架、战略规划
- **内容素材/** — 短视频素材库、走失猫咪深度解析

```dataview
LIST
FROM "40_Archive/猫行为学"
SORT file.mtime DESC
```

---

## 📂 技术

Obsidian 首页定制方案、入门操作、Markdown 语法速查、Dify Agent 部署指南。

```dataview
LIST
FROM "40_Archive/技术"
SORT file.mtime DESC
```

---

## 📂 营销与品牌

品牌建设全案框架、官网SOP、Barry/高兴辉/邵艾伦英语课程介绍。

```dataview
LIST
FROM "40_Archive/营销与品牌"
SORT file.mtime DESC
```

---

## 📂 财务与税务

开票SOP、税率信息、深圳电子税务局操作截图。

```dataview
LIST
FROM "40_Archive/财务与税务"
SORT file.mtime DESC
```

---

## 📂 关系

代际沟通引导策略、婚姻思考笔记、亲密关系短视频素材与多学科分析。

```dataview
LIST
FROM "40_Archive/关系"
SORT file.mtime DESC
```

---

## 📂 电商

淘宝开店流程、千牛商品发布SOP、上架要求。

```dataview
LIST
FROM "40_Archive/电商"
SORT file.mtime DESC
```

---

## 📂 商业与法务

工商银行开户、深圳企业注销、国内公司清理、商务文件格式标准。

```dataview
LIST
FROM "40_Archive/商业与法务"
SORT file.mtime DESC
```

---

## 📂 国际政治

翟东升访谈（中美缠斗/逆全球化）、爱泼斯坦案深度评述。

```dataview
LIST
FROM "40_Archive/国际政治"
SORT file.mtime DESC
```

---

## 📂 心理学与行为科学

《情绪词典》第一章读书总结、《贪婪的多巴胺》读书摘要。

```dataview
LIST
FROM "40_Archive/心理学与行为科学"
SORT file.mtime DESC
```

---

## 📂 英语

Once You Have a System、英语音标、经济学人优惠截图。

```dataview
LIST
FROM "40_Archive/英语"
SORT file.mtime DESC
```

---

## 📂 其他

| 目录 | 说明 |
|:-----|:-----|
| `职业档案/` | 简历撰写板块清单、项目宣传用简历合集 |
| `时间表/` | 2026年5月时间表、5月11日时间表 |
| `外贸/` | 转型外贸建议、Gmail注册ID排查 |
| `生活/` | 一氧化氮的健身与止痛作用、丙午年值年卦张贴指南 |
| `杂项/` | 参考信息（注音符号等）、个人备忘 |

---

## 归档规则

- **Projects 完成** → 整文件夹归档
- **Areas 不再维护** → 子目录归档
- **永久笔记** → 不进 Archive

---

## 相关文档

- [[90_System/09_数据流全景图|数据流全景图]] — 归档流程
- [[90_System/07_知识库融合架构设计|融合架构设计]] — PARA 归档规则

---

*最近整理：2026-07-09。从 28 个目录合并精简至 20 个领域目录。*