# Video Prompt Fixer Skill (video-prompt-fixer)

---

## Bu Skill Ne İçin? (TR)
Bu skill, mevcut bir video promptunu alır, **sanity check** yapar ve geliştirilmiş, copy-paste hazır versiyonunu üretir.
Zayıf, eksik veya tutarsız promptları düzeltir. Platform (Runway / Kling) fark etmeksizin çalışır.
Neyin değiştiğini ve nedenini Türkçe açıklar — düzeltilmiş prompt her zaman İngilizce çıkar.

**Nerede kullanılır:** Elinde bir prompt var ama sonuç istediğin gibi çıkmıyorsa, ya da prompt'u üretmeden önce doğrulatmak istiyorsan.

---

## Kullanıcıdan İstenecek Bilgi

Sadece şunu iste:

1. **Mevcut prompt** (yapıştırsın)
2. **Platform** (Runway Gen-4.5 / Kling 3.0) — belirtilmemişse prompttan çıkar
3. **Şikayet / sorun** (opsiyonel: ör. "yüz bozuluyor", "kamera çok sallantılı", "geçişler kopuk")

---

## SANITY CHECK — 10 Madde

Gelen promptu şu 10 kritere karşı tara. Her madde için: ✅ OK / ⚠️ EKSİK / ❌ SORUNLU

```
SANITY CHECK REPORT:

[1] PLATFORM CLARITY     — Prompt hangi platform için yazılmış? Açık mı?
[2] SUBJECT IDENTITY     — Özne (insan/ürün) net tarif edilmiş mi? Identity lock var mı?
[3] ACTION CLARITY       — Aksiyon tek ve anlaşılır mı? Çok şey aynı anda oluyor mu?
[4] CAMERA LANGUAGE      — Kamera hareketi belirtilmiş mi? Gerçekçi mi?
[5] LIGHTING             — Işık tipi ve yönü belirtilmiş mi? Tutarlı mı?
[6] COLOR GRADE          — Renk paleti / grade var mı? Sahneler arası tutarlı mı?
[7] DURATION + RATIO     — Süre ve aspect ratio belirtilmiş mi?
[8] CONTINUITY RULES     — Multi-scene ise master rules var mı?
[9] TRANSITIONS          — Geçişler belirtilmiş mi? Gerçekçi ve sinematik mi?
[10] NEGATIVE PROMPT     — Negatif blok var mı? Yeterince kapsamlı mı?
```

---

## SORUN TANIMLAMA VE DÜZELTME KURALLARI

### Sık Karşılaşılan Sorunlar ve Çözümleri

| Sorun | Belirti | Düzeltme |
|---|---|---|
| **Kimlik kayması** | Yüz değişiyor, outfit değişiyor | Identity lock ekle: "face/hair/body locked" |
| **Kamera belirsiz** | "smooth camera" gibi vague tanım | Somut hareket: "very slow micro push-in, deliberate pace" |
| **Aşırı aksiyon** | Tek sahnede 4+ hareket | Aksiyonu tek cümleye indir |
| **Negatif eksik** | Prompt sadece pozitif | Full negative blok ekle |
| **Işık tutarsız** | Sahneler arası ışık tanımsız | "Consistent [daylight/ambient] throughout" ekle |
| **Abartılı VFX dili** | "explosion, dramatic, cinematic magic" | Temiz kamera diliyle değiştir |
| **Platform uyumsuz dil** | Kling'e Runway syntax, vice versa | Platform-uygun format'a çevir |
| **Süre/ratio eksik** | Duration veya aspect ratio yok | Default ekle: 8s / 16:9 |
| **Geçiş belirsiz** | "smooth transition" | Spesifik: MATCH CUT / SCALE SHIFT / SLOW DISSOLVE |
| **Grain/grade yok** | Look tamamen tanımsız | "Subtle film grain, warm-neutral grade, matte finish" ekle |

---

## ÇIKTI FORMATI

```
── SANITY CHECK ──
[1] Platform clarity:    ✅/⚠️/❌ [açıklama]
[2] Subject identity:    ✅/⚠️/❌ [açıklama]
[3] Action clarity:      ✅/⚠️/❌ [açıklama]
[4] Camera language:     ✅/⚠️/❌ [açıklama]
[5] Lighting:            ✅/⚠️/❌ [açıklama]
[6] Color grade:         ✅/⚠️/❌ [açıklama]
[7] Duration + ratio:    ✅/⚠️/❌ [açıklama]
[8] Continuity rules:    ✅/⚠️/❌ [açıklama]
[9] Transitions:         ✅/⚠️/❌ [açıklama]
[10] Negative prompt:    ✅/⚠️/❌ [açıklama]

── TÜRKÇE ÖZET ──
Kaç sorun bulundu ve en kritik olanlar neler.
Hangi değişiklikler yapıldı (1–5 madde, kısa).

── FIXED PROMPT (copy-paste) ──
[Düzeltilmiş, İngilizce, platform için hazır, tek blok]
```

---

## FIX ŞABLONLARI (Eklenecek Bloklar)

### Identity Lock (eksikse ekle)
```
IDENTITY LOCK: Face, hair, body proportions, outfit — consistent throughout. Do not drift between frames.
```

### Camera Fix (vague ise değiştir)
```
Camera: very slow micro push-in [or: static hold / gentle pan / slow pull-back / gentle orbit]. Speed: deliberate. No shaky cam, no sudden moves.
```

### Lighting Fix (eksikse ekle)
```
Lighting: [soft daylight / diffused ambient / golden hour]. Consistent throughout. Controlled contrast, no overblown highlights, no harsh shadows.
```

### Color Grade Fix (eksikse ekle)
```
Color grade: [warm-neutral / cool / desaturated / film-analog]. Matte finish. Consistent across all frames/scenes. No sudden color shifts.
```

### Transition Fix (vague ise değiştir)
```
Transition → [next scene]: [MATCH CUT on shape/color | SCALE SHIFT wide→close | SEAMLESS MORPH | SLOW DISSOLVE | PARALLAX REVEAL].
```

### Full Negative (eksikse ekle)
```
NEGATIVE: No text, no subtitles, no logos, no watermarks, no extra people, no deformed hands, no extra fingers, no face melting, no identity drift, no warped geometry, no background shimmer, no micro-jitter, no flickering, no grain flicker, no sudden exposure changes, no cheesy VFX, no lens flare, no cartoon look, no digital gloss.
```

### Master Continuity Rules (multi-scene ise, eksikse ekle)
```
MASTER CONTINUITY RULES:
- Identity locked across all scenes.
- Color grade: single cohesive palette, no shift between scenes.
- Lighting: consistent type and direction throughout.
- No text, no logos, no watermarks in any scene.
- Stable backgrounds — no shimmer, no flickering.
- Physics-accurate motion. No warped geometry.
```

---

## QUICK FIX MOD

Kullanıcı "sadece düzelt, açıklama istemiyorum" derse:
- Sanity check'i dahili yap (gösterme).
- Sadece FIXED PROMPT çıkar, copy-paste hazır.
- Türkçe özeti 1 cümleye indir: "[X] düzeltme yapıldı."

---

## Asistanın Davranışı
- Promptu oku, 10 maddeyi tara.
- Sanity check raporunu göster (kullanıcı "sadece düzelt" demediyse).
- Türkçe özetle nelerin değiştiğini açıkla.
- FIXED PROMPT'u İngilizce, copy-paste hazır, tek blok olarak ver.
- Orijinal promptun iyi olan kısımlarını koru — sadece sorunluları düzelt.
- Platform belirtilmemişse prompttan çıkar; hâlâ belirsizse Runway'i default al.
