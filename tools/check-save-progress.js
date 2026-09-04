// Run: node tools/check-save-progress.js. Uses isolated memory, never browser saves.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const progress = require('../site/save-progress.js');
const snapshot = (journey, health = 60) => ({ journey, savedAt: 100, state: { journey, health, maxHealth: 60, act: 3, current: 'boss', completed: ['start', 'boss'], coins: 20 }, nodes: [{ id: 'boss', floor: 9 }] });

const legacyRun = snapshot('mechanics');
const legacy = { version: 1, slots: [{ id: 0, runs: 3, victories: 1, run: legacyRun }, { id: 1, runs: 2, victories: 0, run: null }, { id: 2, runs: 0, run: null }] };
const data = progress.normalize(legacy);
assert.deepEqual(data.slots[0].stories.mechanics.run, legacyRun);
assert.equal(data.slots[0].stories.mechanics.jouleCollected, true);
assert.ok(data.slots[1].createdAt, 'Old failed slots remain occupied');
assert.equal(data.slots[2].createdAt, null);
assert.equal(legacy.slots[0].stories, undefined, 'Migration does not mutate the original');
assert.deepEqual(progress.normalize(data), data, 'Migration is idempotent');

const slot = progress.emptySlot(0);
assert.equal(progress.unlocked(slot, 'electricity'), true);
assert.equal(progress.unlocked(slot, 'waves'), true);
progress.recordRun(slot, legacyRun);
assert.equal(progress.finishRun(slot, { ...legacyRun.state, health: 0 }, legacyRun.nodes, false, 200), true);
assert.ok(slot.createdAt);
assert.equal(slot.stories.mechanics.attempts[0].outcome, 'failed');
assert.equal(slot.stories.mechanics.run, null);
assert.equal(progress.finishRun(slot, legacyRun.state, legacyRun.nodes, false, 201), false);
progress.recordRun(slot, legacyRun);
progress.finishRun(slot, legacyRun.state, legacyRun.nodes, true, 300);
assert.equal(progress.unlocked(slot, 'electricity'), true);
assert.equal(progress.unlocked(slot, 'waves'), true);

progress.recordRun(slot, legacyRun);
const electricRun = snapshot('electricity');
assert.equal(progress.recordRun(slot, electricRun), false, 'A second active run is rejected');
assert.deepEqual(slot.stories.mechanics.run, legacyRun);
progress.discardRuns(slot, 350);
assert.equal(slot.stories.mechanics.attempts.at(-1).outcome, 'abandoned');
assert.equal(slot.stories.mechanics.jouleCollected, true);
assert.equal(progress.recordRun(slot, electricRun), true);
progress.finishRun(slot, electricRun.state, electricRun.nodes, true, 400);
progress.finishRun(slot, { ...legacyRun.state, health: 0 }, legacyRun.nodes, false, 500);
assert.equal(slot.stories.mechanics.jouleCollected, true, 'Replay failure never removes a Joule');
const wavesRun = snapshot('waves');
progress.recordRun(slot, wavesRun);
progress.finishRun(slot, wavesRun.state, wavesRun.nodes, true, 600);
assert.deepEqual(progress.collected(slot), ['mechanics', 'electricity', 'waves']);
assert.equal(slot.stories.mechanics.attempts.length, 3);
assert.deepEqual(progress.collected(progress.emptySlot(0)), [], 'Explicit deletion clears permanent progress');

