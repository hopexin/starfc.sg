#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MEDIA_DATA = ROOT / "data" / "media.js"
COVER_ROOT = ROOT / "assets" / "img" / "media" / "highlights"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def extract_videos() -> list[tuple[str, str, str]]:
    """Parse video entries from data/media.js (one JSON-style object per line)."""
    lines = [
        line for line in MEDIA_DATA.read_text().splitlines()
        if not line.lstrip().startswith("//")
    ]
    pattern = re.compile(
        r'"date"\s*:\s*"(\d{4}-\d{2}-\d{2})"\s*,\s*"opponent"\s*:\s*"([^"]+)"',
    )
    videos = []
    for date, opponent in pattern.findall("\n".join(lines)):
        match_id = f"{date}-{slugify(opponent)}"
        videos.append((date, opponent, match_id))
    return videos


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate STAR FC media highlight cover files.")
    parser.add_argument("--create-dirs", action="store_true", help="Create expected cover directories with .gitkeep files.")
    args = parser.parse_args()

    if not MEDIA_DATA.exists():
        raise SystemExit(f"ERROR: data/media.js not found: {MEDIA_DATA}")

    videos = extract_videos()
    if not videos:
        raise SystemExit("ERROR: no highlight videos found in data/media.js")

    COVER_ROOT.mkdir(parents=True, exist_ok=True)
    ok = 0
    missing = 0

    print("=== STAR FC media cover validation ===")
    print(f"data:   {MEDIA_DATA}")
    print(f"covers: {COVER_ROOT}")
    print()

    for date, opponent, match_id in videos:
        cover_dir = COVER_ROOT / match_id
        cover_file = cover_dir / "cover.jpg"
        if args.create_dirs:
            cover_dir.mkdir(parents=True, exist_ok=True)
            (cover_dir / ".gitkeep").touch(exist_ok=True)
        rel_cover = cover_file.relative_to(ROOT)
        if cover_file.exists():
            ok += 1
            print(f"OK       {date} vs {opponent} -> {rel_cover}")
        else:
            missing += 1
            print(f"MISSING  {date} vs {opponent} -> {rel_cover}")

    print()
    print(f"summary: total={len(videos)} present={ok} missing={missing}")
    if args.create_dirs:
        print("created/confirmed expected cover directories")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
