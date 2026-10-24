'use strict';
/** Track-scoped progress (non-statics engines + shared attempt tables with track column). */
const db = require('./db');
const config = require('./config');
const catalog = require('../content/catalog');
const adaptive = require('./adaptive');

const REVIEW_INTERVALS_DAYS = [0, 1, 3, 7, 14];
const RETRY_DELAY_MS = 10 * 60 * 1000;
const GRADUATE_BOX = 4;
const DAY = 24 * 3600 * 1000;

function dayKey(ts = Date.now()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: config.timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date(ts));
}

const q = {
  prior: db.prepare('SELECT COUNT(*) n FROM attempts WHERE user_id = ? AND track = ? AND problem_id = ? AND seed = ?'),
  insert: db.prepare('INSERT INTO attempts (user_id, problem_id, unit, seed, first, correct, score, hints, mode, quiz_id, created_at, track) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)'),
  activity: db.prepare('INSERT INTO activity (user_id, day, count) VALUES (?, ?, 1) ON CONFLICT(user_id, day) DO UPDATE SET count = count + 1'),
  reviewGet: db.prepare('SELECT * FROM review WHERE user_id = ? AND problem_id = ?'),
  reviewUpsert: db.prepare('INSERT INTO review (user_id, problem_id, unit, box, due, updated_at, track) VALUES (?,?,?,?,?,?,?) ON CONFLICT(user_id, problem_id) DO UPDATE SET box = excluded.box, due = excluded.due, updated_at = excluded.updated_at, track = excluded.track, unit = excluded.unit'),
  reviewDel: db.prepare('DELETE FROM review WHERE user_id = ? AND problem_id = ?'),
  firsts: db.prepare('SELECT problem_id, score FROM attempts WHERE user_id = ? AND track = ? AND first = 1 ORDER BY id DESC'),
  unlockIns: db.prepare('INSERT OR IGNORE INTO unlocks (user_id, track, unit, unlocked_at) VALUES (?, ?, ?, ?)'),
  unlocks: db.prepare('SELECT unit FROM unlocks WHERE user_id = ? AND track = ?'),
  totals: db.prepare('SELECT COUNT(*) attempts, SUM(correct) correct FROM attempts WHERE user_id = ? AND track = ? AND first = 1'),
  due: db.prepare('SELECT * FROM review WHERE user_id = ? AND track = ? AND due <= ? ORDER BY due ASC'),
  allReview: db.prepare('SELECT * FROM review WHERE user_id = ? AND track = ? ORDER BY due ASC'),
  lessonView: db.prepare('INSERT INTO lesson_views (user_id, track, unit, viewed_at) VALUES (?, ?, ?, ?) ON CONFLICT(user_id, track, unit) DO UPDATE SET viewed_at = excluded.viewed_at'),
  lessonViews: db.prepare('SELECT unit FROM lesson_views WHERE user_id = ? AND track = ?'),
  user: db.prepare('SELECT unlock_all FROM users WHERE id = ?'),
  days: db.prepare('SELECT day FROM activity WHERE user_id = ? ORDER BY day DESC LIMIT 400'),
  xpIns: db.prepare('INSERT OR IGNORE INTO game_xp (user_id, source, ref, xp, created_at) VALUES (?,?,?,?,?)'),
  xpSum: db.prepare('SELECT COALESCE(SUM(xp),0) xp FROM game_xp WHERE user_id = ?'),
};

function typeScores(userId, trackId) {
  const rows = q.firsts.all(userId, trackId);
  const by = new Map();
  for (const r of rows) {
    const arr = by.get(r.problem_id) || [];
    if (arr.length < 3) arr.push(r.score);
    by.set(r.problem_id, arr);
  }
  const out = {};
  for (const [id, arr] of by) out[id] = { score: arr.reduce((a, b) => a + b, 0) / Math.max(arr.length, 2), n: arr.length, last: arr[0] };
  return out;
}

function unitMastery(userId, trackId, ts = typeScores(userId, trackId)) {
  const eng = catalog.getTrack(trackId);
  return eng.units.map((u) => {
    const types = u.problems.map((p) => (ts[p.id] ? ts[p.id].score : 0));
    const attempted = u.problems.filter((p) => ts[p.id]).length;
    const mastery = types.length ? types.reduce((a, b) => a + b, 0) / types.length : 0;
    return { unit: u.num, mastery, attempted, total: u.problems.length };
  });
}

