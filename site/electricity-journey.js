// Electricity journey infrastructure. Available on local and public hosts.
// Notes mirror docs/ELECTRICITY-SECTION-INTRODUCTIONS.md; IDs mirror the journey plan.
const ELECTRICITY_SECTIONS = [
  {
    "id": "I.1",
    "name": "The Supply Ruins",
    "intro": "The supply ruins divide into several conducting paths. Before following the current, separate two ideas: charge flows around a circuit, while energy is transferred between the source and components. A battery’s emf describes energy supplied per unit charge—not the amount of current it delivers.",
    "principle": "At a steady junction, incoming and outgoing currents balance because charge does not accumulate. Around a DC loop, signed potential changes balance because energy is conserved. For a discharging cell, terminal voltage is ε − Ir.",
    "conditions": "Adding a parallel load to a real battery can lower terminal voltage. With an ideal constant-voltage source, it does not. Identify what stays fixed before comparing brightness or power.",
    "misconception": "Current is not used up by a resistor, and it does not flow only through the lowest-resistance branch.",
    "prompt": "Why can adding a parallel lamp dim the original lamp when the battery has internal resistance?",
    "act": 1,
    "order": 1,
    "from": 1,
    "to": 3,
    "questionIds": [
      "elec-dc-01",
      "elec-dc-02",
      "elec-dc-03",
      "elec-dc-04",
      "elec-dc-05",
      "elec-dc-06",
      "elec-dc-07",
      "elec-dc-08",
      "elec-dc-09",
      "elec-dc-10",
      "elec-dc-11",
      "elec-dc-12",
      "elec-dc-13",
      "elec-dc-14",
      "elec-dc-15",
      "elec-dc-16"
    ]
  },
  {
    "id": "I.2",
    "name": "The Capacitor Gardens",
    "intro": "The gardens contain pairs of conducting plates separated by insulating material. A capacitor stores energy in an electric field as opposite charges separate. Its capacitance describes the charge stored per unit voltage; changing charge alone does not change an ideal capacitor’s capacitance.",
    "principle": "Q = CV. For parallel plates, larger area and a suitable dielectric increase capacitance; greater separation reduces it. Capacitors in parallel share voltage. Initially uncharged capacitors in a simple series chain have equal charge magnitudes when intermediate connections remain isolated.",
    "conditions": "An isolated capacitor retains charge if leakage is negligible. A capacitor connected to an ideal battery retains voltage instead. Use those different constraints before reasoning about energy, U = ½QV.",
    "misconception": "Inserting a dielectric does not always reduce stored energy; the result depends on whether charge or voltage is held fixed.",
    "prompt": "Why does the same increase in capacitance have different energy consequences for an isolated capacitor and a battery-connected one?",
    "act": 1,
    "order": 2,
    "from": 4,
    "to": 6,
    "questionIds": [
      "elec-capacitors-01",
      "elec-capacitors-02",
      "elec-capacitors-03",
      "elec-capacitors-04",
      "elec-capacitors-05",
      "elec-capacitors-06",
      "elec-capacitors-07",
      "elec-capacitors-08",
      "elec-capacitors-09",
      "elec-capacitors-10",
      "elec-capacitors-11",
      "elec-capacitors-18",
      "elec-capacitors-24",
      "elec-capacitors-25",
      "elec-capacitors-26"
    ]
  },
  {
    "id": "I.3",
    "name": "The Discharge Gate",
    "intro": "The gate responds gradually rather than instantly. During charging through a resistor, the capacitor voltage grows and the voltage left across the resistor falls. That reduces the current, so the remaining change takes progressively longer.",
    "principle": "Current is the rate of change of charge; signed area under a current–time graph gives charge transferred. The time constant RC describes the timescale, not a moment when charging or discharging suddenly becomes complete.",
    "conditions": "Compare trials with the same initial state and identify which component or supply changes. With a fixed ideal charging supply and capacitor, increasing resistance reduces initial current and slows charging but does not change final charge.",
    "misconception": "Energy supplied by the battery is not all stored in the capacitor; the charging resistor also dissipates energy.",
    "prompt": "How can two charging trials finish with the same charge but have different current–time curves?",
    "act": 1,
    "order": 3,
    "from": 7,
    "to": 9,
    "questionIds": [
      "elec-capacitors-12",
      "elec-capacitors-13",
      "elec-capacitors-14",
      "elec-capacitors-15",
      "elec-capacitors-16",
      "elec-capacitors-17",
      "elec-capacitors-19",
      "elec-capacitors-20",
      "elec-capacitors-21",
      "elec-capacitors-22",
      "elec-capacitors-23",
      "elec-capacitors-27",
      "elec-capacitors-28"
    ]
  },
  {
    "id": "II.1",
    "name": "The Flux Marsh",
    "intro": "Here, the important quantity is not simply how strong a magnetic field is. Magnetic flux also depends on the area it crosses and the orientation of that area. Induced emf depends on how quickly flux linkage changes—not on how large the linkage already is.",
    "principle": "For a flat loop in a uniform field, Φ = BA cosθ, with θ measured from the area normal. Faraday’s law gives emf = −d(NΦ)/dt. Graph slope determines instantaneous emf; net linkage change determines signed average emf over an interval.",
    "conditions": "Motion is not sufficient by itself. A rigid loop translating wholly within a uniform steady field, with unchanged area and orientation, has no net changing flux. Conversely, changing field strength can induce emf in a stationary loop.",
    "misconception": "Zero flux at one instant does not imply zero emf; the flux may be crossing zero with a nonzero slope.",
    "prompt": "Can a coil have zero average emf over an interval while its emf is nonzero during parts of that interval?",
    "act": 2,
    "order": 1,
    "from": 1,
    "to": 3,
    "questionIds": [
      "elec-induction-01",
      "elec-induction-02",
      "elec-induction-03",
      "elec-induction-04",
      "elec-induction-05",
      "elec-induction-06",
      "elec-induction-21",
      "elec-induction-22",
      "elec-induction-24",
      "elec-induction-26",
      "elec-induction-37",
      "elec-induction-38",
      "elec-induction-39",
      "elec-induction-40",
      "elec-induction-41",
      "elec-induction-42"
    ]
  },
  {
    "id": "II.2",
    "name": "The Lenz Crossing",
    "intro": "The crossing reacts to change. To determine an induced current, first identify the applied flux direction and whether it is increasing or decreasing. Then choose an induced field that opposes that change and use the right-hand grip rule to find conventional-current direction.",
    "principle": "An induced field can support a weakening applied field or oppose a strengthening one. This response is consistent with energy conservation: induced-current braking requires mechanical energy input or a decrease in another energy store.",
    "conditions": "State which face of the loop you are viewing. Clockwise reverses its label when viewed from the other side. Distinguish the induced field from the total field; Lenz’s law does not say the induced contribution always dominates.",
    "misconception": "The induced field does not always oppose the applied field itself. Nor does induced emf guarantee a circulating conduction current through an open path.",
    "prompt": "Why can a falling magnet keep heating a conducting tube after reaching a constant downward speed?",
    "act": 2,
    "order": 2,
    "from": 4,
    "to": 6,
    "questionIds": [
      "elec-induction-07",
      "elec-induction-08",
      "elec-induction-09",
      "elec-induction-10",
      "elec-induction-23",
      "elec-induction-25",
      "elec-induction-36",
      "elec-induction-43",
      "elec-induction-44",
      "elec-induction-45",
      "elec-induction-46",
      "elec-induction-47",
      "elec-induction-48",
      "elec-induction-49",
      "elec-induction-50",
      "elec-induction-51"
    ]
  },
  {
    "id": "II.3",
    "name": "The Coil Foundry",
    "intro": "A coil’s changing current changes its magnetic flux linkage, producing a self-induced emf. The coil therefore resists changes in current rather than resisting all current. Once ideal steady DC is established, its induced emf can vanish while its magnetic field still stores energy.",
    "principle": "For a linear inductor, induced emf = −L dI/dt and stored energy is ½LI². The RL timescale is L/R, unlike RC. A transformer links coils through changing flux; an ideal transformer changes voltage and current consistently with power conservation.",
    "conditions": "Current cannot jump through an ideal inductor under finite voltage. A switch-off decay needs a stated conducting path; opening a real circuit can create a large voltage and a spark. Steady DC does not sustain transformer secondary emf after the switching transient.",
    "misconception": "Zero induced emf does not mean zero current or zero stored magnetic energy.",
    "prompt": "Why does increasing resistance make an RL transient settle faster but an RC transient settle more slowly?",
    "act": 2,
    "order": 3,
    "from": 7,
    "to": 9,
    "questionIds": [
      "elec-induction-11",
      "elec-induction-12",
      "elec-induction-13",
      "elec-induction-14",
      "elec-induction-15",
      "elec-induction-16",
      "elec-induction-17",
      "elec-induction-18",
      "elec-induction-19",
      "elec-induction-20",
      "elec-induction-27",
      "elec-induction-28",
      "elec-induction-29",
      "elec-induction-30",
      "elec-induction-31",
      "elec-induction-32",
      "elec-induction-33",
      "elec-induction-34",
      "elec-induction-35"
    ]
  },
  {
    "id": "III.1",
    "name": "The Alternating Steps",
    "intro": "A signal can reverse direction each cycle and still transfer energy. RMS current or voltage describes the equivalent steady heating effect in a fixed resistor. Phase describes timing within a cycle; it is separate from how tall a graph or phasor is.",
    "principle": "For sinusoidal signals, the RMS value is the peak divided by √2. Resistor voltage and current are in phase. Capacitor current leads its voltage by a quarter-cycle; inductor voltage leads its current by a quarter-cycle.",
    "conditions": "These component phase rules assume ideal components in sinusoidal steady state. The peak-to-RMS factor depends on waveform. Compare corresponding peaks or zero crossings when identifying phase.",
    "misconception": "Zero mean current does not imply zero heating: resistive power depends on current squared.",
    "prompt": "Why is capacitor current zero at a voltage maximum but greatest in magnitude at a voltage zero crossing?",
    "act": 3,
    "order": 1,
    "from": 1,
    "to": 4,
    "questionIds": [
      "elec-ac-01",
      "elec-ac-02",
      "elec-ac-03",
      "elec-ac-04",
      "elec-ac-05",
      "elec-ac-20",
      "elec-ac-21",
      "elec-ac-22",
      "elec-ac-23",
      "elec-ac-24",
      "elec-ac-25",
      "elec-ac-26",
      "elec-ac-27",
      "elec-ac-28",
      "elec-ac-50",
      "elec-ac-51"
    ]
  },
  {
    "id": "III.2",
    "name": "The Phase Bridges",
    "intro": "Series components carry the same current, but their voltage peaks need not occur together. Phasors keep those timing differences visible. Source voltage is a vector sum of component-voltage phasors, not generally a sum of their magnitudes.",
    "principle": "Inductive reactance grows with frequency, X_L = ωL, while capacitive reactance falls, X_C = 1/(ωC). Impedance combines resistance and net reactance. In series LCR, inductive and capacitive voltage phasors oppose one another, so their reactive contributions subtract.",
    "conditions": "State what is fixed—frequency, source amplitude, resistance, inductance or capacitance. Increasing capacitance in a CR circuit changes both impedance and phase; neither change can be inferred merely from the word “larger”.",
    "misconception": "Reactance can limit current without dissipating average power like resistance. Ideal reactive components alternately store and return energy.",
    "prompt": "Why does inserting a core that increases inductance reduce current in an LR circuit at fixed resistance, frequency and supply voltage?",
    "act": 3,
    "order": 2,
    "from": 5,
    "to": 8,
    "questionIds": [
      "elec-ac-06",
      "elec-ac-07",
      "elec-ac-08",
      "elec-ac-09",
      "elec-ac-10",
      "elec-ac-11",
      "elec-ac-12",
      "elec-ac-19",
      "elec-ac-29",
      "elec-ac-30",
      "elec-ac-31",
      "elec-ac-32",
      "elec-ac-33",
      "elec-ac-34",
      "elec-ac-47",
      "elec-ac-48",
      "elec-ac-49"
    ]
  },
  {
    "id": "III.3",
    "name": "The Resonance Crown",
    "intro": "At the crown, inductive and capacitive responses can balance. Series resonance occurs when their reactances match. The net reactive contribution then vanishes, but both components can still carry substantial voltage and exchange stored energy.",
    "principle": "In the ideal series model with nonzero fixed resistance, resonance gives minimum impedance and maximum current for a fixed supply amplitude. The condition ωL = 1/(ωC) determines the resonant frequency. Changing L or C detunes a circuit unless the driving frequency is adjusted.",
    "conditions": "Compare current-response curves with the same L, C and supply amplitude. Increasing series resistance lowers the peak and broadens the response. Distinguish driven resonance from free LC oscillation; with resistance, free oscillations can lose energy.",
    "misconception": "Zero net reactance does not mean zero stored energy or zero voltage across the capacitor and inductor.",
    "prompt": "How can a capacitor-voltage amplitude exceed the source amplitude at series resonance without violating the loop law?",
    "act": 3,
    "order": 3,
    "from": 9,
    "to": 12,
    "questionIds": [
      "elec-ac-13",
      "elec-ac-14",
      "elec-ac-15",
      "elec-ac-16",
      "elec-ac-17",
      "elec-ac-18",
      "elec-ac-35",
      "elec-ac-36",
      "elec-ac-37",
      "elec-ac-38",
      "elec-ac-39",
      "elec-ac-40",
      "elec-ac-41",
      "elec-ac-42",
      "elec-ac-43",
      "elec-ac-44",
      "elec-ac-45",
      "elec-ac-46",
      "elec-ac-52"
    ]
  }
];

