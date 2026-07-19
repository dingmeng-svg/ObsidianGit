---
title: "Obsidian x AI 第71篇：零摩擦跨端自动日记工作流搭建指南"
author: "Get达人"
date: "2026-07-12"
ingest_status: ingested
ingested_at: 2026-07-17
ingested_notes:
  - "[[日记的5标签分类哲学]]"
  - "[[零摩擦三段式日记流水线（Hermes Skill）]]"
---

# 🎯 方案前置适配条件

本套基于Hermes/OpenClaw的智能日记Skill并非通用方案，动手搭建前必须满足两项基础前提，不满足的用户建议直接使用Obsidian Mobile搭配Templater插件即可实现基础日记记录能力：

| 必备条件 | 说明 | 对应参考教程 |
| :--- | :--- | :--- |
| 常驻在线Agent | 部署持续运行的OpenClaw或Hermes智能代理，也可选择其他大厂推出的同类Claw服务 | 适合普通人的OpenClaw安装教程：10分钟就在飞书上跟AI对话 |
| 本地同步基础 | 电脑端Obsidian已完成Syncthing多设备同步配置 | Obsidian入门60：用SyncThing把多台设备织成一张网 |

# ❌ 传统Obsidian日记的核心痛点

作者作为发布70篇Obsidian入门教程的资深用户，最终放弃原生Obsidian直接记日记，核心矛盾点在于**记录摩擦力的巨大差距**：
1.  原生Obsidian移动端记录流程至少需要5步：打开App→找到Vault目录→点击Calendar插件→选中当日日期→开始输入，在地铁、外出等非桌面场景下操作门槛极高。
2.  对比之下，在微信/飞书等常用通讯工具发送一条记录仅需1步，操作效率差5倍，直接决定了日记记录能否长期坚持。
3.  普通替代方案（微信收藏、发给小号）存在两大缺陷：无结构化检索能力，30天后查找特定内容需要逐页翻找；没有成体系归档，碎片记录最终会变成无人处理的待办项，容易被遗忘丢失。
4.  作者设计的标准化日记模板包含5个结构化链接标签，可在Obsidian图谱中直观看到所有日记的标签关联关系，实现跨时间维度的内容检索。

# ⚙️ 三段式全自动化日记流水线

整套工作流延续了此前wechat-writer Skill的设计思路，针对日记场景做了专属优化，全程几乎零人工干预：

## 1. 白天：碎片式无压记录

用户在任意通讯工具（文中示例为Telegram、飞书）给绑定的AI助手Jennie发送带`#日记`标签的内容，后台Python脚本`capture_diary.py`会自动将「原文+精确时间戳」存入服务器的inbox暂存文件，AI仅回复「📝 记下了」，不会发起多余对话污染原始记录内容。
> 核心设计逻辑：白天不做任何分类操作，仅做内容搬运，避免单条消息孤立判断导致分类错误，保留全天内容上下文供后续统一处理。

## 2. 晚间22:00：自动智能分类

系统通过cron定时任务触发分类脚本，读取当日inbox内所有记录，基于5个预设标签的关键词库进行打分匹配，自动生成当日日记草稿，随后推送飞书卡片给用户人工校验：
| 标签分类 | 匹配关键词 | 排序优先级 |
| :--- | :--- | :--- |
| 💊 闪念胶囊 | 突然、灵光、想到、顿悟、忽然 | 1（最低） |
| 📎 今天做了啥 | 做了、写了、开会、修了、跑了、完成 | 2 |
| 🍳 有什么趣事 | 好笑、离谱、卧槽、骚 | 3 |
| 🏄‍♀️ 运动了吗 | 跑、骑、游泳、健身、配速、心率 | 4 |
| 👁️‍🗨️ 见证了什么历史 | 见证、发布、开源、上线、首发、突破 | 5（最高） |
- 命中多标签时按关键词数量排序，同分数情况下按上述优先级从低到高判定归属。
- 用户收到飞书卡片后可直接通过指令操作：回复「归档」确认落盘、回复「改XX」调整分类后重推、回复「跳过」放弃当日记录。人工校验环节是整套流程的核心价值点，彻底避免AI自作主张分类错误的问题。

## 3. 自动同步归档

用户确认归档后，后台执行`archive_diary.py`脚本，将草稿从服务器临时目录`MyVault/Diary/_drafts/`移动至正式归档目录`MyVault/Diary/`，依托此前配置的Syncthing自动同步能力，数秒内新生成的当日日记文件就会同步到本地Obsidian Vault中，全程无需用户手动传输文件。

# 🧠 5个标签的底层设计哲学

