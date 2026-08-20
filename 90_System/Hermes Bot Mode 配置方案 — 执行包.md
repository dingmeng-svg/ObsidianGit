---
title: "Hermes Bot Mode 配置方案 — 执行包"
date: 2026-08-19
status: active
tags: [系统文档]
source: 原创
related: ["[[Hermes Bot Mode 配置方案]]"]
---

# Hermes Bot Mode 配置方案 — 执行包

> **版本**：v1.2（修正版）
> **状态**：待执行
> **创建日期**：2026-08-19
> **修正日期**：2026-08-19（修正 `--bot` → `--model`、Profile 创建方式、@mention 说明）
> **适用环境**：Hermes Desktop v0.20.3+（Bot Mode 正式功能）
> **前置条件**：Bot Mode 已默认启用，无需额外安装
> **执行方式**：按顺序执行，每个阶段可独立交给子代理

---

## 执行包总览

| 阶段 | 任务 | 说明 | 执行方式 |
|:---:|:---|:---|:---:|
| 1 | 验证 Bot Mode 能力 | 确认 Profile、@mention、Routines 等能力可用 | 人工 |
| 2 | 创建三个新 Profile | Kimi 分析师、DeepSeek 应急、视觉助手 | Hermes Agent |
| 3 | 配置 Profile 模型 | 为每个 Profile 绑定对应模型 | Hermes Agent |
| 4 | 迁移 Cron 任务 | 将 Insight 类任务用 `--model` 指定 K3 执行 | Hermes Agent |
| 5 | 配置手动路由机制 | 记录 @mention 使用方式（桌面端 UI 功能） | 人工 |
| 6 | 设置手动额度检查 | 在 Collector 中建立每周日提醒 | 人工 |
| 7 | 执行测试验证 | 验证所有 Profile 响应正常 | Hermes Agent |
| 8 | 建立观察期验收机制 | 记录 K3 token 消耗，微调规则 | 人工 + Agent |

---

## 阶段 1：验证 Bot Mode 能力

### 执行人：人工

### 操作步骤

**1.1 确认 Bot Mode 已启用**
- 打开 Hermes 桌面端
- 检查左下角是否有 "+ New Agent" 按钮
- 检查顶部状态条是否显示 "Active now" 和 Bot 列表

**1.2 确认 @mention 能力（桌面端 UI 功能）**
- 在默认会话中输入 `@`，观察是否弹出 Bot 列表
- 如果弹出 → ✅ 支持
- 如果不弹出 → ⚠️ 需要检查 Bot Mode 配置

**1.3 确认 Profile 系统**
```bash
hermes profile list
```
- 如果输出包含多个 Profile → ✅ 支持
- 如果只有 default → ⚠️ 需要创建新 Profile

**1.4 确认 Cron 系统**
```bash
hermes cron list
```
- 如果输出包含任务列表 → ✅ 支持
- Cron 是系统级调度器，不属于任何 Bot，通过 `--model` 指定执行模型

### 验证结果记录

```
[验证] 2026-08-19 Bot Mode 能力验证
- [ ] + New Agent 按钮存在
- [ ] @ 弹出 Bot 列表
- [ ] hermes profile list 显示多个 Profile
- [ ] hermes cron list 显示任务列表
验证人：__________
日期：__________
```

---

## 阶段 2：创建三个新 Profile

### 执行人：Hermes Agent

### 关键说明

- Bot Mode 的每个 Bot 本质是 **Hermes Profile**
- 每个 Profile 拥有独立的 `~/.hermes/profiles/<name>/` 目录（记忆、技能、配置）
- 创建方式有两种：CLI（推荐）和桌面端

### 操作步骤

**2.1 通过 CLI 创建（推荐）**

```bash
# Kimi 分析师
hermes profile create kimi-analyst

# DeepSeek 应急
hermes profile create deepseek-backup

# 视觉助手
hermes profile create vision-assistant
```

**2.2 通过桌面端创建（备选）**

- 点击左下角 **"+ New Agent"**
- 依次创建 Kimi 分析师、DeepSeek 应急、视觉助手
- 创建后使用 `/model` 切换模型

### 验证

```bash
hermes profile list
```

