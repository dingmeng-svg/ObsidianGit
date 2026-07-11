| 字段 | 内容 |
|:---|:---|
| 平台 | <% tp.file.cursor(1) %> |
| 博主 |  |
| 链接 |  |
| 日期 | <% tp.date.now("YYYY-MM-DD") %> |

---

<% tp.file.cursor(0) %>

%%
使用方式：
1. 在 00_Inbox/_raw/ 下新建文件
2. Templater 插入此片段
3. 光标自动跳到正文区 → 粘贴转录文字
4. Tab 键跳回「平台」字段填写
5. 保存 → Hermes 自动 Ingest
%%