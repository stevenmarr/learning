'use strict';
const config = require('./config');
const catalog = require('../content/catalog');
const V = require('./views');

const B = config.basePath;
const esc = V.esc;
const url = (p = '/') => B + p;
const pct = (x) => Math.round((x || 0) * 100);

function gateChip(g) {
  if (!g) return '';
  const cls = g.status === 'ready' ? 'ok' : g.status === 'remedial' ? 'lock' : 'new';
  return `<span class="tag ${cls}">${esc(g.label || g.status)}</span>`;
}

function hubPage({ user, csrf, hub, staticsGame }) {
  const cards = hub.tracks.map((t) => {
    const p = t.progress;
    const href = t.id === 'statics' ? url('/statics') : url('/t/' + t.slug);
    const bar = p ? `<div class="bar" role="progressbar" aria-valuenow="${pct(p.overall)}"><span style="width:${pct(p.overall)}%"></span></div>
      <p class="small muted">${p.mastered}/${p.total} units · ${pct(p.overall)}% · ${p.recommended ? esc(p.recommended.text) : ''}</p>` : `<p class="small muted">${t.unitCount} units · ${t.problemTypes} problem types</p>`;
    return `<a class="unit track-card" href="${href}" style="border-top:3px solid ${esc(t.accent)}; text-decoration:none; color:inherit">
      <div class="unit-head"><span class="num">${esc(t.icon)}</span>${gateChip(p && p.recommended ? { status: p.gate, label: p.gate } : { status: 'new', label: t.status })}</div>
      <h3>${esc(t.title)}</h3>
      <p class="muted">${esc(t.blurb)}</p>
      ${bar}
    </a>`;
  }).join('');

  return V.layout({
    title: 'Learning Hub', user, csrf, active: 'hub', reviewDue: 0, bodyClass: 'hub-body',
    body: `<section class="hero">
      <p class="kicker">${esc(config.productName)} · Welcome, ${esc(user.username)}</p>
      <h1>Choose a module</h1>
      <p class="muted lead-in">Gamified lessons with an adaptive check at every step: <strong>remedial</strong>, <strong>more practice</strong>, or <strong>ready to move on</strong>. Statics still includes Farm Engineering.</p>
      <div class="stats" style="margin-top:18px">
        <div class="stat"><span class="v">${hub.streak.current}</span><span class="l">day streak</span></div>
        <div class="stat"><span class="v">${hub.xp}</span><span class="l">XP earned</span></div>
        <div class="stat"><span class="v">${hub.tracks.filter((t) => t.status === 'live').length}</span><span class="l">live modules</span></div>
      </div>
    </section>
    <section>
      <h2 class="section-title">Curricula</h2>
      <div class="grid">${cards}</div>
    </section>
    ${staticsGame || ''}`,
  });
}

function trackDashboard({ user, csrf, s, eng }) {
  const meta = eng.meta;
  const rec = s.recommended;
  const recHref = rec.kind === 'review' ? url(`/t/${meta.slug}/review`)
    : rec.kind === 'quiz' ? url(`/t/${meta.slug}/quiz`)
    : url(`/t/${meta.slug}/units/${rec.unit}${rec.lesson ? '' : '/practice'}`);
  const unitCards = eng.units.map((u) => {
    const st = s.units[u.num - 1];
    return `<article class="unit ${st.unlocked ? '' : 'locked'}">
      <div class="unit-head"><span class="num">${String(u.num).padStart(2, '0')}</span>${gateChip(st.gate)}${st.mastered ? '<span class="tag ok">Mastered</span>' : ''}</div>
      <h3>${esc(u.title)}</h3>
      <p class="muted">${esc(u.blurb)}</p>
      <div class="bar"><span style="width:${pct(st.mastery)}%"></span></div>
      <p class="small muted">${pct(st.mastery)}% · ${st.attempted}/${st.total} types · ${esc(st.gate.detail)}</p>
      <div class="row">
        <a class="btn ghost" href="${url(`/t/${meta.slug}/units/${u.num}`)}">Lesson</a>
        ${st.unlocked ? `<a class="btn" href="${url(`/t/${meta.slug}/units/${u.num}/practice`)}">Practice</a>` : `<span class="small muted">Locked</span>`}
      </div>
    </article>`;
  }).join('');

  const levels = (s.levels || []).map((lvl) => `<div class="card" style="border-left:3px solid ${lvl.unlocked ? meta.accent : '#444'}">
    <div class="unit-head"><strong>${esc(lvl.title)}</strong>${gateChip(lvl.gate)}</div>
    <p class="small muted">${esc(lvl.gate.detail)} · units ${lvl.units.map((u) => u.unit || u).join(', ')}</p>
  </div>`).join('');

  return V.layout({
    title: meta.title, user, csrf, active: 'hub', reviewDue: s.reviewDue,
    body: `<p class="kicker"><a href="${url('/')}">Hub</a> · ${esc(meta.short)}</p>
      <h1>${esc(meta.title)}</h1>
      <p class="muted">${esc(meta.blurb)}</p>
      <section class="hero"><div class="card next">
        <div><p class="kicker">Adaptive next step</p><p class="big">${esc(rec.text)}</p>
        <p class="small muted">Gate: ${gateChip({ status: rec.gate, label: rec.gate })}</p></div>
        <a class="btn primary" href="${recHref}">Go</a>
      </div></section>
      ${levels ? `<section><h2 class="section-title">Readiness map</h2><div class="grid two">${levels}</div></section>` : ''}
      <section><h2 class="section-title">Units</h2><div class="grid">${unitCards}</div></section>
      <p class="row"><a class="btn ghost" href="${url(`/t/${meta.slug}/review`)}">Review${s.reviewDue ? ` (${s.reviewDue})` : ''}</a>
      <a class="btn ghost" href="${url(`/t/${meta.slug}/quiz`)}">Quiz</a></p>`,
  });
}

