#!/bin/bash
# Obsidian知识库Git自动备份脚本
# Windows: 通过 Git Bash 执行
# 可在任务计划程序中配置定时触发

VAULT_PATH="/d/桌面/Hermes Obsidian/Hermes"
LOG_FILE="$VAULT_PATH/.git/backup.log"
REMOTE_BRANCH="master"

cd "$VAULT_PATH" || exit 1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始备份..." >> "$LOG_FILE"

# 检测变更
git add .
if git diff --cached --quiet; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] 无变更，跳过提交。" >> "$LOG_FILE"
    exit 0
fi

# 自动提交并推送
git commit -m "chore[auto]: 每日自动定时备份快照" >> "$LOG_FILE" 2>&1
git push origin $REMOTE_BRANCH -o "secret_scanning.skip=true" >> "$LOG_FILE" 2>&1

if [ $? -eq 0 ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ✅ 推送成功。" >> "$LOG_FILE"
else
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ❌ 推送失败！" >> "$LOG_FILE"
fi