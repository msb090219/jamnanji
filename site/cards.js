// Jamnanji — card registry for the deck-building battle system.
// Cards are the verbs of combat; the physics question that resolves each
// turn is the skill check. Each card is a mechanics concept: its name and
// effect teach the idea it carries.
//
// Card shape: { id, name, cost, type, topic, rarity, target, text, up, effect }
//   type   : attack | skill | power
//   topic  : question topic it draws from when it leads the turn, or null (any)
//   target : enemy | all | self
//   text/up: normal and upgraded effect descriptions
//   effect : { k, ... } executor payload consumed by applyCardEffect()
// `up` variants are exact replacements of the numeric values in text.

const CARDS = [
  // —— Starter deck ——
  { id: 'strike', name: 'Strike', cost: 1, type: 'attack', topic: null, rarity: 'starter', target: 'enemy', text: 'Deal 5 damage.', up: 'Deal 8 damage.', effect: { k: 'damage', n: 5, up: 8 } },
  { id: 'brace', name: 'Brace', cost: 1, type: 'skill', topic: null, rarity: 'starter', target: 'self', text: 'Gain 6 Block.', up: 'Gain 9 Block.', effect: { k: 'block', n: 6, up: 9 } },
  { id: 'study', name: 'Field Study', cost: 1, type: 'skill', topic: null, rarity: 'starter', target: 'enemy', text: 'Deal 1 damage. Gain 1 Insight.', up: 'Deal 2 damage. Gain 2 Insight.', effect: { k: 'insight', n: 1, up: 2 } },
  { id: 'sweep', name: 'Impulse Sweep', cost: 2, type: 'attack', topic: 'momentum', rarity: 'starter', target: 'all', text: 'Deal 4 damage to ALL enemies. Shatters shields.', up: 'Deal 6 damage to ALL enemies.', effect: { k: 'sweep', n: 4, up: 6 } },

  // —— Commons ——
  { id: 'thirdlaw', name: 'Newton\u2019s Third Law', cost: 1, type: 'attack', topic: 'momentum', rarity: 'common', target: 'self', text: 'Deal damage equal to what you took last turn.', up: 'Deal that damage +3.', effect: { k: 'thirdlaw', up: 3 } },
  { id: 'conserve', name: 'Conservation of Energy', cost: 2, type: 'skill', topic: 'energy', rarity: 'common', target: 'enemy', text: 'Convert all current Block into damage to the target.', up: 'Also regain half as much Block.', effect: { k: 'conserve' } },
  { id: 'kinetic', name: 'Kinetic Strike', cost: 2, type: 'attack', topic: 'energy', rarity: 'common', target: 'enemy', text: 'Deal 9 damage.', up: 'Deal 13 damage.', effect: { k: 'damage', n: 9, up: 13 } },
  { id: 'damping', name: 'Damping Field', cost: 1, type: 'skill', topic: 'shm', rarity: 'common', target: 'all', text: 'Enemies deal 3 less damage for 2 turns.', up: 'Enemies deal 4 less for 3 turns.', effect: { k: 'damping', n: 3, dur: 2, up: 4 } },
  { id: 'friction', name: 'Friction', cost: 1, type: 'skill', topic: 'rolling', rarity: 'common', target: 'enemy', text: 'Target is Weakened: it deals 2 less for 2 turns.', up: 'Deals 3 less for 3 turns.', effect: { k: 'friction', n: 2, dur: 2, up: 3 } },
  { id: 'torque', name: 'Torque', cost: 1, type: 'attack', topic: 'rotational', rarity: 'common', target: 'enemy', text: 'Deal 3 damage. Double against shielded enemies.', up: 'Deal 5 damage.', effect: { k: 'torque', n: 3, up: 5 } },
  { id: 'potential', name: 'Stored Potential', cost: 0, type: 'skill', topic: 'energy', rarity: 'common', target: 'self', text: 'Gain 4 Block. Draw 1 card.', up: 'Gain 6 Block. Draw 1 card.', effect: { k: 'potential', n: 4, up: 6 } },
  { id: 'impulse-transfer', name: 'Impulse Transfer', cost: 1, type: 'attack', topic: 'momentum', rarity: 'common', target: 'enemy', text: 'Deal 4 damage. Gain 4 Block.', up: 'Deal 6 damage. Gain 6 Block.', effect: { k: 'damage_block', n: 4, up: 6, b: 4, upB: 6 } },
  { id: 'mass-distribution', name: 'Mass Distribution', cost: 1, type: 'skill', topic: 'com', rarity: 'common', target: 'self', text: 'Gain 7 Block. Draw 1 card.', up: 'Gain 10 Block. Draw 1 card.', effect: { k: 'block_draw', n: 7, up: 10, draw: 1 } },
  { id: 'closing-speed', name: 'Closing Speed', cost: 1, type: 'attack', topic: 'relative', rarity: 'common', target: 'enemy', text: 'Deal 7 damage.', up: 'Deal 10 damage.', effect: { k: 'damage', n: 7, up: 10 } },
  { id: 'frame-shift', name: 'Frame Shift', cost: 1, type: 'skill', topic: 'relative', rarity: 'common', target: 'self', text: 'Gain 5 Block. Draw 1 card.', up: 'Gain 8 Block. Draw 1 card.', effect: { k: 'block_draw', n: 5, up: 8, draw: 1 } },
  { id: 'angular-acceleration', name: 'Angular Acceleration', cost: 1, type: 'attack', topic: 'rotational', rarity: 'common', target: 'enemy', text: 'Deal 3 damage twice.', up: 'Deal 3 damage three times.', effect: { k: 'multi', n: 3, hits: 2, up: 3, upHits: 3 } },
  { id: 'no-slip', name: 'No-Slip Contact', cost: 1, type: 'attack', topic: 'rolling', rarity: 'common', target: 'enemy', text: 'Deal 5 damage. Gain 5 Block.', up: 'Deal 7 damage. Gain 7 Block.', effect: { k: 'damage_block', n: 5, up: 7, b: 5, upB: 7 } },
  { id: 'centripetal', name: 'Centripetal Force', cost: 1, type: 'attack', topic: 'circular', rarity: 'common', target: 'enemy', text: 'Deal 6 damage. Weaken the target by 2 this turn.', up: 'Deal 9 damage. Weaken it by 3.', effect: { k: 'damage_weak', n: 6, up: 9, weak: 2, upWeak: 3, dur: 1 } },
  { id: 'banked-curve', name: 'Banked Curve', cost: 1, type: 'skill', topic: 'circular', rarity: 'common', target: 'self', text: 'Gain 7 Block. Draw 1 card.', up: 'Gain 10 Block. Draw 1 card.', effect: { k: 'block_draw', n: 7, up: 10, draw: 1 } },
  { id: 'gravity-assist', name: 'Gravity Assist', cost: 1, type: 'attack', topic: 'orbital', rarity: 'common', target: 'enemy', text: 'Deal 5 damage. Draw 1 card.', up: 'Deal 8 damage. Draw 1 card.', effect: { k: 'damage_draw', n: 5, up: 8, draw: 1 } },
  { id: 'low-orbit', name: 'Low Orbit', cost: 1, type: 'attack', topic: 'orbital', rarity: 'common', target: 'enemy', text: 'Deal 3 damage twice.', up: 'Deal 4 damage twice.', effect: { k: 'multi', n: 3, hits: 2, up: 4, upHits: 2 } },

  // —— Rares ——
  { id: 'resonance', name: 'Resonance', cost: 2, type: 'skill', topic: 'shm', rarity: 'rare', target: 'self', text: 'Your next card this turn resolves twice.', up: 'Costs 1 instead of 2.', effect: { k: 'resonance' } },
  { id: 'inertia', name: 'Inertia', cost: 1, type: 'power', topic: 'com', rarity: 'rare', target: 'self', text: 'Your Block no longer expires this battle.', up: 'Costs 0 instead of 1.', effect: { k: 'inertia' } },
  { id: 'pendulum', name: 'Pendulum Swing', cost: 2, type: 'attack', topic: 'shm', rarity: 'rare', target: 'enemy', text: 'Deal 9 damage. 4 next turn, then 9 again.', up: '13 now, 6 next, 13 after.', effect: { k: 'pendulum', n: 9, mid: 4, up: 13, upMid: 6 } },
  { id: 'inelastic-impact', name: 'Inelastic Impact', cost: 2, type: 'attack', topic: 'momentum', rarity: 'rare', target: 'enemy', text: 'Deal 11 damage. Weaken the target by 2 for 2 turns.', up: 'Deal 15 damage. Weaken it by 3 for 2 turns.', effect: { k: 'damage_weak', n: 11, up: 15, weak: 2, upWeak: 3, dur: 2 } },
  { id: 'stable-system', name: 'Stable System', cost: 2, type: 'skill', topic: 'com', rarity: 'rare', target: 'self', text: 'Gain 10 Block. Draw 2 cards.', up: 'Gain 14 Block. Draw 2 cards.', effect: { k: 'block_draw', n: 10, up: 14, draw: 2 } },
  { id: 'vector-sum', name: 'Vector Sum', cost: 2, type: 'attack', topic: 'relative', rarity: 'rare', target: 'enemy', text: 'Deal 9 damage. Gain 9 Block.', up: 'Deal 13 damage. Gain 13 Block.', effect: { k: 'damage_block', n: 9, up: 13, b: 9, upB: 13 } },
  { id: 'flywheel', name: 'Flywheel Reserve', cost: 1, type: 'skill', topic: 'rotational', rarity: 'rare', target: 'self', text: 'Gain 1 extra Energy next turn. Draw 1 card.', up: 'Gain 2 extra Energy next turn. Draw 1 card.', effect: { k: 'next_energy', n: 1, up: 2, draw: 1 } },
  { id: 'downhill-race', name: 'Downhill Race', cost: 2, type: 'attack', topic: 'rolling', rarity: 'rare', target: 'enemy', text: 'Deal 4 damage three times.', up: 'Deal 5 damage four times.', effect: { k: 'multi', n: 4, hits: 3, up: 5, upHits: 4 } },
  { id: 'vertical-loop', name: 'Vertical Loop', cost: 2, type: 'attack', topic: 'circular', rarity: 'rare', target: 'enemy', text: 'Deal 11 damage. Gain 7 Block.', up: 'Deal 15 damage. Gain 10 Block.', effect: { k: 'damage_block', n: 11, up: 15, b: 7, upB: 10 } },
  { id: 'escape-velocity', name: 'Escape Velocity', cost: 2, type: 'attack', topic: 'orbital', rarity: 'rare', target: 'enemy', text: 'Deal 12 damage. Double below half health.', up: 'Deal 16 damage. Double below half health.', effect: { k: 'execute', n: 12, up: 16 } }
];

