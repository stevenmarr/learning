'use strict';
/**
 * Per-step adaptive gate: remedial | practice | ready
 * Uses recent first-try accuracy on a unit (and optional level mastery for math).
 */
const config = require('./config');

const REMEDIAL_MAX = 0.45;
const READY_MIN = config.masteryThreshold; // 0.8

function classify(mastery, attempted, total) {
  if (!attempted) return { status: 'practice', label: 'Start practice', detail: 'No attempts yet — learn the lesson, then try a few problems.' };
  if (mastery < REMEDIAL_MAX) return { status: 'remedial', label: 'Remedial review', detail: 'Accuracy is low. Re-read the lesson, use hints, and retry the weakest problem types.' };
  if (mastery < READY_MIN) return { status: 'practice', label: 'More practice', detail: `Keep practicing toward ${Math.round(READY_MIN * 100)}% mastery before moving on.` };
  return { status: 'ready', label: 'Ready to move on', detail: 'Strong first-try mastery. Unlock the next unit or take a mixed quiz.' };
}

function unitGate(unitRow) {
  const g = classify(unitRow.mastery || 0, unitRow.attempted || 0, unitRow.total || 0);
  return { ...g, mastery: unitRow.mastery || 0, attempted: unitRow.attempted || 0, total: unitRow.total || 0, mastered: !!unitRow.mastered };
}

/** Soft level gate for math spine: level ready if all its units are mastered (or unlock_all). */
function levelReady(level, unitRowsByNum, unlockAll) {
  if (unlockAll) return true;
  return level.units.every((n) => unitRowsByNum[n] && unitRowsByNum[n].mastered);
}

function levelGate(meta, unitRows, unlockAll) {
  if (!meta.levels) return null;
  const byNum = Object.fromEntries(unitRows.map((u) => [u.unit, u]));
  const out = [];
  for (const lvl of meta.levels) {
    const req = lvl.requires ? meta.levels.find((l) => l.id === lvl.requires) : null;
    const reqOk = !req || levelReady(req, byNum, unlockAll);
    const ready = reqOk && levelReady(lvl, byNum, unlockAll);
    const unlocked = reqOk || !!unlockAll;
    const units = lvl.units.map((n) => unitGate(byNum[n] || { unit: n, mastery: 0, attempted: 0, total: 0 }));
    const avg = units.reduce((a, u) => a + u.mastery, 0) / Math.max(units.length, 1);
    out.push({
      ...lvl,
      unlocked,
      ready,
      gate: !unlocked
        ? { status: 'remedial', label: 'Locked', detail: `Master ${req.short} first.` }
        : ready
          ? { status: 'ready', label: 'Level ready', detail: 'All units in this level mastered.' }
          : classify(avg, units.reduce((a, u) => a + u.attempted, 0), 1),
      units,
    });
  }
  return out;
}

module.exports = { classify, unitGate, levelGate, levelReady, REMEDIAL_MAX, READY_MIN };