确认输出包含：
- `default`（Hermes 主力）
- `kimi-analyst`
- `deepseek-backup`
- `vision-assistant`

---

## 阶段 3：配置 Profile 模型

### 执行人：Hermes Agent

### 操作步骤

**3.1 配置 Kimi 分析师**

```bash
hermes profile use kimi-analyst
hermes config set model.default custom:kimi-k3
hermes config set model.provider custom:kimi-k3
hermes profile use default  # 切回默认
```

**3.2 配置 DeepSeek 应急**

```bash
hermes profile use deepseek-backup
hermes config set model.default deepseek/deepseek-v4-flash
hermes config set model.provider deepseek
hermes profile use default  # 切回默认
```

**3.3 配置视觉助手**

```bash
hermes profile use vision-assistant
# SiliconFlow 视觉模型名待确认，暂时跳过
hermes profile use default  # 切回默认
```

### 验证

向每个 Profile 发送测试消息：

```bash
# Kimi 分析师
hermes -p kimi-analyst chat -q "请回复 'K3 已就绪'"

# DeepSeek 应急
hermes -p deepseek-backup chat -q "请回复 'DeepSeek 已就绪'"
```

### ⚠️ 如果模型切换失败

| 问题 | 处理方式 |
|:---|:---|
| `custom:kimi-k3` 不存在 | 检查 `~/.hermes/config.yaml` 中 K3 的确切 provider 名称 |
| `deepseek/deepseek-v4-flash` 不存在 | 检查 DeepSeek 模型的确切名称 |
| SiliconFlow 视觉模型名未知 | 暂时跳过，待确认模型名后再补充 |

---

## 阶段 4：迁移 Cron 任务

### 执行人：Hermes Agent

### 关键说明

- **Cron 是系统级调度器，不属于任何 Bot**
- 通过 `--model` 参数指定哪个模型执行
- 没有 `--bot` 参数（已验证不存在）

### 4.1 当前 Cron 任务清单

```bash
hermes cron list
```

| # | 任务 | 时间 | 当前模型 | 目标模型 |
|:---:|:---|:---|:---|:---|
| 1 | Daily Insight | 22:00 | GLM | GLM（不变） |
| 2 | Git 备份 | 23:15 | GLM | GLM（不变） |
| 3 | Weekly Insight | 周日 21:00 | GLM | **Kimi K3** |
| 4 | Monthly Insight | 每月 1 日 | GLM | **Kimi K3** |
| 5 | Quarterly Insight | 季末 | GLM | **Kimi K3** |
| 6 | Annual Insight | 12/31 | GLM | **Kimi K3** |
| 7 | Worklog 归档 | 每月 1 日 | GLM | GLM（不变） |
| 8 | Collector 分流 | 8/12/18 | GLM | GLM（不变） |

### 4.2 创建 Insight 类 Cron（用 `--model` 指定 K3）

```bash
# Weekly Insight（每周日 21:00）
hermes cron create "0 21 * * 0" \
  --name weekly-insight \
  --model custom:kimi-k3 \
  --skill hermes-daily-insight \
  --prompt "生成本周 Weekly Insight，基于 Obsidian 知识库数据。"

# Monthly Insight（每月 1 日 09:00）
hermes cron create "0 9 1 * *" \
  --name monthly-insight \
  --model custom:kimi-k3 \
  --skill hermes-daily-insight \
  --prompt "生成本月 Monthly Insight，基于 Obsidian 知识库数据。"

# Quarterly Insight（季末 21:00）
hermes cron create "0 21 31 3,6,9,12 *" \
  --name quarterly-insight \
  --model custom:kimi-k3 \
  --skill hermes-daily-insight \
  --prompt "生成本季 Quarterly Insight，基于 Obsidian 知识库数据。"

# Annual Insight（12 月 31 日 21:00）
hermes cron create "0 21 31 12 *" \
  --name annual-insight \
  --model custom:kimi-k3 \
  --skill hermes-daily-insight \
  --prompt "生成年度 Annual Insight，基于 Obsidian 知识库数据。"
```

### 4.3 删除旧 Cron（GLM 执行的 Insight 任务）

