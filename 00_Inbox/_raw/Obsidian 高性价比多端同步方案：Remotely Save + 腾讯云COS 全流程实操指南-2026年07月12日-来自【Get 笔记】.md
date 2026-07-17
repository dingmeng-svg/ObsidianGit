---
title: "Obsidian 高性价比多端同步方案：Remotely Save + 腾讯云COS 全流程实操指南"
author: "Get达人"
date: "2026-07-12"
---

# 🎯 方案核心优势

该方案是作者在「Obsidian x AI」系列入门57提及的8条同步路径中，推荐的性价比最高的选择，核心优势有三点：
1.  **成本极低**：个人笔记同步的存储用量极小，实测预充10元可正常使用1年以上。
2.  **访问速度快**：依托国内云服务器节点，避免了Obsidian官方同步、iCloud等海外服务偶发的网络波动问题。
3.  **配置复用性强**：如果用户此前跟着入门46教程搭建过Obsidian图床，已有的腾讯云COS账号、密钥、存储桶可以直接复用，无需重复操作。
整套流程总耗时仅约10分钟：5分钟完成插件配置，5分钟即可跑完首次全量同步。

# 📝 分步实操教程

## Step 1：安装 Remotely Save 插件
1.  打开Obsidian，进入「设置 → 第三方插件 → 社区插件市场」，点击「浏览」进入插件检索页面。
2.  搜索**Remotely Save**，进入插件详情页点击安装，完成后启用插件。
3.  启用成功后，左侧工具栏会出现该插件的专属图标，后续可点击图标手动触发同步操作。

## Step 2：创建腾讯云COS存储桶

如果已有用于图床的COS存储桶，可直接跳过本步骤。新用户操作要点：
1.  打开腾讯云官网，完成注册与实名认证，在控制台找到「对象存储COS」服务，新建存储桶。
2.  核心配置项注意事项：
    | 配置项 | 设置要求 | 说明 |
    |---|---|---|
    | 存储桶名称 | 自定义全局唯一名称 | 不可与全网其他用户重名 |
    | 所属地域 | 选择距离自己最近的节点（如广州、上海、北京） | 降低访问延迟 |
    | 访问权限 | 选择**私有读写** | 和图床的「公有读私有写」不同，笔记文件禁止公开访问，保障隐私安全 |
3.  在「高级可选配置」页面，取消版本控制等默认勾选的付费增值服务，避免产生不必要的额外扣费。
4.  创建完成后，记录下「存储桶名称」和「所属区域代码」（格式示例：`ap-guangzhou`、`ap-beijing`），后续配置插件时需要使用。

## Step 3：获取API密钥

进入腾讯云控制台的「访问管理 → 密钥管理」页面，新建访问密钥，系统将生成一对**SecretID**和**SecretKey**，需妥善保存避免泄露。

## Step 4：配置Remotely Save插件

回到Obsidian的Remotely Save设置页，将同步方式切换为「S3或兼容S3的对象存储」，按要求填入对应信息：
| 配置项 | 填写规则 | 示例 |
|---|---|---|
| Endpoint | 格式为`cos.{region}.myqcloud.com` | `cos.ap-guangzhou.myqcloud.com` |
| Region | 填写此前记录的存储桶区域代码 | `ap-guangzhou` |
| AccessKeyID | 填入腾讯云生成的SecretID | `AKIDxxxxxxxx` |
| SecretAccessKey | 填入腾讯云生成的SecretKey | `xxxxxxxx` |
| BucketName | 填入存储桶的完整名称 | `obsidian-12345678` |
填写完成后点击页面底部的「检查」按钮，出现绿色「连接成功」提示即代表配置生效。
> 常见连接失败排查点：Endpoint格式错误、密钥复制时附带多余空格、存储桶名称填写错误。

## Step 5：执行首次同步

按下快捷键`Cmd+P`（Windows系统为`Ctrl+P`），输入关键词`remote`，选择「Remotely Save：开始同步」指令，即可启动首次全量同步。实测1000+文件的笔记库首次同步耗时约5分钟，同步完成后可在腾讯云COS的存储桶列表中看到所有本地笔记文件。

## Step 6：完成移动端同步

在iOS或安卓端的Obsidian中安装Remotely Save插件，填入和桌面端完全一致的COS配置信息，触发同步后云端所有笔记文件将自动拉取到本地，后续多端修改笔记后手动触发同步，即可实现全端内容实时更新。

# 🔄 阿里云OSS兼容方案

如果用户使用的是阿里云对象存储OSS，整体操作流程完全一致，仅需调整4项配置即可：
1.  在阿里云控制台开通OSS服务并创建私有读写权限的Bucket
2.  在RAM访问控制中生成对应的AccessKey密钥
3.  Endpoint格式调整为`oss-{region}.aliyuncs.com`，例如杭州节点为`oss-cn-hangzhou.aliyuncs.com`
4.  Region字段填写阿里云区域代码，例如杭州节点为`cn-hangzhou`

