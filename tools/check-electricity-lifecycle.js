// Full act lifecycle using the real game functions and in-memory saves.
// Rendering is stubbed and battles are force-completed after question exchanges:
// this checks routing/persistence, NOT player strategy, visual UI or combat balance.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const storage = new Map();
const c = vm.createContext({
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  location: {hostname:'localhost'},
  localStorage: {getItem:key=>storage.get(key)||null,setItem:(key,value)=>storage.set(key,value)},
  document: {querySelector:()=>null, querySelectorAll:()=>[], addEventListener(){}}
});
for (const name of ['questions','electricity-questions','electricity-journey','cards','save-progress','journey-access','script']) {
  let source = fs.readFileSync(path.join(__dirname,'../site',name+'.js'),'utf8');
  if (name === 'script') source = source.split(/applyPreferences\(\);\r?\n\/\/ Review hooks:/)[0];
  vm.runInContext(source,c);
}
const run = source => vm.runInContext(source,c);
run(`
  renderJourneySelect = renderMap = refreshHud = rerenderTrayBody = updateIncomingPreview = showBattleRewards = () => {};
  showEndScreen = won => { globalThis.ended = won; };
  globalThis.scenes = [];
  playCutscene = (id, onDone) => { scenes.push(id); onDone(); };
  startEncounter = (id, resume) => {
    if (!resume) throw Error('Unexpected start in restore adapter');
    normalizeBattle(state.battle, encounters[state.encounter], nodes.find(n => n.id === id));
  };
  startNewRun(0);
  selectedJourney = 'electricity';
  beginExpedition();
`);
assert.equal(run('state.deck.map(card => card.id).join(",")'), 'spark,spark,spark,spark,insulate,insulate,insulate,insulate,trace-circuit,parallel-arc');
assert.ok(run('cardPool(1).every(card => ELECTRICITY_CARDS.includes(card))'));
const seen = new Set();
const sectionsSeen = new Set();
let fights = 0, restores = 0;
for (let act = 1; act <= 3; act++) {
  assert.equal(run('state.act'),act);
  assert.equal(run('state.current'),'start');
  const floors = act === 3 ? 12 : 9;
  for (let floor = 1; floor <= floors + 1; floor++) {
    run(`
      var node = nodes.find(n => n.id === state.available[0]);
      var section = enterElectricitySection(state, node.floor);
      state.electricity.seenIntroductions[section.id] = true;
      state.activeNode = node.id;
      state.encounter = node.encounter;
      state.battle = createBattle(node, node.encounter);
    `);
    assert.equal(run('node.floor'),floor);
    sectionsSeen.add(run('section.id'));
    if (run('Boolean(state.battle)')) {
      fights++;
      const rounds = floor === floors + 1 ? 6 : 2;
      for (let exchange=0; exchange<rounds; exchange++) {
        if (exchange) run('state.battle.round++; startTurn(state.battle); ensureRoundQuestion(state.battle);');
        const q = run('state.battle.questions[state.battle.round]');
        assert.ok(q, 'Expected fresh questions on this short route');
        assert.ok(!seen.has(q.id),q.id+': repeat'); seen.add(q.id);
        assert.equal(q.journey,'electricity');
        assert.ok(q.explanation);
        if (q.diagram) assert.match(run('questionDiagramHTML(state.battle.questions[state.battle.round])'), /<img/);
        run('resolveBattleAnswer((state.battle.questions[state.battle.round].correct + 1) % 3);');
        const energy = run('state.battle.energy');
        const questionId = q.id;
        const reservations = run('JSON.stringify(state.electricity.reservations)');
        run("continueSavedRun(0,'electricity');"); restores++;
        assert.equal(run('state.battle.questions[state.battle.round].id'),questionId);
        assert.equal(run('JSON.stringify(state.electricity.reservations)'),reservations);
        run('resolveBattleAnswer(0)');
        assert.equal(run('state.battle.energy'),energy,'Restore charged a second penalty');
        run('finishBattleAnswer()');
        assert.equal(run('state.battle.phase'),'cards');
      }
      // Deliberately bypass card play: test the real rewards -> act-transition path.
      run('state.battle.units.forEach(unit => { unit.hp = 0; }); settleBattleVictory(state.battle);');
      assert.equal(run('state.battle.phase'),'rewards');
    }
    run('finishEncounter()');
  }
}
assert.equal(sectionsSeen.size,9);
assert.deepEqual([...new Set(c.scenes.filter(id => id.startsWith('electricityAct')))], ['electricityAct2','electricityAct3']);
assert.ok(c.scenes.includes('electricityVictory'));
assert.equal(c.ended,true);
assert.equal(run('state.act'),3);
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.jouleCollected"),true);
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.run"),null);
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.attempts.length"),1);
run('renderEnd(true); saveRun();');
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.attempts.length"),1);
assert.equal(run("loadSaveSlots().slots[0].stories.mechanics.jouleCollected"),false);
// Replay failure must preserve the earned test Joule and record a distinct attempt.
run("selectedJourney='electricity'; beginExpedition(); state.health=0; renderEnd(false);");
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.attempts.length"),2);
assert.equal(run("loadSaveSlots().slots[0].stories.electricity.jouleCollected"),true);
assert.equal(c.ended,false);
run(`
  state.health=40;
  state.battle={kind:'encounter',units:[spawnUnit(ELECTRICITY_ENEMIES.relayHornet)],block:0,charged:4,grounded:5,phase:'cards',energy:3,maxEnergy:3,drawPile:[],discardPile:[],hand:[],played:[],pendulumQueue:[]};
  dealToEnemy(state.battle,0,3);
`);
assert.equal(run('state.battle.units[0].hp'),3,'Charged bonus did not apply once');
assert.equal(run('state.battle.charged'),0);
run('state.battle.units[0].electrocuted=3; state.battle.units[0].phase=1; resolveUnitIntent(state.battle,state.battle.units[0],0);');
assert.equal(run('state.health'),39,'Grounded did not reduce the next enemy hit');
console.log('PASS — 3-act lifecycle, 9 sections, '+fights+' battle setups, '+restores+' answered-battle restores, single completion and replay failure. Combat outcomes were simulated.');