function trackLessonPage({ user, csrf, s, eng, unit }) {
  const meta = eng.meta;
  const st = s.units[unit.num - 1];
  return V.layout({
    title: `Unit ${unit.num}: ${unit.title}`, user, csrf, active: 'hub', reviewDue: s.reviewDue,
    body: `<div class="lesson-layout"><article class="lesson">
      <p class="kicker"><a href="${url('/t/' + meta.slug)}">${esc(meta.short)}</a> · Unit ${unit.num}</p>
      <h1>${esc(unit.title)}</h1>
      <div class="card brushup"><p class="kicker">Adaptive gate</p><p>${gateChip(st.gate)} ${esc(st.gate.detail)}</p></div>
      <div class="prose">${eng.lessonHtml(unit.num)}</div>
      <div class="card cta"><div><p class="kicker">Practice</p><p class="big">${unit.problems.length} problem types</p></div>
        ${st.unlocked ? `<a class="btn primary" href="${url(`/t/${meta.slug}/units/${unit.num}/practice`)}">Start practice</a>` : '<p class="muted">Unit locked</p>'}
      </div>
    </article>
    <aside class="side"><div class="card"><p class="kicker">Mastery</p>
      <div class="bar"><span style="width:${pct(st.mastery)}%"></span></div>
      <p class="small muted">${pct(st.mastery)}%</p>
      <ul class="types">${unit.problems.map((p) => {
        const t = s.typeScores[p.id];
        return `<li><span class="tname">${esc(p.title)}</span><span class="tpct">${t ? pct(t.score) + '%' : ''}</span></li>`;
      }).join('')}</ul>
    </div></aside></div>`,
  });
}

function trackPracticePage({ user, csrf, s, eng, unit, type }) {
  const meta = eng.meta;
  const st = s.units[unit.num - 1];
  return V.layout({
    title: `Practice · ${unit.title}`, user, csrf, active: 'hub', reviewDue: s.reviewDue, scripts: ['player.js'],
    body: `<div class="lesson-layout"><section>
      <p class="kicker">${esc(meta.short)} · Unit ${unit.num} · ${gateChip(st.gate)}</p>
      <h1>${esc(unit.title)}</h1>
      <div id="player" class="player card" data-mode="practice" data-track="${esc(meta.id)}" data-unit="${unit.num}" data-type="${esc(type || '')}" aria-live="polite"><p class="muted">Loading…</p></div>
      <p class="small muted">After each answer the hub updates your gate: remedial, more practice, or ready.</p>
    </section>
    <aside class="side"><div class="card" id="unit-mastery">
      <p class="kicker">Unit mastery</p>
      <div class="bar"><span style="width:${pct(st.mastery)}%"></span></div>
      <p class="small muted"><span id="mastery-pct">${pct(st.mastery)}</span>% · gate ${esc(st.gate.status)}</p>
      <p class="small"><a href="${url(`/t/${meta.slug}/units/${unit.num}`)}">← Lesson</a></p>
    </div></aside></div>`,
  });
}

function trackReviewPage({ user, csrf, s, eng }) {
  return V.layout({
    title: 'Review', user, csrf, active: 'hub', reviewDue: s.reviewDue, scripts: ['player.js'],
    body: `<p class="kicker">${esc(eng.meta.short)}</p><h1>Review queue</h1>
      <div id="player" class="player card" data-mode="review" data-track="${esc(eng.meta.id)}" aria-live="polite"><p class="muted">Loading…</p></div>`,
  });
}

function trackQuizPage({ user, csrf, s, eng }) {
  return V.layout({
    title: 'Quiz', user, csrf, active: 'hub', reviewDue: s.reviewDue, scripts: ['player.js'],
    body: `<p class="kicker">${esc(eng.meta.short)}</p><h1>Mixed quiz</h1>
      <p class="muted">Problems from mastered units in this module.</p>
      <div id="player" class="player card" data-mode="quiz" data-track="${esc(eng.meta.id)}" aria-live="polite"><p class="muted">Loading…</p></div>`,
  });
}

module.exports = { hubPage, trackDashboard, trackLessonPage, trackPracticePage, trackReviewPage, trackQuizPage, gateChip };
