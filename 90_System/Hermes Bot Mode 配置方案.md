---
title: "Hermes Bot Mode 配置方案"
date: 2026-08-19
status: active
tags: [系统文档]
source: 原创
related: []
---

# Hermes Bot Mode 配置方案

> **版本**：v1.1（修正版）
> **状态**：待实施
> **创建日期**：2026-08-19
> **适用环境**：Hermes Desktop v0.20.3+（Bot Mode 正式功能）
> **前置条件**：Bot Mode 已默认启用，无需额外安装

---

## 一、Bot Mode 能力边界

### ✅ 支持的能力

| 能力 | 说明 |
|:---|:---|
| 每个 Bot 独立模型、记忆、技能、配置 | Bot 是独立的 Hermes Profile，拥有自己的 `~/.hermes/profiles/<name>/` |
| Bot 间通过 `@mention` 通信 | 在对话中 `@Bot名` 触发其他 Bot 响应 |
| 群组聊天（2-6 个 Bot 协作） | 群聊中触发多轮成员响应 |
| 每个 Bot 独立的定时任务（Routines） | 以 `[bot:<name>]` 命名空间区分 |
| 多 Bot 并排运行、独立会话 | "Active now" 状态条显示当前活跃 Bot |

### ❌ 不支持的能力

| 能力 | 说明 |
|:---|:---|
| 自动路由 | 不支持 Bot 自动分发任务，只能手动 `@mention` |
| 权限分级（L0/L1/L2） | Bot Mode 无内置权限机制，通过 Profile 配置控制 |
| 记忆自动共享 | 各 Bot 记忆独立，可通过配置手动共享目录 |

---

## 二、四个 Bot 配置

### Bot 1：Hermes 主力

| 字段 | 值 |
|:---|:---|
| 名称 | Hermes |
| 模型 | sfkey-glm/glm-5.2 |
| 人设 | helpful |
| Profile | 默认（default） |
| 记忆 | 读写（共享） |
| 写入权限 | ✅ 允许 |

**职责：**
- 日常对话 + 系统管理 + Obsidian 操作
- 全部 8 个 Cron 任务（默认执行器）
- 承担 Kimi 503/额度不足后的降级任务
- 唯一可写入 Vault 和共享记忆的 Bot

**加载 Skill：**
- vault-management、obsidian-cli、atomic-note-extraction

---

### Bot 2：Kimi 分析师

| 字段 | 值 |
|:---|:---|
| 名称 | Kimi 分析师 |
| 模型 | custom:kimi-k3 |
| 人设 | technical |
| Profile | 新建 `kimi-analyst` |
| 记忆 | 只读共享（访问共享记忆目录） |
| 写入权限 | ❌ 禁止 |

**职责：**
- Monthly/Quarterly/Annual Insight 生成
- Weekly Insight（条件启用）
- 手动触发的长文深度分析
- 翻译/创意写作

**调用方式：**
```
@Kimi分析师 帮我分析这篇关于XXX的文章，生成摘要和关键洞察。
```

**额度纪律：**
- ✅ 允许：Monthly/Quarterly/Annual Insight（长文高产出）
- ✅ 允许：Weekly Insight（条件启用）
- ❌ 禁止：Daily Insight（高频打满限额）
- ❌ 禁止：Git 操作、文件整理、简单问答

---

### Bot 3：DeepSeek 应急

| 字段 | 值 |
|:---|:---|
| 名称 | DeepSeek 应急 |
| 模型 | deepseek/deepseek-v4-flash |
| 人设 | technical |
| Profile | 新建 `deepseek-backup` |
| 记忆 | 只读共享 |
| 写入权限 | ❌ 禁止 |

**职责：**
- 仅当 GLM 和 Kimi 同时不可用时启用
- 应急代码审查/脚本编写
- **不配置 Routines（不挂 Cron）**

**调用方式：**
```
@DeepSeek应急 GLM和Kimi都503了，帮我执行这个代码审查任务。
```

**启用条件：**
- GLM 503 + Kimi 503/额度耗尽 + 任务紧急
- 08:00–23:00 弹出人工确认
- 23:00–08:00 跳过，次日补执行

---

### Bot 4：视觉助手

| 字段      | 值                     |     |
| :------ | :-------------------- | --- |
| 名称      | 视觉助手                  |     |
| 模型      | siliconflow 视觉模型      |     |
| 人设      | helpful               |     |
| Profile | 新建 `vision-assistant` |     |
| 记忆      | 独立，不共享                |     |
| 写入权限    | ❌ 禁止                  |     |

