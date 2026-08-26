const app = document.querySelector('#app');

const encounters = {
  beasts: {
    type: 'Enemy pack', title: 'The Vector Baboons',
    story: 'Branches crack overhead. Two armoured baboons drop onto the trail, each carrying a stolen pulley and absolutely no laboratory etiquette.',
    question: 'Which quantity is measured in newtons?', answers: ['Mass', 'Force', 'Energy'], correct: 1,
    win: 'The pack scatters and abandons its stolen supplies.', lose: 'The baboons convert your hesitation into kinetic discomfort.',
    reward: 24, damage: 7
  },
  vines: {
    type: 'Rapid danger', title: 'Vines of Variable Tension',
    story: 'The ravine opens beneath your feet. Three ancient vines snap taut above the mist. One will hold. The others have made no such promise.',
    question: 'Which quantity is measured in newtons?', answers: ['Mass', 'Force', 'Energy'], correct: 1,
    win: 'The vine holds. You swing clear as the bridge disappears into the gorge.',
    lose: 'You choose badly. The vine stretches, snaps, and introduces you to the cliff face.',
    reward: 18, damage: 12
  },
  idol: {
    type: 'Temple mechanism', title: 'The Inertia Idol',
    story: 'A stone guardian blocks the trail. Its eyes ignite as a boulder begins rolling from its open mouth.',
    question: 'A 4 kg boulder accelerates at 3 m/s². What resultant force acts on it?', answers: ['7 N', '12 N', '1.3 N'], correct: 1,
    win: 'The counterweight drops. The boulder veers aside and cracks open an offering chamber.',
    lose: 'Your counterweight is far too light. The boulder remains committed to its original plan.',
    reward: 25, damage: 15
  },
  river: {
    type: 'Hazard', title: 'The Impulse Rapids',
    story: 'The trail ends at a black river. A half-sunken raft knocks against the bank while something large turns beneath the surface.',
    question: 'Impulse is equal to force multiplied by what?', answers: ['Time', 'Mass', 'Distance'], correct: 0,
    win: 'You time the shove perfectly. The raft cuts across the current before the water can answer.',
    lose: 'The raft barely moves. The river, however, has plenty of momentum.',
    reward: 20, damage: 11
  },
  bridge: {
    type: 'Hazard', title: 'The Rotted Tension Bridge',
    story: 'The crossing sags between two dead trees. Half its vines have already snapped; the survivors hum with a tension you can hear.',
    question: 'Which force holds a hanging bridge up against gravity?', answers: ['Tension', 'Friction', 'Upthrust'], correct: 0,
    win: 'You load one vine at a time, like a well-labelled diagram. The bridge holds.',
    lose: 'You trust the wrong vine. It retires from structural service immediately.',
    reward: 22, damage: 10
  },
  quicksand: {
    type: 'Hazard', title: 'The Quicksand Sink',
    story: 'The trail ahead ripples in a way trails should not. Somewhere beneath the surface, pressure is doing mathematics you cannot see.',
    question: 'What does pressure equal?', answers: ['Force ÷ area', 'Force × area', 'Mass × velocity'], correct: 0,
    win: 'You spread your weight like a sensible physicist and paddle calmly to solid ground.',
    lose: 'You concentrate your enthusiasm on one foot. The sink accepts the offering.',
    reward: 18, damage: 13
  },
  hornets: {
    type: 'Hazard', title: 'The Hornet Swarm',
    story: 'A hanging nest detonates into the air. Two hundred small bodies vector straight toward you with deeply personal momentum.',
    question: 'A 0.002 kg hornet flies at 5 m/s. What is its momentum?', answers: ['0.01 kg·m/s', '2.5 kg·m/s', '0.0004 kg·m/s'], correct: 0,
    win: 'You calculate, duck, and let the swarm’s momentum carry it harmlessly past.',
    lose: 'You attempt to negotiate with several hundred newtons of hornet. It goes poorly.',
    reward: 20, damage: 12
  },
  scree: {
    type: 'Hazard', title: 'The Scree Slide',
    story: 'The slope of loose stone tilts at an unfriendly angle. Above you, the mountain is quietly deciding whether friction will be enough.',
    question: 'Which force stops objects sliding down a slope?', answers: ['Friction', 'Gravity', 'Magnetism'], correct: 0,
    win: 'You read the stones like graph paper and cross without waking the slope.',
    lose: 'Friction loses the argument. You ride the scree to the bottom, uninvited.',
    reward: 21, damage: 11
  },
  shrine: {
    type: 'Mystery', title: 'Shrine of Significant Figures',
    story: 'Golden numerals crawl across a weathered altar. A slot awaits an offering. Somewhere in the canopy, Jamnani clears his throat.',
    question: 'Round 12.786 to three significant figures.', answers: ['12.7', '12.8', '12.79'], correct: 1,
    win: 'The altar accepts your precision and releases a cache of expedition coins.',
    lose: 'The shrine rounds your remaining dignity down to zero.',
    reward: 30, damage: 8
  },
  rhino: {
    type: 'Elite threat', title: 'The Rhino of Significant Momentum',
    story: 'The jungle falls silent. Then the trees begin to move. A horn the size of a canoe cuts through the leaves and points directly at you.',
    question: 'A 500 kg rhino moves at 6 m/s. What is its momentum?', answers: ['3,000 kg·m/s', '506 kg·m/s', '83.3 kg·m/s'], correct: 0,
    win: 'You release the trap at precisely the right moment. The rhino changes direction. The laws of physics remain undefeated.',
    lose: 'Your calculation lacks momentum. The rhino does not.',
    reward: 45, damage: 22
  },
  ruins: {
    type: 'Ancient trial', title: 'The Conservation Ruins',
    story: 'Stone rings rotate around a suspended golden sphere. Each movement transfers energy deeper into the machine.',
    question: 'Which energy store increases when an object is lifted?', answers: ['Thermal', 'Gravitational potential', 'Kinetic'], correct: 1,
    win: 'The last ring locks into place. A hidden stairway grinds upward through the roots.',
    lose: 'Energy is conserved. Unfortunately, most of it is now transferred into the collapsing ceiling.',
    reward: 28, damage: 14
  },
  rest: {
    type: 'Safe clearing', title: 'The Counterforce Camp',
    story: 'A ring of old expedition stones holds back the jungle. For once, nothing is actively trying to accelerate you.',
    question: 'A stationary object with balanced forces is in what state?', answers: ['Equilibrium', 'Impulse', 'Free fall'], correct: 0,
    win: 'The answer settles the warding stones. You recover supplies before moving on.',
    lose: 'The clearing remains mostly safe. Mostly.', reward: 12, damage: 5
  },
  merchant: {
    type: 'Travelling merchant', title: 'The Newtonian Trader',
    story: 'A hooded trader unfolds a stall of ropes, pulleys and objects described as “approximately spherical.”',
    question: 'Which simple machine pivots around a fulcrum?', answers: ['Lever', 'Pulley', 'Inclined plane'], correct: 0,
    win: 'The trader approves your answer and offers a highly questionable discount.',
    lose: 'The trader quietly increases every price.', reward: 35, damage: 4
  },
  treasure: {
    type: 'Buried cache', title: 'The Kinetic Cache',
    story: 'A brass chest hums beneath a root system. Its lock is marked with a single moving arrow.',
    question: 'Which energy store does a moving object possess?', answers: ['Chemical', 'Elastic', 'Kinetic'], correct: 2,
    win: 'The lock spins open and the cache releases its supplies.',
    lose: 'The lock transfers its energy into a small but forceful explosion.', reward: 40, damage: 9
  },
  boss: {
    type: 'Guardian of the Joule', title: 'The Unstoppable Object',
    story: 'The temple doors split apart. An ancient stone beast charges down the final causeway while the Hidden Joule burns behind it.',
    question: 'To stop an object, its momentum must change. What is the rate of change of momentum equal to?', answers: ['Power', 'Resultant force', 'Kinetic energy'], correct: 1,
    win: 'The mechanism fires. The guardian stops one breath from you. A stair of turning gears grinds open — the Rotorwilds await.',
    lose: 'The guardian fulfils its title with unreasonable enthusiasm.',
    reward: 100, damage: 35
  },
  boss2: {
    type: 'Guardian of the Joule', title: 'The Angular Colossus',
    story: 'Beyond the canopy, the jungle turns on a great buried axle. A stone colossus grinds to face you, sweeping slow arcs through the trees.',
    question: 'The rotational analogue of force is…', answers: ['Torque', 'Momentum', 'Power'], correct: 0,
    win: 'The colossus seizes mid-swing. Its angular momentum drains into the axle, and the way up the Resonant Ascent opens.',
    lose: 'The colossus demonstrates torque using you as the lever arm.',
    reward: 120, damage: 38
  },
  boss3: {
    type: 'Guardian of the Joule', title: 'The Resonant Heart',
    story: 'At the temple summit, a crystal heart beats with the frequency of the jungle itself. Every step you take, it answers in resonance.',
    question: 'Resonance occurs when…', answers: ['driving frequency equals natural frequency', 'damping is removed', 'amplitude is zero'], correct: 0,
    win: 'Your final answer arrives exactly in phase. The heart rings once, then stills — and the Hidden Joule of Mechanics rises into your hands.',
    lose: 'Your answer arrives out of phase. The heart amplifies everything except your chances.',
    reward: 160, damage: 42
  }
};

const landmarkTypes = {
  encounter: { icon: '♣', label: 'Jungle encounter', encounter: 'beasts' },
  hazard: { icon: 'ϟ', label: 'Dangerous ground', encounter: 'river' },
  mystery: { icon: '?', label: 'Unknown landmark', encounter: 'shrine' },
  elite: { icon: '♜', label: 'Elite creature', encounter: 'rhino' },
  rest: { icon: '♨', label: 'Counterforce camp', encounter: 'rest' },
  merchant: { icon: '⚖', label: 'Newtonian trader', encounter: 'merchant' },
  treasure: { icon: '◆', label: 'Buried cache', encounter: 'treasure' },
  ruins: { icon: '⌬', label: 'Ancient mechanism', encounter: 'ruins' }
};

const mapIconPaths = {
  gate: '<path d="M12 2 4.2 20.5 12 17l7.8 3.5z"/><path class="map-icon-cut" d="M12 5v10"/>',
  encounter: '<path d="m5 3 3 3-1.8 1.8 10 10-2.4 2.4-10-10L2 12 1 5z"/><path d="m19 3-3 3 1.8 1.8-4.3 4.3 2.4 2.4 4.3-4.3L22 12l1-7z"/>',
  hazard: '<path d="M13.8 1.5 5.5 13h5.2l-1 9.5L18.8 10h-5.4z"/>',
  mystery: '<path d="M3 12c2.4-4.3 5.4-6.4 9-6.4s6.6 2.1 9 6.4c-2.4 4.3-5.4 6.4-9 6.4S5.4 16.3 3 12Z"/><circle class="map-icon-cut" cx="12" cy="12" r="3.1"/><circle cx="12" cy="12" r="1.1"/>',
  rest: '<path d="M7.1 21c-3.5-2.3-4.2-5.5-2-9.4.4 2 1.3 3 2.6 3.3-.5-4 1-8 4.5-11.9.1 3.8 1.1 6.2 3.1 7.4.6-1.4 1.6-2.5 3-3.4 1.8 3.1 2.1 6 .9 8.7-1.2 2.8-3.3 4.5-6.3 5.3 1.4-2.2 1.4-4.2 0-6.1-.7 1.8-1.8 3-3.2 3.7.1-1.8-.5-3.4-1.8-4.7.2 2.7-.1 5.1-.8 7.1Z"/>',
  merchant: '<path d="M10.2 3h3.6v3.2h4.8v2h-4.8V21h-3.6V8.2H5.4v-2h4.8z"/><path d="M2.2 10.2h6L5.2 16zM15.8 10.2h6l-3 5.8z"/>',
  treasure: '<path d="M3 10.2h18V21H3z"/><path d="M4.2 9.2c.5-4.1 3.1-6.2 7.8-6.2s7.3 2.1 7.8 6.2z"/><path class="map-icon-cut" d="M12 10.5v10M9.8 13.2h4.4"/>',
  elite: '<path d="M5.2 10.2 3.5 4.1l5 2.6L12 2l3.5 4.7 5-2.6-1.7 6.1z"/><path d="M5.4 10h13.2v6.5l-3 4H8.4l-3-4z"/><circle class="map-icon-cut" cx="9" cy="14.4" r="1.2"/><circle class="map-icon-cut" cx="15" cy="14.4" r="1.2"/><path class="map-icon-cut" d="m10 18 2-1.5 2 1.5"/>',
  ruins: '<path d="M3 7 12 2l9 5v3H3zM5 11h4v8H5zM15 11h4v8h-4zM2 20h20v2H2z"/><path class="map-icon-cut" d="m11 10 2 3-2 2 2 3"/>',
  joule: '<path d="M4 8 12 2l8 6v2H4zM5 19h14v3H5zM6.5 11h3v7h-3zM14.5 11h3v7h-3z"/><path class="map-icon-cut" d="m12.7 7.5-2.3 3.7h2.1l-1.2 3.5 3-4.6h-2.1z"/>'
};

function mapIcon(kind) {
  return `<svg class="map-landmark-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${mapIconPaths[kind] || mapIconPaths.mystery}</svg>`;
}

// Every dangerous ground on a route tells its own tale; the draw is made once at
// map generation and persists with the node across save/resume.
const hazardTales = ['river', 'bridge', 'quicksand', 'hornets', 'scree'];
const journalKinds = ['hazard', 'mystery', 'rest', 'merchant', 'treasure', 'ruins'];
const locationAmbience = { hazard: ['embers'], mystery: ['equations'], rest: ['fireflies'], merchant: ['mist'], treasure: ['mist'], ruins: ['equations'] };
const modernAsset = path => path?.replace(/\.png$/, '.webp');
// `slot` art lights up when the file appears; until then the shared scene art stays.
const locationArt = {
  hazard: 'assets/location-hazard.png', mystery: 'assets/location-mystery.png', rest: 'assets/location-rest.png',
  merchant: 'assets/location-merchant.png', treasure: 'assets/location-treasure.png', ruins: 'assets/location-ruins.png'
};
Object.keys(locationArt).forEach(kind => { locationArt[kind] = modernAsset(locationArt[kind]); });

const hazardChallenges = {
  river: {
    prompt: 'The raft is being pulled downstream. Choose the shove that changes its momentum without turning it broadside.',
    choices: [
      ['Push hard across the current', 'A short, strong impulse toward the far bank'],
      ['Push gently upstream', 'Longer contact, but against the wrong vector'],
      ['Jump onto the stern', 'More mass; substantially less planning']
    ], correct: 0
  },
  bridge: {
    prompt: 'The bridge will take one controlled crossing. Choose how to load the surviving vines.',
    choices: [
      ['Move low and steadily', 'Keep the centre of mass stable and avoid sharp impulses'],
      ['Sprint across', 'Less time on the bridge; much greater dynamic loading'],
      ['Bounce-test every plank', 'A rigorous experiment with an unfortunate sample']
    ], correct: 0
  },
  quicksand: {
    prompt: 'The surface is failing beneath you. Choose how to reduce the pressure on it.',
    choices: [
      ['Spread out and crawl', 'Increase contact area while keeping movement smooth'],
      ['Stand perfectly upright', 'Concentrate the same force onto two small areas'],
      ['Jump repeatedly', 'Add impact forces to an already delicate system']
    ], correct: 0
  },
  hornets: {
    prompt: 'The swarm is committed to its flight path. Choose the movement that lets its momentum carry it past.',
    choices: [
      ['Drop sideways at the last moment', 'Change position after the swarm commits'],
      ['Run directly away', 'Remain on the swarm’s line for longer'],
      ['Wave both arms', 'Increase your effective target area']
    ], correct: 0
  },
  scree: {
    prompt: 'Loose stones are near the limit of static friction. Choose the crossing that disturbs them least.',
    choices: [
      ['Short steps across the contour', 'Reduce downhill forcing and sudden load changes'],
      ['Charge straight upward', 'Maximum disturbance, impressive confidence'],
      ['Slide down on purpose', 'Convert the problem into a faster problem']
    ], correct: 0
  }
};

const ruinStages = [
  { title: 'Set the counterweight', prompt: 'The outer ring leans toward the heavy side.', choices: ['Move the mass inward', 'Move the mass farther out', 'Remove the axle'], correct: 0 },
  { title: 'Transfer the motion', prompt: 'The second ring must turn opposite the first.', choices: ['Mesh the two gears', 'Join them with a rigid bar', 'Increase both radii'], correct: 0 },
  { title: 'Release the sphere', prompt: 'The mechanism is aligned. Choose the final input.', choices: ['Apply a smooth impulse', 'Strike it repeatedly', 'Lock every moving part'], correct: 0 }
];
const battleArt = ['assets/battle-act-1.webp', 'assets/battle-act-2.webp', 'assets/battle-act-3.webp'];
const locationQuips = {
  hazard: [
    { line: 'Note the hazard. Now avoid becoming part of its data.', pose: 'warning' },
    { line: 'Statistically, this is the part of the expedition where dignity becomes optional.', pose: 'neutral' },
    { line: 'I once lost a clipboard here. The jungle kept it. Consider that a warning.', pose: 'disappointed' }
  ],
  mystery: [
    { line: 'The shrine grades on significant figures. So, incidentally, do I.', pose: 'neutral' },
    { line: 'Offer wisely. Shrines have strong opinions about precision.', pose: 'warning' }
  ],
  rest: [
    { line: 'Rest is not weakness. It is conservation of energy, applied personally.', pose: 'neutral' },
    { line: 'Even objects at rest deserve their equilibrium. Sit. Briefly.', pose: 'disappointed' }
  ],
  merchant: [
    { line: 'Do not barter with tension in your voice. He notices these things.', pose: 'warning' },
    { line: 'His prices are elastic. Your patience should not be.', pose: 'neutral' }
  ],
  treasure: [
    { line: 'Stored energy, waiting for a release mechanism. Rather like an exam.', pose: 'neutral' },
    { line: 'The cache does not care about your curiosity. Only your technique.', pose: 'warning' }
  ],
  ruins: [
    { line: 'Ancient engineers always showed their working. So should you.', pose: 'neutral' },
    { line: 'Every fallen ring was once somebody’s miscalculation.', pose: 'disappointed' }
  ]
};

let nodes = [];

let state;
let cutsceneTimer;
let selectedJourney = 'mechanics';
const preferenceDefaults = { textSpeed: 16, reducedMotion: false, interfaceSize: 100 };
let preferences = loadPreferences();
const SAVE_KEY = 'jamnanji-save-slots-v1';
let currentSaveSlot = Number(localStorage.getItem('jamnanji-active-slot') || 0);

function loadPreferences() {
  try { return { ...preferenceDefaults, ...JSON.parse(localStorage.getItem('jamnanji-preferences') || '{}') }; }
  catch { return { ...preferenceDefaults }; }
}

function applyPreferences() {
  document.documentElement.style.fontSize = `${preferences.interfaceSize}%`;
  document.body.classList.toggle('reduce-motion', preferences.reducedMotion);
}

function savePreferences() {
  localStorage.setItem('jamnanji-preferences', JSON.stringify(preferences));
  applyPreferences();
}

function loadSaveSlots() {
  try {
    const saved = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (saved?.slots?.length === 3) return saved;
  } catch {}
  return { version: 1, slots: Array.from({ length: 3 }, (_, index) => ({ id: index, runs: 0, victories: 0, bestFloor: 0, run: null })) };
}

function writeSaveSlots(data) { localStorage.setItem(SAVE_KEY, JSON.stringify(data)); }

function saveRun() {
  if (currentSaveSlot < 0 || !state || !nodes.length) return;
  const data = loadSaveSlots();
  const slot = data.slots[currentSaveSlot];
  const currentFloor = nodes.find(node => node.id === state.current)?.floor || 0;
  slot.bestFloor = Math.max(slot.bestFloor || 0, currentFloor);
  slot.run = { state, nodes, journey: selectedJourney, savedAt: Date.now() };
  writeSaveSlots(data);
}

function clearSavedRun(won = false) {
  if (currentSaveSlot < 0) return;
  const data = loadSaveSlots();
  const slot = data.slots[currentSaveSlot];
  slot.run = null;
  if (won) slot.victories = (slot.victories || 0) + 1;
  writeSaveSlots(data);
}

function continueSavedRun(slotIndex) {
  const slot = loadSaveSlots().slots[slotIndex];
  if (!slot?.run) return;
  currentSaveSlot = slotIndex;
  localStorage.setItem('jamnanji-active-slot', String(slotIndex));
  selectedJourney = slot.run.journey || 'mechanics';
  nodes = slot.run.nodes;
  state = slot.run.state;
  if (!state.act) state.act = 1;         // saves from before the act system
  if (!state.asked) state.asked = {};
  if (!Array.isArray(state.deck) || !state.deck.length) state.deck = starterDeck(); // pre-card saves
  if (!Array.isArray(state.artifacts)) state.artifacts = [];
  if (!Array.isArray(state.discoveries)) state.discoveries = [];
  if (exposeOpeningLocationVariety(nodes, state)) saveRun();
  if (state.pendingCompletion) return finishEncounter();
  if (state.activeNode && state.encounter) startEncounter(state.activeNode, true);
  else renderMap();
}

function startNewRun(slotIndex) {
  const data = loadSaveSlots();
  currentSaveSlot = slotIndex;
  localStorage.setItem('jamnanji-active-slot', String(slotIndex));
  data.slots[slotIndex].run = null;
  data.slots[slotIndex].runs = (data.slots[slotIndex].runs || 0) + 1;
  writeSaveSlots(data);
  renderJourneySelect();
}

const journeys = [
  { id: 'mechanics', name: 'Mechanics', act: 'Newton’s Canopy', sigil: 'Φ', status: 'Available', available: true, description: 'A jungle of shifting paths, moving temples and creatures with deeply unreasonable momentum.', objective: 'Recover the Hidden Joule of Mechanics', focus: 'Forces · Motion · Momentum · Energy' },
  { id: 'electricity', name: 'Electricity', act: 'The Storm Circuit', sigil: 'ϟ', status: 'Sealed', available: false, description: 'A drowned kingdom where lightning travels through the ruins and every route completes a dangerous circuit.', objective: 'The Joule of Electricity remains sealed', focus: 'Current · Voltage · Resistance · Circuits' },
  { id: 'waves', name: 'Waves', act: 'The Resonant Depths', sigil: '≋', status: 'Sealed', available: false, description: 'An echoing realm of living frequencies, invisible signals and bridges that answer only to resonance.', objective: 'The Joule of Waves remains sealed', focus: 'Sound · Light · Frequency · Refraction' }
];

