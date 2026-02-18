# Kling 3.0 Video Prompt Skill (kling-30-video)

---

## Bu Skill Ne İçin? (TR)
Bu skill, **Kling 3.0** platformuna yapıştırmaya hazır, copy-paste video promptları üretir.
Tek çekim, 5-shot çok sahneli, ürün reklamı ve moda editöryal olmak üzere 4 farklı format destekler.
Kimlik kilidi, kamera sürekliliği, ışık tutarlılığı ve sıkı negatif kurallar her çıktıda standart olarak gelir.
Türkçe brief al, İngilizce prompt üret.

**Nerede kullanılır:** Kling 3.0 arayüzü — prompt kutusuna yapıştır. I2V için görsel yükle, T2V için sadece metni kullan.

---

## Kullanıcıdan İstenecek Minimum Bilgi

Sadece şu 5 soruyu sor (hepsini tek seferde):

1. **Kaç shot / sahne?** (ör. single / 5-shot / özel sayı)
2. **Toplam süre ve sahne başına süre** (ör. 15s toplam / sahne başı 3s)
3. **Aspect ratio** (1:1 / 9:16 / 16:9)
4. **Referans görseller var mı?** (identity ref / style ref / product ref)
5. **Hareket tipi** (ör. yürüyüş, turn, product reveal, sakin editorial, aksiyon)

Ekstra soru sorma. Eksik bilgiyi mantıklı default ile doldur.

---

## Çıktı Yapısı

Kullanıcının isteğine göre uygun formatı seç:

- **[A] Single-Shot** — tek çekim, kısa ve güçlü
- **[B] 5-Shot Multishot** — 5 sahne x 3s, sinematik kurgu
- **[C] Product Ad Style** — ürün odaklı, macro→hero→lifestyle
- **[D] Fashion Editorial Walk Cycle** — moda editöryal yürüyüş döngüsü

Her formata **MASTER CONTINUITY RULES** ve **NEGATIVE** ekle.

---

## [A] SINGLE-SHOT PROMPT TEMPLATE

**Kullanım:** Kısa, güçlü tek çekim. T2V veya I2V.

```
SINGLE-SHOT (Kling 3.0 — paste as prompt):

MASTER RULES: Photoreal, real-lens look. Identity locked (face/hair/body consistent). Lighting: [daylight / soft ambient] — bright, controlled contrast, no night unless requested. No text, no logos, no watermarks, no extra people. Physics-accurate motion. No warped geometry. Stable background (no shimmer/flicker).

SCENE (__ s):
[Location]. [Framing: full-body / medium / close-up]. [Time of day / lighting].
Subject: [description — clothing, posture, look].
Action: [single, clear action in 1 sentence].
Camera: [static / micro push-in / slow pan / gentle orbit]. Speed: [very slow / deliberate].
Look: [cinematic / editorial-clean / analog-matte]. Grain: [none / subtle / medium]. Color grade: [warm-neutral / cool / desaturated].

ASPECT RATIO: __. DURATION: __ seconds.

NEGATIVE: No text, no subtitles, no logos, no watermarks, no extra people, no deformed hands, no extra fingers, no face melting, no warped geometry, no background shimmer, no flickering, no grain flicker, no sudden exposure changes, no cheesy VFX.
```

---

## [B] 5-SHOT MULTISHOT (3s each = 15s total)

**Kullanım:** 5 sahne, her biri 3 saniye, seamless kurgu. Fashion, lifestyle, heist, editorial için.

```
MULTISHOT (Kling 3.0 — 5 scenes x 3s):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASTER CONTINUITY RULES (apply to ALL scenes):
- Identity locked: face, hair, body proportions, outfit — consistent across all 5 shots.
- Color grade: single cohesive palette [warm-neutral / cool / desaturated] — no shift between scenes.
- Lighting: [daylight / soft ambient / golden hour] — consistent, bright, no sudden changes.
- No text, no subtitles, no logos, no watermarks in any scene.
- No extra people unless explicitly requested.
- Physics-accurate motion. No warped geometry. No extra limbs.
- Stable backgrounds — no shimmer, no micro-jitter, no flickering.
- Grain: [none / subtle / medium] — consistent and stable across all scenes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SHOT 1 (3s):
[Location]. [Framing: full-body]. [Action].
Camera: [static / slow push-in]. Lighting: [type].
Transition → Shot 2: [MATCH CUT / SCALE SHIFT / SEAMLESS MORPH / SLOW DISSOLVE].

SHOT 2 (3s):
[Location — same or new]. [Framing]. [Action].
Camera: [move]. Lighting: consistent.
Transition → Shot 3: [type].

SHOT 3 (3s):
[Location]. [Framing]. [Action].
Camera: [move]. Lighting: consistent.
Transition → Shot 4: [type].

SHOT 4 (3s):
[Location]. [Framing]. [Action].
Camera: [move]. Lighting: consistent.
Transition → Shot 5: [type].

SHOT 5 (3s):
[Location]. [Framing — push closer for impact]. [Final action / hold].
Camera: [slow pull-back / static hold]. Lighting: consistent.
End: hold final frame 0.5s. No hard cut.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: 15 seconds. ASPECT RATIO: __.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEGATIVE: No text, no subtitles, no logos, no watermarks, no extra people, no deformed hands, no extra fingers, no face melting, no identity drift, no warped geometry, no background shimmer, no flickering, no grain flicker, no sudden exposure changes, no cheesy VFX, no cartoon look.
```

---

## [C] PRODUCT AD STYLE

