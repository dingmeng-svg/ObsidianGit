---
title: "Insight · Annual"
date: "2026-07-26"
status: active
type: moc
tags: [洞察, MOC]
---

# Insight · Annual

> 系统层每年洞察归档目录。

```dataview
TABLE file.day AS "日期"
FROM "20_Areas/A2_能力接口/Insight/Annual"
WHERE file.name != "Insight · Annual"
SORT file.day DESC
```