#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Verify Python 3 is available
if ! command -v python3 &>/dev/null; then
  echo "ERROR: python3 is not available" >&2
  exit 1
fi

echo "Python version: $(python3 --version)"

# Ensure skill scripts are executable
find "${CLAUDE_PROJECT_DIR}/.claude/skills" -name "*.py" -exec chmod +x {} \;
find "${CLAUDE_PROJECT_DIR}/.claude/skills" -name "*.sh" -exec chmod +x {} \;

echo "Session setup complete."