// Every scene lists its cast poses and fx cues explicitly. `slot` points at planned
// illustrated art; until that file exists the scene falls back to `background`.
const cutscenes = {
  prologue: {
    background: 'assets/jamnanji-menu-illustrated.png', slot: 'assets/cutscene-parlor.png',
    ambient: ['equations'], letterbox: true, studentFrom: 3,
    lines: [
      { speaker: 'Unknown voice', text: 'An object at rest remains at rest… until someone makes the extremely poor decision to touch it.' },
      { speaker: 'Narrator', text: 'The board splits open. Vines coil around your arms, the room falls away, and jungle drums begin somewhere beneath you.', fx: 'rum' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Good. You survived the transition.' },
      { speaker: 'You', pose: 'startled', text: 'Where am I?' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Jamnanji. A place governed by three ancient powers: Mechanics, Electricity, and Waves.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Here, the laws of physics are not merely equations. They are laws. And unlike certain students, the jungle follows them.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Long ago, three Hidden Joules kept this world in equilibrium. Then something disturbed the balance.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The Joules were taken, the paths began shifting, and the creatures became… mechanically unreasonable.', fx: 'shake' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The Joule of Mechanics was split into three fragments: linear, rotational and oscillatory. The first lies beyond Newton’s Canopy.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Every expedition creates a new route. Choose carefully. Once travelled, a path closes behind you.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Some landmarks offer supplies. Some offer rest. Others offer valuable educational experiences. Those are rarely comfortable.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The jungle will test quick decisions, calculations, units, explanations and—occasionally—common sense.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Correct answers earn supplies and open opportunities. Mistakes cost Stability. An answer changes more than a number here. It changes what happens next.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Defeat each guardian. Recover all three fragments. Reassemble the Hidden Joule.' },
      { speaker: 'You', pose: 'overwhelmed', text: 'Wait—aren’t you coming?' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Physically? No. But I will be observing, advising, and expressing disappointment whenever necessary.' },
      { speaker: 'Mr Jamnani', pose: 'disappointed', text: 'Remember: show your working, check your units, and never assume the monkeys are frictionless.', fx: 'flash', choices: true }
    ],
    choices: [
      { label: 'I’ll recover the Joule.', reply: 'Good. Confidence is useful. Correct units are better.' },
      { label: 'How dangerous can it be?', reply: 'That sentence has historically preceded several avoidable injuries.' },
      { label: 'What happens if I fail?', reply: 'Then you return wiser. Possibly flatter, but wiser.' },
      { label: 'Why are the monkeys frictionless?', reply: 'They are not. This has never stopped them from behaving as though they are.' }
    ],
    endLabel: 'Enter Newton’s Canopy'
  },
  midpoint: {
    background: 'assets/jamnanji-map-illustrated.png', slot: 'assets/cutscene-deeper-canopy.png',
    ambient: ['mist', 'fireflies'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The light changes. Above you, the canopy knits itself shut, and the birdsong acquires a professional edge.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'You are entering the deeper canopy. Most expeditions end here. Not dramatically — they simply become part of the statistics.' },
      { speaker: 'You', pose: 'overwhelmed', text: 'What’s different down here?' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Mass. Everything below this line has more of it. The jungle fields its heavier units now — creatures with genuine momentum.', fx: 'rum' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Should you meet the rhino, remember: you cannot outrun six metres per second. You can, however, out-think it.' },
      { speaker: 'Narrator', text: 'The trail steepens. The drums, helpfully, keep their original tempo.' }
    ],
    endLabel: 'Press on'
  },
  elite: {
    background: 'assets/jamnanji-encounter-illustrated.png', slot: 'assets/cutscene-rhino-clearing.png',
    ambient: ['mist', 'embers'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The rhino slows. Stops. Considers its options with the last of its momentum.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Well calculated. The rhino will be reconsidering its entire approach to problem-solving.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'You have just demonstrated conservation of momentum in a live field test. Fewer than half of my classes manage it on paper.' },
      { speaker: 'You', pose: 'determined', text: 'Is the temple close?' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Closer than it has ever been. It has been watching. So have I. One of us is prouder.' }
    ],
    endLabel: 'Return to the trail'
  },
  bossIntro: {
    background: 'assets/jamnanji-map-illustrated.png', slot: 'assets/cutscene-temple-doors.png',
    ambient: ['embers'], letterbox: true, studentFrom: 0, doors: true,
    lines: [
      { speaker: 'Narrator', text: 'The trail ends at a causeway of black stone. At its far end, temple doors taller than the trees begin — slowly — to open.', fx: 'doors' },
      { speaker: 'Narrator', text: 'Beyond them, something ancient shifts its weight.', fx: 'shake' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Everything you have learned converges on this causeway. Some of it literally.' },
      { speaker: 'You', pose: 'startled', text: 'It’s already moving—' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Every object can be stopped. Momentum can be changed. That is precisely what it fears about you.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Answer well. Answer quickly. And if it helps, imagine it marking your coursework.', fx: 'flash' }
    ],
    endLabel: 'Begin the trial'
  },
  victory: {
    background: 'assets/jamnanji-encounter-illustrated.png', slot: 'assets/cutscene-joule-chamber.png',
    ambient: ['embers', 'equations'], letterbox: true, studentFrom: 0, orb: true,
    lines: [
      { speaker: 'Narrator', text: 'The Resonant Heart falls silent. The two fragments in your pack answer the third with a single golden pulse.', fx: 'flash' },
      { speaker: 'Narrator', text: 'Linear motion, rotation and oscillation lock together. The complete Joule of Mechanics rises — small, golden, and quietly furious with energy.', fx: 'orb' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Take it. Mind the units.' },
      { speaker: 'You', pose: 'determined', text: 'That’s… it? We’re done?' },
      { speaker: 'Mr Jamnani', pose: 'disappointed', text: '“We”. Notable. Yes — this realm is balanced again. Your debt to it, however, is a longer document.' },
      { speaker: 'Narrator', text: 'Far away, lightning walks across a drowned kingdom.', fx: 'lightning' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'The Storm Circuit has noticed you. Do not congratulate yourself. Electricity grades harder than I do.' },
      { speaker: 'You', pose: 'neutral', text: 'Can I go home now?' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'The board will decide. It is very traditional. Show it your working.' }
    ],
    endLabel: 'Claim the Joule'
  },
  act2Arrival: {
    background: 'assets/battle-act-2.png', ambient: ['embers', 'equations'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The first guardian’s cradle opens. It contains not the whole Joule, but a golden fragment etched with a straight arrow.', fx: 'orb' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The Linear Fragment. One third of the Joule of Mechanics. Did you truly expect the syllabus to finish after one unit?' },
      { speaker: 'Narrator', text: 'The fragment turns in your hand. The jungle turns with it. Roots coil into axles and the path begins rotating beneath your feet.', fx: 'rum' },
      { speaker: 'You', pose: 'startled', text: 'Is the entire forest spinning?' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Only relative to you. Welcome to the Rotorwilds. Find your equilibrium before something finds it for you.' }
    ],
    endLabel: 'Enter the Rotorwilds'
  },
  midpoint2: {
    background: 'assets/battle-act-2.png', ambient: ['embers'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The trail narrows onto a buried flywheel. Every footstep sends the ruins turning in the opposite direction.', fx: 'shake' },
      { speaker: 'You', pose: 'overwhelmed', text: 'Nothing here stays still.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Angular momentum. Pull inward and you turn faster; reach outward and you slow. The forest has discovered figure skating and made it hostile.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Keep your mass close, watch the torque, and do not stand on anything labelled “counterweight”.' }
    ],
    endLabel: 'Cross the flywheel'
  },
  elite2: {
    background: 'assets/battle-act-2.png', ambient: ['mist', 'embers'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The Torque Colossus settles into the mud. The last gear in its shoulder completes one embarrassed revolution.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'A convincing application of torque. It had a longer lever arm. You had a better answer.' },
      { speaker: 'You', pose: 'determined', text: 'So I’m getting good at this?' },
      { speaker: 'Mr Jamnani', pose: 'disappointed', text: 'You are becoming less immediately alarming. Progress should be measured honestly.' }
    ],
    endLabel: 'Climb higher'
  },
  bossIntro2: {
    background: 'assets/battle-act-2.png', ambient: ['embers', 'equations'], letterbox: true, studentFrom: 0, doors: true,
    lines: [
      { speaker: 'Narrator', text: 'A circular gate rolls aside without slipping. Beyond it, the Angular Colossus wakes around a temple-sized axle.', fx: 'doors' },
      { speaker: 'You', pose: 'startled', text: 'That thing is part of the building.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'The building is part of that thing. Choose your reference frame carefully.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Torque changes angular momentum. Apply it where the guardian cannot ignore it. It’s the reality, boys.', fx: 'flash' }
    ],
    endLabel: 'Turn the mechanism'
  },
  act3Arrival: {
    background: 'assets/battle-act-3.png', ambient: ['fireflies', 'equations'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The Angular Colossus releases a second golden piece. Curved lines chase one another across its surface.', fx: 'orb' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The Rotational Fragment. Two of three. Linear motion and rotation are now in equilibrium—temporarily.' },
      { speaker: 'Narrator', text: 'A low note passes through the stone. The fragment in your hand vibrates, and a stair of suspended platforms rises into the clouds.', fx: 'rum' },
      { speaker: 'You', pose: 'overwhelmed', text: 'What is making that sound?' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'The Resonant Ascent. Try not to match its natural frequency accidentally.' }
    ],
    endLabel: 'Begin the ascent'
  },
  midpoint3: {
    background: 'assets/battle-act-3.png', ambient: ['mist', 'fireflies'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The bridges begin moving together: left, right, left—each swing larger than the last.', fx: 'shake' },
      { speaker: 'You', pose: 'startled', text: 'Why is it getting worse?' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'You are driving it at its natural frequency. Resonance: small pushes, catastrophic confidence.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Change your timing. Restore equilibrium. And stop stepping to the rhythm; this is physics, not choreography.' }
    ],
    endLabel: 'Break the rhythm'
  },
  elite3: {
    background: 'assets/battle-act-3.png', ambient: ['fireflies', 'equations'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The Resonance Warden’s armour rings once, then damps into silence.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Good. You removed energy from the oscillation faster than it could replace it.' },
      { speaker: 'You', pose: 'determined', text: 'The final fragment is close.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'So is the final guardian. One of those facts should encourage you. Decide which.' }
    ],
    endLabel: 'Approach the summit'
  },
  bossIntro3: {
    background: 'assets/battle-act-3.png', ambient: ['fireflies', 'equations'], letterbox: true, studentFrom: 0, doors: true,
    lines: [
      { speaker: 'Narrator', text: 'At the summit, the temple has no doors. It opens and closes by breathing. A crystal heart hangs at its centre.', fx: 'doors' },
      { speaker: 'Narrator', text: 'Your two fragments rise from your pack and orbit one another in time with the heartbeat.', fx: 'rum' },
      { speaker: 'You', pose: 'determined', text: 'One more fragment.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'One more demonstration. Frequency, phase, damping—bring the system to equilibrium.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'Then perhaps the universe will accept your conclusion. It’s the reality, boys.', fx: 'flash' }
    ],
    endLabel: 'Face the Resonant Heart'
  },
  defeat: {
    background: 'assets/jamnanji-menu-illustrated.png', slot: 'assets/cutscene-mist-trail.png',
    ambient: ['mist'], letterbox: true, studentFrom: 0,
    lines: [
      { speaker: 'Narrator', text: 'The canopy closes over the trail like a textbook shutting.' },
      { speaker: 'Mr Jamnani', pose: 'disappointed', text: 'Stability: zero. An object at rest, as promised.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Every failure here is data. Painful, embarrassing, occasionally airborne data.' },
      { speaker: 'Mr Jamnani', pose: 'neutral', text: 'The jungle will run the experiment again. It enjoys repetition. So should you — spaced practice is proven.' },
      { speaker: 'Narrator', text: 'Somewhere in the mist, drums count out the beats you missed.' }
    ],
    endLabel: 'Return to the jungle'
  }
};
Object.values(cutscenes).forEach(scene => {
  scene.background = modernAsset(scene.background);
  scene.slot = modernAsset(scene.slot);
});

const ambientPresets = { equations: ['Φ', 'F = ma', 'kg·m/s', 'ς', 'Σ', 'g = 9.8', 'N·m', 'J', 'λ', 'p = mv'], fireflies: 9, embers: 12, mist: 3 };

function ambientHTML(list) {
  if (!list || !list.length) return '';
  const parts = [];
  if (list.includes('mist')) {
    for (let i = 0; i < ambientPresets.mist; i += 1) {
      parts.push(`<i class="amb-mist" style="--top:${8 + i * 30 + Math.random() * 12}%;--dur:${22 + Math.random() * 14}s;--delay:-${Math.random() * 20}s"></i>`);
    }
  }
  if (list.includes('fireflies')) {
    for (let i = 0; i < ambientPresets.fireflies; i += 1) {
      parts.push(`<i class="amb-firefly" style="--x:${4 + Math.random() * 92}%;--y:${12 + Math.random() * 70}%;--dx:${(Math.random() * 90 - 45).toFixed(0)}px;--dy:${(Math.random() * -80 - 20).toFixed(0)}px;--dur:${7 + Math.random() * 7}s;--delay:-${Math.random() * 8}s"></i>`);
    }
  }
  if (list.includes('embers')) {
    for (let i = 0; i < ambientPresets.embers; i += 1) {
      parts.push(`<i class="amb-ember" style="--x:${3 + Math.random() * 94}%;--dx:${(Math.random() * 60 - 30).toFixed(0)}px;--dur:${6 + Math.random() * 8}s;--delay:-${Math.random() * 9}s"></i>`);
    }
  }
  if (list.includes('equations')) {
    ambientPresets.equations.forEach(glyph => {
      parts.push(`<i class="amb-glyph" style="--x:${3 + Math.random() * 90}%;--rot:${(Math.random() * 26 - 13).toFixed(0)}deg;--dur:${24 + Math.random() * 20}s;--delay:-${Math.random() * 26}s">${glyph}</i>`);
    });
  }
  return parts.join('');
}

let fxTimer;

function fireFx(name) {
  const root = document.querySelector('#cutscene-root');
  if (!root || !name) return;
  if (name === 'doors') return root.classList.add('doors-open');
  if (name === 'orb') return root.classList.add('orb-risen');
  clearTimeout(fxTimer);
  root.classList.remove('fx-shake', 'fx-rum', 'fx-flash', 'fx-lightning');
  void root.offsetWidth; // restart the keyframe animation if the same fx fires twice
  root.classList.add(`fx-${name}`);
  fxTimer = setTimeout(() => root.classList.remove(`fx-${name}`), 1600);
}

function applyCutsceneArt(root, scene) {
  const paint = url => {
    root.style.backgroundImage = `linear-gradient(180deg,rgba(4,10,9,.14),rgba(4,10,9,.56)),linear-gradient(90deg,rgba(6,10,10,.55),rgba(6,10,10,.18) 54%,rgba(6,10,10,.28)),url('${url}')`;
  };
  paint(scene.background);
  if (!scene.slot) return;
  const probe = new Image();
  probe.onload = () => paint(scene.slot);
  probe.onerror = () => paint(scene.background);
  probe.src = scene.slot;
}

const FIELD_ARTIFACTS = [
  { id: 'calibrated-compass', name: 'Calibrated Compass', mark: '⌖', text: 'Begin each battle with 4 Block.' },
  { id: 'emergency-capacitor', name: 'Emergency Capacitor', mark: 'ϟ', text: 'Gain 1 additional Energy on the first turn of each battle.' },
  { id: 'surveyors-lens', name: 'Surveyor’s Lens', mark: '◉', text: 'See one additional card whenever rewards are offered.' },
  { id: 'stability-coil', name: 'Stability Coil', mark: '◎', text: 'Recover 4 Stability after every victorious battle.' }
];

const MAJOR_DISCOVERIES = [
  { id: 'deep-reserves', name: 'Deep Reserves', mark: '⚡', text: 'Gain 1 maximum Energy in every battle.' },
  { id: 'reinforced-notebook', name: 'Reinforced Notebook', mark: '▣', text: 'Gain 10 maximum Stability and recover 10 Stability.' },
  { id: 'prismatic-index', name: 'Prismatic Index', mark: '✦', text: 'Gain 1 Insight after every victorious battle.' }
];

function rewardDefinition(kind, id) {
  return (kind === 'artifact' ? FIELD_ARTIFACTS : MAJOR_DISCOVERIES).find(item => item.id === id);
}

function ownsReward(kind, id) {
  const collection = kind === 'artifact' ? state.artifacts : state.discoveries;
  return Array.isArray(collection) && collection.includes(id);
}

function resetState() {
  state = { act: 1, health: 60, maxHealth: 60, coins: 0, insight: 2, current: 'start', available: [], completed: ['start'], encounter: null, activeNode: null, battle: null, drawnQuestion: null, asked: {}, beats: { midpoint: false, elite: false, bossIntro: false }, streak: 0, grudge: 0, charmOwned: false, shopStock: null, shopNode: null, interjected: {}, deck: starterDeck(), artifacts: [], discoveries: [] };
  nodes = generateMap(state.act);
  const start = nodes.find(node => node.id === 'start');
  state.available = [...start.links];
}

function sample(items) { return items[Math.floor(Math.random() * items.length)]; }

const MAP_ROOM_WEIGHTS = [
  ['encounter', 34], ['hazard', 15], ['mystery', 14], ['rest', 12],
  ['merchant', 7], ['treasure', 6], ['ruins', 7], ['elite', 5]
];
const MAP_CHAIN_LIMITED = new Set(['elite', 'rest', 'merchant']);
const MAP_PRESSURE_ROOMS = new Set(['encounter', 'hazard', 'elite']);

function weightedMapKind(allowed) {
  const choices = MAP_ROOM_WEIGHTS.filter(([kind]) => allowed.includes(kind));
  const total = choices.reduce((sum, [, weight]) => sum + weight, 0);
  let roll = Math.random() * total;
  for (const [kind, weight] of choices) {
    roll -= weight;
    if (roll < 0) return kind;
  }
  return choices[choices.length - 1][0];
}

function applyMapKind(node, kind) {
  const type = landmarkTypes[kind];
  node.kind = kind;
  node.icon = type.icon;
  node.label = type.label;
  node.encounter = kind === 'hazard' ? sample(hazardTales) : type.encounter;
}

function exposeOpeningLocationVariety(mapNodes, runState) {
  if (runState.current !== 'start' || runState.completed?.length !== 1) return false;
  const opening = mapNodes.filter(node => node.floor === 1);
  if (opening.length < 2 || opening.some(node => journalKinds.includes(node.kind))) return false;
  applyMapKind(opening[opening.length - 1], sample(['hazard', 'mystery', 'ruins']));
  return true;
}

function assignBalancedMapKinds(floorGroups, floors) {
  const treasureFloor = Math.ceil(floors / 2);
  const eliteFloor = Math.ceil(floors * .55);
  const parentsById = new Map();
  floorGroups.flat().forEach(node => parentsById.set(node.id, []));
  floorGroups.flat().forEach(node => node.links.forEach(id => parentsById.get(id)?.push(node)));

  floorGroups.forEach((group, index) => {
    const floor = index + 1;
    if (floor === 1) return group.forEach((node, nodeIndex) => {
      applyMapKind(node, nodeIndex === 0 ? 'encounter' : sample(['hazard', 'mystery', 'ruins']));
      node.pressureStreak = MAP_PRESSURE_ROOMS.has(node.kind) ? 1 : 0;
    });
    if (floor === treasureFloor) return group.forEach(node => { applyMapKind(node, 'treasure'); node.pressureStreak = 0; });
    if (floor === floors) return group.forEach(node => { applyMapKind(node, 'rest'); node.pressureStreak = 0; });

    const allowed = ['encounter', 'hazard', 'mystery', 'merchant', 'treasure', 'ruins', ...(floor < floors - 1 ? ['rest'] : []), ...(floor >= eliteFloor ? ['elite'] : [])];
    group.forEach(node => {
      const parents = parentsById.get(node.id) || [];
      let kind = 'mystery';
      for (let attempt = 0; attempt < 30; attempt += 1) {
        const candidate = weightedMapKind(allowed);
        const repeatsLimitedRoom = MAP_CHAIN_LIMITED.has(candidate) && parents.some(parent => parent.kind === candidate);
        const extendsPressureChain = MAP_PRESSURE_ROOMS.has(candidate) && parents.some(parent => (parent.pressureStreak || 0) >= 2);
        const duplicatesForkChoice = parents.some(parent => parent.links
          .map(id => floorGroups[index].find(sibling => sibling.id === id))
          .some(sibling => sibling && sibling !== node && sibling.kind === candidate));
        if (!repeatsLimitedRoom && !extendsPressureChain && !duplicatesForkChoice) {
          kind = candidate;
          break;
        }
      }
      applyMapKind(node, kind);
      node.pressureStreak = MAP_PRESSURE_ROOMS.has(kind)
        ? 1 + Math.max(0, ...parents.map(parent => parent.pressureStreak || 0))
        : 0;
    });
  });
  floorGroups.flat().forEach(node => { delete node.pressureStreak; });
}

function generateMap(actNumber = 1) {
  const act = ACTS[Math.min(Math.max(actNumber, 1), ACTS.length) - 1];
  const floors = act.floors;
  const generated = [{ id: 'start', x: 50, y: 95, floor: 0, label: act.gateLabel, icon: '▲', kind: 'gate', encounter: null, links: [] }];
  const floorGroups = [];

  for (let floor = 1; floor <= floors; floor += 1) {
    const count = floor === 1 ? 2 : 3 + (Math.random() < .32 ? 1 : 0);
    const group = [];
    for (let column = 0; column < count; column += 1) {
      const id = `f${floor}n${column}`;
      const spacing = 78 / Math.max(1, count - 1);
      const x = count === 1 ? 50 : 11 + column * spacing + (Math.random() * 4 - 2);
      const y = 95 - floor * 9.6 + (Math.random() * 1.8 - .9);
      const node = { id, x, y, floor, kind: null, icon: '', label: '', encounter: null, links: [] };
      generated.push(node); group.push(node);
    }
    floorGroups.push(group);
  }

  const boss = { id: 'boss', x: 50, y: 7, floor: floors + 1, label: act.boss.name, icon: act.boss.mark, kind: 'joule', encounter: act.boss.encounter, links: [] };
  generated.push(boss);
  const allGroups = [[generated[0]], ...floorGroups, [boss]];

  for (let index = 0; index < allGroups.length - 1; index += 1) {
    const current = allGroups[index];
    const next = allGroups[index + 1];

    // Give every landmark one natural forward trail, favouring its current lane.
    current.forEach(node => {
      const closest = [...next].sort((a, b) => Math.abs(a.x - node.x) - Math.abs(b.x - node.x));
      node.links.push(closest[0].id);
    });

    // Keep every visible landmark reachable without turning each floor into a web.
    next.forEach(target => {
      if (!current.some(node => node.links.includes(target.id))) {
        const candidates = current.filter(node => node.links.length < 2);
        const nearest = [...(candidates.length ? candidates : current)].sort((a, b) => Math.abs(a.x - target.x) - Math.abs(b.x - target.x))[0];
        nearest.links.push(target.id);
      }
    });

    // Rare strategic forks create a second option; most rooms retain one exit.
    if (next.length > 1 && Math.random() < .38) {
      const forkCandidates = current.filter(node => node.links.length === 1);
      if (forkCandidates.length) {
        const fork = sample(forkCandidates);
        const alternatives = next.filter(target => !fork.links.includes(target.id)).sort((a, b) => Math.abs(a.x - fork.x) - Math.abs(b.x - fork.x));
        if (alternatives[0] && Math.abs(alternatives[0].x - fork.x) < 42) fork.links.push(alternatives[0].id);
      }
    }
  }
  assignBalancedMapKinds(floorGroups, floors);
  return generated;
}

function renderTitle() {
  app.innerHTML = `
    <section class="screen title-screen menu-screen">
      <div class="menu-vignette"></div>
      <div class="menu-stage">
        <nav class="main-menu" aria-label="Main menu">
          <button class="menu-choice is-selected" id="new-run"><b>Play</b></button>
          <button class="menu-choice" id="how"><b>How to play</b></button>
          <button class="menu-choice locked-choice" disabled><b>Expedition log</b></button>
          <button class="menu-choice" id="settings"><b>Settings</b></button>
        </nav>
        <div class="title-lockup" aria-label="Jamnanji: The Hidden Joules">
          <h1 class="game-title">JAMNANJI</h1>
          <div class="title-realms" aria-label="Mechanics, Electricity and Waves">
            <span title="Mechanics">Φ</span><span title="Electricity">ϟ</span><span title="Waves">≋</span>
          </div>
          <p>The Hidden Joules</p>
        </div>
      </div>
      <div class="menu-version">EARLY ACCESS · v0.8.0 · BUILD 0826</div>
    </section>`;
  const menuItems = [...document.querySelectorAll('.menu-choice:not(:disabled)')];
  let selected = 0;
  const selectItem = index => {
    selected = (index + menuItems.length) % menuItems.length;
    menuItems.forEach((item, itemIndex) => item.classList.toggle('is-selected', itemIndex === selected));
  };
  menuItems.forEach((item, index) => item.addEventListener('mouseenter', () => selectItem(index)));
  document.onkeydown = event => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      selectItem(selected + (event.key === 'ArrowDown' ? 1 : -1));
    }
    if (event.key === 'Enter') menuItems[selected].click();
  };
  document.querySelector('#new-run').addEventListener('click', renderSaveSlots);
  document.querySelector('#how').addEventListener('click', () => openHudPanel('how', true));
  document.querySelector('#settings').addEventListener('click', () => openHudPanel('settings', true));
}

function formatSaveTime(timestamp) {
  if (!timestamp) return 'No expedition recorded';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(timestamp);
}

function confirmClearSave(slotIndex) {
  const previousKeyHandler = document.onkeydown;
  const overlay = document.createElement('div');
  overlay.className = 'save-confirm';
  overlay.innerHTML = `<button class="save-confirm-shade" aria-label="Cancel"></button><button class="return-tab" id="confirm-return">Return</button><section role="alertdialog" aria-modal="true" aria-labelledby="clear-save-title"><h2 id="clear-save-title">Clear Save ${String(slotIndex + 1).padStart(2, '0')}?</h2><p>This expedition and its map progress will be removed.</p><div><button class="primary" data-confirm>Clear save</button></div></section>`;
  document.body.appendChild(overlay);
  const actions = [overlay.querySelector('[data-confirm]')];
  let selected = 0;
  const update = index => { selected = (index + actions.length) % actions.length; actions.forEach((button, i) => button.classList.toggle('is-key-selected', i === selected)); actions[selected].focus(); };
  const close = () => { overlay.remove(); document.onkeydown = previousKeyHandler; };
  overlay.querySelector('.save-confirm-shade').addEventListener('click', close);
  overlay.querySelector('#confirm-return').addEventListener('click', close);
  overlay.querySelector('[data-confirm]').addEventListener('click', () => {
    const data = loadSaveSlots();
    data.slots[slotIndex].run = null;
    writeSaveSlots(data);
    close();
    renderSaveSlots();
  });
  actions.forEach((button, index) => button.addEventListener('mouseenter', () => update(index)));
  document.onkeydown = event => {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) { event.preventDefault(); update(selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1)); }
    if (event.key === 'Enter') {
      if (document.activeElement?.classList.contains('return-tab')) return; // let the focused Return tab activate naturally
      event.preventDefault(); actions[selected].click();
    }
    if (event.key === 'Escape') close();
  };
  update(0);
  overlay.querySelector('#confirm-return').focus();
}

