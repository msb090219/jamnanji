"""Losslessly encode existing local fonts as WOFF2; retain TTF originals."""
from pathlib import Path
import sys
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / '.tools' / 'font-libs'))
from fontTools.ttLib import TTFont

fonts = Path(__file__).resolve().parents[1] / 'site' / 'assets' / 'fonts'
for source in fonts.glob('*.ttf'):
    font = TTFont(source)
    font.flavor = 'woff2'
    target = source.with_suffix('.woff2')
    font.save(target)
    print(f'{source.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes')
