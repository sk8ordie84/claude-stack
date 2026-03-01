"""
Paper trading engine with realistic exit logic.

Exit rules (applied in order at each simulation step):
  1. Take profit  → exit when PnL% >= +8%
  2. Stop loss    → exit when PnL% <= -6%
  3. Time exit    → exit after 24h (default holding window)

Costs modelled:
  - Slippage: 0.5% adverse on entry (we pay more than mid)
  - Entry fee: 1% of trade size (half of 2% round-trip)
  - Exit fee:  1% of gross proceeds

Price simulation:
  Bounded arithmetic random walk. Each 15-min step has a
  Gaussian shock scaled to 10% annualised daily volatility.
  Prices are clamped to [0.01, 0.99].
"""

import math
import random

from config import (
    DAILY_VOL,
    EXCLUDE_TAIL_OR_HIGH,
    FEE_RATE,
    HOLDING_WINDOW_HOURS,
    PRICE_STEPS_PER_HOUR,
    SLIPPAGE,
    STOP_LOSS,
    TAKE_PROFIT,
    TRADE_SIZE_USD,
)


def simulate_price_path(
    start_price: float,
    hours: int = HOLDING_WINDOW_HOURS,
    steps_per_hour: int = PRICE_STEPS_PER_HOUR,
    daily_vol: float = DAILY_VOL,
) -> list[float]:
    """
    Simulate a bounded random walk for a prediction-market price.

    step_vol = daily_vol / sqrt(steps_per_hour * 24)
    Each step: price += price * Gauss(0, step_vol)
    Price stays in [0.01, 0.99].
    """
    total_steps = hours * steps_per_hour
    step_vol = daily_vol / math.sqrt(steps_per_hour * 24)

    path = [start_price]
    price = start_price
    for _ in range(total_steps):
        shock = random.gauss(0.0, step_vol)
        price = price + price * shock
        price = max(0.01, min(0.99, price))
        path.append(price)
    return path


def paper_trade(market: dict, trade_size: float = TRADE_SIZE_USD) -> dict:
    """
    Execute one simulated paper trade on a single market.

    Returns a result dict with entry/exit details and net PnL.
    """
    entry_mid = market["yes_price"]

    # ── Entry ──────────────────────────────────────────────────────────────────
    effective_entry = min(0.99, entry_mid + SLIPPAGE)   # pay slippage on top
    entry_fee = trade_size * (FEE_RATE / 2)             # 1% in
    capital_deployed = trade_size - entry_fee
    shares = capital_deployed / effective_entry

    # ── Simulate price path ────────────────────────────────────────────────────
    path = simulate_price_path(effective_entry)

    # ── Walk and check exit conditions ─────────────────────────────────────────
    exit_price = path[-1]
    exit_reason = "time"

    for price in path[1:]:
        pnl_pct = (price - effective_entry) / effective_entry
        if pnl_pct >= TAKE_PROFIT:
            exit_price = price
            exit_reason = "take_profit"
            break
        if pnl_pct <= STOP_LOSS:
            exit_price = price
            exit_reason = "stop_loss"
            break

    # ── Exit ───────────────────────────────────────────────────────────────────
    gross_proceeds = shares * exit_price
    exit_fee = gross_proceeds * (FEE_RATE / 2)          # 1% out
    total_fees = entry_fee + exit_fee
    slippage_cost = trade_size * SLIPPAGE
    net_pnl = gross_proceeds - exit_fee - trade_size

    return {
        "market": market["title"],
        "market_type": market["market_type"],
        "yes_price": market["yes_price"],
        "effective_entry": round(effective_entry, 4),
        "exit_price": round(exit_price, 4),
        "exit_reason": exit_reason,
        "shares": round(shares, 4),
        "gross_proceeds_usd": round(gross_proceeds, 4),
        "fees_usd": round(total_fees, 4),
        "slippage_usd": round(slippage_cost, 4),
        "net_pnl_usd": round(net_pnl, 4),
    }


def run_batch(
    markets: list,
    trade_size: float = TRADE_SIZE_USD,
    exclude_tail: bool = EXCLUDE_TAIL_OR_HIGH,
) -> tuple[list, list]:
    """
    Run paper trades across a list of markets.

    Args:
        markets:      list of market dicts (must have market_type set).
        trade_size:   USD notional per position.
        exclude_tail: if True, skip tail_or_high markets entirely.

    Returns:
        (results, skipped) — lists of result dicts and skipped market titles.
    """
    results: list = []
    skipped: list = []

    for market in markets:
        if exclude_tail and market["market_type"] == "tail_or_high":
            skipped.append(market["title"])
            continue
        result = paper_trade(market, trade_size=trade_size)
        results.append(result)

    return results, skipped
