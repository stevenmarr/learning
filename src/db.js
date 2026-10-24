'use strict';
const fs = require('fs');
const path = require('path');
const Database = require('better-sqlite3');
const config = require('./config');

fs.mkdirSync(config.dataDir, { recursive: true });
const db = new Database(path.join(config.dataDir, 'statics.db'));
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE COLLATE NOCASE,
  pass_hash TEXT NOT NULL,
  unlock_all INTEGER NOT NULL DEFAULT 0,
  created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
  sid TEXT PRIMARY KEY,
  sess TEXT NOT NULL,
  expires INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires);
CREATE TABLE IF NOT EXISTS attempts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  unit INTEGER NOT NULL,
  seed INTEGER NOT NULL,
  first INTEGER NOT NULL,
  correct INTEGER NOT NULL,
  score REAL NOT NULL,
  hints INTEGER NOT NULL DEFAULT 0,
  mode TEXT NOT NULL DEFAULT 'practice',
  quiz_id INTEGER,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON attempts(user_id, problem_id, first);
CREATE TABLE IF NOT EXISTS review (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  problem_id TEXT NOT NULL,
  unit INTEGER NOT NULL,
  box INTEGER NOT NULL DEFAULT 0,
  due INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, problem_id)
);
CREATE TABLE IF NOT EXISTS activity (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);
CREATE TABLE IF NOT EXISTS lesson_views (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit INTEGER NOT NULL,
  viewed_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, unit)
);
CREATE TABLE IF NOT EXISTS quizzes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  items TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  finished_at INTEGER,
  score REAL,
  total INTEGER
);
`);

module.exports = db;
db.exec(`CREATE TABLE IF NOT EXISTS unlocks (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  unit INTEGER NOT NULL,
  unlocked_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, unit)
);`);

// --- v2: math readiness (additive migration; safe on an existing database) ---
db.exec(`
CREATE TABLE IF NOT EXISTS assessments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  items TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  finished_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_assess_user ON assessments(user_id, id);
CREATE TABLE IF NOT EXISTS skill_status (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  status TEXT NOT NULL,
  correct INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL DEFAULT 0,
  source TEXT NOT NULL DEFAULT 'assessment',
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, skill)
);
CREATE TABLE IF NOT EXISTS toolkit_views (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  skill TEXT NOT NULL,
  viewed_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, skill)
);
CREATE TABLE IF NOT EXISTS user_prefs (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key TEXT NOT NULL,
  value TEXT,
  PRIMARY KEY (user_id, key)
);
`);

// --- v3: Farm Engineering game (additive migration; new tables only, existing data untouched) ---
db.exec(`
CREATE TABLE IF NOT EXISTS game_levels (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level TEXT NOT NULL,
  best_stars INTEGER NOT NULL DEFAULT 0,
  star_mask INTEGER NOT NULL DEFAULT 0,
  attempts INTEGER NOT NULL DEFAULT 0,
  fails INTEGER NOT NULL DEFAULT 0,
  completed_at INTEGER,
  best_cost REAL,
  last_design TEXT,
  seed INTEGER NOT NULL DEFAULT 1,
  updated_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, level)
);
CREATE TABLE IF NOT EXISTS game_xp (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  ref TEXT,
  xp INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_game_xp_once ON game_xp(user_id, source, ref);
CREATE TABLE IF NOT EXISTS game_badges (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge TEXT NOT NULL,
  earned_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, badge)
);
CREATE TABLE IF NOT EXISTS rush_rounds (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  started_at INTEGER NOT NULL,
  ends_at INTEGER NOT NULL,
  score INTEGER NOT NULL DEFAULT 0,
  combo INTEGER NOT NULL DEFAULT 0,
  best_combo INTEGER NOT NULL DEFAULT 0,
  answered INTEGER NOT NULL DEFAULT 0,
  correct INTEGER NOT NULL DEFAULT 0,
  current TEXT,
  finished_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_rush_user ON rush_rounds(user_id, score);
`);
db.pragma('user_version = 3');

// --- v4: multi-curriculum tracks (additive; existing rows default to statics) ---
function hasCol(table, col) {
  return db.prepare(`PRAGMA table_info(${table})`).all().some((c) => c.name === col);
}
function addCol(table, col, decl) {
  if (!hasCol(table, col)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${col} ${decl}`);
}
addCol('attempts', 'track', "TEXT NOT NULL DEFAULT 'statics'");
addCol('review', 'track', "TEXT NOT NULL DEFAULT 'statics'");
addCol('lesson_views', 'track', "TEXT NOT NULL DEFAULT 'statics'");
addCol('quizzes', 'track', "TEXT NOT NULL DEFAULT 'statics'");

// unlocks / lesson_views were keyed by (user_id, unit) only — rebuild with track in the PK
db.exec(`
CREATE TABLE IF NOT EXISTS unlocks_v4 (
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track TEXT NOT NULL DEFAULT 'statics',
  unit INTEGER NOT NULL,
  unlocked_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, track, unit)
);
`);
const unlockCount = db.prepare('SELECT COUNT(*) n FROM unlocks_v4').get().n;
if (unlockCount === 0) {
  try {
    db.exec(`INSERT OR IGNORE INTO unlocks_v4 (user_id, track, unit, unlocked_at)
             SELECT user_id, 'statics', unit, unlocked_at FROM unlocks`);
  } catch (_) { /* unlocks may already be v4-shaped in a fresh DB after rename */ }
}
// If old unlocks table exists without track, replace it once
const unlockCols = db.prepare('PRAGMA table_info(unlocks)').all().map((c) => c.name);
if (unlockCols.length && !unlockCols.includes('track')) {
  db.exec('DROP TABLE unlocks');
  db.exec('ALTER TABLE unlocks_v4 RENAME TO unlocks');
} else if (!unlockCols.length) {
  db.exec('ALTER TABLE unlocks_v4 RENAME TO unlocks');
} else {
  // already has track; keep unlocks_v4 as unused spare or drop
  db.exec('DROP TABLE IF EXISTS unlocks_v4');
}

(function migrateLessonViews() {
  const cols = db.prepare('PRAGMA table_info(lesson_views)').all();
  const names = cols.map((c) => c.name);
  const pk = cols.filter((c) => c.pk).sort((a, b) => a.pk - b.pk).map((c) => c.name).join(',');
  if (pk === 'user_id,track,unit') { db.exec('DROP TABLE IF EXISTS lesson_views_v4'); return; }
  db.exec(`CREATE TABLE IF NOT EXISTS lesson_views_v4 (
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track TEXT NOT NULL DEFAULT 'statics',
    unit INTEGER NOT NULL,
    viewed_at INTEGER NOT NULL,
    PRIMARY KEY (user_id, track, unit)
  )`);
  if (names.includes('track')) {
    db.exec(`INSERT OR IGNORE INTO lesson_views_v4 (user_id, track, unit, viewed_at)
             SELECT user_id, COALESCE(track,'statics'), unit, viewed_at FROM lesson_views`);
  } else if (names.length) {
    db.exec(`INSERT OR IGNORE INTO lesson_views_v4 (user_id, track, unit, viewed_at)
             SELECT user_id, 'statics', unit, viewed_at FROM lesson_views`);
  }
  db.exec('DROP TABLE IF EXISTS lesson_views');
  db.exec('ALTER TABLE lesson_views_v4 RENAME TO lesson_views');
})();

db.exec(`CREATE INDEX IF NOT EXISTS idx_attempts_track ON attempts(user_id, track, problem_id, first);
CREATE INDEX IF NOT EXISTS idx_review_track ON review(user_id, track, due);`);
db.pragma('user_version = 4');
