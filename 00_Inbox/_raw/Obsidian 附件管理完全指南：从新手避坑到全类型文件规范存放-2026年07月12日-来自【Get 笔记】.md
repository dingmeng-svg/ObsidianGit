---
title: "Obsidian 附件管理完全指南：从新手避坑到全类型文件规范存放"
author: "Get达人"
date: "2026-07-12"
ingest_status: ingested
ingested_at: 2026-07-17
---

# 🎯 背景与核心痛点

这是「Obsidian × AI」系列教程的附件管理专题，针对所有Obsidian新手都会遇到的典型问题：随手粘贴截图后，本地文件夹里会生成大量`screenshot-001.png`这类名称高度相似的文件，时间一长根本无法对应到所属笔记，**附件如果疏于管理，混乱程度甚至会超过笔记本身**。

# 📌 附件基础定义

在Obsidian的逻辑里，除了Markdown文本之外的所有文件都被定义为**附件（Attachment）**，Obsidian会将附件作为本地文件处理，统一存放在vault（笔记库）的文件夹结构中，和笔记文件同目录管理。
附件覆盖的文件类型非常广泛：
1.  图片类：PNG、JPG、GIF、SVG
2.  文档类：PDF、Word、Excel
3.  音视频类：MP3、MP4
4.  任意手动拖入笔记的自定义文件

添加附件共有三种便捷方式，用户可按需选择：
- 截图后直接使用 Ctrl/Cmd+V 粘贴
- 从桌面/本地文件夹直接拖拽文件进入笔记
- 按下 Ctrl/Cmd+P 唤起命令面板，输入「插入附件」后选择目标文件

# 📊 四种附件存放策略全对比

附件管理的核心设置入口为「设置」→「文件与链接」→「新建附件的默认存放位置」，共提供4种官方方案，各有适配场景，无绝对优劣：

| 存储策略 | 配置方式 | 存储规则 | 优势 | 劣势 |
| :--- | :--- | :--- | :--- | :--- |
| 1. Vault根目录（默认） | 选择「仓库的根目录」 | 附件直接放在笔记库根目录，和笔记文件混存 | 零配置开箱即用，操作门槛极低 | 长期使用后根目录文件混杂，整理难度高 |
| 2. 统一集中文件夹 | 选择「指定的附件文件夹」，填写路径`attachments/` | 所有新附件全部存入根目录下的`attachments/`文件夹，不受当前编辑笔记位置影响 | 附件高度集中，备份操作简单，查找附件仅需进入单一目录 | 图片和笔记物理分离，使用久了容易遗忘单张截图的所属笔记 |
| 3. 跟随笔记所在目录 | 选择「当前文件所在文件夹」 | 附件自动存入当前笔记所在文件夹的`attachments/`子目录，无该子目录时Obsidian会自动创建 | 笔记和附件强绑定，迁移笔记目录时不会出现图片丢失问题 | 附件分散在各个笔记目录中，全局查找单张截图需要先回忆其所属笔记 |
| 4. 笔记目录自定义子文件夹 | 选择「当前文件所在文件夹的子文件夹」，自定义命名如`assets/`/`images/` | 附件存入当前笔记文件夹下的自定义命名子文件夹，不会在根目录生成`attachments/` | 文件夹命名自由度高，可适配个人文件命名习惯 | 和第三种方案一致，附件整体较为分散 |

> [!info] 🏷️ ingested — 2026-07-17
> 已提炼为原子笔记：
> - [[概念/附件在 Obsidian 中的定义与类型无关性]]
> - [[实践/Obsidian 附件存放策略四选一切换自由]]

## 新手适配建议

刚接触Obsidian、还未形成明确文件管理习惯的用户，优先选择第一种或第二种方案，先以集中管理附件降低初期维护成本，后续熟悉工具逻辑后再切换其他策略即可，**该设置随时可修改，且不会影响已经存在的历史附件**。

# 🖼️ 图片嵌入语法说明

粘贴截图后Obsidian会自动生成图片嵌入代码，目前支持两种主流语法，最终展示效果完全一致：
1.  **标准Markdown语法**：`图片描述`，是通用的跨平台Markdown标准写法，作者个人日常使用频率更高。
2.  **Obsidian专属Wiki Link语法**：`![[图片文件名]]`，是Obsidian特有的超链接嵌入写法，熟悉Wiki Link体系的用户使用体验更流畅。

# 💡 进阶实用技巧
1.  **冗余附件清理**：很多时候笔记里的图片引用被删除后，对应的附件文件依然残留在文件夹中，长期积累会产生大量无用文件，这类场景可以通过专属插件自动识别未被引用的附件，相关插件使用方法将在后续插件专题教程中详细说明。
2.  **全类型附件通用**：上述所有附件管理逻辑并非仅适用于图片，PDF、Excel、音视频等所有附件类型都可以用这套规则统一管理，在笔记中嵌入对应附件后，点击即可唤起系统默认应用打开文件。
3.  **跨平台发布前置方案**：如果需要将本地笔记发布到公众号、博客等外部平台，本地图片会因为路径限制无法正常加载，这类问题的解决方案是搭建**图床**，后续插件专题会详细讲解操作方法，作者也提供了《如何快速搭建自己的专属图床》的保姆级教程可供提前预习。

