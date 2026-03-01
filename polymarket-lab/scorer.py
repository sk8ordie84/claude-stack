"""
Market scoring and type classification.

Type thresholds (from config):
  yes_price < 0.20            → tail_or_high
  0.20 <= yes_price < 0.40   → lower_mid
  0.40 <= yes_price <= 0.70  → mid_range
  yes_price > 0.70            → tail_or_high  (tail_high)

Scoring formula weights mid-range probability, liquidity, and volume.
Spread is penalised. Output scores are in a ~0–15 range.
"""

import math

from config import TAIL_LOW_MAX, LOWER_MID_MAX, MID_RANGE_MAX


def classify_market_type(yes_price: float) -> str:
    if yes_price < TAIL_LOW_MAX or yes_price > MID_RANGE_MAX:
        return "tail_or_high"
    if yes_price < LOWER_MID_MAX:
        return "lower_mid"
    return "mid_range"


def score_market(market: dict) -> float:
    p = market["yes_price"]

    # Probability score: peaks at 0.5, falls to 0 at extremes
    prob_score = 7.0 * max(0.0, 1.0 - 4.0 * (p - 0.5) ** 2)

    # Liquidity score: log10-scaled, capped at 4.5
    liq_score = max(0.0, min(4.5, (math.log10(max(1, market["liquidity_usd"])) - 3.0) * 1.5))

    # Volume score: log10-scaled, capped at 3.0
    vol_score = max(0.0, min(3.0, math.log10(max(1, market["volume_24h_usd"])) - 2.5))

    # Spread penalty: wide spreads indicate thin real liquidity
    spread_penalty = market["spread"] * 10.0

    total = prob_score + liq_score + vol_score - spread_penalty
    return round(max(0.0, total), 1)


def rank_markets(markets: list) -> list:
    """Classify, score, and sort markets descending by score."""
    for m in markets:
        m["market_type"] = classify_market_type(m["yes_price"])
        m["score"] = score_market(m)
    return sorted(markets, key=lambda m: m["score"], reverse=True)