const ELECTRICITY_ACTS = [
  { id: 1, numeral: 'Act I', name: 'The Charged Canopy', gateLabel: 'Supply ruins gate', floors: 9, topics: ['dc', 'capacitors'], boss: { encounter: 'boss', name: 'The Accumulator', mark: 'ϟ', art: 'assets/electricity-guardian-accumulator.webp', scale: 2.25 } },
  { id: 2, numeral: 'Act II', name: 'The Induction Wilds', gateLabel: 'Flux marsh gate', floors: 9, topics: ['induction'], boss: { encounter: 'boss2', name: 'The Induction Colossus', mark: 'ϟ', art: 'assets/electricity-guardian-induction-colossus.webp', scale: 2.35 } },
  { id: 3, numeral: 'Act III', name: 'The Resonant Spire', gateLabel: 'Alternating steps gate', floors: 12, topics: ['ac'], boss: { encounter: 'boss3', name: 'The Stormheart', mark: 'ϟ', art: 'assets/electricity-guardian-stormheart.webp', scale: 2.3 } }
];

const ELECTRICITY_ENEMIES = {
  branchBeetle: { id: 'branchBeetle', name: 'Branch Beetle', mark: '⑂', shape: 'hex', hue: 52, hp: 6, role: 'swarm', bounty: 5, moves: { k: 'cycle', hits: [2, 3] }, art: 'assets/electricity-enemy-branch-beetle.webp', scale: .48 },
  copperback: { id: 'copperback', name: 'Copperback Tortoise', mark: '⌁', shape: 'hex', hue: 34, hp: 18, role: 'heavy', bounty: 14, moves: { k: 'guard', power: 7 }, art: 'assets/electricity-enemy-copperback-tortoise.webp', scale: .82 },
  relayHornet: { id: 'relayHornet', name: 'Relay Hornet', mark: '⌇', shape: 'diamond', hue: 47, hp: 10, role: 'soldier', bounty: 9, moves: { k: 'cycle', hits: [3, 6] }, art: 'assets/electricity-enemy-relay-hornet.webp', scale: .5, hover: 44 },
  capacitorMantis: { id: 'capacitorMantis', name: 'Capacitor Mantis', mark: '⊣', shape: 'tri', hue: 174, hp: 15, role: 'soldier', bounty: 12, moves: { k: 'charge', windup: 2, burst: 11 }, art: 'assets/electricity-enemy-capacitor-mantis.webp', scale: .72 },
  dielectricGecko: { id: 'dielectricGecko', name: 'Dielectric Gecko', mark: '▥', shape: 'blob', hue: 126, hp: 7, role: 'swarm', bounty: 6, moves: { k: 'guard', power: 4 }, art: 'assets/electricity-enemy-dielectric-gecko.webp', scale: .46 },
  plateCrab: { id: 'plateCrab', name: 'Plate Crab', mark: '║', shape: 'hex', hue: 194, hp: 22, role: 'heavy', bounty: 16, moves: { k: 'cycle', hits: [5, 8] }, art: 'assets/electricity-enemy-plate-crab.webp', scale: .8 },
  timeFirefly: { id: 'timeFirefly', name: 'Timekeeper Firefly', mark: '·', shape: 'diamond', hue: 65, hp: 8, role: 'swarm', bounty: 7, moves: { k: 'ramp', power: 1, growth: 1 }, art: 'assets/electricity-enemy-timekeeper-firefly.webp', scale: .3, hover: 45 },
  pulseEel: { id: 'pulseEel', name: 'Pulse Eel', mark: '∿', shape: 'blob', hue: 190, hp: 17, role: 'soldier', bounty: 13, moves: { k: 'cycle', hits: [3, 7] }, art: 'assets/electricity-enemy-pulse-eel.webp', scale: .7 },
  rcStalker: { id: 'rcStalker', name: 'RC Stalker', mark: 'τ', shape: 'spike', hue: 222, hp: 24, role: 'heavy', bounty: 18, moves: { k: 'charge', windup: 2, burst: 13 }, art: 'assets/electricity-enemy-rc-stalker.webp', scale: .88 },
  relayWarden: { id: 'relayWarden', name: 'Relay Warden', mark: '♜', shape: 'spike', hue: 42, hp: 40, bounty: 34, moves: { k: 'cycle', hits: [7, 9, 12] }, art: 'assets/electricity-elite-relay-warden.webp', scale: 1.7 }
};