这套分类体系并非随意设计，完全覆盖了用户回溯日记时的所有高频检索场景：
1.  想找回某条灵光一闪的想法时，直接检索「💊 闪念胶囊」标签即可快速定位。
2.  复盘当日工作产出时，查看「📎 今天做了啥」标签就能快速梳理全天日程。
3.  回顾生活趣味瞬间时，筛选「🍳 有什么趣事」标签可直接过滤出所有轻松内容，避免被流水账信息干扰。
4.  统计长期运动数据时，聚合「🏄‍♀️ 运动了吗」标签就能生成完整的运动记录曲线。
5.  梳理行业重大事件脉络时，查看「👁️‍🗨️ 见证了什么历史」标签即可串联起所有关键节点。
> 额外防幻觉设计：默认状态下AI不会主动联网补充事件背景信息，避免基于训练集生成错误内容；只有当用户显式发送带明确指向的指令（如`#日记 见证历史，今天OpenAI发了GPT-5`）时，才会触发联网补充资料的动作，完全杜绝AI幻觉风险。

# 📚 系列关联参考教程

本文是「Obsidian x AI」系列第71篇，完整串联了此前多篇教程的能力，核心关联内容分为三类：
1.  本系列近期更新：包含Obsidian入门70（公众号一键发布）、入门69（Skill辅助写文章）、入门68（内容对外分发）
2.  本文依赖前置教程：入门60（Syncthing同步）、入门25（Templater模板）、入门11（Calendar日记插件）
3.  工作流底层原理：入门40（wechat-writer Skill分享）、入门39（Skill五步搭建法）

# 原文
> 本文是「Obsidian x AI」系列第 71 篇。入门 25 写了 Templater 的日记模板，入门 60 写了 Syncthing
> 同步。如果你都看过，这篇正好把它们串起来。

我现在不在 Obsidian 里记日记了。

说出来你可能觉得奇怪，一个写了 70 篇 Obsidian 入门教程的人，居然不在 Obsidian 里记日记。但恰恰是 Obsidian
用得越久，你越会发现一件事：**记日记最难的环节，是我有想法了，但是 Obsidian 并不在我的眼前。**

## 先说清楚，什么情况这个 Skill 救不了你

我在 Hermes 上做了一个 Skill，专门服务于随手拿起手机来写日记。

但这个 Skill 不是万能的。动手之前，你得满足这些条件。