```bash
hermes cron list  # 先获取 job_id
hermes cron remove <weekly-insight-job-id>
hermes cron remove <monthly-insight-job-id>
hermes cron remove <quarterly-insight-job-id>
hermes cron remove <annual-insight-job-id>
```

### 4.4 验证迁移结果

```bash
hermes cron list
```

确认：
- GLM 执行的 Insight 任务已删除
- K3 执行的 Insight 任务已创建（`--model custom:kimi-k3`）

### ⚠️ 如果迁移失败

| 问题 | 处理方式 |
|:---|:---|
| `--model` 参数不支持 | 检查 `hermes cron create --help` 确认可用参数 |
| 任务 ID 获取失败 | 用 `hermes cron list` 查看完整输出 |
| 原 Cron 任务无法删除 | 用 `hermes cron pause <job-id>` 暂停而非删除 |

---

## 阶段 5：配置手动路由机制

### 执行人：人工

### 关键说明

- **@mention 是桌面端 Electron 应用的 UI 交互方式**
- 在 CLI 模式下无法使用 @mention
- CLI 用户需要手动切换 Profile

### 5.1 使用方式（桌面端）

在日常对话中，当需要特定能力时，**在桌面端输入框中使用 `@` 提及**：

```
@Kimi分析师 帮我分析这篇关于XXX的文章，生成摘要和关键洞察。
```

```
@DeepSeek应急 GLM和Kimi都503了，帮我执行这个代码审查任务。
```

```
@视觉助手 帮我看看这张截图里的UI有什么问题。
```

### 5.2 使用方式（CLI）

```bash
# 切换到 Kimi 分析师
hermes -p kimi-analyst chat

# 切换到 DeepSeek 应急
hermes -p deepseek-backup chat

# 切换到视觉助手
hermes -p vision-assistant chat
```

### 5.3 记录方式

每次通过 @mention 触发其他 Bot 后，在 Worklog 中记录：

```markdown
- [Bot调用] 2026-08-19 21:00 `caller:: Hermes主力` `target:: Kimi分析师` `task:: 长文分析` `tokens:: 12450`
```

---

## 阶段 6：设置手动额度检查

### 执行人：人工

### 操作步骤

**6.1 在 Collector 中建立每周日提醒**

编辑 `00_Inbox/Collector.md`，在文末添加：

```markdown
## 周期性提醒

- [ ] 每周日 20:00 · 检查 Kimi K3 周额度
  - 登录 yuanyuaicloud.cn
  - 剩余 > 40% → 正常
  - 剩余 < 40% → 下周 Insight 降级 GLM
- [ ] 每月 1 日 · 核对 DeepSeek 按量账单
  - 月度费用 ≥ ¥10 → 收紧应急触发条件
```

### 验证

确认 Collector 中的提醒条目已生效（可通过 Daily Health Check 简报自然呈现）。

---

## 阶段 7：执行测试验证

### 执行人：Hermes Agent

### 操作步骤

**7.1 测试 Kimi 分析师**

```bash
hermes -p kimi-analyst chat -q "请用 3-5 句话总结当前知识库的模型配置策略。"
```

验证点：
- [ ] 响应使用了 K3 模型
- [ ] 响应内容专业、结构清晰
- [ ] 响应时间在可接受范围（< 30s）

**7.2 测试 DeepSeek 应急**

```bash
hermes -p deepseek-backup chat -q "请检查以下 Python 脚本的语法错误：print('Hello World'"
```

验证点：
- [ ] 响应使用了 DeepSeek 模型
- [ ] 能识别语法错误
- [ ] 响应时间在可接受范围

**7.3 测试视觉助手**

（待 SiliconFlow 视觉模型名确认后补充）

**7.4 测试 Cron 迁移**

手动触发一次 Weekly Insight 生成：

```bash
hermes cron run <weekly-insight-job-id>
```

验证点：
- [ ] 使用 K3 模型执行
- [ ] Insight 文件正确生成
- [ ] 文件内容完整

### 测试结果记录

```
[测试] 2026-08-19 Bot Mode 配置测试
- [ ] Kimi 分析师响应正常
- [ ] DeepSeek 应急响应正常
- [ ] 视觉助手响应正常（待测试）
- [ ] Weekly Insight 生成测试通过
测试人：__________
日期：__________
```

---