function unlockedSet(userId, trackId, mastery = unitMastery(userId, trackId)) {
  const user = q.user.get(userId);
  const eng = catalog.getTrack(trackId);
  const set = new Set([1]);
  if (user && user.unlock_all) eng.units.forEach((u) => set.add(u.num));
  for (const r of q.unlocks.all(userId, trackId)) set.add(r.unit);
  for (const m of mastery) {
    if (m.mastery >= config.masteryThreshold && m.unit < eng.units.length && !set.has(m.unit + 1)) {
      q.unlockIns.run(userId, trackId, m.unit + 1, Date.now());
      set.add(m.unit + 1);
    }
  }
  // Math soft level gating: do not auto-unlock units in a locked level
  const meta = eng.meta;
  if (meta.levels && !(user && user.unlock_all)) {
    const byNum = Object.fromEntries(mastery.map((m) => [m.unit, { ...m, mastered: m.mastery >= config.masteryThreshold }]));
    for (const lvl of meta.levels) {
      const req = lvl.requires ? meta.levels.find((l) => l.id === lvl.requires) : null;
      const reqOk = !req || req.units.every((n) => byNum[n] && byNum[n].mastered);
      if (!reqOk) lvl.units.forEach((n) => { if (n !== lvl.units[0] || req) set.delete(n); });
      if (reqOk) set.add(lvl.units[0]);
    }
    // always keep unit 1
    set.add(1);
  }
  return set;
}

function streak(userId) {
  const days = new Set(q.days.all(userId).map((r) => r.day));
  let n = 0, t = Date.now();
  if (!days.has(dayKey(t))) t -= DAY;
  while (days.has(dayKey(t))) { n++; t -= DAY; }
  const week = [];
  for (let i = 6; i >= 0; i--) { const k = dayKey(Date.now() - i * DAY); week.push({ day: k, active: days.has(k) }); }
  return { current: n, activeToday: days.has(dayKey()), week };
}

function updateReview(userId, trackId, def, correct, now) {
  const item = q.reviewGet.get(userId, def.id);
  if (!correct) {
    q.reviewUpsert.run(userId, def.id, def.unit, 0, now + RETRY_DELAY_MS, now, trackId);
    return { action: 'queued' };
  }
  if (!item) return { action: 'none' };
  if (item.due > now) return { action: 'not-due' };
  const box = item.box + 1;
  if (box >= GRADUATE_BOX) { q.reviewDel.run(userId, def.id); return { action: 'graduated' }; }
  q.reviewUpsert.run(userId, def.id, def.unit, box, now + REVIEW_INTERVALS_DAYS[box] * DAY, now, trackId);
  return { action: 'advanced', box };
}

const record = db.transaction((userId, trackId, inst, correct, hints, mode, quizId) => {
  const now = Date.now();
  const first = q.prior.get(userId, trackId, inst.def.id, inst.seed).n === 0;
  const score = correct ? Math.max(0.5, 1 - 0.15 * Math.min(hints, 3)) : 0;
  q.insert.run(userId, inst.def.id, inst.def.unit, inst.seed, first ? 1 : 0, correct ? 1 : 0, first ? score : 0, hints, mode, quizId || null, now, trackId);
  let review = { action: 'none' };
  if (first) {
    q.activity.run(userId, dayKey(now));
    review = updateReview(userId, trackId, inst.def, correct, now);
    if (correct) q.xpIns.run(userId, 'track-correct', trackId + ':' + inst.def.id + ':' + inst.seed, 5, now);
  }
  return { first, score: first ? score : 0, review };
});

