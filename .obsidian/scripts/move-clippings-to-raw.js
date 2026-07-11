// QuickAdd Macro: 将剪藏从 Clippings 移到 00_Inbox/_raw
// 使用方法：
// 1. 在 QuickAdd 设置中新建 Macro，取名 "搬剪藏至 _raw"
// 2. 添加一个 User Script 步骤，选择此文件
// 3. 在设置中为这个 Macro 设置快捷键（比如 Ctrl+Shift+M）
// 4. 每次剪藏后，在 Obsidian 中按快捷键即可

module.exports = async (params) => {
    const {app, quickAddApi} = params;
    const vault = app.vault;
    
    // 获取 Clippings 文件夹下的所有 .md 文件
    const clippingsFolder = vault.getAbstractFileByPath("Clippings");
    
    if (!clippingsFolder) {
        new Notice("❌ Clippings 文件夹不存在");
        return;
    }
    
    const files = clippingsFolder.children.filter(f => f.extension === 'md');
    
    if (files.length === 0) {
        new Notice("✅ Clippings 中没有 .md 文件");
        return;
    }
    
    // 确保目标文件夹存在
    const targetPath = "00_Inbox/_raw";
    let targetFolder = vault.getAbstractFileByPath(targetPath);
    if (!targetFolder) {
        await vault.createFolder(targetPath);
    }
    
    // 逐个移动文件
    let moved = 0;
    for (const file of files) {
        try {
            // 检查目标是否已存在同名文件
            const destPath = `${targetPath}/${file.name}`;
            const existing = vault.getAbstractFileByPath(destPath);
            if (existing) {
                new Notice(`⚠️ ${file.name} 已存在于目标目录，跳过`);
                continue;
            }
            
            await vault.rename(file, destPath);
            moved++;
        } catch (e) {
            new Notice(`❌ 移动 ${file.name} 失败: ${e.message}`);
        }
    }
    
    new Notice(`✅ 已搬 ${moved}/${files.length} 个文件到 00_Inbox/_raw`);
};