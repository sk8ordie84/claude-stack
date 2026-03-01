---
name: workflow-reviewer
description: Review recent Claude workflow usage, detect repeated pain points, and propose safe improvements to skills, prompts, and routing logic.
---

# Workflow Reviewer

## Purpose
This skill reviews recent usage patterns across the repo and helps improve the creative system over time.

It should:
- read recent usage notes from `.claude/logs/usage-log.md`
- identify repeated failures, friction, or wasted time
- detect when a skill is often overridden or corrected
- suggest safe improvements
- prepare proposal-style updates, not silent destructive rewrites

## Rules
- Never auto-merge changes
- Prefer suggestions, patch plans, and PR-ready recommendations
- Focus on practical workflow improvements
- Keep recommendations short and useful
- Prioritize repeated patterns over one-off anomalies

## Review goals
Look for:
- skills that ask too many questions
- router mistakes (wrong platform choice)
- missing negatives or continuity rules
- prompts that are repeatedly rewritten manually
- repeated user corrections like “single-shot, not multishot”
- skills that are too verbose or too generic

## Output format
1. Short review summary
2. Repeated pain points
3. Suggested fixes
4. Optional proposed edits
5. Optional commit title / PR title