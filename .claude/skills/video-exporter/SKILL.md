# video-exporter

Girdi: "Final master prompt" + (platform, duration, ratio, preset, negatives)
Çıktı: 3 format:

## A) RUNWAY (paste as prompt)
Tek blok İngilizce prompt + NEGATIVE.

## B) KLING (paste as prompt)
Tek blok İngilizce prompt + (multishot ise shot listesi) + NEGATIVE.

## C) UNIVERSAL JSON
{
  "platform": "...",
  "mode": "t2v|i2v",
  "duration_s": 6,
  "ratio": "1:1",
  "preset": "...",
  "camera_language": "...",
  "lighting": "...",
  "action": "...",
  "continuity_rules": ["..."],
  "negative": ["..."],
  "shots": [
    {"t": "0-3", "scene": "...", "camera": "...", "transition": "..."}
  ]
}

Kurallar:
- Final prompt İngilizce
- Negatif blok her zaman
- Varsayılan duration 6s, ratio 1:1