Object.assign(ELECTRICITY_ENEMIES, {
  fluxMoth: { id: 'fluxMoth', name: 'Flux Moth', mark: '∿', shape: 'diamond', hue: 286, hp: 8, role: 'swarm', bounty: 7, moves: { k: 'ramp', power: 2, growth: 1 }, art: 'assets/electricity-enemy-flux-moth.webp', scale: .4, hover: 46 },
  coilSerpent: { id: 'coilSerpent', name: 'Coil Serpent', mark: '↻', shape: 'blob', hue: 272, hp: 17, role: 'soldier', bounty: 14, moves: { k: 'charge', windup: 2, burst: 12 }, art: 'assets/electricity-enemy-coil-serpent.webp', scale: .7 },
  fieldOx: { id: 'fieldOx', name: 'Field Ox', mark: '⊙', shape: 'hex', hue: 248, hp: 25, role: 'heavy', bounty: 21, moves: { k: 'cycle', hits: [5, 9] }, art: 'assets/electricity-enemy-field-ox.webp', scale: .9 },
  eddySprite: { id: 'eddySprite', name: 'Eddy Sprite', mark: '◌', shape: 'diamond', hue: 205, hp: 8, role: 'swarm', bounty: 7, moves: { k: 'cycle', hits: [2, 4] }, art: 'assets/electricity-enemy-eddy-sprite.webp', scale: .38, hover: 44 },
  armatureJackal: { id: 'armatureJackal', name: 'Armature Jackal', mark: '⟳', shape: 'spike', hue: 198, hp: 18, role: 'soldier', bounty: 15, moves: { k: 'cycle', hits: [4, 7] }, art: 'assets/electricity-enemy-armature-jackal.webp', scale: .78 },
  dynamoGolem: { id: 'dynamoGolem', name: 'Dynamo Golem', mark: '⚙', shape: 'hex', hue: 190, hp: 27, role: 'heavy', bounty: 22, moves: { k: 'charge', windup: 2, burst: 14 }, art: 'assets/electricity-enemy-dynamo-golem.webp', scale: 1.04 },
  turnWasp: { id: 'turnWasp', name: 'Turn-Ratio Wasp', mark: '⇅', shape: 'diamond', hue: 44, hp: 9, role: 'swarm', bounty: 8, moves: { k: 'ramp', power: 2, growth: 1 }, art: 'assets/electricity-enemy-turn-ratio-wasp.webp', scale: .42, hover: 45 },
  coreHeron: { id: 'coreHeron', name: 'Iron-Core Heron', mark: '∥', shape: 'diamond', hue: 38, hp: 19, role: 'soldier', bounty: 16, moves: { k: 'cycle', hits: [4, 8] }, art: 'assets/electricity-enemy-iron-core-heron.webp', scale: .7 },
  transmissionBull: { id: 'transmissionBull', name: 'Transmission Bull', mark: '⇈', shape: 'hex', hue: 30, hp: 29, role: 'heavy', bounty: 24, moves: { k: 'cycle', hits: [6, 10] }, art: 'assets/electricity-enemy-transmission-bull.webp', scale: .94 },
  inductionColossus: { id: 'inductionColossus', name: 'Induction Colossus', mark: '∮', shape: 'hex', hue: 225, hp: 46, bounty: 55, moves: { k: 'cycle', hits: [6, 10, 13] }, art: 'assets/electricity-elite-induction-colossus.webp', scale: 1.75 },
  sineFirefly: { id: 'sineFirefly', name: 'Sine Firefly', mark: '∿', shape: 'diamond', hue: 320, hp: 9, role: 'swarm', bounty: 8, moves: { k: 'cycle', hits: [2, 5] }, art: 'assets/electricity-enemy-sine-firefly.webp', scale: .34, hover: 46 },
  phasePanther: { id: 'phasePanther', name: 'Phase Panther', mark: 'φ', shape: 'spike', hue: 306, hp: 20, role: 'soldier', bounty: 17, moves: { k: 'cycle', hits: [5, 8] }, art: 'assets/electricity-enemy-phase-panther.webp', scale: .86 },
  rmsBehemoth: { id: 'rmsBehemoth', name: 'RMS Behemoth', mark: '√', shape: 'hex', hue: 294, hp: 30, role: 'heavy', bounty: 25, moves: { k: 'charge', windup: 2, burst: 15 }, art: 'assets/electricity-enemy-rms-behemoth.webp', scale: .98 },
  reactanceMite: { id: 'reactanceMite', name: 'Reactance Mite', mark: 'X', shape: 'diamond', hue: 174, hp: 10, role: 'swarm', bounty: 9, moves: { k: 'ramp', power: 2, growth: 1 }, art: 'assets/electricity-enemy-reactance-mite.webp', scale: .4 },
  impedanceLynx: { id: 'impedanceLynx', name: 'Impedance Lynx', mark: 'Z', shape: 'spike', hue: 165, hp: 21, role: 'soldier', bounty: 18, moves: { k: 'cycle', hits: [5, 9] }, art: 'assets/electricity-enemy-impedance-lynx.webp', scale: .86 },
  inductorTortoise: { id: 'inductorTortoise', name: 'Inductor Tortoise', mark: 'L', shape: 'hex', hue: 154, hp: 32, role: 'heavy', bounty: 26, moves: { k: 'cycle', hits: [6, 11] }, art: 'assets/electricity-enemy-inductor-tortoise.webp', scale: .9 },
  resonanceWisp: { id: 'resonanceWisp', name: 'Resonance Wisp', mark: '≈', shape: 'diamond', hue: 52, hp: 10, role: 'swarm', bounty: 9, moves: { k: 'cycle', hits: [3, 5] }, art: 'assets/electricity-enemy-resonance-wisp.webp', scale: .4, hover: 46 },
  powerCondor: { id: 'powerCondor', name: 'Power-Factor Condor', mark: 'cos', shape: 'diamond', hue: 45, hp: 22, role: 'soldier', bounty: 19, moves: { k: 'cycle', hits: [6, 9] }, art: 'assets/electricity-enemy-power-factor-condor.webp', scale: .74, hover: 58 },
  resonanceTitan: { id: 'resonanceTitan', name: 'Resonance Titan', mark: 'ω', shape: 'hex', hue: 38, hp: 34, role: 'heavy', bounty: 28, moves: { k: 'charge', windup: 2, burst: 17 }, art: 'assets/electricity-enemy-resonance-titan.webp', scale: 1.04 },
  detunedPair: { id: 'detunedPair', name: 'The Detuned Pair', mark: '≉', shape: 'hex', hue: 268, hp: 52, bounty: 62, moves: { k: 'cycle', hits: [7, 11, 14] }, art: 'assets/electricity-elite-detuned-pair.webp', scale: 1.45 }
});

