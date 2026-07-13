---
date: 2026-07-08
type: system_document
status: active
tags:
  - 系统文档
  - Hermes
  - skill
---

# Hermes Agent Skill 清单 & 变更记录

> 供云端 Hermes Agent 补充学习进化使用。
> 本地 TUI（丁萌）→ 腾讯云分身 24/7

---

## 一、Skill 概况

| 指标 | 值 |
|:----|:---|
| 总 Skill 数 | 96 |
| 分类数 | 16 大类别 |
| 自定义 Skills | ~30 个（系统预制 + 主人自行开发） |
| 核心自进化体系 | darwin-skill + capability-evolver + skill-evolver + skill-optimizer |
| 知识库管理核心 | vault-management + obsidian-metadata-batch + obsidian-cli |
| 数据管线 | getnote-obsidian + multi-platform-content-sync |

---

## 二、新增 Skill 时间线

| 日期 | Skill | 说明 |
|:----|:------|:-----|
| 2026-06-09 | `dogfood` | QA 测试 skill |
| 2026-06-09 | `yuanbao` | 元宝群组通讯 |
| 2026-06-26 | `computer-use` | 桌面操控（点击/输入/滚动） |
| 2026-07-04 | `defuddle` | 网页内容提取 |
| 2026-07-04 | `obsidian-bases` | Obsidian Bases 创建/编辑 |
| 2026-07-04 | `json-canvas` | JSON Canvas 文件操作 |
| 2026-07-04 | `mermaid-visualizer` | Mermaid 图表生成 |
| 2026-07-04 | `obsidian-canvas-creator` | Obsidian Canvas 创建 |
| 2026-07-04 | `capability-evolver` | 自进化引擎（历史分析驱动） |
| 2026-07-05 | `darwin-skill` v2.0 | 达尔文评分+9维rubric+棘轮 |
| 2026-07-05 | `obsidian-cli` | Obsidian CLI 交互 |
| 2026-07-05 | `skill-evolver` | 自进化引擎（策略多样化+对比更新+盲审） |
| 2026-07-08 | `douyin-copy-extract` | 短视频文案提取 |
| 2026-07-11 | `recipe-writing-standard` | 食谱编写标准 Skill |
| 2026-07-11 | `atomic-note-extraction` v2.7.0 | 新增 `related_system_docs` 字段，建立与系统文档的双向引用 |
| 2026-07-11 | `vault-management` v1.1.0 | 新增 `related_system_docs` 字段，建立与系统文档的双向引用 |
| 2026-07-12 | `image-bed-sync` | 图床与多端同步基础设施规范（对应 21 号系统文档） |
| 2026-07-13 | `fitness-writing-standard` | 健身方案编写标准 Skill |

---

## 三、7月11日变更详情

### 3.1 系统文档体系重构

**新增系统文档（4 份）：**

| 编号 | 文档 | 说明 |
|:---|:---|:---|
| 08 | 双链维护规范 | 从 vault-management Skill 提取双链维护规则 |
| 09 | Inbox 编译与归档流程 | 从 atomic-note-extraction Skill 提取素材处理流水线 |
| 10 | MOC 索引维护规范 | 从 vault-management Skill 提取 MOC 维护规则 |
| 20 | 系统文档依赖关系图 | 全系统逻辑关系图（Mermaid + 矩阵） |

**编号重构：**
- L1 方法论层：04_外部方法论萃取与执行规范（原 15）
- L2 操作层：05-12（原 04-06, 16-18, 13-14）
- L3 素材特化层：13-14（原 07-08）
- L4 辅助层：15-20（原 09-12, 19 + 新增 20）

**Skill 与系统文档双向引用：**

| Skill                      | 对应系统文档                                             |                 |
| :------------------------- | :------------------------------------------------- | --------------- |
| `atomic-note-extraction`   | 02_原子笔记炼金术, 09_Inbox 编译与归档流程, 19_外部方法论关系声明规范       |                 |
| `vault-management`         | 05_Vault Management 操作规范, 08_双链维护规范, 10_MOC 索引维护规范 |                 |
| `recipe-writing-standard`  | 12_食谱编写标准                                          | 规则在文档，执行在 Skill |
| `fitness-writing-standard` | 13_健身方案编写标准                                        | 规则在文档，执行在 Skill |

> 系统文档分层体系与 Skill 映射详见 [[16_系统文档总索引]]。

**对应的 Worklog：** `90_System/Worklogs/2026-07/2026-07-11.md`

---

## 三、7月8日变更详情

### 3.1 getnote-obsidian 更新至 v1.2.0

**变更内容：** 导出格式标准升级

| 维度 | 旧版 | 新版 |
|:----|:----|:----|
| YAML | 无 `author` 字段 | 增加 `author: "Get达人"` |
| 正文 | 取 `web_page.content`（原文） | 取 `content`（AI 总结）为主，原文放 `# 原文` 标题下 |
| 图片 | 使用远程链接 | 下载到 `90_System/92_Attachments/`，改本地相对路径 |
| 去重 | 同 | 同（source_id → 标题标准化 → 跳过系统笔记） |

**对应的 Worklog：** `90_System/Worklogs/2026-07-08.md`

### 3.2 系统文档补充

