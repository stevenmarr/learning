'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'maxwell-picture', title: 'Maxwell’s Picture of Light',
    blurb: 'Changing E and B fields travel as waves at c — light as an electromagnetic wave.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Maxwell’s equations imply electromagnetic waves speed $c=1/\\sqrt{\\mu_0\\epsilon_0}$ in vacuum. Light is not a separate substance — it is the wave.</p>
<ul class="takeaways"><li>Light = EM wave.</li><li>$c$ links electricity, magnetism, optics.</li></ul>`,
    problems: [
      { id: 'em-u1-mc', title: 'Concept check: EM wave', kind: 'mc',
        gen: mcPool([
          { q: 'In vacuum, EM waves travel at…', correct: 'c, the speed of light', wrong: ['the speed of sound', 'any speed you choose', 'zero'], why: 'Maxwell → c.' },
          { q: 'An EM wave involves…', correct: 'coupled electric and magnetic fields', wrong: ['only gravity', 'only sound pressure', 'static charge that never changes'], why: 'E and B together.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'spectrum-antennas', title: 'Spectrum, Antennas & Propagation',
    blurb: 'Radio to gamma; wavelength/frequency; antennas as launchers of EM waves.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>$c=f\\lambda$ (frequency times wavelength). Antennas launch and catch radio waves; optics is the same physics at shorter $\\lambda$.</p>
<ul class="takeaways"><li>$c=f\\lambda$.</li><li>Spectrum is one family.</li></ul>`,
    problems: [
      { id: 'em-u2-cfl', title: 'c = f λ', kind: 'numeric',
        gen(r) { const f=r.pick([1e6, 3e6, 1e8]); const lam=3e8/f; return { prompt: String.raw`Vacuum: $f=${f}\\ \\text{Hz}$. Wavelength $\\lambda$? (use $c=3\\times10^8$).`, answers:[ans('l','\\lambda',lam,'m')], hints:['λ=c/f'], solution:String.raw`<p>$\\lambda=${fmt(lam)}\\ \\text{m}$</p>` }; } },
      { id: 'em-u2-mc', title: 'Concept check: spectrum', kind: 'mc',
        gen: mcPool([
          { q: 'If frequency rises and wave is in vacuum, wavelength…', correct: 'falls (c fixed)', wrong: ['rises', 'stays equal to c', 'becomes negative'], why: 'c=fλ.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('emwaves'), units);
