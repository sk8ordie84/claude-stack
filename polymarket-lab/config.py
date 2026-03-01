# ─── Market type classification ───────────────────────────────────────────────
# yes_price < TAIL_LOW_MAX          →  tail_or_high
# TAIL_LOW_MAX  <= p < LOWER_MID_MAX →  lower_mid
# LOWER_MID_MAX <= p <= MID_RANGE_MAX →  mid_range
# p > MID_RANGE_MAX                 →  tail_or_high  (tail_high)

TAIL_LOW_MAX   = 0.20
LOWER_MID_MAX  = 0.40
MID_RANGE_MAX  = 0.70

# ─── Paper trading ─────────────────────────────────────────────────────────────
HOLDING_WINDOW_HOURS  = 24      # default holding window
TAKE_PROFIT           = 0.08    # +8% → exit long
STOP_LOSS             = -0.06   # -6% → cut loss
FEE_RATE              = 0.02    # 2% round-trip (1% entry + 1% exit)
SLIPPAGE              = 0.005   # 0.5% adverse slippage on entry
TRADE_SIZE_USD        = 100     # notional per position

# ─── Price simulation ──────────────────────────────────────────────────────────
DAILY_VOL             = 0.10    # 10% daily price volatility
PRICE_STEPS_PER_HOUR  = 4       # 15-minute intervals

# ─── Filtering ─────────────────────────────────────────────────────────────────
EXCLUDE_TAIL_OR_HIGH  = True    # drop tail_or_high from filtered batch
MAX_PER_FAMILY        = 1       # max one market per event family in shortlist
SHORTLIST_TARGET      = 27      # desired shortlist size