**Kullanım:** Ürün odaklı video. Macro detay → hero shot → lifestyle kontekst. Temiz, premium estetik.

```
PRODUCT AD (Kling 3.0 — 3-beat structure):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASTER CONTINUITY RULES:
- Product identity locked: shape, color, texture, branding consistent across all beats.
- Color grade: clean, premium [warm-neutral / cool / brand-matched]. Consistent.
- Lighting: controlled studio-like or natural daylight. No harsh shadows. Accurate reflections on glass/metal/surfaces.
- No text, no subtitles, no logos added (product's own design only).
- Physics-accurate. No warped geometry. Stable background.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEAT 1 — MACRO DETAIL (__ s):
Extreme close-up of [product detail: texture / material / logo / feature].
Camera: very slow push-in or micro-orbit. Lighting: [raking light / soft diffused].
Transition → Beat 2: SCALE SHIFT (macro→hero).

BEAT 2 — HERO SHOT (__ s):
[Product] centered on [surface/background]. Full product visible. Clean and crisp.
Camera: [slow orbit / static hold / gentle pull-back]. Lighting: [clean, highlights controlled].
Transition → Beat 3: SLOW DISSOLVE or MATCH CUT.

BEAT 3 — LIFESTYLE CONTEXT (__ s):
[Product] in use or displayed in [real environment / hands / lifestyle scene].
Camera: [medium framing / gentle pan]. Subject (if any): natural, unposed feel.
End: hold 0.5s on product.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: __ seconds. ASPECT RATIO: __.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEGATIVE: No text, no subtitles, no added logos, no extra people, no deformed hands, no warped geometry, no background shimmer, no flickering, no sudden exposure changes, no over-saturated colors, no lens flare, no cheesy VFX.
```

---

## [D] FASHION EDITORIAL WALK CYCLE

**Kullanım:** Moda editöryal — yürüyüş, dönüş, kumaş hareketi. Premium, sinematik his.

```
FASHION EDITORIAL WALK CYCLE (Kling 3.0):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASTER CONTINUITY RULES:
- Identity locked: face, hair, body proportions consistent. Wardrobe locked (outfit unchanged throughout).
- Color grade: editorial [warm-neutral / matte-cool / film-analog]. Consistent.
- Lighting: [soft daylight / diffused ambient / golden rim light]. No harsh shadows. No overblown highlights.
- No text, no subtitles, no logos, no watermarks.
- No extra people.
- Physics-accurate fabric drape — cloth must move naturally, no stiff CG look.
- Stable background — no shimmer, no flicker.
- Grain: [none / subtle / medium] — consistent.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

BEAT 1 — APPROACH WALK (__ s):
[Location]. Full-body framing. Model walks toward camera at a premium, deliberate pace.
Fabric in motion: [describe key garment movement — coat flowing / skirt swaying / sleeves trailing].
Camera: very slow push-in to meet subject. Lighting: [soft front / side].
Transition → Beat 2: SCALE SHIFT (full-body → medium).

BEAT 2 — TURN / PAUSE (__ s):
Medium framing. Model executes a slow, controlled turn or stops with intention.
Detail focus: [fabric fall / accessory / silhouette edge].
Camera: gentle orbit or static hold. Lighting: consistent.
Transition → Beat 3: MATCH CUT on posture or silhouette.

BEAT 3 — WALK AWAY / PROFILE (__ s):
Full-body or medium. Model walks away or passes camera in profile.
Fabric trailing. Natural weight shift visible.
Camera: [slow pan to follow / static let subject pass]. Lighting: consistent.
End: hold on empty frame or freeze silhouette 0.5s.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: __ seconds. ASPECT RATIO: __.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NEGATIVE: No text, no subtitles, no logos, no watermarks, no extra people, no deformed hands, no extra fingers, no stiff CG fabric, no face melting, no identity drift, no warped geometry, no background shimmer, no flickering, no grain flicker, no sudden exposure changes, no cartoon look.
```

---

## Strict Control Kuralları (Her Formatta Geçerli)

| Kural | Açıklama |
|---|---|
| **Identity lock** | Yüz, saç, vücut oranları tüm sahnelerde sabit |
| **Kamera sürekliliği** | Lens dili ve hız sahne değişimlerinde tutarlı |
| **Işık tutarlılığı** | Renk sıcaklığı ve yön tüm sahnelerde aynı |
| **No flicker** | Grain, exposure, arka plan — hiçbiri titremez |
| **No geometry warp** | Uzuv, yüz, arka plan geometrisi bozulmaz |
| **No subtitles/logos** | Hiçbir sahneye yazı veya marka eklenmez |

---

## Transition Library (seç ve yerleştir)

| Geçiş | Açıklama |
|---|---|
| **Match cut** | Aynı şekil/renk/pozisyon üzerinden kesintisiz |
| **Scale shift** | Macro → medium → wide (tek akışta) |
| **Seamless morph** | Form değişir ama sahne hissi korunur |
| **Slow dissolve** | Yumuşak cross-fade |
| **Parallax reveal** | Foreground hareket, arka plan açılır |
| **Whip-pan (controlled)** | Hızlı pan — dikkatli kullan, abartma |

---

## Asistanın Davranışı
- Konsepti Türkçe özetle (1–3 cümle).
- Kullanıcının isteğine göre [A] / [B] / [C] / [D] formatını seç.
- MASTER CONTINUITY RULES ve NEGATIVE her zaman ekle.
- Eksik bilgiyi mantıklı default ile doldur. Gereksiz soru sorma.
- FINAL PROMPT'u İngilizce, copy-paste hazır, tek blok olarak ver.