function renderSaveSlots() {
  document.onkeydown = null;
  const data = loadSaveSlots();
  app.innerHTML = `<section class="screen save-slot-screen">
    <div class="save-slot-shade"></div>
    <button class="journey-back" id="save-return">Return</button>
    <header class="save-slot-heading"><h1>Save Slots</h1></header>
    <main class="save-slot-grid">${data.slots.map((slot, index) => {
      const run = slot.run;
      const runState = run?.state;
      const act = run ? ACTS[Math.min(Math.max(runState.act || 1, 1), ACTS.length) - 1] : null;
      const level = run ? run.nodes.find(node => node.id === runState.current)?.floor || 0 : 0;
      const journey = run ? journeys.find(item => item.id === run.journey) || journeys[0] : null;
      const encounters = run ? Math.max(0, (runState.completed?.length || 1) - 1) : 0;
      return `<div class="save-slot-wrap"><article class="save-slot ${run ? 'has-run' : 'is-empty'} ${index === currentSaveSlot ? 'is-current' : ''}" data-save-slot="${index}" role="button" tabindex="${index === currentSaveSlot ? '0' : '-1'}" aria-label="Select Save ${index + 1}, ${run ? 'expedition in progress' : 'empty'}">
        <div class="save-slot-number"><span>Save</span><b>${String(index + 1).padStart(2, '0')}</b></div>
        ${run ? `<ul class="save-details">
          <li><span>Act</span><strong>${act.numeral} · ${act.name}</strong></li>
          <li><span>Level</span><strong>${level}</strong></li>
          <li><span>Joule</span><strong>Hidden Joule of ${journey.name}</strong></li>
          <li><span>Stability</span><strong>${runState.health}/${runState.maxHealth}</strong></li>
          <li><span>Encounters</span><strong>${encounters}</strong></li>
          <li><span>Last logged</span><strong>${formatSaveTime(run.savedAt)}</strong></li>
        </ul>` : '<p class="save-slot-empty">Empty slot</p>'}
      </article>${run ? `<button class="save-slot-clear" data-clear-slot="${index}">Clear save</button>` : ''}</div>`;
    }).join('')}</main>
    <button class="journey-embark save-slot-continue" id="save-continue"></button>
  </section>`;
  const cards = [...document.querySelectorAll('[data-save-slot]')];
  const continueButton = document.querySelector('#save-continue');
  let selected = Math.max(0, Math.min(2, currentSaveSlot));
  const renderSelection = index => {
    cards.forEach((card, cardIndex) => card.classList.toggle('is-selected', cardIndex === index));
    continueButton.textContent = data.slots[index].run ? 'Continue run' : 'Start new run';
  };
  const updateSelection = index => {
    selected = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => { card.tabIndex = cardIndex === selected ? 0 : -1; });
    renderSelection(selected);
    cards[selected].focus();
  };
  const openSelected = () => data.slots[selected].run ? continueSavedRun(selected) : startNewRun(selected);
  document.querySelector('#save-return').addEventListener('click', renderTitle);
  cards.forEach((card, index) => {
    card.addEventListener('click', () => updateSelection(index));
  });
  continueButton.addEventListener('click', openSelected);
  document.querySelectorAll('[data-clear-slot]').forEach(button => button.addEventListener('click', () => confirmClearSave(Number(button.dataset.clearSlot))));
  document.onkeydown = event => {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) { event.preventDefault(); updateSelection(selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1)); }
    if (event.key === 'Enter' && !document.activeElement?.matches('#save-return, #save-continue, [data-clear-slot]')) openSelected();
    if (event.key === 'Escape') renderTitle();
  };
  updateSelection(selected);
}

function renderJourneySelect() {
  let selectedIndex = Math.max(0, journeys.findIndex(journey => journey.id === selectedJourney));
  app.innerHTML = `<section class="screen journey-screen journey-mechanics">
    <div class="journey-shade"></div>
    <button class="journey-back" id="journey-back">Return</button>
    <div class="journey-details">
      <h1 id="journey-name"></h1>
      <p class="journey-act" id="journey-act"></p>
      <p class="journey-description" id="journey-description"></p>
      <div class="journey-focus"><span>Expedition focus</span><b id="journey-focus"></b></div>
      <p class="journey-objective" id="journey-objective"></p>
    </div>
    <div class="journey-monument" aria-hidden="true"><span id="journey-monument-sigil">Φ</span><i></i></div>
    <nav class="journey-seals" aria-label="Journeys">${journeys.map((journey, index) => `<button class="journey-seal" data-journey-index="${index}" aria-label="${journey.name}, ${journey.status}"><span>${journey.sigil}</span><b>${journey.name}</b><small>${journey.status}</small></button>`).join('')}</nav>
    <button class="journey-embark" id="journey-embark">Embark</button>
  </section>`;

  const screen = document.querySelector('.journey-screen');
  const embark = document.querySelector('#journey-embark');
  const seals = [...document.querySelectorAll('.journey-seal')];
  const updateSelection = index => {
    selectedIndex = (index + journeys.length) % journeys.length;
    const journey = journeys[selectedIndex];
    selectedJourney = journey.id;
    screen.className = `screen journey-screen journey-${journey.id}`;
    document.querySelector('#journey-name').textContent = journey.name;
    document.querySelector('#journey-act').textContent = journey.act;
    document.querySelector('#journey-description').textContent = journey.description;
    document.querySelector('#journey-focus').textContent = journey.focus;
    document.querySelector('#journey-objective').textContent = journey.objective;
    document.querySelector('#journey-monument-sigil').textContent = journey.sigil;
    seals.forEach((seal, sealIndex) => seal.classList.toggle('is-selected', sealIndex === selectedIndex));
    embark.disabled = !journey.available;
    embark.textContent = journey.available ? 'Begin journey' : 'Journey sealed';
  };
  seals.forEach((seal, index) => seal.addEventListener('click', () => updateSelection(index)));
  document.querySelector('#journey-back').addEventListener('click', renderTitle);
  embark.addEventListener('click', () => { if (journeys[selectedIndex].available) playCutscene('prologue', beginExpedition); });
  document.onkeydown = event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); updateSelection(selectedIndex + (event.key === 'ArrowRight' ? 1 : -1)); }
    if (event.key === 'Enter' && journeys[selectedIndex].available) playCutscene('prologue', beginExpedition);
    if (event.key === 'Escape') renderTitle();
  };
  updateSelection(selectedIndex);
}

function beginExpedition() {
  clearInterval(cutsceneTimer);
  document.onkeydown = null;
  resetState();
  saveRun();
  renderMap();
}

function playCutscene(id, onDone) {
  const scene = cutscenes[id];
  clearInterval(cutsceneTimer);
  document.onkeydown = null;
  let index = 0;
  let typing = false;
  let fullText = '';
  const staticClasses = `${scene.letterbox ? ' letterboxed' : ''}${scene.studentFrom === 0 ? ' cast-immediate' : ''}`;

  app.innerHTML = `<section class="screen cutscene-screen scene-phase-0${staticClasses}" id="cutscene-root">
    ${scene.doors ? '<div class="temple-doors" aria-hidden="true"><i class="door door-left"></i><i class="door door-right"></i><span class="door-seam"></span></div>' : ''}
    ${scene.orb ? '<div class="joule-orb" aria-hidden="true"><i></i><b></b></div>' : ''}
    <div class="ambient-layer" aria-hidden="true">${ambientHTML(scene.ambient)}</div>
    <div class="cutscene-fx" aria-hidden="true"></div>
    <div class="cutscene-vignette"></div>
    <div class="letterbox-bar letterbox-top" aria-hidden="true"></div>
    <div class="letterbox-bar letterbox-bottom" aria-hidden="true"></div>
    <button class="cutscene-skip" id="skip-cutscene">Skip <span>Esc</span></button>
    <div class="student-silhouette" id="student-character"><img id="student-art" src="assets/student-neutral-v3-cutout.webp" alt="Student explorer"></div>
    <div class="guide-silhouette" id="guide-character"><img id="guide-art" src="assets/jamnani-neutral-cutout.webp" alt="Mr Jamnani"></div>
    <div class="dialogue-box" id="dialogue-box">
      <div class="dialogue-speaker" id="dialogue-speaker"></div>
      <p id="dialogue-text" aria-live="polite"></p>
      <div class="dialogue-choices hidden" id="dialogue-choices"></div>
      <span class="continue-caret" id="continue-caret">Continue&nbsp; ›</span>
    </div>
  </section>`;

  const screen = document.querySelector('.cutscene-screen');
  const text = document.querySelector('#dialogue-text');
  const caret = document.querySelector('#continue-caret');
  const choices = document.querySelector('#dialogue-choices');
  const guide = document.querySelector('#guide-character');
  const guideArt = document.querySelector('#guide-art');
  const student = document.querySelector('#student-character');
  const studentArt = document.querySelector('#student-art');
  applyCutsceneArt(screen, scene);

  const endScene = () => {
    clearInterval(cutsceneTimer);
    document.onkeydown = null;
    onDone();
  };

  const showEndButton = () => {
    caret.classList.add('hidden');
    const enter = document.createElement('button');
    enter.className = 'journey-embark';
    enter.textContent = scene.endLabel || 'Continue';
    enter.addEventListener('click', event => { event.stopPropagation(); endScene(); });
    screen.appendChild(enter);
  };

  const typeLine = line => {
    clearInterval(cutsceneTimer);
    typing = true;
    fullText = line.text;
    text.textContent = '';
    caret.classList.add('hidden');
    choices.classList.add('hidden');
    document.querySelector('#dialogue-box').classList.remove('has-choices');
    document.querySelector('#dialogue-speaker').textContent = line.speaker;
    const jamnaniSpeaking = line.speaker === 'Mr Jamnani';
    const studentSpeaking = line.speaker === 'You';
    guide.classList.toggle('is-speaking', jamnaniSpeaking);
    student.classList.toggle('is-speaking', studentSpeaking);
    if (jamnaniSpeaking) guideArt.src = `assets/jamnani-${line.pose || 'neutral'}-cutout.webp`;
    if (studentSpeaking) studentArt.src = `assets/student-${line.pose || 'neutral'}-v3-cutout.webp`;
    const speakerClass = jamnaniSpeaking ? 'speaker-jamnani' : studentSpeaking ? 'speaker-student' : 'speaker-narrator';
    const studentClass = index >= scene.studentFrom ? 'has-student' : '';
    const keptClasses = `${screen.classList.contains('doors-open') ? ' doors-open' : ''}${screen.classList.contains('orb-risen') ? ' orb-risen' : ''}`;
    screen.className = `screen cutscene-screen scene-phase-${Math.min(5, Math.floor(index / 3))} ${speakerClass} ${studentClass}${staticClasses}${keptClasses}`;
    if (line.fx) fireFx(line.fx);
    let character = 0;
    cutsceneTimer = setInterval(() => {
      text.textContent = fullText.slice(0, ++character);
      if (character >= fullText.length) {
        clearInterval(cutsceneTimer);
        typing = false;
        if (line.choices) showChoices();
        else if (index === scene.lines.length - 1) showEndButton();
        else caret.classList.remove('hidden');
      }
    }, preferences.textSpeed);
  };

  const finishTyping = () => {
    clearInterval(cutsceneTimer);
    text.textContent = fullText;
    typing = false;
    const line = scene.lines[index];
    if (line.choices) showChoices();
    else if (index === scene.lines.length - 1) showEndButton();
    else caret.classList.remove('hidden');
  };

  const advance = () => {
    if (typing) return finishTyping();
    if (scene.lines[index].choices) return;
    index += 1;
    if (index < scene.lines.length) typeLine(scene.lines[index]);
  };

  const showChoices = () => {
    caret.classList.add('hidden');
    choices.classList.remove('hidden');
    document.querySelector('#dialogue-box').classList.add('has-choices');
    choices.innerHTML = scene.choices.map(choice => `<button data-reply="${choice.reply}">${choice.label}</button>`).join('');
    choices.querySelectorAll('button').forEach(button => button.addEventListener('click', event => {
      event.stopPropagation();
      choices.classList.add('hidden');
      document.querySelector('#dialogue-speaker').textContent = 'Mr Jamnani';
      screen.classList.remove('speaker-student', 'speaker-narrator');
      screen.classList.add('speaker-jamnani');
      guide.classList.add('is-speaking');
      student.classList.remove('is-speaking');
      guideArt.src = 'assets/jamnani-disappointed-cutout.webp';
      text.textContent = button.dataset.reply;
      caret.classList.add('hidden');
      showEndButton();
    }));
  };

  screen.addEventListener('click', event => {
    if (!event.target.closest('button')) advance();
  });
  document.querySelector('#skip-cutscene').addEventListener('click', endScene);
  document.onkeydown = event => {
    if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); advance(); }
    if (event.key === 'Escape') endScene();
  };
  typeLine(scene.lines[index]);
}

function hud() {
  const location = nodes.find(node => node.id === state.current)?.label || ACTS[(state.act || 1) - 1].gateLabel;
  return `<header class="hud">
    <div class="player-id"><div><strong data-hud-location>${location}</strong><small>Mechanics · ${ACTS[(state.act || 1) - 1].numeral}</small></div></div>
    <div class="hud-stat health-stat" aria-label="Stability: ${state.health} of ${state.maxHealth}" data-resource-label="Stability"><svg class="hud-art-icon heart-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21S3 15.5 3 8.8C3 5.7 5.1 3.5 8 3.5c1.8 0 3.2.9 4 2.3 0.8-1.4 2.2-2.3 4-2.3 2.9 0 5 2.2 5 5.3C21 15.5 12 21 12 21Z"/></svg><b data-hud-health>${state.health}<i>/${state.maxHealth}</i></b></div>
    <div class="hud-stat hud-supplies" aria-label="Supplies: ${state.coins}" data-resource-label="Supplies"><svg class="hud-art-icon supplies-icon" viewBox="0 0 24 24" aria-hidden="true"><ellipse class="icon-dark" cx="12" cy="18.2" rx="7.5" ry="3.1"/><path class="coin-back" d="M5.3 11.7v5.7c0 1.7 3 3.1 6.7 3.1s6.7-1.4 6.7-3.1v-5.7Z"/><circle class="coin-face" cx="12" cy="10.1" r="6.8"/><circle class="coin-ring" cx="12" cy="10.1" r="4.3"/><path class="coin-mark" d="M12 6.8v6.6M9.9 8.3h3.2c1.7 0 1.7 2.2 0 2.2h-2.2c-1.7 0-1.7 2.2 0 2.2h3.2"/><path class="icon-glint" d="m7.7 5.8 1.1 1.1"/></svg><b data-hud-supplies>${state.coins}</b></div>
    <div class="hud-stat hud-insight" aria-label="Insight: ${state.insight}" data-resource-label="Insight"><svg class="hud-art-icon insight-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.2 15.1c-1.4-1.1-2.3-2.8-2.3-4.8A6.1 6.1 0 0 1 12 4.2a6.1 6.1 0 0 1 6.1 6.1c0 2-.9 3.7-2.3 4.8-.8.6-1.1 1.2-1.2 2H9.4c-.1-.8-.4-1.4-1.2-2Z"/><path d="M9.5 19h5M10.4 21h3.2M12 1.5v1M4.3 4l1.2 1.2M19.7 4l-1.2 1.2M2 10.3h1.7M20.3 10.3H22"/></svg><b data-hud-insight>${state.insight}</b></div>
    <div class="hud-tools">
      <button class="hud-icon" data-hud-action="notes" aria-label="Field notes" title="Field notes"><svg class="hud-art-icon notes-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="book-cover" d="M2.4 4.5c4.3-.8 7.5.1 9.6 2.1 2.1-2 5.3-2.9 9.6-2.1v15c-4.3-.7-7.5.2-9.6 2-2.1-1.8-5.3-2.7-9.6-2Z"/><path class="book-page" d="M4.3 5.8c3.1-.3 5.3.4 7 2v10.8c-1.7-1.1-4-1.6-7-1.3ZM19.7 5.8c-3.1-.3-5.3.4-7 2v10.8c1.7-1.1 4-1.6 7-1.3Z"/><path class="book-binding" d="M12 7.1v13.2"/><path class="book-ink" d="M6 9h3.5M6 11.7h3.5M14.5 9H18M14.5 11.7H18"/><path class="book-ribbon" d="M15.9 5.9v8.3l1.4-1 1.4 1V5.6"/></svg></button>
      <button class="hud-icon" data-hud-action="settings" aria-label="Settings" title="Settings"><svg class="hud-art-icon settings-icon" viewBox="0 0 24 24" aria-hidden="true"><path class="gear-body" d="m9.7 1.7 4.5.1.6 2.6 1.6.7 2.3-1.4 3.1 3.2-1.5 2.2.7 1.7 2.6.7v4.5l-2.7.6-.7 1.6 1.4 2.3-3.2 3.1-2.2-1.5-1.7.7-.6 2.6H9.7L9 19.6l-1.6-.7-2.3 1.4L2 17.1l1.5-2.2-.7-1.7-2.6-.6V8.1l2.7-.6.7-1.6-1.4-2.3 3.2-3.1L7.6 2Z"/><circle class="gear-core" cx="12" cy="10.4" r="4.5"/><circle class="gear-pin" cx="12" cy="10.4" r="1.8"/><path class="gear-glint" d="M8.9 8.2c.8-1.1 1.7-1.6 3-1.8"/></svg></button>
    </div>
  </header>`;
}

function closeHudPanel() {
  const overlay = document.querySelector('.hud-overlay');
  if (!overlay) return;
  document.removeEventListener('keydown', overlay._escapeHandler, true);
  overlay.remove();
}

function confirmBattleExit(settingsOverlay) {
  if (document.querySelector('.battle-exit-confirm')) return;
  settingsOverlay._confirming = true;
  const confirmation = document.createElement('div');
  confirmation.className = 'save-confirm battle-exit-confirm';
  confirmation.innerHTML = `<button class="save-confirm-shade" aria-label="No, stay in battle"></button><section role="alertdialog" aria-modal="true" aria-labelledby="exit-battle-title"><small>Current encounter</small><h2 id="exit-battle-title">Exit battle?</h2><p>Your progress in this battle will not be saved. You will return to the map and restart the encounter next time.</p><div><button class="secondary" data-exit-no>No</button><button class="primary" data-exit-yes>Yes, exit</button></div></section>`;
  document.body.appendChild(confirmation);
  const close = () => {
    confirmation.remove();
    settingsOverlay._confirming = false;
    document.removeEventListener('keydown', onKeyDown, true);
    settingsOverlay.querySelector('#settings-exit-battle')?.focus();
  };
  const exit = () => {
    confirmation.remove();
    document.removeEventListener('keydown', onKeyDown, true);
    state.battle = null;
    state.activeNode = null;
    state.encounter = null;
    state.locationSession = null;
    state.pendingCompletion = false;
    saveRun();
    closeHudPanel();
    renderMap();
  };
  const onKeyDown = event => {
    if (event.key !== 'Escape') return;
    event.preventDefault();
    event.stopImmediatePropagation();
    close();
  };
  confirmation.querySelector('.save-confirm-shade').addEventListener('click', close);
  confirmation.querySelector('[data-exit-no]').addEventListener('click', close);
  confirmation.querySelector('[data-exit-yes]').addEventListener('click', exit);
  document.addEventListener('keydown', onKeyDown, true);
  confirmation.querySelector('[data-exit-no]').focus();
}

