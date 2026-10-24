'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'jh-fractions-sense', title: 'Fraction & Ratio Sense',
    blurb: 'Warm middle-school practice: parts of a whole, equivalent fractions, simple ratios.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Fractions are how we share feed, time, and recipes. $\\frac{a}{b}$ means $a$ parts when a whole is cut into $b$ equal pieces. Equivalent fractions name the same amount ($\\frac{1}{2}=\\frac{2}{4}$).</p>
<ul class="takeaways"><li>Same size, different names.</li><li>Ratio compares two quantities.</li></ul>`,
    problems: [
      { id: 'jh-u1-eq', title: 'Equivalent fraction', kind: 'numeric',
        gen(r) { const a=r.pick([1,2,3]); const k=r.pick([2,3,4]); return { prompt: String.raw`$\\frac{${a}}{${a*2}}$ equals $\\frac{?}{${a*2*k}}$. What is the numerator?`, answers:[ans('n','n',a*k,'')], hints:['Multiply top and bottom by the same number.'], solution:String.raw`<p>${a*k}</p>` }; } },
      { id: 'jh-u1-mc', title: 'Concept check: fractions', kind: 'mc',
        gen: mcPool([
          { q: '1/2 of a dozen eggs is…', correct: '6', wrong: ['2', '12', '24'], why: 'Half of 12.' },
          { q: 'A ratio 2:3 compares…', correct: 'two quantities in the relation two parts to three parts', wrong: ['only subtraction', 'square roots', 'speed of light'], why: 'Comparison.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'jh-science-method', title: 'Science Habits: Observe & Test',
    blurb: 'Question → guess → test → revise — farm-friendly experiments without fear.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Science is organized curiosity. On a farm: watch the goats, ask why one is left out, test a careful change, write what happened. Being wrong once is data.</p>
<ul class="takeaways"><li>Observe → hypothesize → test → record.</li><li>One variable at a time when you can.</li></ul>`,
    problems: [
      { id: 'jh-u2-mc', title: 'Scientific habits', kind: 'mc',
        gen: mcPool([
          { q: 'A fair test usually changes…', correct: 'one main variable while keeping others steady', wrong: ['everything at once on purpose', 'nothing ever', 'only your opinion'], why: 'Isolate cause.' },
          { q: 'Writing results matters because…', correct: 'memory fades and patterns appear on paper', wrong: ['science forbids notes', 'goats read journals', 'only adults may write'], why: 'Records.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'jh-farm-math', title: 'Farm Math Missions',
    blurb: 'Word problems with feed scoops, pen areas, and time — gamified practice.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Multiply scoops, add minutes, estimate fence. Same math as class — stickier when it feeds real animals.</p>
<ul class="takeaways"><li>Units in the answer.</li><li>Estimate before you calculate.</li></ul>`,
    problems: [
      { id: 'jh-u3-feed', title: 'Feed scoops', kind: 'numeric',
        gen(r) { const scoops=r.int(2,5), birds=r.int(4,12); return { prompt: String.raw`Each chicken gets $${scoops}$ scoops. $${birds}$ chickens. Total scoops?`, answers:[ans('t','T',scoops*birds,'')], hints:['Multiply.'], solution:String.raw`<p>${scoops*birds}</p>` }; } },
      { id: 'jh-u3-area', title: 'Pen area', kind: 'numeric',
        gen(r) { const L=r.int(4,12), W=r.int(3,10); return { prompt: String.raw`A rectangular pen is $${L}$ ft by $${W}$ ft. Area in square feet?`, answers:[ans('A','A',L*W,'ft²')], hints:['A=Lw'], solution:String.raw`<p>${L*W}</p>` }; } },
    ],
  },
];

module.exports = buildTrack(reg.get('junior'), units);