const ELECTRICITY_ACT_ONE_POOLS = {
  'I.1': { mobs: ['branchBeetle', 'copperback', 'relayHornet'], cheap: ['branchBeetle', 'relayHornet'] },
  'I.2': { mobs: ['capacitorMantis', 'dielectricGecko', 'plateCrab'], cheap: ['dielectricGecko', 'capacitorMantis'] },
  'I.3': { mobs: ['timeFirefly', 'pulseEel', 'rcStalker'], cheap: ['timeFirefly', 'pulseEel'] }
};

const ELECTRICITY_POOLS = {
  ...ELECTRICITY_ACT_ONE_POOLS,
  'II.1': { mobs: ['fluxMoth', 'coilSerpent', 'fieldOx'], cheap: ['fluxMoth'], elite: 'inductionColossus' },
  'II.2': { mobs: ['eddySprite', 'armatureJackal', 'dynamoGolem'], cheap: ['eddySprite'], elite: 'inductionColossus' },
  'II.3': { mobs: ['turnWasp', 'coreHeron', 'transmissionBull'], cheap: ['turnWasp'], elite: 'inductionColossus' },
  'III.1': { mobs: ['sineFirefly', 'phasePanther', 'rmsBehemoth'], cheap: ['sineFirefly'], elite: 'detunedPair' },
  'III.2': { mobs: ['reactanceMite', 'impedanceLynx', 'inductorTortoise'], cheap: ['reactanceMite'], elite: 'detunedPair' },
  'III.3': { mobs: ['resonanceWisp', 'powerCondor', 'resonanceTitan'], cheap: ['resonanceWisp'], elite: 'detunedPair' }
};

