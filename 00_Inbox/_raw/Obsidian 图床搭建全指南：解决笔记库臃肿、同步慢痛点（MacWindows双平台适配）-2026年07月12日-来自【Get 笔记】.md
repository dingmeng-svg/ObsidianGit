---
title: "Obsidian 图床搭建全指南：解决笔记库臃肿、同步慢痛点（Mac/Windows双平台适配）"
author: "Get达人"
date: "2026-07-12"
ingest_status: ingested
ingested_at: 2026-07-17
---

# 🎯 核心背景：Obsidian 本地存储图片的原生痛点

Obsidian 采用Markdown原生机制存储图片：拖入图片时不会将内容嵌入文档，而是将图片文件复制到vault（笔记库）的附件文件夹中，仅在笔记内写入引用链接。当笔记中大量插入图片后，会快速触发三类现实问题：

| 痛点类型       | 具体表现                                                                                 |
| :--------- | :----------------------------------------------------------------------------------- |
| **同步效率问题** | 单张手机截图约2-3MB，单篇教程类笔记5-6张图就占用十几MB，大量图片会拖慢Obsidian Sync、iCloud等多端同步速度，移动端打开笔记时图片加载耗时过长 |
| **存储成本问题** | Obsidian Sync按流量计费，iCloud存储空间配额有限，大量图片会快速消耗付费存储额度                                    |
| **管理混乱问题** | 所有图片堆积在单一附件文件夹中，长期使用后难以溯源归属，无法高效分类管理                                                 |

针对上述问题，**图床**是更优解决方案：将图片上传至云端存储服务，本地笔记仅保留几KB的文本引用链接，实现图片与笔记完全解耦，同步速度大幅提升，移动端可通过CDN快速加载图片。

# 🛠️ Mac 平台全流程搭建方案

作者实测稳定运行1年以上的成熟链路：腾讯云COS + PicGo + Obsidian Image Auto Upload Plugin。

## 第一步：注册配置腾讯云COS

腾讯云对象存储（COS）是国内主流图床方案，具备访问速度快、有免费额度的优势，仅需完成基础实名认证即可使用：
1.  进入腾讯云COS控制台，创建存储桶（云端图片存储容器）
2.  关键配置项：存储桶名称自定义且全局唯一，访问权限选择「公有读私有写」（保障图片可公开访问、仅本人可上传修改），其余选项保持默认，取消所有默认勾选的额外付费服务避免产生不必要扣费
3.  创建完成后记录**存储桶名称**、**存储区域**两个核心参数，进入密钥管理页面生成专属`SecretID`和`SecretKey`
4.  最低充值10元即可支撑个人用户长期使用，作者实测10元可使用1年以上仍剩余2元余额。

## 第二步：安装配置PicGo

PicGo是一款成熟的跨平台图片上传工具，当前最新稳定版本为v2.5.3（2026年3月发布），Mac端v2.4.2之后版本已完成开发者签名，不会出现「未识别开发者」的安装提示：
1.  从官方网站或GitHub Release页下载安装包
2.  进入「图床设置」→「腾讯云COS」，依次填写COS版本V5、此前记录的SecretID/SecretKey、存储桶名称、存储区域，若需指定图片存储子目录可填写带末尾斜杠`/`的自定义存储路径
3.  切换至上传区，将默认图床切换为腾讯云COS，拖拽单张图片测试上传，确认COS存储桶中可正常看到上传文件即链路连通
4.  多设备用户可开启**PicGo Cloud**功能，将图床配置、上传历史同步至云端，更换设备后登录账号即可直接恢复所有配置，无需重复填写密钥信息。

## 第三步：配置Obsidian插件
1.  在Obsidian社区插件市场搜索安装`Image Auto Upload Plugin`，默认设置即可直接生效
2.  完成配置后拖拽图片或直接粘贴截图，插件会在1-2秒内自动调用PicGo上传图片并将云端链接插入笔记，全程近乎无感
3.  可选优化：安装`Paste Image Rename`插件，粘贴图片时可自定义图片命名规则，避免生成无意义的乱码文件名；在Image Auto Upload插件设置中配置「图片大小后缀」，例如设置为`|400`可统一约束笔记内图片的展示尺寸。

# 📋 多方案对比与选型逻辑

