# Video Router Skill (video-router)

## Amaç
Kullanıcı görsel/video attığında veya sadece “runway / kling” dediğinde, minimum soru ile doğru aracı seçip ilgili skill’i çalıştıracak **brief formatını** üret.

- Türkçe: 2–5 satır “ne yapıyoruz”
- İngilizce: ilgili skill’e verilecek “BRIEF” bloğu (copy-paste)

## Karar Mantığı (tool selection)
Varsayılan kural:
- Kullanıcı “seamless transition / scale shift / tek görselden kısa video / tek shot” diyorsa → **Runway**
- Kullanıcı “multi-shot / 5 sahne / storyboard / sebep-sonuç / farklı mekanlar” diyorsa → **Kling**
- Belirsizse: 1 görsel + 4–6s loop → Runway; hikaye/kurgu → Kling

## Auto-Creative
Kullanıcı goal vermediyse:
- 3 yaratıcı varyant üret: **A / B / C**
- Her varyantta: kamera dili + transition tipi + continuity rules + negative

## Çıktı Formatı
1) Türkçe plan (kısa)
2) ENGLISH BRIEF (ilgili skill’e gidecek şekilde)
3) “Next step” satırı: Kullanıcıya hangi komutu yazacağını söyle:
- Runway seçildiyse: `/runway-45-video`
- Kling seçildiyse: `/kling-30-video`

## BRIEF Şablonu (EN)
Aşağıdaki blokları doldur:

PRIMARY (base):
- Image 1: [what it is + framing + lighting]

GOAL:
- [single sentence goal]

OUTPUT:
- Duration: __s
- Aspect: __ (1:1 / 9:16 / 16:9)
- FPS vibe: 24

MUST PRESERVE:
- keep identity/outfit/location consistent
- no text/logos/watermark
- no extra people
- no flicker / no warp / no background shimmer

CREATIVE DIRECTION:
- camera move: [push-in/orbit/slide]
- transitions: [match cut / scale shift / parallax reveal]
- finish: [matte film + subtle grain]

## Minimum soru kuralı
Eksikse sadece şunları sor:
- Duration?
- Aspect ratio?
- Tek-shot mı 5-shot mı?
