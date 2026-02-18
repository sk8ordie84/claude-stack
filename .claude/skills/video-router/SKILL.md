# Video Platform Router Skill (video-router)

---

## Bu Skill Ne İçin? (TR)
Bu skill, video üretim ihtiyacını analiz ederek **doğru platformu seçer** ve hazır prompt üretir.
Runway Gen-4.5 mi, Kling 3.0 mu? Bu skill karar verir — sen sadece ne istediğini söyle.
"Auto-creative" modunda minimal bilgiyle tam prompt çıktısı alırsın.
Sık kullanılan format tipleri için **hazır preset'ler** içerir.

**Nerede kullanılır:** Hangi platform olduğuna karar veremediğinde veya hızlı prompt üretmek istediğinde.

---

## Platform Karar Matrisi

| İhtiyaç | Platform | Format |
|---|---|---|
| Kaynak görsel → video (I2V) | **Runway Gen-4.5** | I2V Template |
| Tek sinematik çekim, T2V | **Runway Gen-4.5** | Single-Shot |
| 4-sahne storyboard, seamless geçiş | **Runway Gen-4.5** | 4-Scene Storyboard |
| Çok sahneli kurgu (5+ shot) | **Kling 3.0** | 5-Shot Multishot |
| Ürün reklamı (macro→hero→lifestyle) | **Kling 3.0** | Product Ad |
| Moda editöryal yürüyüş | **Kling 3.0** | Fashion Walk Cycle |
| Kimlik kilidi kritik (yüz tutarlılığı) | **Kling 3.0** | Multishot |
| Hızlı tek çekim, platform fark etmez | **Runway Gen-4.5** | Single-Shot |

**Karar kuralı:**
- I2V → Runway
- 5+ shot / identity lock kritik → Kling
- 1–4 shot, T2V → Runway
- Fashion walk / product → Kling

---

## Kullanıcıdan İstenecek Minimum Bilgi

Sadece şu 3 soruyu sor:

1. **Ne üretmek istiyorsun?** (1 cümle: ör. "model yürüyor", "parfüm şişesi dönüyor", "şehir sahnesi")
2. **Kaynak görsel var mı?** (evet / hayır)
3. **Kaç sahne / süre?** (ör. tek çekim 8s / 5 sahne 15s)

Aspect ratio ve mood belirtilmemişse → default: `16:9`, `cinematic premium`.

---

## AUTO-CREATIVE MOD

Kullanıcı sadece bir konsept verirse (ör. "moda editorial") otomatik preset'i uygula ve FULL prompt üret. Ekstra soru sorma.

```
AUTO-CREATIVE (router karar verir, prompt üretir):

Konsept: [kullanıcının tek cümlesi]
→ Platform: [Runway / Kling]
→ Format: [seçilen template]
→ Default values: 16:9, cinematic, daylight, no extra people, no text.
→ FULL PROMPT: [aşağıda]
```

---

## PRESET LIBRARY

Preseti belirt → router doldurur, platform seçer, prompt çıkar.

### PRESET 1 — Sinematik Portre (Runway Gen-4.5 / Single-Shot)
```
PRESET: Cinematic Portrait
Platform: Runway Gen-4.5 — Single-Shot
Default: 8s, 16:9, daylight, medium framing, slow push-in.

SINGLE-SHOT (Runway Gen-4.5):
[SCENE] Clean, minimal location. Soft directional daylight. Open shade or diffused window light.
[SUBJECT] [Person description]. Natural posture. Relaxed, premium feel.
[ACTION] Subject breathes naturally, slight head turn or eye-line shift. Minimal, intentional movement.
[CAMERA] Very slow micro push-in. Framing: medium (chest-up). Speed: deliberate.
[LOOK] Cinematic, photoreal. Subtle film grain. Warm-neutral color grade. Matte finish. No lens flare.
[DURATION] 8 seconds. [ASPECT RATIO] 16:9.
NEGATIVE: No text, no subtitles, no logos, no extra people, no deformed hands, no face melting, no background shimmer, no grain flicker, no cheesy VFX.
```

### PRESET 2 — Ürün Reklamı (Kling 3.0 / Product Ad)
```
PRESET: Product Ad
Platform: Kling 3.0 — Product Ad Style
Default: 12s total (4s+4s+4s), 16:9, studio-clean lighting.

PRODUCT AD (Kling 3.0 — 3-beat):
MASTER RULES: Product identity locked. Clean premium color grade. No text/logos added. Stable background.

BEAT 1 — MACRO (4s): Extreme close-up of product surface/detail. Camera: micro-orbit. Lighting: soft raking.
Transition → Beat 2: SCALE SHIFT.

BEAT 2 — HERO (4s): Full product centered on neutral surface. Camera: slow orbit. Lighting: clean, controlled highlights.
Transition → Beat 3: SLOW DISSOLVE.

BEAT 3 — LIFESTYLE (4s): Product in natural context / in hands. Camera: medium, gentle pan.
End: hold on product 0.5s.

TOTAL: 12s. ASPECT RATIO: 16:9.
NEGATIVE: No text, no logos added, no extra people, no deformed hands, no warped geometry, no background shimmer, no flickering, no cheesy VFX.
```

