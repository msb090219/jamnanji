/* Permanent profiles own story runs; ending a run never deletes a profile. */
const SaveProgress = (() => {
  const storyIds = ['mechanics', 'electricity', 'waves'];
  const emptyStory = () => ({ run: null, attempts: [], jouleCollected: false });
  const emptySlot = id => ({ id, createdAt: null, updatedAt: null, runs: 0, victories: 0, bestFloor: 0, lastJourney: 'mechanics', stories: Object.fromEntries(storyIds.map(id => [id, emptyStory()])) });
  function normalize(saved) {
    return { version: 2, slots: Array.from({ length: 3 }, (_, index) => {
      const old = saved?.slots?.[index];
      const slot = { ...emptySlot(index), ...old, id: index };
      slot.stories = Object.fromEntries(storyIds.map(id => [id, { ...emptyStory(), ...old?.stories?.[id] }]));
      if (!old?.stories) {
        const id = old?.run?.state?.journey || old?.run?.journey || 'mechanics';
        if (old?.run && storyIds.includes(id)) {
          slot.stories[id].run = old.run;
          slot.lastJourney = id;
        }
        // The old selection screen only allowed Mechanics victories.
        if (old?.victories > 0) slot.stories.mechanics.jouleCollected = true;
      }
      if (!storyIds.includes(slot.lastJourney)) slot.lastJourney = 'mechanics';
      if (slot.runs || slot.victories || old?.run || storyIds.some(id => slot.stories[id].run || slot.stories[id].attempts.length || slot.stories[id].jouleCollected)) {
        slot.createdAt ||= old?.run?.savedAt || 1;
        slot.updatedAt ||= old?.run?.savedAt || null;
      }
      // Read-only compatibility view used by the slot overview.
      slot.run = slot.stories[slot.lastJourney].run || storyIds.map(id => slot.stories[id].run).find(Boolean) || null;
      return slot;
    }) };
  }
  const collected = slot => storyIds.filter(id => slot.stories[id].jouleCollected);
  const unlocked = (slot, id) => storyIds.includes(id);
  const activeJourneys = slot => storyIds.filter(id => slot.stories[id]?.run);
  function discardRuns(slot, now = Date.now()) {
    for (const id of activeJourneys(slot)) {
      const run = slot.stories[id].run;
      finishRun(slot, { ...run.state, journey: id }, run.nodes || [], false, now);
      slot.stories[id].attempts[slot.stories[id].attempts.length - 1].outcome = 'abandoned';
    }
  }
  function recordRun(slot, run) {
    const id = run.state.journey || run.journey || 'mechanics';
    // Legacy profiles may contain several runs. Allow their existing saves to
    // continue, but never create an additional run until the profile is clear.
    if (!slot.stories[id].run && activeJourneys(slot).length) return false;
    slot.createdAt ||= run.savedAt;
    slot.updatedAt = run.savedAt;
    slot.lastJourney = id;
    slot.stories[id].run = run;
    slot.run = run;
    return true;
  }
  function finishRun(slot, state, nodes, won, now = Date.now()) {
    const story = slot.stories[state.journey || 'mechanics'];
    if (!story.run) return false; // Re-entering the ending cannot record it twice.
    const floor = nodes.find(node => node.id === (state.activeNode || state.current))?.floor || 0;
    story.attempts.push({ outcome: won ? 'won' : 'failed', endedAt: now, act: state.act || 1, floor, health: state.health, maxHealth: state.maxHealth, encounters: Math.max(0, (state.completed?.length || 1) - 1), supplies: state.coins || 0 });
    story.run = null;
    if (won) {
      story.jouleCollected = true;
      slot.victories += 1;
    }
    slot.bestFloor = Math.max(slot.bestFloor, floor);
    slot.updatedAt = now;
    slot.run = null;
    return true;
  }
  return { storyIds, emptySlot, normalize, collected, unlocked, activeJourneys, discardRuns, recordRun, finishRun };
})();
if (typeof module !== 'undefined') module.exports = SaveProgress;
