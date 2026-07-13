---
title: 领域
date: 2026-07-09
tags: [MOC]
---

# 🌱 领域

持续性的角色、责任与生活领域。与 Projects 不同，Areas 没有终点——它们是"需要维持在某个标准"的事情。

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "笔记", file.folder AS "路径"
FROM "20_Areas"
WHERE !startswith(file.name, "_") AND file.name != "20_Areas" AND file.name != "Areas：My roles and responsibilities MOC"
SORT file.mtime DESC
LIMIT 20
```

---

## 目录结构

| 编号 | 领域 | 核心角色 | 关键责任 |
|:-----|:-----|:---------|:---------|
| 21 工作 | 工作 | 创业者、操盘手 | 公司运营、业务增长、团队管理 |
| 22 个人成长 | 个人成长 | 终身学习者、写作者 | 知识管理、写作积累、认知提升 |
| 23 生活与健康 | 生活与健康 | 生活品质管理者 | 身体健康、运动、饮食 |
| 24 关系 | 关系 | 伴侣、家人、朋友 | 亲密关系维护、社交网络 |
| 25 财务与资产 | 财务与资产 | 财务管理者 | 理财规划、资产配置 |
| 26 技术 | 技术 | 技术使用者 | 工具链维护、技术学习 |

---

## 📂 21_工作

- **短视频/** — 实战总结、黄洪生/森哥案例分析、逻辑层次

```dataview
LIST
FROM "20_Areas/21_工作"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📂 22_个人成长

- **知识管理/** — PKM、卡片笔记写作法、设计思维、原子习惯
- **写作素材/** — 诗歌、随笔
- **心理学/** — 自指困境、边界意识、心理暗示
- **传统文化/** — 中庸原文
- **Bullet Journal/** — 子弹笔记
- **Habit Tracking/** — 习惯追踪

```dataview
LIST
FROM "20_Areas/22_个人成长"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📂 20_Areas/23_生活与健康

- **游泳/** — 自由泳、蛙泳、打腿训练
- **健康/** — 体态纠正、斯坦福健康研究
- **食物/烘焙/** — 低温油封小番茄
- **食物/食品风味/** — 茶、咖啡、面包、味觉科学
- **食物/中餐/** — 狮子头、金汤肥牛、番茄牛肋条等
- **食物/营养/** — 全谷物饭配方

```dataview
LIST
FROM "20_Areas/23_生活与健康"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📂 24_关系

- **伴侣/媚媚/** — 情书、合盘、拍照、中秋、周年纪念
- **社群/阿新（茉莉）张津/** — 公会运营、直播活动
- **社群/66/** — 游戏装备运营方案
- **同事/袁野/** — 发光体与吸光体对话

```dataview
LIST
FROM "20_Areas/24_关系"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📂 25_财务与资产

- **丁萌/财务/** — 记账Excel教程

```dataview
LIST
FROM "20_Areas/25_财务与资产"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 📂 26_技术

- 暂无独立子目录，技术笔记分布在项目与资源中

```dataview
LIST
FROM "20_Areas/26_技术"
WHERE !startswith(file.name, "_")
SORT file.mtime DESC
```

---

## 与 Projects 的关系

```
Projects（有终点）            Areas（持续责任）
完成一件事 → 归档            维持一个标准 → 永远在线

例：
10_Projects/操盘手骑士        20_Areas/21_工作
     ↑ 项目结束后归档              ↑ 持续运营
```

---

## 维护原则

- **定期回顾**：每月复盘各领域的维持状态
- **动态调整**：角色变化时及时更新子领域
- **不追求完美**：Areas 不是待办清单，是生活罗盘

---

## 相关文档

- [[90_System/07_知识库融合架构设计|融合架构设计]] — AREA 体系说明
- [[90_System/10_日工作流操作手册|日工作流操作手册]] — 领域维护

---

*最后更新于 2026-07-09*