# 💰 成本参考与注意事项
1.  腾讯云COS新用户通常有免费额度，优惠期结束后采用按量计费模式，纯笔记同步的文本内容体量极小，实测同一存储桶同时承载图床+笔记同步的用量，叠加CDN流量年总花费不到10元。
2.  建议注册云服务后预充10元，开启账单告警功能，首月留意用量明细即可完全控制成本。
3.  该方案可实现一个COS存储桶同时承载「图床托管」和「笔记多端同步」两项功能，无需额外开通其他付费服务。

# 原文
> 这是一个「Obsidian x AI」系列。
>
> 入门57 给了 8 条路的全景图。这篇拆开其中一条来走：Remotely Save + 腾讯云 COS。
>
> 选这条路先讲，原因很简单，如果你之前跟着入门46 搭过图床，那你的腾讯云 COS 存储桶已经在了，直接复用就行。

[入门
57](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490108&idx=1&sn=d6329115fb27bd50b352df65b5a8adda&scene=21#wechat_redirect)
发出来后，有朋友问：8 条路里性价比最高的是哪条？

我的答案是 Remotely Save + 腾讯云 COS。原因有三个。

第一，便宜。个人笔记同步的用量很少，基本花不了几个钱。我之前预充了 10 块，用了一年多还剩 2 块。

第二，国内访问快。服务器就在国内，不像 Obsidian Sync 或 iCloud 偶尔还要看网络心情。

第三，如果你之前跟着入门46 搭过图床，那你腾讯云的账号已经注册好了，密钥已经有了，存储桶已经建好了，这些东西可以直接复用，不用再折腾一遍。

![image.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fed59ac72d31739869caef3ab48937cef?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=EB93dWeHSarIbpw5bwWauEGsqZM%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

所以这篇教程你可能只需要花 10 分钟：5 分钟装插件配好，5 分钟等第一次同步完成。

阿里云 OSS 的用户也不用急，步骤完全一样，只是控制台不同。我会在最后单独说一下。

---

## Step 1：安装 Remotely Save

打开 Obsidian，进入设置 → 第三方插件 → 社区插件市场，搜索 **Remotely Save**。

![在社区插件市场搜索 Remotely Save|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F0203326020606bf6984dcb0a918165f2?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=8PztANAjxAOmqdfa9TYtnM52A3s%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

点进插件卡片，点击安装，然后启用。

![点击安装 Remotely Save|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Faed6dfce18933bb633763d98619a28ae?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=RV5oDEowVtzzCtu%2BHJKOP2VCJnw%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

启用之后，左侧工具栏会出现一个 Remotely Save 的图标，后面如果想要手动触发同步，可以点击这个图标。

现在，点进去插件设置页面，能看到对应的配置选项。不过现在基本都是空的，我们先去腾讯云那边准备好信息再回来填。

## Step 2：腾讯云 COS 创建存储桶

如果你已经跟着入门46 搭过图床，这一步可以跳过，直接用已有的存储桶就行。

还没弄过的朋友，跟着走一遍。

打开腾讯云官网，注册并完成实名认证。然后在控制台找到「对象存储」，创建一个存储桶。

创建时注意几个设置。

* 存储桶名称： 随便起，但不能重名
* 所属地域： 选离你最近的，比如广州、上海、北京
* 访问权限： 选 **私有读写**。这一点跟入门46 的图床不同。图床需要公有读私有写，同步必须私有，因为你的笔记文件不应该被公开访问

![新建存储桶界面|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F09613392936e0eb7fae4cc37ecb0ae3c?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=DTRuDDpDdhNArmqHq9aCLDrha70%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

创建页面底部可能会有一些默认勾选的额外付费服务，记得取消掉。

![取消默认勾选的额外付费服务|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fcd1c0065dffda47f851e747f89734a85?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=40yTN9qK9%2FMxNgJHeaEP9cZRSbU%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

创建完成后，记下两个信息。

1. 存储桶名称： 在存储桶列表里能看到
2. 所属区域： 格式类似 `ap-guangzhou`、`ap-beijing`

这两个信息等下配置 Remotely Save 时要填。

## Step 3：获取 API 密钥

去腾讯云的「密钥管理」页面（控制台 → 访问管理 → 密钥管理），新建一个密钥。

系统会生成一对 **SecretID** 和 **SecretKey**。把它们复制下来，安全和密钥一样重要，不要泄露给别人。

## Step 4：配置 Remotely Save

现在回到 Obsidian 的 Remotely Save 设置页面。

把 **同步方式** 切换到 **S3 或兼容 S3 的对象存储**。然后填入以下信息。

| 配置项 | 从哪里拿 | 示例 |
| --- | --- | --- |
| **Endpoint** | 存储桶的所属地域，格式为 `cos.{region}.myqcloud.com` | `cos.ap-guangzhou.myqcloud.com` |
| **Region** | 存储桶的所属区域 | `ap-guangzhou` |
| **AccessKeyID** | 上一步拿到的 SecretID | `AKIDxxxxxxxx` |
| **SecretAccessKey** | 上一步拿到的 SecretKey | `xxxxxxxx` |
| **BucketName** | 存储桶名称 | `obsidian-12345678` |

填完之后，拉到页面下方，点 **检查** 按钮。如果看到绿色的「连接成功」提示，说明配置没问题。

![Remotely Save 配置页面|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fcd1f65b7d45093294e8340566bd2de24?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=iEFmu1s9HwqVvzqsmEVB6TsPBpU%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

如果检查失败，最可能的原因是。

* Endpoint 格式写错了。注意是 `cos.{region}.myqcloud.com`，不是存储桶的访问域名
* SecretID 或 SecretKey 复制多了空格
* 存储桶名称写错了

## Step 5：首次同步

配置成功后，按 `Cmd + P`（Windows 用 `Ctrl + P`），输入 `remote`，选择 **Remotely Save：开始同步**。

第一次同步会把你的整个 Vault 上传到 COS。文件数量不同，耗时不一样。我自己的库那个时候有 1000 多个文件，第一次同步大概 5 分钟。

![选择同步命令|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F8cbd6bb5563cffb34b8f2c8d39e81177?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=n1CM1YpyPsOtWg396QJcFqz6N98%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

同步完成后，打开腾讯云 COS 的存储桶页面，你应该能看到你的笔记文件已经在里面了。

## Step 6：手机端也配上

iPhone 或 Android 上的操作一样。

安装 Obsidian 和 Remotely Save 插件，填入同样的 COS 信息。然后点同步，所有文件就会从云端拉到手机上了。

之后你在电脑上改了笔记，点一下同步，手机上就能看到最新版本。反过来也一样。

![image.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fbecaad368a2a652e8596e767e1d14ec4?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=ksOlaBbE4Xk0F9%2Bqhwf9uLuBGMc%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

## 不想用腾讯云？阿里云 OSS 也可以

整体步骤完全一样，只是控制台不同。

1. 在阿里云控制台开通对象存储 OSS，创建 Bucket
2. 在 RAM 访问控制里创建 AccessKey
3. Endpoint 格式是 `oss-{region}.aliyuncs.com`，比如 `oss-cn-hangzhou.aliyuncs.com`
4. Region 填对应的区域代码，比如 `cn-hangzhou`

其他配置项一一对应，填到 Remotely Save 里就行。检查连接通过后，就可以开始同步了。

## 费用

腾讯云 COS 新用户通常有免费额度，但过了优惠期是按量计费。好在纯笔记同步的文件都是文本，体量很小。

我自己的使用情况供参考：入门46 搭了图床、这篇配了同步，同一个存储桶跑了一年多，加上 CDN 流量，总共花了不到 10 块钱。

建议注册时预充 10 块，打开账单告警。头几个月留意一下用量，心里有数就好。

---

Remotely Save + COS 配好之后，Obsidian 的多端同步就解决了。

入门46 的时候，腾讯云 COS 存储桶帮你管图片。现在，同一个 COS 存储桶帮你同步笔记。一个桶干两件事，不用额外开任何服务。

之前在 Mac 上写了一半的笔记，打开手机，同步一下，接着写。那种感觉谈不上惊喜，就是松了一口气。

![image.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F6cbd399a456fb3aebe292e6aa87bfc3a?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=gChpE0q9Y0D8GLonAH4%2BOFVqjys%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

下篇会拆另一条路，看你想先走哪个。

## 进阶阅读

* [Obsidian 入门57：找到适合自己的多端同步方案](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247490108&idx=1&sn=d6329115fb27bd50b352df65b5a8adda&scene=21#wechat_redirect)
* [Obsidian 入门46：给 Obsidian 搭个图床，图片终于不怕丢了](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489946&idx=1&sn=2c40bc78db36cb52faded95ede054c91&scene=21#wechat_redirect)
* [Obsidian 多端同步保姆级教程](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483796&idx=1&sn=f5e4894afa52c89ade024003d4523011&scene=21#wechat_redirect)

> [!info] 🏷️ ingested — 2026-07-17
> 已提炼为原子笔记：
> - [[概念/同步与图床的存储桶复用原则]]
> - [[实践/Remotely Save + COS 同步配置方案]]

如果这篇文章对你有帮助，欢迎三连（点赞、转发、推荐）。

> [!info] 🏷️ ingested — 2026-07-17
> 已提炼为原子笔记：
> - [[技术/概念/同步与图床的存储桶复用原则]]
> - [[技术/实践/Remotely Save + COS 同步配置方案]]

我也建了一个 Obsidian 交流群，欢迎你的加入。在 AI 时代，让我们一起做好知识管理。群满200人了，感兴趣的朋友可以加我：linauwawa，我拉你入群。

![Image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fca32270bd683238e2c04ab11d1aabb8a?Expires=1786436454&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=dLa9cHYyzWgN1Ua%2Bdg8PlyeYZtI%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)