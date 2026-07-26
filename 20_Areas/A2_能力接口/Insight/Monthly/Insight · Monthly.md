---
title: "Insight · Monthly"
date: "2026-07-26"
status: active
type: moc
tags: [洞察, MOC]
---

# Insight · Monthly

> 系统层每月洞察归档目录。

```dataview
TABLE file.day AS "日期"
FROM "20_Areas/A2_能力接口/Insight/Monthly"
WHERE file.name != "Insight · Monthly"
SORT file.day DESC
```