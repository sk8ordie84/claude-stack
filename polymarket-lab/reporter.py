"""
JSON output writer and type-performance summary tracker.

Saves three per-run files:
  logs/diverse_shortlist.json
  logs/paper_trade_batch_net.json
  logs/paper_trade_batch_filtered.json

Maintains a running cross-run log:
  logs/type_performance_log.json

The performance log accumulates aggregate stats for mid_range vs lower_mid
so the reviewer skill can compare them across repeated runs.
"""

import datetime
import json
import os
from collections import defaultdict

LOGS_DIR = os.path.join(os.path.dirname(__file__), "logs")


def _ensure_logs_dir() -> None:
    os.makedirs(LOGS_DIR, exist_ok=True)


def save_json(filename: str, data: dict) -> str:
    _ensure_logs_dir()
    path = os.path.join(LOGS_DIR, filename)
    with open(path, "w") as fh:
        json.dump(data, fh, indent=2)
    return path


def build_batch_summary(results: list, skipped: list | None = None) -> dict:
    """Aggregate a list of paper_trade results into a structured summary."""
    skipped = skipped or []
    total_net = sum(r["net_pnl_usd"] for r in results)
    avg_net = total_net / len(results) if results else 0.0

    by_type: dict[str, list[float]] = defaultdict(list)
    exit_counts: dict[str, int] = defaultdict(int)
    for r in results:
        by_type[r["market_type"]].append(r["net_pnl_usd"])
        exit_counts[r["exit_reason"]] += 1

    type_summary = {}
    for t, pnls in by_type.items():
        n = len(pnls)
        type_summary[t] = {
            "count": n,
            "total_net_pnl_usd": round(sum(pnls), 4),
            "avg_net_pnl_usd": round(sum(pnls) / n, 4),
            "win_rate": round(sum(1 for p in pnls if p > 0) / n, 3),
        }

    return {
        "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
        "markets_tested": len(results),
        "markets_skipped": len(skipped),
        "skipped_markets": skipped,
        "total_net_pnl_usd": round(total_net, 4),
        "average_net_pnl_usd": round(avg_net, 4),
        "exit_breakdown": dict(exit_counts),
        "type_summary": type_summary,
        "results": results,
    }


def update_type_performance_log(filtered_summary: dict) -> str:
    """
    Append this run's type-level stats to the running cross-run log.

    Computes aggregate comparison between mid_range and lower_mid
    across all logged runs. Returns the log file path.
    """
    _ensure_logs_dir()
    log_path = os.path.join(LOGS_DIR, "type_performance_log.json")

    if os.path.exists(log_path):
        with open(log_path) as fh:
            log = json.load(fh)
    else:
        log = {"runs": []}

    log["runs"].append(
        {
            "timestamp": filtered_summary["timestamp"],
            "markets_tested": filtered_summary["markets_tested"],
            "type_summary": filtered_summary["type_summary"],
        }
    )

    # ── Aggregate across all runs ──────────────────────────────────────────────
    all_mid: list[float] = []
    all_lower: list[float] = []

    for run in log["runs"]:
        ts = run["type_summary"]
        if "mid_range" in ts:
            all_mid.extend([ts["mid_range"]["avg_net_pnl_usd"]] * ts["mid_range"]["count"])
        if "lower_mid" in ts:
            all_lower.extend(
                [ts["lower_mid"]["avg_net_pnl_usd"]] * ts["lower_mid"]["count"]
            )

    def _agg(values: list[float]) -> dict:
        if not values:
            return {"n_samples": 0, "avg_net_pnl_usd": None, "win_rate": None}
        wins = sum(1 for v in values if v > 0)
        return {
            "n_samples": len(values),
            "avg_net_pnl_usd": round(sum(values) / len(values), 4),
            "win_rate": round(wins / len(values), 3),
        }

    log["aggregate_comparison"] = {
        "mid_range": _agg(all_mid),
        "lower_mid": _agg(all_lower),
        "note": (
            "Sample size is small until many runs are logged. "
            "Do not treat these averages as validated edge."
        ),
    }

    with open(log_path, "w") as fh:
        json.dump(log, fh, indent=2)

    return log_path


def print_batch_summary(summary: dict, label: str = "Batch") -> None:
    print(f"\n=== {label} ===")
    print(f"markets_tested: {summary['markets_tested']}")
    if summary["markets_skipped"]:
        print(f"markets_skipped: {summary['markets_skipped']}")
        for title in summary["skipped_markets"]:
            print(f"  - {title}")
    print(f"total_net_pnl_usd: {summary['total_net_pnl_usd']:.4f}")
    print(f"average_net_pnl_usd: {summary['average_net_pnl_usd']:.4f}")
    print(f"exit_breakdown: {summary['exit_breakdown']}")
    print("\nType summary:")
    for t, ts in summary["type_summary"].items():
        print(
            f"  {t}: count {ts['count']} | "
            f"total {ts['total_net_pnl_usd']:.4f} | "
            f"avg {ts['avg_net_pnl_usd']:.4f} | "
            f"win_rate {ts['win_rate']:.1%}"
        )
    print("\nResults:")
    for r in summary["results"]:
        print(
            f"  {r['market_type']:12s} | {r['market'][:55]:55s} | "
            f"net pnl: {r['net_pnl_usd']:.4f} | exit: {r['exit_reason']}"
        )