const ELECTRICITY_ACT_ONE_PRESENTATION = {
  'I.1': { label: 'Circuit crossing', title: 'The Broken Circuit Crossing', type: 'Supply-ruin encounter', story: 'Copper rails divide through the drowned station. Branch Beetles pour from both paths while Relay Hornets wake above the switchboard.' },
  'I.2': { label: 'Capacitor garden', title: 'The Capacitor Gardens', type: 'Charge-storage encounter', story: 'Vines curl between parallel copper plates. A Capacitor Mantis unfolds from the dielectric moss, gathering itself for a delayed strike.' },
  'I.3': { label: 'Discharge gate', title: 'The Discharge Gate', type: 'Transient encounter', story: 'The gate releases its stored energy in fading pulses. Pulse Eels move through the channels as Timekeeper Fireflies mark each exchange.' }
};

const ELECTRICITY_BATTLE_PRESENTATION = {
  ...ELECTRICITY_ACT_ONE_PRESENTATION,
  'II.1': { label: 'Flux passage', title: 'The Magnetic Passage', type: 'Magnetic-field encounter', story: 'Field lines flare across the flooded stones. Flux Moths gather around a coiled conductor while a Field Ox blocks the route.' },
  'II.2': { label: 'Induction works', title: 'The Induction Works', type: 'Induction encounter', story: 'A moving armature wakes the abandoned machinery. Eddy Sprites and Dynamo Golems rise with every change in magnetic flux.' },
  'II.3': { label: 'Transformer yard', title: 'The Transformer Yard', type: 'Transformer encounter', story: 'Iron cores hum between ruined pylons. Turn-Ratio Wasps patrol the windings while the transmission line charges overhead.' },
  'III.1': { label: 'Alternating bridge', title: 'The Alternating Bridge', type: 'AC encounter', story: 'The bridge reverses its glow in a steady cycle. Sine Fireflies and Phase Panthers move to the same relentless waveform.' },
  'III.2': { label: 'Impedance stair', title: 'The Impedance Stair', type: 'Reactance encounter', story: 'Capacitive and inductive channels wind out of phase. Reactance Mites gather where the two paths interfere.' },
  'III.3': { label: 'Resonance chamber', title: 'The Resonance Chamber', type: 'Resonance encounter', story: 'The spire answers every oscillation. Resonance Wisps brighten as the driving frequency approaches the structure’s own.' }
};

