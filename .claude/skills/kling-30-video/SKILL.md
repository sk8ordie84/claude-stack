---
name: kling-30-video
description: Create copy-paste ready Kling 3.0 video prompts in both single-shot and multishot modes, with strong continuity, negative controls, and premium cinematic direction.
---

# Kling 3.0 Video Prompt Skill

## Purpose
This skill creates **copy-paste ready Kling 3.0 prompts** for:
- single-shot cinematic video prompts
- multishot / 5-shot structured prompts
- fashion editorial motion
- product ad motion
- short narrative progression

Write a **short Turkish explanation first**, then give the **final prompt in English**.

---

## Mode selection

This skill supports 2 modes:

### 1) Single-shot mode (default)
Use this by default unless the user explicitly asks for multishot.

Use single-shot mode for:
- one strong cinematic scene
- one continuous shot
- one visual idea expanded into the best possible single video moment
- image-to-video with one clear motion concept
- premium fashion/editorial motion from one image
- one hero movement, not a sequence

Output in single-shot mode:
- short Turkish explanation
- one FINAL PROMPT in English
- one NEGATIVE block
- no shot list

### 2) Multishot mode
Only use this when the user explicitly asks for:
- multishot
- 5-shot
- storyboard
- multiple scenes
- progression
- sequence
- narrative structure
- product ad sequence
- fashion progression across shots

Output in multishot mode:
- MASTER CONTINUITY RULES
- SHOT LIST
- NEGATIVE
- OUTPUT

## Default behavior
If the user does not specify the mode:
- default to SINGLE-SHOT mode

---

## User inputs to infer or ask for only if needed
If the user has already provided enough context, do not ask again.

Only ask minimal questions if absolutely necessary:
1. Duration
2. Aspect ratio
3. Single-shot or multishot (only if unclear and important)

If missing, use defaults:
- duration: 6s for single-shot
- duration: 15s for multishot (5 shots × 3s)
- aspect ratio: 1:1
- look: photoreal, premium, stable, no cheesy effects

---

## Global rules

Always prefer:
- photoreal
- premium editorial finish
- real camera language
- stable geometry
- coherent motion
- identity consistency
- clean lighting continuity
- physically plausible movement

Always avoid:
- text
- subtitles
- logos
- watermark
- flicker
- warped geometry
- melted faces
- duplicated limbs
- background shimmer
- random exposure changes
- cheap or cartoonish effects

---

## Output format

Always output in this order:

### A) Short Turkish explanation
Write 2–5 short lines in Turkish:
- which mode you selected
- why
- what kind of motion/camera language you chose

### B) Final prompt in English
- if single-shot: one FINAL PROMPT block
- if multishot: MASTER CONTINUITY RULES + SHOT LIST + NEGATIVE + OUTPUT

### C) Negative / constraints
Always include negative constraints.

---

## Kling single-shot template

Use this structure when the user wants a single-shot Kling prompt:

**FINAL PROMPT**
Create a single, visually strong cinematic shot based on the provided image or concept. Keep the result photoreal, premium, stable, and coherent. Use one clear camera move only, such as a slow push-in, a subtle orbit, a gentle lateral slide, or a controlled pull-back. Preserve identity, outfit, textures, and environment unless explicitly instructed otherwise. Motion must feel intentional, physically plausible, and visually rich without turning into a multishot sequence. Keep lighting continuity clean and realistic. No text, no logos, no watermark, no extra people, no flicker, no warped geometry, and no unstable background motion.

**NEGATIVE**
No text, no subtitles, no logos, no watermark, no extra people, no face distortion, no anatomy errors, no extra limbs, no flicker, no geometry warps, no background shimmer, no random stylistic jumps.

---

## Kling multishot template

Use this structure when the user explicitly wants multishot:

**MASTER CONTINUITY RULES**
Photoreal, premium editorial realism, identity locked, lighting continuity, consistent lens feel, no text/logos/watermarks, no extra people unless requested, no flicker, no warped geometry, no face drift, no unstable backgrounds.

**SHOT LIST**
Scene 1 (__s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [style]. Transition: [type].
Scene 2 (__s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [style]. Transition: [type].
Scene 3 (__s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [style]. Transition: [type].
Scene 4 (__s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [style]. Transition: [type].
Scene 5 (__s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [style]. Transition: [type].

**NEGATIVE**
No text, no logo, no watermark, no face melting, no anatomy errors, no extra limbs, no flicker, no geometry warps, no random stylistic jumps.

**OUTPUT**
Total duration: __
Aspect ratio: __

---

## Preset behavior

If user mentions:

### showtime
- prefer elegant transition logic
- prefer single-shot unless multishot is explicitly requested
- use premium reveal motion, subtle scale-feel, polished camera language

### guyritchie
- prefer multishot
- use 5-shot progression
- stronger sequencing and punchier structure

### fashionwalk
- default to single-shot if one image / one scene
- use multishot only if explicitly requested
- subject walk, turn, fabric movement, cool confidence

### productad
- use single-shot for one hero move
- use multishot for macro → hero → lifestyle sequence
- premium commercial polish

### dreamy
- softer motion
- atmospheric camera behavior
- gentle light bloom
- still realistic, no fantasy drift

### darkluxury
- richer contrast
- moody but premium
- controlled highlights
- no crushed blacks
- no cheap cyberpunk look

---

## Auto-creative behavior

If the user gives very little information, automatically generate:

### Variant A — Premium / Elegant
- safest and most premium version
- subtle camera move
- stable realism

### Variant B — More Creative
- stronger motion language
- richer visual idea
- still coherent and premium

### Variant C — Slightly Bolder
- more dynamic movement
- stronger rhythm
- still realistic and usable

For each variant include:
- selected mode
- why that mode is best
- final prompt
- negative constraints

---

## Prompt-fix mode

If the user pastes an existing Kling prompt:
- do not rewrite from zero unless necessary
- preserve the intent
- tighten the language
- add missing structure
- add negatives
- add continuity rules
- convert it into either:
  - single-shot final prompt
  - or multishot final structure
depending on the user’s intent

---

## Fast-path examples

### Example 1
User uploads one image and writes:
“kling”

You should:
- default to SINGLE-SHOT mode
- generate the best one-scene Kling prompt
- use strong defaults

### Example 2
User writes:
“kling 5-shot jetset story”

You should:
- use MULTISHOT mode
- create a 5-shot structure

### Example 3
User writes:
“fix this for kling”

You should:
- repair the prompt
- output only the improved Kling result

---

## Most important rule
Optimize for speed and usefulness.

If enough context exists:
- do not ask unnecessary questions
- default to SINGLE-SHOT mode
- generate a strong, production-ready Kling prompt immediately