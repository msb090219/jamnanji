// Sources: CHANGELOG.md, git history, and dated development sessions.
// Add future entries at the top. Undated work is not assigned a release date.
const GAME_UPDATES = [
  { date: '2026-09-04', label: '4 September 2026', title: 'Updates, in the game', items: [
    'Added this development history below Settings, replacing the unused Expedition log.'
  ] },
  { date: '2026-09-03', label: '3 September 2026', title: 'Menus and map readability', items: [
    'Field Notes and Settings close back to the current screen. Background controls are disabled while a panel is open.',
    'Pending battle questions wait until the menu closes.',
    'Fixed the invisible Electricity introduction that blocked map clicks and scrolling.',
    'Tightened the Electricity map key and kept its text inside the paper, with scrolling on shorter screens.'
  ] },
  { date: '2026-09-01', label: '1 September 2026', title: 'Lasting saves and cleaner battles', items: [
    'Save profiles survive failed and completed attempts, preserving attempt history and collected Joules until deletion.',
    'Added story selection within each save and progress towards collecting all three Hidden Joules.',
    'Only the selected save shows its Delete save action, with confirmation before deletion.',
    'Removed the end-of-exchange enemy-action summary strip.',
    'Removed map dragging in favour of scrolling and separated pulsing landmark artwork from stationary click targets.'
  ] },
  { date: null, label: 'Recent development · exact dates not recorded', title: 'Electricity and interface refinements', items: [
    'Built three Electricity acts with nine learning sections, dedicated encounters, elites, guardians, and noncombat locations.',
    'Added 147 original Electricity theory questions, teaching explanations, and circuit, transient, and phasor diagrams.',
    'Added Electricity story scenes, section introductions, and field-guide pages.',
    'Added an Electricity deck and Charged, Grounded, and Electrocuted combat effects.',
    'Enabled local Electricity playtesting without completing Mechanics first.',
    'Refined save-slot selection, health and block readouts, enemy targeting, resource icons, card readability, and cinematic skip controls.'
  ] },
  { date: '2026-08-31', label: '31 August 2026 · v0.9.1', title: 'Clearer questions and feedback', items: [
    'Reviewed all 135 Mechanics questions, balanced choices, and added teaching explanations.',
    'Feedback stays open until Continue and is preserved when a battle is saved and resumed.',
    'Exhausted question pools can be continued without penalties or repeated questions.'
  ] },
  { date: '2026-08-30', label: '30 August 2026 · v0.9.0', title: 'Mechanics theory overhaul', items: [
    'Rebuilt the playable bank around NCEA Level 3 translational, rotational, circular, and oscillating systems.',
    'Added a 46-question written-theory core and Achievement, Merit, and Excellence reasoning.',
    'Removed numerical-substitution tasks from playable draws while preserving symbolic reasoning and per-run repeat prevention.',
    'Extended the final Mechanics act and adjusted its map spacing.'
  ] },
  { date: '2026-08-27', label: '27 August 2026', title: 'The companion wiki', items: [
    'Added the standalone Jamnanji Wiki: bestiary, cards, locations, mechanics, strategy, community pages, and a link back to the game.'
  ] },
  { date: '2026-08-26', label: '26 August 2026 · v0.8.0', title: 'A three-act expedition', items: [
    'Expanded Mechanics into Newton’s Canopy, the Rotorwilds, and the Resonant Ascent, with distinct guardians and story transitions.',
    'Added three browser save slots and the three-realm journey-selection screen.',
    'Introduced deckbuilding combat: energy, attacks, skills, block, draw and discard piles, targeting, and enemy intent.',
    'Added camps, traders, hazards, mysteries, treasure, ruins, elites, artefacts, and discoveries along branching routes.',
    'Added illustrated characters, creatures, locations, and skippable cinematic sequences.',
    'Added Field Notes, Settings, keyboard navigation, and clearer Stability, Supplies, and Insight displays.'
  ] },
  { date: '2026-08-24', label: '24 August 2026', title: 'The first trail', items: [
    'Created the first playable jungle expedition: a branching map, physics-question encounters, Stability, Supplies, and Mr Jamnani’s guidance.'
  ] }
];
