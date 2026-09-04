// Implemented stories have no completion prerequisite. One run per profile.
// Unimplemented stories remain unavailable; this is not a security boundary.
const JourneyAccess = (() => {
  function forJourney(journey, slot, hostname) {
    const testing = false;
    const unlocked = SaveProgress.unlocked(slot, journey.id);
    const ready = journey.available === true;
    const blockedByRun = !slot.stories[journey.id]?.run && SaveProgress.activeJourneys(slot).length > 0;
    return { testing, unlocked, ready, blockedByRun, playable: unlocked && ready && !blockedByRun };
  }
  return { forJourney };
})();