const ELECTRICITY_LOCATION_PRESENTATION = {
  hazard: { label: 'Live conduit', type: 'Electrical hazard', title: 'The Overloaded Conduit', story: 'A broken conductor pulses across the route. Its timing is visible, but the safe interval is brief.' },
  mystery: { label: 'Sealed switchhouse', type: 'Unknown circuit', title: 'The Sealed Switchhouse', story: 'Three unlabelled switches surround a dormant control panel. Stored charge murmurs behind the wall.' },
  rest: { label: 'Grounding station', type: 'Safe station', title: 'The Grounding Station', story: 'A ring of grounded rods drains the storm into the earth. The instruments are quiet enough for repairs and study.' },
  merchant: { label: 'Relay trader', type: 'Travelling engineer', title: 'The Relay Trader', story: 'A travelling engineer opens cases of insulated tools, replacement components and suspiciously polished capacitors.' },
  treasure: { label: 'Insulated cache', type: 'Protected cache', title: 'The Insulated Cache', story: 'A ceramic vault sits behind a disconnected switch. Three compartments wait beneath its warning lamps.' },
  ruins: { label: 'Control array', type: 'Circuit trial', title: 'The Broken Control Array', story: 'Three linked control rings must be restored in sequence before the system can carry current safely.' }
};

// Environmental puzzles are fictional control-panel tasks, not electrical safety instructions.
const ELECTRICITY_HAZARDS = {
  1: { prompt: 'The crossing controller reports: main route LIVE; maintenance bypass ISOLATED. Which route does its interlock permit?', choices: [['Main route', 'Its lamps have briefly dimmed'], ['Maintenance bypass', 'Its isolation interlock is confirmed'], ['Flooded channel', 'Avoid the controller entirely']], correct: 1 },
  2: { prompt: 'The flux-channel controller reports: rotor TURNING; service bridge LOCKED; shielded bypass OPEN. Choose the available route.', choices: [['Service bridge', 'Force the locked access gate'], ['Rotor channel', 'Follow the moving armature'], ['Shielded bypass', 'Follow the open access indicator']], correct: 2 },
  3: { prompt: 'The phase-crossing controller reports: bypass ENABLED; alternating rails LIVE. Which route is released?', choices: [['Enabled bypass', 'Use the independent access route'], ['Alternating rails', 'Cross when the glow briefly fades'], ['Resonator platform', 'Climb onto the active apparatus']], correct: 0 }
};

const ELECTRICITY_CONTROL_STAGES = {
  1: [
    { title: 'Select the supply branch', prompt: 'The panel highlights the branch labelled LOAD. Route the test signal there.', choices: ['LOAD branch', 'BYPASS branch', 'SPARE branch'], correct: 0 },
    { title: 'Select the storage monitor', prompt: 'The indicator requests the CAPACITOR monitor, not the supply monitor.', choices: ['Supply monitor', 'Spare monitor', 'Capacitor monitor'], correct: 2 },
    { title: 'Release the gate', prompt: 'The diagnostic lamps all show READY. Select the gate-release command.', choices: ['Repeat diagnostic', 'Release gate', 'Reset sequence'], correct: 1 }
  ],
  2: [
    { title: 'Locate the field sensor', prompt: 'The generator requests its FIELD sensor before the rotor test.', choices: ['Output sensor', 'Field sensor', 'Temperature sensor'], correct: 1 },
    { title: 'Route the rotor signal', prompt: 'The illuminated channel is ARMATURE. Select its matching relay.', choices: ['Armature relay', 'Spare relay', 'Lighting relay'], correct: 0 },
    { title: 'Complete the generator check', prompt: 'The test sequence is complete. The panel requests CONFIRM, not another test.', choices: ['Restart test', 'Clear record', 'Confirm result'], correct: 2 }
  ],
  3: [
    { title: 'Find the reference signal', prompt: 'The instrument requests the channel labelled REFERENCE.', choices: ['Output channel', 'Spare channel', 'Reference channel'], correct: 2 },
    { title: 'Select the damping control', prompt: 'The spire requests DAMPING while its other controls remain locked.', choices: ['Damping control', 'Drive control', 'Gate control'], correct: 0 },
    { title: 'Record the stable signal', prompt: 'The display reads STABLE. Store the trace to complete the sequence.', choices: ['Erase trace', 'Store trace', 'Restart sweep'], correct: 1 }
  ]
};

const ELECTRICITY_SHOP_ITEMS = {
  rations: { name: 'Field repair kit', note: '+10 Stability · replacement fittings', flavor: 'Fresh insulation and replacement fittings restore your expedition gear.' },
  tonic: { name: 'Emergency repair pack', note: '+20 Stability · extensive repairs', flavor: 'The engineer replaces damaged equipment and checks the connections.' },
  rope: { name: 'Diagnostic probe', note: '+1 Insight · fault-finding instrument', flavor: 'A useful instrument reveals a previously hidden circuit fault.' },
  notes: { name: 'Annotated circuit records', note: '+2 Insight · circuit observations', flavor: 'Clear circuit traces add two new observations to your notebook.' },
  charm: { name: 'Protective equipment module', note: '+5 max Stability · once per expedition', flavor: 'Reinforced expedition equipment increases your maximum Stability.' }
};

