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

// Every dangerous ground on a route tells its own tale; the draw is made once at
// map generation and persists with the node across save/resume.
const hazardTales = ['river', 'bridge', 'quicksand', 'hornets', 'scree'];
const journalKinds = ['hazard', 'mystery', 'rest', 'merchant', 'treasure', 'ruins'];
const locationAmbience = { hazard: ['embers'], mystery: ['equations'], rest: ['fireflies'], merchant: ['mist'], treasure: ['mist'], ruins: ['equations'] };
// `slot` art lights up when the file appears; until then the shared scene art stays.
const locationArt = {
  hazard: 'assets/location-hazard.png', mystery: 'assets/location-mystery.png', rest: 'assets/location-rest.png',
  merchant: 'assets/location-merchant.png', treasure: 'assets/location-treasure.png', ruins: 'assets/location-ruins.png'
};
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
  if (state.pendingCompletion || state.battle?.won) return finishEncounter();
  if (state.activeNode && state.encounter && state.battle) startEncounter(state.activeNode, true);
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
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The Joule of Mechanics lies beyond Newton’s Canopy. Recover it, and the jungle may permit you to leave. I said may.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Every expedition creates a new route. Choose carefully. Once travelled, a path closes behind you.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Some landmarks offer supplies. Some offer rest. Others offer valuable educational experiences. Those are rarely comfortable.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'The jungle will test quick decisions, calculations, units, explanations and—occasionally—common sense.' },
      { speaker: 'Mr Jamnani', pose: 'explaining', text: 'Correct answers earn supplies and open opportunities. Mistakes cost Stability. An answer changes more than a number here. It changes what happens next.' },
      { speaker: 'Mr Jamnani', pose: 'warning', text: 'Reach the guardian. Survive its trial. Recover the Hidden Joule.' },
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
      { speaker: 'Narrator', text: 'The mechanism fires. The guardian halts one breath away, entirely out of respect for physics.', fx: 'flash' },
      { speaker: 'Narrator', text: 'Behind it, the cradle opens. The Joule of Mechanics rises — small, golden, and quietly furious with energy.', fx: 'orb' },
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

function resetState() {
  state = { act: 1, health: 60, maxHealth: 60, coins: 0, insight: 2, current: 'start', available: [], completed: ['start'], encounter: null, activeNode: null, battle: null, drawnQuestion: null, asked: {}, beats: { midpoint: false, elite: false, bossIntro: false }, streak: 0, grudge: 0, charmOwned: false, shopStock: null, shopNode: null, interjected: {} };
  nodes = generateMap(state.act);
  const start = nodes.find(node => node.id === 'start');
  state.available = [...start.links];
}

function sample(items) { return items[Math.floor(Math.random() * items.length)]; }

