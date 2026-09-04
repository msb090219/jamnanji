# Local asset performance pass — 4 September 2026

## Findings

- WebP artwork total before this pass: 32,306,488 bytes. This is the complete library, not a first-page download.
- Largest sprite: Coil Serpent, 685,914 bytes at 1536 × 1024.
- Title background is already WebP, 162,844 bytes, with a high-priority preload.
- Enemy cutouts, rather than the title background, are the first compression target.
- Encounter backgrounds were requested only after entering the encounter. This pass warms the next available locations from the map.
- The local Node server uses `Cache-Control: no-store`; its repeat-visit timings are not representative of production caching.

## Implemented

- `tools/optimize-sprites.py`: WebP delivery sprites resized to at most 960 pixels on their longest side, or 1200 for bosses/elites, quality 85. Canvas proportions and transparency retained; only smaller results are used.
- Exact original WebPs retained in ignored `art-originals/webp/`, outside `site`. PNG sources also remain untouched. Repeat optimisation reads original backups, not compressed results.
- Map prewarming: up to 12 unique candidate assets per map render, backgrounds first, two concurrent low-priority downloads. Only currently available choices are considered; no encounter RNG is consumed.
- Cutscene character poses warmed when that cutscene begins.
- Data-saver connections opt out. Failed warm requests cannot block navigation and can retry later.
- Existing scene fallback artwork remains. No new blocking loading screen was added in this pass.

## Verification and limitations

- Completed: 61 sprites reduced from 21,076,336 to 12,912,410 bytes (38.7% smaller; 8,163,926 bytes saved across the library). Every optimized image decoded successfully.
- Coil Serpent comparison: 685,914 to 332,802 bytes; side-by-side inspection on a dark background retained prominent electrical detail at display size.
- Automated checks cover warm-loader concurrency, duplicate suppression, failed requests and data-saver handling, plus existing save, routing, presentation and section tests.
- Compare compressed cutouts against originals composited on a dark background; transparent-image previews alone can display misleading edge artefacts.
- Browser tooling reconnected on 4 September. Fresh isolated contexts, local server, Fast 4G and 4× CPU slowdown: title before font conversion LCP 2,156 ms / load 2,628 ms / resource transfer 1,834,236 bytes; after WOFF2 LCP 1,896 ms / load 2,137 ms / resource transfer 1,220,385 bytes. These are single local samples, not hosted benchmarks or averages.
- Full-character-set WOFF2 fonts total 272,972 bytes versus 886,512 bytes for TTF. Originals remain untouched; deployment excludes TTF.
- The Pages build excludes PNG sources and TTF originals, produces a 25.22 MB artifact, and uses content-derived query versions for JS/CSS.
- Do not claim a percentage reduction in page load time from file-size savings alone.

## Before deployment

1. Test Mechanics and Electricity on a cold Fast/Slow 4G connection, including title, first battle, location and act transition.
2. Check sprites at maximum supported interface size; retain higher-resolution originals if any appear soft.
3. Decide whether remaining delays warrant a bounded, recoverable scene-loading indicator.
4. Publish only delivery files, excluding source PNGs and `art-originals`; add a reproducible GitHub Pages build and cache-busted asset names.
5. Check custom-domain asset paths, HTTPS and save export/import separately. No deployment or DNS changes were made in this pass.