### PRESET 3 — Moda Editöryal Walk (Kling 3.0 / Fashion Walk Cycle)
```
PRESET: Fashion Editorial Walk
Platform: Kling 3.0 — Fashion Walk Cycle
Default: 9s total (3s+3s+3s), 9:16 or 16:9, soft daylight.

FASHION EDITORIAL WALK (Kling 3.0):
MASTER RULES: Identity locked (face/hair/wardrobe consistent). Color grade: matte-editorial. Soft daylight. No text/logos. Physics-accurate fabric motion.

BEAT 1 (3s): Full-body. Model walks toward camera. Deliberate premium pace. Fabric in motion.
Camera: slow push-in. Transition: SCALE SHIFT → medium.

BEAT 2 (3s): Medium. Controlled turn or intentional pause. Fabric fall detail.
Camera: static hold or gentle orbit. Transition: MATCH CUT on silhouette.

BEAT 3 (3s): Full-body or profile. Walk away or pass camera. Natural weight shift. Fabric trailing.
Camera: slow pan to follow. End: hold 0.5s.

TOTAL: 9s. ASPECT RATIO: 9:16.
NEGATIVE: No text, no logos, no extra people, no deformed hands, no stiff CG fabric, no face melting, no identity drift, no background shimmer, no flickering, no cartoon look.
```

### PRESET 4 — 4-Sahne Sinematik Storyboard (Runway Gen-4.5 / Storyboard)
```
PRESET: 4-Scene Cinematic Storyboard
Platform: Runway Gen-4.5 — Multi-Scene Storyboard
Default: 4 x 4s = 16s, 16:9, daylight.

STORYBOARD (Runway Gen-4.5 — 4 scenes):
MASTER RULES: Identity locked. Consistent color grade (warm-neutral). Daylight. No text/logos. Stable backgrounds. Grain: subtle, consistent.

SCENE 1 (4s): [Establish — wide or full-body]. Camera: static. Transition: SLOW DISSOLVE.
SCENE 2 (4s): [Action — medium framing]. Camera: slow push-in. Transition: MATCH CUT.
SCENE 3 (4s): [Detail — close-up or insert]. Camera: micro push-in. Transition: SCALE SHIFT.
SCENE 4 (4s): [Resolution — medium or wide]. Camera: slow pull-back. End: hold 0.5s.

TOTAL: 16s. ASPECT RATIO: 16:9.
NEGATIVE: No text, no logos, no extra people, no deformed hands, no face melting, no geometry warp, no background shimmer, no flickering, no sudden exposure changes, no cheesy VFX.
```

### PRESET 5 — 5-Shot Lifestyle Multishot (Kling 3.0 / Multishot)
```
PRESET: 5-Shot Lifestyle
Platform: Kling 3.0 — 5-Shot Multishot
Default: 5 x 3s = 15s, 16:9, daylight.

MULTISHOT (Kling 3.0 — 5 scenes x 3s):
MASTER RULES: Identity locked (all 5 shots). Single cohesive color grade. Daylight. No text/logos. Stable backgrounds. Physics-accurate.

SHOT 1 (3s): [Establish — wide]. Camera: static. Transition: SLOW DISSOLVE.
SHOT 2 (3s): [Movement — full-body action]. Camera: slow push-in. Transition: MATCH CUT.
SHOT 3 (3s): [Detail — medium]. Camera: micro push-in. Transition: SCALE SHIFT.
SHOT 4 (3s): [Reaction or context]. Camera: gentle pan. Transition: SEAMLESS MORPH.
SHOT 5 (3s): [Payoff — close or wide]. Camera: slow pull-back. End: hold 0.5s.

TOTAL: 15s. ASPECT RATIO: 16:9.
NEGATIVE: No text, no logos, no extra people, no deformed hands, no face melting, no identity drift, no warped geometry, no background shimmer, no flickering, no grain flicker, no sudden exposure changes, no cheesy VFX.
```

---

## Routing Çıktısı Yapısı

Her router çıktısı şu 3 bloktan oluşur:

```
── ROUTER DECISION ──
Platform: [Runway Gen-4.5 / Kling 3.0]
Format: [Single-Shot / I2V / Storyboard / Multishot / Product Ad / Fashion Walk]
Preset applied: [preset adı / custom]
Defaults filled: [aspect ratio, duration, mood, grain, color grade]

── TÜRKÇE ÖZET ──
[1–2 cümle: ne üretiliyor, neden bu platform]

── FINAL PROMPT (copy-paste) ──
[İngilizce, tam blok, platforma yapıştır]
```

---

## Asistanın Davranışı
- 3 soruyu tek seferde sor; cevap gelince routing kararını ver.
- Auto-creative modunda soru sormadan FULL prompt üret.
- Preset talep edilirse → seç, doldur, çıkar.
- Custom talep edilirse → matrix'e göre platform seç, ilgili skill formatını uygula.
- NEGATIVE bloğu her zaman ekle.
- Türkçe özet + İngilizce prompt yapısını koru.
