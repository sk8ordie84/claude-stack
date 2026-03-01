"""
Mock market data.

KNOWN_MARKETS contains the named markets from the user's terminal output plus
a broad set of realistic additional markets. _generate_extra_markets() fills
the pool to TARGET_TOTAL so the shortlist logic always has enough diversity.
"""

import random

TARGET_TOTAL = 100

# fmt: off
KNOWN_MARKETS = [
    # ── Russia / Ukraine ──────────────────────────────────────────────────────
    {"title": "Russia-Ukraine Ceasefire before GTA VI?",               "yes_price": 0.565, "liquidity_usd": 85_000,  "volume_24h_usd": 12_000, "spread": 0.020, "family": "russia-ukraine", "category": "geopolitics"},
    {"title": "Will Russia capture Kostyantynivka by April 30?",        "yes_price": 0.530, "liquidity_usd": 42_000,  "volume_24h_usd":  8_500, "spread": 0.025, "family": "russia-ukraine", "category": "geopolitics"},
    {"title": "Ukraine election called by June 30, 2026?",              "yes_price": 0.230, "liquidity_usd": 31_000,  "volume_24h_usd":  5_000, "spread": 0.030, "family": "russia-ukraine", "category": "geopolitics"},
    {"title": "Will Ukraine retake Kherson region by end of 2026?",     "yes_price": 0.170, "liquidity_usd": 22_000,  "volume_24h_usd":  3_200, "spread": 0.040, "family": "russia-ukraine", "category": "geopolitics"},

    # ── UK Politics ───────────────────────────────────────────────────────────
    {"title": "Starmer out by June 30, 2026?",                          "yes_price": 0.500, "liquidity_usd": 78_000,  "volume_24h_usd": 11_000, "spread": 0.020, "family": "uk-politics",    "category": "politics"},
    {"title": "Will UK call snap election before 2027?",                "yes_price": 0.310, "liquidity_usd": 45_000,  "volume_24h_usd":  7_000, "spread": 0.030, "family": "uk-politics",    "category": "politics"},
    {"title": "UK CPI above 3% by Q3 2026?",                           "yes_price": 0.420, "liquidity_usd": 28_000,  "volume_24h_usd":  4_000, "spread": 0.035, "family": "uk-macro",       "category": "economics"},

    # ── Crypto ────────────────────────────────────────────────────────────────
    {"title": "MicroStrategy sells any Bitcoin by December 31, 2026?",  "yes_price": 0.145, "liquidity_usd": 95_000,  "volume_24h_usd": 18_000, "spread": 0.015, "family": "crypto-mstr",    "category": "crypto"},
    {"title": "Kraken IPO by December 31, 2026?",                       "yes_price": 0.160, "liquidity_usd": 52_000,  "volume_24h_usd":  8_900, "spread": 0.020, "family": "crypto-ipo",     "category": "crypto"},
    {"title": "Will Bitcoin reach $150k before June 2026?",             "yes_price": 0.380, "liquidity_usd": 320_000, "volume_24h_usd": 85_000, "spread": 0.010, "family": "crypto-btc",     "category": "crypto"},
    {"title": "Ethereum flips Bitcoin by market cap in 2026?",          "yes_price": 0.070, "liquidity_usd": 45_000,  "volume_24h_usd":  6_200, "spread": 0.025, "family": "crypto-eth",     "category": "crypto"},
    {"title": "Will Bitcoin close above $200k in 2026?",                "yes_price": 0.180, "liquidity_usd": 145_000, "volume_24h_usd": 31_000, "spread": 0.012, "family": "crypto-btc",     "category": "crypto"},

    # ── Football / World Cup ──────────────────────────────────────────────────
    {"title": "Will Italy qualify for the 2026 FIFA World Cup?",        "yes_price": 0.720, "liquidity_usd": 38_000,  "volume_24h_usd":  5_500, "spread": 0.030, "family": "football-wc",    "category": "sports"},
    {"title": "Will Brazil win the 2026 World Cup?",                    "yes_price": 0.150, "liquidity_usd": 120_000, "volume_24h_usd": 22_000, "spread": 0.015, "family": "football-wc",    "category": "sports"},
    {"title": "Will Argentina defend the World Cup?",                   "yes_price": 0.110, "liquidity_usd": 95_000,  "volume_24h_usd": 17_000, "spread": 0.018, "family": "football-wc",    "category": "sports"},
    {"title": "Will England win the 2026 World Cup?",                   "yes_price": 0.090, "liquidity_usd": 88_000,  "volume_24h_usd": 14_000, "spread": 0.020, "family": "football-wc",    "category": "sports"},

    # ── US Politics / Macro ───────────────────────────────────────────────────
    {"title": "Will Trump pardon Ross Ulbricht by April 2026?",         "yes_price": 0.550, "liquidity_usd": 65_000,  "volume_24h_usd":  9_500, "spread": 0.025, "family": "us-politics",    "category": "politics"},
    {"title": "US recession declared by end of 2026?",                  "yes_price": 0.340, "liquidity_usd": 88_000,  "volume_24h_usd": 14_000, "spread": 0.020, "family": "fed-macro",      "category": "economics"},
    {"title": "Fed rate cut in March 2026?",                            "yes_price": 0.280, "liquidity_usd": 145_000, "volume_24h_usd": 31_000, "spread": 0.012, "family": "fed-macro",      "category": "economics"},
    {"title": "Fed rate cut in May 2026?",                              "yes_price": 0.520, "liquidity_usd": 132_000, "volume_24h_usd": 28_000, "spread": 0.013, "family": "fed-macro",      "category": "economics"},
    {"title": "US CPI above 3.5% in Q1 2026?",                         "yes_price": 0.410, "liquidity_usd": 72_000,  "volume_24h_usd": 11_000, "spread": 0.022, "family": "us-inflation",   "category": "economics"},
    {"title": "Will Trump invoke national emergency on tariffs in 2026?","yes_price": 0.460, "liquidity_usd": 58_000,  "volume_24h_usd":  9_000, "spread": 0.025, "family": "us-politics",    "category": "politics"},

    # ── China / Taiwan ────────────────────────────────────────────────────────
    {"title": "China military exercises near Taiwan before June 2026?", "yes_price": 0.620, "liquidity_usd": 55_000,  "volume_24h_usd":  8_000, "spread": 0.030, "family": "china-taiwan",   "category": "geopolitics"},
    {"title": "Taiwan Strait incident before end of 2026?",             "yes_price": 0.250, "liquidity_usd": 38_000,  "volume_24h_usd":  5_200, "spread": 0.035, "family": "china-taiwan",   "category": "geopolitics"},

    # ── AI / Tech ─────────────────────────────────────────────────────────────
    {"title": "OpenAI IPO by end of 2026?",                             "yes_price": 0.440, "liquidity_usd": 92_000,  "volume_24h_usd": 15_000, "spread": 0.020, "family": "tech-openai",    "category": "tech"},
    {"title": "Anthropic raises $5B+ by end of 2026?",                  "yes_price": 0.580, "liquidity_usd": 35_000,  "volume_24h_usd":  4_800, "spread": 0.030, "family": "tech-anthropic", "category": "tech"},
    {"title": "GPT-5 released before July 2026?",                       "yes_price": 0.470, "liquidity_usd": 78_000,  "volume_24h_usd": 13_500, "spread": 0.022, "family": "ai-models",      "category": "tech"},
    {"title": "Google Gemini 2 Ultra outperforms GPT-5 on MMLU?",       "yes_price": 0.390, "liquidity_usd": 22_000,  "volume_24h_usd":  3_000, "spread": 0.040, "family": "ai-models",      "category": "tech"},
    {"title": "Will AGI be declared by any major lab before 2027?",     "yes_price": 0.120, "liquidity_usd": 62_000,  "volume_24h_usd":  8_800, "spread": 0.025, "family": "ai-agi",         "category": "tech"},

    # ── Middle East ───────────────────────────────────────────────────────────
    {"title": "Hamas-Israel permanent ceasefire before 2027?",          "yes_price": 0.310, "liquidity_usd": 68_000,  "volume_24h_usd": 10_500, "spread": 0.025, "family": "israel-hamas",   "category": "geopolitics"},
    {"title": "Iran nuclear deal signed in 2026?",                       "yes_price": 0.190, "liquidity_usd": 41_000,  "volume_24h_usd":  6_000, "spread": 0.030, "family": "iran",           "category": "geopolitics"},

    # ── North Korea ───────────────────────────────────────────────────────────
    {"title": "North Korea conducts nuclear test in 2026?",             "yes_price": 0.140, "liquidity_usd": 48_000,  "volume_24h_usd":  7_200, "spread": 0.025, "family": "north-korea",    "category": "geopolitics"},

    # ── Commodities / Markets ─────────────────────────────────────────────────
    {"title": "Gold above $3500 before July 2026?",                     "yes_price": 0.510, "liquidity_usd": 112_000, "volume_24h_usd": 19_000, "spread": 0.015, "family": "commodities",    "category": "economics"},
    {"title": "Oil above $100 by end of 2026?",                         "yes_price": 0.270, "liquidity_usd": 85_000,  "volume_24h_usd": 14_500, "spread": 0.018, "family": "commodities",    "category": "economics"},
    {"title": "S&P 500 above 6500 by Q2 2026?",                         "yes_price": 0.490, "liquidity_usd": 175_000, "volume_24h_usd": 38_000, "spread": 0.012, "family": "equity-us",      "category": "economics"},
    {"title": "NASDAQ enters bear market by end of 2026?",              "yes_price": 0.220, "liquidity_usd": 95_000,  "volume_24h_usd": 16_000, "spread": 0.018, "family": "equity-us",      "category": "economics"},

    # ── EU Politics ───────────────────────────────────────────────────────────
    {"title": "Macron resigns before end of 2026?",                     "yes_price": 0.130, "liquidity_usd": 35_000,  "volume_24h_usd":  4_500, "spread": 0.035, "family": "eu-france",      "category": "politics"},
    {"title": "Marine Le Pen banned from running for office?",          "yes_price": 0.550, "liquidity_usd": 42_000,  "volume_24h_usd":  6_800, "spread": 0.030, "family": "eu-france",      "category": "politics"},
    {"title": "Will Germany hold a new coalition government by July?",  "yes_price": 0.650, "liquidity_usd": 48_000,  "volume_24h_usd":  7_200, "spread": 0.028, "family": "eu-germany",     "category": "politics"},
    {"title": "AfD becomes largest party in Bundestag by 2027?",        "yes_price": 0.240, "liquidity_usd": 28_000,  "volume_24h_usd":  3_800, "spread": 0.038, "family": "eu-germany",     "category": "politics"},
    {"title": "Italy leaves the Euro by 2027?",                         "yes_price": 0.060, "liquidity_usd": 22_000,  "volume_24h_usd":  2_800, "spread": 0.040, "family": "eu-italy",       "category": "politics"},

    # ── Space ─────────────────────────────────────────────────────────────────
    {"title": "SpaceX Starship reaches orbit in 2026?",                 "yes_price": 0.720, "liquidity_usd": 65_000,  "volume_24h_usd":  9_500, "spread": 0.025, "family": "space-spacex",   "category": "tech"},
    {"title": "NASA Artemis Moon landing before 2027?",                  "yes_price": 0.180, "liquidity_usd": 38_000,  "volume_24h_usd":  5_200, "spread": 0.032, "family": "space-nasa",     "category": "tech"},

    # ── Biotech / Health ──────────────────────────────────────────────────────
    {"title": "FDA approves new Alzheimer drug in 2026?",               "yes_price": 0.450, "liquidity_usd": 55_000,  "volume_24h_usd":  8_000, "spread": 0.028, "family": "biotech-alzh",   "category": "tech"},
    {"title": "Major bird flu human outbreak declared in 2026?",        "yes_price": 0.200, "liquidity_usd": 72_000,  "volume_24h_usd": 10_500, "spread": 0.022, "family": "health-flu",     "category": "geopolitics"},

    # ── Social Media / Consumer Tech ──────────────────────────────────────────
    {"title": "TikTok banned in the US by June 2026?",                  "yes_price": 0.350, "liquidity_usd": 88_000,  "volume_24h_usd": 14_000, "spread": 0.020, "family": "social-tiktok",  "category": "tech"},
    {"title": "Elon Musk sells X (Twitter) by end of 2026?",            "yes_price": 0.090, "liquidity_usd": 52_000,  "volume_24h_usd":  7_500, "spread": 0.028, "family": "social-x",       "category": "tech"},
    {"title": "Apple releases AR glasses in 2026?",                     "yes_price": 0.260, "liquidity_usd": 72_000,  "volume_24h_usd": 11_000, "spread": 0.022, "family": "tech-apple",     "category": "tech"},

    # ── Climate / Energy ──────────────────────────────────────────────────────
    {"title": "2026 sets new global temperature record?",               "yes_price": 0.540, "liquidity_usd": 42_000,  "volume_24h_usd":  6_000, "spread": 0.030, "family": "climate",        "category": "geopolitics"},
    {"title": "US rejoins Paris Agreement fully in 2026?",              "yes_price": 0.120, "liquidity_usd": 28_000,  "volume_24h_usd":  3_500, "spread": 0.038, "family": "climate",        "category": "politics"},
]
# fmt: on


