---
title: Skill_Git知识库备份规范
date: 2026-07-22
status: active
type: system_document
tags: [系统文档, Git]
related:
  - "[[07_YAML FrontMatter 规范]]"
  - "[[90_System/定时任务清单]]"
---

# Skill_Git知识库备份规范

> **核心目标**：确保知识库的**异地容灾**与**版本追溯**。
> **定位**：备份工具，不是分布式协作工具，不接受多人同时编辑。


## 一、提交频率规则

采用"手动提交 + 自动定时提交"双模式：

| 模式 | 频率 | 场景 |
|:---|:---|:---|
| **手动提交（优先）** | 每次重大修改后 | 体系重构、目录调整、模板大面积更新、MOC重构 |
| **自动定时提交（兜底）** | 每日 23:15 | 捕获零散日常修改，防丢失 |

> 禁止：长时间堆积大量提交不推送（底线：不超过 30 条未推送）。


## 二、Commit 格式规范

统一采用 Angular 风格简化版：

```
<类型>[范围]: 简短描述（≤50字符）

【可选正文：详细改动、边界说明、风险备注】
```

| 类型 | 说明 | 示例 |
|:---|:---|:---|
| `feat` | 新增文档/模板/模块 | `feat[A1]: 新增思维模型库 MOC` |
| `refactor` | 结构重构、目录调整 | `refactor[A2]: 三层习惯体系定稿` |
| `fix` | 修复报错、链接失效、元数据错误 | `fix: 修复 Dataview 路径报错` |
| `docs` | 文案微调、注释补充 | `docs: 更新 YAML FrontMatter 规范` |
| `style` | 仅格式、空行、表格排版 | `style: 统一表格缩进` |
| `chore` | 系统维护、自动备份 | `chore[auto]: 每日自动定时备份快照` |

> 自动 cron 提交统一使用固定 message：`chore[auto]: 每日自动定时备份快照`


## 三、推送节奏

| 规则 | 说明 |
|:---|:---|
| 手动高质量提交后 | 立刻 `push` |
| 自动定时任务 | 提交后自动推送远端 |
| 底线规则 | 本地累计提交不得超过 30 条未推送 |


## 四、.gitignore 标准配置

```
# Obsidian 缓存与工作文件
.obsidian/cache/
.obsidian/workspace.json
.obsidian/workspaces/
.obsidian/plugins/*/.data.json
.obsidian/logs/

# 临时文件
_*.tmp
*.tmp
*.bak

# 系统文件
.DS_Store
Thumbs.db

# 备份目录
_备份_*/
90_System/_备份_*/

# 自动备份日志
.git/backup.log
```


## 五、冲突处理预案

**多设备同步场景，先拉再提：**

```bash
cd /d/桌面/Hermes\ Obsidian/Hermes
git pull --rebase origin master
# 解决冲突后
git add .
git commit -m "fix: 合并冲突"
git push origin master
```

**单文件回滚：**

```bash
cd /d/桌面/Hermes\ Obsidian/Hermes
git log --oneline
git checkout <commit-id> -- <文件路径>
```


## 六、执行校验清单

- [ ] 提交信息遵守规范
- [ ] .gitignore 配置生效
- [ ] 推送完成后网页远端仓库核对
- [ ] 重大重构完成后手动触发一次完整推送


## 七、Windows 专用注意事项

### 远程 URL 保持 PAT 格式

```bash
git remote set-url origin https://<用户名>:<PAT>@github.com/<用户名>/<仓库名>.git
```

### 绕过 Secret Scanning 推送

如果推送因 Secret Scanning 被拦截，可添加绕过标志：

```bash
git push origin master -o "secret_scanning.skip=true"
```

> ⚠️ 仅在确认 secret 存在于历史提交中且已评估风险时使用此方法。
