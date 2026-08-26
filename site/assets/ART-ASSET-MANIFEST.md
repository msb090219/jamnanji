# Jamnanji Art Asset Manifest

This is the canonical production list for location, cutscene, and enemy artwork. Place every finished file in this directory using the exact filename shown below.

## Shared art direction

- Use grounded, painterly fantasy realism matching the existing Jamnanji character and jungle artwork. Avoid photorealism, cartoon rendering, pixel art, text, logos, and watermarks.
- Keep teal moonlight, warm gold highlights, weathered stone, brass machinery, dense foliage, and restrained red accents consistent across the set.
- Generate each distinct asset separately and inspect it before marking it complete.
- Never overwrite an approved asset while iterating. Use a versioned filename until the replacement is accepted, then promote it to the canonical filename.

### Landscape assets

- Applies to all `location-*.png` and `cutscene-*.png` files.
- PNG format with a complete opaque environment; transparency is not required.
- Landscape composition suitable for a full-width game viewport.
- No characters, captions, interface elements, borders, or baked-in gradients intended for UI text.
- Preserve useful foreground, middle-ground, and background separation for overlaying game elements.

### Enemy assets

- Applies to all `enemy-*.png` files.
- PNG format with genuine alpha transparency. The file must contain only the character or creature.
- No black, white, checkerboard, scenic, or coloured background; no ground plane or rectangular backing.
- Full figure with no cropped limbs, tails, wings, weapons, or effects.
- Portrait-oriented framing, subject centred, and sufficient transparent padding around the silhouette.
- Enemies face toward the player on the left. Standard player placement is left; enemy placement is right.
- Standard enemies are smallest, elites are larger, and bosses have the greatest visual presence.
- Bosses use stronger golden accents without becoming visually identical.
- Validate the alpha channel after export; visual checkerboard patterns do not count as transparency.

## Production workflow

1. Establish four approved reference assets: one landscape, one standard enemy, one elite, and one boss.
2. Lock their rendering style, lighting, perspective, palette, and framing.
3. Generate the remaining artwork in related batches of four to six.
4. Inspect composition and transparency after every generation.
5. Save approved outputs under their canonical filenames in this directory.
6. Wire enemy `art:` paths into the roster only after the corresponding canonical files exist.

If a generated preview contains a baked pale checkerboard, run `tools/remove-checkerboard.ps1` with Windows PowerShell. It removes pale, low-saturation background pixels connected to the canvas edge. For enclosed background islands, use `-GlobalBackground` only when the subject contains no pale details that could be removed. Always validate the alpha channel and composite the result over a dark background before approval.

Expected workload: 37 first-pass generations plus approximately 10–20 corrective generations.

## 1. Location backgrounds — 6

- [x] `location-hazard.png` — treacherous jungle terrain with rapids, bridge, and quicksand danger
- [x] `location-mystery.png` — shrine with golden numerals
- [x] `location-rest.png` — campfire camp with warding stones
- [x] `location-merchant.png` — trader's stall with ropes and pulleys
- [x] `location-treasure.png` — brass cache chest beneath roots
- [x] `location-ruins.png` — stone rings and golden sphere

## 2. Cutscene set-pieces — 6

- [x] `cutscene-parlor.png` — parlor with the board opening
- [x] `cutscene-deeper-canopy.png` — canopy closing in
- [x] `cutscene-rhino-clearing.png` — elite clearing
- [x] `cutscene-temple-doors.png` — temple facade with doors meeting at the centre
- [x] `cutscene-joule-chamber.png` — the Joule's chamber
- [x] `cutscene-mist-trail.png` — trail swallowed by mist

## 3. Battle enemies: Act I — 7 remaining

The baboon already exists as `enemy-baboon.png` and is not included in the 37-image total.

- [x] `enemy-frog.png` — Kinetic Dart Frog
- [x] `enemy-parrot.png` — Scalar Parrot
- [x] `enemy-sloth.png` — Inertia Sloth
- [x] `enemy-spider.png` — Pulley Spider
- [x] `enemy-viper.png` — Elastic Viper
- [x] `enemy-orangutan.png` — Pendulum Orangutan
- [x] `enemy-boar.png` — Friction Boar

## 4. Battle enemies: Act II — 6

- [x] `enemy-rotor.png` — Rotor Monkey
- [x] `enemy-falcon.png` — Gyro Falcon
- [x] `enemy-turtle.png` — Torque Turtle
- [x] `enemy-boulder.png` — Rolling Boulder
- [x] `enemy-beaver.png` — Angular Beaver
- [x] `enemy-flywheel.png` — Flywheel Lemur

## 5. Battle enemies: Act III — 6

- [x] `enemy-panther.png` — Centripetal Panther
- [x] `enemy-howler.png` — Resonance Howler
- [x] `enemy-owl.png` — Orbital Owl
- [x] `enemy-mosquito.png` — Damping Mosquito; designed to remain legible when three small instances appear together
- [x] `enemy-ape.png` — Harmonic Ape
- [x] `enemy-comet.png` — Comet Newt

## 6. Elites — 3

- [x] `enemy-rhino.png` — Momentum Rhino
- [x] `enemy-colossus.png` — Torque Colossus
- [x] `enemy-warden.png` — Resonance Warden

## 7. Bosses — 3

- [x] `enemy-boss-joule.png` — Joule Guardian, Act I
- [x] `enemy-boss-angular.png` — Angular Colossus, Act II
- [x] `enemy-boss-resonant.png` — Resonant Heart, Act III

## Totals

- Landscape backgrounds: 12
- Transparent enemy cutouts: 25
- New images: 37
- Existing baboon: 1, excluded from the new-image count