const ELECTRICITY_ACT_LOCATIONS = {
  1: {
    hazard: ['Live conduit', 'The Overloaded Conduit', 'A broken conductor pulses across the flooded route.'], mystery: ['Sealed switchhouse', 'The Sealed Switchhouse', 'Unlabelled switches surround a dormant supply terminal.'], rest: ['Grounding station', 'The Grounding Station', 'Ground rods drain the supply storm into the earth.'], merchant: ['Relay trader', 'The Relay Trader', 'An engineer trades insulated tools beside an open relay case.'], treasure: ['Ceramic cache', 'The Ceramic Cache', 'A disconnected ceramic vault protects three supply cells.'], ruins: ['Control array', 'The Broken Control Array', 'Three linked control rings must be restored in sequence.']
  },
  2: {
    hazard: ['Flux surge', 'The Shifting Flux Channel', 'The safe path moves whenever the magnetic field changes.'], mystery: ['Silent armature', 'The Silent Armature', 'A motionless generator waits for one deliberate input.'], rest: ['Field-null station', 'The Field-Null Station', 'Opposing coils create a quiet region for repairs.'], merchant: ['Coilwright', 'The Travelling Coilwright', 'A coilwright displays transformer parts and induction instruments.'], treasure: ['Faraday vault', 'The Faraday Vault', 'A conducting shell shields three recovered components.'], ruins: ['Dynamo controls', 'The Dynamo Control Hall', 'The abandoned generator requires three relays in the correct order.']
  },
  3: {
    hazard: ['Phase crossing', 'The Out-of-Phase Crossing', 'Alternating rails become safe at different points in the cycle.'], mystery: ['Signal chamber', 'The Unmarked Signal Chamber', 'A terminal offers three waveforms without explaining the load.'], rest: ['Impedance refuge', 'The Impedance Refuge', 'The reactive pathways cancel here, leaving a calm interval.'], merchant: ['Phasor broker', 'The Phasor Broker', 'A broker arranges calibrated AC instruments around a glowing diagram.'], treasure: ['RMS cache', 'The RMS Cache', 'A rated enclosure protects three high-voltage compartments.'], ruins: ['Resonance controls', 'The Resonance Control Array', 'Three damping relays hold the spire below resonance.']
  }
};

function electricityNodePresentation(node) {
  if (node.kind === 'joule') {
    const names = { 1: ['Accumulator vault', 'The Accumulator'], 2: ['Induction core', 'The Induction Colossus'], 3: ['Stormheart crown', 'The Stormheart'] };
    const act = node.sectionId?.startsWith('III') ? 3 : node.sectionId?.startsWith('II') ? 2 : 1;
    const [label, title] = names[act];
    return { label, title, type: 'Guardian of the Electricity Joule', story: 'The act guardian seals the final circuit. Its attack cycle is visible; the reserved questions decide whether the path opens.' };
  }
  if (node.kind === 'elite') {
    if (node.sectionId?.startsWith('III')) return { label: 'Detuned signal', title: 'The Detuned Pair', type: 'Elite AC anomaly', story: 'Two coupled signals lock onto opposing phases, creating a dangerous target-priority test.' };
    if (node.sectionId?.startsWith('II')) return { label: 'Colossus relay', title: 'The Induction Colossus', type: 'Elite induction guardian', story: 'A reinforced magnetic guardian wakes beside one of the section’s lesser creatures.' };
    return { label: 'Relay warden', title: 'The Relay Warden', type: 'Elite electrical guardian', story: 'A broken relay tower locks into a new circuit. Its stone warden prepares a punishing release.' };
  }
  if (node.kind === 'encounter') return ELECTRICITY_BATTLE_PRESENTATION[node.sectionId];
  const act = node.sectionId?.startsWith('III') ? 3 : node.sectionId?.startsWith('II') ? 2 : 1;
  const variant = ELECTRICITY_ACT_LOCATIONS[act]?.[node.kind];
  return variant ? { ...ELECTRICITY_LOCATION_PRESENTATION[node.kind], label: variant[0], title: variant[1], story: variant[2] } : ELECTRICITY_LOCATION_PRESENTATION[node.kind];
}

function electricityPresentation(node) {
  if (node.kind === 'joule') return { label: 'Accumulator vault', title: 'The Accumulator', type: 'Guardian of the Electricity Joule', story: 'The supply network converges on a guardian built from copper rings and luminous plates. It begins to charge the instant you enter.' };
  if (node.kind === 'elite') return { label: 'Relay Warden', title: 'The Relay Warden', type: 'Elite electrical guardian', story: 'A broken relay tower locks into a new circuit. Its stone warden alternates between a sealed guard and a punishing release.' };
  return ELECTRICITY_ACT_ONE_PRESENTATION[node.sectionId];
}

function electricityActOneArena(sectionId) {
  const palettes = {
    'I.1': ['#07191b', '#174b4c', '#b66d2d'],
    'I.2': ['#071a18', '#126b62', '#d1a04a'],
    'I.3': ['#07121f', '#21476b', '#43aeb0']
  };
  const [base, glow, conductor] = palettes[sectionId] || palettes['I.1'];
  return `radial-gradient(circle at 50% 24%, ${glow}99 0 2%, transparent 20%), radial-gradient(ellipse at 18% 62%, ${conductor}55 0 1%, transparent 25%), repeating-linear-gradient(90deg, transparent 0 12%, ${conductor}22 12.2% 12.6%, transparent 12.8% 25%), linear-gradient(160deg, ${base}, ${glow} 55%, #020708)`;
}

function electricityArena(sectionId) {
  const palettes = {
    'I.1': ['#07191b', '#174b4c', '#b66d2d'], 'I.2': ['#071a18', '#126b62', '#d1a04a'], 'I.3': ['#07121f', '#21476b', '#43aeb0'],
    'II.1': ['#100b20', '#432f78', '#b04bd3'], 'II.2': ['#071624', '#185b7b', '#4bd5cf'], 'II.3': ['#1a1408', '#66521c', '#e2b84d'],
    'III.1': ['#18091d', '#683063', '#e25bb8'], 'III.2': ['#061b19', '#17675e', '#65d6bd'], 'III.3': ['#181205', '#715813', '#f1cb55']
  };
  const [base, glow, conductor] = palettes[sectionId] || palettes['I.1'];
  return `radial-gradient(circle at 50% 24%, ${glow}99 0 2%, transparent 20%), radial-gradient(ellipse at 18% 62%, ${conductor}55 0 1%, transparent 25%), repeating-linear-gradient(90deg, transparent 0 12%, ${conductor}22 12.2% 12.6%, transparent 12.8% 25%), linear-gradient(160deg, ${base}, ${glow} 55%, #020708)`;
}

