# Changelog

This file records the major development milestones for Jamnanji. The project follows semantic versioning while it is in early access: minor versions represent substantial playable milestones and patch versions represent fixes or smaller refinements.

## [0.8.0] — Build 0826 — 2026-08-26

### Expedition and progression

- Expanded Mechanics into three acts: Newton's Canopy, the Rotorwilds, and the Resonant Ascent.
- Added act-specific topics, floor counts, guardians, visual themes, story transitions, and boss encounters.
- Added three browser-based save slots with resumable maps, run state, decks, discoveries, and progression.
- Added a journey-selection screen that establishes Mechanics, Electricity, and Waves as the three Hidden Joule realms.
- Added cinematic prologue, act transition, victory, and defeat sequences featuring the Explorer and Mr Jamnani.

### Map generation and encounter balance

- Reworked procedural map generation around connected floors and multiple viable routes.
- Added encounters, hazards, mysteries, camps, merchants, treasure, ruins, elites, and act bosses.
- Added weighted landmark budgets and restrictions on consecutive elite, rest, and merchant locations.
- Added route-pressure tracking to reduce repeated high-danger chains.
- Added opening-floor variety so early routes do not collapse into one unfair sequence.
- Improved the distribution of recovery and reward opportunities without making every route identical.

### Questions and educational design

- Rewrote the question bank around scenario-first NCEA Level 3 mechanics reasoning.
- Expanded coverage across momentum, impulse, energy, work, centre of mass, relative velocity, rotational motion, rolling, circular motion, orbital motion, and simple harmonic motion.
- Added interpretation, linked-explanation, and extended-justification difficulty tiers.
- Replaced weak or context-dependent prompts with self-contained questions.
- Added plausible misconception chains as distractors.
- Added topic and act constraints while preserving random selection.
- Added per-run question history so an asked question cannot appear again during the same expedition.
- Shuffled answer order at draw time so the correct response is not fixed to one position.

### Cards and combat

- Introduced the playable card system in `site/cards.js`.
- Added Attack and Skill cards with energy costs, block, damage, multi-hit, draw, discard, and status interactions.
- Added starter-deck construction and tiered card reward pools.
- Added draw and discard piles, hand management, enemy targeting, energy, block, and end-turn resolution.
- Added enemy intent, grouped encounters, swarm and soldier formations, elites, and multi-act enemy pools.
- Added run-shaping field artefacts and major discoveries.

### Interface and accessibility

- Rebuilt the title screen around **Jamnanji: The Hidden Joules** and three jewel-shaped realm sigils.
- Added the visible release label `EARLY ACCESS · v0.8.0 · BUILD 0826`.
- Reworked the HUD so Stability, Supplies, and Insight are represented by heart, coin, and lightbulb icons with hover labels.
- Tightened HUD resource spacing and simplified notebook/settings hover behaviour.
- Added field notes, settings, save management, journey selection, encounter overlays, and a combat action queue.
- Disabled text selection, image dragging, copying, and context-menu interaction within the game presentation.
- Added keyboard navigation and focus handling to major menus and confirmation interfaces.

### Art and loading

- Replaced early silhouettes and vector placeholders with illustrated characters, enemies, maps, battles, locations, and cutscenes.
- Added dedicated artwork for the three acts, bosses, creature roster, landmarks, journeys, Mr Jamnani, and the Explorer.
- Added WebP versions of major raster assets and updated high-traffic screens to prefer them.
- Added preload hints for the title artwork and handwritten interface font.
- Added local artwork-manifest and optimisation tools to make asset replacement and compression repeatable.
- Added Netlify cache headers for versioned static assets while keeping HTML fresh.

### Wiki and publishing

- Added a separate Fandom-inspired Jamnanji Wiki.
- Added Main, Bestiary, Cards, Game Mechanics, Locations, Mr Jamnani, Strategy Guide, Community Feed, and Discussion Thread routes.
- Fixed article initialisation so every client-side route renders its full content.
- Added a persistent **Play Jamnanji** link from the wiki header to the live game.
- Deployed the game and wiki as separate Netlify projects.

## Earlier prototype milestones

### Initial playable prototype

- Established the Jamnanji jungle setting and core mechanics-question encounter loop.
- Added the first branching map, player Stability, supplies, simple enemies, and Mr Jamnani's guidance.
- Created the first playable static deployment.

### Early visual iteration

- Replaced the earliest player character artwork with silhouette-based placeholders while the final illustrated direction was developed.
- Established the dark jungle, parchment-card, gold, red, and desaturated green visual language used by the current game.

