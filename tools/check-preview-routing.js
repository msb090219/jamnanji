// Exercise the real URL bootstrap, not a manually selected journey.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
for (const [query, expected, ending] of [
  ['?cutscene=electricityPrologue', 'electricity', 'map'],
  ['?cutscene=electricityPrologue&journey=mechanics', 'electricity', 'map'],
  ['?cutscene=electricityAct2&act=2', 'electricity', 'map'],
  ['?cutscene=electricityVictory', 'electricity', 'won'],
  ['?cutscene=electricityDefeat', 'electricity', 'lost'],
  ['?cutscene=prologue&journey=electricity', 'mechanics', 'map'],
]) {
  const c = vm.createContext({
    console, URLSearchParams, setTimeout, clearTimeout, setInterval, clearInterval,
    location: { hostname: 'localhost', search: query },
    localStorage: { getItem: () => null, setItem() { throw Error('Preview wrote a save'); } },
    document: { querySelector: () => null, querySelectorAll: () => [], addEventListener() {} }
  });
  let bootstrap;
  for (const name of ['questions', 'electricity-questions', 'electricity-journey', 'cards', 'save-progress', 'journey-access', 'script']) {
    let source = fs.readFileSync(path.join(__dirname, '../site', name + '.js'), 'utf8');
    if (name === 'script') [source, bootstrap] = source.split(/applyPreferences\(\);\r?\n\/\/ Review hooks:/);
    vm.runInContext(source, c);
  }
  const run = source => vm.runInContext(source, c);
  run(`playCutscene = (id, done) => { globalThis.finishPreview = done; };
    renderMap = () => { globalThis.ending = 'map'; };
    showEndScreen = won => { globalThis.ending = won ? 'won' : 'lost'; };`);
  run('// Review hooks:' + bootstrap);
  assert.equal(run('state.journey'), expected, query);
  assert.equal(run('currentSaveSlot'), -1);
  run('finishPreview()');
  assert.equal(c.ending, ending);
  if (expected === 'electricity') {
    const battleNode = run("nodes.find(n=>n.kind==='encounter')");
    c.testNode = battleNode;
    assert.ok(battleNode.sectionId);
    assert.ok(run('buildPack(testNode).units.every(u=>u.def.art?.startsWith("assets/electricity-"))'));
    assert.ok(run('drawBattleQuestions(testNode.encounter, testNode).every(q=>q.journey === "electricity")'));
    assert.ok(run('electricityBattleArt(testNode.sectionId).startsWith("assets/electricity-")'));
    for (const kind of ['hazard', 'mystery', 'rest', 'merchant', 'treasure', 'ruins']) {
      c.testNode = { kind, sectionId: battleNode.sectionId };
      assert.ok(run('electricityNodePresentation(testNode).title'));
    }
  }
}
console.log('PASS — preview URL story inference, Electricity enemies/questions/art/locations, endings and save isolation.');
