---
title: "Hermes Agent + Obsidian：一个真正能思考的第二大脑"
author: "One掌柜"
date: 2026-06-24
status: archived
tags:
  - 归档
  - 素材
aliases:
  - "Hermes + Obsidian"
  - "AI第二大脑实践"
related:
  - "[[永久笔记的核心原则（卡片笔记写作法）]]"
  - "[[三层过滤机制（卡片笔记写作法）]]"
  - "[[知识管理分阶段启动法（原创）]]"
---
# Hermes Agent + Obsidian：一个真正能思考的第二大脑

> 公众号文章。探讨如何让 Obsidian 中的笔记从静态资料库变为 Agent 可执行的“活文件”。核心思路：Hermes Agent 负责执行，Obsidian 负责存放上下文，任务跑完后新经验写回 Obsidian，形成闭环。归档备查。

---

我们很多人做所谓第二大脑，其实做到最后都卡在同一个地方：笔记越来越多，结构越来越漂亮，真正干活的时候还是要从头解释。所以这篇想单独写一下 Hermes Agent + Obsidian，不是讲又一个 Obsidian 模板，而是讲一个更实际的问题：**怎么让你过去积累的笔记，真的进入下一次执行。**

---

## 第二大脑最大的问题，是人要自己记得用它

以前很多第二大脑教程，本质上都在训练人——你要知道每个文件放在哪里，你要记得什么时候引用哪篇笔记，你要维护文件夹结构，你要定期清理标签，你要在写作、做产品、研究竞品时主动回去翻。这对少数自律的人有用，但对大多数人来说，最后就是收藏夹2.0。

文件越来越多，结构越来越漂亮，真正复用越来越少。

我更愿意把这种文件叫做 **dead files**，死文件。不是文件没价值，而是 AI Agent 不能用它，不能把它当上下文，不能比较它和其他文件，不能基于它做研究，不能在下一次任务里主动调用它。那它对 Agent 来说，基本就是不存在。

所以我觉得这里真正该讨论的，不是 Obsidian 又多了一个 AI 插件，而是把 Obsidian 里的 Markdown，变成 Hermes Agent 能持续使用的 **living files**。

---

## Obsidian 适合做这件事，因为它足够笨

这里的“笨”是夸它。Obsidian 的核心就是本地 Markdown 文件——你能看懂，Agent 也能看懂，你能改，Agent 也能改。你不需要把所有东西关进一个黑盒数据库。

我自己的理解是，Obsidian 最适合放那些人能长期维护、Agent 也能读懂的上下文——比如项目判断、用户研究、竞品记录、长期偏好、被验证错的假设——然后让 Hermes Agent 接进去。

我先做了一个很土的入口页，叫 One 决策台首页，只保留四个入口：

```
00_收件箱 / Inbox Dashboard：新信息入口
01_每日记录 / README：记录每天的输入、判断、行动
05_决策 / Decision Dashboard：放需要取舍的问题
06_行动 / All Tasks：放真正要推进的事
```

这个入口页的价值不在于好看，而是它把 Obsidian 从资料库变成了操作台。新信息先进收件箱，每天的判断进每日记录，需要取舍的东西进入决策，真的要推进的事情才进入行动。Hermes Agent 读取这些 Markdown 时，拿到的就不是一堆散乱笔记，而是已经被分过层的工作现场。

这样做有几个好处：第一，你能看到 Agent 在用什么；第二，你可以直接编辑——如果一个 workflow 不对，改一篇 Markdown 比翻代码改复杂配置更直接；第三，它天然适合做连接——如果 Agent 能读这些 Markdown，它就能知道某条 SOP、某个项目、某篇复盘、某个长期偏好之间的关系，这比把所有东西塞进一个长 prompt 里稳定得多。

---

## Hermes Agent 负责让这些文件活起来

Obsidian 本身还是笔记工具，Hermes Agent 才是执行层。它可以读文件、搜文件、改文件、调用工具、跑命令、记住偏好、沉淀 skill，也可以通过 cron、gateway、profile、subagent 这些能力进入长期工作流。

所以 Hermes + Obsidian 的关键不是“AI 帮你写笔记”，而是：**Obsidian 存放人能理解的上下文，Hermes Agent 把这些上下文用到任务里，任务跑完以后，再把新的经验写回 Obsidian。** 这才像一个闭环。

比如你可以有这些文件：

```
/Second Brain
  /Projects
    customer-research.md
    competitor-tracking.md
    saas-ideas.md
  /SOP
    validate-saas-idea.md
    analyze-user-feedback.md
    weekly-market-scan.md
  /Memory
    preferences.md
    rejected-directions.md
    pricing-lessons.md
  /Skills
    customer-interview-analysis.md
    landing-page-teardown.md
```