function openHudPanel(kind, fromMenu = false) {
  closeHudPanel();
  const overlay = document.createElement('div');
  overlay.className = `hud-overlay${fromMenu ? ' menu-hud-overlay' : ''}${kind === 'notes' ? ' notes-hud-overlay' : ''}`;
  const isNotes = kind === 'notes';
  const isHow = kind === 'how';
  const isSettings = kind === 'settings';
  const isRunSettings = isSettings && !fromMenu;
  const canExitBattle = isRunSettings && Boolean(state?.battle);
  if (canExitBattle) overlay.classList.add('has-battle-exit');
  const deckCounts = (state?.deck || []).reduce((counts, instance) => { const key = `${instance.id}${instance.upgraded ? '+' : ''}`; counts[key] = (counts[key] || 0) + 1; return counts; }, {});
  const deckList = Object.entries(deckCounts).map(([key, count]) => { const upgraded = key.endsWith('+'); const def = cardDef(key.replace(/\+$/, '')); const cost = def ? cardEnergyCost({ id: def.id, upgraded }) : 0; return def ? `<article class="field-note-page card-type-${def.type}">${count > 1 ? `<span class="field-note-count">${count} copies</span>` : ''}<span class="field-note-cost"><small>Cost:</small> ${energyCostMarks(cost)}</span><h3>${def.name}${upgraded ? '+' : ''}</h3><small class="field-note-type">${def.type}</small><p>${upgraded ? def.up : def.text}</p><b>${def.topic || 'Any topic'}</b></article>` : ''; }).join('');
  const runRewards = [...(state?.artifacts || []).map(id => rewardDefinition('artifact', id)), ...(state?.discoveries || []).map(id => rewardDefinition('discovery', id))].filter(Boolean);
  const rewardNotes = runRewards.map(item => `<article class="field-reward-note"><span>${item.mark}</span><div><b>${item.name}</b><small>${item.text}</small></div></article>`).join('');
  const panelBody = isNotes ? `<div class="field-notes-summary">${state?.deck?.length || 0} notes collected</div>${rewardNotes ? `<div class="field-reward-notes">${rewardNotes}</div>` : ''}<div class="field-notes-grid">${deckList || '<p class="field-notes-empty">No notes collected yet.</p>'}</div>` : isHow ? `<div class="how-grid">
          <article><span>01</span><div><h3>Choose a route</h3><p>Select one connected landmark. The path closes behind you, so plan around danger, rest and rewards.</p></div></article>
          <article><span>02</span><div><h3>Answer to act</h3><p>Correct physics answers attack enemies and solve hazards. Wrong answers cost Stability.</p></div></article>
          <article><span>03</span><div><h3>Prepare wisely</h3><p>Collect Supplies, gain Insight and use safe landmarks before taking on Elite encounters.</p></div></article>
          <article><span>04</span><div><h3>Recover the Joule</h3><p>Reach the final guardian and survive its trial to complete the Mechanics expedition.</p></div></article>
        </div><div class="how-controls"><kbd>↑ ↓ ← →</kbd><span>Navigate</span><kbd>Enter</kbd><span>Select</span><kbd>Esc</kbd><span>Return</span></div>` : `<div class="settings-list">
          <fieldset><legend>Dialogue speed</legend><div class="setting-options">${[['Quick',8],['Standard',16],['Relaxed',28]].map(([label,value]) => `<button class="setting-choice ${preferences.textSpeed === value ? 'is-active' : ''}" data-setting-speed="${value}">${label}</button>`).join('')}</div></fieldset>
          <label class="setting-toggle"><span><b>Reduced motion</b></span><input type="checkbox" data-setting-motion ${preferences.reducedMotion ? 'checked' : ''}></label>
          <fieldset><legend>Interface size</legend><div class="setting-options">${[['Compact', 90], ['Standard', 100], ['Large', 110]].map(([label, value]) => `<button class="setting-choice ${preferences.interfaceSize === value ? 'is-active' : ''}" data-setting-size="${value}">${label}</button>`).join('')}</div></fieldset>
        </div><button class="settings-reset" data-settings-reset>Restore defaults</button>`;
  overlay.innerHTML = `<button class="hud-modal-backdrop" aria-label="Close panel"></button>
    <button class="return-tab${isSettings ? ' save-close-tab' : ''}" id="hud-return">${isSettings ? 'Save and close' : 'Return'}</button>
    ${canExitBattle ? '<button class="settings-exit-battle" id="settings-exit-battle">Exit battle</button>' : ''}
    <section class="hud-modal" role="dialog" aria-modal="true" aria-labelledby="hud-modal-title">
      <header><div><h2 id="hud-modal-title">${isNotes ? 'Field Notes' : isHow ? 'How to Play' : 'Settings'}</h2></div></header>
      ${panelBody}
    </section>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.hud-modal-backdrop').addEventListener('click', closeHudPanel);
  overlay.querySelector('#hud-return').addEventListener('click', () => {
    if (isSettings) savePreferences();
    closeHudPanel();
  });
  overlay.querySelector('#settings-exit-battle')?.addEventListener('click', () => confirmBattleExit(overlay));
  overlay.querySelectorAll('[data-setting-speed]').forEach(button => button.addEventListener('click', () => {
    preferences.textSpeed = Number(button.dataset.settingSpeed); savePreferences();
    overlay.querySelectorAll('[data-setting-speed]').forEach(item => item.classList.toggle('is-active', item === button));
  }));
  overlay.querySelector('[data-setting-motion]')?.addEventListener('change', event => { preferences.reducedMotion = event.target.checked; savePreferences(); });
  overlay.querySelectorAll('[data-setting-size]').forEach(button => button.addEventListener('click', () => {
    preferences.interfaceSize = Number(button.dataset.settingSize); savePreferences();
    overlay.querySelectorAll('[data-setting-size]').forEach(item => item.classList.toggle('is-active', item === button));
  }));
  overlay.querySelector('[data-settings-reset]')?.addEventListener('click', () => { preferences = { ...preferenceDefaults }; savePreferences(); closeHudPanel(); openHudPanel('settings', fromMenu); });
  overlay._escapeHandler = event => { if (overlay._confirming) return; event.stopImmediatePropagation(); if (event.key === 'Escape') { event.preventDefault(); closeHudPanel(); } };
  document.addEventListener('keydown', overlay._escapeHandler, true);
  overlay.querySelector('#hud-return').focus();
}

function wireHudControls() {
  document.querySelectorAll('[data-hud-action]').forEach(button => button.addEventListener('click', () => openHudPanel(button.dataset.hudAction)));
}

function refreshHud() {
  const health = document.querySelector('[data-hud-health]');
  const supplies = document.querySelector('[data-hud-supplies]');
  const insight = document.querySelector('[data-hud-insight]');
  if (health) health.innerHTML = `${state.health}<i>/${state.maxHealth}</i>`;
  if (supplies) supplies.textContent = state.coins;
  if (insight) insight.textContent = state.insight;
  const locationEl = document.querySelector('[data-hud-location]');
  if (locationEl) locationEl.textContent = nodes.find(node => node.id === state.current)?.label || locationEl.textContent;
  const battleHealth = document.querySelector('[data-battle-player-health]');
  if (battleHealth) battleHealth.textContent = `${state.health}/${state.maxHealth}`;
  const battleHealthBar = document.querySelector('[data-battle-player-bar]');
  if (battleHealthBar) {
    battleHealthBar.style.width = `${state.health / state.maxHealth * 100}%`;
    battleHealthBar.classList.toggle('is-low', state.health > 0 && state.health / state.maxHealth <= .25);
  }
  const blockEl = document.querySelector('[data-battle-block]');
  if (blockEl) syncBlockBadge(hydrateUnits(state.battle));
  const streakChip = document.querySelector('[data-battle-streak]');
  if (streakChip) {
    streakChip.textContent = state.streak >= 2 ? `Streak ×${state.streak} · 2 dmg` : `Streak ×${state.streak}`;
    streakChip.classList.toggle('hidden', state.streak < 1);
    streakChip.classList.toggle('is-hot', state.streak >= 2);
  }
}

function renderMap() {
  document.onkeydown = null;
  app.innerHTML = `<section class="screen game-shell">${hud()}
    <div class="map-layout">
      <section class="panel map-panel">
        <div class="map-viewport"><div class="map" id="map"></div></div>
      </section>
      <aside class="panel guide-panel map-key">
        <div class="scroll-cap" aria-hidden="true"></div>
        <h2>Map key</h2>
        <div class="legend landmark-legend">
          <p><b>${mapIcon('encounter')}</b> Encounter</p><p><b>${mapIcon('hazard')}</b> Dangerous ground</p><p><b>${mapIcon('mystery')}</b> Unknown</p><p><b>${mapIcon('rest')}</b> Rest</p><p><b>${mapIcon('merchant')}</b> Merchant</p><p><b>${mapIcon('treasure')}</b> Treasure</p><p><b>${mapIcon('elite')}</b> Elite</p><p><b>${mapIcon('ruins')}</b> Ruins</p><p><b>${mapIcon('joule')}</b> Joule guardian</p>
        </div>
        <div class="route-readout"><span>Current position</span><strong>${nodes.find(n => n.id === state.current).label}</strong></div>
      </aside>
    </div>
    <button class="return-tab" id="return-menu">Return</button>
  </section>`;
  document.querySelector('#return-menu').addEventListener('click', renderTitle);
  drawMap();
  wireHudControls();
}

function drawMap() {
  const map = document.querySelector('#map');
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('class', 'path-layer'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none');
  nodes.forEach(node => {
    node.links.forEach(targetId => {
      const target = nodes.find(n => n.id === targetId);
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${node.x} ${node.y} L ${target.x} ${target.y}`);
      const travelled = state.completed.includes(node.id) && (state.completed.includes(targetId) || state.available.includes(targetId));
      path.setAttribute('class', travelled ? 'route route-live' : 'route');
      svg.appendChild(path);
    });
  });
  map.appendChild(svg);
  nodes.forEach(node => {
    const button = document.createElement('button');
    const status = state.completed.includes(node.id) ? 'completed' : state.available.includes(node.id) ? 'available' : 'locked';
    button.className = `node node-${node.kind} ${status} ${node.id === 'boss' ? 'boss' : ''}`;
    button.style.left = `${node.x}%`; button.style.top = `${node.y}%`;
    button.disabled = status !== 'available';
    button.innerHTML = `<span class="landmark-symbol">${mapIcon(node.kind)}</span><span class="node-label">${node.label}</span><span class="node-status">${status === 'available' ? 'Choose trail' : status === 'completed' ? 'Cleared' : 'Unexplored'}</span>`;
    button.setAttribute('aria-label', `${node.label}, ${status}`);
    if (status === 'available') button.addEventListener('click', () => startEncounter(node.id));
    map.appendChild(button);
  });
  const currentNode = nodes.find(node => node.id === state.current);
  const mapHeight = map.offsetHeight;
  const viewportHeight = map.parentElement.clientHeight;
  const desiredShift = viewportHeight * .68 - (currentNode.y / 100) * mapHeight;
  const shift = Math.max(viewportHeight - mapHeight, Math.min(0, desiredShift));
  map.style.transform = `translateY(${shift}px)`;
}

function battleAnswerButtons(question, battle) {
  const eliminated = battle.hint?.round === battle.round ? battle.hint.eliminated : [];
  const locked = battle.phase !== 'question'; // answers exist only in question mode
  return question.answers.map((answer, index) => `<button class="answer-btn${eliminated.includes(index) ? ' is-eliminated' : ''}" data-battle-answer="${index}"${eliminated.includes(index) || locked ? ' disabled' : ''}>${answer}</button>`).join('');
}

// —— The card engine: cards are the verbs, the question is the skill check ——
const HAND_SIZE = 5;

// Shared gradient sword icon — injected once, referenced everywhere intents,
// previews and damage tags need an attack marker.
const SWORD_SVG = `<svg class="sword-icon" viewBox="0 0 20 27" aria-hidden="true" focusable="false"><path d="M10 .9 13.5 5.1 V15.3 H6.5 V5.1 Z" fill="url(#jam-sword-grad)" stroke="#161b1d" stroke-width="1.1" stroke-linejoin="round"/><path d="M10 2.8 V15.3" stroke="rgba(255,255,255,.45)" stroke-width="1"/><rect x="2.4" y="15.3" width="15.2" height="2.8" rx="1.4" fill="#c9a653" stroke="#161b1d" stroke-width=".8"/><rect x="8.4" y="18.1" width="3.2" height="5.7" rx="1.3" fill="#7a5a2e" stroke="#161b1d" stroke-width=".8"/><circle cx="10" cy="25.2" r="1.8" fill="#c9a653" stroke="#161b1d" stroke-width=".8"/></svg>`;
function ensureIconDefs() {
  if (document.getElementById('jam-icon-defs')) return;
  const holder = document.createElement('div');
  holder.id = 'jam-icon-defs';
  holder.setAttribute('aria-hidden', 'true');
  holder.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  holder.innerHTML = '<svg width="0" height="0"><defs><linearGradient id="jam-sword-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset=".5" stop-color="#dde6ec"/><stop offset="1" stop-color="#8fa0ac"/></linearGradient></defs></svg>';
  document.body.appendChild(holder);
}

function cardEnergyCost(instance) {
  const def = cardDef(instance?.id);
  if (!def) return Infinity;
  if (instance.upgraded && def.id === 'resonance') return 1;
  if (instance.upgraded && def.id === 'inertia') return 0;
  return def.cost;
}

function energyMarks(count) {
  const bolt = '<svg class="energy-mark" viewBox="0 0 16 24" aria-hidden="true" focusable="false"><path d="M9.4 1 2.5 13h5.1L6.5 23 13.8 10H8.7Z"/></svg>';
  return bolt.repeat(count);
}

function energyCostMarks(count) {
  return `<b class="energy-cost-number">${count}</b><span class="energy-times">×</span>${energyMarks(1)}`;
}

function cardActionPreview(instance, battle) {
  const def = cardDef(instance?.id);
  if (!def) return null;
  const effect = def.effect;
  const upgraded = instance.upgraded;
  const amount = (normal, improved = effect.up) => upgraded && improved != null ? improved : normal;
  if (['block', 'potential', 'block_draw'].includes(effect.k)) return { kind: 'block', amount: amount(effect.n) };
  if (effect.k === 'damage_block') return { kind: 'attack', amount: amount(effect.n) };
  if (effect.k === 'multi') return { kind: 'attack', amount: amount(effect.n) * amount(effect.hits, effect.upHits) };
  if (effect.k === 'thirdlaw') return { kind: 'attack', amount: Math.max(0, (battle.lastTaken || 0) + (upgraded ? effect.up : 0)) };
  if (effect.k === 'conserve') return { kind: 'attack', amount: battle.block || 0 };
  if (['damage', 'sweep', 'insight', 'torque', 'pendulum', 'damage_draw', 'damage_weak', 'execute'].includes(effect.k)) return { kind: 'attack', amount: amount(effect.n) };
  return null;
}

function updateBattleActionPreview(battle) {
  const previewEl = document.querySelector('[data-battle-action-preview]');
  if (!previewEl) return;
  const preview = cardActionPreview(battle.played.at(-1), battle);
  previewEl.classList.toggle('hidden', !preview);
  previewEl.classList.toggle('is-block', preview?.kind === 'block');
  previewEl.classList.toggle('is-attack', preview?.kind === 'attack');
  previewEl.querySelector('b').textContent = preview?.amount ?? '';
  previewEl.setAttribute('aria-label', preview ? `${preview.kind === 'block' ? 'Block' : 'Damage'} ${preview.amount}` : 'No action selected');
}

// Cards now spend Energy the moment they are played, so this is a plain read.
function syncBattleEnergy(battle) {
  return battle.energy;
}

function cardTile(instance, options = {}) {
  const def = cardDef(instance.id);
  if (!def) return '';
  const playable = options.playable !== false;
  const queued = options.queued;
  const upgraded = instance.upgraded;
  const typeLabel = def.type === 'attack' ? '⚔ Attack' : def.type === 'skill' ? '⛨ Skill' : '✦ Power';
  return `<button type="button" class="card-tile card-type-${def.type}${queued ? ' is-queued' : ''}${playable ? ' is-playable' : ' is-unaffordable'}${upgraded ? ' is-upgraded' : ''}" ${options.attr || `data-hand-card="${options.index}"`}${playable ? '' : ' disabled aria-disabled="true"'} title="${def.name}${upgraded ? '+' : ''} — ${upgraded ? def.up : def.text}">
    <span class="card-cost"><small>Cost:</small> ${energyCostMarks(cardEnergyCost(instance))}</span>
    <b class="card-name">${def.name}${upgraded ? '+' : ''}</b>
    <span class="card-type">${typeLabel}</span>
    <span class="card-text">${upgraded ? def.up : def.text}</span>
    <span class="card-topic">${def.topic ? def.topic : 'any topic'}</span>
  </button>`;
}

function cardModeHTML(battle) {
  const hand = battle.hand.map((instance, index) => {
    const def = cardDef(instance.id);
    const cost = cardEnergyCost(instance);
    return cardTile(instance, { index, playable: battle.energy >= cost, attr: `data-hand-card="${index}" aria-label="${def.name}, cost ${cost}. ${def.target === 'enemy' ? 'Drag onto an enemy to attack.' : 'Drag onto your explorer to play.'}` });
  }).join('');
  return `<div class="battle-card-ui" id="battle-tray-body" data-mode="cards">
    <div class="hand-dock"><div class="hand-row" id="hand-row" aria-label="Card hand">${hand || '<span class="hand-empty">No cards remain in hand.</span>'}</div></div>
    <div class="battle-resource-dock" aria-label="Battle resources">
      <span class="energy-orb${battle.energy > 0 ? '' : ' is-spent'}" title="Energy"><small>Energy</small><b>${battle.energy}/${battle.turnEnergy ?? battle.maxEnergy}</b>${energyMarks(1)}</span>
      <span class="pile-chip" title="Draw pile"><small>Draw</small><b>${battle.drawPile.length}</b><i aria-hidden="true">🂠</i></span>
    </div>
    <span class="battle-discard-pile" id="battle-discard-pile" title="Discard pile" aria-label="Discard pile"><i aria-hidden="true">🂠</i><b>${battle.discardPile.length}</b><small>Discard</small></span>
    <button type="button" class="commit-btn" id="commit-turn">End turn</button>
    <span class="sr-only" id="queue-announcer" aria-live="polite"></span>
  </div>`;
}

// The round opens with a centered question modal: answer to charge this
// exchange's plays, then the modal clears and the card phase begins.
function battleQuestionModalHTML(battle) {
  const question = battle.questions[battle.round];
  if (!question) return '';
  return `<div class="battle-question-overlay" id="battle-question-overlay" role="dialog" aria-modal="true" aria-labelledby="battle-modal-question">
    <section class="battle-question-modal">
      <small class="battle-question-kicker">Exchange ${battle.round + 1} · answer to charge your play</small>
      <h2 id="battle-modal-question">${question.question}</h2>
      <div class="answers battle-answers" id="battle-answers">${battleAnswerButtons(question, battle)}<button type="button" class="hint-btn insight-action" id="battle-hint"></button></div>
      <span class="streak-chip hidden" data-battle-streak></span>
      <p class="battle-question-verdict hidden" id="battle-question-verdict" aria-live="polite"></p>
    </section>
  </div>`;
}

// Short pre-battle flourish: a title card slams in, lingers long enough to
// read, then clears for the question. Battle encounters only — never journal,
// hazard or shop locations.
function announceBattleStart(kind) {
  if (!['encounter', 'elite', 'joule'].includes(kind)) return;
  const stage = document.querySelector('.location-stage');
  if (!stage || preferences.reducedMotion) return;
  const lines = { elite: 'An elite bars the way!', joule: 'The guardian awakens…' };
  const text = lines[kind] || 'Let the battle begin!';
  stage.insertAdjacentHTML('beforeend', `<div class="battle-start-banner" id="battle-start-banner"><span>${text}</span></div>`);
  const banner = document.getElementById('battle-start-banner');
  setTimeout(() => banner?.classList.add('is-leaving'), 2050);
  setTimeout(() => banner?.remove(), 2550);
}

function mountQuestionModal() {
  const battle = hydrateUnits(state.battle);
  if (!battle || battle.phase !== 'question') return;
  ensureRoundQuestion(battle);
  document.querySelector('#battle-question-overlay')?.remove();
  const stage = document.querySelector('.location-stage');
  if (!stage || !battle.questions[battle.round]) return;
  document.body.insertAdjacentHTML('beforeend', battleQuestionModalHTML(battle));
  const overlay = document.querySelector('#battle-question-overlay');
  const accent = getComputedStyle(stage).getPropertyValue('--location-accent');
  if (accent) overlay.style.setProperty('--location-accent', accent);
  requestAnimationFrame(() => requestAnimationFrame(() => overlay?.classList.add('is-visible')));
  document.querySelector('#battle-question-overlay .answer-btn:not(:disabled)')?.focus();
  wireBattleAnswers();
  wireBattleHint();
  updateHintButton();
  refreshHud();
}

function dismissQuestionModal(then) {
  const overlay = document.querySelector('#battle-question-overlay');
  if (!overlay) return then?.();
  overlay.classList.add('is-leaving');
  if (preferences.reducedMotion) { overlay.remove(); then?.(); }
  else setTimeout(() => { overlay.remove(); then?.(); }, 230);
}

function ensureRoundQuestion(battle) {
  if (battle.questions[battle.round]) return;
  const node = nodes.find(item => item.id === state.activeNode);
  const themed = pickQuestions(ENCOUNTER_TOPICS[state.encounter] || null, 1, levelsForNode(node))[0];
  const fresh = themed || pickQuestions(null, 1, levelsForNode(node))[0] || pickQuestions(null, 1, [1, 2, 3])[0];
  if (fresh) battle.questions[battle.round] = fresh;
}

function beginCardPhase(battle) {
  battle.phase = 'cards';
  if (battle.units.every(unit => unit.hp <= 0)) return settleBattleVictory(battle);
  rerenderTrayBody();
  updateIncomingPreview();
  saveRun();
}

function settleBattleVictory(battle) {
  const reward = battle.reward ?? encounters[state.encounter].reward;
  state.coins += reward;
  battle.won = true;
  battle.phase = 'rewards';
  refreshHud();
  saveRun();
  showBattleRewards(battle);
}

function battleTray(node, encounter) {
  const battle = hydrateUnits(state.battle);
  return `<div class="activity-heading battle-heading"><div><small>${encounter.title} · Turn <span id="battle-round">${battle.round + 1}</span></small></div></div>
    ${cardModeHTML(battle)}`;
}

function wireCardMode() {
  const body = document.querySelector('#battle-tray-body[data-mode="cards"]');
  const stage = document.querySelector('.location-stage');
  const panel = document.querySelector('.location-action-panel');
  if (!body || !stage || !panel) return;
  stage.appendChild(body);
  panel.classList.add('is-card-phase');
  document.querySelectorAll('[data-hand-card]').forEach(button => {
    wireCardDrag(button, Number(button.dataset.handCard));
  });
  const commit = document.querySelector('#commit-turn');
  if (commit) commit.addEventListener('click', commitTurn);
}

// —— Targeting arrow: a full-viewport SVG that tracks the drag 1:1 ——
const SVG_NS = 'http://www.w3.org/2000/svg';

function showTargetArrow() {
  let svg = document.getElementById('target-arrow-svg');
  if (!svg) {
    svg = document.createElementNS(SVG_NS, 'svg');
    svg.id = 'target-arrow-svg';
    svg.classList.add('target-arrow-overlay');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = '<defs><marker id="jam-arrow-head" markerWidth="4" markerHeight="4" refX="1.6" refY="2" orient="auto" markerUnits="strokeWidth">'
      + '<path d="M0,0 L4,2 L0,4 L1.1,2 Z" fill="#e05548" stroke="#4a0f09" stroke-width=".3" stroke-linejoin="round"/></marker></defs>'
      + '<path class="target-arrow-path is-under" d=""/>'
      + '<path class="target-arrow-path is-main" d="" marker-end="url(#jam-arrow-head)"/>'
      + '<path class="target-arrow-path is-core" d=""/>';
    document.body.appendChild(svg);
  }
  return svg;
}

function moveTargetArrow(svg, from, to) {
  // Control point rides above the midpoint, so the shaft arcs outward
  // (concave down) instead of sagging.
  const bend = Math.min(110, Math.hypot(to.x - from.x, to.y - from.y) * .3);
  const d = `M ${from.x} ${from.y} Q ${(from.x + to.x) / 2} ${(from.y + to.y) / 2 - bend} ${to.x} ${to.y}`;
  svg.querySelectorAll('.target-arrow-path').forEach(path => path.setAttribute('d', d));
}

function hideTargetArrow() {
  document.getElementById('target-arrow-svg')?.remove();
}

function clearDropTargets() {
  document.querySelectorAll('.is-drop-target').forEach(el => el.classList.remove('is-drop-target'));
}

// The element a card release should resolve onto, or null when invalid.
// Big sprites overflow their layout box, so enemies are hit-tested against
// their *visual* rect — smallest containing rect wins, so a small enemy in
// front of a boss stays selectable.
function dropTargetAt(def, x, y) {
  const el = document.elementFromPoint(x, y);
  if (def.target === 'self') return el?.closest('.player-combatant') || null;
  const battle = state.battle;
  const pad = 10;
  let best = null;
  let bestArea = Infinity;
  document.querySelectorAll('.enemy-unit[data-enemy]').forEach(unit => {
    if (battle?.units[Number(unit.dataset.enemy)]?.hp <= 0) return;
    const art = unit.querySelector('.unit-glyph')
      || (unit.classList.contains('enemy-swarm-unit') ? unit.querySelector('.unit-art') : unit.querySelector('.unit-art > img'))
      || unit;
    const r = art.getBoundingClientRect();
    if (x < r.left - pad || x > r.right + pad || y < r.top - pad || y > r.bottom + pad) return;
    const area = Math.max(1, r.width) * Math.max(1, r.height);
    if (area < bestArea) { bestArea = area; best = unit; }
  });
  if (best) return best;
  const fallback = el?.closest('[data-enemy]');
  return fallback && battle?.units[Number(fallback.dataset.enemy)]?.hp > 0 ? fallback : null;
}

function wireCardDrag(button, index) {
  button.draggable = false;
  button.addEventListener('mousedown', event => {
    if (event.button !== 0) return;
    const battle = hydrateUnits(state.battle);
    if (!battle || battle.phase !== 'cards') return;
    const instance = battle.hand[index];
    const def = instance && cardDef(instance.id);
    if (!def || cardEnergyCost(instance) > battle.energy) return;
    const start = { x: event.clientX, y: event.clientY };
    const origin = button.getBoundingClientRect();
    const friendly = def.target === 'self';
    let dragging = false;
    let ghost = null;
    let arrowSvg = null;
    const move = moveEvent => {
      if (!dragging && Math.hypot(moveEvent.clientX - start.x, moveEvent.clientY - start.y) < 10) return;
      if (!dragging) {
        dragging = true;
        if (friendly) {
          // Skills are carried as a card: drag it over to your explorer.
          ghost = button.cloneNode(true);
          ghost.className = `${button.className} card-drag-ghost`;
          ghost.removeAttribute('id');
          ghost.setAttribute('aria-hidden', 'true');
          document.body.appendChild(ghost);
          document.body.classList.add('is-dragging-friendly');
        } else {
          // Attacks stay in the hand; only the arrow hunts.
          button.classList.add('is-drag-source');
          arrowSvg = showTargetArrow();
          document.body.classList.add('is-dragging-attack');
        }
      }
      moveEvent.preventDefault();
      if (ghost) {
        ghost.style.left = `${moveEvent.clientX}px`;
        ghost.style.top = `${moveEvent.clientY}px`;
      } else {
        moveTargetArrow(arrowSvg, { x: origin.left + origin.width / 2, y: origin.top }, { x: moveEvent.clientX, y: moveEvent.clientY });
      }
      clearDropTargets();
      if (def.target === 'all') {
        // Sweeps mark every living enemy as a target while the arrow is out.
        if (dropTargetAt(def, moveEvent.clientX, moveEvent.clientY)) {
          document.querySelectorAll('.enemy-unit[data-enemy]').forEach(unit => {
            if (state.battle?.units[Number(unit.dataset.enemy)]?.hp > 0) unit.classList.add('is-drop-target');
          });
        }
      } else {
        dropTargetAt(def, moveEvent.clientX, moveEvent.clientY)?.classList.add('is-drop-target');
      }
    };
    const end = endEvent => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', end);
      hideTargetArrow();
      ghost?.remove();
      clearDropTargets();
      button.classList.remove('is-drag-source');
      document.body.classList.remove('is-dragging-friendly', 'is-dragging-attack');
      if (!dragging) return; // cards only play by dragging onto a target
      const handTarget = document.elementFromPoint(endEvent.clientX, endEvent.clientY)?.closest('[data-hand-card]');
      if (handTarget && Number(handTarget.dataset.handCard) !== index) return reorderHand(index, Number(handTarget.dataset.handCard));
      const drop = dropTargetAt(def, endEvent.clientX, endEvent.clientY);
      if (!drop) return; // released nowhere valid — card stays in hand
      // Only now does the card fling out of the hand and strike.
      if (def.target === 'enemy') playCard(index, Number(drop.dataset.enemy));
      else playCard(index);
    };
    document.addEventListener('mousemove', move, { passive: false });
    document.addEventListener('mouseup', end);
  });
}