function generateMap(actNumber = 1) {
  const act = ACTS[Math.min(Math.max(actNumber, 1), ACTS.length) - 1];
  const floors = act.floors;
  const generated = [{ id: 'start', x: 50, y: 95, floor: 0, label: act.gateLabel, icon: '▲', kind: 'gate', encounter: null, links: [] }];
  const floorGroups = [];

  for (let floor = 1; floor <= floors; floor += 1) {
    const count = floor === 1 ? 2 : 3 + (Math.random() < .32 ? 1 : 0);
    const allowed = floor === 1
      ? ['encounter', 'hazard', 'mystery']
      : floor === floors
        ? ['elite', 'rest', 'treasure']
        : ['encounter', 'hazard', 'mystery', 'rest', 'merchant', 'treasure', 'ruins', ...(floor > 4 ? ['elite'] : [])];
    const floorKinds = [...allowed].sort(() => Math.random() - .5);
    const group = [];
    for (let column = 0; column < count; column += 1) {
      const kind = floorKinds[column % floorKinds.length];
      const type = landmarkTypes[kind];
      const id = `f${floor}n${column}`;
      const spacing = 78 / Math.max(1, count - 1);
      const x = count === 1 ? 50 : 11 + column * spacing + (Math.random() * 4 - 2);
      const y = 95 - floor * 9.6 + (Math.random() * 1.8 - .9);
      const node = { id, x, y, floor, kind, icon: type.icon, label: type.label, encounter: type.encounter, links: [] };
      if (kind === 'hazard') node.encounter = sample(hazardTales);
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
        <div class="title-lockup" aria-label="Jamnanji: The Hidden Joule">
          <h1 class="game-title">JAMNANJI</h1>
          <div class="title-realms" aria-label="Mechanics, Electricity and Waves">
            <span title="Mechanics">Φ</span><span title="Electricity">ϟ</span><span title="Waves">≋</span>
          </div>
          <p>The Hidden Joule</p>
        </div>
      </div>
      <div class="menu-version">ACT I · NEWTON'S CANOPY · BUILD 0.3</div>
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

function confirmNewRun(slotIndex) {
  const previousKeyHandler = document.onkeydown;
  const overlay = document.createElement('div');
  overlay.className = 'save-confirm';
  overlay.innerHTML = `<button class="save-confirm-shade" aria-label="Cancel"></button><section role="alertdialog" aria-modal="true" aria-labelledby="overwrite-title"><small>Overwrite active expedition?</small><h2 id="overwrite-title">The existing trail will be lost.</h2><p>Your completed-run history stays in this slot, but the current map and its progress cannot be recovered.</p><div><button class="secondary" data-cancel>Keep current run</button><button class="primary" data-confirm>Start new run</button></div></section>`;
  document.body.appendChild(overlay);
  const actions = [overlay.querySelector('[data-cancel]'), overlay.querySelector('[data-confirm]')];
  let selected = 0;
  const update = index => { selected = (index + actions.length) % actions.length; actions.forEach((button, i) => button.classList.toggle('is-key-selected', i === selected)); actions[selected].focus(); };
  const close = () => { overlay.remove(); document.onkeydown = previousKeyHandler; };
  overlay.querySelector('.save-confirm-shade').addEventListener('click', close);
  overlay.querySelector('[data-cancel]').addEventListener('click', close);
  overlay.querySelector('[data-confirm]').addEventListener('click', () => { close(); startNewRun(slotIndex); });
  actions.forEach((button, index) => button.addEventListener('mouseenter', () => update(index)));
  document.onkeydown = event => {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) { event.preventDefault(); update(selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1)); }
    if (event.key === 'Enter') { event.preventDefault(); actions[selected].click(); }
    if (event.key === 'Escape') close();
  };
  update(0);
}

function openSlotActions(slotIndex) {
  const slot = loadSaveSlots().slots[slotIndex];
  if (!slot.run) return startNewRun(slotIndex);
  const previousKeyHandler = document.onkeydown;
  const overlay = document.createElement('div');
  overlay.className = 'slot-action-overlay';
  overlay.innerHTML = `<button class="slot-action-shade" aria-label="Close"></button><section role="dialog" aria-modal="true" aria-labelledby="slot-action-title"><small>Record ${String(slotIndex + 1).padStart(2, '0')}</small><h2 id="slot-action-title">Expedition in Progress</h2><nav><button data-slot-continue><b>Continue Run</b></button><button data-slot-restart><b>Clear &amp; Restart</b></button></nav></section>`;
  document.body.appendChild(overlay);
  const actions = [...overlay.querySelectorAll('nav button')];
  let selected = 0;
  const update = index => { selected = (index + actions.length) % actions.length; actions.forEach((button, i) => button.classList.toggle('is-selected', i === selected)); actions[selected].focus(); };
  const close = () => { overlay.remove(); document.onkeydown = previousKeyHandler; document.querySelector(`[data-save-slot="${slotIndex}"]`)?.focus(); };
  overlay.querySelector('.slot-action-shade').addEventListener('click', close);
  overlay.querySelector('[data-slot-continue]').addEventListener('click', () => { overlay.remove(); continueSavedRun(slotIndex); });
  overlay.querySelector('[data-slot-restart]').addEventListener('click', () => { close(); confirmNewRun(slotIndex); });
  actions.forEach((button, index) => button.addEventListener('mouseenter', () => update(index)));
  document.onkeydown = event => {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) { event.preventDefault(); update(selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1)); }
    if (event.key === 'Enter') { event.preventDefault(); actions[selected].click(); }
    if (event.key === 'Escape') close();
  };
  update(0);
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
      const location = run ? run.nodes.find(node => node.id === runState.current)?.label : '';
      return `<article class="save-slot ${run ? 'has-run' : 'is-empty'} ${index === currentSaveSlot ? 'is-current' : ''}" data-save-slot="${index}" role="button" tabindex="${index === currentSaveSlot ? '0' : '-1'}" aria-label="Record ${index + 1}, ${run ? 'expedition in progress' : 'empty'}">
        <div class="save-slot-number"><span>Record</span><b>${String(index + 1).padStart(2, '0')}</b></div>
        <div class="save-slot-status"><span>${run ? 'Expedition in progress' : 'Empty record'}</span><h2>${run ? journeys.find(journey => journey.id === run.journey)?.name || 'Mechanics' : 'Unwritten Trail'}</h2>${run ? `<p>${location || 'Jungle Gate'} · ${runState.health}/${runState.maxHealth} Stability</p>` : ''}</div>
        <dl><div><dt>Runs</dt><dd>${slot.runs || 0}</dd></div><div><dt>Victories</dt><dd>${slot.victories || 0}</dd></div><div><dt>Best floor</dt><dd>${slot.bestFloor || '—'}</dd></div></dl>
        <small class="save-time">${formatSaveTime(run?.savedAt)}</small>
      </article>`;
    }).join('')}</main>
  </section>`;
  const cards = [...document.querySelectorAll('[data-save-slot]')];
  let selected = Math.max(0, Math.min(2, currentSaveSlot));
  const updateSelection = index => {
    selected = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => { card.classList.toggle('is-selected', cardIndex === selected); card.tabIndex = cardIndex === selected ? 0 : -1; });
    cards[selected].focus();
  };
  const openSelected = () => openSlotActions(selected);
  document.querySelector('#save-return').addEventListener('click', renderTitle);
  cards.forEach((card, index) => { card.addEventListener('mouseenter', () => updateSelection(index)); card.addEventListener('click', openSelected); });
  document.onkeydown = event => {
    if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)) { event.preventDefault(); updateSelection(selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1)); }
    if (event.key === 'Enter') openSelected();
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
    <div class="student-silhouette" id="student-character"><img id="student-art" src="assets/student-neutral-cutout.png" alt="Student explorer"></div>
    <div class="guide-silhouette" id="guide-character"><img id="guide-art" src="assets/jamnani-neutral-cutout.png" alt="Mr Jamnani"></div>
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
    enter.className = 'enter-jungle';
    enter.textContent = scene.endLabel || 'Continue';
    enter.addEventListener('click', event => { event.stopPropagation(); endScene(); });
    document.querySelector('#dialogue-box').appendChild(enter);
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
    if (jamnaniSpeaking) guideArt.src = `assets/jamnani-${line.pose || 'neutral'}-cutout.png`;
    if (studentSpeaking) studentArt.src = `assets/student-${line.pose || 'neutral'}-cutout.png`;
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
      guideArt.src = 'assets/jamnani-disappointed-cutout.png';
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
    <div class="hud-stat health-stat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.1 19 5.9v5.4c0 4.6-2.9 7.7-7 9.4-4.1-1.7-7-4.8-7-9.4V5.9Z"/><path d="m8.7 11.4 3.3 2.9 3.3-2.9"/></svg><div><span>Stability</span><b data-hud-health>${state.health}<i>/${state.maxHealth}</i></b></div></div>
    <div class="hud-stat"><svg viewBox="0 0 24 24" aria-hidden="true"><ellipse cx="12" cy="6.2" rx="6.4" ry="2.6"/><path d="M5.6 6.2v5.6c0 1.4 2.9 2.6 6.4 2.6s6.4-1.2 6.4-2.6V6.2"/><path d="M5.6 11.8v4.4c0 1.4 2.9 2.6 6.4 2.6s6.4-1.2 6.4-2.6v-4.4"/></svg><div><span>Supplies</span><b data-hud-supplies>${state.coins}</b></div></div>
    <div class="hud-stat"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.6 12S6.1 5.9 12 5.9 21.4 12 21.4 12 17.9 18.1 12 18.1 2.6 12 2.6 12Z"/><circle cx="12" cy="12" r="3.1"/></svg><div><span>Insight</span><b data-hud-insight>${state.insight}</b></div></div>
    <div class="hud-tools">
      <button class="hud-icon" data-hud-action="notes" aria-label="Expedition notes" title="Expedition notes"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 6.3C10.2 5 7.7 4.4 4.6 4.5v13.2c3.1-.1 5.6.5 7.4 1.8 1.8-1.3 4.3-1.9 7.4-1.8V4.5c-3.1-.1-5.6.5-7.4 1.8Z"/><path d="M12 6.3v13.2"/></svg></button>
      <button class="hud-icon" data-hud-action="settings" aria-label="Settings" title="Settings"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="6.1"/><circle cx="12" cy="12" r="2.3"/><path d="M12 5.9V2.9M12 18.1v3M2.9 12h3M18.1 12h3M5.5 5.5l2.2 2.2M16.3 16.3l2.2 2.2M18.5 5.5l-2.2 2.2M7.7 16.3l-2.2 2.2"/></svg></button>
    </div>
  </header>`;
}