function recordAttempt(userId, trackId, inst, correct, hints, mode, quizId) {
  const before = unlockedSet(userId, trackId);
  const res = record(userId, trackId, inst, correct, hints, mode, quizId);
  const ts = typeScores(userId, trackId);
  const mastery = unitMastery(userId, trackId, ts);
  const after = unlockedSet(userId, trackId, mastery);
  res.typeScore = ts[inst.def.id] ? ts[inst.def.id].score : 0;
  res.newlyUnlocked = [...after].filter((u) => !before.has(u));
  const um = mastery.find((m) => m.unit === inst.def.unit);
  res.unitMastery = um ? um.mastery : null;
  res.gate = adaptive.unitGate({ ...um, mastered: um && um.mastery >= config.masteryThreshold });
  return res;
}

function summary(userId, trackId) {
  const eng = catalog.getTrack(trackId);
  if (!eng) return null;
  const ts = typeScores(userId, trackId);
  const mastery = unitMastery(userId, trackId, ts);
  const unlocked = unlockedSet(userId, trackId, mastery);
  const tot = q.totals.get(userId, trackId);
  const now = Date.now();
  const due = q.due.all(userId, trackId, now);
  const queue = q.allReview.all(userId, trackId);
  const viewed = new Set(q.lessonViews.all(userId, trackId).map((r) => r.unit));
  const user = q.user.get(userId);
  const units = mastery.map((m) => {
    const row = { ...m, unlocked: unlocked.has(m.unit), mastered: m.mastery >= config.masteryThreshold, lessonViewed: viewed.has(m.unit) };
    row.gate = adaptive.unitGate(row);
    return row;
  });
  const levels = adaptive.levelGate(eng.meta, units, user && user.unlock_all);
  const recUnit = units.find((u) => u.unlocked && !u.mastered);
  let recommended;
  if (due.length >= 3) recommended = { kind: 'review', text: `Clear review queue (${due.length} due)`, gate: 'practice' };
  else if (recUnit) recommended = { kind: 'unit', unit: recUnit.unit, text: `${recUnit.gate.label}: Unit ${recUnit.unit}`, gate: recUnit.gate.status, lesson: !recUnit.lessonViewed };
  else if (due.length) recommended = { kind: 'review', text: `Clear review (${due.length})`, gate: 'practice' };
  else recommended = { kind: 'quiz', text: 'Mixed quiz or next module', gate: 'ready' };
  return {
    trackId,
    meta: eng.meta,
    units,
    levels,
    typeScores: ts,
    totals: { attempts: tot.attempts || 0, correct: tot.correct || 0 },
    streak: streak(userId),
    reviewDue: due.length,
    reviewQueued: queue.length,
    nextReviewAt: queue.length ? queue[0].due : null,
    recommended,
    threshold: config.masteryThreshold,
    xp: q.xpSum.get(userId).xp,
  };
}

function hubSummary(userId) {
  const tracks = catalog.trackSummaries().map((t) => {
    if (t.status === 'stub' || !catalog.getTrack(t.id)) return { ...t, progress: null };
    const s = summary(userId, t.id);
    const mastered = s.units.filter((u) => u.mastered).length;
    const overall = s.units.reduce((a, u) => a + u.mastery, 0) / Math.max(s.units.length, 1);
    return { ...t, progress: { mastered, total: s.units.length, overall, reviewDue: s.reviewDue, gate: s.recommended.gate, recommended: s.recommended } };
  });
  return { tracks, streak: streak(userId), xp: q.xpSum.get(userId).xp };
}

function markLessonViewed(userId, trackId, unit) { q.lessonView.run(userId, trackId, unit, Date.now()); }
function dueItems(userId, trackId) { return q.due.all(userId, trackId, Date.now()); }

function pickProblem(userId, trackId, unitNum, excludeId) {
  const eng = catalog.getTrack(trackId);
  const u = eng.units[unitNum - 1];
  const ts = typeScores(userId, trackId);
  const scored = u.problems.map((p) => ({ id: p.id, s: ts[p.id] ? ts[p.id].score : -1, r: Math.random() }));
  const pool = scored.filter((x) => x.id !== excludeId);
  pool.sort((a, b) => a.s - b.s || a.r - b.r);
  const weakest = pool.filter((x) => x.s <= pool[0].s + 0.25).slice(0, 3);
  return weakest[Math.floor(Math.random() * weakest.length)].id;
}

module.exports = { summary, hubSummary, recordAttempt, typeScores, unitMastery, unlockedSet, markLessonViewed, dueItems, pickProblem, dayKey };
