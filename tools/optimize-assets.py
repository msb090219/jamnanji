from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSET_DIRS = (ROOT / "site" / "assets", ROOT / "wiki" / "assets")


def convert(source: Path) -> tuple[int, int]:
    target = source.with_suffix(".webp")
    with Image.open(source) as image:
        image.save(
            target,
            "WEBP",
            quality=84,
            method=6,
            alpha_quality=92,
            exact=True,
        )
    return source.stat().st_size, target.stat().st_size


def main() -> None:
    original = optimized = count = 0
    for asset_dir in ASSET_DIRS:
        for source in sorted(asset_dir.glob("*.png")):
            before, after = convert(source)
            original += before
            optimized += after
            count += 1
    saved = 100 * (1 - optimized / original)
    print(f"Converted {count} images: {original / 1024**2:.1f} MB -> {optimized / 1024**2:.1f} MB ({saved:.1f}% smaller)")


if __name__ == "__main__":
    main()