// Exercise the actual game save functions, not only the model helpers.
const storage = new Map();
const appElement = { innerHTML: '' };
const context = vm.createContext({
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  location: { hostname: 'localhost' },
  localStorage: { getItem: key => storage.get(key) || null, setItem: (key, value) => storage.set(key, value) },
  document: { querySelector: selector => selector === '#app' ? appElement : null, addEventListener() {} }
});
for (const name of ['questions', 'electricity-questions', 'electricity-journey', 'cards', 'save-progress', 'journey-access', 'script']) {
  let source = fs.readFileSync(path.join(__dirname, '../site', `${name}.js`), 'utf8');
  if (name === 'script') source = source.split('applyPreferences();\n// Review hooks:')[0].split('applyPreferences();\r\n// Review hooks:')[0];
  vm.runInContext(source, context);
}
vm.runInContext(`
  const actualJourneyRender = renderJourneySelect;
  renderJourneySelect = () => {};
  renderMap = () => {};
  startNewRun(0);
  if (loadSaveSlots().slots[0].runs !== 0) throw Error('Creating a profile counted an attempt');
  beginExpedition();
  if (loadSaveSlots().slots[0].runs !== 1) throw Error('Starting a run did not count an attempt');
  state.health = 0;
  clearSavedRun(false);
  saveRun();
  let profile = loadSaveSlots().slots[0];
  if (profile.stories.mechanics.run) throw Error('Late autosave resurrected an ended run');
  if (profile.stories.mechanics.attempts.length !== 1) throw Error('Failure not recorded');
  startNewRun(0);
  beginExpedition();
  clearSavedRun(true);
  clearSavedRun(true);
  profile = loadSaveSlots().slots[0];
  if (profile.victories !== 1) throw Error('Completion was counted twice');
  if (!SaveProgress.unlocked(profile, 'electricity')) throw Error('Electricity not unlocked');
  selectedJourney = 'electricity';
  beginExpedition();
  const electricNodes = JSON.stringify(nodes);
  startNewRun(0);
  selectedJourney = 'mechanics';
  beginExpedition();
  continueSavedRun(0, 'electricity');
  if (state.journey !== 'electricity' || JSON.stringify(nodes) !== electricNodes) throw Error('Wrong story restored');
  if (loadSaveSlots().slots[0].stories.mechanics.run) throw Error('A second story was started');
`, context);

// Check rendering branches with a minimal DOM adapter; no real save is modified.
const elements = new Map();
function element(selector) {
  if (!elements.has(selector)) elements.set(selector, {
    textContent: '', innerHTML: '', disabled: false, classList: { toggle() {} },
    setAttribute() {}, addEventListener(type, handler) { this[type] = handler; },
    querySelector: name => element(`${selector} ${name}`)
  });
  return elements.get(selector);
}
context.document.querySelector = selector => selector === '#app' ? appElement : element(selector);
context.document.querySelectorAll = () => [0, 1, 2].map(i => element(`seal-${i}`));
vm.runInContext(`selectedJourney = 'electricity'; actualJourneyRender();`, context);
assert.equal(element('#journey-embark').textContent, 'Continue run');
assert.equal(element('#journey-embark').disabled, false);
context.location.hostname = 'jamnanji.netlify.app';
vm.runInContext(`actualJourneyRender();`, context);
assert.equal(element('#journey-embark').textContent, 'Continue run');
assert.equal(element('#journey-embark').disabled, false);
vm.runInContext(`selectedJourney = 'waves'; actualJourneyRender();`, context);
assert.equal(element('#journey-embark').textContent, 'Coming soon');
assert.equal(element('#journey-embark').disabled, true);
vm.runInContext(`selectedJourney = 'mechanics'; actualJourneyRender();`, context);
assert.equal(element('#journey-embark').textContent, 'Another run active');
assert.equal(element('#journey-embark').disabled, true);
assert.match(element('#story-attempts').innerHTML, /Run failed/);
assert.match(element('#story-attempts').innerHTML, /Joule recovered/);
context.window = { confirm: () => false };
element('#discard-active-run').click();
assert.equal(vm.runInContext('SaveProgress.activeJourneys(loadSaveSlots().slots[0]).length', context), 1, 'Cancel preserves the run');
context.window.confirm = () => true;
element('#discard-active-run').click();
assert.equal(vm.runInContext('SaveProgress.activeJourneys(loadSaveSlots().slots[0]).length', context), 0);
assert.equal(vm.runInContext('loadSaveSlots().slots[0].stories.electricity.attempts.at(-1).outcome', context), 'abandoned');
assert.equal(vm.runInContext('loadSaveSlots().slots[0].stories.mechanics.jouleCollected', context), true);
vm.runInContext(`actualJourneyRender();`, context);
assert.equal(element('#journey-embark').textContent, 'Start new run');
assert.equal(element('#journey-embark').disabled, false);
vm.runInContext(`
  const finishedProfile = loadSaveSlots();
  finishedProfile.slots[0].stories.electricity.jouleCollected = true;
  finishedProfile.slots[0].stories.waves.jouleCollected = true;
  writeSaveSlots(finishedProfile);
  showEndScreen(true);
`, context);
assert.match(appElement.innerHTML, /JOURNEY COMPLETE/);
assert.match(appElement.innerHTML, /Choose story/);
console.log('Save progression checks passed: migration, persistence, failures, unlocks, replay, story switching, deletion and three-Joule completion.');
