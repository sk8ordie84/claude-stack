---
name: video
description: Master video skill that routes requests to the best workflow, automatically choosing between Runway and Kling, generating copy-paste-ready prompts with minimal questions.
---

# /video — Master Video Skill

## Purpose
This is the main video skill.
Use it when the user wants to create a video prompt from:
- an uploaded image
- a visual concept
- a rough prompt
- a short instruction like “runway”, “kling”, “make it cinematic”, or “make it better”

This skill should minimize questions and maximize speed.

---

## Core behavior

### 1) Auto-route to the right workflow
Decide automatically:

- Use **Runway Gen-4.5** when:
  - the user wants one continuous shot
  - the user wants image-to-video
  - the user wants seamless transitions, scale shift, morphs, elegant camera motion
  - the user provides one base image and wants premium motion

- Use **Kling 3.0** when:
  - the user wants a strong single cinematic shot with richer motion than Runway
  - the user wants a handcrafted, textured, stylized, or more characterful motion result
  - the user wants multishot / storyboard / multiple scenes
  - the user wants 5-shot story structure
  - the user wants more narrative sequencing
  - the user wants a product ad sequence or fashion progression

If Kling is selected:
- default to SINGLE-SHOT mode
- only use MULTISHOT mode if the user explicitly asks for multishot, 5-shot, storyboard, sequence, or narrative progression

If unclear:
- one image + motion = default to Runway
- multi-scene / story / 5 shots = default to Kling

---

### 2) Use minimum questions
Only ask questions if absolutely necessary.

Default values:
- duration: 6s
- aspect ratio: 1:1
- mode: image-to-video if image exists, otherwise text-to-video
- look: photoreal, premium, stable, no cheesy effects

If something is missing, ask maximum 2 questions:
1. Which platform do you want: Runway or Kling?
2. What is the main motion/action?

If user does not answer, proceed with strong defaults.

---

### 3) Auto-creative mode
If the user only uploads an image or only writes something vague like:
- “runway”
- “make a video”
- “make it cinematic”
- “do something cool”

Then activate **AUTO-CREATIVE MODE** and generate:

- **Variant A** — elegant / premium / clean
- **Variant B** — more creative transitions / scale-shift / reveal
- **Variant C** — slightly bolder / more dynamic / stronger motion

Each variant must include:
- platform choice
- camera move
- transition logic
- preserve rules
- negative constraints

---

### 4) Prompt fix mode
If the user pastes an existing prompt, do not start from zero.
Instead:
- repair it
- tighten it
- add missing continuity rules
- add negatives
- output a stronger final version

---

## Output format

### Always output in this order:

#### A) Turkish short explanation
Write 2–5 lines in Turkish:
- which platform you selected
- why
- what kind of motion/structure you chose

#### B) Final prompt in English
Give one copy-paste-ready prompt block.

#### C) Negative / constraints
Always include a negative / do-not-change block.

#### D) Optional A/B/C variants
Only if user was vague or if auto-creative mode is active.

---

## Global quality rules
Always prefer:
- photoreal
- premium editorial finish
- real camera language
- stable geometry
- coherent motion
- good continuity
- no cheap or random VFX

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

---

## Runway mode template
Use this structure when selecting Runway:

**FINAL PROMPT**
Use the provided image/video as the exact visual anchor. Create a photoreal, premium cinematic motion piece with stable composition, realistic camera behavior, elegant movement, and coherent transitions. Use smooth camera motion such as push-in, micro orbit, slow pull-back, or parallax reveal depending on the scene. Keep lighting, subject identity, outfit, and environment consistent unless the user explicitly asks for change. Add tasteful seamless transitions such as match cuts, scale shifts, subtle morph reveals, or fluid foreground wipes where appropriate. Preserve realism, material accuracy, shadows, and reflections. No text, no logos, no watermark, no extra people, no flicker, no warped geometry, no unstable background motion.
Duration: __ seconds. Aspect ratio: __.

