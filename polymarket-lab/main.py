#!/usr/bin/env python3
"""
Polymarket Lab — main runner.

Flow:
  1. Load 100 mock markets
  2. Score and rank them
  3. Build a diverse shortlist (max 1 per event family)
  4. Run raw paper-trade batch (all types, no filter)
  5. Run filtered batch (tail_or_high excluded by default)
  6. Save three JSON outputs
  7. Update the running type-performance log

Usage:
  python main.py              # random simulation each run
  python main.py --seed 42    # reproducible run
  python main.py --runs 5     # run 5 times and accumulate log
"""

import argparse
import os
import random
import sys

# Allow running from any working directory
sys.path.insert(0, os.path.dirname(__file__))

from config import EXCLUDE_TAIL_OR_HIGH, SHORTLIST_TARGET
from markets import get_all_markets
from paper_trader import run_batch
from reporter import (
    build_batch_summary,
    print_batch_summary,
    save_json,
    update_type_performance_log,
)
from scorer import rank_markets
from shortlist import build_diverse_shortlist


def run_once(seed: int | None = None) -> None:
    if seed is not None:
        random.seed(seed)

    print("\n=== Polymarket Lab ===\n")

    # ── 1. Load and rank ───────────────────────────────────────────────────────
    markets = get_all_markets()
    ranked = rank_markets(markets)
    print(f"Total markets: {len(markets)}")
    print(f"Ranked markets: {len(ranked)}")

    # ── 2. Diverse shortlist ───────────────────────────────────────────────────
    shortlist = build_diverse_shortlist(ranked, target=SHORTLIST_TARGET)
    print(f"Diverse shortlist: {len(shortlist)}")

    print("\nTop examples:")
    for m in shortlist[:5]:
        print(f"  - {m['title']} | yes {m['yes_price']} | score {m['score']}")

    save_json(
        "diverse_shortlist.json",
        {
            "total_markets": len(markets),
            "ranked_markets": len(ranked),
            "shortlist_size": len(shortlist),
            "shortlist": shortlist,
        },
    )

    # ── 3. Raw batch (no tail filter) ──────────────────────────────────────────
    raw_results, raw_skipped = run_batch(shortlist, exclude_tail=False)
    raw_summary = build_batch_summary(raw_results, raw_skipped)
    save_json("paper_trade_batch_net.json", raw_summary)
    print_batch_summary(raw_summary, label="BATCH NET SUMMARY")

    # ── 4. Filtered batch (tail_or_high excluded) ──────────────────────────────
    filtered_results, filtered_skipped = run_batch(shortlist, exclude_tail=EXCLUDE_TAIL_OR_HIGH)
    filtered_summary = build_batch_summary(filtered_results, filtered_skipped)
    save_json("paper_trade_batch_filtered.json", filtered_summary)
    print_batch_summary(filtered_summary, label="FILTERED BATCH SUMMARY")

    # ── 5. Update cross-run type performance log ───────────────────────────────
    log_path = update_type_performance_log(filtered_summary)
    print(f"\nType performance log updated: {log_path}")

    print("\nOutput files:")
    print("  polymarket-lab/logs/diverse_shortlist.json")
    print("  polymarket-lab/logs/paper_trade_batch_net.json")
    print("  polymarket-lab/logs/paper_trade_batch_filtered.json")
    print("  polymarket-lab/logs/type_performance_log.json")


def main() -> None:
    parser = argparse.ArgumentParser(description="Polymarket Lab runner")
    parser.add_argument(
        "--seed",
        type=int,
        default=None,
        help="Fix random seed for a reproducible single run",
    )
    parser.add_argument(
        "--runs",
        type=int,
        default=1,
        help="Number of simulation runs to execute (accumulates performance log)",
    )
    args = parser.parse_args()

    for i in range(args.runs):
        seed = args.seed if args.runs == 1 else (args.seed + i if args.seed else None)
        if args.runs > 1:
            print(f"\n{'─'*60}")
            print(f"RUN {i + 1} / {args.runs}")
        run_once(seed=seed)

    if args.runs > 1:
        print(f"\n{'─'*60}")
        print(f"Completed {args.runs} runs. Check type_performance_log.json for aggregate comparison.")


if __name__ == "__main__":
    main()
