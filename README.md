# Jamnanji: The Hidden Joules

An NCEA Level 3 mechanics revision game presented as a jungle roguelike deckbuilder. Players navigate a branching expedition, answer physics questions, build a deck, manage Stability, and recover the Hidden Joule of Mechanics.

> Current release: **Early Access v0.9.0 — Build 0830**

## Play and explore

- [Play Jamnanji on Netlify](https://jamnanji.netlify.app)
- [Read the Jamnanji Wiki](https://jamnanjiwiki.netlify.app)

Netlify is the canonical deployment platform for both sites. GitHub stores the source code and development history.

## What the game includes

### Physics-first question design

- Scenario-based written-theory questions mapped to NCEA Level 3 Physics AS91524.
- Three difficulty levels, progressing from relevant relationships to linked explanations and comprehensive justification.
- No numerical-substitution drills in the playable draw pool; questions focus on explaining, comparing, interpreting, and proving relationships symbolically.
- Coverage of momentum and impulse, energy and work, centre of mass, relative velocity, rotational motion, rolling, circular motion, orbital motion, and simple harmonic motion.
- Plausible misconception-based distractors rather than arbitrary wrong answers.
- Questions are shuffled and tracked during a run so previously asked questions are not repeated.

### Roguelike expedition structure

- Three mechanics acts: **Newton's Canopy**, **The Rotorwilds**, and **The Resonant Ascent**.
- Branching maps with encounters, hazards, mysteries, rests, merchants, treasure, ruins, elites, and bosses.
- Constrained map generation that limits punishing location chains and improves access to recovery opportunities.
- Three save slots backed by browser local storage.
- Persistent run state, map progress, deck state, discoveries, and settings.

### Deckbuilding combat

- Playable Attack, Skill, and tactical cards with energy costs.
- Draw and discard piles, enemy targeting, block, status effects, and card rewards.
- Starter decks plus unlockable cards and run-shaping discoveries.
- Enemy groups drawn from jungle creatures with physics-themed behaviour.

### Presentation and worldbuilding

- Illustrated title, map, encounter, battle, cutscene, character, enemy, and location artwork.
- Responsive HUD using heart, coin, and insight symbols with explanatory hover labels.
- Field notes, settings, journey selection, story sequences, and victory/defeat scenes.
- A separate Fandom-inspired wiki containing game, bestiary, card, mechanics, location, character, strategy, and community pages.

## Project structure

```text
Jamnanji/
├── site/                 # Playable game deployed to jamnanji.netlify.app
│   ├── index.html        # Game entry point
│   ├── script.js         # Expedition, map, encounters, combat, saves and UI
│   ├── questions.js      # Act structure and mechanics question bank
│   ├── cards.js          # Card definitions, starter deck and reward pools
│   └── assets/           # Fonts, characters, enemies and environments
├── wiki/                 # Separate wiki deployed to jamnanjiwiki.netlify.app
├── tools/                # Local artwork preparation and optimisation tools
├── server.js             # Dependency-free local static server
├── netlify.toml          # Main game deployment configuration
└── CHANGELOG.md          # Versioned development record
```

## Running locally

The game is deliberately dependency-free. It only requires Node.js to run the included static server.

```bash
node server.js
```

Then open [http://127.0.0.1:4173](http://127.0.0.1:4173).

The server publishes `site/` with caching disabled, making gameplay and styling changes visible after a refresh.

## Validation

The JavaScript files can be syntax-checked without installing packages:

```bash
node --check site/questions.js
node --check site/cards.js
node --check site/script.js
```

Before a release, the production game is also checked for successful loading, visible release metadata, and browser console errors.

## Deployment

The main game and wiki are separate Netlify sites:

| Project | Source directory | Production URL |
| --- | --- | --- |
| Jamnanji game | `site/` | <https://jamnanji.netlify.app> |
| Jamnanji Wiki | `wiki/` | <https://jamnanjiwiki.netlify.app> |

The game currently displays `EARLY ACCESS · v0.9.0 · BUILD 0830` on its landing screen. Patch releases should advance the semantic version (`v0.9.1`, `v0.9.2`), while date-based builds identify the deployed development snapshot.

## Development approach

Jamnanji has been built iteratively from a small mechanics prototype into a more complete educational roguelike. The major stages were:

1. Establish the jungle expedition and mechanics-question loop.
2. Rewrite the question bank around sophisticated NCEA Level 3 reasoning.
3. Prevent repeated questions and randomise appropriate selections within act/topic constraints.
4. Introduce deckbuilding combat and a broader set of playable cards.
5. Rebalance procedural maps using constrained location distribution and pressure-chain limits.
6. Expand the game to three acts, richer encounters, saves, discoveries, and interface panels.
7. Replace placeholder artwork with a consistent illustrated asset set and WebP delivery.
8. Create and separately deploy the Jamnanji Wiki.
9. Add visible semantic version and build metadata for public releases.

See [CHANGELOG.md](CHANGELOG.md) for the release-level record.
See [docs/NCEA-MECHANICS-COVERAGE.md](docs/NCEA-MECHANICS-COVERAGE.md) for the question-bank curriculum audit.

## Status

Jamnanji is an early-access educational project. The Mechanics journey is playable; Electricity and Waves are represented in the world but remain sealed for future development.
