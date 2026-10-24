'use strict';
const { TRACKS, byId: trackMeta } = require('./tracks/registry');
const statics = require('./index');

const engines = {
  statics: {
    meta: trackMeta.get('statics'),
    units: statics.units,
    byId: statics.byId,
    instance: (id, seed) => statics.instance(id, seed),
    publicView: (inst) => {
      const v = statics.publicView(inst);
      v.track = 'statics';
      return v;
    },
    grade: statics.grade,
    solutionHtml: statics.solutionHtml,
    lessonHtml: statics.lessonHtml,
    toolkit: statics.toolkit,
    toolkitByKey: statics.toolkitByKey,
    toolkitBySlug: statics.toolkitBySlug,
    skills: statics.skills,
  },
};

for (const id of ['math', 'circuits', 'digital', 'cs', 'physics', 'emwaves', 'chemistry', 'paramedic', 'junior', 'livestock']) {
  engines[id] = require('./tracks/' + id);
}

function getTrack(id) { return engines[id] || null; }

function resolveProblem(id) {
  for (const [tid, e] of Object.entries(engines)) {
    if (e.byId && e.byId.has(id)) return { trackId: tid, engine: e, def: e.byId.get(id) };
  }
  return null;
}

function trackSummaries() {
  return TRACKS.map((t) => {
    const e = engines[t.id];
    const unitCount = e && e.units ? e.units.length : 0;
    const problemTypes = e && e.byId ? [...e.byId.values()].filter((p) => (p.unit || 0) > 0).length : 0;
    return { ...t, unitCount, problemTypes };
  });
}

module.exports = { TRACKS, engines, getTrack, resolveProblem, trackSummaries, statics };