const CARD_INDEX = new Map(CARDS.map(card => [card.id, card]));

function cardDef(id) { return CARD_INDEX.get(id); }

// Decks and piles hold instances — { id, upgraded } — never live defs,
// so saves stay small and upgrades persist per copy.
function cardInstance(id, upgraded = false) { return { id, upgraded: !!upgraded }; }

function starterDeck() {
  return [
    ...Array.from({ length: 4 }, () => cardInstance('strike')),
    ...Array.from({ length: 4 }, () => cardInstance('brace')),
    cardInstance('study'),
    cardInstance('sweep')
  ];
}

// Cards offered as rewards must match the act's curriculum topics.
function cardPool(actNumber, rarities = ['common', 'rare']) {
  const act = ACTS[Math.min(Math.max(actNumber, 1), ACTS.length) - 1];
  return CARDS.filter(card => card.rarity !== 'starter'
    && rarities.includes(card.rarity)
    && (card.topic === null || act.topics.includes(card.topic)));
}

function cardRewardChoices(actNumber, count = 3) {
  const pool = cardPool(actNumber);
  const picks = [];
  while (picks.length < count && picks.length < pool.length) {
    const roll = Math.random();
    const tier = roll < .7 ? 'common' : 'rare';
    let candidates = pool.filter(card => card.rarity === tier && !picks.includes(card));
    if (!candidates.length) candidates = pool.filter(card => !picks.includes(card));
    if (!candidates.length) break;
    picks.push(candidates[Math.floor(Math.random() * candidates.length)]);
  }
  return picks;
}
