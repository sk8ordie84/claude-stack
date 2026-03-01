#!/usr/bin/env bash
set -e

cd "$(dirname "$0")/../.." || exit 1

echo "=== Skills audit starting ==="
python3 .claude/scripts/validate_skills.py || true
echo "=== Skills audit finished ==="
