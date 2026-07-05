#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DATA_FILE="$ROOT_DIR/data/players.js"
PLAYER_DIR="$ROOT_DIR/assets/img/players"

if [[ ! -f "$DATA_FILE" ]]; then
  echo "ERROR: players.js not found at $DATA_FILE" >&2
  exit 1
fi

if [[ ! -d "$PLAYER_DIR" ]]; then
  echo "ERROR: players directory not found at $PLAYER_DIR" >&2
  exit 1
fi

TMP_IDS="$(mktemp)"
TMP_DIRS="$(mktemp)"
trap 'rm -f "$TMP_IDS" "$TMP_DIRS"' EXIT

sed -n 's/.*"id"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$DATA_FILE" | sort -u > "$TMP_IDS"

if [[ ! -s "$TMP_IDS" ]]; then
  echo "ERROR: no player ids found in data/players.js" >&2
  exit 1
fi

find "$PLAYER_DIR" -mindepth 1 -maxdepth 1 -type d -print \
  | sed -E 's|.*/||' \
  | sort -u > "$TMP_DIRS"

total=0
present=0
missing=0

echo "=== STAR FC player profile validation ==="
echo "data:   $DATA_FILE"
echo "assets: $PLAYER_DIR"
echo

while IFS= read -r player_id; do
  [[ -z "$player_id" ]] && continue
  total=$((total + 1))
  expected="$PLAYER_DIR/$player_id/profile.jpg"
  if [[ -f "$expected" ]]; then
    present=$((present + 1))
    echo "OK       assets/img/players/$player_id/profile.jpg"
  else
    missing=$((missing + 1))
    echo "MISSING  assets/img/players/$player_id/profile.jpg"
  fi
done < "$TMP_IDS"

echo
echo "summary: total=$total present=$present missing=$missing"
echo

echo "extra player folders (not in data/players.js):"
extra_found=0
while IFS= read -r folder_id; do
  [[ -z "$folder_id" ]] && continue
  if ! grep -Fxq "$folder_id" "$TMP_IDS"; then
    echo "EXTRA    assets/img/players/$folder_id/"
    extra_found=1
  fi
done < "$TMP_DIRS"

if [[ "$extra_found" -eq 0 ]]; then
  echo "none"
fi