function closeHudPanel() {
  const overlay = document.querySelector('.hud-overlay');
  if (!overlay) return;
  document.removeEventListener('keydown', overlay._escapeHandler, true);
  overlay.remove();
}

function openHudPanel(kind, fromMenu = false) {
  closeHudPanel();
  const overlay = document.createElement('div');
  overlay.className = `hud-overlay${fromMenu ? ' menu-hud-overlay' : ''}`;
  const currentNode = nodes.find(node => node.id === state?.current);
  const journey = journeys.find(item => item.id === selectedJourney) || journeys[0];
  const isNotes = kind === 'notes';
  const isHow = kind === 'how';
  const panelBody = isNotes ? `<div class="journal-objective"><small>Current objective</small><strong>${journey.objective}</strong></div>
        <div class="journal-grid"><p><span>Position</span><b>${currentNode?.label || 'Before the expedition'}</b></p><p><span>Landmarks cleared</span><b>${Math.max(0, (state?.completed?.length || 1) - 1)}</b></p><p><span>Stability</span><b>${state?.health || 0}/${state?.maxHealth || 60}</b></p><p><span>Supplies / Insight</span><b>${state?.coins || 0} / ${state?.insight || 0}</b></p></div>
        <blockquote>“Show your working. Check your units. Avoid anything described as frictionless.”<cite>— Mr Jamnani</cite></blockquote>` : isHow ? `<div class="how-grid">
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
    <section class="hud-modal" role="dialog" aria-modal="true" aria-labelledby="hud-modal-title">
      <header><div><span>${isNotes ? 'Expedition record' : isHow ? 'Field manual' : 'Preferences'}</span><h2 id="hud-modal-title">${isNotes ? 'Expedition Notes' : isHow ? 'How to Play' : 'Settings'}</h2></div><button class="hud-modal-close" aria-label="Close">×</button></header>
      ${panelBody}
    </section>`;
  document.body.appendChild(overlay);
  overlay.querySelector('.hud-modal-backdrop').addEventListener('click', closeHudPanel);
  overlay.querySelector('.hud-modal-close').addEventListener('click', closeHudPanel);
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
  overlay._escapeHandler = event => { event.stopImmediatePropagation(); if (event.key === 'Escape') { event.preventDefault(); closeHudPanel(); } };
  document.addEventListener('keydown', overlay._escapeHandler, true);
  overlay.querySelector('.hud-modal-close').focus();
}

function wireHudControls() {
  document.querySelectorAll('[data-hud-action]').forEach(button => button.addEventListener('click', () => openHudPanel(button.dataset.hudAction)));
}

