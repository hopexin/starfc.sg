#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="assets/img/players"

if [[ ! -d "$ROOT_DIR" ]]; then
  echo "[ERROR] Directory not found: $ROOT_DIR"
  exit 1
fi

ok_count=0
skipped_count=0
missing_count=0
total_count=0

echo "Normalizing player photos under: $ROOT_DIR"

while IFS= read -r player_dir; do
  total_count=$((total_count + 1))
  player_id="$(basename "$player_dir")"
  profile_path="$player_dir/profile.jpg"

  if [[ -f "$profile_path" ]]; then
    echo "SKIPPED  $player_id  (profile.jpg already exists)"
    skipped_count=$((skipped_count + 1))
    continue
  fi

  latest_file=""
  latest_mtime=0

  while IFS= read -r photo_file; do
    file_name="$(basename "$photo_file")"
    if [[ "$file_name" == "profile.jpg" ]]; then
      continue
    fi

    mtime="$(stat -f %m "$photo_file")"
    if (( mtime > latest_mtime )); then
      latest_mtime="$mtime"
      latest_file="$photo_file"
    fi
  done < <(find "$player_dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) | sort)

  if [[ -n "$latest_file" ]]; then
    cp -f "$latest_file" "$profile_path"
    echo "OK       $player_id  <- $(basename "$latest_file")"
    ok_count=$((ok_count + 1))
  else
    echo "MISSING  $player_id  (no jpg/jpeg/png found)"
    missing_count=$((missing_count + 1))
  fi
done < <(find "$ROOT_DIR" -mindepth 1 -maxdepth 1 -type d | sort)

echo
echo "Summary:"
echo "  OK      : $ok_count"
echo "  Skipped : $skipped_count"
echo "  Missing : $missing_count"
echo "  Total   : $total_count"