**NEGATIVE**
No text, no subtitles, no watermark, no logos, no extra people, no face distortion, no flicker, no geometry warping, no background shimmer, no sudden exposure pumping.

---

## Kling mode template
Use this structure when selecting Kling:

**MASTER CONTINUITY RULES**
Photoreal, premium editorial realism, identity locked, lighting continuity, consistent lens feel, no text/logos/watermarks, no extra people unless requested, no flicker, no warped geometry, no face drift, no unstable backgrounds.

**SHOT LIST**
Scene 1 (__s): ...
Scene 2 (__s): ...
Scene 3 (__s): ...
Scene 4 (__s): ...
Scene 5 (__s): ...

**NEGATIVE**
No text, no logo, no watermark, no face melting, no anatomy errors, no extra limbs, no flicker, no geometry warps, no random stylistic jumps.

**OUTPUT**
Total duration: __
Aspect ratio: __

---

## Preset behavior
If user mentions:
- “showtime” → prefer elegant Runway transitions
- “guy ritchie” → prefer Kling 5-shot progression
- “fashion walk” → choose based on single-shot vs multishot
- “product ad” → choose based on macro/hero/lifestyle flow

---

## Fast-path examples

### Example 1
User uploads one image and writes:
“runway”

You should:
- choose Runway
- activate auto-creative mode
- produce A/B/C variants

### Example 2
User writes:
“5-shot jetset story”
You should:
- choose Kling
- create a 5-shot structure

### Example 3
User pastes a weak prompt and writes:
“fix this for runway”
You should:
- repair the prompt
- output only final polished runway prompt

---

## Most important rule
Optimize for speed.
The user should not need to explain too much.
If enough context exists, decide and generate.
---

## AUTO-CREATIVE EXPANSION

If the user gives very little information, automatically generate **3 strong creative directions**:

### Variant A — Premium / Elegant
- clean editorial realism
- stable framing
- subtle camera motion
- tasteful transitions
- safest / most premium result

### Variant B — Creative / Transition-led
- stronger transition language
- scale shift
- match cuts
- reveal-based motion
- still realistic and premium

### Variant C — Bold / Dynamic
- more dynamic motion
- stronger rhythm
- more movement and contrast
- still coherent, not cheesy

For each variant include:
- selected platform
- why that platform is best
- final prompt
- negative constraints

---

## PRESET SHORTCUTS

If the user writes any of these keywords, apply them automatically:

### showtime
- elegant transitions
- runway preferred
- scale shift + match cuts + premium reveal motion

### guyritchie
- kling preferred
- 5-shot structure
- witty progression, strong sequencing, high-energy cuts

### fashionwalk
- if single shot: runway
- if multi-scene: kling
- subject walk, turn, fabric movement, cool confidence

### productad
- choose runway or kling depending on request
- macro detail → hero reveal → lifestyle usage
- premium commercial polish

### dreamy
- softer motion
- atmospheric transitions
- gentle light bloom
- still realistic, no fantasy drift

### darkluxury
- richer contrast
- moody but premium
- controlled highlights
- no crushed blacks, no cheap cyberpunk look

---

## AUTO FIX PASS

Before giving the final output, always silently check:

- Is the platform choice clear?
- Is the duration present?
- Is the aspect ratio present?
- Is the motion language clear?
- Are continuity / preserve rules present?
- Are negative constraints included?

If any of these are missing, add them automatically without asking.

---

## IMAGE-FIRST MODE

If the user uploads an image and writes only:
- /video
- runway
- kling
- make it cinematic
- make a video
- do something cool

Then do not ask unnecessary questions.

Instead:
1. analyze the image
2. infer likely genre
3. choose a default duration (6s)
4. choose default ratio (1:1)
5. generate A/B/C variants
6. preserve realism and image identity

---

## FAST RESPONSE RULE

If enough information exists, do not ask questions.
Just decide and generate.

Questions should only happen when:
- the user explicitly wants a platform
- the user wants a specific duration or ratio
- the user wants a specific narrative structure

Otherwise proceed automatically.