function rerenderTrayBody() {
  const battle = hydrateUnits(state.battle);
  if (!battle) return;
  const roundEl = document.querySelector('#battle-round');
  if (roundEl) roundEl.textContent = battle.round + 1;
  const body = document.querySelector('#battle-tray-body');
  if (body) body.outerHTML = cardModeHTML(battle);
  else document.querySelector('.location-stage')?.insertAdjacentHTML('beforeend', cardModeHTML(battle));
  wireCardMode();
  updateBattleActionPreview(battle);
  updateIncomingPreview();
  saveRun();
}

function drawCards(battle, count) {
  for (let drawn = 0; drawn < count; drawn += 1) {
    if (!battle.drawPile.length) {
      if (!battle.discardPile.length) return;
      battle.drawPile = [...battle.discardPile].sort(() => Math.random() - .5);
      battle.discardPile = [];
    }
    if (battle.hand.length >= HAND_SIZE + 3) return; // hard cap for layout
    battle.hand.push(battle.drawPile.pop());
  }
}

function startTurn(battle) {
  battle.turnEnergy = battle.maxEnergy + (battle.round === 0 && ownsReward('artifact', 'emergency-capacitor') ? 1 : 0) + (state.streak >= 3 ? 1 : 0) + (battle.nextTurnEnergy || 0);
  battle.nextTurnEnergy = 0;
  battle.energy = battle.turnEnergy;
  if (!battle.retainBlock) battle.block = 0;
  battle.played = [];
  battle.resonating = false;
  battle.roundMultiplier = 1;
  battle.answering = false;
  battle.phase = 'question';
  // Delayed strikes land as the swing comes back around.
  const pendulum = battle.pendulumQueue.shift();
  if (pendulum) {
    const target = firstLiving(battle);
    if (target >= 0) dealToEnemy(battle, target, pendulum);
  }
  drawCards(battle, HAND_SIZE - battle.hand.length);
}

function firstLiving(battle) {
  const index = battle.units.findIndex(unit => unit.hp > 0);
  return index;
}

function dealToEnemy(battle, index, damage) {
  const unit = battle.units[index];
  if (!unit || unit.hp <= 0) return 0;
  if (unit.shield) { unit.shield = false; return 0; }
  unit.hp = Math.max(0, unit.hp - damage);
  return damage;
}

async function playCard(index, targetIndex) {
  const battle = hydrateUnits(state.battle);
  if (!battle || battle.phase !== 'cards') return;
  const instance = battle.hand[index];
  if (!instance) return;
  const def = cardDef(instance.id);
  const cost = cardEnergyCost(instance);
  if (cost > battle.energy) return;
  let target = null;
  if (def.target === 'enemy') {
    // Default target is the front-most living enemy; the arrow's drop picks
    // a different one for this card only — the ring never moves.
    target = typeof targetIndex === 'number' && battle.units[targetIndex]?.hp > 0 ? targetIndex
      : battle.units[battle.target]?.hp > 0 ? battle.target : firstLiving(battle);
    if (!(target >= 0)) return;
  }
  battle.hand.splice(index, 1);
  battle.energy = Math.max(0, battle.energy - cost);
  // Snapshot the card as a ghost before the hand re-renders, so the flight
  // starts exactly where the card was while the remaining hand refreshes.
  let ghost = null;
  const handButton = document.querySelector(`[data-hand-card="${index}"]`);
  if (handButton && !preferences.reducedMotion) {
    ghost = handButton.cloneNode(true);
    ghost.classList.add('card-play-ghost');
    ghost.removeAttribute('id');
    ghost.setAttribute('aria-hidden', 'true');
    ghost.disabled = true;
    const rect = handButton.getBoundingClientRect();
    ghost.style.left = `${rect.left}px`;
    ghost.style.top = `${rect.top}px`;
    document.body.appendChild(ghost);
  }
  rerenderTrayBody();
  await animateCardPlay(ghost, cardResolutionTarget(def, battle, target));
  applyCardEffect(instance, battle.roundMultiplier, target);
  battle.discardPile.push(instance);
  updateEnemyPack();
  if (battle.units.every(unit => unit.hp <= 0)) return settleBattleVictory(battle);
  rerenderTrayBody();
  refreshBattlePlayerReadout(battle);
  refreshHud();
  updateIncomingPreview();
  saveRun();
}

function reorderHand(fromIndex, toIndex) {
  const battle = hydrateUnits(state.battle);
  if (!battle || battle.phase !== 'cards' || fromIndex === toIndex) return;
  const [instance] = battle.hand.splice(fromIndex, 1);
  if (!instance) return;
  battle.hand.splice(toIndex, 0, instance);
  rerenderTrayBody();
}

async function commitTurn() {
  const battle = hydrateUnits(state.battle);
  if (!battle || battle.phase !== 'cards') return;
  battle.phase = 'resolving';
  const commitButton = document.querySelector('#commit-turn');
  commitButton?.setAttribute('disabled', '');
  commitButton?.classList.add('is-hidden');
  // The hand visibly sweeps into the discard pile before enemies move.
  await animateDiscardHand();
  battle.discardPile.push(...battle.hand);
  battle.hand = [];
  const count = document.querySelector('#battle-discard-pile b');
  if (count) count.textContent = battle.discardPile.length;
  const handRow = document.querySelector('#hand-row');
  if (handRow) handRow.innerHTML = '';
  resolveEnemyResponse();
}

// Cards peel off the hand one by one and vanish into the discard pile icon.
function animateDiscardHand() {
  const target = document.querySelector('#battle-discard-pile');
  const cards = [...document.querySelectorAll('#hand-row [data-hand-card]')];
  if (!target || !cards.length || preferences.reducedMotion) return Promise.resolve();
  const targetRect = target.getBoundingClientRect();
  return new Promise(resolve => {
    cards.forEach((card, index) => {
      const ghost = card.cloneNode(true);
      ghost.classList.add('card-discard-ghost');
      ghost.removeAttribute('id');
      ghost.setAttribute('aria-hidden', 'true');
      const rect = card.getBoundingClientRect();
      ghost.style.left = `${rect.left}px`;
      ghost.style.top = `${rect.top}px`;
      document.body.appendChild(ghost);
      setTimeout(() => {
        ghost.style.setProperty('--play-x', `${targetRect.left + targetRect.width / 2 - rect.left - rect.width / 2}px`);
        ghost.style.setProperty('--play-y', `${targetRect.top + targetRect.height / 2 - rect.top - rect.height / 2}px`);
        ghost.classList.add('is-flying');
        target.classList.remove('is-receiving');
        void target.offsetWidth;
        target.classList.add('is-receiving');
      }, 40 + index * 70);
      setTimeout(() => ghost.remove(), 480 + index * 70);
    });
    setTimeout(resolve, 560 + cards.length * 70);
  });
}

// —— Trader stock & jungle economics ——
// Every wrong answer anywhere stiffens the trader's prices: he hears everything.
const shopCatalogue = [
  { id: 'rations', name: 'Expedition rations', base: 12, note: '+10 Stability · legally food', flavor: 'Tastes like static. Restores anyway.' },
  { id: 'tonic', name: 'Field tonic', base: 22, note: '+20 Stability · no refunds', flavor: 'The label just says “trust me”. The physics checks out.' },
  { id: 'rope', name: 'Variable-tension rope', base: 15, note: '+1 Insight · tension may vary', flavor: 'Its tension is variable. Its refund policy is not.' },
  { id: 'notes', name: 'Annotated field notes', base: 26, note: '+2 Insight · mostly legible', flavor: 'One diagram is labelled “obvious”. It becomes obvious after twelve minutes.' },
  { id: 'charm', name: 'Warding charm', base: 30, note: '+5 max Stability · once per expedition', flavor: 'Something in the jungle agrees to hit you slightly less hard.' }
];

function shopMarkup() { return Math.min(.9, .15 * (state.grudge || 0)); }
function shopPrice(item) { return Math.ceil(item.base * (1 + shopMarkup())); }

function drawShopStock() {
  const pool = shopCatalogue.filter(item => item.id !== 'charm' || !state.charmOwned);
  const stock = [...pool].sort(() => Math.random() - .5).slice(0, 3).map(item => item.id);
  // The trader always carries two cards: one workhorse, one showpiece.
  const cards = cardPool(state.act || 1);
  const commons = cards.filter(card => card.rarity === 'common');
  const rares = cards.filter(card => card.rarity === 'rare');
  if (commons.length) stock.push(`card:${sample(commons).id}`);
  if (rares.length) stock.push(`card:${sample(rares).id}`);
  return stock;
}

// Stock is drawn once per visit and kept in state, so a save/resume shows the same wares.
function shopStockFor(node) {
  if (state.shopNode !== node.id || !Array.isArray(state.shopStock)) {
    state.shopNode = node.id;
    state.shopStock = drawShopStock();
  }
  return state.shopStock.map(entry => {
    if (entry.startsWith('card:')) {
      const def = cardDef(entry.slice(5));
      if (!def) return null;
      return { id: entry, name: `${def.name} · card`, base: def.rarity === 'rare' ? 45 : 28, note: def.text, flavor: 'A card for your deck. The trader insists it is load-bearing.' };
    }
    return shopCatalogue.find(item => item.id === entry);
  }).filter(Boolean);
}

function locationActivity(node, encounter) {
  if (state.battle) return battleTray(node, encounter);
  if (node.kind === 'hazard') {
    const challenge = hazardChallenges[node.encounter] || hazardChallenges.river;
    return `<div class="activity-heading hazard-heading"><span class="activity-sigil" aria-hidden="true">ϟ</span><div><small>Choose your movement</small><h2>${challenge.prompt}</h2></div></div>
      <div class="hazard-vector" aria-hidden="true"><i></i><i></i><i></i><span>commit</span></div>
      <div class="location-options hazard-options">
        ${challenge.choices.map((choice, index) => `<button data-location-action="hazard-${index}"><b>${choice[0]}</b><span>${choice[1]}</span></button>`).join('')}
      </div>`;
  }

  if (node.kind === 'ruins') {
    const session = state.locationSession || { phase: 0, mistakes: 0 };
    const stage = ruinStages[Math.min(session.phase, ruinStages.length - 1)];
    return `<div class="activity-heading ruins-heading"><span class="activity-sigil" aria-hidden="true">⌬</span><div><small>Ring ${session.phase + 1} of ${ruinStages.length}</small><h2>${stage.title}</h2><p>${stage.prompt}</p></div></div>
      <div class="ruin-machine" aria-label="Ancient mechanism progress">${ruinStages.map((_, index) => `<i class="${index < session.phase ? 'is-set' : index === session.phase ? 'is-live' : ''}">${index + 1}</i>`).join('<span></span>')}</div>
      <div class="location-options ruins-options">
        ${stage.choices.map((choice, index) => `<button data-location-action="ruin-${index}"><b>${choice}</b></button>`).join('')}
      </div>`;
  }

  if (node.kind === 'rest') return `<div class="activity-heading"><div><h2>The clearing will not remain quiet forever.</h2></div></div>
    <div class="location-options camp-options">
      <button data-location-action="recover"><b>Rest by the warding stones</b><span>Recover ${actRestRecovery()} Stability</span></button>
      <button data-location-action="prepare"><b>Study Jamnani’s field notes</b><span>Gain 1 Insight</span></button>
      <button data-location-action="sharpen"><b>Sharpen a card</b><span>Upgrade one card in your deck</span></button>
      <button data-location-action="leave"><b>Keep moving</b><span>Take nothing · lose nothing</span></button>
    </div>`;

  if (node.kind === 'merchant') {
    const stock = shopStockFor(node);
    const markup = shopMarkup();
    return `<div class="activity-heading"><div><h2>Today’s questionably useful stock</h2>${markup > 0 ? `<span class="shop-note">Jungle markup +${Math.round(markup * 100)}% — the trader hears everything.</span>` : '<span class="shop-note">Fresh prices. The jungle has heard nothing incriminating. Yet.</span>'}</div></div>
    <div class="location-options shop-options">
      ${stock.map(item => `<button data-location-action="buy-${item.id}"${state.coins < shopPrice(item) ? ' class="is-unaffordable"' : ''}><b>${item.name}</b><span>${shopPrice(item)} Supplies · ${item.note}</span></button>`).join('')}
      <button data-location-action="trade"><b>Trade one Insight</b><span>Receive 20 Supplies</span></button>
      <button data-location-action="leave"><b>Decline politely</b><span>The trader will survive the insult</span></button>
    </div>`;
  }

  if (node.kind === 'treasure') return `<div class="activity-heading"><div><h2>Three caches. One mechanism will open.</h2></div></div>
    <div class="location-options treasure-options cache-options">
      <button data-location-action="cache-supplies"><span class="cache-mark" aria-hidden="true">◉</span><b>Provision cache</b><span>A large bundle of Supplies</span></button>
      <button data-location-action="cache-relic"><span class="cache-mark" aria-hidden="true">✦</span><b>Relic cache</b><span>A permanent expedition benefit</span></button>
      <button data-location-action="cache-card"><span class="cache-mark" aria-hidden="true">▱</span><b>Technique cache</b><span>Add a rare card to your deck</span></button>
    </div>`;

  if (node.kind === 'mystery') return `<div class="activity-heading"><div><h2>The shrine waits for a decision.</h2></div></div>
    <div class="location-options mystery-options">
      <button data-location-action="offering"><b>Place supplies in the slot</b><span>Offer 10 · the shrine gambles</span></button>
      <button data-location-action="symbols"><b>Read the moving symbols</b><span>Wisdom or gold · rarely both</span></button>
      <button data-location-action="leave"><b>Back away slowly</b><span>Jamnani calls this “risk management”</span></button>
    </div>`;

  return `<div class="activity-heading"><div><h2>${encounter.question}</h2></div></div>
    <div class="answers">${encounter.answers.map((answer, index) => `<button class="answer-btn" data-answer="${index}">${answer}</button>`).join('')}</div>`;
}

// Questions are drawn at random from the tagged bank in questions.js.
// Every draw prefers questions the player has seen least this run, so
// encounters keep surfacing fresh material until a topic pool runs dry.
function currentAct() { return ACTS[Math.min(Math.max(state?.act || 1, 1), ACTS.length) - 1]; }
function actRestRecovery() { return [16, 20, 24][Math.min(Math.max(state?.act || 1, 1), 3) - 1]; }

function levelsForNode(node) {
  if (node.kind === 'elite' || node.kind === 'joule') return [3, 2];
  return node.floor <= 2 ? [1, 2] : [1, 2, 3];
}

function shuffleQuestion(entry) {
  const options = entry.answers.map((answer, index) => ({ answer, correct: index === entry.correct })).sort(() => Math.random() - .5);
  return { question: entry.q, answers: options.map(option => option.answer), correct: options.findIndex(option => option.correct), topic: entry.topic, level: entry.level };
}

function pickQuestions(topics, count, levels = [1, 2, 3]) {
  const act = currentAct();
  const themed = topics?.filter(topic => act.topics.includes(topic));
  const topicList = themed?.length ? themed : act.topics;
  const asked = state?.asked || {};
  const pool = QUESTION_BANK
    .filter(q => topicList.includes(q.topic) && levels.includes(q.level) && !asked[q.id])
    .sort(() => Math.random() - .5)
    .slice(0, count);
  pool.forEach(q => { if (state) state.asked[q.id] = true; });
  return pool.map(shuffleQuestion);
}

function drawBattleQuestions(encounterKey, node) {
  const levels = levelsForNode(node);
  const themed = pickQuestions(ENCOUNTER_TOPICS[encounterKey] || null, 1, levels)[0];
  return themed ? [themed] : pickQuestions(null, 1, levels);
}

// —— Bestiary ——
// Every enemy is a data row: shape/hue give it a placeholder silhouette until art exists
// (drop the file and set `art` to light it up). Moves drive the intent engine:
//   cycle  [a, b, …]  repeats that damage sequence forever
//   charge {windup, burst} gathers for windup rounds, then hits for burst
//   drain  {power, loot} strikes and steals Supplies
//   guard  {power} alternates shield / strike
//   ramp   {power, growth} starts light, hits harder every time it lands one
const ENEMY_ROSTER = {
  // Act I — momentum & energy
  baboon: { id: 'baboon', name: 'Vector Baboon', mark: '♣', shape: 'blob', hue: 18, hp: 12, role: 'soldier', bounty: 9, moves: { k: 'cycle', hits: [4, 4] }, art: 'assets/enemy-baboon.png', scale: .82 },
  frog: { id: 'frog', name: 'Kinetic Dart Frog', mark: '◇', shape: 'diamond', hue: 130, hp: 6, role: 'swarm', bounty: 5, moves: { k: 'cycle', hits: [2, 2] }, art: 'assets/enemy-frog.png', scale: .38 },
  parrot: { id: 'parrot', name: 'Scalar Parrot', mark: '¶', shape: 'tri', hue: 95, hp: 10, role: 'soldier', bounty: 9, moves: { k: 'cycle', hits: [3, 6] }, art: 'assets/enemy-parrot.png', scale: .58, hover: 46 },
  sloth: { id: 'sloth', name: 'Inertia Sloth', mark: '∩', shape: 'blob', hue: 200, hp: 18, role: 'heavy', bounty: 14, moves: { k: 'charge', windup: 2, burst: 12 }, art: 'assets/enemy-sloth.png', scale: .9 },
  spider: { id: 'spider', name: 'Pulley Spider', mark: '✕', shape: 'hex', hue: 280, hp: 11, role: 'soldier', bounty: 10, moves: { k: 'drain', power: 3, loot: 3 }, art: 'assets/enemy-spider.png', scale: .52 },
  viper: { id: 'viper', name: 'Elastic Viper', mark: '∿', shape: 'tri', hue: 340, hp: 12, role: 'soldier', bounty: 10, moves: { k: 'ramp', power: 2, growth: 2 }, art: 'assets/enemy-viper.png', scale: .68 },
  orangutan: { id: 'orangutan', name: 'Pendulum Orangutan', mark: '⌇', shape: 'blob', hue: 32, hp: 19, role: 'heavy', bounty: 15, moves: { k: 'cycle', hits: [5, 8] }, art: 'assets/enemy-orangutan.png', scale: 1 },
  boar: { id: 'boar', name: 'Friction Boar', mark: '≜', shape: 'diamond', hue: 8, hp: 22, role: 'heavy', bounty: 16, moves: { k: 'cycle', hits: [6, 7] }, art: 'assets/enemy-boar.png', scale: .8 },
  // Act II — rotation & rolling
  rotor: { id: 'rotor', name: 'Rotor Monkey', mark: '✳', shape: 'spike', hue: 55, hp: 16, role: 'soldier', bounty: 12, moves: { k: 'cycle', hits: [5, 6] }, art: 'assets/enemy-rotor.png', scale: .78 },
  falcon: { id: 'falcon', name: 'Gyro Falcon', mark: '◭', shape: 'tri', hue: 210, hp: 15, role: 'soldier', bounty: 12, moves: { k: 'cycle', hits: [4, 8] }, art: 'assets/enemy-falcon.png', scale: .64, hover: 58 },
  turtle: { id: 'turtle', name: 'Torque Turtle', mark: '⬡', shape: 'hex', hue: 110, hp: 24, role: 'heavy', bounty: 18, moves: { k: 'guard', power: 7 }, art: 'assets/enemy-turtle.png', scale: .72 },
  boulder: { id: 'boulder', name: 'Rolling Boulder', mark: '●', shape: 'blob', hue: 25, hp: 26, role: 'heavy', bounty: 19, moves: { k: 'charge', windup: 2, burst: 14 }, art: 'assets/enemy-boulder.png', scale: .82 },
  beaver: { id: 'beaver', name: 'Angular Beaver', mark: '⌒', shape: 'diamond', hue: 28, hp: 18, role: 'soldier', bounty: 14, moves: { k: 'drain', power: 5, loot: 4 }, art: 'assets/enemy-beaver.png', scale: .66 },
  flywheel: { id: 'flywheel', name: 'Flywheel Lemur', mark: '◎', shape: 'spike', hue: 190, hp: 22, role: 'heavy', bounty: 17, moves: { k: 'ramp', power: 4, growth: 2 }, art: 'assets/enemy-flywheel.png', scale: .76 },
  // Act III — circles, orbits & oscillation
  panther: { id: 'panther', name: 'Centripetal Panther', mark: '☾', shape: 'blob', hue: 260, hp: 27, role: 'heavy', bounty: 20, moves: { k: 'cycle', hits: [7, 9] }, art: 'assets/enemy-panther.png', scale: .92 },
  howler: { id: 'howler', name: 'Resonant Howler', mark: '≫', shape: 'spike', hue: 350, hp: 25, role: 'heavy', bounty: 20, moves: { k: 'ramp', power: 4, growth: 3 }, art: 'assets/enemy-howler.png', scale: .88 },
  owl: { id: 'owl', name: 'Orbital Owl', mark: '◉', shape: 'hex', hue: 48, hp: 30, role: 'heavy', bounty: 22, moves: { k: 'guard', power: 9 }, art: 'assets/enemy-owl.png', scale: .72, hover: 52 },
  mosquito: { id: 'mosquito', name: 'Damping Mosquito Swarm', mark: '·', shape: 'diamond', hue: 150, hp: 8, role: 'swarm', bounty: 7, moves: { k: 'cycle', hits: [2, 3] }, art: 'assets/enemy-mosquito.png', scale: .25, swarm: 5, hover: 42 },
  ape: { id: 'ape', name: 'Harmonic Ape', mark: '⏦', shape: 'blob', hue: 300, hp: 31, role: 'heavy', bounty: 23, moves: { k: 'cycle', hits: [5, 11] }, art: 'assets/enemy-ape.png', scale: 1.02 },
  comet: { id: 'comet', name: 'Comet Newt', mark: '☄', shape: 'tri', hue: 175, hp: 18, role: 'soldier', bounty: 16, moves: { k: 'charge', windup: 1, burst: 14 }, art: 'assets/enemy-comet.png', scale: .48, hover: 34 }
};

const ACT_POOLS = [
  { mobs: ['baboon', 'frog', 'parrot', 'sloth', 'spider', 'viper', 'orangutan', 'boar'], elite: 'rhino', cheap: ['baboon', 'frog', 'parrot'] },
  { mobs: ['rotor', 'falcon', 'turtle', 'boulder', 'beaver', 'flywheel', 'baboon'], elite: 'colossus', cheap: ['rotor', 'baboon', 'beaver'] },
  { mobs: ['panther', 'howler', 'owl', 'mosquito', 'ape', 'comet', 'falcon'], elite: 'warden', cheap: ['mosquito', 'comet', 'falcon'] }
];

const ACT_ELITES = {
  rhino: { id: 'rhino', name: 'Momentum Rhino', mark: '♜', shape: 'diamond', hue: 350, hp: 38, bounty: 32, moves: { k: 'cycle', hits: [8, 10] }, art: 'assets/enemy-rhino.png', scale: 1.85 },
  colossus: { id: 'colossus', name: 'Torque Colossus', mark: '♜', shape: 'hex', hue: 40, hp: 52, bounty: 44, moves: { k: 'cycle', hits: [9, 11, 16] }, art: 'assets/enemy-colossus.png', scale: 1.95 },
  warden: { id: 'warden', name: 'Resonance Warden', mark: '♜', shape: 'spike', hue: 315, hp: 66, bounty: 58, moves: { k: 'cycle', hits: [10, 12, 18] }, art: 'assets/enemy-warden.png', scale: 1.9 }
};
Object.values(ENEMY_ROSTER).forEach(enemy => { enemy.art = modernAsset(enemy.art); });
Object.values(ACT_ELITES).forEach(enemy => { enemy.art = modernAsset(enemy.art); });

const ACT_BOSS_BALANCE = [
  { hp: 48, hits: [7, 9, 12] },
  { hp: 72, hits: [9, 12, 16] },
  { hp: 96, hits: [11, 14, 19] }
];
const BATTLE_BALANCE_VERSION = 2;

function currentBossDefinition() {
  const boss = currentAct().boss;
  const balance = ACT_BOSS_BALANCE[Math.min(Math.max(state.act || 1, 1), ACT_BOSS_BALANCE.length) - 1];
  return { id: 'boss', name: boss.name, mark: boss.mark, shape: 'hex', hue: 45, hp: balance.hp, bounty: 0, moves: { k: 'cycle', hits: balance.hits }, art: modernAsset(boss.art), scale: boss.scale };
}

