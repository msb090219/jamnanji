const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const c = vm.createContext({ console, setTimeout, clearTimeout, setInterval, clearInterval,
  location: { hostname: 'localhost' }, localStorage: { getItem: () => null, setItem() {} },
  document: { querySelector: () => null, querySelectorAll: () => [], addEventListener() {} } });
for (const name of ['questions', 'electricity-questions', 'electricity-journey', 'cards', 'save-progress', 'journey-access', 'script']) {
  let source = fs.readFileSync(path.join(__dirname, '../site', name + '.js'), 'utf8');
  if (name === 'script') source = source.split(/applyPreferences\(\);\r?\n\/\/ Review hooks:/)[0];
  vm.runInContext(source, c);
}
const run = source => vm.runInContext(source, c);
run("selectedJourney='mechanics'; resetState();");
const sections = run('MECHANICS_SECTIONS');
assert.equal(sections.length, 9);
assert.equal(new Set(sections.flatMap(s => s.mobs)).size, 20);
for (const section of sections) {
  c.section = section;
  run('state.act=section.act;');
  for (const role of ['swarm', 'soldier', 'heavy']) {
    c.role = role;
    assert.ok(run('section.mobs.some(id=>ENEMY_ROSTER[id].role===role)'), `${section.id}: ${role}`);
  }
  for (const floor of [section.from, section.to]) {
    c.node = { id: 'test', kind: 'encounter', floor };
    assert.equal(run('encounterBriefing(node).id'), section.id);
    for (let trial = 0; trial < 100; trial++) {
      const pack = run('buildPack(node)');
      assert.ok(pack.units.length >= 1 && pack.units.length <= 4);
      assert.ok(pack.units.every(unit => section.mobs.includes(unit.id)), section.id);
    }
  }
  c.node = { kind: 'elite', floor: section.to };
  const elite = run('buildPack(node)');
  assert.equal(elite.units[0].id, ['rhino', 'colossus', 'warden'][section.act - 1]);
  assert.ok(section.mobs.includes(elite.units[1].id));
  run("nodes=[{id:'test',floor:section.from}]; state.current='test'; state.activeNode=null;");
  assert.equal(run('currentStudyOrder()'), section.order);
  assert.ok(run('studyNotebookHTML()').includes(section.name));
}
for (let act = 1; act <= 3; act++) {
  assert.equal(run(`mechanicsSectionAt(${act},0).order`), 1);
  assert.equal(run(`mechanicsSectionAt(${act},99).order`), 3);
}
console.log('PASS — nine Mechanics sections, all 20 enemies, 1800 packs, elite support, boundaries and notebook progress.');
