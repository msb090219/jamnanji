const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../site/script.js'), 'utf8');
const vm = require('node:vm');
const introduction = source.slice(source.indexOf('function showSectionIntroduction('), source.indexOf('function openHudPanel('));
for (const journey of ['mechanics', 'electricity']) {
  for (const action of ['continue', 'escape']) {
    let overlay, onKey, continued = 0, saved = 0, removed = false;
    const buttons = [0].map(() => ({ addEventListener(type, fn) { this.click = fn; }, focus() {} }));
    const state = { journey };
    const context = vm.createContext({
      state, curriculumEscape: value => value, saveRun() { saved++; },
      document: {
        createElement: () => overlay = {
          querySelectorAll: () => buttons, querySelector: () => buttons[0], remove() { removed = true; }
        },
        body: { appendChild() {} },
        addEventListener(type, fn) { onKey = fn; },
        removeEventListener(type, fn) { assert.equal(fn, onKey); }
      },
      done() { continued++; }
    });
    vm.runInContext(introduction, context);
    vm.runInContext("showSectionIntroduction({id:'I',name:'Test',intro:'Introduction',principle:'Principle',conditions:'Conditions',misconception:'Misconception'}, done)", context);
    assert.ok(overlay.className.split(' ').includes('is-visible'));
    assert.equal((overlay.innerHTML.match(/<button/g) || []).length, 1);
    assert.doesNotMatch(overlay.innerHTML, /data-section-skip/);
    if (action === 'escape') onKey({ key: 'Escape', preventDefault() {}, stopImmediatePropagation() {} });
    else buttons[0].click();
    buttons[0].click(); // A second event must not start another encounter.
    assert.ok(removed);
    assert.equal(continued, 1);
    assert.equal(saved, 1);
    assert.equal(JSON.parse(JSON.stringify(state)).seenBriefings[`${journey}:I`], true);
  }
}
assert.match(source, /!resume && briefing && !state.seenBriefings/);
console.log('PASS — both modes: single Continue button, Escape, per-run flags and single handoff.');
