---
title: Kickstarter 数据爬虫脚本（未完成）
tags: [归档, 技术, 工作]
project: Kickstarter
related:
  - "[[KS相关数据]]"
  - "[[Why Content Creators are Turning to Crowdfunding to Fuel Their Ideas]]"
  - "[[SSAVED kickstarter 交付计划排期]]"
---

# Kickstarter 数据爬虫脚本（未完成）

> 目标：定时抓取 Kickstarter 统计数据变化并存入 SQLite 数据库，后续用于制作图表。
>
> 结果：两个版本的代码均未成功跑通，项目已放弃。归档保留代码框架，供后续类似需求参考。

---

## 版本一：抓取帮助页面统计数据

目标 URL：`https://www.kickstarter.com/help/stats?ref=global-footer`

```python
import requests
from bs4 import BeautifulSoup
import sqlite3
import datetime

# 目标URL
url = 'https://www.kickstarter.com/help/stats?ref=global-footer'

# 连接数据库
conn = sqlite3.connect('kickstarter.db')
c = conn.cursor()

# 创建存储数据的表
c.execute('''CREATE TABLE IF NOT EXISTS stats
             (date TEXT, projects_launched INTEGER, dollars_pledged TEXT,
             success_rate REAL)''')

# 发送请求获取HTML内容
page = requests.get(url)
soup = BeautifulSoup(page.content, 'html.parser')

# 提取统计数据
stats = soup.select("div.flex h1")
projects_launched = int(stats[1].get_text().replace(",",""))
dollars_pledged = stats[0].get_text()
success_rate = 0.4151

# 获取当前日期
today = datetime.date.today()

# 将数据插入表中
c.execute("INSERT INTO stats VALUES (?,?,?,?)",
          (today, projects_launched, dollars_pledged, success_rate))

conn.commit()
conn.close()

print(f"Successfully saved Kickstarter stats for {today}")
```

**问题诊断**：
- `soup.select("div.flex h1")` 依赖页面特定 CSS 类名，Kickstarter 改版后选择器失效
- `success_rate` 是硬编码的固定值（0.4151），并非从页面抓取
- 未处理请求异常和反爬机制

---

## 版本二：尝试抓取首页统计数据

目标 URL：`https://www.kickstarter.com/`

```python
import requests
from bs4 import BeautifulSoup
import sqlite3
import datetime

# 项目的URL
project_url = "https://www.kickstarter.com/"

# 连接数据库
conn = sqlite3.connect('kickstarter.db')
c = conn.cursor()

# 创建存储数据的表
c.execute('''CREATE TABLE IF NOT EXISTS stats
             (date TEXT, towards creative work TEXT)''')

# 发送请求获取HTML内容
def get_kickstarter_stats(project_url):
    try:
        response = requests.get(project_url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        statistics = soup.find_all('h3', class_='type-24 type-28-md type-34-lg ksr-green-700')
        for stat in statistics:
            amount = int(stat.get_text().replace('$','').replace(',',''))
            print("Kickstarter统计数据:", amount)
    except requests.exceptions.RequestException as e:
        print(f"请求失败：{e}")

today = datetime.date.today()
c.execute("INSERT INTO stats VALUES (?,?)",
          (today, projects_launched, dollars_pledged, success_rate))
conn.commit()
conn.close()

print(f"Successfully saved Kickstarter stats for {today}")

project_url = "https://www.kickstarter.com/"
get_kickstarter_stats(project_url)
```

**问题诊断**：
- 函数 `get_kickstarter_stats` 未被调用即执行插入语句
- `projects_launched`、`dollars_pledged`、`success_rate` 三个变量未定义，插入语句会直接报错
- 表结构改为 `towards creative work TEXT`，与版本一不兼容
- 同样依赖页面特定类名，健壮性差

---

## 失败原因总结

1. **页面结构依赖过强**：两个版本都依赖 Kickstarter 页面的特定 CSS 类名和 DOM 结构，网站改版即失效
2. **缺乏反爬处理**：Kickstarter 对自动化请求有防护，未添加 User-Agent、延迟等反反爬措施
3. **代码逻辑不完整**：版本二存在变量未定义、函数未调用等基础错误
4. **未跑通即放弃**：项目在调试阶段中止

## 数据库路径（若需查看）

```
C:\Users\丁萌\AppData\Local\Programs\Python\Python310\kickstarter.db
```

---

_本文档为已放弃技术实验的归档，保留代码框架供后续类似需求参考。若重新启动类似项目，建议使用官方 API 代替 HTML 抓取，或改用 Selenium 处理动态渲染页面。_