// Pure: the intent a unit telegraphs this round, derived from its move set and phase.
function unitIntent(unit) {
  const moves = unit.def.moves;
  if (moves.k === 'cycle') return { kind: 'attack', damage: moves.hits[unit.phase % moves.hits.length] };
  if (moves.k === 'charge') {
    const step = unit.phase % (moves.windup + 1);
    return step === moves.windup ? { kind: 'attack', damage: moves.burst } : { kind: 'charge', damage: moves.burst, until: moves.windup - step };
  }
  if (moves.k === 'drain') return { kind: 'drain', damage: moves.power, loot: moves.loot };
  if (moves.k === 'guard') return unit.phase % 2 === 0 ? { kind: 'guard' } : { kind: 'attack', damage: moves.power };
  if (moves.k === 'ramp') return { kind: 'attack', damage: unit.power };
  return { kind: 'attack', damage: 0 };
}

function intentLabel(intent) {
  if (intent.kind === 'attack') return `${SWORD_SVG}<b>${intent.damage}</b>`;
  if (intent.kind === 'charge') return `<i class="pip-glyph">⋯</i><b>${intent.damage}</b>`;
  if (intent.kind === 'drain') return `${SWORD_SVG}<b>${intent.damage}</b><i class="loot-mark">⛁</i>`;
  if (intent.kind === 'guard') return '<i class="pip-glyph">🛡</i><b>shield</b>';
  return SWORD_SVG;
}

function hydrateUnits(battle) {
  battle.units.forEach((unit, index) => {
    if (battle.kind === 'joule' && index === 0) unit.id = 'boss';
    const canonical = ENEMY_ROSTER[unit.id] || ACT_ELITES[unit.id] || (unit.id === 'boss' ? currentBossDefinition() : null);
    if (canonical && (unit.def?.hp !== canonical.hp || unit.maxHp !== canonical.hp)) {
      const ratio = unit.maxHp > 0 ? unit.hp / unit.maxHp : 1;
      unit.def = canonical;
      unit.maxHp = canonical.hp;
      unit.hp = ratio <= 0 ? 0 : Math.max(1, Math.ceil(canonical.hp * ratio));
    } else if (canonical) unit.def = canonical;
    else if (!unit.def) {
      // Unknown ids from very old saves retain a safe boss-shaped fallback.
      unit.def = currentBossDefinition();
    }
    if (typeof unit.phase !== 'number') unit.phase = 0;
    if (typeof unit.shield !== 'boolean') unit.shield = false;
    if (typeof unit.power !== 'number') unit.power = unit.def.moves.power || 0;
  });
  if (typeof battle.block !== 'number') battle.block = 0;
  // Card-engine fields — battles saved before the deck system resume cleanly.
  if (!Array.isArray(battle.drawPile)) battle.drawPile = [];
  if (!Array.isArray(battle.discardPile)) battle.discardPile = [];
  if (!Array.isArray(battle.hand)) battle.hand = [];
  if (!Array.isArray(battle.played)) battle.played = [];
  if (!Array.isArray(battle.pendulumQueue)) battle.pendulumQueue = [];
  if (typeof battle.energy !== 'number') battle.energy = battle.maxEnergy || 3;
  if (typeof battle.maxEnergy !== 'number') battle.maxEnergy = 3;
  if (typeof battle.phase !== 'string') battle.phase = 'cards';
  if (typeof battle.damping !== 'number') battle.damping = 0;
  if (typeof battle.retainBlock !== 'boolean') battle.retainBlock = false;
  if (typeof battle.resonating !== 'boolean') battle.resonating = false;
  if (typeof battle.lastTaken !== 'number') battle.lastTaken = 0;
  if (typeof battle.nextTurnEnergy !== 'number') battle.nextTurnEnergy = 0;
  battle.units.forEach(unit => { if (!unit.weak) unit.weak = null; });
  return battle;
}

function spawnUnit(def) {
  const unit = { id: def.id, hp: def.hp, maxHp: def.hp, phase: 0, shield: false, power: def.moves.power || 0 };
  unit.def = def;
  return unit;
}

// Pack archetypes: a swarm token fields three identical weaklings, a soldier
// token a pair of midweights, a heavy token one strong loner. Deeper floors
// unlock richer mixes, so the shape of a fight changes as the run descends.
const COMPOSITIONS = [
  { minFloor: 1, packs: [['swarm'], ['soldier'], ['soldier', 'swarm']] },
  { minFloor: 3, packs: [['swarm'], ['soldier'], ['soldier', 'swarm'], ['heavy'], ['heavy', 'swarm']] },
  { minFloor: 5, packs: [['swarm'], ['soldier', 'swarm'], ['heavy'], ['heavy', 'swarm'], ['heavy', 'soldier'], ['soldier', 'soldier']] }
];

function fillCompositionSlot(role, pool) {
  const fallback = { swarm: ENEMY_ROSTER.frog, soldier: ENEMY_ROSTER.baboon, heavy: ENEMY_ROSTER.boar }[role];
  const candidates = pool.mobs.map(id => ENEMY_ROSTER[id]).filter(def => def.role === role);
  const pick = () => sample(candidates.length ? candidates : [fallback]);
  if (role === 'swarm') {
    const def = pick();
    return [spawnUnit(def), spawnUnit(def), spawnUnit(def)]; // a swarm is one species, three bodies
  }
  if (role === 'soldier') return [spawnUnit(pick()), spawnUnit(pick())]; // a pair — twins or two species
  return [spawnUnit(pick())];
}

function buildPack(node) {
  const pool = ACT_POOLS[Math.min(Math.max(state.act || 1, 1), ACT_POOLS.length) - 1];
  if (node.kind === 'joule') {
    const boss = currentAct().boss;
    return { units: [spawnUnit(currentBossDefinition())], reward: encounters[boss.encounter].reward };
  }
  if (node.kind === 'elite') {
    const units = [spawnUnit(ACT_ELITES[pool.elite]), spawnUnit(ENEMY_ROSTER[sample(pool.cheap)])];
    return { units, reward: ACT_ELITES[pool.elite].bounty };
  }
  const tier = [...COMPOSITIONS].reverse().find(entry => node.floor >= entry.minFloor) || COMPOSITIONS[0];
  const units = sample(tier.packs).flatMap(role => fillCompositionSlot(role, pool));
  if (units.length > 4) units.length = 4; // keep the battlefield legible — big mixes lose a body
  return { units, reward: units.reduce((sum, unit) => sum + unit.def.bounty, 0) };
}

function createBattle(node, encounterKey) {
  if (!['encounter', 'elite', 'joule'].includes(node.kind)) return null;
  const pack = buildPack(node);
  const maxEnergy = 3 + (ownsReward('discovery', 'deep-reserves') ? 1 : 0);
  const turnEnergy = maxEnergy + (ownsReward('artifact', 'emergency-capacitor') ? 1 : 0);
  const battle = { balanceVersion: BATTLE_BALANCE_VERSION, kind: node.kind, round: 0, target: 0, hint: null, reward: pack.reward, questions: drawBattleQuestions(encounterKey, node), units: pack.units,
    drawPile: [...(state.deck || starterDeck())].sort(() => Math.random() - .5), discardPile: [], hand: [], played: [], pendulumQueue: [],
    energy: turnEnergy, turnEnergy, maxEnergy, phase: 'question', roundMultiplier: 1, damping: 0, retainBlock: false, resonating: false, nextTurnEnergy: 0, lastTaken: 0, block: ownsReward('artifact', 'calibrated-compass') ? 4 : 0 };
  battle.hand = battle.drawPile.splice(0, HAND_SIZE);
  return battle;
}

function unitName(battle, index) {
  const unit = battle.units[index];
  const twins = battle.units.filter(other => other.id === unit.id).length > 1;
  return `${unit.def.name}${twins ? ` ${battle.units.slice(0, index + 1).filter(other => other.id === unit.id).length}` : ''}`;
}

function battleActors() {
  if (!state.battle) return '';
  ensureIconDefs();
  const battle = hydrateUnits(state.battle);
  const units = battle.units.map((unit, index) => {
    const defeated = unit.hp <= 0;
    const name = unitName(battle, index);
    const intent = unitIntent(unit);
    const swarm = unit.def.swarm || 1;
    const art = unit.def.art
      ? swarm > 1
        ? Array.from({ length: swarm }, (_, swarmIndex) => `<img src="${unit.def.art}" alt="${swarmIndex ? '' : name}"${swarmIndex ? ' aria-hidden="true"' : ''}>`).join('')
        : `<img src="${unit.def.art}" alt="${name}">`
      : `<span class="unit-glyph shape-${unit.def.shape || 'blob'}" style="--unit-hue:${unit.def.hue ?? 40}" aria-hidden="true">${unit.def.mark}</span>`;
    return `<button type="button" class="enemy-unit ${unit.def.art ? 'enemy-art-unit' : 'enemy-glyph-unit'}${swarm > 1 ? ' enemy-swarm-unit' : ''}${defeated ? ' is-defeated' : ''}${unit.shield ? ' is-shielded' : ''}${unit.def.hover && !defeated ? ' is-hovering' : ''}" style="--enemy-scale:${unit.def.scale || 1};--hover:${unit.def.hover || 0}px" data-enemy="${index}"${defeated ? ' disabled' : ''} aria-label="${name}, ${unit.hp} of ${unit.maxHp} health">
      <span class="intent-pip is-${intent.kind}" aria-hidden="true">${intentLabel(intent)}</span>
      <span class="unit-art${swarm > 1 ? ' swarm-art' : ''}">${art}</span>
      <b>${name}</b>
      <span class="hp-wrap"><span class="block-badge enemy-shield-badge${unit.shield && !defeated ? '' : ' hidden'}" title="Shielded — absorbs the next hit"></span><span class="enemy-health"><i style="width:${unit.hp / unit.maxHp * 100}%"></i></span></span>
      <small>${unit.hp}/${unit.maxHp}</small>
    </button>`;
  }).join('');
  return `<section class="battle-field" data-battle-kind="${battle.kind}" aria-label="Battlefield">
    <div class="player-combatant"><img src="assets/student-determined-v3-cutout.webp" alt="Explorer ready for battle"><div class="fighter-readout"><b>Explorer</b><div class="fighter-vitals"><span class="fighter-action-preview hidden" data-battle-action-preview aria-label="No action selected"><svg class="preview-shield" viewBox="0 0 24 27" aria-hidden="true"><path d="M12 1.5 21 5v7.2c0 6.1-3.7 10.4-9 13.1-5.3-2.7-9-7-9-13.1V5Z"/></svg><svg class="preview-attack sword-preview" viewBox="0 0 20 27" aria-hidden="true"><path d="M10 .9 13.5 5.1 V15.3 H6.5 V5.1 Z" fill="url(#jam-sword-grad)" stroke="#161b1d" stroke-width="1.1" stroke-linejoin="round"/><path d="M10 2.8 V15.3" stroke="rgba(255,255,255,.45)" stroke-width="1"/><rect x="2.4" y="15.3" width="15.2" height="2.8" rx="1.4" fill="#c9a653" stroke="#161b1d" stroke-width=".8"/><rect x="8.4" y="18.1" width="3.2" height="5.7" rx="1.3" fill="#7a5a2e" stroke="#161b1d" stroke-width=".8"/><circle cx="10" cy="25.2" r="1.8" fill="#c9a653" stroke="#161b1d" stroke-width=".8"/></svg><b></b></span><span class="hp-wrap"><span class="block-badge hidden" data-battle-block title="Block — absorbs incoming damage this exchange"><b>0</b></span><div class="fighter-health"><i data-battle-player-bar style="width:${state.health / state.maxHealth * 100}%"></i><i class="health-ghost hidden" data-battle-incoming aria-hidden="true"></i><small data-battle-player-health>${state.health}/${state.maxHealth}</small></div><span class="incoming-tag hidden" data-battle-incoming-label></span></span></div></div></div>
    <div class="enemy-side">
      <div class="enemy-pack" id="enemy-pack">${units}</div>
    </div>
  </section>`;
}

function locationSessionFor(node, resume) {
  if (resume && state.locationSession?.node === node.id) return;
  state.locationSession = { node: node.id, phase: 0, mistakes: 0 };
}

function refreshLocationPanel(node = nodes.find(item => item.id === state.activeNode)) {
  const panel = document.querySelector('.location-action-panel');
  if (!panel || !node) return;
  panel.innerHTML = `${locationActivity(node, encounters[node.encounter])}
    <div class="outcome hidden" id="outcome"></div>
    <div class="continue-row hidden" id="continue-row"><button class="primary" id="continue">Return to the trail</button></div>`;
  document.querySelectorAll('[data-location-action]').forEach(button => button.addEventListener('click', () => resolveLocationAction(button.dataset.locationAction)));
}

function startEncounter(id, resume = false) {
  document.onkeydown = null;
  if (id === 'boss' && !state.beats.bossIntro) {
    state.beats.bossIntro = true;
    const bossScene = state.act === 1 ? 'bossIntro' : `bossIntro${state.act}`;
    return playCutscene(bossScene, () => startEncounter(id, resume));
  }
  const node = nodes.find(item => item.id === id);
  state.activeNode = id;
  state.encounter = node.encounter;
  if (!['encounter', 'elite', 'joule'].includes(node.kind)) locationSessionFor(node, resume);
  if (!resume) state.battle = createBattle(node, node.encounter);
  else if (state.health <= 0) return renderEnd(false);
  else normalizeBattle(state.battle, encounters[node.encounter], node);
  let e = encounters[node.encounter];
  if (!state.battle) {
    // Keep one act-appropriate question ready for any journal event that uses the shared quiz fallback.
    state.drawnQuestion = pickQuestions(ENCOUNTER_TOPICS[node.encounter] || null, 1, levelsForNode(node))[0];
    e = { ...e, question: state.drawnQuestion.question, answers: state.drawnQuestion.answers, correct: state.drawnQuestion.correct };
  }
  saveRun();
  const journal = journalKinds.includes(node.kind);
  app.innerHTML = `<section class="screen encounter-screen"><div class="encounter location-${node.kind}${journal ? ' journal-location' : ''}">
    ${hud()}
    <main class="location-stage">
      <div class="scene"><div class="scene-shade"></div>${journal ? `<div class="scene-ambient" aria-hidden="true">${ambientHTML(locationAmbience[node.kind])}</div>` : ''}<div class="scene-copy"><h1>${e.title}</h1><p>${e.story}</p></div></div>
      ${battleActors()}
      <section class="challenge location-action-panel q-pop">
        ${locationActivity(node, e)}
        <div class="outcome hidden" id="outcome"></div>
        <div class="continue-row hidden" id="continue-row"><button class="primary" id="continue">Return to the trail</button></div>
      </section>
    </main>
  </div></section>`;
  if (['encounter', 'elite', 'joule'].includes(node.kind)) {
    const scene = document.querySelector('.location-stage>.scene');
    const arena = battleArt[Math.min(Math.max(state.act, 1), battleArt.length) - 1];
    if (scene && arena) scene.style.backgroundImage = `url('${arena}')`;
  }
  document.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => resolveAnswer(Number(btn.dataset.answer))));
  document.querySelectorAll('[data-location-action]').forEach(btn => btn.addEventListener('click', () => resolveLocationAction(btn.dataset.locationAction)));
  wireBattleAnswers();
  wireCardMode();
  wireBattleHint();
  wireHudControls();
  refreshHud();
  updateIncomingPreview();
  updateHintButton();
  if (state.battle?.won) showBattleRewards(state.battle);
  else if (resume) mountQuestionModal();
  else {
    announceBattleStart(node.kind);
    if (preferences.reducedMotion) mountQuestionModal();
    else setTimeout(() => { if (state.battle && !state.battle.won && state.battle.phase === 'question') mountQuestionModal(); }, 2200);
  }
  watchBattleArena();
  if (journal) {
    // Per-location scene art lights up the moment its file exists; the shared art is the fallback.
    const scene = document.querySelector('.location-stage>.scene');
    const slot = locationArt[node.kind];
    if (scene && slot) {
      const probe = new Image();
      probe.onload = () => { scene.style.backgroundImage = `url('${slot}')`; };
      probe.src = slot;
    }
    const quip = sample(locationQuips[node.kind] || []);
  }
}

// Backfills battle fields introduced after a run was saved, so older saves resume cleanly.
function normalizeBattle(battle, encounter, node) {
  if (!battle?.units) return;
  battle.kind = battle.kind || node.kind;
  // Old Joule saves used a legacy unit id, so roster hydration never found the
  // current boss definition and left the original 8 HP blob intact.
  if (node.kind === 'joule') {
    battle.units = battle.units.slice(0, 1);
    if (!battle.units.length) battle.units.push(spawnUnit(currentBossDefinition()));
    battle.units[0].id = 'boss';
  }
  // Pre-bestiary saves stored plain hp blobs; map them onto roster entries.
  battle.units.forEach(unit => {
    if (!unit.id) unit.id = node.kind === 'elite' ? 'rhino' : node.kind === 'joule' ? 'boss' : 'baboon';
  });
  hydrateUnits(battle);
  battle.balanceVersion = BATTLE_BALANCE_VERSION;
  if (typeof battle.reward !== 'number') battle.reward = encounters[state.encounter]?.reward ?? 20;
  if (typeof battle.target !== 'number' || battle.units[battle.target]?.hp <= 0) {
    battle.target = Math.max(0, battle.units.findIndex(unit => unit.hp > 0));
  }
  if (typeof battle.hint !== 'object') battle.hint = null;
  if (!Array.isArray(battle.pendulumQueue)) battle.pendulumQueue = [];
  if (typeof battle.roundMultiplier !== 'number') battle.roundMultiplier = 1;
  battle.roundMultiplier = 1; // wrong answers now drain Energy instead of weakening cards
  battle.answering = false;
  if (!Array.isArray(battle.questions) || !battle.questions.length) battle.questions = drawBattleQuestions(state.encounter, node);
  if (battle.phase === 'question' && !battle.questions[battle.round]) {
    const fresh = pickQuestions(null, 1, levelsForNode(node))[0] || pickQuestions(null, 1, [1, 2, 3])[0];
    if (fresh) battle.questions[battle.round] = fresh;
  }
  // Pre-deck saves have no piles: deal a fresh hand from the run deck.
  if (!battle.drawPile.length && !battle.hand.length && !battle.discardPile.length) {
    battle.drawPile = [...(state.deck || starterDeck())].sort(() => Math.random() - .5);
    battle.hand = battle.drawPile.splice(0, HAND_SIZE);
    battle.phase = 'cards';
  }
}

function wireBattleAnswers() {
  document.querySelectorAll('[data-battle-answer]').forEach(button => button.addEventListener('click', () => resolveBattleAnswer(Number(button.dataset.battleAnswer))));
}

function wireBattleHint() {
  document.querySelector('#battle-hint')?.addEventListener('click', useBattleHint);
}

function useBattleHint() {
  const battle = state.battle;
  if (!battle || state.insight < 1 || battle.hint?.round === battle.round) return;
  const question = battle.questions[battle.round];
  const remove = sample(question.answers.map((_, index) => index).filter(index => index !== question.correct));
  battle.hint = { round: battle.round, eliminated: [remove] };
  state.insight -= 1;
  const button = document.querySelector(`[data-battle-answer="${remove}"]`);
  if (button) { button.disabled = true; button.classList.add('is-eliminated'); }
  refreshHud();
  updateHintButton();
  saveRun();
}

function updateHintButton() {
  const hintButton = document.querySelector('#battle-hint');
  if (!hintButton || !state?.battle) return;
  const used = state.battle.hint?.round === state.battle.round;
  const empty = state.insight < 1;
  hintButton.disabled = used || empty;
  hintButton.innerHTML = used
    ? '<b>Insight spent</b><small>One wrong answer removed this round</small>'
    : empty
      ? '<b>✦ Insight strike</b><small>No Insight remaining</small>'
      : '<b>✦ Insight strike</b><small>Spend 1 Insight · remove one wrong answer</small>';
}

function renderBattleRound() {
  const battle = hydrateUnits(state.battle);
  if (!battle) return;
  document.querySelector('#battle-next')?.remove();
  // Next exchange: fresh hand and energy, and the round's question modal.
  battle.round += 1;
  battle.discardPile.push(...battle.hand, ...battle.played);
  battle.hand = [];
  battle.played = [];
  startTurn(battle);
  // Delayed pendulum strikes land at the top of the round and may end the fight.
  if (battle.units.every(unit => unit.hp <= 0)) return settleBattleVictory(battle);
  const outcome = document.querySelector('#outcome');
  outcome.className = 'outcome hidden';
  outcome.innerHTML = '';
  updateEnemyPack();
  updateIncomingPreview();
  rerenderTrayBody();
  mountQuestionModal();
  watchBattleArena();
}

// —— Fit-to-stage: oversized elites/bosses shrink until the full lineup fits ——
// Sets --fit-scale on .battle-field; both the explorer and enemy art multiply
// their bestiary scale by it. Cards, docks and the question modal never scale.
let battleFitObserver = null;

function fitBattleActors() {
  const field = document.querySelector('.battle-field');
  if (!field) return;
  field.style.setProperty('--fit-scale', 1);
  const fieldRect = field.getBoundingClientRect();
  if (!fieldRect.height) return;
  let scale = 1;
  const fit = (height, width, availHeight, availWidth) => {
    if (height > 0 && availHeight > 0) scale = Math.min(scale, availHeight / height);
    if (width > 0 && availWidth > 0) scale = Math.min(scale, availWidth / width);
  };
  // Explorer: visual art height plus the readout stacked beneath it.
  const player = document.querySelector('.player-combatant');
  const playerArt = player?.querySelector('img');
  if (player && playerArt) {
    const artRect = playerArt.getBoundingClientRect();
    const unitRect = player.getBoundingClientRect();
    fit(artRect.height + Math.max(0, unitRect.height - playerArt.offsetHeight), artRect.width, fieldRect.height, player.clientWidth);
  }
  // Enemies: measure the *visual* sprite rect — scaled elites/bosses overflow
  // their layout box, which is exactly why they used to fall off-screen.
  const pack = document.querySelector('.enemy-pack');
  const units = pack ? [...pack.querySelectorAll('.enemy-unit')] : [];
  let totalVisualWidth = 0;
  for (const unit of units) {
    const art = unit.querySelector('.unit-glyph')
      || (unit.classList.contains('enemy-swarm-unit') ? unit.querySelector('.unit-art') : unit.querySelector('.unit-art > img'));
    if (!art) continue;
    const visual = art.getBoundingClientRect();
    const unitRect = unit.getBoundingClientRect();
    const extraH = Math.max(0, unitRect.height - art.offsetHeight);
    const hover = unit.classList.contains('is-hovering') ? parseFloat(unit.style.getPropertyValue('--hover')) || 0 : 0;
    fit(visual.height + extraH + hover, visual.width, fieldRect.height, unit.clientWidth);
    totalVisualWidth += visual.width;
  }
  if (units.length > 1) {
    const gap = parseFloat(getComputedStyle(pack).columnGap) || 0;
    const total = totalVisualWidth + gap * (units.length - 1);
    if (total > pack.clientWidth) scale = Math.min(scale, pack.clientWidth / total);
  }
  scale = Math.max(.35, scale * .97); // small breathing margin so nothing kisses the arena edge
  field.style.setProperty('--fit-scale', scale.toFixed(3));
  // Art may still be loading; measure again once it lands.
  document.querySelectorAll('.battle-field img').forEach(img => {
    if (!img.complete) img.addEventListener('load', fitBattleActors, { once: true });
  });
}

function watchBattleArena() {
  battleFitObserver?.disconnect();
  battleFitObserver = null;
  const field = document.querySelector('.battle-field');
  if (!field) return;
  // The arena resizes whenever the window does or the report panel appears,
  // so observing the field covers every layout change for free.
  battleFitObserver = new ResizeObserver(() => fitBattleActors());
  battleFitObserver.observe(field);
  fitBattleActors();
}

function updateEnemyPack() {
  const battle = hydrateUnits(state.battle);
  battle.units.forEach((unit, index) => {
    const card = document.querySelector(`[data-enemy="${index}"]`);
    if (!card) return;
    const defeated = unit.hp <= 0;
    card.classList.toggle('is-defeated', defeated);
    card.classList.toggle('is-hovering', !defeated && !!unit.def.hover);
    card.classList.toggle('is-shielded', unit.shield && !defeated);
    if (defeated) card.setAttribute('disabled', '');
    card.querySelector('.enemy-health i').style.width = `${unit.hp / unit.maxHp * 100}%`;
    card.querySelector('small').textContent = `${unit.hp}/${unit.maxHp}`;
    card.setAttribute('aria-label', `${unitName(battle, index)}, ${unit.hp} of ${unit.maxHp} health${defeated ? ', defeated' : ''}`);
    const shieldBadge = card.querySelector('.enemy-shield-badge');
    if (shieldBadge) shieldBadge.classList.toggle('hidden', !(unit.shield && !defeated));
  });
  battle.units.forEach((unit, index) => {
    const pip = document.querySelector(`[data-enemy="${index}"] .intent-pip`);
    if (!pip) return;
    const intent = unitIntent(unit);
    pip.className = `intent-pip is-${intent.kind}`;
    pip.innerHTML = intentLabel(intent);
  });
}

