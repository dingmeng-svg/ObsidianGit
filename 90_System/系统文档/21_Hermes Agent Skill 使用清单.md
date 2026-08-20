---
title: "21_Hermes Agent Skill 使用清单"
date: 2026-08-18
status: active
type: system_document
tags:
  - 系统文档
  - Hermes
  - skill
aliases:
  - "Skill 使用清单"
related:
  - "[[15_Hermes Agent Skill 清单]]"
  - "[[07_YAML FrontMatter 规范]]"
---

# 21_Hermes Agent Skill 使用清单

> **地位声明**：本文件是 Hermes Agent 已安装 Skills 的**使用指南**（怎么触发、什么时候用）。
> 变更记录与自进化体系见 [[15_Hermes Agent Skill 清单]]，本文不再重复。
>
> **版本**：v1.0.0
> **生效日期**：2026-08-18
> **数据来源**：`C:\Users\dingmeng\AppData\Local\hermes\skills\` 实扫
> **说明**：Skill 是给 Agent 的"技能包"，多数场景**直接说需求即可自动触发**，不必记名字；下表触发词用于提高命中率。

---

## 一、本地已安装 Skills 全景（40 个主分类）

| 分类目录 | 定位 | 典型子 Skill |
|:---|:---|:---|
| `note-taking` | 知识库/笔记管线（本 vault 最核心） | atomic-note-extraction、vault-management、obsidian-metadata-batch、getnote-obsidian、image-bed-sync |
| `research` | 学术调研、文献、竞品监控 | arxiv、llm-wiki、competitor-news-monitor、research-paper-writing、polymarket |
| `productivity` | 办公文档、会议、同步 | pdf、docx、xlsx、notion、google-workspace、multi-platform-content-sync |
| `github` | GitHub 全流程 | code-review、issue-to-pr、pr-workflow、repo-management |
| `devops` | 环境运维、本地服务 | git-vault-backup、hermes-cron-management、windows-disk-cleanup、local-inference-windows |
| `software-development` | 软件开发方法论 | systematic-debugging、test-driven-development、plan、spike、requesting-code-review |
| `creative` | 创意/可视化 | excalidraw、design-md、manim-video、ascii-art、p5js、sketch、songwriting-and-ai-music |
| `media` | 视频/音乐/动图 | youtube-content、gif-search、heartmula、songsee |
| `email` | 邮件收发管理 | himalaya、email-inbox-triage |
| `social-media` | 社媒交互 | xurl |
| `investment` | A 股复盘 | a-share-market-review、a-share-holiday-review |
| `language-learning` | 语言学习 | language-chunk-alchemy |
| `data-science` | 数据科学 | jupyter-live-kernel |
| `mlops` | 机器学习运维 | evaluation、huggingface-hub、inference、models |
| `smart-home` | 智能家居 | openhue（飞利浦 Hue 灯） |
| `apple` | Apple/macOS 生态 | apple-notes、apple-reminders、findmy、imessage |
| `autonomous-ai-agents` | 多 Agent 编排 | claude-code、codex、opencode、computer-use、dual-node-coordination |
| `hermes` | Hermes 自身运维 | desktop-custom-provider、hermes-memory-plugin-deployment |
| `self-improvement` | 自进化 | skill-optimizer |
| `red-teaming` | 安全测试 | godmode |

**独立 Skill（不在分类目录下）**：`obsidian-cli`、`obsidian-canvas-creator`、`obsidian-bases`、`json-canvas`、`obsidian-yaml-spec`、`mermaid-visualizer`、`defuddle`、`computer-use`、`douyin-copy-extract`、`agent-reach`（本会话已启用）、`dogfood`、`darwin-skill`、`capability-evolver`、`skill-evolver`、`hermes-desktop-plugins`、`hermes-desktop-update-sop`。

---

## 二、按使用场景推荐（必看）

### 2.1 Obsidian 知识库日常（每天用）

| 你想做什么 | 用哪个 Skill | 触发说法示例 |
|:---|:---|:---|
| 批量读写/搜索 vault、管理笔记属性 | `obsidian-cli` | "帮我搜一下库里所有没加 status 的笔记" |
| 把素材提炼成原子笔记 | `note-taking/atomic-note-extraction` | "把这篇内容提炼成原子笔记" |
| 维护 MOC / 文件夹归档 / 双链 | `note-taking/vault-management` | "按规范归档这条笔记" |
| 批量改 YAML FrontMatter | `note-taking/obsidian-metadata-batch` | "给这 20 篇批量补 tags" |
| 检查 YAML 是否符合规范 | `obsidian-yaml-spec` | "帮我校准这 3 篇的 frontMatter" |
| 做思维导图（Canvas） | `obsidian-canvas-creator` + `json-canvas` | "把这章内容做成 Canvas 思维导图" |
| 做数据库视图（Bases） | `obsidian-bases` | "建一个按 status 分组的 Base 视图" |
| 画流程图/架构图 | `mermaid-visualizer` | "把流程画成 Mermaid 图" |
| 图片上传图床 | `note-taking/image-bed-sync` | "把这张图传到图床" |
| 从"得到"导入笔记 | `note-taking/getnote-obsidian` | "把得到这篇笔记导入库里" |

### 2.2 信息获取与调研

| 你想做什么 | 用哪个 Skill | 触发说法示例 |
|:---|:---|:---|
| 全网/多平台调研（小红书、B站、X 等 15 平台） | `agent-reach`（✅ 本会话已启用） | "帮我调研一下……" |
| 网页正文转干净 Markdown | `defuddle` | "把这篇网页内容整理出来" |
| 短视频文案提取（抖音/快手/小红书/视频号） | `douyin-copy-extract` | "提取这条视频的口播文案" |
| 学术论文检索/综述 | `research/arxiv`、`research/llm-wiki` | "查一下这个方向的 arxiv 论文" |
| 竞品/新闻监控 | `research/competitor-news-monitor`、`research/blogwatcher` | "监控 XX 竞品的动态" |

### 2.3 文档与办公

| 你想做什么 | 用哪个 Skill | 触发说法示例 |
|:---|:---|:---|
| PDF/Word/Excel/PPT 处理 | `productivity/pdf`、`docx`、`xlsx`、`powerpoint` | "把这个 PDF 转成笔记" |
| 会议纪要 → 行动项 | `productivity/meeting-action-items` | "把这段会议记录整理成行动项" |
| 周/月复盘 | `productivity/weekly-review-planning` | "帮我做这周复盘" |
| Notion / Google 工作区 | `productivity/notion`、`google-workspace` | "同步到 Notion" |

### 2.4 开发与运维

| 你想做什么 | 用哪个 Skill | 触发说法示例 |
|:---|:---|:---|
| GitHub 提 PR / 审代码 | `github/code-review`、`issue-to-pr` | "帮我 review 这个 PR" |
| 系统性调试 | `software-development/systematic-debugging` | "帮我定位这个 bug" |
| 定时任务管理（Hermes cron） | `devops/hermes-cron-management` | "给这个任务加个定时" |
| Git 备份 vault | `devops/git-vault-backup` | "备份一次 vault 到 Git" |
| Windows 磁盘清理 | `devops/windows-disk-cleanup` | "帮我清理 C 盘" |

### 2.5 创意与娱乐

| 你想做什么 | 用哪个 Skill | 触发说法示例 |
|:---|:---|:---|
| Excalidraw 草图 | `creative/excalidraw` | "画一张 Excalidraw 草图" |
| Manim 数学动画 | `creative/manim-video` | "做一个 Manim 动画演示" |
| YouTube 视频内容 | `media/youtube-content` | "提取这个 YouTube 视频的要点" |
| 写歌/AI 音乐 | `creative/songwriting-and-ai-music` | "帮我写首歌" |

---

## 三、触发规则速查

1. **直接说需求**：80% 场景不用记 Skill 名，Agent 会按语义自动匹配。
2. **点名触发**：说"用 XX skill"或触发词（见上表）可强制命中。
3. **本会话已启用**：`agent-reach`（当前会话唯一加载的技能包，调研类任务直接可用）。
4. **未启用的分类 Skill**：Agent 发现匹配时会按需加载对应 SKILL.md，无需手动安装。
5. **装机位置**：`C:\Users\dingmeng\AppData\Local\hermes\skills\`，新增 Skill 放入后重启 Agent 生效。

---

## 四、自进化 Skill（慎用，开发者向）

| Skill | 作用 | 使用建议 |
|:---|:---|:---|
| `darwin-skill` | 9 维 rubric 评分 + 棘轮 | 评估 Skill 质量时 |
| `capability-evolver` | 历史分析驱动进化 | 运行时自动 |
| `skill-evolver` | 策略多样化 + 对比更新 | "优化 skill XXX" 时 |
| `skill-optimizer` | 单 Skill 优化 | 同上，轻量版 |

---

## 五、维护记录

| 日期 | 变更 | 处理状态 |
|:---|:---|:---|
| 2026-08-18 | 首次建立：实扫本地 skills 目录，按场景重排 | ✅ 完成 |

---

## 六、关联参考

- [[15_Hermes Agent Skill 清单]] — 变更记录 + 自进化架构
- [[07_YAML FrontMatter 规范]] — 本文档 YAML 依据
- [[16_系统文档总索引]] — 全系统文档索引（如未收录本文档，请补充）
- [[19_系统文档版本矩阵]] — 版本信息（如未收录本文档，请补充）
