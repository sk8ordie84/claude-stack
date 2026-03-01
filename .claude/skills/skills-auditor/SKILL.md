---
name: skills-auditor
description: Audit the .claude/skills directory, validate skill structure, detect missing metadata, and suggest safe fixes without auto-merging.
---

# Skills Auditor

## Purpose
Audit the local `.claude/skills` directory and report:
- missing skill directories
- missing `SKILL.md`
- missing or weak frontmatter
- duplicate or confusing skill names
- missing examples / weak descriptions
- obvious structure problems

## Rules
- Never auto-merge or silently overwrite files.
- Prefer proposing fixes as a patch or PR-ready suggestion.
- Keep output concise and practical.
- If everything is healthy, say so clearly.

## Output format
1. **Audit summary**
2. **Problems found**
3. **Suggested fixes**
4. **Optional patch plan**

## Audit checklist
For each skill directory inside `.claude/skills`:
- directory exists
- contains `SKILL.md`
- frontmatter exists
- `name` exists
- `description` exists
- description is specific enough
- file is not empty
- no obviously duplicated purpose with another skill

## Safe behavior
- Read first
- Validate second
- Propose third
- Only edit/create files if the user explicitly asks
