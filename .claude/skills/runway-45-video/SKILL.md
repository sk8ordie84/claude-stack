# Runway 4.5 Video Prompt Skill (runway-45-video)

## Amaç
Bu skill, Runway (v4.5) için **copy-paste hazır** video promptları üretir.
Kullanıcıdan kısa bir brief alır, sonra:
- Image-to-Video (I2V) için tek prompt
- İstenirse shot-by-shot (sahne sahne) prompt planı
- Seamless transitions / scale-shift / match-cut gibi “show” geçişleri
- “Preserve / Do not change” kuralları ile görsel tutarlılık
çıktısı verir.

> Not: Konsept açıklamasını Türkçe anlat; asıl prompt metnini İngilizce yaz.

---

## Kullanıcıdan İstenecek Bilgi (Checklist)
Kullanıcıdan şu formatta bilgi iste:

1) **PRIMARY** (base / image or video reference)
- Hangi görsel/video base? (Image 1 / link / kısa tarif)
- Base’in kadrajı (close-up, medium, full body), kamera yüksekliği, kompozisyon

2) **REFERENCE** (opsiyonel)
- IDENTITY reference (yüz/saç/vücut)
- STYLE reference (grain, lens, color grade)
- OBJECT/PROP reference (eklenecek obje varsa)

3) **GOAL** (tek cümle)
- Ne değişecek / nasıl bir video hissi?
- “Scale shift + seamless transitions + show” gibi istekler

4) **PRESERVE (MUST NOT CHANGE)**
- Değişmeyecek şeyler: mekan, renk paleti, logo yok, yazı yok, kompozisyon sabit vs.

5) **OUTPUT SPECS**
- Süre: (ör. 5s / 8s / 12s)
- Aspect ratio: (1:1, 9:16, 16:9)
- FPS hissi (sinema, 24fps vibe)
- Stil: clean / filmic / grainy / matte

6) **HARD RULES**
- No text / no watermark / no extra people
- No anatomy glitches / no warped geometry
- Bright/daylight preference (kullanıcı istemedikçe gece yok)

---

## Çıktı Formatı (Runway 4.5)
### A) Tek “FINAL PROMPT” (I2V için)
- 1 paragraf İngilizce
- İçinde mutlaka:
  - Subject + environment + camera + motion + lighting + texture + transitions
  - Preserve listesi (do-not-change)
  - Negative constraints (no text/logos/extra people)

### B) Opsiyonel: “SHOT PLAN”
- 4–6 shot (her biri 1–2s)
- Her shot: camera move + subject action + transition type
- En sonda: “Master continuity rules”

---

## Master Prompt Template (FINAL)
Aşağıdaki iskeleti doldurup tek metin halinde ver:

**FINAL PROMPT (paste into Runway v4.5):**
[PRIMARY] Use the provided base image/video as the exact starting frame and keep the same composition, camera height, lens perspective, and overall color grade.
[LOOK] Cinematic, photoreal, clean but filmic texture, matte finish, controlled highlights, subtle film grain (as requested). Bright/daylight unless specified otherwise.
[MOTION] Create premium, smooth motion with intentional camera choreography: micro parallax + gentle push-in/pull-out + subtle handheld stability (very controlled), subject motion remains physically plausible.
[TRANSITIONS] Add “show” transitions: seamless match-cuts, scale-shifts (macro→wide or wide→macro), and fluid morph transitions that feel continuous and elegant. Transitions must be coherent (no random jump cuts).
[DETAIL] Preserve material realism: accurate shadows, correct reflections, consistent textures, no flicker. Keep backgrounds stable (no jittering).
[PRESERVE / DO NOT CHANGE] Do not change identity (unless instructed), do not change outfit (unless instructed), do not add text/logos/watermarks, do not add extra people, do not change location style, do not introduce new major objects, no warped geometry, no extra limbs.
[OUTPUT] Duration: __ seconds. Aspect ratio: __. Photoreal, high-quality motion, stable framing.

**NEGATIVE (if supported / as constraints):**
No text, no subtitles, no watermark, no logo, no extra people, no deformed hands, no face melting, no geometry warp, no background shimmer, no noisy flicker, no sudden exposure changes.

---

## Transition Library (kullan)
Kullanıcının isteğine göre şunlardan seç:
- **Scale shift**: extreme close-up → medium → wide (tek akışta)
- **Match cut**: aynı şekil/renk üzerinden kesintisiz geçiş
- **Seamless morph**: objenin formu akışkan dönüşür ama “aynı sahne” hissi korunur
- **Whip-pan** (çok kontrollü): hızlı pan ile sahne geçişi
- **Parallax reveal**: foreground hareket ederken arka plan açılır

---

## Sık Sorunlar ve Önlem
- Background jitter/flicker: “Keep background stable, no shimmer, no micro-jitter” ekle
- Aşırı stilizasyon: “photoreal, real lens, no cartoon look” ekle
- Kimlik kayması: “identity locked, facial features consistent” ekle
- Yazı çıkması: “no text of any kind” ekle

---

## Mini Örnek (kısa)
Kullanıcı: “Bu image’ı videolaştır, show transition, scale shift, seamless”
Çıktı: yukarıdaki FINAL PROMPT’u duration 6–8s, 1:1 veya 9:16 ile doldur.

---

## Asistanın Davranışı
- Konsepti Türkçe özetle
- FINAL PROMPT’u İngilizce ver
- Gereksiz soru sorma: kullanıcı info eksikse, sadece en kritik 2–3 şeyi sor (PRIMARY + GOAL + duration/aspect).