## 阶段 8：建立观察期验收机制

### 执行人：人工 + Hermes Agent

### 操作步骤

**8.1 第 1 周 Bootstrap**

第 1 周（观察期首周）Weekly Insight **无条件用 K3 执行 1 次**：

- 确保 Kimi 分析师的 Cron 已启用（`--model custom:kimi-k3`）
- 等待周日 21:00 自动执行，或手动触发
- 记录实际 token 消耗

**8.2 基线表填充**

| 任务类型 | 估算 token 消耗 | 实测值（第 1 周填写） |
|:---|:---|:---|
| Weekly Insight | 待实测 | |
| Monthly Insight | 待实测 | |
| Quarterly Insight | 待实测 | |
| Annual Insight | 待实测 | |

**8.3 2 周验收标准**

| 指标 | 验收标准 | 超标后动作 |
|:---|:---|:---|
| Weekly Insight 单次 token | < 15K | > 15K → Weekly 永久迁回 GLM |
| K3 周消耗占比 | ≤ 30% | > 30% → Weekly 迁回 GLM |
| 降级触发频率 | ≤ 1 次/周 | > 1 次 → 检查阈值设置 |

**8.4 回滚窗口**

任何 Cron 配置变更后，观察期为 `max(48h, 1 个任务周期)`：
- Daily/Git/Collector → 48h
- Weekly Insight → 至少含一个周日
- Monthly/Quarterly → 首次执行后立即人工验收
- Annual → 首次执行后立即人工验收

连续 2 次任务失败或质量下降立即回滚，Worklog 记录。

### 验收结果记录

```
[验收] 2026-09-02 Bot Mode 配置验收（2 周观察期结束）
- Weekly Insight token 消耗：____ K tokens（阈值 15K） → ✅/⚠️/❌
- K3 周消耗占比：____ %（阈值 30%） → ✅/⚠️/❌
- 降级触发频率：____ 次/周（阈值 1次） → ✅/⚠️/❌
- Weekly 最终归属决策：K3条件启用 / GLM永久
- 阈值微调：__________
验收人：__________
日期：__________
```

---

## 执行状态追踪表

| 阶段 | 任务 | 状态 | 执行人 | 完成时间 |
|:---:|:---|:---:|:---|:---:|
| 1 | 验证 Bot Mode 能力 | ⬜ | 人工 | |
| 2 | 创建三个新 Profile | ⬜ | Hermes Agent | |
| 3 | 配置 Profile 模型 | ⬜ | Hermes Agent | |
| 4 | 迁移 Cron 任务 | ⬜ | Hermes Agent | |
| 5 | 配置手动路由机制 | ⬜ | 人工 | |
| 6 | 设置手动额度检查 | ⬜ | 人工 | |
| 7 | 执行测试验证 | ⬜ | Hermes Agent | |
| 8 | 建立观察期验收机制 | ⬜ | 人工 + Agent | |

---

## 子代理分流说明

| 阶段 | 可委托子代理 | 原因 |
|:---|:---|:---|
| 阶段 2-4 | ✅ 是 | 纯操作类任务，可交由 Hermes Agent 执行 |
| 阶段 1、5、6 | ❌ 否 | 需要人类环境观察和决策 |
| 阶段 7 | ✅ 是 | 测试可自动化执行，结果返回人工确认 |
| 阶段 8 | ⚠️ 部分 | 数据收集可由 Agent 自动执行，决策由人工完成 |

---

## 关键修正记录

| 版本 | 修正项 | 修正原因 |
|:---|:---|:---|
| v1.1 → v1.2 | `--bot` → `--model` | `hermes cron create` 无 `--bot` 参数，已验证 |
| v1.1 → v1.2 | Phase 2 增加 CLI 创建方式 | `hermes profile create` 是标准 Profile 创建方式 |
| v1.1 → v1.2 | Phase 5 明确 @mention 是桌面端 UI | CLI 模式下无法使用 @mention |
| v1.1 → v1.2 | 整体说明 Cron 是系统级调度器 | Cron 不属于任何 Bot，通过 `--model` 指定模型 |

---

*创建时间：2026-08-19*
*修正时间：2026-08-19（v1.2 根据实际验证结果修正）*
*作者：丁萌*
