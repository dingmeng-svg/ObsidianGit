<%*
// === 选择年份与季度 ===
const years = [];
const currentYear = parseInt(tp.date.now("YYYY"));
for (let y = currentYear - 1; y <= currentYear; y++) {
    years.push(String(y));
}
const selectedYear = await tp.system.suggester(
    y => y + "年",
    years,
    true,
    "选择复盘年份"
);

const quarters = ["Q1 (1-3月)", "Q2 (4-6月)", "Q3 (7-9月)", "Q4 (10-12月)"];
const selectedQ = await tp.system.suggester(
    q => q,
    quarters,
    true,
    "选择复盘季度"
);
const qIndex = quarters.indexOf(selectedQ) + 1;

// === 计算变量 ===
const y = selectedYear;
const q = qIndex;
const qStart = String((q - 1) * 3 + 1).padStart(2, "0");
const qMid   = String((q - 1) * 3 + 2).padStart(2, "0");
const qEnd   = String(q * 3).padStart(2, "0");
const fileName = y + "-Q" + q + " Review";

await tp.file.rename(fileName);
await tp.file.move("20_Areas/A2_能力接口/Bullet Journal/Quarterly/" + fileName);

// === 输出全部内容 ===
tR += "---\n";
tR += "title: " + y + "-Q" + q + " Review\n";
tR += "date: " + tp.date.now("YYYY-MM-DD") + "\n";
tR += "status: active\n";
tR += "tags:\n";
tR += "  - 个人成长\n";
tR += "type: quarterly-review\n";
tR += "aliases: []\n";
tR += "related:\n";
tR += "  - \"[[" + y + " Annual Compass]]\"\n";
tR += "  - \"[[" + y + " Future Log]]\"\n";
tR += "---\n";
tR += "\n";
tR += "# 📅 " + y + " Q" + q + " (" + qStart + "月 ~ " + qEnd + "月) 季度复盘\n";
tR += "\n";
tR += "> 🎯 年度战略与月度执行之间的校准层。季度末用 2 小时完成。\n";
tR += "> 完成后请手动勾选 [[" + y + " Annual Compass]] 中的对应季度检查点。\n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 1. 本季月报回顾\n";
tR += "\n";
tR += "> 在深入分析前，请先快速重读以下三份月报的「月末复盘」区块：\n";
tR += "\n";
tR += "- [[" + y + "-" + qStart + "]]（第 1 月）\n";
tR += "- [[" + y + "-" + qMid + "]]（第 2 月）\n";
tR += "- [[" + y + "-" + qEnd + "]]（第 3 月）\n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 2. 三大目标达成情况\n";
tR += "\n";
tR += "> 💡 以下自动聚合本季三个月报中「本月目标」的完成情况。请在表格后补充定性评估。\n";
tR += "\n";
tR += "```dataviewjs\n";
tR += "const now = new Date();\n";
tR += "const y = now.getFullYear().toString();\n";
tR += "const m = now.getMonth();\n";
tR += "const q = Math.floor(m / 3) + 1;\n";
tR += "const qStart = String((q - 1) * 3 + 1).padStart(2, \"0\");\n";
tR += "const qEnd = String(q * 3).padStart(2, \"0\");\n";
tR += "\n";
tR += "const targetFolder = \"20_Areas/A2_能力接口/Bullet Journal/Monthly\";\n";
tR += "\n";
tR += "const pages = dv.pages(`\"${targetFolder}\"`)\n";
tR += "    .where(p => p.file.name >= `${y}-${qStart}` && p.file.name <= `${y}-${qEnd}`)\n";
tR += "    .sort(p => p.file.name, 'asc');\n";
tR += "\n";
tR += "const data = pages.map(p => {\n";
tR += "    const goals = p.file.tasks.filter(t => \n";
tR += "        t.section && t.section.subpath && t.section.subpath.includes(\"本月目标\")\n";
tR += "    );\n";
tR += "\n";
tR += "    const goalItems = goals.map(t => {\n";
tR += "        const icon = t.completed ? \"✅\" : \"❌\";\n";
tR += "        return `${icon} ${t.text}`;\n";
tR += "    }).join(\"<br>\");\n";
tR += "\n";
tR += "    const completedCount = goals.filter(t => t.completed).length;\n";
tR += "    const uncompletedCount = goals.filter(t => !t.completed).length;\n";
tR += "\n";
tR += "    return [\n";
tR += "        p.file.link,\n";
tR += "        goalItems || \"—\",\n";
tR += "        completedCount,\n";
tR += "        uncompletedCount\n";
tR += "    ];\n";
tR += "});\n";
tR += "\n";
tR += "if (data.length === 0) {\n";
tR += "    dv.paragraph(\"> ⚠️ 未找到本季月报文件，请确认路径和文件名格式是否正确。\");\n";
tR += "} else {\n";
tR += "    dv.table([\"月报\", \"本月目标项\", \"已完成\", \"未完成\"], data);\n";
tR += "}\n";
tR += "```\n";
tR += "\n";
tR += "### ✏️ 定性补充（自动表格未覆盖的关键成果）\n";
tR += "\n";
tR += "-   \n";
tR += "-   \n";
tR += "-   \n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 3. 身份对齐检查\n";
tR += "\n";
tR += "> 参考 [[身份认同（原子习惯）]]\n";
tR += "\n";
tR += "-   我的行为是否在为我想成为的人投票？\n";
tR += "    -   [ ] 是\n";
tR += "    -   [ ] 部分\n";
tR += "    -   [ ] 偏离了\n";
tR += "-   **本季最符合该身份的一个行为：**\n";
tR += "-   **本季最背离该身份的一个行为：**\n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 4. 月度趋势洞察\n";
tR += "\n";
tR += "> 💡 请直接查阅以下资源后，记录跨越三个月的模式与趋势：\n";
tR += "> -   [[Habit Tracker/Habit Tracker]]（三个月打卡数据一览）\n";
tR += "> -   上方 2 中的月报链接 → 各月「月末复盘」区块\n";
tR += "\n";
tR += "| 维度 | 观察到的模式 | 是否需要调整 |\n";
tR += "| :--- | :--- | :--- |\n";
tR += "|      |              |              |\n";
tR += "|      |              |              |\n";
tR += "|      |              |              |\n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 5. 重要转折点\n";
tR += "\n";
tR += "-   \n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 6. 年度进度校准\n";
tR += "\n";
tR += "> 年度目标详见 [[" + y + " Annual Compass]]\n";
tR += "\n";
tR += "| 年度关键成果 | 本季推进 | 全年进度判断                |\n";
tR += "| :----------- | :------- | :-------------------------- |\n";
tR += "|              |          | 🟢 正常 / 🟡 滞后 / 🔴 需调整 |\n";
tR += "|              |          |                             |\n";
tR += "|              |          |                             |\n";
tR += "\n";
tR += "---\n";
tR += "\n";
tR += "## 7. 下季度规划\n";
tR += "\n";
tR += "### 下季主题：\n";
tR += "\n";
tR += "### 核心聚焦：\n";
tR += "\n";
tR += "1.  \n";
tR += "2.  \n";
tR += "3.  \n";
tR += "\n";
tR += "### 决定放弃的：\n";
tR += "\n";
tR += "> 停止做某事，往往比开始做某事更重要。\n";
tR += "\n";
tR += "> [!note]- 🌱 提炼与行动校准（点击展开）\n";
tR += "> 本周/月/季度是否产生了值得固化的通用方法论、模型或教训？\n";
tR += "> - [ ] 提炼为原子笔记：[[笔记名]]\n";
tR += "> - [ ] 转化为下一步行动\n";
tR += "> - [ ] 暂无可萃取内容\n";
tR += "\n";
tR += "---\n";
_%>