#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / "index.html"
COVER_ROOT = ROOT / "assets" / "img" / "media" / "highlights"


def slugify(value: str) -> str:
    value = value.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def extract_videos() -> list[tuple[str, str, str]]:
    html = INDEX.read_text()
    pattern = re.compile(
        r"<h3[^>]*>\s*(\d{4}-\d{2}-\d{2})\s+vs\s+(.+?)\s*(?:\(Highlights\)|（比赛集锦）)\s*</h3>",
        re.S,
    )
    videos = []
    for date, opponent in pattern.findall(html):
        opponent = re.sub(r"<[^>]+>", "", opponent).strip()
        match_id = f"{date}-{slugify(opponent)}"
        videos.append((date, opponent, match_id))
    return videos


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate STAR FC media highlight cover files.")
    parser.add_argument("--create-dirs", action="store_true", help="Create expected cover directories with .gitkeep files.")
    args = parser.parse_args()

    if not INDEX.exists():
        raise SystemExit(f"ERROR: index.html not found: {INDEX}")

    videos = extract_videos()
    if not videos:
        raise SystemExit("ERROR: no highlight videos found in index.html")

    COVER_ROOT.mkdir(parents=True, exist_ok=True)
    ok = 0
    missing = 0

    print("=== STAR FC media cover validation ===")
    print(f"index:  {INDEX}")
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
