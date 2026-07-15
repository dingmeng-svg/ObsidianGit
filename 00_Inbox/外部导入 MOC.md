---
title: "外部导入 MOC"
tags: [MOC, Inbox]
---

# 📥 外部导入总览

> 人工手动处理的外部导入素材。所有新建导入统一走 `_raw/`（系统自动 Ingest），本目录仅保留存量文件。
>
> 处理流程：外部导入 → 人工审核 → 提炼为原子笔记或归档。

## 📂 全部外部导入文件

```dataview
TABLE file.mtime AS "修改时间", file.size AS "大小"
FROM "00_Inbox/外部导入"
WHERE file.name != "_说明"
SORT file.mtime DESC
```

## 📊 统计

- 总文件数：`$= dv.pages('"00_Inbox/外部导入"').where(p => p.file.name != "_说明").length`
- 最新导入：`$= dv.pages('"00_Inbox/外部导入"').where(p => p.file.name != "_说明").sort(p => p.file.mtime, "desc")[0].file.name`

---

*💡 存量文件处理完毕后，本目录可归档至 `40_Archive/`。*