_EXTRA_FAMILIES = [
    "latam-brazil", "latam-mexico", "india-election", "india-econ",
    "africa-nigeria", "africa-ethiopia", "japan-politics", "korea-politics",
    "housing-us", "housing-uk", "ev-market", "streaming-media",
    "nba-2026", "nfl-2026", "tennis-2026", "formula1-2026",
    "quantum-compute", "nuclear-energy", "fintech-neobank", "defi-protocol",
    "asteroid-mining", "hypersonic-weapons", "drone-warfare", "cyber-attack",
    "pandemic-new", "antimicrobial-resistance", "water-crisis", "food-security",
    "us-debt-ceiling", "eu-recession", "china-property", "japan-boj",
    "real-estate-crash", "private-equity", "sovereign-default", "imf-bailout",
    "olympics-2028-host", "world-expo-2026", "chess-championship", "esports-2026",
    "metaverse-meta", "robotics-boston", "3d-printing", "autonomous-vehicle",
    "drug-policy-reform", "immigration-eu", "trade-war-us-eu", "g7-outcome",
]


def _generate_extra_markets(existing_count: int, target: int = TARGET_TOTAL, seed: int = 42) -> list:
    rng = random.Random(seed)
    extras = []
    needed = target - existing_count
    categories = ["politics", "economics", "sports", "tech", "geopolitics", "crypto"]

    for i in range(needed):
        family = _EXTRA_FAMILIES[i % len(_EXTRA_FAMILIES)]
        price = round(rng.uniform(0.08, 0.82), 3)
        liquidity = rng.randint(15_000, 250_000)
        volume = rng.randint(2_000, 45_000)
        spread = round(rng.uniform(0.010, 0.050), 3)
        extras.append(
            {
                "title": f"[{family.upper()}] outcome #{i + 1} by end of 2026?",
                "yes_price": price,
                "liquidity_usd": liquidity,
                "volume_24h_usd": volume,
                "spread": spread,
                "family": family,
                "category": rng.choice(categories),
            }
        )
    return extras


def get_all_markets() -> list:
    extras = _generate_extra_markets(len(KNOWN_MARKETS))
    return KNOWN_MARKETS + extras