* 有个一直在线的 OpenClaw 或者 Hermes agent。也就是俗称的有虾或者有马。
* 你的电脑端本地 Obsidian 已经用 Syncthing 在同步（按[入门 60](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490225&idx=1&sn=c5cef039dd5a5da8dafd0f049b5c482d&scene=21#wechat_redirect)配过）

如果上面任何一项你都不熟，**这个 Skill 救不了你，别硬搭**。直接用 Obsidian Mobile + Templater 就够了（[入门
25](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489471&idx=1&sn=a6320badc3225fcb33f528ade2f3fb7d&scene=21#wechat_redirect)写过）。

我是站在「已经看这个系列几十篇」的角度写的，不会从零开始讲起。如果还不知道怎么装 OpenClaw 的，可以参考[适合普通人的 OpenClaw 安装教程：10
分钟就在飞书上跟 AI
对话](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488580&idx=1&sn=84ea05b1dcb14b8fd24579c915091b3e&scene=21#wechat_redirect)。

当然现在各个大厂有各种 Claw，从这里面挑一个自己喜欢的也行。

## 为什么不在 Obsidian 里记

我之前记日记，是用 Obsidian 的 Calendar 插件（[入门
11](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488910&idx=1&sn=15e1665185bd38520633cf362299b58e&scene=21#wechat_redirect)
写过），写的时候点一下今天的日期，模板自动出来，往里填。

这套流程很优雅，但它有一个前提。**你得坐在电脑前**。

人在外面的时候，比如在地铁上、在厕所里、在走路时，你不会想打开 Obsidian Vault。你得先打开 App、找到 Vault 目录、点
Calendar、点今天的日期、开始写。

**至少 5 步。**

但在微信或者飞书里发一行字，是 1 步。

摩擦力差 5 倍。这 5 倍的差别，决定了我能不能真的坚持记日记。

有人会说，那我用微信收藏也能把日记记录下来，或者发给我的微信小号！但是会碰到下面这些问题：

1. 没有结构。30 天后你想找「7 月 8 日那条关于 OpenAI 发 GPT-5.6 的」，你得在收藏里翻半天。
2. 没有归档。没有成体系地归档到一个地方。

日记这件事，**碎片记录只是第一步，归档才是目的**。

没有归档的碎片，是另一个待办清单。等你忘了，它就消失了。

以下是我的日记模板，供你参考。

```


1



2



3



4



5



6



7



8



9



10



11



12



13



14



- [💊 闪念胶囊](日记标签/💊%20闪念胶囊.md)   
      
      
- [📎 今天做了啥？](日记标签/📎%20今天做了啥？.md)   
      
      
- [🍳 有什么趣事？](日记标签/🍳%20有什么趣事？.md)   
      
      
- [🏄‍♀️ 运动了吗？](日记标签/🏄‍♀️%20运动了吗？.md)   
      
      
- [👁️‍🗨️ 见证了什么历史？](日记标签/👁️‍🗨️%20见证了什么历史？.md)


```

每次回顾的时候，能在图谱里面看到每个标签所链接的所有笔记。

![Obsidian 图谱中日记五个标签的关联视图|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F0b41cbb1a1e9ab241cf3735cfe9e1833?Expires=1786380824&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=cb4K4xBXB5rV8VEdQHYucQhz1JM%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

## 三段流水线

我自己攒出来的解法是这样的。这条流水线跟[入门
40](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489834&idx=1&sn=6e3f4040aadb0857e6a65b5f8640facf&scene=21#wechat_redirect)里的
wechat-writer Skill 是同一个思路，只是换成日记场景。

### 白天：碎片式发送

![在 Telegram 中发送 #日记 消息给 Jennie|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F84bbda22b3714d631d9efae5dff871b7?Expires=1786380824&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=s1RJu72Ivo3cQcejJmq9O5B%2FLAE%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

任何时候，只要我给 我的 AI 助力 Jennie 发消息带 `#日记` 这个 tag，她写的一个 Python 脚本就会把这段消息**原文 +
时间戳**存到服务器的一个 inbox 文件里。

```


1



2



3



4



python3 /root/.hermes/skills/note-taking/obsidian-diary/scripts/capture_diary.py \\  
  --date 2026-07-11 \\  
  --time 11:51 \\  
  --text "今天早上 6 点多就醒了，肚子不舒服..."


```

Jennie 收到之后只回一行「📝 记下了」，**不展开**。不会跟我产生的对话，导致日记内容被污染。

为什么不让 Jennie 立刻分类？因为**单条消息孤立看，分不准**。

早上发「OpenAI 发了 GPT-5.6，有点东西」，单看像「见证了什么历史」。但到了晚上你可能还发「其实也没啥意思」，这条其实是「💊
闪念胶囊」，因为你想表达的是「我突然意识到 OpenAI 不 cool 了」。

**白天不分类，只搬运，是为了让晚上分类时能看全天的上下文。**

### 晚上 22:00：分类

晚上 10 点，cron 自动触发这个脚本。

它读 inbox 里的所有消息，按 5 个 tag 关键词打分，分类，生成草稿。

5 个 tag 长这样。

* 💊 **闪念胶囊**：突然、灵光、想到、顿悟、忽然……
* 📎 **今天做了啥**：做了、写了、开会、修了、跑了、完成……
* 🍳 **有什么趣事**：好笑、离谱、卧槽、妈的、骚……
* 🏄‍♀️ **运动了吗**：跑、骑、游泳、健身、配速、心率……
* 👁️‍🗨️ **见证了什么历史**：见证、发布、开源、上线、首发、突破……

一条消息可能命中多个 tag（比如「刚跑了 5 公里，配速 5’30」既算做了啥又算运动），脚本会算分，命中关键词越多的 tag
优先。同分时按「轻→重」排：闪念 → 做了 → 趣事 → 运动 → 见证。

分完类之后，脚本会生成一张飞书卡片推给我，长这样。

> 📔 **日记草稿 · 2026-07-11**
>
> **💊 闪念胶囊**  
> · 16:30 忽然想到，Obsidian 入门那个系列我可以加一篇 Skill 相关的
>
> **🏄‍♀️ 运动了吗**  
> · 14:05 刚跑了 5 公里，配速 5’30，心率 142，比上周快了
>
> ⚠️ **未分类**：1 条需手分
>
> 📖 [查看完整草稿]
>
> 回复指引：`归档` 落盘 / `改 XX` 改后再推 / `跳过` 不归档

我看到卡片，扫一眼，分类大致对，就回一句「归档」。

如果分错了，我直接说「把 14:05 那条从运动改到做了啥」。Jennie 改完重推。

这个飞书卡片审核的环节，是整个 Skill 最值钱的部分。它让我能在归档之前看一眼，避免 AI 自作主张把不该分的分错。

![飞书卡片日记草稿审核界面|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F2c31f92c6278f51612ba30fbbf903a5d?Expires=1786380824&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=8X3iIps6si39AQzH0ihmSByyHDg%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

至于为什么用飞书而不是微信，这是另一个故事，跟 iLink 限流有关，下次再讲。

### 归档

我回「归档」之后，Jennie 执行第三个脚本。

```


1



2



python3 /root/.hermes/skills/note-taking/obsidian-diary/scripts/archive_diary.py \\  
  --date 2026-07-11


```

草稿从 `MyVault/Diary/_drafts/2026-07-11.md` 移到 `MyVault/Diary/2026-07-11.md`。

到这里，**服务器上的归档完成**。

但我人在 Mac 端，Obsidian 在 Mac 端。

怎么过去？靠 Syncthing。这是入门 60 讲过的事：服务器和 Mac 之间跑着 Syncthing，Vault 目录自动同步。

所以归档那一秒，Mac 端 Obsidian 几秒后就收到了 2026-07-11.md 这个新文件。我打开 Obsidian 看，今天的日记就在那里。

**整个流程零摩擦**。我在微信/飞书里发一行字，晚上睡觉前看一眼飞书卡片，回一句「归档」，马上在电脑的 Obsidian 上就能看到昨天的日记。

![日记自动归档到 Obsidian Vault 的效果|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F0cfee1c4955e2852346f335f83cfbe6c?Expires=1786380824&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=aYCHC9k3kE%2BGHsvxpiOwLWd92C0%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

## 关于 5 个 Tag 的设计哲学

为什么要按这 5 个 tag 分类，而不是别的？

**因为这 5 个 tag 覆盖了我看自己日记时的所有检索场景。**

* 我想找回某个灵光一闪的想法 → 💊 闪念胶囊
* 我想看某天做了什么具体的事 → 📎 今天做了啥
* 我想重新感受某个离谱或有趣的瞬间 → 🍳 有什么趣事
* 我想看自己运动了多少 → 🏄‍♀️ 运动了吗
* 我想看历史上发生过什么大事 → 👁️‍🗨️ 见证了什么历史

如果只有「做了什么」一个 tag，我回顾时会变成一个事无巨细的流水账，看不下去。

5 个 tag 帮我**切片**：当我打开 2026-07-11 的日记，我可以只看 🍳 有什么趣事，那 22:18
那条「妈的，刚才看到老板凌晨还在回我消息，太卷了」就跳出来了。纯粹的快乐。

另一个细节，👁️‍🗨️ 见证了什么历史这个 tag，默认不主动搜索补充资料。

我特意没让 AI 在分类时去搜「OpenAI 发了 GPT-5 是什么」这种，AI 会按训练集的默认值填，填错了我还看不出来。

只有当我显式写 `#日记 见证历史，今天 OpenAI 发了 GPT-5` 时，AI 才会去搜补充。这个触发机制是显式的，避免幻觉。

---

你看，这篇文章本身就是用我跟 Hermes 聊这个碎片化日记的场景的时候攒的素材写出来的。这跟 [入门
69](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490532&idx=1&sn=a9057176d605eab6db8e2c2fa5b70aec&scene=21#wechat_redirect)用
Skill 写文章是同一个套路，你读到这里应该发现了。

本文同步在 xiaoweibox.top，这是我的个人网站。如果你不在公众号看，也可以从那边找到。

## 进阶阅读

### 本系列前篇

* [Obsidian 入门 70：文章写完了，用 WeChat Converter 一键发到公众号](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490549&idx=1&sn=768929af942427d20321084716e5f3b6&scene=21#wechat_redirect)
* [Obsidian 入门69：拿到 Skill 之后，怎么用它写完一篇文章](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490532&idx=1&sn=a9057176d605eab6db8e2c2fa5b70aec&scene=21#wechat_redirect)
* [Obsidian 入门68：攒了满 Obsidian 的内容，下一步把它递给更广的人群](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490525&idx=1&sn=feb8b79021a7b77c5bc8c6168bf5726f&scene=21#wechat_redirect)

### 本文依赖的前置文章

* [Obsidian 入门60：用 SyncThing 把多台设备织成一张网](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490225&idx=1&sn=c5cef039dd5a5da8dafd0f049b5c482d&scene=21#wechat_redirect)
* [Obsidian 入门25：认识 Templater插件，让笔记自己长出结构](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489471&idx=1&sn=a6320badc3225fcb33f528ade2f3fb7d&scene=21#wechat_redirect)
* [Obsidian 入门11：写日记这件事，可能只差一个 Calendar](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488910&idx=1&sn=15e1665185bd38520633cf362299b58e&scene=21#wechat_redirect)

### 工作流与 Skill 设计

* [Obsidian 入门40：把我的写作工作流Skill免费分享给你](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489834&idx=1&sn=6e3f4040aadb0857e6a65b5f8640facf&scene=21#wechat_redirect)
* [Obsidian 入门39：怎么创建自己的 Skill？我把五步拆给你看](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489822&idx=1&sn=852ce0360431ecb3a056e32a7f2b385c&scene=21#wechat_redirect)