function spawnDamageNumber(host, text, tone) {
  if (preferences.reducedMotion || !host) return;
  const floater = document.createElement('span');
  floater.className = `damage-float damage-${tone}`;
  floater.textContent = text;
  host.appendChild(floater);
  floater.addEventListener('animationend', () => floater.remove());
}

function markEnemyHit(index, damage) {
  updateEnemyPack();
  const card = document.querySelector(`[data-enemy="${index}"]`);
  if (!card) return;
  card.classList.remove('is-hit');
  void card.offsetWidth; // restart the recoil animation on rapid repeats
  card.classList.add('is-hit');
  spawnDamageNumber(card, `−${damage}`, 'bad');
}

function playerHitFeedback(damage) {
  const fighter = document.querySelector('.player-combatant');
  if (!fighter) return;
  fighter.classList.remove('is-hit');
  void fighter.offsetWidth;
  fighter.classList.add('is-hit');
  const readout = fighter.querySelector('.fighter-readout');
  spawnDamageNumber(readout || fighter, `−${damage}`, 'bad');
  if (readout) {
    readout.classList.add('is-alarmed');
    setTimeout(() => readout.classList.remove('is-alarmed'), 900);
  }
}

function refreshBattlePlayerReadout(battle) {
  const bar = document.querySelector('[data-battle-player-bar]');
  const health = document.querySelector('[data-battle-player-health]');
  if (bar) bar.style.width = `${state.health / state.maxHealth * 100}%`;
  if (health) health.textContent = `${state.health}/${state.maxHealth}`;
  syncBlockBadge(battle);
}

// Total damage enemies currently intend — post-Weak/Damping — shown as a
// ghost segment on the explorer's health bar so defence is plannable.
function intendedEnemyDamage(battle) {
  let total = 0;
  battle.units.forEach(unit => {
    if (unit.hp <= 0) return;
    const intent = unitIntent(unit);
    if (intent.kind !== 'attack' && intent.kind !== 'drain' && intent.kind !== 'charge') return;
    const reduction = (battle.damping || 0) + (unit.weak ? unit.weak.n : 0);
    total += Math.max(0, intent.damage - reduction);
  });
  return total;
}

function updateIncomingPreview() {
  if (!state?.battle) return;
  const battle = hydrateUnits(state.battle);
  const ghost = document.querySelector('[data-battle-incoming]');
  const label = document.querySelector('[data-battle-incoming-label]');
  if (!ghost || !label) return;
  const damage = intendedEnemyDamage(battle);
  const pct = Math.min(100, damage / state.maxHealth * 100);
  ghost.style.width = `${pct}%`;
  ghost.classList.toggle('hidden', damage <= 0);
  label.innerHTML = damage > 0 ? `${SWORD_SVG}<b>${damage}</b> incoming` : '';
  label.classList.toggle('hidden', damage <= 0);
}

// One source of truth for the block badge: number, retained glow, visibility.
function syncBlockBadge(battle) {
  const badge = document.querySelector('[data-battle-block]');
  if (!badge) return;
  const block = battle ? battle.block : hydrateUnits(state.battle)?.block || 0;
  const number = badge.querySelector('b');
  if (number) number.textContent = block;
  badge.classList.toggle('hidden', !(block > 0));
  badge.classList.toggle('is-retained', !!battle?.retainBlock && block > 0);
}

function resolveUnitIntent(battle, unit, index) {
  const intent = unitIntent(unit);
  const name = unitName(battle, index);
  const result = { index, name, kind: intent.kind, damage: 0, absorbed: 0, stolen: 0 };
  if (intent.kind === 'attack' || intent.kind === 'drain') {
    const reduction = (battle.damping || 0) + (unit.weak ? unit.weak.n : 0);
    const reducedDamage = Math.max(0, intent.damage - reduction);
    result.absorbed = Math.min(battle.block, reducedDamage);
    battle.block -= result.absorbed;
    result.damage = reducedDamage - result.absorbed;
    state.health = Math.max(0, state.health - result.damage);
    if (intent.kind === 'drain') {
      result.stolen = Math.min(intent.loot, state.coins);
      state.coins -= result.stolen;
    }
    if (unit.def.moves.k === 'ramp') unit.power += unit.def.moves.growth;
  } else if (intent.kind === 'guard') unit.shield = true;
  if (unit.weak) { unit.weak.dur -= 1; if (unit.weak.dur <= 0) unit.weak = null; }
  unit.phase += 1;
  return result;
}

function enemyActionLine(action) {
  if (action.kind === 'guard') return `<strong>${action.name}</strong> braces behind a shield.`;
  if (action.kind === 'charge') return `<strong>${action.name}</strong> gathers force.`;
  if (action.kind === 'drain') return `<strong>${action.name}</strong> strikes for ${action.damage}${action.absorbed ? ` · Block absorbs ${action.absorbed}` : ''}${action.stolen ? ` · steals ${action.stolen} Supplies` : ''}.`;
  return `<strong>${action.name}</strong> strikes for ${action.damage}${action.absorbed ? ` · Block absorbs ${action.absorbed}` : ''}.`;
}

async function animateEnemyAction(action) {
  const enemy = document.querySelector(`[data-enemy="${action.index}"]`);
  if (!enemy) return;
  const className = action.kind === 'guard' ? 'is-bracing' : action.kind === 'charge' ? 'is-charging' : action.kind === 'drain' ? 'is-draining' : 'is-attacking';
  enemy.classList.add(className);
  enemy.querySelector('.intent-pip')?.classList.add('is-resolving');
  if (action.kind === 'attack' || action.kind === 'drain') {
    await new Promise(resolve => setTimeout(resolve, preferences.reducedMotion ? 0 : 260));
    if (action.damage > 0) playerHitFeedback(action.damage);
    else if (action.absorbed > 0) spawnDamageNumber(document.querySelector('.fighter-readout'), `⛨ ${action.absorbed}`, 'good');
  }
  await new Promise(resolve => setTimeout(resolve, preferences.reducedMotion ? 0 : action.kind === 'attack' || action.kind === 'drain' ? 360 : 520));
  enemy.classList.remove(className);
  enemy.querySelector('.intent-pip')?.classList.remove('is-resolving');
}

// Enemies act on the battlefield itself — no report panel, the arena never shifts.
async function resolveEnemyResponse() {
  const battle = hydrateUnits(state.battle);
  let totalTaken = 0;
  const reports = [];
  for (let index = 0; index < battle.units.length && state.health > 0; index += 1) {
    const unit = battle.units[index];
    if (unit.hp <= 0) continue;
    const action = resolveUnitIntent(battle, unit, index);
    reports.push(enemyActionLine(action));
    totalTaken += action.damage;
    await animateEnemyAction(action);
    refreshBattlePlayerReadout(battle);
    refreshHud();
    updateEnemyPack();
  }
  if (battle.damping > 0) battle.damping = Math.max(0, battle.damping - 1);
  battle.lastTaken = totalTaken;
  // Block is a per-exchange resource: once the enemy round resolves, whatever
  // survived is spent. Leftover Block visibly shatters unless Inertia holds it.
  if (battle.block > 0 && !battle.retainBlock) {
    const lost = battle.block;
    battle.block = 0;
    const badge = document.querySelector('[data-battle-block]');
    const number = badge?.querySelector('b');
    if (number) number.textContent = lost;
    if (badge && !preferences.reducedMotion) {
      badge.classList.remove('hidden', 'is-retained');
      void badge.offsetWidth; // restart the shatter animation on repeat rounds
      badge.classList.add('is-breaking');
      setTimeout(() => { badge.classList.remove('is-breaking'); refreshBattlePlayerReadout(battle); }, 540);
    } else {
      refreshBattlePlayerReadout(battle);
    }
    if (lost > 0) spawnDamageNumber(document.querySelector('.fighter-readout'), `⛨ −${lost}`, 'dim');
  } else {
    refreshBattlePlayerReadout(battle);
  }
  updateIncomingPreview();
  const stage = document.querySelector('.location-stage');
  stage?.querySelector('.battle-next-row')?.remove();
  document.querySelector('#battle-next')?.remove();
  stage?.insertAdjacentHTML('beforeend', `<div class="battle-next-row"><div class="enemy-phase-report">${reports.map(report => `<span>${report}</span>`).join('')}</div></div><button class="battle-next" id="battle-next">${state.health <= 0 ? 'See the aftermath' : 'Next exchange'}</button>`);
  refreshHud();
  saveRun();
  document.querySelector('#battle-next')?.addEventListener('click', () => {
    if (state.health <= 0) return renderEnd(false);
    document.querySelector('#battle-next')?.remove();
    document.querySelector('.battle-next-row')?.remove();
    renderBattleRound();
  });
}

function cardResolutionTarget(def, battle, targetIndex = null) {
  if (def.target === 'self') return document.querySelector('.player-combatant>img');
  if (def.target === 'all') return document.querySelector('#enemy-pack');
  const target = typeof targetIndex === 'number' && battle.units[targetIndex]?.hp > 0 ? targetIndex
    : battle.units[battle.target]?.hp > 0 ? battle.target : Math.max(0, firstLiving(battle));
  return document.querySelector(`[data-enemy="${target}"]`);
}

// The ghost snapshot of the played card dives into its target. The rest of
// the hand, energy and readouts stay exactly where they are.
function animateCardPlay(ghost, targetEl) {
  return new Promise(resolve => {
    const finish = () => {
      targetEl?.classList.remove('is-card-focus');
      ghost?.remove();
      resolve();
    };
    if (!ghost || !targetEl || preferences.reducedMotion) return finish();
    targetEl.classList.add('is-card-focus');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const to = targetEl.getBoundingClientRect();
      const from = ghost.getBoundingClientRect();
      ghost.style.setProperty('--play-x', `${to.left + to.width / 2 - from.left - from.width / 2}px`);
      ghost.style.setProperty('--play-y', `${to.top + to.height / 2 - from.top - from.height / 2}px`);
      ghost.classList.add('is-playing');
    }));
    setTimeout(finish, 430);
  });
}

function uniqueRewardCards(pool, count, picks = []) {
  const available = pool.filter(def => !picks.includes(def));
  while (picks.length < count && available.length) picks.push(available.splice(Math.floor(Math.random() * available.length), 1)[0]);
  return picks;
}

function battleCardRewardChoices(battle) {
  const act = state.act || 1;
  const extra = ownsReward('artifact', 'surveyors-lens') ? 1 : 0;
  if (battle.kind === 'joule') return uniqueRewardCards(cardPool(act, ['rare']), 3);
  if (battle.kind === 'elite') return uniqueRewardCards(cardPool(act), 3 + extra, uniqueRewardCards(cardPool(act, ['rare']), 1));
  return cardRewardChoices(act, 3 + extra);
}

function prepareBattleRewards(battle) {
  if (battle.rewardPrepared) return;
  if (!Array.isArray(state.artifacts)) state.artifacts = [];
  if (!Array.isArray(state.discoveries)) state.discoveries = [];
  battle.rewardChoices = battleCardRewardChoices(battle).map(def => def.id);
  if (ownsReward('artifact', 'stability-coil')) state.health = Math.min(state.maxHealth, state.health + 4);
  if (ownsReward('discovery', 'prismatic-index')) state.insight += 1;
  const fieldFindChance = [.45, .36, .3][Math.min(Math.max(state.act || 1, 1), 3) - 1];
  const fieldStability = [8, 7, 6][Math.min(Math.max(state.act || 1, 1), 3) - 1];
  if (battle.kind === 'encounter' && Math.random() < fieldFindChance) {
    battle.fieldFind = Math.random() < .55 ? { kind: 'insight', amount: 1 } : { kind: 'stability', amount: fieldStability };
    if (battle.fieldFind.kind === 'insight') state.insight += battle.fieldFind.amount;
    else state.health = Math.min(state.maxHealth, state.health + battle.fieldFind.amount);
  }
  if (battle.kind === 'elite') {
    const available = FIELD_ARTIFACTS.filter(item => !ownsReward('artifact', item.id));
    if (available.length) battle.artifactOffer = sample(available).id;
    else { battle.fieldFind = { kind: 'insight', amount: 2 }; state.insight += 2; }
  }
  if (battle.kind === 'joule') {
    battle.discoveryChoices = MAJOR_DISCOVERIES.filter(item => !ownsReward('discovery', item.id)).map(item => item.id);
    if (!battle.discoveryChoices.length) battle.discoveryChoices = MAJOR_DISCOVERIES.map(item => item.id);
  }
  battle.rewardPrepared = true;
}

function battleRewardsComplete(battle) {
  return typeof battle.rewardPicked === 'string'
    && (!battle.artifactOffer || battle.artifactClaimed)
    && (!battle.discoveryChoices?.length || !!battle.discoveryPicked);
}

function battleRewardModalHTML(battle) {
  const reward = battle.reward ?? encounters[state.encounter]?.reward ?? 0;
  const picked = battle.rewardPicked;
  const cardDecided = typeof picked === 'string';
  const choices = (battle.rewardChoices || []).map(cardDef).filter(Boolean);
  const findHTML = battle.fieldFind ? `<div class="reward-field-find"><span>${battle.fieldFind.kind === 'insight' ? '◉' : '⛨'}</span><div><small>Field find</small><strong>+${battle.fieldFind.amount} ${battle.fieldFind.kind === 'insight' ? 'Insight' : 'Stability'}</strong></div></div>` : '';
  const artifact = rewardDefinition('artifact', battle.artifactOffer);
  const artifactHTML = artifact ? `<section class="reward-special-section"><small>Elite field artifact</small><article class="reward-special-item${battle.artifactClaimed ? ' is-claimed' : ''}"><span>${artifact.mark}</span><div><b>${artifact.name}</b><p>${artifact.text}</p></div><button type="button" data-reward-artifact="${artifact.id}"${battle.artifactClaimed ? ' disabled' : ''}>${battle.artifactClaimed ? 'Claimed' : 'Claim artifact'}</button></article></section>` : '';
  const discoveries = (battle.discoveryChoices || []).map(id => rewardDefinition('discovery', id)).filter(Boolean);
  const discoveryHTML = discoveries.length ? `<section class="reward-special-section reward-discovery-section"><small>Choose one Major Discovery</small><div class="reward-discovery-options">${discoveries.map(item => `<button type="button" class="reward-discovery${battle.discoveryPicked === item.id ? ' is-selected' : battle.discoveryPicked ? ' is-unselected' : ''}" data-reward-discovery="${item.id}"${battle.discoveryPicked ? ' disabled' : ''}><span>${item.mark}</span><b>${item.name}</b><small>${item.text}</small></button>`).join('')}</div></section>` : '';
  const cardHeading = cardDecided ? (picked === 'skip' ? 'Card reward skipped' : `${cardDef(picked)?.name || 'Card'} claimed`) : battle.kind === 'joule' ? 'Choose one rare card' : battle.kind === 'elite' ? 'Choose one card · improved rarity' : 'Choose one card';
  const choiceHTML = `<div class="reward-card-section"><small>${cardHeading}</small><div class="reward-card-options">${choices.map(def => `<button type="button" class="card-tile card-type-${def.type}${picked === def.id ? ' is-selected' : cardDecided ? ' is-unselected' : ''}" data-reward-card="${def.id}"${cardDecided ? ' disabled' : ''}><span class="card-cost"><small>Cost:</small> ${energyCostMarks(def.cost)}</span><b class="card-name">${def.name}</b><span class="card-type">${def.type === 'attack' ? '⚔ Attack' : def.type === 'skill' ? '⛨ Skill' : '✦ Power'}</span><span class="card-text">${def.text}</span><span class="card-topic">${def.topic || 'any topic'}</span></button>`).join('')}</div></div>
    <button type="button" class="reward-skip${picked === 'skip' ? ' is-selected' : cardDecided ? ' is-unselected' : ''}" data-reward-card="skip"${cardDecided ? ' disabled' : ''}>${picked === 'skip' ? 'Card reward skipped' : 'Skip card reward'}</button>`;
  return `<div class="battle-reward-overlay" id="battle-reward-overlay" role="dialog" aria-modal="true" aria-labelledby="reward-title">
    <section class="battle-reward-modal reward-kind-${battle.kind}">
      <small class="reward-kicker">${battle.kind === 'joule' ? 'Guardian defeated' : battle.kind === 'elite' ? 'Elite cleared' : 'Encounter cleared'}</small>
      <h2 id="reward-title">Victory</h2>
      <div class="reward-summary-row"><div class="reward-supplies"><span aria-hidden="true">◉</span><div><small>Supplies recovered</small><strong>+${reward}</strong></div></div>${findHTML}</div>
      ${artifactHTML}${discoveryHTML}${choiceHTML}
    </section>
    <button type="button" class="reward-continue${battleRewardsComplete(battle) ? ' is-ready' : ''}" id="reward-continue"${battleRewardsComplete(battle) ? '' : ' disabled'}>Continue run</button>
  </div>`;
}

function syncBattleRewardModal(battle) {
  const cardDecided = typeof battle.rewardPicked === 'string';
  document.querySelectorAll('[data-reward-card]').forEach(option => {
    option.disabled = cardDecided;
    option.classList.toggle('is-selected', option.dataset.rewardCard === battle.rewardPicked);
    option.classList.toggle('is-unselected', cardDecided && option.dataset.rewardCard !== battle.rewardPicked);
  });
  const cardHeading = document.querySelector('.reward-card-section>small');
  if (cardHeading && cardDecided) cardHeading.textContent = battle.rewardPicked === 'skip' ? 'Card reward skipped' : `${cardDef(battle.rewardPicked)?.name || 'Card'} claimed`;
  const skip = document.querySelector('.reward-skip');
  if (skip && battle.rewardPicked === 'skip') skip.textContent = 'Card reward skipped';
  const artifactButton = document.querySelector('[data-reward-artifact]');
  if (artifactButton && battle.artifactClaimed) {
    artifactButton.disabled = true;
    artifactButton.textContent = 'Claimed';
    artifactButton.closest('.reward-special-item')?.classList.add('is-claimed');
  }
  document.querySelectorAll('[data-reward-discovery]').forEach(option => {
    option.disabled = !!battle.discoveryPicked;
    option.classList.toggle('is-selected', option.dataset.rewardDiscovery === battle.discoveryPicked);
    option.classList.toggle('is-unselected', !!battle.discoveryPicked && option.dataset.rewardDiscovery !== battle.discoveryPicked);
  });
  const continueButton = document.querySelector('#reward-continue');
  const rewardsComplete = battleRewardsComplete(battle);
  if (continueButton) {
    continueButton.disabled = !rewardsComplete;
    continueButton.classList.toggle('is-ready', rewardsComplete);
  }
  if (rewardsComplete) continueButton?.focus();
}

function showBattleRewards(battle) {
  prepareBattleRewards(battle);
  refreshHud();
  saveRun();
  document.querySelector('#battle-reward-overlay')?.remove();
  document.body.insertAdjacentHTML('beforeend', battleRewardModalHTML(battle));
  const overlay = document.querySelector('#battle-reward-overlay');
  requestAnimationFrame(() => overlay?.classList.add('is-visible'));
  document.querySelectorAll('[data-reward-card]').forEach(button => button.addEventListener('click', () => {
    if (typeof battle.rewardPicked === 'string') return;
    const pick = button.dataset.rewardCard;
    battle.rewardPicked = pick;
    if (pick !== 'skip') state.deck.push(cardInstance(pick));
    saveRun();
    document.querySelectorAll('[data-reward-card]').forEach(option => {
      option.disabled = true;
      option.classList.toggle('is-selected', option.dataset.rewardCard === pick);
      option.classList.toggle('is-unselected', option.dataset.rewardCard !== pick);
    });
    const heading = document.querySelector('.reward-card-section>small');
    if (heading) heading.textContent = pick === 'skip' ? 'Card reward skipped' : `${cardDef(pick)?.name || 'Card'} claimed`;
    if (pick === 'skip') button.textContent = 'Card reward skipped';
    syncBattleRewardModal(battle);
  }));
  document.querySelector('[data-reward-artifact]')?.addEventListener('click', event => {
    if (battle.artifactClaimed) return;
    const id = event.currentTarget.dataset.rewardArtifact;
    if (!state.artifacts.includes(id)) state.artifacts.push(id);
    battle.artifactClaimed = true;
    saveRun();
    syncBattleRewardModal(battle);
  });
  document.querySelectorAll('[data-reward-discovery]').forEach(button => button.addEventListener('click', () => {
    if (battle.discoveryPicked) return;
    const id = button.dataset.rewardDiscovery;
    battle.discoveryPicked = id;
    const isNew = !state.discoveries.includes(id);
    if (isNew) state.discoveries.push(id);
    if (isNew && id === 'reinforced-notebook') { state.maxHealth += 10; state.health = Math.min(state.maxHealth, state.health + 10); refreshHud(); }
    saveRun();
    syncBattleRewardModal(battle);
  }));
  document.querySelector('#reward-continue')?.addEventListener('click', () => {
    if (!battleRewardsComplete(battle)) return;
    state.pendingCompletion = true;
    saveRun();
    overlay?.classList.add('is-leaving');
    if (preferences.reducedMotion) finishEncounter();
    else setTimeout(finishEncounter, 180);
  });
  (document.querySelector('[data-reward-artifact]:not(:disabled),[data-reward-discovery]:not(:disabled),[data-reward-card]:not(:disabled)') || document.querySelector('#reward-continue'))?.focus();
}

