---
title: "这样做可以让Hermes Agent「打通任督二脉」，闪电般进化！"
date: 2026-07-09
status: archived
tags: [知识管理]
source: 微信公众号
author: 未知
aliases: []
related: []
---

**用途**：技术参考（Skill 自优化机制）

**核心价值**：darwin-skill + SkillEvolver 双 skill 自优化实验

---

## 达尔文skill：给AI打分的"质检员"

darwin-skill 来自 GitHub，灵感源自微软研究院的 SkillLens论文。它做的事情很直白——给AI的skill打分。

什么是skill？简单说就是AI的"操作说明书"。你让AI帮你干一件事，它照着skill里的步骤来。skill写得好，AI就干得漂亮；写得烂，AI就抓瞎。

darwin-skill搞了一套9维评估体系，满分100分。从frontmatter质量、工作流清晰度、失败模式编码，到检查点设计、可执行具体性，甚至"反例与黑名单"都有单独的维度。

说白了，它就是AI世界的ISO质量认证。

但光会打分还不够。darwin最狠的设计是**棘轮机制**——分数只能涨不能跌。每次优化后重新评估，分数降了就自动回滚，像棘轮一样只进不退。

它还有一个**独立评审制度**：改skill的AI和评skill的AI必须是不同的agent。为什么？因为微软论文的实测数据显示，AI给自己打分的准确率只有46.4%，跟抛硬币差不多。

---

## SkillEvolver：清华论文的"进化引擎"

第二个主角：SkillEvolver。

这个skill来自清华、北交大团队的论文《SkillEvo: Evolving Skill with Skill》，核心思想是：**让AI学会自己改自己的"说明书"**。

传统的skill优化流程是：人类写skill → AI执行 → 人类发现问题 → 人类改skill → AI再执行。这个循环的瓶颈在于"人类发现问题"——人类的时间有限、精力有限、洞察有限。

SkillEvover的设计是：人类写初始skill → AI执行 → **另一个AI自动发现问题** → AI自动改skill → AI再执行。把"发现问题"这个环节交给AI，人类只需要在关键时刻介入。

---

## 双skill互优化实验

实验设计：
1. SkillEvolver负责改skill
2. darwin-skill负责评skill
3. 两个AI互相挑毛病、互相改进
4. 4轮迭代后验证效果

实验结果：
- 每轮迭代后，skill的质量分数都有提升（棘轮机制生效）
- 4轮迭代后，两个skill都各自变强
- 意外验证了清华论文的核心结论：AI的能力提升，不一定需要更强的模型，只需要让AI学会自己改自己的"说明书"

---

## 借鉴价值

1. **棘轮机制**：分数只能涨不能跌，避免优化过程中的退化
2. **独立评审**：改skill的AI和评skill的AI必须分离，避免AI给自己打分的准确性问题
3. **自优化闭环**：人类写初始skill → AI发现问题 → AI改skill → AI再执行，把"发现问题"环节自动化

**注意**：这是实验记录，具体实施细节需要结合 Hermes Agent 的实际情况调整。