| 文件 | 新建日期 | 说明 |
|:----|:--------|:-----|
| `Daily/2026-07-07.md` | 7月8日补 | BuJo日报 — 闲鱼9.9元做图上架 |
| `Worklogs/2026-07-07.md` | 7月8日补 | Worklog — 做图流程固化 |
| `Worklogs/2026-07-06.md` | 7月8日补 | Worklog — 知→行→进化 基建日规划 |
| `Worklogs/2026-07-08.md` | 7月8日 | 得到大脑管线建设 |
| `记忆交接快照/2026-07-07.md` | 7月8日补 | 闲鱼商品上架成果 |
| `记忆交接快照/2026-07-08.md` | 7月8日 | 管线打通+导出标准更新 |

---

## 四、自进化体系架构

```
                   ┌─────────────────┐
                   │  darwin-skill    │  ← 评估标准（9维rubric）
                   │  (评分+棘轮)      │  ← 独立盲审
                   └────────┬────────┘
                            │ 评估结果驱动
                            ▼
                   ┌─────────────────┐
                   │  skill-evolver   │  ← 策略多样化探索
                   │  (进化方法论)      │  ← 对比式更新+补丁
                   └────────┬────────┘  ← 四类失败归因
                            │ 改进建议
                            ▼
                   ┌─────────────────┐
                   │  capability-     │  ← 历史分析驱动
                   │  evolver         │  ← EvoMap Hub 通讯
                   └─────────────────┘
```

**三重协同：**
1. **darwin-skill** — 9维rubric评分 + 棘轮(只进不退) + 独立审计
2. **skill-evolver** — 策略多样化 + 对比式更新 + 补丁式修订 + 盲审
3. **capability-evolver** — 运行时历史分析 + EvoMap 进化

---

## 五、知识库核心 Rules（云端同步用）

### 5.1 Obsidian 操作铁律
- 改名后必须 `search_files` 全库查所有引用再 `patch`
- 归档文件必须带日期版本号 `名称（YYYY-MM-DD版）.md`
- 路径用 `I'm` 缩写
- 删文件前必请示
- MSYS + 中文 `os.path.join` 危险，禁覆写

### 5.2 YAML 规范（v3.0）
- 原子笔记不设 `project` 字段（用 `related` + `source` 表达关联）
- 表格内 wikilink 禁用 `|`（会和表格列分隔符冲突）
- 标签：9 核心标签 + 16 种字典标签（详见 [[01_知识库统一规范总纲#tags|总纲 §标签体系]]）

### 5.3 断链修复规则
- SOP：先用 `find` 逐个查实际路径 → 列诊断表格（原链接/实际文件/操作建议）
- 主人手动修（断链 >3 条），≤3 条且路径确定时可自动 `patch`

### 5.4 沟通风格
- 命令式，给精确任务序列 → 直接执行 → 清单式汇总
- 不确认中间步骤

---

## 六、核心项目状态

| 项目 | 最新进展 | 日期 |
|:----|:--------|:----|
| 知→行→进化 9.9元入门包 | 闲鱼已上架（6张主图+文案重修） | 2026-07-07 |
| 知→行→进化 99元基础版 | 未启动（待排期） | — |
| 知→行→进化 199元标准版 | 未启动（待排期） | — |
| 得到大脑↔Obsidian 管线 | 全量导出24条，双Key配置就绪 | 2026-07-08 |
| Hermes 自进化体系 | darwin+skill-evolver+capability-evolver 就绪 | 2026-07-05 |

---

## 七、Skill 规则漂移检测机制

**触发条件**（满足任一即触发）：
- Skill 的输入参数或输出格式发生变更
- Skill 的核心执行逻辑发生重构（非 Prompt 微调）
- Skill 新增或删除了对系统文档的依赖引用
- Skill 的 `related_system_docs` 字段被修改

**不触发的情况**：
- 纯 Prompt 措辞优化（无行为变更）
- 正则表达式或格式清理（无语义变更）
- 错误修复（恢复原有行为）

**触发后动作**：Hermes 在当月 Worklog 生成提醒条目，列出该 Skill 绑定的全部系统文档，提示人工核对纸面规则与执行逻辑是否同步。

**累积提醒升级**：同一 Skill 的文档同步提醒连续 3 次（跨 3 个月）未处理，在 Worklog 中升级为「⚠️ 需关注」标记。

**约束**：仅提醒，不阻断 Skill 运行。

### Skill 关键外部依赖清单

| Skill | 关键外部依赖 | 最后验证日期 |
|:---|:---|:---|
| `getnote-obsidian` | 得到 API 接口、双 Key 配置 | 2026-07-08 |
| `multi-platform-content-sync` | 微信小程序接口、WebSocket | — |
| `atomic-note-extraction` | 无外部依赖 | — |
| `vault-management` | 无外部依赖 | — |

月度审计时，Agent 提醒人工核对上述依赖是否仍然有效。

---

## 八、年度校验记录

| 校验日期 | Skill | 结果 | 处理状态 |
|:---|:---|:---|:---|
| — | — | — | — |

---

## 九、关联参考

- [[01_知识库统一规范总纲]] — 文件格式规范（v3.0）
- [[20_系统文档依赖关系图]] — 全系统逻辑关系图
- [[系统文档版本矩阵]] — 版本信息与依赖关系
- `90_System/Worklogs/` — 逐日工作记录
- `90_System/91_Templates/` — 5层模板（Daily/Weekly/Monthly/Quarterly/Annual/Future Log）
- `20_Areas/22_个人成长/Bullet Journal/` — BuJo 体系
- `20_Areas/22_个人成长/Habit Tracking/` — 习惯追踪
- `00_Inbox/_raw/` — Get 笔记原始导入区