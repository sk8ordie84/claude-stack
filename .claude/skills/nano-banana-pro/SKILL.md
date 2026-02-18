---
name: nano-banana-pro
description: Generate copy-paste ready Nano Banana Pro prompts with strict PRIMARY/REFERENCE labeling, controlled edits, and clean constraints.
---

# Nano Banana Pro — Prompt Builder Skill

## Purpose
This skill produces **copy-paste ready** prompts for **Nano Banana Pro** image/video generation and editing, with:
- strict **PRIMARY / REFERENCE** image labeling
- **minimal, explicit constraints** (no fluff)
- **controlled edits** (change only what is requested)
- consistent output formatting

## When to use
Use this skill whenever the user wants:
- an image edit based on one or more reference images
- consistent character identity transfer
- outfit swap, object swap, background/scene swap, lighting/style alignment
- multi-reference control (identity vs outfit vs location)
- “ONLY change X, everything else identical” instructions

## Inputs you should ask for (only if missing)
- What is **PRIMARY (base)** image?
- Any **REFERENCE** images? (identity / outfit / style / object / location)
- What is the **GOAL**? (single sentence)
- What must **NOT** change?
- Output: **image** or **video**? (if video: duration/motion)
- Any hard rules: text/no text, logos/no logos, aspect ratio, view angle

If user already provided these, do **not** ask again.

---

## Output rules (MANDATORY)

### 1) Always label images
If multiple images exist, always structure like:

**PRIMARY (base image):**
- Image 1

**REFERENCE (identity):**
- Image 2 (face/body proportions/hair)

**REFERENCE (outfit):**
- Image 3 (exact cut/fabric/colors)

**REFERENCE (style / lighting / texture):**
- Image 4

If only one image exists, still label it as **PRIMARY**.

### 2) Always produce a single “FINAL PROMPT”
Output must contain **only**:
- One **FINAL PROMPT** block, ready to paste.
No commentary, no extra options unless explicitly requested.

### 3) Control strength hierarchy
- PRIMARY controls: framing, camera angle, composition, base scene, geometry
- REFERENCE controls: only the attribute assigned (identity/outfit/style/object)
- If conflicts occur: keep PRIMARY’s composition; apply REFERENCE only to requested attribute.

### 4) “Change ONLY X” is sacred
If user says “only change X”, you must:
- explicitly forbid additional changes
- add “NO extra objects/people/text/logos/watermarks”
- add “preserve all original details, colors, textures, grain, lighting unless stated”

### 5) Text policy (default)
Default: **no text, no logos, no watermark**  
Only allow text if user explicitly wants it, then specify:
- exact wording
- placement
- legibility constraints
- typography style

---

## Prompt template (use this structure)

FINAL PROMPT should follow this sequence:

1) PRIMARY + global keep rules  
2) GOAL (single sentence)  
3) REFERENCE mapping (what each ref controls)  
4) Controlled changes (allowed)  
5) Strict “DO NOT” list  
6) Quality controls (realism, grain, sharpness)  
7) Output constraints (aspect ratio, view, motion if video)

---

## Default constraints (apply unless user overrides)
- No extra people
- No text, no logos, no watermark
- No warped anatomy / duplicated limbs / artifacts
- Preserve perspective and camera height from PRIMARY
- Photorealistic unless user asks otherwise
- Clean, copy-paste ready, short and explicit

---

## Examples

### Example A — identity + outfit swap (strict)
FINAL PROMPT:
PRIMARY (base image): Use Image 1 as the exact base. Preserve camera angle, framing, background architecture, lighting, color temperature, and grain.
REFERENCE (model identity): Use Image 2 as the model identity (face, hair, body proportions). Do NOT copy Image 2 clothing.
REFERENCE (outfit): Dress the model in Image 3 outfit EXACTLY (no redesign): same cut, fabric, seams, color, texture, accessories, silhouette.
GOAL: Replace the person in Image 1 with the identity from Image 2 wearing the outfit from Image 3 while keeping everything else identical.
STRICT: Change ONLY the person identity + outfit. Do NOT change background, props, environment, shadows, lens look, or composition. No extra people. No text/logos/watermark. No artifacts, no warped geometry, no duplicated limbs.

### Example B — “only add light effect”
FINAL PROMPT:
PRIMARY (base image): Use Image 1 as the exact base. Preserve every detail exactly.
GOAL: Add ONLY a subtle heart-shaped light/glow effect around the existing object, matching the scene’s lighting.
STRICT: Do NOT change subject, pose, facial features, clothing, background, colors, sharpness, or framing. Add no new objects or text. No logos/watermark. Keep realism and original grain.

---

## Edge cases
- If user wants “same image but different angle”: you must state it becomes a **recreation** and list what is allowed to vary (camera angle only) while keeping identity/style consistent.
- If user provides conflicting references: explicitly prioritize PRIMARY composition; apply references only to the requested attribute.

---

## Safety
Refuse requests that involve illegal/violent wrongdoing instructions, explicit sexual content involving minors, or other disallowed content. For everything else, comply with strict “change only X” constraints.