除了上述成熟方案，Obsidian生态内还有其他主流的图片自动上传方案，可根据自身需求选择：
| 方案名称 | 实现逻辑 | 优势 | 劣势 |
| :--- | :--- | :--- | :--- |
| **Image Auto Upload + PicGo** | 插件仅拦截粘贴事件，上传逻辑完全交由独立客户端PicGo处理 | 插件功能极简故障率低，PicGo支持系统级全局上传，全软件通用，插件生态覆盖绝大多数主流存储服务 | 需要额外安装本地客户端 |
| **Image Uploader** | 插件内置上传能力，无需外部客户端，直接对接S3兼容存储服务 | 无需额外安装软件，更轻量化 | 不同存储服务的配置项差异较大，上手门槛更高 |

作者最终选择前者的核心原因是：PicGo作为独立客户端，可脱离Obsidian在全系统任意软件中通过快捷键快速上传截图，不受笔记软件限制，扩展性更强。

# 💻 Windows 平台适配说明

Windows端搭建流程与Mac几乎完全一致，仅存在少量细节差异：
1.  PicGo Windows版本安装包可从同一GitHub Release页获取，配置界面和操作逻辑与Mac端完全统一
2.  Windows端PicGo安装后默认开启开机自启，若无需该功能可手动在设置中关闭
3.  PicGo v2.5.0之后版本统一默认全局上传快捷键为`Cmd/Ctrl + Shift + U`，即Mac端为`Cmd + Shift + U`，Windows端为`Ctrl + Shift + U`，旧版默认快捷键`Ctrl+Shift+P`已废弃，支持用户自定义修改适配微信截图、Snipaste等常用截图工具
4.  PicGo Cloud跨平台同步功能完全兼容，Mac端配置的所有图床信息可直接同步至Windows设备。

# 🔌 更多图床扩展选择

依托PicGo的插件生态，除腾讯云COS外还可适配绝大多数主流存储服务：
1.  零成本方案：安装WebDAV插件，直接对接已有的NAS设备或支持WebDAV协议的私人云盘，适合已有私有存储的用户
2.  阿里云生态用户：安装阿里云OSS插件，配置逻辑与腾讯云COS完全一致
3.  全球加速需求用户：选择AWS S3或Cloudflare R2，其中R2为个人用户提供免费额度，使用成本极低。

# 💡 关键决策参考

搭建图床并非对所有用户都必要：如果仅偶尔在笔记中插入少量图片，原生本地附件方案完全可以满足需求，无需额外折腾。
但如果符合以下任意一种场景，仅需10分钟完成搭建即可获得长期收益：
- 高频产出教程类笔记，需要大量插入截图
- 长期依赖多设备同步Obsidian笔记库
- 不希望笔记库体积无限制膨胀至数GB级别

