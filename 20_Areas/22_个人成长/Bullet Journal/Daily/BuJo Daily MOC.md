---
title: "BuJo Daily MOC"
date: 2026-07-10
type: moc
status: active
tags: [日记]
---

# BuJo Daily MOC

> Bullet Journal 日记索引。按时间倒序排列。
> 路径：`20_Areas/22_个人成长/Bullet Journal/Daily/YYYY-MM/`

---

## 📝 最近更新

```dataview
TABLE WITHOUT ID file.link AS "日期", file.mtime AS "更新时间"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily"
WHERE file.name != "BuJo Daily MOC"
SORT file.name DESC
LIMIT 10
```

---

## 目录结构

```
Bullet Journal/Daily/
├── BuJo Daily MOC.md
├── 2026-06/
│   ├── 2026-06-28.md
│   ├── 2026-06-29.md
│   └── 2026-06-30.md
└── 2026-07/
    ├── 2026-07-01.md
    ├── ...
    └── 2026-07-09.md
```

---

## 📂 2026-07

```dataview
TABLE WITHOUT ID file.link AS "日期"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily/2026-07"
SORT file.name DESC
```

---

## 📂 2026-06

```dataview
TABLE WITHOUT ID file.link AS "日期"
FROM "20_Areas/22_个人成长/Bullet Journal/Daily/2026-06"
SORT file.name DESC
```

---

## 规范说明

### 位置规则

- 日记文件存放在 `Bullet Journal/Daily/YYYY-MM/` 子目录
- 文件名格式：`YYYY-MM-DD.md`

### 双链规范

每篇日记的 related 字段建议包含：
1. `[[BuJo Daily MOC]]` — MOC 索引
2. 前一天的链接
3. 后一天的链接

### 模板位置

- 日记模板：`Bullet Journal/模板/Daily Template.md`

---

## 相关链接

- [[00 Index]] — Bullet Journal 总控台
- [[Bullet Journal MOC]] — 完整 BuJo 索引（如有）