function electricityBattleArt(sectionId) {
  const artwork = {
    'I.1': 'assets/electricity-battle-i1.webp',
    'I.2': 'assets/electricity-battle-i2.webp',
    'I.3': 'assets/electricity-battle-i3.webp',
    'II.1': 'assets/electricity-battle-act-ii.webp',
    'II.2': 'assets/electricity-battle-act-ii.webp',
    'II.3': 'assets/electricity-battle-act-ii.webp',
    'III.1': 'assets/electricity-battle-act-iii.webp',
    'III.2': 'assets/electricity-battle-act-iii.webp',
    'III.3': 'assets/electricity-battle-act-iii.webp'
  };
  return artwork[sectionId] || artwork['I.1'];
}
// Question ownership remains stable across acts while the act metadata supplies each
// Electricity guardian's dedicated battle artwork.
const ELECTRICITY_HOME_SECTION = new Map();
for (const section of ELECTRICITY_SECTIONS) {
  for (const id of section.questionIds) ELECTRICITY_HOME_SECTION.set(id, section.id);
}

function electricitySectionAt(act, floor) {
  const sections = ELECTRICITY_SECTIONS.filter(section => section.act === act);
  return sections.find(section => floor <= section.to) || sections[sections.length - 1];
}

function shuffledElectricity(items, random = Math.random) {
  return items.map(item => ({ item, key: random() })).sort((a, b) => a.key - b.key).map(row => row.item);
}

function normalizeJourneyState(run, savedJourney = 'mechanics') {
  run.journey = run.journey || savedJourney || 'mechanics';
  run.schemaVersion = 2;
  run.act ||= 1;
  run.asked ||= {};
  if (run.journey === 'electricity') {
    run.electricity ||= {};
    run.electricity.sections ||= {};
    run.electricity.reservations ||= {};
    run.electricity.exposure ||= {};
    run.electricity.seenIntroductions ||= {};
    run.electricity.startedSections ||= {};
  }
  return run;
}

function enterElectricitySection(run, floor, random = Math.random) {
  normalizeJourneyState(run);
  const section = electricitySectionAt(run.act, floor);
  run.electricity.sections[run.act] = Math.max(run.electricity.sections[run.act] || 1, section.order);
  // Reserve once per act, never reroll on refresh or resume.
  if (!Object.hasOwn(run.electricity.reservations, run.act)) {
    const groups = ELECTRICITY_SECTIONS.filter(item => item.act === run.act).map(item => {
      const unseen = ELECTRICITY_QUESTION_BANK.filter(q => item.questionIds.includes(q.id) && !run.asked[q.id]);
      const picked = [];
      for (const level of [2, 3]) {
        const candidate = shuffledElectricity(unseen.filter(q => q.level === level && !picked.includes(q.id)), random)[0];
        if (candidate) picked.push(candidate.id);
      }
      for (const q of shuffledElectricity(unseen, random)) {
        if (picked.length >= 2) break;
        if (!picked.includes(q.id)) picked.push(q.id);
      }
      return picked;
    });
    run.electricity.reservations[run.act] = [0, 1].flatMap(index =>
      shuffledElectricity(groups.map(group => group[index]).filter(Boolean), random));
  }
  return section;
}

function drawElectricityQuestions(run, count, levels = [2, 3], boss = false, random = Math.random) {
  const section = enterElectricitySection(run, 0, random);
  const order = run.electricity.sections[run.act];
  const current = ELECTRICITY_SECTIONS.find(item => item.act === run.act && item.order === order) || section;
  const reserved = run.electricity.reservations[run.act];
  const output = [];
  for (let index = 0; index < count; index++) {
    let candidate;
    if (boss) candidate = reserved.filter(id => !run.asked[id]).map(id => ELECTRICITY_QUESTION_BANK.find(q => q.id === id)).find(Boolean);
    if (!candidate) {
      const eligible = ELECTRICITY_QUESTION_BANK.filter(q => {
        const home = ELECTRICITY_SECTIONS.find(item => item.id === ELECTRICITY_HOME_SECTION.get(q.id));
        return q.act === run.act && !run.asked[q.id] && (boss || (!reserved.includes(q.id) && home.order <= order));
      });
      let pool;
      if (boss) pool = eligible;
      else {
        const fresh = eligible.filter(q => ELECTRICITY_HOME_SECTION.get(q.id) === current.id);
        const review = eligible.filter(q => ELECTRICITY_HOME_SECTION.get(q.id) !== current.id);
        const preferCurrent = !run.electricity.startedSections[current.id] || random() < .7;
        pool = preferCurrent ? (fresh.length ? fresh : review) : (review.length ? review : fresh);
      }
      const atLevel = pool.filter(q => levels.includes(q.level));
      if (atLevel.length) pool = atLevel;
      // Exposure is based on the primary strand; never relax section/repeat boundaries.
      const minimum = Math.min(...pool.map(q => run.electricity.exposure[q.strand] || 0));
      candidate = shuffledElectricity(pool.filter(q => (run.electricity.exposure[q.strand] || 0) === minimum), random)[0];
    }
    if (!candidate) break;
    run.asked[candidate.id] = true;
    run.electricity.exposure[candidate.strand] = (run.electricity.exposure[candidate.strand] || 0) + 1;
    if (ELECTRICITY_HOME_SECTION.get(candidate.id) === current.id) run.electricity.startedSections[current.id] = true;
    output.push(candidate);
  }
  return output;
}
