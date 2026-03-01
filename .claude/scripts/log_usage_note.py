from pathlib import Path
from datetime import datetime
import sys

log_file = Path(".claude/logs/usage-log.md")
log_file.parent.mkdir(parents=True, exist_ok=True)

if len(sys.argv) < 6:
    print("Usage: python3 .claude/scripts/log_usage_note.py <skill> <task> <worked> <failed> <suggestion>")
    sys.exit(1)

skill = sys.argv[1]
task = sys.argv[2]
worked = sys.argv[3]
failed = sys.argv[4]
suggestion = sys.argv[5]

today = datetime.now().strftime("%Y-%m-%d")

entry = f"""
## {today}
- skill: {skill}
- task: {task}
- what worked: {worked}
- what failed: {failed}
- suggestion: {suggestion}
"""

with log_file.open("a", encoding="utf-8") as f:
    f.write(entry)

print("Usage note added.")