#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INDEX_FILE="$ROOT_DIR/index.html"
PLAYER_DIR="$ROOT_DIR/assets/img/players"

if [[ ! -f "$INDEX_FILE" ]]; then
  echo "ERROR: index.html not found at $INDEX_FILE" >&2
  exit 1
fi

if [[ ! -d "$PLAYER_DIR" ]]; then
  echo "ERROR: players directory not found at $PLAYER_DIR" >&2
  exit 1
fi

TMP_IDS="$(mktemp)"
TMP_JPG="$(mktemp)"
trap 'rm -f "$TMP_IDS" "$TMP_JPG"' EXIT

# Extract player ids from <script id="players-data"> JSON block.
awk '
  /<script type="application\/json" id="players-data">/ { in_block=1; next }
  /<\/script>/ { if (in_block) { in_block=0 } }
  in_block { print }
' "$INDEX_FILE" \
  | sed -n 's/.*"id":"\([^"]*\)".*/\1/p' \
  | sort -u > "$TMP_IDS"

if [[ ! -s "$TMP_IDS" ]]; then
  echo "ERROR: no player ids found in players-data block" >&2
  exit 1
fi

find "$PLAYER_DIR" -maxdepth 1 -type f -name '*.jpg' -print \
  | sed -E 's|.*/||; s|\.jpg$||' \
  | sort -u > "$TMP_JPG"

total=0
present=0
missing=0

echo "=== STAR FC player photo validation (.jpg) ==="
echo "index:  $INDEX_FILE"
echo "assets: $PLAYER_DIR"
echo

while IFS= read -r player_id; do
  [[ -z "$player_id" ]] && continue
  total=$((total + 1))
  expected="$PLAYER_DIR/$player_id.jpg"
  if [[ -f "$expected" ]]; then
    present=$((present + 1))
  else
    missing=$((missing + 1))
    echo "MISSING: assets/img/players/$player_id.jpg"
  fi
done < "$TMP_IDS"

echo
echo "summary: total=$total present=$present missing=$missing"
echo

echo "extra jpg files (not in players-data):"
extra_found=0
while IFS= read -r photo_id; do
  [[ -z "$photo_id" ]] && continue
  if ! grep -Fxq "$photo_id" "$TMP_IDS"; then
    echo "EXTRA: assets/img/players/$photo_id.jpg"
    extra_found=1
  fi
done < "$TMP_JPG"

if [[ "$extra_found" -eq 0 ]]; then
  echo "none"
fi
