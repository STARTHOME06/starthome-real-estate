#!/usr/bin/env python3
"""Read-only inventory of GestionaleImmobiliare images; never deletes files."""
from __future__ import annotations

import argparse
import hashlib
import json
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "public" / "images" / "gestionale"
PROPERTIES = ROOT / "data" / "gi-properties.json"
PREFIX = "/images/gestionale/"


def inventory(image_dir: Path, properties_path: Path) -> dict:
    properties = json.loads(properties_path.read_text(encoding="utf-8"))
    if not isinstance(properties, list):
        raise ValueError("Expected a property list")
    referenced = set()
    for item in properties:
        for value in [item.get("image"), *(item.get("images") or []), *(item.get("floorplans") or [])]:
            if isinstance(value, str) and value.startswith(PREFIX):
                referenced.add(Path(value).name)

    files = sorted(p for p in image_dir.iterdir() if p.is_file() and p.name.startswith("gi-"))
    by_ext = defaultdict(lambda: {"count": 0, "bytes": 0})
    by_stem = defaultdict(list)
    by_hash = defaultdict(list)
    total_bytes = 0
    for path in files:
        size = path.stat().st_size
        ext = path.suffix.lower()
        by_ext[ext]["count"] += 1
        by_ext[ext]["bytes"] += size
        by_stem[path.stem].append(path.name)
        total_bytes += size
        digest = hashlib.sha256()
        with path.open("rb") as stream:
            for chunk in iter(lambda: stream.read(1024 * 1024), b""):
                digest.update(chunk)
        by_hash[digest.hexdigest()].append(path.name)

    existing = {p.name for p in files}
    return {
        "properties": len(properties),
        "images": len(files),
        "bytes": total_bytes,
        "mib": round(total_bytes / (1024 * 1024), 2),
        "formats": dict(sorted(by_ext.items())),
        "unreferenced": sorted(existing - referenced),
        "missing_references": sorted(referenced - existing),
        "same_stem_different_extension": [v for v in by_stem.values() if len(v) > 1],
        "identical_content": [v for v in by_hash.values() if len(v) > 1],
        "largest": [
            {"filename": p.name, "bytes": p.stat().st_size}
            for p in sorted(files, key=lambda p: p.stat().st_size, reverse=True)[:10]
        ],
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--images", type=Path, default=IMAGES)
    parser.add_argument("--properties", type=Path, default=PROPERTIES)
    args = parser.parse_args()
    print(json.dumps(inventory(args.images, args.properties), ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
