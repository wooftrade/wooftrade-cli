#!/usr/bin/env bash
#
# Updates the version string across all skill files and package.json.
#
# Usage:
#   ./scripts/update-version.sh <new-version>
#
# Example:
#   ./scripts/update-version.sh 0.0.11
#
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <new-version>" >&2
  echo "Example: $0 0.0.11" >&2
  exit 1
fi

NEW_VERSION="$1"
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

# Read current version from package.json
CURRENT_VERSION=$(node -p "require('$ROOT_DIR/package.json').version")

if [[ "$CURRENT_VERSION" == "$NEW_VERSION" ]]; then
  echo "Version is already $NEW_VERSION — nothing to do."
  exit 0
fi

echo "Updating version: $CURRENT_VERSION → $NEW_VERSION"

# 1. Update package.json
cd "$ROOT_DIR"
npm pkg set version="$NEW_VERSION"
echo "  ✓ package.json"

# 2. Update all skill .md files
SKILL_DIR="$ROOT_DIR/skills/wooftrade"
if [[ -d "$SKILL_DIR" ]]; then
  for file in "$SKILL_DIR"/*.md; do
    if grep -q "wooftrade@$CURRENT_VERSION" "$file" 2>/dev/null || grep -q "version: $CURRENT_VERSION" "$file" 2>/dev/null; then
      sed -i "s/wooftrade@$CURRENT_VERSION/wooftrade@$NEW_VERSION/g" "$file"
      sed -i "s/version: $CURRENT_VERSION/version: $NEW_VERSION/g" "$file"
      echo "  ✓ $(basename "$file")"
    fi
  done
fi

# 3. Update agents.md
AGENTS_FILE="$ROOT_DIR/agents.md"
if [[ -f "$AGENTS_FILE" ]] && grep -q "wooftrade@$CURRENT_VERSION" "$AGENTS_FILE" 2>/dev/null; then
  sed -i "s/wooftrade@$CURRENT_VERSION/wooftrade@$NEW_VERSION/g" "$AGENTS_FILE"
  echo "  ✓ agents.md"
fi

# 4. Update README.md
README_FILE="$ROOT_DIR/README.md"
if [[ -f "$README_FILE" ]] && grep -q "wooftrade@$CURRENT_VERSION" "$README_FILE" 2>/dev/null; then
  sed -i "s/wooftrade@$CURRENT_VERSION/wooftrade@$NEW_VERSION/g" "$README_FILE"
  echo "  ✓ README.md"
fi

echo ""
echo "Done. Version updated to $NEW_VERSION across all files."
echo "Don't forget to run: yarn build"