// Executes one card. `mult` is 1 on a correct answer, 1/3 on a miss;
// `targetIndex` is the enemy the card was dropped on (null for self/all cards).
function applyCardEffect(instance, mult, targetIndex = null) {
  const battle = hydrateUnits(state.battle);
  const def = cardDef(instance.id);
  if (!def) return '';
  const effects = battle.resonating && def.effect.k !== 'resonance' ? [1, 1] : [1];
  if (battle.resonating && def.effect.k !== 'resonance') battle.resonating = false;
  let report = '';
  for (const pass of effects) {
    const e = def.effect;
    const up = instance.upgraded;
    const target = typeof targetIndex === 'number' && battle.units[targetIndex]?.hp > 0 ? targetIndex
      : battle.units[battle.target]?.hp > 0 ? battle.target : Math.max(0, firstLiving(battle));
    const targetName = unitName(battle, target);
    const scaled = value => Math.floor(value * mult * pass);
    switch (e.k) {
      case 'damage': {
        const damage = scaled(up ? e.up : e.n);
        if (battle.units[target].shield) { battle.units[target].shield = false; report += `${def.name}: ${targetName}’s shield shatters. `; }
        else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); report += `${def.name}: ${damage} damage to ${targetName}. `; }
        break;
      }
      case 'sweep': {
        let broken = 0;
        battle.units.forEach((unit, index) => {
          if (unit.hp <= 0) return;
          if (unit.shield) { unit.shield = false; broken += 1; }
          else { dealToEnemy(battle, index, scaled(up ? e.up : e.n)); markEnemyHit(index, scaled(up ? e.up : e.n)); }
        });
        report += `${def.name}: ${scaled(up ? e.up : e.n)} damage to every enemy${broken ? `, ${broken} shield${broken > 1 ? 's' : ''} shattered` : ''}. `;
        break;
      }
      case 'block': {
        const gained = scaled(up ? e.up : e.n);
        battle.block = Math.min(30, battle.block + gained);
        report += `${def.name}: ⛨ Block ${battle.block}. `;
        break;
      }
      case 'insight': {
        const n = scaled(up ? e.up : e.n);
        dealToEnemy(battle, target, Math.max(1, n));
        markEnemyHit(target, Math.max(1, n));
        state.insight += n;
        report += `${def.name}: ${Math.max(1, n)} damage, +${n} Insight. `;
        break;
      }
      case 'thirdlaw': {
        const damage = Math.max(0, scaled(battle.lastTaken + (up ? e.up : 0)));
        if (damage > 0) { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); report += `${def.name}: every action — ${damage} damage to ${targetName}. `; }
        else report += `${def.name}: nothing to return yet. `;
        break;
      }
      case 'conserve': {
        const stored = battle.block;
        if (stored > 0) {
          const damage = scaled(stored);
          dealToEnemy(battle, target, damage);
          markEnemyHit(target, damage);
          battle.block = up ? Math.floor(battle.block / 2) : 0;
          report += `${def.name}: ${damage} stored energy released at ${targetName}. `;
        } else report += `${def.name}: no stored energy to release. `;
        break;
      }
      case 'damping': {
        battle.damping = Math.max(battle.damping, (up ? e.up : e.n));
        report += `${def.name}: enemy blows dulled by ${up ? e.up : e.n}. `;
        break;
      }
      case 'friction': {
        const unit = battle.units[target];
        if (unit && unit.hp > 0) { unit.weak = { n: up ? e.up : e.n, dur: up ? 3 : 2 }; report += `${def.name}: ${targetName} weakened. `; }
        break;
      }
      case 'torque': {
        const unit = battle.units[target];
        const base = scaled(up ? e.up : e.n);
        const damage = unit?.shield ? base * 2 : base;
        if (unit?.shield) unit.shield = false;
        dealToEnemy(battle, target, damage);
        markEnemyHit(target, damage);
        report += `${def.name}: ${damage} damage${unit?.shield === false ? ' — levered straight through the shield' : ''}. `;
        break;
      }
      case 'resonance': {
        battle.resonating = true;
        report += `${def.name}: your next card hums at twice the amplitude. `;
        break;
      }
      case 'inertia': {
        battle.retainBlock = true;
        report += `${def.name}: your Block will not be moved. `;
        break;
      }
      case 'pendulum': {
        const now = up ? e.up : e.n;
        const mid = up ? e.upMid : e.mid;
        const damage = scaled(now);
        dealToEnemy(battle, target, damage);
        markEnemyHit(target, damage);
        if (mult === 1) battle.pendulumQueue.push(mid, now);
        report += `${def.name}: ${damage} damage — the swing will come back. `;
        break;
      }
      case 'potential': {
        const gained = scaled(up ? e.up : e.n);
        battle.block = Math.min(30, battle.block + gained);
        drawCards(battle, 1);
        report += `${def.name}: ⛨ Block ${battle.block}, one card drawn. `;
        break;
      }
      case 'damage_block': {
        const damage = scaled(up ? e.up : e.n);
        const gained = scaled(up ? e.upB : e.b);
        if (battle.units[target].shield) battle.units[target].shield = false;
        else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); }
        battle.block = Math.min(30, battle.block + gained);
        report += `${def.name}: ${damage} damage, ⛨ Block ${battle.block}. `;
        break;
      }
      case 'block_draw': {
        const gained = scaled(up ? e.up : e.n);
        battle.block = Math.min(30, battle.block + gained);
        drawCards(battle, e.draw);
        report += `${def.name}: ⛨ Block ${battle.block}, ${e.draw} card${e.draw > 1 ? 's' : ''} drawn. `;
        break;
      }
      case 'damage_draw': {
        const damage = scaled(up ? e.up : e.n);
        if (battle.units[target].shield) battle.units[target].shield = false;
        else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); }
        drawCards(battle, e.draw);
        report += `${def.name}: ${damage} damage, ${e.draw} card drawn. `;
        break;
      }
      case 'multi': {
        const damage = scaled(up ? e.up : e.n);
        const hits = up ? e.upHits : e.hits;
        let landed = 0;
        for (let hit = 0; hit < hits && battle.units[target]?.hp > 0; hit += 1) {
          if (battle.units[target].shield) battle.units[target].shield = false;
          else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); landed += 1; }
        }
        report += `${def.name}: ${damage} damage × ${landed}${landed < hits ? ', shield shattered' : ''}. `;
        break;
      }
      case 'damage_weak': {
        const unit = battle.units[target];
        const damage = scaled(up ? e.up : e.n);
        const weak = Math.max(1, scaled(up ? e.upWeak : e.weak));
        if (unit.shield) unit.shield = false;
        else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); }
        if (unit.hp > 0) unit.weak = { n: weak, dur: e.dur };
        report += `${def.name}: ${damage} damage, ${targetName} weakened by ${weak}. `;
        break;
      }
      case 'next_energy': {
        const energy = scaled(up ? e.up : e.n);
        battle.nextTurnEnergy += energy;
        drawCards(battle, e.draw);
        report += `${def.name}: +${energy} Energy next turn, ${e.draw} card drawn. `;
        break;
      }
      case 'execute': {
        const unit = battle.units[target];
        const base = scaled(up ? e.up : e.n);
        const damage = unit.hp < unit.maxHp / 2 ? base * 2 : base;
        if (unit.shield) unit.shield = false;
        else { dealToEnemy(battle, target, damage); markEnemyHit(target, damage); }
        report += `${def.name}: ${damage} damage${damage > base ? ' — escape threshold broken' : ''}. `;
        break;
      }
      default: break;
    }
  }
  if (battle.units[battle.target]?.hp <= 0) battle.target = Math.max(0, battle.units.findIndex(alive => alive.hp > 0));
  return report;
}

async function resolveBattleAnswer(choice) {
  const battle = hydrateUnits(state.battle);
  if (!battle || battle.phase !== 'question' || battle.answering) return;
  battle.answering = true;
  const question = battle.questions[battle.round];
  const correct = choice === question.correct;
  document.querySelectorAll('#battle-question-overlay [data-battle-answer]').forEach(button => {
    button.disabled = true;
    if (Number(button.dataset.battleAnswer) === question.correct) button.classList.add('is-correct');
  });
  if (!correct) document.querySelector(`#battle-question-overlay [data-battle-answer="${choice}"]`)?.classList.add('is-wrong');
  const hintButton = document.querySelector('#battle-hint');
  if (hintButton) hintButton.disabled = true;

  // The answer is the exchange's attack roll: a correct answer charges the
  // exchange at full force; a miss drains Energy — the penalty grows each act.
  battle.roundMultiplier = 1;
  let energyLost = 0;
  if (correct) {
    state.streak += 1;
  } else {
    state.streak = 0;
    state.grudge = (state.grudge || 0) + 1;
    energyLost = Math.min(battle.energy, 1 + (state.act || 1));
    battle.energy = Math.max(0, battle.energy - energyLost);
  }
  const verdict = document.querySelector('#battle-question-verdict');
  if (verdict) {
    verdict.innerHTML = correct
      ? '<strong>Correct — your plays land at full force this exchange.</strong>'
      : `<strong>Incorrect — you fumble the theory and lose ${energyLost} Energy this exchange.</strong>`;
    verdict.classList.remove('hidden');
    verdict.classList.toggle('verdict-good', correct);
    verdict.classList.toggle('verdict-bad', !correct);
  }
  refreshHud();
  saveRun();
  await new Promise(resolve => setTimeout(resolve, preferences.reducedMotion ? 150 : 1100));

  // Legacy saves committed cards before asking; resolve them now, then open
  // the card phase as usual.
  if (battle.played.length) {
    for (let slot = 0; slot < battle.played.length; slot += 1) applyCardEffect(battle.played[slot], battle.roundMultiplier);
    battle.discardPile.push(...battle.played);
    battle.played = [];
    updateEnemyPack();
    updateIncomingPreview();
    if (battle.units.every(unit => unit.hp <= 0)) {
      dismissQuestionModal();
      return settleBattleVictory(battle);
    }
  }
  dismissQuestionModal(() => beginCardPhase(battle));
}

function showEncounterContinue() {
  const row = document.querySelector('#continue-row');
  const button = document.querySelector('#continue');
  const screen = document.querySelector('.encounter-screen');
  if (!row || !button || !screen) return;
  row.classList.remove('hidden');
  button.classList.add('viewport-continue');
  button.addEventListener('click', finishEncounter);
  screen.appendChild(button);
}

function resolveLocationAction(action) {
  document.querySelectorAll('[data-location-action]').forEach(button => { button.disabled = true; });
  const outcome = document.querySelector('#outcome');
  outcome.classList.remove('hidden');

  const finish = (tone, message) => {
    outcome.className = `outcome outcome-${tone}`;
    outcome.innerHTML = message;
    showEncounterContinue();
    state.pendingCompletion = true;
    refreshHud();
    saveRun();
  };
  const stay = (tone, message) => {
    const node = nodes.find(item => item.id === state.activeNode);
    refreshHud();
    saveRun();
    refreshLocationPanel(node);
    const nextOutcome = document.querySelector('#outcome');
    nextOutcome.className = `outcome outcome-${tone}`;
    nextOutcome.innerHTML = message;
  };
  // Rolled outcomes get a beat of theatre first; state changes apply when the reveal lands,
  // so a reload mid-suspense simply rewinds the whole attempt.
  const gamble = (suspense, roll) => {
    outcome.className = 'outcome outcome-pending';
    outcome.innerHTML = `<em>${suspense}</em>`;
    setTimeout(() => {
      const [tone, message] = roll();
      finish(tone, message);
    }, 950);
  };

  if (action.startsWith('hazard-')) {
    const challenge = hazardChallenges[state.encounter] || hazardChallenges.river;
    const correct = Number(action.slice(7)) === challenge.correct;
    if (correct) {
      state.coins += encounters[state.encounter].reward;
      return finish('good', `<strong>Route committed — +${encounters[state.encounter].reward} Supplies.</strong><br>The movement works. The hazard continues looking dangerous somewhere behind you.`);
    }
    const damage = encounters[state.encounter].damage;
    state.health = Math.max(0, state.health - damage);
    state.grudge = (state.grudge || 0) + 1;
    return finish('bad', `<strong>The vector disagrees — −${damage} Stability.</strong><br>${encounters[state.encounter].lose}`);
  }

  if (action.startsWith('ruin-')) {
    const session = state.locationSession;
    const stage = ruinStages[session.phase];
    const correct = Number(action.slice(5)) === stage.correct;
    if (!correct) {
      session.mistakes += 1;
      state.health = Math.max(0, state.health - 5);
    }
    session.phase += 1;
    if (session.phase < ruinStages.length) {
      return stay(correct ? 'good' : 'bad', correct
        ? '<strong>The ring settles into alignment.</strong><br>The motion transfers deeper into the machine.'
        : '<strong>The ring bites back — −5 Stability.</strong><br>It eventually settles, although not with dignity.');
    }
    const reward = Math.max(10, 32 - session.mistakes * 7);
    state.coins += reward;
    if (session.mistakes === 0) state.insight += 1;
    return finish(session.mistakes ? 'bad' : 'good', `<strong>Mechanism opened — +${reward} Supplies${session.mistakes ? '' : ' and +1 Insight'}.</strong><br>${session.mistakes ? 'The machine accepts the solution with several mechanical objections.' : 'All three rings lock into one quiet, exact line.'}`);
  }

  if (action === 'cache-supplies') {
    state.coins += 38;
    return finish('good', '<strong>Provision cache opened — +38 Supplies.</strong><br>The brass seals split and a remarkably practical fortune rolls out.');
  }
  if (action === 'cache-relic') {
    if (!state.charmOwned) {
      state.charmOwned = true;
      state.maxHealth += 5;
      state.health += 5;
      return finish('good', '<strong>Warding charm recovered — +5 maximum Stability.</strong><br>The jungle appears marginally less confident about hitting you.');
    }
    state.insight += 2;
    return finish('good', '<strong>Resonant compass recovered — +2 Insight.</strong><br>Its needle points toward whichever mistake you were about to make.');
  }
  if (action === 'cache-card') {
    const rares = cardPool(state.act || 1).filter(card => card.rarity === 'rare');
    const card = sample(rares.length ? rares : cardPool(state.act || 1));
    if (card) state.deck.push(cardInstance(card.id));
    return finish('good', `<strong>${card?.name || 'Technique'} recovered.</strong><br>A new technique slides into your field deck.`);
  }

  if (action === 'recover') {
    const restored = Math.min(actRestRecovery(), state.maxHealth - state.health);
    state.health += restored;
    return finish('good', `<strong>Stability restored by ${restored}.</strong><br>The stones hold while you catch your breath.`);
  }
  if (action === 'prepare') {
    state.insight += 1;
    return finish('good', '<strong>Insight gained.</strong><br>One diagram is labelled “obvious”. It becomes obvious after twelve minutes.');
  }
  if (action === 'sharpen') {
    // Sharpening shows the deck instead of finishing: pick a card to upgrade.
    const candidates = (state.deck || []).map((instance, index) => ({ instance, index })).filter(entry => !entry.instance.upgraded && cardDef(entry.instance.id));
    if (!candidates.length) return finish('good', '<strong>Nothing left to sharpen.</strong><br>Every card in your deck is already at full precision. Jamnani approves.');
    document.querySelector('.location-action-panel')?.classList.add('is-sharpening');
    outcome.className = 'outcome outcome-good';
    outcome.innerHTML = `<strong>Sharpen one card.</strong><div class="deck-grid sharpen-deck-grid" id="deck-view" tabindex="0" aria-label="Cards available to sharpen">${candidates.map(entry => cardTile(entry.instance, { playable: true, attr: `data-upgrade-card="${entry.index}"` })).join('')}</div>`;
    document.querySelectorAll('[data-upgrade-card]').forEach(button => button.addEventListener('click', () => {
      const instance = state.deck[Number(button.dataset.upgradeCard)];
      instance.upgraded = true;
      const def = cardDef(instance.id);
      outcome.innerHTML = `<strong>${def.name}+ sharpened.</strong><br>${def.up} The edge is theoretical. The results are not.`;
      showEncounterContinue();
      state.pendingCompletion = true;
      saveRun();
    }));
    return;
  }
  if (action.startsWith('buy-card:')) {
    const cardId = action.slice('buy-card:'.length);
    const def = cardDef(cardId);
    if (!def) return finish('bad', '<strong>The trader mishears you completely.</strong><br>Nothing changes hands. Nobody speaks of it again.');
    const price = shopPrice({ base: def.rarity === 'rare' ? 45 : 28 });
    if (state.coins < price) return stay('bad', `<strong>Not enough Supplies for ${def.name}.</strong><br>The trader leaves it on the counter, pointedly.`);
    state.coins -= price;
    state.deck.push(cardInstance(cardId));
    state.shopStock = (state.shopStock || []).filter(entry => entry !== `card:${cardId}`);
    return stay('good', `<strong>${def.name} acquired — ${price} Supplies.</strong><br>The trader quietly replaces the empty space with nothing.`);
  }
  if (action.startsWith('buy-')) {
    const item = shopCatalogue.find(entry => `buy-${entry.id}` === action);
    const price = item ? shopPrice(item) : 0;
    if (!item) return finish('bad', '<strong>The trader mishears you completely.</strong><br>Nothing changes hands. Nobody speaks of it again.');
    if (state.coins < price) return stay('bad', `<strong>Not enough Supplies for the ${item.name.toLowerCase()}.</strong><br>The trader recommends acquiring wealth before attempting commerce.`);
    state.coins -= price;
    if (item.id === 'rations') state.health = Math.min(state.maxHealth, state.health + 10);
    else if (item.id === 'tonic') state.health = Math.min(state.maxHealth, state.health + 20);
    else if (item.id === 'rope') state.insight += 1;
    else if (item.id === 'notes') state.insight += 2;
    else if (item.id === 'charm') { state.charmOwned = true; state.maxHealth += 5; state.health += 5; }
    state.shopStock = (state.shopStock || []).filter(entry => entry !== item.id);
    return stay('good', `<strong>${item.name} acquired — ${price} Supplies.</strong><br>${item.flavor}`);
  }
  if (action === 'trade') {
    if (state.insight < 1) return stay('bad', '<strong>No Insight to trade.</strong><br>The trader refuses to accept confidence as legal tender.');
    state.insight -= 1;
    state.coins += 20;
    return stay('good', '<strong>Trade complete — 20 Supplies gained.</strong><br>You immediately forget one useful diagram.');
  }
  if (action === 'offering') {
    if (state.coins < 10) return finish('bad', '<strong>No offering to give.</strong><br>The shrine does not accept promissory notes.');
    return gamble('The numerals circle your offering…', () => {
      state.coins -= 10;
      const roll = Math.random();
      if (roll < .40) { state.insight += 2; return ['good', '<strong>The shrine is pleased — 2 Insight gained.</strong><br>The numerals briefly arrange themselves into a smug tick.']; }
      if (roll < .60) { state.insight += 2; state.coins += 12; return ['good', '<strong>Overflowing — 2 Insight and 12 Supplies returned.</strong><br>The shrine overpays. Nobody knows why. Do not ask.']; }
      if (roll < .85) return ['bad', '<strong>The shrine keeps your offering.</strong><br>Ten Supplies vanish. The jungle absorbs the rounding error.'];
      state.health = Math.max(0, state.health - 4); state.insight += 1;
      return ['bad', '<strong>An aggressively educational shock — −4 Stability.</strong><br>It does grant 1 Insight on the way out. Small mercies.'];
    });
  }
  if (action === 'symbols') {
    return gamble('The symbols rearrange themselves…', () => {
      const roll = Math.random();
      if (roll < .60) { state.insight += 1; state.coins += 12; return ['good', '<strong>The pattern resolves — 12 Supplies and 1 Insight.</strong><br>Precision opens a hidden compartment.']; }
      if (roll < .85) { state.insight += 1; return ['good', '<strong>The symbols rearrange into a shrug — 1 Insight.</strong><br>Wisdom, but conspicuously no gold.']; }
      state.coins += 25;
      return ['good', '<strong>Gold, and no wisdom whatsoever — 25 Supplies.</strong><br>The compartment opens onto somebody’s entire life savings.'];
    });
  }
  return finish('good', '<strong>You leave the landmark untouched.</strong><br>For once, restraint produces no immediate explosion.');
}

function resolveAnswer(choice) {
  const e = encounters[state.encounter];
  const question = state.drawnQuestion || e;
  const correct = choice === question.correct;
  document.querySelectorAll('[data-answer]').forEach(btn => {
    btn.disabled = true;
    if (Number(btn.dataset.answer) === question.correct) btn.classList.add('is-correct');
  });
  if (!correct) document.querySelector(`[data-answer="${choice}"]`)?.classList.add('is-wrong');
  const outcome = document.querySelector('#outcome');
  outcome.classList.remove('hidden');
  if (correct) {
    state.streak += 1;
    state.coins += e.reward;
    outcome.className = 'outcome outcome-good';
    outcome.innerHTML = `<strong>Correct — +${e.reward} coins.</strong><br>${e.win}<br><em>Jamnani: “Sound mechanics. Even the jungle has to respect those.”</em><br><span class="outcome-closer">You fold the moment into the field journal and press on.</span>`;
  } else {
    state.streak = 0;
    state.grudge = (state.grudge || 0) + 1;
    state.health = Math.max(0, state.health - e.damage);
    outcome.className = 'outcome outcome-bad';
    outcome.innerHTML = `<strong>Not quite — −${e.damage} Stability.</strong><br>${e.lose}<br><em>Jamnani: “A painful result, but still a result.”</em><br><span class="outcome-closer">The trail waits. It is not known for its patience.</span>`;
  }
  refreshHud();
  showEncounterContinue();
  state.pendingCompletion = true;
  saveRun();
}

function finishEncounter() {
  document.querySelector('#battle-reward-overlay')?.remove();
  const id = state.activeNode;
  const node = nodes.find(item => item.id === id);
  state.battle = null;
  state.pendingCompletion = false;
  if (state.health <= 0) return renderEnd(false);
  if (node?.kind === 'joule') {
    if ((state.act || 1) < ACTS.length) return advanceAct();
    return renderEnd(true);
  }
  state.completed.push(id);
  state.current = id;
  state.available = node.links.filter(link => !state.completed.includes(link));
  state.activeNode = null;
  state.encounter = null;
  state.locationSession = null;
  saveRun();
  // Story beats: the deeper canopy opens at the floor elites begin appearing,
  // and the first elite cleared earns its own moment of respect.
  if (node.floor >= 4 && !state.beats.midpoint) {
    state.beats.midpoint = true;
    saveRun();
    const midpointScene = state.act === 1 ? 'midpoint' : `midpoint${state.act}`;
    return playCutscene(midpointScene, renderMap);
  }
  if (node.kind === 'elite' && !state.beats.elite) {
    state.beats.elite = true;
    saveRun();
    const eliteScene = state.act === 1 ? 'elite' : `elite${state.act}`;
    return playCutscene(eliteScene, renderMap);
  }
  renderMap();
}

// Clearing an act guardian opens the next act: a fresh map, a small camp
// bonus, and story beats rearmed for the new ascent.
function upgradeCardsForNewAct(count = 2) {
  const candidates = (state.deck || []).filter(instance => !instance.upgraded && cardDef(instance.id));
  candidates.sort(() => Math.random() - .5).slice(0, count).forEach(instance => { instance.upgraded = true; });
}

function advanceAct() {
  state.act = (state.act || 1) + 1;
  state.drawnQuestion = null;
  state.beats = { midpoint: false, elite: false, bossIntro: false };
  state.maxHealth += 5;
  state.health = Math.min(state.maxHealth, state.health + (state.act === 2 ? 25 : 30));
  state.insight += 1;
  upgradeCardsForNewAct(2);
  nodes = generateMap(state.act);
  const start = nodes.find(node => node.id === 'start');
  state.current = 'start';
  state.completed = ['start'];
  state.available = [...start.links];
  state.activeNode = null;
  state.encounter = null;
  saveRun();
  playCutscene(`act${state.act}Arrival`, renderMap);
}

function renderEnd(won) {
  clearSavedRun(won);
  playCutscene(won ? 'victory' : 'defeat', () => showEndScreen(won));
}

function showEndScreen(won) {
  document.onkeydown = null;
  app.innerHTML = `<section class="screen title-screen"><div class="run-end">
    <div class="eyebrow">Expedition complete</div>
    <h1>${won ? 'JOULE FOUND' : 'RUN ENDED'}</h1>
    <p>${won ? 'The Joule of Mechanics answers your hand with a pulse of golden light. One realm has yielded. The jungle has not.' : 'The canopy closes over the trail. Jamnanji marks the location of your spectacular learning experience.'}</p>
    <p><strong>Coins recovered:</strong> ${state.coins} &nbsp; · &nbsp; <strong>Stability:</strong> ${state.health}/${state.maxHealth}</p>
    <button class="primary" id="again">${won ? 'Start another run' : 'Return to the jungle'}</button>
  </div></section>`;
  document.querySelector('#again').addEventListener('click', renderSaveSlots);
}

// Keep the game surface feeling like an application rather than a selectable
// web document. This prevents accidental highlighting and browser copy UI;
// it is intentionally not treated as a security boundary.
['copy', 'cut', 'paste', 'contextmenu', 'selectstart', 'dragstart'].forEach(type => {
  document.addEventListener(type, event => event.preventDefault());
});
document.addEventListener('keydown', event => {
  if ((event.ctrlKey || event.metaKey) && ['a', 'c', 'x', 'v'].includes(event.key.toLowerCase())) event.preventDefault();
});

applyPreferences();
// Review hooks: ?cutscene=prologue|midpoint|elite|bossIntro|victory|defeat opens any scene directly,
// ?battle=encounter|elite|joule drops straight into a fight, and
// ?location=hazard|mystery|rest|merchant|treasure|ruins opens a landmark visit —
// all without touching save slots.
const previewScene = new URLSearchParams(location.search).get('cutscene');
const previewBattle = new URLSearchParams(location.search).get('battle');
// ?act=1|2|3 picks which act's pools a battle preview draws from.
const previewAct = Math.min(3, Math.max(1, Number(new URLSearchParams(location.search).get('act')) || 1));
const previewLocation = new URLSearchParams(location.search).get('location');
if (previewBattle && ['encounter', 'elite', 'joule'].includes(previewBattle)) {
  currentSaveSlot = -1;
  const previewFloor = Math.min(9, Math.max(1, Number(new URLSearchParams(location.search).get('floor')) || 1));
  resetState();
  state.act = previewAct;
  const findNode = () => nodes.find(item => item.kind === previewBattle && item.floor >= previewFloor) || nodes.find(item => item.kind === previewBattle);
  for (let attempt = 0; !findNode() && attempt < 20; attempt += 1) resetState();
  state.beats.bossIntro = true; // preview jumps straight into the fight
  const node = findNode();
  if (node) startEncounter(node.id);
  else renderMap();
} else if (previewLocation && journalKinds.includes(previewLocation)) {
  currentSaveSlot = -1;
  const previewFloor = Math.min(9, Math.max(1, Number(new URLSearchParams(location.search).get('floor')) || 1));
  resetState();
  for (let attempt = 0; !(nodes.find(item => item.kind === previewLocation && item.floor >= previewFloor) || nodes.find(item => item.kind === previewLocation)) && attempt < 20; attempt += 1) resetState();
  state.coins = 60; // review hook: a stocked purse so shop flows can be exercised
  const node = nodes.find(item => item.kind === previewLocation && item.floor >= previewFloor) || nodes.find(item => item.kind === previewLocation);
  if (node) startEncounter(node.id);
  else renderMap();
} else if (previewScene && cutscenes[previewScene]) {
  resetState();
  playCutscene(previewScene, () => {
    if (previewScene === 'victory') showEndScreen(true);
    else if (previewScene === 'defeat') showEndScreen(false);
    else renderMap();
  });
} else {
  renderTitle();
}
