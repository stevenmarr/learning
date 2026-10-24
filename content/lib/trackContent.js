'use strict';
/** Shared engine for non-statics track curricula (same problem/grade model as statics). */
const katex = require('katex');
const { makeRng, checkNumeric } = require('../helpers');
const { basePath } = require('../../src/config');

const kopts = { throwOnError: false, strict: 'ignore', output: 'html', trust: (c) => c.command === '\\htmlClass', macros: { '\\gl': '\\htmlClass{gl-#1}{#2}' } };
function tex(s, display = false) { return katex.renderToString(s, { ...kopts, displayMode: display }); }
function renderMath(html) {
  if (!html) return '';
  return String(html)
    .replace(/\$\$([\s\S]+?)\$\$/g, (_, t) => `<div class="math-display">${tex(t, true)}</div>`)
    .replace(/\$([^$\n]+?)\$/g, (_, t) => tex(t, false));
}
function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
function fmtAns(v) { const s = Number(v.toPrecision(4)); return Math.abs(s) >= 1e7 || (Math.abs(s) < 1e-4 && s !== 0) ? s.toExponential(3) : String(s); }

function buildTrack(meta, units) {
  const byId = new Map();
  for (const u of units) {
    if (!u.num || !u.title || !Array.isArray(u.problems)) throw new Error(`Bad unit in track ${meta.id}`);
    for (const p of u.problems) {
      if (byId.has(p.id)) throw new Error('duplicate problem id ' + p.id);
      p.unit = u.num;
      p.track = meta.id;
      p.skills = p.skills || [];
      byId.set(p.id, p);
    }
  }
  const lessonCache = new Map();
  const fill = (html) => html.replace(/%BASE%/g, basePath);

  function instance(id, seed) {
    const def = byId.get(id);
    if (!def) return null;
    const r = makeRng((hashStr(id) ^ (seed >>> 0)) >>> 0);
    return { def, seed: seed >>> 0, data: def.gen(r) };
  }
  function publicView(inst) {
    const { def, data, seed } = inst;
    const out = {
      id: def.id, unit: def.unit, track: meta.id, skill: null, skillTitle: null, seed,
      title: def.title, kind: def.kind,
      prompt: renderMath(data.prompt), svg: data.svg || '',
      hints: (data.hints || []).map(renderMath), needs: [],
    };
    if (def.kind === 'mc') out.choices = data.choices.map((c, i) => ({ i, html: renderMath(c.text) }));
    else out.fields = data.answers.map((a) => ({ key: a.key, label: tex(a.label), unit: a.unit }));
    return out;
  }
  function grade(inst, submission) {
    const { def, data } = inst;
    if (def.kind === 'mc') {
      const idx = parseInt(submission && submission.choice, 10);
      const correctIdx = data.choices.findIndex((c) => c.correct);
      return { correct: idx === correctIdx, results: [{ key: 'choice', ok: idx === correctIdx }], correctChoice: correctIdx };
    }
    const vals = (submission && submission.answers) || {};
    const results = data.answers.map((a) => {
      const res = checkNumeric(a, vals[a.key]);
      return { key: a.key, ok: res.ok, parsed: res.parsed, expected: a.value, unit: a.unit };
    });
    return { correct: results.every((x) => x.ok), results };
  }
  function solutionHtml(inst) {
    const { def, data } = inst;
    let ansLine = '';
    if (def.kind !== 'mc') {
      ansLine = '<p class="answer-line"><strong>Answers:</strong> ' + data.answers.map((a) => `${tex(a.label)} = <strong>${fmtAns(a.value)}</strong> ${a.unit}`).join(' &nbsp;·&nbsp; ') + '</p>';
    }
    return renderMath(data.solution) + ansLine;
  }
  function lessonHtml(n) {
    if (!lessonCache.has(n)) lessonCache.set(n, fill(renderMath(units[n - 1].lesson)));
    return lessonCache.get(n);
  }

  return { meta, units, byId, instance, publicView, grade, solutionHtml, lessonHtml, renderMath, tex };
}

module.exports = { buildTrack, renderMath, tex };