**职责：**
- 截图分析 + UI 审查 + 图片理解 + 文档 OCR

**调用方式：**
```
@视觉助手 帮我看看这张截图里的UI有什么问题。
```

---

## 三、Cron 任务分配

### Hermes 主力 Bot 的 Routines

| 任务 | 时间 | 模型 | 说明 |
|:---|:---|:---|:---|
| 每日洞察自动刷新 | 22:00 | GLM 5.2 | 高频，GLM 包月兜底 |
| Obsidian Git 备份 | 23:15 | GLM 5.2 | 轻量运维 |
| Collector [T] 任务分流 | 8/12/18 | GLM 5.2 | 高频轻量 |
| Worklog 月度归档 | 每月 1 日 | GLM 5.2 | 文件操作 |

### Kimi 分析师 Bot 的 Routines

| 任务 | 时间 | 模型 | 说明 |
|:---|:---|:---|:---|
| Weekly Insight | 周日 21:00 | Kimi K3 | 长文分析 |
| Monthly Insight | 每月 1 日 | Kimi K3 | 长文分析 |
| Quarterly Insight | 季末 | Kimi K3 | 长文分析 |
| Annual Insight | 12 月 31 日 | Kimi K3 | 长文分析 |

**Cron 命名格式：**
```bash
hermes cron list
# 输出包含：
# [bot:Hermes] daily-insight         0 22 * * *
# [bot:Hermes] git-backup            15 23 * * *
# [bot:Kimi分析师] weekly-insight     0 21 * * 0
# [bot:Kimi分析师] monthly-insight    0 9 1 * *
```

---

## 四、降级策略（简化版）

### 三级降级链路

```
L1: GLM 5.2（主力，包月）
    ↓ K3 不可用时接管 Insight 类任务
L2: Kimi K3（高价值攻坚）
    ↓ GLM+K3 都不可用时
L3: DeepSeek V4 Flash（按量计费，仅应急）
    ↓ DeepSeek 也不可用时
L4: 跳过任务，次日补执行
```

### 实际操作

| 情况 | 处理方式 |
|:---|:---|
| K3 Insight 503 | 手动 `@Kimi分析师` 重试；连续失败切 GLM |
| GLM 5h 窗口耗尽 | 等待窗口重置（最多 10 小时） |
| GLM+K3 都不可用 | `@DeepSeek应急` 手动触发 |
| 所有模型不可用 | Worklog 记录，次日补执行 |

---

## 五、额度管理（手动版）

由于 sfkey.cn / yuanyuaicloud.cn 无公开额度 API，采用**手动周检**：

### 每周日 20:00 检查项

1. 登录 yuanyuaicloud.cn 查看 K3 剩余额度
2. 剩余 > 40% → 正常
3. 剩余 < 40% → 下周 Insight 任务全部降级 GLM
4. 在 Collector 中记录检查结果

### 每月 1 日检查项

1. 核对 DeepSeek 按量账单
2. 确认无意外持续调用
3. 月度费用 ≥ ¥10 时收紧应急触发条件

---

## 六、创建 Bot 的步骤

### 步骤 1：在桌面端创建 Bot

1. 打开 Hermes 桌面端
2. 左侧栏点击 **"+ New Agent"**
3. 依次创建 Kimi 分析师、DeepSeek 应急、视觉助手

### 步骤 2：配置每个 Bot 的模型

创建后，在每个 Bot 的对话中执行：
```
/model custom:kimi-k3           # Kimi 分析师
/model deepseek/deepseek-v4-flash  # DeepSeek 应急
/model siliconflow/视觉模型      # 视觉助手
```

### 步骤 3：配置 Routines

在 Kimi 分析师 Bot 中配置 Insight 类 Cron：
```
/cron create "0 21 * * 0"   # Weekly Insight
/cron create "0 9 1 *"      # Monthly Insight
```

### 步骤 4：测试

向每个 Bot 发送测试消息，确认模型响应正常。

---

## 七、监控

```bash
# 检查所有 Bot 状态
hermes status --all

# 检查 Cron 任务
hermes cron list

# 检查 MemOS
netstat -ano | grep 18800

# 查看日志
hermes logs
```

---

## 八、总结

> **GLM 5.2 扛所有日常和 Cron，Kimi K3 专攻月度/季度/年度长文 Insight，DeepSeek 只做应急保险丝，视觉助手补齐图片模态。手动 @mention 路由，Routines 绑定 Cron。**

---

*创建时间：2026-08-19*
*修正时间：2026-08-19（v1.1 根据 Bot Mode 真实能力修正）*
*作者：丁萌*