# 原文
> 这是一个「Obsidian × AI」系列。
>
> 我会从最基础的认知开始，慢慢写到资料整理和收集、写作工作流，再到怎么把 AI 接进来。
>
> 如果你还没看过上一篇，可以先看 [Obsidian 入门45：对自己好一点，给 Obsidian
> 建个个人主页](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489916&idx=1&sn=ed8657c345bfbd2460d99df9862a6f85&scene=21#wechat_redirect)

有朋友问我，你在 Obsidian 里贴了那么多图片，库会不会很臃肿？

会。而且不只是臃肿的问题。

## 图片在 Obsidian 里是怎么存的

你在 Obsidian 里拖进一张图片，它不会像在 Word 里一样嵌入到文档里。Obsidian 会把图片文件复制到你的 vault
目录下的某个附件文件夹，然后在文档里写一行 `` 来引用它。

> 关于附件的使用，可以阅读 [Obsidian
> 入门8：附件与图片管理，给你的笔记装上「附件收纳术」](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488877&idx=1&sn=bdd3b8437692d3bc2d9d5a4d9d54915b&scene=21#wechat_redirect)

这是 Markdown 的工作方式，本身没问题。

但问题出在，当你开始大量用图的时候，情况就变了。

一张手机拍的截图大概 2-3MB，一篇教程文章放 5-6 张图很正常，一篇文章光是图片就占了十几
MB。如果你的库有几十篇文章，几百张图，很快就会变成一个本地的巨大仓库。

然后你会遇到三个很现实的问题。

第一个，同步变慢了。如果你用 Obsidian Sync、iCloud
多端同步或者其他同步方案，每张图片都要上传下载。在自己电脑上还好，但在手机上看，等图片加载完的那几秒，足够让你失去阅读耐心。

第二个，存储空间膨胀。Obsidian Sync 是按流量计费的，iCloud 的空间也不是无限的。

第三个，管理混乱。所有图片都堆在一个附件文件夹里，时间一长根本分不清谁是谁。

所以衡量下来很不划算，更好的解决方案是使用**图床**。

![多设备同步困境|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fce852d600e213141a895bff2cadf76f6?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=IzI2d4btlnYB2T9jBsRq4SP3Cyw%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

图床是一个在线的图片存储服务，你把图片传上去，拿到一个链接，贴到 Obsidian 里。图片实际存在云端，本地只留一个文本链接。

好处很明显。同步的时候只传几 KB 的文字，不传图片。手机打开文章，图片从 CDN 加载，比自己库里的附件还快。所有的图片都在图床的管理后台，跟文章完全解耦。

接下来我直接说怎么搭。

---

## 开始搭：Mac 版

我会用腾讯云 COS 作为图床，搭配 PicGo（读作匹克够，Mac 上的一个软件） 和 Image Auto Upload Plugin（读作一米鸡 阿噗楼
普拉金， Obsidian 的一个插件），在 Mac 上跑通这条链路。

这套方案我自己用了一年多了，很稳。

### 第一步：注册腾讯云 COS

腾讯云的对象存储（COS）是国内最常用的图床方案之一。优点是稳定、国内访问快、有免费额度。缺点是实名认证稍微有点门槛。

打开腾讯云官网，注册并完成实名认证。

> 腾讯云 COS 的网址：https://console.cloud.tencent.com/cos

![CleanShot 2026-05-15 at 22.08.03.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F86d5f5c7a9e8738e726dfc6e7b474294?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=xm%2Fqu56%2BwRJDo9gijvcFjlQB43U%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

然后在控制台里找到「对象存储」，创建一个存储桶（就是存储图片的文件夹）。创建的时候注意几个设置：

* 存储桶名称： 随便起一个，但不能重名
* 访问权限： 选「公有读私有写」。这样别人能看到你的图片，但只有你自己能上传和删除。
* 其他选项： 保持默认就行。注意取消那些默认勾选的额外服务，那些是单独收费的。

![CleanShot 2026-05-15 at 22.10.31.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F861a81d75f9a7cf1a95699474027602a?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=3Sb9CDB21zR9hx9uBfNT0EcFGgo%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

创建完之后，你会看到一个存储桶列表页面。记下两个信息：**存储桶名称** 和 **存储区域**，后面配置 PicGo 要用。

然后去「密钥管理」页面，新建一个密钥。这里会生成一对 **SecretID** 和 **SecretKey**，相当于你的账号密码。

充值 10 块钱，可以用很久很久。我充了 10 块钱，用了一年多了还剩 2 块钱。

> 具体的操作截图我之前写过一篇详细的教程，你可以参考里面的截图对照操作：
>
> [如何快速搭建自己的专属图床(Obsidian -
> 图床+Picgo+OB插件）](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483764&idx=1&sn=d642353b1b8fa7752501ccd33f36e1e6&scene=21#wechat_redirect)

### 第二步：安装 PicGo

去 PicGo 的 GitHub Release 页面下载 macOS 版本，或者直接搜索引擎搜 PicGo 下载。

> PicGo 官网：https://picgo.app/  
> PicGo Github release 页面：https://github.com/Molunerfinn/PicGo/releases

现在最新版是 v2.5.3（2026 年 3 月发布），macOS 版本已经在 v2.4.2 之后做了签名认证，安装时不会再提示「未识别的开发者」了。

![CleanShot 2026-05-15 at 22.05.24.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F3468b52f2eee0602baf4f47cc14758ab?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=VG4s6l3sExLVe5R%2BZVO4devA46g%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

安装好之后打开，你会看到一个简洁的界面。

先做关键的一步：配置腾讯云 COS。

在 PicGo 的设置里找到「图床设置」→「腾讯云 COS」，填写刚才记下的信息：

* COS 版本： 选 V5
* SecretID： 刚才新建的
* SecretKey： 刚才新建的
* 存储 bucket 名称
* 存储区域
* 存储路径（可选）：如果你想上传到指定文件夹，可以填。注意末尾要加斜杠 `/`  
  ![CleanShot 2026-05-15 at 22.14.12.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F3e03d0705862f46f0c192f422069d2f4?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=sAN%2BmTi74N0KYXyLDvOfozGGPSs%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

填完之后点确定，然后切换到「上传区」，把图床切换成腾讯云 COS。拖一张图进去试试，如果上传成功，去 COS
的存储桶里查看。能看到这张图了，那就说明整条路已经通了。

如果上传失败或者报错，记得查看顶部我框出来这个位置，记得要切换为腾讯云 COS。

![CleanShot 2026-05-15 at 22.16.21.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F87ff2490aa01bf221434fee8361cf0c7?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=nGwdjPe%2FtjHrBDuXBPa%2FTWN16oQ%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

如果你经常在多台电脑之间切换，PicGo 还有一个值得一提的新功能：**PicGo
Cloud**。它可以把你的图床配置、上传历史同步到云端，换电脑后登录就能恢复配置，不用每台机器重新输入一遍 SecretKey。

![CleanShot 2026-05-15 at 22.23.46.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F780511a6efc819cc169f4bf405d7900b?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=1rPd5o0SyPUAvoc7UAIPBC84K0s%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

![CleanShot 2026-05-15 at 22.24.26.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F0f3f32818b6f7718ca36360772331d60?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=C%2FZ%2FQDH%2FGTClC0Fi8Fr0PmkpVTk%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

左右滑动查看图片

### 第三步：配置 Obsidian

在 Obsidian 的社区插件市场搜索 **Image Auto Upload Plugin**，安装启用。

![CleanShot 2026-05-15 at 22.27.20.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F1cee12e2b0dfea0c17f1cbed2cacf68c?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=1XOK5WXYNijc4cPpyduXSHKyPAM%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

什么都不用配，默认设置就行。

现在你回到 Obsidian，拖一张图片或者截图粘贴进去，你会发现图片自动上传到腾讯云 COS，然后链接自动插入到你的文档里。整个过程在 1-2
秒内完成，几乎无感。

如果你还想让图片名字整齐一些，可以再加一个 **Paste Image Rename**
插件。它会在粘贴图片时弹出一个命名窗口，你可以给图片起一个有意义的名字，比如「图床搭建-配置
PicGo.png」或者比如按「文章标题+时间戳」，而不是一串乱码。

如果你觉得每次插入的图片尺寸太大了，你可以在 Image auto upload
插件的设置中，更改图片大小后缀，这样的话在插入图片后会约束他的展示尺寸。比如我设置的就是`|400`。

![CleanShot 2026-05-15 at 22.31.13.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F230de24414d67c9153cd6863fb00d5e6?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=tqEKWb5JfTmsqDn1e7B2qELFaMg%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

---

## 市面上还有哪些插件方案

上面我用了 Image Auto Upload Plugin，但不是只有这一个选择。在 Obsidian
里做「粘贴→自动上传」这件事，其实有好几条路可以走。我列几个主流的，你根据自己情况选。

### Image Uploader

一个更轻量的选择。不需要外部客户端，支持直接配置 S3 兼容的存储服务（腾讯云 COS、阿里云 OSS、AWS S3 等都在此列）。插件内置了上传功能，你在
Obsidian 里粘贴图片，它直接帮你传到云上。

优点是少装一个软件。缺点是配置起来稍微复杂一点，而且每个存储服务的配置项都不一样。

### 我为什么选了 Image Auto Upload + PicGo

试了一圈之后，我回到这个组合。原因很简单。

插件做得越少，出问题的概率越小。Image Auto Upload 只做一件事，拦截粘贴事件，调用系统里的图床客户端上传。上传这件事，交给 PicGo 来做。

![选择适合自己的方案|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Ffcb608c56602094af1645cc3b425ae67?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=nMs4pRpQClR%2FzNMgaIsZITPcXWo%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

PicGo 是一个独立的图床客户端，支持 macOS 和
Windows。它最方便的地方是，它提供了一个系统级的上传区域，你可以在任何软件里截图，然后按快捷键上传到图床，不只限于在 Obsidian 里用。

还有一个原因：PicGo 支持插件扩展。你不想用腾讯云，可以选择阿里云、又拍云、GitHub 图床，甚至 WebDAV，装一个对应的插件就行。

---

## Windows 上也来一遍

Windows 上的流程和 Mac 基本一致，只有几个差异点。

PicGo 有 Windows 版本，安装包在同一个 GitHub Release 页面可以下载，安装后界面和配置方式一模一样。你只需要在第一步配置 COS
时输入同样的信息就行。

一个值得注意的区别是：Windows 上 PicGo 安装后默认会开机自启，这在 Mac 上需要手动设置。如果你不想让它每次开机都启动，可以到 PicGo
的设置里关掉。

还有一个细节是快捷键。

PicGo v2.5.0 之后，**默认的上传快捷键统一改成了 `Cmd Or Ctrl + Shift + U`**。也就是说 Mac 上用 `Cmd +
Shift + U`，Windows 上用 `Ctrl + Shift + U`。旧版的 `Ctrl+Shift+P` 已经不再作为默认值了。你可以在
PicGo 设置里按自己的习惯修改。

如果你用的是微信截图或者 Snipaste，PicGo 也支持这些截图工具的快捷键配合使用。

还有一个好消息是，之前提到的 **PicGo Cloud** 配置同步功能是跨平台的。

你在 Mac 上配置好的 COS 信息和上传历史，登录同一个 PicGo Cloud 账号，在 Windows 上也能直接同步过来。两台电脑不用各配一遍。

---

## 不止腾讯云 COS

上面我用腾讯云 COS 做了演示，但 PicGo 能用的图床远不止这一种。

PicGo 有一个插件市场。在 PicGo 的「插件设置」里搜索安装对应的插件，就能连接到不同的存储服务。

![CleanShot 2026-05-15 at 22.40.31.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2Fcfc3d413f05d1796b540b8552144564e?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=5EK1ip%2B81cT5EBJPF8T00VvEmWg%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

**想要免费的**，可以试试 WebDAV。

很多 NAS 用户和私人云盘都支持 WebDAV 协议。只要你的云服务商提供了 WebDAV 地址，在 PicGo 里装一个 webdav
插件就能直接上传。对于已经买了 NAS 的人来说，这是最省钱的方案。

**已经在用阿里云的**，PicGo 也有对应的阿里云 OSS 插件，配置方式和 COS 基本一致，换汤不换药。

**想要全球加速的**，可以看看 AWS S3 或者 Cloudflare R2。R2 还有免费额度，对个人用户很友好。

不管你用哪种云服务，配置逻辑都是一样的：装插件 → 填密钥 → 开始用。PicGo 的插件生态覆盖了市面上大部分主流的存储方案。

---

## 到底值不值得折腾

搭图床不是为了炫技。

如果你只是偶尔在笔记里放一两张图，那本地附件完全够用，不用折腾。

但如果你和我一样，经常写教程类的文章，需要大量截图；

或者你的笔记库在多台设备之间同步；

又或者你只是不想某天打开 Obsidian 发现自己的库已经膨胀到几个 G。那花 10 分钟搭一个图床，是一个长期受益的投入。

10 分钟之后，你再也不用管图片的事了。粘贴、自动上传、自动链接。

![image.png|400](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F4a3f8632ca9ade9a7c3e209fd1d7c758?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=eej10jlw5LQ%2FsgErBH8EWmFr6xQ%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)

它就在那稳稳地接住你…

*上面这句话是我故意改成 ChatGPT 风格的-\_-幽你一默，哈哈哈哈*

---

## 进阶阅读

* [Obsidian 入门40：把我的写作工作流Skill免费分享给你](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489834&idx=1&sn=6e3f4040aadb0857e6a65b5f8640facf&scene=21#wechat_redirect)
* [Obsidian 入门8：附件与图片管理，给你的笔记装上「附件收纳术」](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488877&idx=1&sn=bdd3b8437692d3bc2d9d5a4d9d54915b&scene=21#wechat_redirect)
* [Obsidian 入门12：国内用户怎么方便地安装第三方插件，告诉你 3 条路](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488917&idx=1&sn=cb618a55560e61aefc83e77161b2267c&scene=21#wechat_redirect)
* [Obsidian 入门5：别被「Markdown」吓到，它只是为了让你写得更爽](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247488804&idx=1&sn=8a577c72150dad561ccef36af34e9f5a&scene=21#wechat_redirect)
* [6MB 图片变 100KB？我只用了 2 步](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247486200&idx=1&sn=1351beebc2815f3f0aee9861131cf593&scene=21#wechat_redirect)
* [如何快速搭建自己的专属图床(Obsidian - 图床+Picgo+OB插件）](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247483764&idx=1&sn=d642353b1b8fa7752501ccd33f36e1e6&scene=21#wechat_redirect)

> [!info] 🏷️ ingested — 2026-07-17
> 已提炼为原子笔记：
> - [[概念/图床解耦——图片与笔记分离的存储原理]]
> - [[实践/PicGo + Image Auto Upload 图床链路搭建]]

如果这篇文章对你有帮助，欢迎三连（点赞、转发、推荐）。

我也建了一个 Obsidian 交流群，欢迎你的加入。在 AI 时代，让我们一起做好知识管理。群满200人了，感兴趣的朋友可以加我：linauwawa，我拉你入群。

![Image](https://ali-bj2-oss-get-notes-prod.oss-cn-beijing-internal.aliyuncs.com/morphling%2Fvoicenotes%2Fprod%2F1e882c8cc8a80aa150f99c99550f9792?Expires=1786438677&OSSAccessKeyId=LTAI5t7toTp72R3TvdXf9QdK&Signature=Jzp0iKw7J3K3ZKyBk9iPdms%2BFGM%3D&x-oss-process=image%2Fresize%2Cw_640%2Fformat%2Cjpg%2Fquality%2Cq_85)