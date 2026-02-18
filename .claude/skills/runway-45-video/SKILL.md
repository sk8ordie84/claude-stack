# Runway Gen-4.5 Video Prompt Skill (runway-45-video)

---

## Bu Skill Ne İçin? (TR)
Bu skill, **Runway Gen-4.5** platformuna yapıştırmaya hazır, copy-paste video promptları üretir.
Tek çekim veya çok sahneli storyboard formatlarını destekler.
Sinematik, premium, temiz estetik tercih edilir — ucuz VFX yok, abartılı efekt yok.
Türkçe brief al, İngilizce prompt üret.

**Nerede kullanılır:** Runway Gen-4.5 arayüzü — Image-to-Video (I2V) veya Text-to-Video (T2V) kutusuna yapıştır.

---

## Kullanıcıdan İstenecek Minimum Bilgi

Sadece şu 5 soruyu sor (hepsini tek seferde):

1. **Kaynak görsel var mı?** (Image-to-Video mu, Text-to-Video mu?)
2. **Ana aksiyon / hareket** nedir? (ör. "model yavaşça döner", "kamera yavaş zoom")
3. **Mood / atmosfer** (ör. premium, melankoli, enerjik, sakin)
4. **Süre** (ör. 5s / 8s / 10s)
5. **Aspect ratio** (1:1 / 9:16 / 16:9)

Ekstra soru sorma. Eksik bilgiyi mantıklı default ile doldur.

---

## Çıktı Yapısı

Her üretimde aşağıdaki bölümlerden uygun olanları sun:

- **[A] Single-Shot Prompt** — tek çekim, copy-paste hazır
- **[B] Image-to-Video (I2V) Prompt** — kaynak görsel varsa
- **[C] Multi-Scene Storyboard** — 4 sahne, seamless transitions
- **[D] Negative Prompt / Constraints** — her zaman ekle

---

## [A] SINGLE-SHOT PROMPT TEMPLATE

**Kullanım:** Kısa, tek kesimlik video. Kaynak görsel olmadan T2V.

```
SINGLE-SHOT (Runway Gen-4.5 — paste as prompt):

[SCENE] [Location/environment description]. [Lighting: type, direction, quality]. [Time of day].
[SUBJECT] [Subject description: clothing, posture, look].
[ACTION] [What happens: motion, gesture, expression — keep it single and clean].
[CAMERA] [Lens language: push-in / pull-back / static / slow pan / orbit]. [Speed: very slow / deliberate]. [Framing: close-up / medium / full-body].
[LOOK] Cinematic, photoreal, premium finish. [Grain: none / subtle / medium]. [Color grade: warm-neutral / cool / desaturated / high contrast]. Matte finish, no lens flare, no gloss.
[DURATION] __ seconds. [ASPECT RATIO] __.

NEGATIVE: No text, no subtitles, no logos, no watermarks, no extra people, no deformed hands, no warped geometry, no face melting, no background shimmer, no grain flicker, no sudden exposure shifts, no cheesy VFX, no cartoon look.
```

---

## [B] IMAGE-TO-VIDEO (I2V) PROMPT TEMPLATE

**Kullanım:** Kaynak görsel (Image 1) Runway'e yüklenir, bu metin prompt kutusuna yapıştırılır.

```
I2V PROMPT (Runway Gen-4.5 — paste alongside uploaded image):

[PRIMARY FRAME] Use the uploaded image as the exact starting frame. Preserve the composition, camera angle, camera height, lens perspective, color grade, and lighting direction precisely throughout.
[LOOK] [Style: cinematic / analog-matte / editorial-clean]. [Grain level: none / subtle / medium]. Photoreal. No gloss. No specular overblown highlights.
[ACTION] From this frame: [describe the motion — what moves, how, at what speed]. Motion must feel physically plausible. [Subject action if any].
[CAMERA] [Move: static / micro push-in / slow pull-back / gentle pan / orbit]. Speed: [very slow / deliberate]. Framing holds at [close-up / medium / full-body] throughout unless scale-shift is requested.
[SCALE SHIFT — OPTIONAL] Begin at [wide / full-body] → slowly push to [medium / close-up] in a single fluid motion. Maintain film grain and color grade continuously.
[PRESERVE] Do not change: background/location, color grade, lighting quality, model identity, outfit, framing geometry. Do not add text/logos/objects/extra people.
[DURATION] __ seconds. [ASPECT RATIO] __.

NEGATIVE: No text, no logos, no watermarks, no extra people, no deformed hands, no face melting, no geometry warp, no background shimmer, no grain flicker, no sudden exposure changes, no cheesy VFX.
```

---

## [C] MULTI-SCENE STORYBOARD — 4 SCENES (Seamless Transitions)

**Kullanım:** 4 sahneli, birbirine akan video. Her sahne ayrı prompt olarak ya da tek blok olarak kullanılabilir.