# 原文
> 这是一个「Obsidian × AI」系列。
>
> 我会从最基础的认知开始，慢慢写到资料整理、写作工作流，再到怎么把 AI 接进来。
>
> 如果你还没看前几篇，可以先看 [Obsidian
> 入门7：给笔记打标签——让内容自己跳出来](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488870&idx=1&sn=36148d811676bba085ce6051794b74ff&scene=21#wechat_redirect)

---

有一件事，大概每个 Obsidian 新手都会经历。

写着写着，随手截了个图，Ctrl+V 贴进去了。

又截了一张，又贴进去了。

过了一段时间，打开文件夹一看：

`screenshot-001.png`、`screenshot-002.png`、`screenshot-003.png`……

每张截图的名称都差不多，根本分不清哪张是哪篇笔记用的。

这时候你才意识到：**附件这东西，不管它的话，比笔记还乱。**

## 附件是什么

先说清楚我们今天在聊什么。

Obsidian 里，除了 Markdown 文本，其他所有东西都叫**附件（Attachment）**。

* 图片：PNG、JPG、GIF、SVG
* 文档：PDF、Word、Excel
* 音视频：MP3、MP4
* 任何你拖进笔记里的文件

Obsidian 把附件当成本地文件处理，存在 vault 里，和你的笔记在同一个文件夹结构下。

添加附件有三种方式：

* 截图后直接 Ctrl/Cmd+V 粘贴
* 从桌面或文件夹**拖进来**
* 命令面板：按 Ctrl/Cmd+P，输入「插入附件」，然后选择文件

哪种都行，核心是**附件放在哪里，你需要提前想好**。

---

## 四种存放策略，选择一种

这是附件管理的核心设置。

打开「设置」→ 「文件与链接」，找到「新建附件的默认存放位置」。

它有四个选项：

### 第一种：放在 Vault 根目录（默认）

这是默认选项。附件会直接放在 Vault 的根目录，和笔记混在一起。

什么都不用设置，直接能用。

坏处是时间长了 Vault 根目录会变得很乱，笔记和附件混在一起不好整理。

![CleanShot 2026-03-25 at 23.09.42.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Ff7143335e4b4ac6a5143fe474f1eeee5?Expires=1786438659&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Pa17W59jAxDzFa2lKCOBQS2vAXk%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

### 第二种：统一放一个文件夹

选「在下方指定的文件夹」，然后在下面的框里填 `attachments/`。

所有新附件都会统一进入 `attachments/` 这个文件夹，不管你当前在哪个笔记里。

所有附件集中，备份简单，找附件只需要进一个目录。

但是图片和笔记不在同一个地方，时间长了有时候会忘记「这张图是哪篇笔记用的」。

![CleanShot 2026-03-25 at 23.14.43.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fbac48813c0d8f029baa3ff07a3b657c9?Expires=1786438659&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=h094gPEn7KJPRYwaHjyPm6%2Fh8R4%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

### 第三种：跟着笔记走

选「当前文件所在文件夹」。

附件会存在当前笔记所在的文件夹里。如果这个文件夹里没有 `attachments/` 子文件夹，Obsidian 会自动创建一个。

也就是说：

* 你的日记笔记在 `日记/` 目录 → 截图就存在 `日记/attachments/`
* 你的读书笔记在 `读书/` 目录 → 截图就存在 `读书/attachments/`

笔记和附件绑定在一起，搬家时不会丢图片。不过，附件分散在各个文件夹，想找某张截图得先想清楚它属于哪篇笔记。

### 第四种：在笔记文件夹的子文件夹里

选「当前文件所在文件夹的子文件夹」，然后指定一个子文件夹名字，比如 `assets/`。

附件会存在当前笔记文件夹的子文件夹里，和「跟着笔记走」类似，但不会在根目录创建 `attachments/`，而是用你自己命名的文件夹。

此时，文件夹命名更自由，比如用 `assets/`、`images/` 都可以。不过也会和第三种方式一样，附件会比较分散。

---

我刚开始用 Obsidian 的时候，用的是**第二种**。以上四种方式没有优劣之分，主要是看自己的喜好。

但如果你刚刚开始用 Obsidian，还没想清楚，我建议先选**第一种**或者**第二种**。把所有附件集中管理，等有感觉了再切换也不迟。

这个设置随时可以改，不影响已经存在的附件。

---

## 粘贴图片，然后呢

说完设置，说操作。

你在 Obsidian 里按 Ctrl/Cmd+V 粘贴一张截图，它会自动在你的笔记里插入一行：

```


1






```

这就是图片的**嵌入语法**：输入这行字，Obsidian 会把图片直接显示在笔记里。

![CleanShot 2026-03-25 at 23.27.54.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fc7f79f7b85ab11e168cac356b25e0f81?Expires=1786438659&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=ICQ7Njr6%2Bk2NbPuZ0f704Ka4dgc%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

Obsidian 还支持另一种写法：

```


1






```

这个叫 **Wiki Link 嵌入**，效果是一样的，只是语法不同。

![CleanShot 2026-03-25 at 23.30.08.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fa5b11657ad9855eab02ae853097126a6?Expires=1786438659&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=QTnRX7n%2B5XDkceC%2F9AILLHTgtPg%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

区别在于：`![]()` 是标准 Markdown 语法，`![[]]` 是 Obsidian 特有的 Wiki Link 语法。

我个人写笔记的时候用 `![]()` 比较多，但如果你熟悉 Wiki Link，用 `![[]]` 完全没问题。

---

## 顺手清理没用的附件

有些截图你贴了一次，后来删掉了那行文字，图片却还留在文件夹里。

附件越积越多，你都不知道哪些还在用。

这个问题可以通过插件来解决。

具体用哪个插件、怎么用，我会在介绍 Obsidian 插件的那一篇里详细说明。先记住有这么一件事就行。

---

## 截图之外：PDF、Word 也能这么管

前面主要说的是图片，但同样的逻辑适用于任何附件。

你可以在笔记里嵌入一个 PDF：

```


1






```

也可以嵌入一个 Excel：

```


1






```

点一下就调用系统默认应用打开。

所以这套附件管理逻辑不只是管图片，**所有文件类型都适用**。

---

说到这里，你应该已经掌握了 Obsidian 里附件管理的基本方法。

但还有一个问题没解决：

当你需要把笔记发布到公众号或博客的时候，笔记里的本地图片在别的平台是打不开的。因为它们还躺在你的电脑里。

解决这个问题的方式叫**图床**，后面我们讲到插件的时候会专门来聊这个话题。

顺便说一句，我之前写过一篇[如何快速搭建自己的专属图床](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483764&idx=1&sn=d642353b1b8fa7752501ccd33f36e1e6&scene=21#wechat_redirect)的保姆级教程，讲的是怎么具体搭建图床。如果感兴趣的话，可以提前预习一下，哈哈-\_-

记得关注，我们下期见。

---

## 进阶阅读

> 我将这一系列的入门教程整理到了一个统一的文档，需要的朋友可以加我（linauwawa)免费获取。

如果你早就已经用上了 Obsidian，下面这些文章也许对你有帮助：

* [受够了复制粘贴，我把 Obsidian 直接接进了微信后台](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247487583&idx=1&sn=f8a50c32c5c2ab2c6caed3868a17ea8c&scene=21#wechat_redirect)
* [我做了个插件，让公众号排版不用离开 Obsidian](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247487479&idx=1&sn=d071e75da42910e0e275c8126e366959&scene=21#wechat_redirect)
* [不花一分钱，让豆包、Kimi、Deepseek住进Obsidian](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247486633&idx=1&sn=3c32479ec5689c83bbd1975dd23f0105&scene=21#wechat_redirect)
* [我的 obsidian 插件支持中文标点标准化,拒绝长文的标点崩坏](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488708&idx=1&sn=ce9f25971230f58c9639594645ab7e87&scene=21#wechat_redirect)

* [Obsidian记录生活：我配置了日记和周记模板](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483834&idx=1&sn=2da6b17c869a680c0138c7aed22579bb&scene=21#wechat_redirect)
* [保姆级教程：将 Gemini CLI和Claude code集成到 Obsidian](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247485994&idx=1&sn=65c2efa26a21907a43ba57634e7cdfea&scene=21#wechat_redirect)
* [Obsidian 多端同步保姆级教程](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483796&idx=1&sn=f5e4894afa52c89ade024003d4523011&scene=21#wechat_redirect)
* [不写一行代码，让服务器上的 OpenClaw 自动往我的 Obsidian 里塞笔记](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488466&idx=1&sn=da8b184a02aa5c2440a402fef5611ad8&scene=21#wechat_redirect)
* [被官方 Bot 打回 10 次后，我终于摸清了 Obsidian 插件上架的所有“潜规则”](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488701&idx=1&sn=7380f921089f7f5d806cefabb143807e&scene=21#wechat_redirect)

* [哪怕只有 1% 的概率丢数据，我也输不起：给 Obsidian 上一道“终极保险”](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247486150&idx=1&sn=8866f3a9460e0c9d66a855f79c5e85b0&scene=21#wechat_redirect)
* [我的AI工作流：Obsidian日记库 → Cursor侧写 → Gemini上下文](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483868&idx=1&sn=99e6e3d3ecaccb0171a6df9ce351b585&scene=21#wechat_redirect)
* [我的Obsidian魔改之旅—— 如何用AI助手零代码构建会自我进化的数字主页](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483820&idx=1&sn=f44b5ec12bb6f228f26f788e3d9ac4b1&scene=21#wechat_redirect)
* [如何快速搭建自己的专属图床(Obsidian - 图床+Picgo+OB插件）](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483764&idx=1&sn=d642353b1b8fa7752501ccd33f36e1e6&scene=21#wechat_redirect)