function interject(line, pose = 'disappointed') {
  if (document.querySelector('.jamnani-toast')) return; // one observation at a time
  const toast = document.createElement('aside');
  toast.className = 'jamnani-toast';
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `<img src="assets/jamnani-${pose}-cutout.png" alt=""><b>Mr Jamnani</b><p>${line}</p>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('is-leaving'), 3900);
  setTimeout(() => toast.remove(), 4500);
}

function checkInterjections(damageTaken) {
  if (!state || !state.interjected) return;
  if (!state.interjected.lowHealth && state.health > 0 && state.health <= 20) {
    state.interjected.lowHealth = true;
    return interject('Your Stability is approaching a demonstrable minimum.', 'warning');
  }
  if (!state.interjected.streak && state.streak >= 3) {
    state.interjected.streak = true;
    return interject('Three consecutive. The jungle is briefly embarrassed.', 'neutral');
  }
  if (!state.interjected.bigHit && damageTaken >= 15 && state.health <= state.maxHealth / 2) {
    state.interjected.bigHit = true;
    return interject('Historically, this is the point where expeditions simplify their route.', 'disappointed');
  }
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
          <p><b>♣</b> Encounter</p><p><b>?</b> Unknown</p><p><b>♨</b> Rest</p><p><b>⚖</b> Merchant</p><p><b>◆</b> Treasure</p><p><b>♜</b> Elite</p><p><b>⌬</b> Ruins</p><p><b>J</b> Joule guardian</p>
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
    button.innerHTML = `<span class="landmark-symbol">${node.icon}</span><span class="node-label">${node.label}</span><span class="node-status">${status === 'available' ? 'Choose trail' : status === 'completed' ? 'Cleared' : 'Unexplored'}</span>`;
    button.setAttribute('aria-label', `${node.label}, ${status}`);
    if (status === 'available') button.addEventListener('click', () => startEncounter(node.id));
    map.appendChild(button);
  });
  const marker = document.createElement('div');
  const currentNode = nodes.find(node => node.id === state.current);
  marker.className = 'player-marker'; marker.textContent = '▲';
  marker.style.left = `${currentNode.x}%`; marker.style.top = `${currentNode.y + 7}%`;
  map.appendChild(marker);
  const mapHeight = map.offsetHeight;
  const viewportHeight = map.parentElement.clientHeight;
  const desiredShift = viewportHeight * .68 - (currentNode.y / 100) * mapHeight;
  const shift = Math.max(viewportHeight - mapHeight, Math.min(0, desiredShift));
  map.style.transform = `translateY(${shift}px)`;
}

function battleAnswerButtons(question, battle) {
  const eliminated = battle.hint?.round === battle.round ? battle.hint.eliminated : [];
  return question.answers.map((answer, index) => `<button class="answer-btn${eliminated.includes(index) ? ' is-eliminated' : ''}" data-battle-answer="${index}"${eliminated.includes(index) ? ' disabled' : ''}>${answer}</button>`).join('');
}

function battleTray(node, encounter) {
  const battle = state.battle;
  const question = battle.questions[battle.round % battle.questions.length];
  return `<div class="activity-heading battle-heading"><span class="activity-sigil">⚔</span><div><small>${encounter.title} · Round <span id="battle-round">${battle.round + 1}</span></small><h2 id="battle-question">${question.question}</h2></div></div>
    <div class="battle-tray">
      <div class="answers battle-answers" id="battle-answers">${battleAnswerButtons(question, battle)}</div>
      <div class="tray-side">
        <span class="streak-chip hidden" data-battle-streak></span>
        <button type="button" class="hint-btn" id="battle-hint"></button>
        <small class="tray-note">Correct answers strike your targeted enemy.</small>
      </div>
    </div>`;
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
  return [...pool].sort(() => Math.random() - .5).slice(0, 3).map(item => item.id);
}

// Stock is drawn once per visit and kept in state, so a save/resume shows the same wares.
function shopStockFor(node) {
  if (state.shopNode !== node.id || !Array.isArray(state.shopStock)) {
    state.shopNode = node.id;
    state.shopStock = drawShopStock();
  }
  return state.shopStock.map(id => shopCatalogue.find(item => item.id === id)).filter(Boolean);
}

function locationActivity(node, encounter) {
  if (state.battle) return battleTray(node, encounter);
  if (node.kind === 'rest') return `<div class="activity-heading"><span class="activity-sigil">♨</span><div><h2>The clearing will not remain quiet forever.</h2></div></div>
    <div class="location-options camp-options">
      <button data-location-action="recover"><b>Rest by the warding stones</b><span>Recover 15 Stability</span></button>
      <button data-location-action="prepare"><b>Study Jamnani’s field notes</b><span>Gain 1 Insight</span></button>
      <button data-location-action="leave"><b>Keep moving</b><span>Take nothing · lose nothing</span></button>
    </div>`;

  if (node.kind === 'merchant') {
    const stock = shopStockFor(node);
    const markup = shopMarkup();
    return `<div class="activity-heading"><span class="activity-sigil">⚖</span><div><small>Newtonian Trader</small><h2>Today’s questionably useful stock</h2>${markup > 0 ? `<span class="shop-note">Jungle markup +${Math.round(markup * 100)}% — the trader hears everything.</span>` : '<span class="shop-note">Fresh prices. The jungle has heard nothing incriminating. Yet.</span>'}</div></div>
    <div class="location-options shop-options">
      ${stock.map(item => `<button data-location-action="buy-${item.id}"${state.coins < shopPrice(item) ? ' class="is-unaffordable"' : ''}><b>${item.name}</b><span>${shopPrice(item)} Supplies · ${item.note}</span></button>`).join('')}
      <button data-location-action="trade"><b>Trade one Insight</b><span>Receive 20 Supplies</span></button>
      <button data-location-action="leave"><b>Decline politely</b><span>The trader will survive the insult</span></button>
    </div>`;
  }

  if (node.kind === 'treasure') return `<div class="activity-heading"><span class="activity-sigil">◆</span><div><small>Unclaimed cache</small><h2>The lock hums with stored energy.</h2></div></div>
    <div class="location-options treasure-options">
      <button data-location-action="open"><b>Release the catch</b><span>Risk the spring · up to 40 Supplies</span></button>
      <button data-location-action="inspect"><b>Inspect the mechanism</b><span>Safer · 18 Supplies and 1 Insight, guaranteed</span></button>
    </div>`;

  if (node.kind === 'mystery') return `<div class="activity-heading"><span class="activity-sigil">?</span><div><small>Unknown consequence</small><h2>The shrine waits for a decision.</h2></div></div>
    <div class="location-options mystery-options">
      <button data-location-action="offering"><b>Place supplies in the slot</b><span>Offer 10 · the shrine gambles</span></button>
      <button data-location-action="symbols"><b>Read the moving symbols</b><span>Wisdom or gold · rarely both</span></button>
      <button data-location-action="leave"><b>Back away slowly</b><span>Jamnani calls this “risk management”</span></button>
    </div>`;

  return `<div class="activity-heading"><span class="activity-sigil">Φ</span><div><small>${node.kind === 'elite' ? 'Elite trial' : node.kind === 'joule' ? 'Guardian trial' : 'Act before the jungle does'}</small><h2>${encounter.question}</h2></div></div>
    <div class="answers">${encounter.answers.map((answer, index) => `<button class="answer-btn" data-answer="${index}">${answer}</button>`).join('')}</div>`;
}

// Questions are drawn at random from the tagged bank in questions.js.
// Every draw prefers questions the player has seen least this run, so
// encounters keep surfacing fresh material until a topic pool runs dry.
function currentAct() { return ACTS[Math.min(Math.max(state?.act || 1, 1), ACTS.length) - 1]; }

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
    .filter(q => topicList.includes(q.topic) && levels.includes(q.level))
    .sort((a, b) => (asked[a.id] || 0) - (asked[b.id] || 0) || Math.random() - .5)
    .slice(0, count);
  pool.forEach(q => { if (state) state.asked[q.id] = (state.asked[q.id] || 0) + 1; });
  return pool.map(shuffleQuestion);
}

function drawBattleQuestions(encounterKey, node) {
  const levels = levelsForNode(node);
  const themed = pickQuestions(ENCOUNTER_TOPICS[encounterKey] || null, 1, levels)[0];
  return [themed, ...pickQuestions(null, 8, levels)];
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
  baboon: { id: 'baboon', name: 'Vector Baboon', mark: '♣', shape: 'blob', hue: 18, hp: 2, role: 'soldier', bounty: 8, moves: { k: 'cycle', hits: [4, 4] }, art: 'assets/vector-baboon-battle-v2.png' },
  frog: { id: 'frog', name: 'Kinetic Dart Frog', mark: '◇', shape: 'diamond', hue: 130, hp: 1, role: 'swarm', bounty: 5, moves: { k: 'cycle', hits: [3, 3] } },
  parrot: { id: 'parrot', name: 'Scalar Parrot', mark: '¶', shape: 'tri', hue: 95, hp: 2, role: 'soldier', bounty: 8, moves: { k: 'cycle', hits: [2, 6] } },
  sloth: { id: 'sloth', name: 'Inertia Sloth', mark: '∩', shape: 'blob', hue: 200, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'charge', windup: 2, burst: 11 } },
  spider: { id: 'spider', name: 'Pulley Spider', mark: '✕', shape: 'hex', hue: 280, hp: 2, role: 'soldier', bounty: 9, moves: { k: 'drain', power: 3, loot: 3 } },
  viper: { id: 'viper', name: 'Elastic Viper', mark: '∿', shape: 'tri', hue: 340, hp: 2, role: 'soldier', bounty: 9, moves: { k: 'ramp', power: 2, growth: 2 } },
  orangutan: { id: 'orangutan', name: 'Pendulum Orangutan', mark: '⌇', shape: 'blob', hue: 32, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'cycle', hits: [4, 8] } },
  boar: { id: 'boar', name: 'Friction Boar', mark: '≜', shape: 'diamond', hue: 8, hp: 4, role: 'heavy', bounty: 14, moves: { k: 'cycle', hits: [6, 6] } },
  // Act II — rotation & rolling
  rotor: { id: 'rotor', name: 'Rotor Monkey', mark: '✳', shape: 'spike', hue: 55, hp: 2, role: 'soldier', bounty: 9, moves: { k: 'cycle', hits: [5, 5] } },
  falcon: { id: 'falcon', name: 'Gyro Falcon', mark: '◭', shape: 'tri', hue: 210, hp: 2, role: 'soldier', bounty: 10, moves: { k: 'cycle', hits: [4, 8] } },
  turtle: { id: 'turtle', name: 'Torque Turtle', mark: '⬡', shape: 'hex', hue: 110, hp: 4, role: 'heavy', bounty: 13, moves: { k: 'guard', power: 4 } },
  boulder: { id: 'boulder', name: 'Rolling Boulder', mark: '●', shape: 'blob', hue: 25, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'charge', windup: 2, burst: 13 } },
  beaver: { id: 'beaver', name: 'Angular Beaver', mark: '⌒', shape: 'diamond', hue: 28, hp: 3, role: 'soldier', bounty: 11, moves: { k: 'drain', power: 4, loot: 4 } },
  flywheel: { id: 'flywheel', name: 'Flywheel Lemur', mark: '◎', shape: 'spike', hue: 190, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'ramp', power: 3, growth: 3 } },
  // Act III — circles, orbits & oscillation
  panther: { id: 'panther', name: 'Centripetal Panther', mark: '☾', shape: 'blob', hue: 260, hp: 3, role: 'heavy', bounty: 11, moves: { k: 'cycle', hits: [6, 6] } },
  howler: { id: 'howler', name: 'Resonant Howler', mark: '≫', shape: 'spike', hue: 350, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'ramp', power: 3, growth: 3 } },
  owl: { id: 'owl', name: 'Orbital Owl', mark: '◉', shape: 'hex', hue: 48, hp: 4, role: 'heavy', bounty: 13, moves: { k: 'guard', power: 5 } },
  mosquito: { id: 'mosquito', name: 'Damping Mosquito', mark: '·', shape: 'diamond', hue: 150, hp: 1, role: 'swarm', bounty: 4, moves: { k: 'cycle', hits: [2, 2] } },
  ape: { id: 'ape', name: 'Harmonic Ape', mark: '⏦', shape: 'blob', hue: 300, hp: 3, role: 'heavy', bounty: 12, moves: { k: 'cycle', hits: [3, 9] } },
  comet: { id: 'comet', name: 'Comet Newt', mark: '☄', shape: 'tri', hue: 175, hp: 2, role: 'soldier', bounty: 10, moves: { k: 'charge', windup: 1, burst: 12 } }
};

const ACT_POOLS = [
  { mobs: ['baboon', 'frog', 'parrot', 'sloth', 'spider', 'viper', 'orangutan', 'boar'], elite: 'rhino', cheap: ['baboon', 'frog', 'parrot'] },
  { mobs: ['rotor', 'falcon', 'turtle', 'boulder', 'beaver', 'flywheel', 'baboon'], elite: 'colossus', cheap: ['rotor', 'baboon', 'beaver'] },
  { mobs: ['panther', 'howler', 'owl', 'mosquito', 'ape', 'comet', 'falcon'], elite: 'warden', cheap: ['mosquito', 'comet', 'falcon'] }
];

const ACT_ELITES = {
  rhino: { id: 'rhino', name: 'Momentum Rhino', mark: '♜', shape: 'diamond', hue: 350, hp: 4, bounty: 24, moves: { k: 'cycle', hits: [6, 6] } },
  colossus: { id: 'colossus', name: 'Torque Colossus', mark: '♜', shape: 'hex', hue: 40, hp: 5, bounty: 26, moves: { k: 'cycle', hits: [7, 7, 14] } },
  warden: { id: 'warden', name: 'Resonance Warden', mark: '♜', shape: 'spike', hue: 315, hp: 6, bounty: 28, moves: { k: 'cycle', hits: [8, 8, 15] } }
};

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
  if (intent.kind === 'attack') return `⚔ ${intent.damage}`;
  if (intent.kind === 'charge') return `⋯ ${intent.damage}`;
  if (intent.kind === 'drain') return `⚔ ${intent.damage} ⛁`;
  if (intent.kind === 'guard') return '🛡 shield';
  return '⚔';
}

function hydrateUnits(battle) {
  battle.units.forEach(unit => {
    if (!unit.def) {
      unit.def = ENEMY_ROSTER[unit.id] || ACT_ELITES[unit.id];
      if (!unit.def) {
        // Unknown ids (and pre-bestiary saves) fall back to a boss-shaped unit.
        const boss = currentAct().boss;
        unit.def = { id: unit.id || 'boss', name: boss.name, mark: boss.mark, shape: 'hex', hue: 45, hp: unit.maxHp || 4, bounty: 0, moves: { k: 'cycle', hits: [6, 6, 13] } };
      }
    }
    if (typeof unit.phase !== 'number') unit.phase = 0;
    if (typeof unit.shield !== 'boolean') unit.shield = false;
    if (typeof unit.power !== 'number') unit.power = unit.def.moves.power || 0;
  });
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
    const bossDef = { id: 'boss', name: boss.name, mark: boss.mark, shape: 'hex', hue: 45, hp: 8, bounty: 0, moves: { k: 'cycle', hits: [6, 6, 13] } };
    return { units: [spawnUnit(bossDef)], reward: encounters[boss.encounter].reward };
  }
  if (node.kind === 'elite') {
    const units = [spawnUnit(ACT_ELITES[pool.elite]), spawnUnit(ENEMY_ROSTER[sample(pool.cheap)])];
    return { units, reward: encounters[node.encounter]?.reward ?? 45 };
  }
  const tier = [...COMPOSITIONS].reverse().find(entry => node.floor >= entry.minFloor) || COMPOSITIONS[0];
  const units = sample(tier.packs).flatMap(role => fillCompositionSlot(role, pool));
  if (units.length > 4) units.length = 4; // keep the battlefield legible — big mixes lose a body
  return { units, reward: units.reduce((sum, unit) => sum + unit.def.bounty, 0) };
}

function createBattle(node, encounterKey) {
  if (!['encounter', 'elite', 'joule'].includes(node.kind)) return null;
  const pack = buildPack(node);
  return { kind: node.kind, round: 0, target: 0, hint: null, reward: pack.reward, questions: drawBattleQuestions(encounterKey, node), units: pack.units };
}

function unitName(battle, index) {
  const unit = battle.units[index];
  const twins = battle.units.filter(other => other.id === unit.id).length > 1;
  return `${unit.def.name}${twins ? ` ${battle.units.slice(0, index + 1).filter(other => other.id === unit.id).length}` : ''}`;
}

function battleActors() {
  if (!state.battle) return '';
  const battle = hydrateUnits(state.battle);
  const units = battle.units.map((unit, index) => {
    const defeated = unit.hp <= 0;
    const targeted = index === battle.target && !defeated;
    const name = unitName(battle, index);
    const intent = unitIntent(unit);
    const art = unit.def.art
      ? `<img src="${unit.def.art}" alt="${name}">`
      : `<span class="unit-glyph shape-${unit.def.shape || 'blob'}" style="--unit-hue:${unit.def.hue ?? 40}" aria-hidden="true">${unit.def.mark}</span>`;
    return `<button type="button" class="enemy-unit ${unit.def.art ? 'enemy-art-unit' : 'enemy-glyph-unit'}${targeted ? ' is-targeted' : ''}${defeated ? ' is-defeated' : ''}${unit.shield ? ' is-shielded' : ''}" data-enemy="${index}"${defeated ? ' disabled' : ''} aria-pressed="${targeted}" aria-label="${name}, ${unit.hp} of ${unit.maxHp} health">
      <span class="intent-pip is-${intent.kind}" aria-hidden="true">${intentLabel(intent)}</span>
      <span class="unit-art">${art}</span>
      <b>${name}</b>
      <span class="enemy-health"><i style="width:${unit.hp / unit.maxHp * 100}%"></i></span>
      <small>${unit.hp}/${unit.maxHp}</small>
    </button>`;
  }).join('');
  return `<section class="battle-field" data-battle-kind="${battle.kind}" aria-label="Battlefield">
    <div class="player-combatant"><img src="assets/student-determined-cutout.png" alt="Explorer ready for battle"><div class="fighter-readout"><b>Explorer</b><div class="fighter-health"><i data-battle-player-bar style="width:${state.health / state.maxHealth * 100}%"></i></div><small data-battle-player-health>${state.health}/${state.maxHealth}</small></div></div>
    <div class="enemy-side">
      <div class="enemy-intent"><span>Every answer</span><b>the pack strikes back</b></div>
      <div class="enemy-pack" id="enemy-pack">${units}</div>
    </div>
  </section>`;
}

function startEncounter(id, resume = false) {
  document.onkeydown = null;
  if (id === 'boss' && !state.beats.bossIntro) {
    state.beats.bossIntro = true;
    return playCutscene('bossIntro', () => startEncounter(id, resume));
  }
  const node = nodes.find(item => item.id === id);
  state.activeNode = id;
  state.encounter = node.encounter;
  if (!resume) state.battle = createBattle(node, node.encounter);
  else if (state.health <= 0) return renderEnd(false);
  else normalizeBattle(state.battle, encounters[node.encounter], node);
  let e = encounters[node.encounter];
  if (!state.battle) {
    // Hazard and ruin locations ask one drawn question; battles carry their own hand.
    state.drawnQuestion = pickQuestions(ENCOUNTER_TOPICS[node.encounter] || null, 1, levelsForNode(node))[0];
    e = { ...e, question: state.drawnQuestion.question, answers: state.drawnQuestion.answers, correct: state.drawnQuestion.correct };
  }
  saveRun();
  const journal = journalKinds.includes(node.kind);
  app.innerHTML = `<section class="screen encounter-screen"><div class="encounter location-${node.kind}${journal ? ' journal-location' : ''}">
    ${hud()}
    <main class="location-stage">
      <div class="scene"><div class="scene-shade"></div>${journal ? `<div class="scene-ambient" aria-hidden="true">${ambientHTML(locationAmbience[node.kind])}</div>` : ''}<div class="scene-copy"><div class="utility">${e.type}</div><h1>${e.title}</h1><p>${e.story}</p></div><div class="danger-rune" aria-hidden="true">${node.kind === 'joule' ? currentAct().boss.mark : node.icon}</div></div>
      ${battleActors()}
      <section class="challenge location-action-panel q-pop">
        ${locationActivity(node, e)}
        <div class="outcome hidden" id="outcome"></div>
        <div class="continue-row hidden" id="continue-row"><button class="primary" id="continue">Return to the trail</button></div>
      </section>
    </main>
  </div></section>`;
  document.querySelectorAll('[data-answer]').forEach(btn => btn.addEventListener('click', () => resolveAnswer(Number(btn.dataset.answer))));
  document.querySelectorAll('[data-location-action]').forEach(btn => btn.addEventListener('click', () => resolveLocationAction(btn.dataset.locationAction)));
  wireBattleAnswers();
  wireEnemyTargets();
  wireBattleHint();
  wireHudControls();
  refreshHud();
  updateHintButton();
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
    if (quip) setTimeout(() => interject(quip.line, quip.pose), 1200);
  }
}

// Backfills battle fields introduced after a run was saved, so older saves resume cleanly.
function normalizeBattle(battle, encounter, node) {
  if (!battle?.units) return;
  battle.kind = battle.kind || node.kind;
  // Pre-bestiary saves stored plain hp blobs; map them onto roster entries.
  battle.units.forEach(unit => {
    if (!unit.id) unit.id = node.kind === 'elite' ? 'rhino' : node.kind === 'joule' ? 'boss' : 'baboon';
  });
  hydrateUnits(battle);
  if (typeof battle.reward !== 'number') battle.reward = encounters[state.encounter]?.reward ?? 20;
  if (typeof battle.target !== 'number' || battle.units[battle.target]?.hp <= 0) {
    battle.target = Math.max(0, battle.units.findIndex(unit => unit.hp > 0));
  }
  if (typeof battle.hint !== 'object') battle.hint = null;
  if (!Array.isArray(battle.questions) || battle.questions.length < 3) battle.questions = drawBattleQuestions(state.encounter, node);
}

function wireBattleAnswers() {
  document.querySelectorAll('[data-battle-answer]').forEach(button => button.addEventListener('click', () => resolveBattleAnswer(Number(button.dataset.battleAnswer))));
}

function wireEnemyTargets() {
  document.querySelectorAll('.enemy-unit[data-enemy]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.enemy);
    if (!state.battle || state.battle.units[index]?.hp <= 0) return;
    state.battle.target = index;
    syncTargetRing();
  }));
}

function syncTargetRing() {
  document.querySelectorAll('.enemy-unit[data-enemy]').forEach(button => {
    const index = Number(button.dataset.enemy);
    const targeted = index === state.battle?.target && state.battle?.units[index]?.hp > 0;
    button.classList.toggle('is-targeted', targeted);
    button.setAttribute('aria-pressed', String(targeted));
  });
}

function wireBattleHint() {
  document.querySelector('#battle-hint')?.addEventListener('click', useBattleHint);
}

function useBattleHint() {
  const battle = state.battle;
  if (!battle || state.insight < 1 || battle.hint?.round === battle.round) return;
  const question = battle.questions[battle.round % battle.questions.length];
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
      ? '<b>⚡ Insight strike</b><small>No Insight remaining</small>'
      : '<b>⚡ Insight strike</b><small>Spend 1 Insight · remove one wrong answer</small>';
}

function renderBattleRound() {
  const battle = state.battle;
  const question = battle.questions[battle.round % battle.questions.length];
  document.querySelector('#battle-round').textContent = battle.round + 1;
  document.querySelector('#battle-question').textContent = question.question;
  document.querySelector('#battle-answers').innerHTML = battleAnswerButtons(question, battle);
  const outcome = document.querySelector('#outcome');
  outcome.className = 'outcome hidden';
  outcome.innerHTML = '';
  wireBattleAnswers();
  updateHintButton();
  // Retrigger the question-card entrance every round.
  const panel = document.querySelector('.location-action-panel');
  if (panel) { panel.classList.remove('q-pop', 'q-exit'); void panel.offsetWidth; panel.classList.add('q-pop'); }
}

function updateEnemyPack() {
  const battle = hydrateUnits(state.battle);
  battle.units.forEach((unit, index) => {
    const card = document.querySelector(`[data-enemy="${index}"]`);
    if (!card) return;
    const defeated = unit.hp <= 0;
    card.classList.toggle('is-defeated', defeated);
    card.classList.toggle('is-shielded', unit.shield && !defeated);
    if (defeated) card.setAttribute('disabled', '');
    card.querySelector('.enemy-health i').style.width = `${unit.hp / unit.maxHp * 100}%`;
    card.querySelector('small').textContent = `${unit.hp}/${unit.maxHp}`;
    const pip = card.querySelector('.intent-pip');
    if (pip) {
      const intent = unitIntent(unit);
      pip.className = `intent-pip is-${intent.kind}`;
      pip.textContent = intentLabel(intent);
    }
    card.setAttribute('aria-label', `${unitName(battle, index)}, ${unit.hp} of ${unit.maxHp} health${defeated ? ', defeated' : ''}`);
  });
  syncTargetRing();
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
  const pack = document.querySelector('#enemy-pack');
  if (pack) {
    pack.classList.remove('is-striking');
    void pack.offsetWidth;
    pack.classList.add('is-striking');
  }
}

// The enemy phase: after every answer, each living unit resolves the intent it
// telegraphed. Pips always describe what happens AFTER the player's next answer.
function enemyPhase(battle) {
  const notes = [];
  let total = 0;
  let stolen = 0;
  battle.units.forEach((unit, index) => {
    if (unit.hp <= 0) return;
    const intent = unitIntent(unit);
    const name = unitName(battle, index);
    if (intent.kind === 'attack' || intent.kind === 'drain') {
      total += intent.damage;
      if (intent.kind === 'drain') stolen += Math.min(intent.loot, state.coins);
      if (unit.def.moves.k === 'ramp') unit.power += unit.def.moves.growth;
      notes.push(`${name} strikes for ${intent.damage}`);
    } else if (intent.kind === 'guard') {
      unit.shield = true;
      notes.push(`${name} raises a shield`);
    } else if (intent.kind === 'charge') {
      notes.push(`${name} gathers force`);
    }
    unit.phase += 1;
  });
  if (stolen) state.coins -= stolen;
  return { total, stolen, notes };
}

function resolveBattleAnswer(choice) {
  const battle = hydrateUnits(state.battle);
  const question = battle.questions[battle.round % battle.questions.length];
  const correct = choice === question.correct;
  document.querySelectorAll('[data-battle-answer]').forEach(button => {
    button.disabled = true;
    if (Number(button.dataset.battleAnswer) === question.correct) button.classList.add('is-correct');
  });
  if (!correct) document.querySelector(`[data-battle-answer="${choice}"]`)?.classList.add('is-wrong');
  const hintButton = document.querySelector('#battle-hint');
  if (hintButton) hintButton.disabled = true;
  const outcome = document.querySelector('#outcome');
  outcome.classList.remove('hidden');
  battle.round += 1;

  let playerLine;
  if (correct) {
    state.streak += 1;
    const damage = state.streak >= 2 ? 2 : 1;
    let target = battle.units[battle.target]?.hp > 0 ? battle.target : battle.units.findIndex(unit => unit.hp > 0);
    if (target < 0) target = 0;
    const unit = battle.units[target];
    const targetName = unitName(battle, target);
    if (unit.shield) {
      unit.shield = false;
      playerLine = `<strong>Correct — ${targetName}’s shield absorbs the hit.</strong><br>The shield collapses. Your momentum holds.`;
    } else {
      unit.hp = Math.max(0, unit.hp - damage);
      if (battle.units[battle.target]?.hp <= 0) battle.target = Math.max(0, battle.units.findIndex(alive => alive.hp > 0));
      markEnemyHit(target, damage);
      playerLine = `<strong>Correct — ${damage} damage to ${targetName}.</strong>${damage > 1 ? ' Momentum — double damage.' : ''}`;
    }
  } else {
    state.streak = 0;
    state.grudge = (state.grudge || 0) + 1;
    playerLine = '<strong>Incorrect — your strike misses.</strong>';
  }

  if (battle.units.every(unit => unit.hp <= 0)) {
    const reward = battle.reward ?? encounters[state.encounter].reward;
    state.coins += reward;
    battle.won = true;
    outcome.className = 'outcome outcome-good';
    outcome.innerHTML = `<strong>Battle won — +${reward} Supplies.</strong><br>Your answer lands. The final enemy retreats into the canopy.`;
    document.querySelector('#continue-row').classList.remove('hidden');
    document.querySelector('#continue').addEventListener('click', finishEncounter);
    refreshHud();
    checkInterjections(0);
    saveRun();
    return;
  }

  const phase = enemyPhase(battle);
  updateEnemyPack();
  if (phase.total > 0) state.health = Math.max(0, state.health - phase.total);
  const enemyLine = phase.total > 0
    ? `The pack answers: <strong>−${phase.total} Stability</strong>${phase.stolen ? ` and −${phase.stolen} Supplies` : ''}.`
    : phase.notes.length ? 'The pack gathers itself. Nothing strikes — yet.' : '';
  outcome.className = correct ? 'outcome outcome-good' : 'outcome outcome-bad';
  outcome.innerHTML = `${playerLine}<br>${enemyLine} <button class="battle-next" id="battle-next">${state.health <= 0 ? 'See the aftermath' : 'Next exchange'}</button>`;
  if (phase.total > 0) playerHitFeedback(phase.total);
  refreshHud();
  checkInterjections(phase.total);
  saveRun();
  document.querySelector('#battle-next').addEventListener('click', () => {
    if (state.health <= 0) return renderEnd(false);
    // Dismiss the answered card before the next question pops in.
    const panel = document.querySelector('.location-action-panel');
    if (panel && !preferences.reducedMotion) {
      panel.classList.remove('q-pop'); panel.classList.add('q-exit');
      setTimeout(renderBattleRound, 190);
    } else renderBattleRound();
  });
}

function resolveLocationAction(action) {
  document.querySelectorAll('[data-location-action]').forEach(button => { button.disabled = true; });
  const outcome = document.querySelector('#outcome');
  outcome.classList.remove('hidden');

  const finish = (tone, message) => {
    outcome.className = `outcome outcome-${tone}`;
    outcome.innerHTML = message;
    document.querySelector('#continue-row').classList.remove('hidden');
    document.querySelector('#continue').addEventListener('click', finishEncounter);
    state.pendingCompletion = true;
    refreshHud();
    saveRun();
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

  if (action === 'recover') {
    const restored = Math.min(15, state.maxHealth - state.health);
    state.health += restored;
    return finish('good', `<strong>Stability restored by ${restored}.</strong><br>The stones hold while you catch your breath.`);
  }
  if (action === 'prepare') {
    state.insight += 1;
    return finish('good', '<strong>Insight gained.</strong><br>One diagram is labelled “obvious”. It becomes obvious after twelve minutes.');
  }
  if (action.startsWith('buy-')) {
    const item = shopCatalogue.find(entry => `buy-${entry.id}` === action);
    const price = item ? shopPrice(item) : 0;
    if (!item) return finish('bad', '<strong>The trader mishears you completely.</strong><br>Nothing changes hands. Nobody speaks of it again.');
    if (state.coins < price) return finish('bad', `<strong>Not enough Supplies for the ${item.name.toLowerCase()}.</strong><br>The trader recommends acquiring wealth before attempting commerce.`);
    state.coins -= price;
    if (item.id === 'rations') state.health = Math.min(state.maxHealth, state.health + 10);
    else if (item.id === 'tonic') state.health = Math.min(state.maxHealth, state.health + 20);
    else if (item.id === 'rope') state.insight += 1;
    else if (item.id === 'notes') state.insight += 2;
    else if (item.id === 'charm') { state.charmOwned = true; state.maxHealth += 5; state.health += 5; }
    return finish('good', `<strong>${item.name} acquired — ${price} Supplies.</strong><br>${item.flavor}`);
  }
  if (action === 'trade') {
    if (state.insight < 1) return finish('bad', '<strong>No Insight to trade.</strong><br>The trader refuses to accept confidence as legal tender.');
    state.insight -= 1;
    state.coins += 20;
    return finish('good', '<strong>Trade complete — 20 Supplies gained.</strong><br>You immediately forget one useful diagram.');
  }
  if (action === 'inspect') {
    state.coins += 18; state.insight += 1;
    return finish('good', '<strong>Mechanism understood — 18 Supplies and 1 Insight.</strong><br>You disarm the spring on paper, which is the safest place to disarm anything.');
  }
  if (action === 'open') {
    return gamble('The catch resists…', () => {
      const roll = Math.random();
      if (roll < .60) { state.coins += 40; return ['good', '<strong>Cache opened clean — 40 Supplies.</strong><br>The spring fires harmlessly past your ear. Technically, that counts as warning you.']; }
      if (roll < .85) { state.coins += 18; state.health = Math.max(0, state.health - 4); return ['bad', '<strong>A spring fires — mostly past your ear — 18 Supplies, −4 Stability.</strong><br>Mostly.']; }
      state.coins += 8; state.health = Math.max(0, state.health - 9);
      return ['bad', '<strong>The cache fights back — 8 Supplies, −9 Stability.</strong><br>The lock transfers its energy into you. Personally.'];
    });
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
  checkInterjections(correct ? 0 : e.damage);
  document.querySelector('#continue-row').classList.remove('hidden');
  document.querySelector('#continue').addEventListener('click', finishEncounter);
  state.pendingCompletion = true;
  saveRun();
}

function finishEncounter() {
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
  saveRun();
  // Story beats: the deeper canopy opens at the floor elites begin appearing,
  // and the first elite cleared earns its own moment of respect.
  if (node.floor >= 4 && !state.beats.midpoint) {
    state.beats.midpoint = true;
    saveRun();
    return playCutscene('midpoint', renderMap);
  }
  if (node.kind === 'elite' && !state.beats.elite) {
    state.beats.elite = true;
    saveRun();
    return playCutscene('elite', renderMap);
  }
  renderMap();
}

// Clearing an act guardian opens the next act: a fresh map, a small camp
// bonus, and story beats rearmed for the new ascent.
function advanceAct() {
  state.act = (state.act || 1) + 1;
  state.asked = {};
  state.drawnQuestion = null;
  state.beats = { midpoint: false, elite: false, bossIntro: false };
  state.health = Math.min(state.maxHealth, state.health + 20);
  nodes = generateMap(state.act);
  const start = nodes.find(node => node.id === 'start');
  state.current = 'start';
  state.completed = ['start'];
  state.available = [...start.links];
  state.activeNode = null;
  state.encounter = null;
  saveRun();
  interject(ACTS[state.act - 1].intro, 'explaining');
  renderMap();
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
