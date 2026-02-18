# Kling 3.0 Video Prompt Skill (kling-30-video)

## Amaç
Bu skill, Kling 3.0 için:
- Multi-shot (çok sahneli) video promptları
- Tutarlılık (identity/style/wardrobe lock)
- Net süreler ve sahne başına aksiyon
- “Show” ama anlaşılır (sebep-sonuç) kurgu
üretir.

> Not: Konsept açıklamasını Türkçe anlat; prompt metnini İngilizce yaz.

---

## Kullanıcıdan İstenecek Bilgi (Checklist)
1) **FORMAT**
- Single-shot mı, **multi-shot** mı?
- Kaç sahne? (ör. 5 sahne / 12 sahne)
- Her sahne kaç saniye? (ör. 2–3s)

2) **PRIMARY / REFERENCES**
- PRIMARY image/video (varsa)
- IDENTITY reference (kimlik sabitleme)
- STYLE reference (grain/color/lens)
- Wardrobe reference (kıyafet sabit mi değişken mi?)

3) **GOAL**
- Hikaye hedefi (tek cümle): “jet-set funny”, “heist”, “fashion editorial”, “product ad”, vb.

4) **PRESERVE**
- No text/logos, no children, no extra people, daylight, vs.

5) **OUTPUT**
- Aspect ratio (1:1, 9:16, 16:9)
- Total duration

---

## Çıktı Formatı (Kling 3.0)
### A) “MASTER CONTINUITY RULES” (en üstte)
- identity lock
- lens language
- color grade
- daylight
- no text/logos
- physics plausible

### B) “SHOT LIST” (Scene 1..N)
Her sahnede:
- location + framing
- action (tek cümle)
- camera movement
- lighting
- transition to next shot

### C) “NEGATIVE / DO-NOT”
- deformities, extra limbs, warped geometry, text

---

## Master Prompt Template (FINAL)
**MASTER CONTINUITY RULES:**
- Photoreal, real-lens look, premium editorial finish.
- Identity locked and consistent across all shots (face/hair/body proportions stay the same).
- Lighting: bright/daylight, clean highlights, controlled contrast, no night unless requested.
- No text, no subtitles, no logos, no watermarks.
- No extra people unless explicitly requested.
- Physics-accurate motion, no warping, no unnatural limbs, stable backgrounds (no shimmer/flicker).
- Consistent color grade across shots (single cohesive palette).

**SHOT LIST (paste into Kling 3.0):**
Scene 1 (___s): [Location]. [Framing]. [Action]. Camera: [move]. Lighting: [daylight]. Transition: [type] into Scene 2.
Scene 2 (___s): ...
Scene 3 (___s): ...
Scene 4 (___s): ...
Scene 5 (___s): ...
(Continue as needed)

**TRANSITION NOTES:**
Use coherent “show” transitions only (match cut, scale shift, whip-pan controlled, morph-reveal). Avoid random jump cuts.

**NEGATIVE / DO NOT:**
No text, no logo, no watermark, no deformed hands, no extra limbs, no face melting, no geometry warp, no background shimmer, no noisy flicker, no sudden exposure changes.

---

## Özel Modlar (kullanıcının isteğine göre)
### 1) Fashion Editorial Multi-shot
- Minimal ama premium aksiyon: yürüyüş, turn, fabric movement
- Kamera: dolly, slow push-in, gentle pan
- Doku: matte film grain, natural shadows

### 2) Product Ad Multi-shot
- Macro detail → hero shot → lifestyle context
- Reflections & glass/metal doğru
- Renk paleti tutarlı

### 3) Heist / Action (anlaşılır)
- 5 sahnede sebep-sonuç: setup → move → complication → twist → payoff
- VFX varsa: “tasteful, cinematic, not cartoon”

---

## Asistanın Davranışı
- Türkçe: “Ne yapıyoruz / nasıl bir kurgu”
- İngilizce: FINAL prompt (MASTER RULES + SHOT LIST)
- Eksik info varsa sadece kritik sorular: total duration + aspect ratio + kaç sahne.
