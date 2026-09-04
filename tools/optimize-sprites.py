"""Resize/compress delivery sprites; preserve exact pre-optimization files outside site.

Run with Pillow. Repeated runs always read the backup, never recompress an output.
Canvas proportions and transparent margins are retained to preserve game scaling.
"""
from pathlib import Path
from io import BytesIO
import shutil
from PIL import Image

root = Path(__file__).resolve().parents[1]
assets = root / 'site' / 'assets'
backups = root / 'art-originals' / 'webp'
before = after = count = 0
for target in sorted(assets.glob('*.webp')):
    name = target.name
    if not any(name.startswith(prefix) for prefix in ('enemy-', 'electricity-enemy-', 'electricity-elite-', 'electricity-guardian-')):
        continue
    backup = backups / name
    source = backup if backup.exists() else target
    original_size = source.stat().st_size
    before += original_size
    with Image.open(source) as image:
        cap = 1200 if any(tag in name for tag in ('boss', 'guardian', 'elite', 'rhino', 'colossus', 'warden')) else 960
        image.thumbnail((cap, cap), Image.Resampling.LANCZOS)
        buffer = BytesIO()
        image.save(buffer, 'WEBP', quality=85, method=6, alpha_quality=100)
    result = buffer.getvalue()
    if len(result) < original_size:
        backups.mkdir(parents=True, exist_ok=True)
        if not backup.exists():
            shutil.copy2(target, backup)
        target.write_bytes(result)
        after += len(result)
        count += 1
    else:
        after += target.stat().st_size
print(f'{count} sprites optimized: {before:,} -> {after:,} bytes ({(1-after/before)*100:.1f}% smaller).')
print(f'Original delivery files preserved in {backups}')