然后你让 Hermes Agent 做事时，不是每次重新解释一遍，而是直接说：

> 读取我的 Obsidian vault 里和 customer-research、competitor-tracking、pricing-lessons 相关的笔记，帮我评估这个垂直 SaaS 机会，并把这次新发现追加到 pricing-lessons.md

这就和普通聊天不一样了。普通聊天是你在喂上下文，这个模式是 **Agent 自己去找上下文，用完以后再沉淀。**

---

## 不要把全部 vault 塞进上下文

很多人一做第二大脑接 AI，就会想把所有笔记都塞给模型。听起来很爽，实际很蠢——上下文窗口会膨胀，token 会浪费，旧信息会污染新任务，Agent 还会在一堆不相关笔记里迷路。

更稳的结构应该是两层：

- **第一层是很小的核心记忆**：比如你是谁，你偏好什么回答方式，你长期不喜欢什么方向，Hermes Agent 里类似 SOUL.md 或 profile memory 这一类。
- **第二层是大量按需加载的 notes / skills / SOP**：只有当前任务相关时才读。

你今天研究 SaaS 机会，就读行业判断、排除项、过去验证过的需求信号。你今天整理用户访谈，就读用户画像、原始访谈、已验证的付费意愿。你今天做竞品分析，就读竞品清单、定价页变化、历史功能判断。

**这才是第二大脑真正能工作的方式——不是把所有东西塞进脑子里，而是知道什么时候该拿哪一张卡出来。**

---

## 一个最小可用的实操路径

如果你想自己试，不要一上来搞很复杂。先准备一个 Obsidian vault，里面放三类文件就够了：关于你的长期偏好（`Memory/preferences.md`）、关于某个具体项目（`Projects/customer-research.md`）、关于可复用工作流（`SOP/analyze-user-feedback.md`）。

然后在 Hermes Agent 里先做一个最小任务：让它读取偏好和项目文件，总结出评估垂直 SaaS 机会时最应该遵守的规则。如果这一步通了，再让它写回一条新经验——追加到 SOP 文件里，保留原文，不要覆盖旧内容。第三步，再让它执行一个真实任务：基于 SOP 和项目文件，整理用户访谈，判断哪些痛点值得做成 SaaS 产品，并把新学到的判断经验追加回项目文件。

这三步过了，才说明你的 Obsidian 不只是资料库，它开始进入执行循环了。

---

## 更进一步，是把它放到一台长期在线的机器上

如果你的 Obsidian vault 只在一台电脑上，Agent 就只能在那台电脑上用。如果你通过 Obsidian Sync 或其他同步方式，让多台机器上都有同一份 Markdown，Hermes Agent 就可以在一台长期在线的机器上跑。这时很多事就不需要你手动触发了：每天早上读取前一天的新用户反馈，每天下午扫描一批竞品定价页，每周把高频痛点、付费信号、被排除方向做一次复盘。这些任务一旦变成 cron job，Obsidian 就不只是你写笔记的地方，它会变成 Agent 的长期工作台。**人负责判断，Agent 负责执行和沉淀。**

---

## 这件事真正改变的是上下文的归属

过去我们用 AI，经常有一个错觉：上下文在聊天框里。所以每次开新会话，你都要重新解释自己是谁、项目是什么、风格是什么、上次错在哪里。

Hermes Agent + Obsidian 这个组合，把上下文从聊天框里拿出来，放回一个人和 Agent 都能读写的文件系统里。

这很重要，因为聊天记录是流水，Markdown 文件才更像资产。一条 prompt 用完就没了，一条 SOP 可以被下一个任务复用。一次研究如果只停在回复里，很快就沉下去；如果写进 living file，下次 Agent 可以继续接着用。

**第二大脑不是你整理出来的，是它真的开始替你参与下一次判断和执行时，才长出来的。**

---

_本文档为公众号文章归档备查。_


![Image](https://mmbiz.qpic.cn/mmbiz_png/VnU9ib0zZ002sUOhAyGLziaO5T5slOnNgDmibnuSU9j1TOVP92kfS9SoOdkiaTXqzmZ5Jl8BZgZIN0dHntCm3AXxGJmVC56Kc07rDBawmSlic5E4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)


![Image](https://mmbiz.qpic.cn/mmbiz_jpg/VnU9ib0zZ002NhOnHmadtiafYwFkxzp4O4Z8ibhbyg6NOoRst4gY2eZZBWN2CVEMtRCFJDAH0O5MbsGKuQSLia3B5doHD5vWRk99o5OZiaJOEiaOc/640?wx_fmt=jpeg#imgIndex=1)

