#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
INBOX_DIR="$ROOT_DIR/player-photo-inbox"
DATA_FILE="$ROOT_DIR/assets/js/data.js"
PLAYER_DIR="$ROOT_DIR/assets/img/players"
OVERWRITE_MODE="${OVERWRITE:-0}"

if [[ ! -d "$INBOX_DIR" ]]; then
  echo "ERROR: inbox not found: $INBOX_DIR" >&2
  exit 1
fi

if [[ ! -f "$DATA_FILE" ]]; then
  echo "ERROR: data file not found: $DATA_FILE" >&2
  exit 1
fi

if [[ ! -d "$PLAYER_DIR" ]]; then
  echo "ERROR: players directory not found: $PLAYER_DIR" >&2
  exit 1
fi

TMP_ALIASES="$(mktemp)"
trap 'rm -f "$TMP_ALIASES"' EXIT

python3 - "$DATA_FILE" > "$TMP_ALIASES" <<'PY'
import re
import sys
from pathlib import Path

def norm(value):
    return re.sub(r'[^a-z0-9]+', '', value.lower())

text = Path(sys.argv[1]).read_text()
players = re.findall(r'\{"id":"([^"]+)","name":"([^"]+)"', text)
seen = set()
for player_id, name in players:
    aliases = {
        player_id,
        player_id.replace('-', ' '),
        name,
        name.replace(' ', '-'),
    }
    for alias in aliases:
        key = norm(alias)
        row = (key, player_id, name)
        if key and row not in seen:
            seen.add(row)
            print('\t'.join(row))
PY

normalize_key() {
  python3 - "$1" <<'PY'
import re
import sys
print(re.sub(r'[^a-z0-9]+', '', sys.argv[1].lower()))
PY
}

write_jpeg() {
  local src="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  if command -v sips >/dev/null 2>&1; then
    sips -s format jpeg "$src" --out "$dest" >/dev/null
  else
    echo "WARN: sips not found; copying without JPEG conversion: $src" >&2
    cp -f "$src" "$dest"
  fi
}

imported=0
skipped=0
unmatched=0
ambiguous=0
total=0

echo "Importing player photos from: player-photo-inbox/"
echo "Overwrite existing profile.jpg: $OVERWRITE_MODE"
echo

while IFS= read -r photo_file; do
  total=$((total + 1))
  file_name="$(basename "$photo_file")"
  stem="${file_name%.*}"
  key="$(normalize_key "$stem")"
  matches="$(awk -F '\t' -v key="$key" '$1 == key { print $2 "\t" $3 }' "$TMP_ALIASES" | sort -u)"
  match_count="$(printf '%s\n' "$matches" | sed '/^$/d' | cut -f1 | sort -u | wc -l | tr -d ' ')"

  if [[ "$match_count" -eq 0 ]]; then
    echo "UNMATCHED  $file_name"
    unmatched=$((unmatched + 1))
    continue
  fi

  if [[ "$match_count" -gt 1 ]]; then
    echo "AMBIGUOUS  $file_name"
    printf '%s\n' "$matches" | sed 's/^/           -> /'
    ambiguous=$((ambiguous + 1))
    continue
  fi

  player_id="$(printf '%s\n' "$matches" | sed -n '1p' | cut -f1)"
  player_name="$(printf '%s\n' "$matches" | sed -n '1p' | cut -f2-)"
  target="$PLAYER_DIR/$player_id/profile.jpg"

  if [[ -f "$target" && "$OVERWRITE_MODE" != "1" ]]; then
    echo "SKIPPED    $file_name -> $player_id ($player_name) profile.jpg already exists"
    skipped=$((skipped + 1))
    continue
  fi

  write_jpeg "$photo_file" "$target"
  echo "IMPORTED   $file_name -> assets/img/players/$player_id/profile.jpg ($player_name)"
  imported=$((imported + 1))
done < <(find "$INBOX_DIR" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort)

echo
echo "Summary: total=$total imported=$imported skipped=$skipped unmatched=$unmatched ambiguous=$ambiguous"
echo "Note: source files in player-photo-inbox/ were not deleted."