```
STORYBOARD (Runway Gen-4.5 — 4 scenes):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASTER CONTINUITY RULES (apply to all scenes):
- Identity locked: face, hair, body proportions consistent across all scenes.
- Color grade: consistent [warm-neutral / cool / desaturated] palette — no shift between scenes.
- Lighting: [daylight / soft ambient / golden hour] — no sudden changes.
- No text, no logos, no watermarks, no extra people in any scene.
- Physics-accurate motion. No warped geometry. Stable backgrounds (no shimmer/flicker).
- Grain level: [none / subtle / medium] — consistent across all scenes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SCENE 1 (__ s):
[Location]. [Framing: full-body / medium]. [Action: describe clearly in 1 sentence].
Camera: [static / slow push-in / gentle pan]. Lighting: [type].
Transition → Scene 2: [MATCH CUT on shape/color | SCALE SHIFT wide→close | SEAMLESS MORPH | SLOW DISSOLVE].

SCENE 2 (__ s):
[Location — same or new]. [Framing]. [Action].
Camera: [move]. Lighting: [consistent].
Transition → Scene 3: [type].

SCENE 3 (__ s):
[Location]. [Framing]. [Action].
Camera: [move]. Lighting: [consistent].
Transition → Scene 4: [type].

SCENE 4 (__ s):
[Location]. [Framing — can push closer for emphasis]. [Final action / resolution].
Camera: [slow pull-back / static hold / gentle orbit]. Lighting: [consistent].
End: hold last frame 0.5s, no hard cut.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL DURATION: __ seconds. ASPECT RATIO: __.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Transition Library (seç ve yerleştir)
| Geçiş | Açıklama |
|---|---|
| **Match cut** | Aynı şekil/renk/pozisyon üzerinden kesintisiz geçiş |
| **Scale shift** | Extreme close-up → medium → wide (tek akışta) |
| **Seamless morph** | Form akışkan değişir ama sahne hissi korunur |
| **Slow dissolve** | Yumuşak cross-fade, sahneler arasında |
| **Parallax reveal** | Foreground hareket ederken arka plan açılır |
| **Whip-pan (controlled)** | Hızlı pan ile sahne geçişi — dikkatli kullan |

---

## [D] NEGATIVE PROMPT / CONSTRAINTS (Her zaman ekle)

```
NEGATIVE / DO NOT (Runway Gen-4.5):
No text of any kind. No subtitles. No logos. No watermarks.
No extra people or characters.
No deformed hands, no extra fingers, no missing limbs.
No face melting, no identity drift across frames.
No warped or impossible geometry.
No background shimmer, no micro-jitter, no flickering.
No sudden exposure jumps or color grade shifts.
No cheesy VFX, no particle explosions, no lens flares.
No cartoon look, no over-sharpening, no digital gloss.
No noise or grain flicker (grain must be stable and consistent).
```

---

## Kamera Dili Referansı (Realistic Camera Language)

| Hareket | Tanım | Ne Zaman |
|---|---|---|
| Static hold | Kamera sabit, sadece sahne hareket eder | Güçlü, minimal anlar |
| Micro push-in | Çok yavaş yaklaşma (zoom değil, dolly hissi) | Intimate, odak artırma |
| Slow pull-back | Yavaş uzaklaşma, ortam açılır | Reveal, kontekst |
| Gentle pan | Yatay süpürme, çok kontrollü | Mekan gösterimi |
| Orbit / arc | Özneyi yavaş dönme | Ürün, karakter tanıtımı |
| Handheld micro | Çok küçük titreme, canlılık hissi | Editorial, doküman tarzı |

---

## Asistanın Davranışı
- Konsepti Türkçe özetle (1–3 cümle).
- Uygun template'leri (A/B/C/D) belirle ve doldur.
- Kullanıcı kaynak görsel belirtmediyse → [A] Single-Shot ver.
- Kaynak görsel varsa → [B] I2V ver.
- Storyboard istendiyse → [C] 4-Scene ver.
- [D] Negative her zaman ekle.
- Eksik bilgiyi mantıklı default ile doldur. Gereksiz soru sorma.
- FINAL PROMPT'u İngilizce, copy-paste hazır, tek blok olarak ver.
---

## AUTO-CREATIVE MODE (if user gives only an image or says “runway”)
If the user provides no goal:
- Generate 3 creative variants: **A / B / C**
- Each variant must include: camera move + transition recipe + preserve rules + negative
- Keep it premium, real-lens, tasteful (no cheesy VFX).

### Default A/B/C recipes
- A: Slow push-in + micro-orbit, seamless match-cut, matte film + subtle grain
- B: Parallax reveal (foreground wipe) + scale shift (macro→wide), stable background (no shimmer)
- C: Rack-focus wipe + whip-pan (controlled) into a clean hero frame, stabilized motion

---

## PROMPT FIX MODE
If the user pastes a prompt and says “fix for runway”:
- Return a single **FINAL PROMPT** formatted for Runway
- Add missing: duration/aspect/fps vibe + preserve + negative
- Keep intent unchanged

---

## PRESETS (quick start)
If user says “Preset 1/2/3”, use:
- Preset 1: Fashion editorial (walk/turn/fabric micro-movement), 6s, clean daylight, matte film
- Preset 2: Product ad (macro texture → hero shot), 6s, stabilized, controlled reflections
- Preset 3: Seamless showreel (scale shift + match cuts), 8s, premium transitions, no warping

---

## SANITY CHECK (before final output)
Confirm the FINAL PROMPT contains:
- Duration
- Aspect ratio
- Clear camera move
- Clear transition type
- Preserve rules (identity/outfit/location)
- Negative constraints (no text/logo/watermark, no flicker/warp)
If any missing, add it silently.

