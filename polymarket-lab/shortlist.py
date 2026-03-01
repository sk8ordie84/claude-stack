"""
Diverse shortlist builder with event-family deduplication.

Rule: at most MAX_PER_FAMILY markets from any single event family
can enter the shortlist. Markets are iterated in score order (highest
first), so only the best-scoring representative per family survives.
"""

from config import MAX_PER_FAMILY, SHORTLIST_TARGET


def build_diverse_shortlist(
    ranked_markets: list,
    target: int = SHORTLIST_TARGET,
    max_per_family: int = MAX_PER_FAMILY,
) -> list:
    """
    Select a diverse shortlist from pre-ranked markets.

    Args:
        ranked_markets: markets sorted descending by score.
        target:         maximum shortlist size.
        max_per_family: cap on markets from the same event family.

    Returns:
        List of selected markets, retaining original dict fields.
    """
    family_counts: dict[str, int] = {}
    shortlist: list = []

    for market in ranked_markets:
        if len(shortlist) >= target:
            break

        family = market.get("family", "unknown")
        count = family_counts.get(family, 0)

        if count >= max_per_family:
            continue  # family already at cap → skip

        family_counts[family] = count + 1
        shortlist.append(market)

    return shortlist
