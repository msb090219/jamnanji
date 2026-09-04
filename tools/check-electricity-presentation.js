// Artwork and location integration checks; no combat-balance claim.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const outcome = { className: '', innerHTML: '', classList: { remove() {} } };
const c = vm.createContext({
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  location: { hostname: 'localhost' },
  localStorage: { getItem: () => null, setItem() {} },
  document: { querySelector: selector => selector === '#outcome' ? outcome : null, querySelectorAll: () => [], addEventListener() {} }
});
for (const name of ['questions', 'electricity-questions', 'electricity-journey', 'cards', 'save-progress', 'journey-access', 'script']) {
  let source = fs.readFileSync(path.join(__dirname, '../site', name + '.js'), 'utf8');
  if (name === 'script') source = source.split(/applyPreferences\(\);\r?\n\/\/ Review hooks:/)[0];
  vm.runInContext(source, c);
}
const run = source => vm.runInContext(source, c);
// Electricity must introduce and resolve its own adventure using supported scene assets.
const story = run('cutscenes.electricityPrologue');
assert.ok(story.lines.length >= 16, 'Standalone opening has room for arrival, stakes and character dialogue');
assert.equal(story.lines.at(-1).choices, true);
assert.ok(story.choices.length >= 3);
for (const choice of story.choices) assert.ok(choice.label && choice.reply);
for (const [id, scene] of Object.entries(run('cutscenes')).filter(([id]) => id.startsWith('electricity'))) {
  assert.ok(scene.endLabel && scene.lines.length >= 3, id);
  for (const line of scene.lines) {
    assert.ok(line.speaker && line.text, id);
    assert.doesNotMatch(line.text, /mechanics|Newton|next Joule|second Joule/i, id);
    if (line.pose) {
      const art = line.speaker === 'You' ? `student-${line.pose}-v3-cutout.webp` : `jamnani-${line.pose}-cutout.webp`;
      assert.ok(fs.existsSync(path.join(__dirname, '../site/assets', art)), `${id}: ${art}`);
    }
  }
}
assert.match(run('cutscenes.electricityVictory.lines.map(l=>l.text).join(" ")'), /your room/);
run(`refreshHud = saveRun = showEncounterContinue = refreshLocationPanel = () => {};
  selectedJourney = 'electricity'; resetState();`);
const kinds = ['hazard', 'mystery', 'rest', 'merchant', 'treasure', 'ruins'];
for (let act = 1; act <= 3; act++) {
  run(`state.act = ${act}; state.coins = 100; state.encounter = 'river';`);
  for (const kind of kinds) {
    const node = `{id:'test-${act}-${kind}',kind:'${kind}',sectionId:'${'I'.repeat(act)}.1'}`;
    run('state.locationSession = {phase:0,mistakes:0};');
    const html = run(`electricityLocationActivity(${node})`);
    assert.ok(html.includes(run(`electricityNodePresentation(${node}).title`)), `${act}/${kind}: location title`);
    assert.doesNotMatch(html, /warding stones|shrine|moving symbols|Recovered technique · card|The Relay Trader’s/);
    assert.ok(fs.existsSync(path.join(__dirname, `../site/assets/electricity-location-${kind}.webp`)));
  }
  for (let choice = 0; choice < 3; choice++) {
    run('state.coins = 0; state.health = 60; state.pendingCompletion = false;');
    run(`resolveLocationAction('hazard-${choice}')`);
    assert.equal(run('state.coins > 0'), choice === run(`ELECTRICITY_HAZARDS[${act}].correct`));
    assert.equal(run('state.pendingCompletion'), true);
  }
  run('state.locationSession = {phase:0,mistakes:0}; state.coins=0; state.health=60; state.pendingCompletion=false;');
  for (let stage = 0; stage < 3; stage++) run(`resolveLocationAction('ruin-' + ELECTRICITY_CONTROL_STAGES[${act}][${stage}].correct)`);
  assert.equal(run('state.locationSession.mistakes'), 0);
  assert.equal(run('state.coins'), 32);
  assert.equal(run('state.pendingCompletion'), true);
  run('state.locationSession = {phase:0,mistakes:0}; state.health=60;');
  run(`resolveLocationAction('ruin-' + ((ELECTRICITY_CONTROL_STAGES[${act}][0].correct+1)%3))`);
  assert.equal(run('state.health'), 55);
}
for (const action of ['recover', 'prepare', 'cache-supplies', 'cache-relic', 'leave']) {
  run(`state.health=30; state.charmOwned=false; resolveLocationAction('${action}')`);
  assert.doesNotMatch(outcome.innerHTML, /warding|shrine|stones hold|landmark|Provision cache/i);
}
const artwork = run(`Object.values(ELECTRICITY_ENEMIES).map(e=>e.art).concat(ELECTRICITY_ACTS.map(a=>a.boss.art), ELECTRICITY_SECTIONS.map(s=>electricityBattleArt(s.id)), Object.entries(cutscenes).filter(([id,s])=>id.startsWith('electricity') && s.background).map(([id,s])=>s.background))`);
for (const asset of artwork) assert.ok(asset && fs.existsSync(path.join(__dirname, '../site', asset)), asset);
assert.ok(run('Object.values(ELECTRICITY_ENEMIES).every(e=>e.scale>0 && e.scale<=2)'));
// Exercise every random diagnostic result without real timers or saved progress.
run('setTimeout = callback => { callback(); return 0; };');
for (const roll of [0.1, 0.5, 0.7, 0.95]) {
  run(`Math.random = () => ${roll}; state.coins=100; state.health=60; resolveLocationAction('offering');`);
  assert.doesNotMatch(outcome.innerHTML, /shrine|offering|numerals/i);
  assert.equal(run('state.coins'), roll === 0.5 ? 102 : 90);
  run(`resolveLocationAction('symbols');`);
  assert.doesNotMatch(outcome.innerHTML, /shrug|life savings|no wisdom/i);
}
run(`state.coins=100; resolveLocationAction('buy-rope');`);
assert.match(outcome.innerHTML, /Diagnostic probe/);
assert.doesNotMatch(outcome.innerHTML, /tension|rope/);
run(`state.activeNode='hud-test'; nodes.push({id:'hud-test',kind:'rest',sectionId:'II.1'});`);
assert.equal(run('hudLocation()'), 'Field-null station');
// The shared resolver must retain Mechanics' original outcomes and answers.
run(`state.journey='mechanics'; state.encounter='river'; state.coins=0; state.health=30; resolveLocationAction('recover');`);
assert.match(outcome.innerHTML, /The stones hold/);
run(`resolveLocationAction('hazard-' + hazardChallenges.river.correct)`);
assert.ok(run('state.coins > 0'));
console.log('PASS — 18 Electricity location views, route/control answers, outcomes, artwork paths, scales and Mechanics isolation.');
