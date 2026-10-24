'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'newtonian', title: 'Newtonian Mechanics Core',
    blurb: 'Force, mass, acceleration, energy — classical tools before modern physics.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Newton's second law $\mathbf F = m\mathbf a$ reads “force equals mass times acceleration.” Net force, not any single push. Energy conservation and work $W=Fd\cos\theta$ (when force is constant) build the bridge to later topics.</p>
<div class="example"><h3>Worked example</h3>
<p>$m=2\\ \\text{kg}$, $a=3\\ \\text{m/s}^2$ along the force → $F=6\\ \\text{N}$.</p></div>
<ul class="takeaways"><li>$F=ma$ uses net force.</li><li>Weight $W=mg$ with $g\\approx9.81$.</li><li>Work and energy connect force to motion over distance.</li></ul>`,
    problems: [
      { id: 'phy-u1-fma', title: 'F = ma', kind: 'numeric',
        gen(r) { const m=r.step(1,10,0.5), a=r.step(1,6,0.5); return { prompt: String.raw`$m=${q(m,'kg')}$, $a=${q(a,'m/s^2')}$. Net force?`, answers:[ans('F','F',m*a,'N')], hints:['F=ma'], solution:String.raw`<p>$F=${q(m*a,'N')}$</p>` }; } },
      { id: 'phy-u1-weight', title: 'Weight from mass', kind: 'numeric',
        gen(r) { const m=r.step(2,40,1), W=m*9.81; return { prompt: String.raw`Mass $${q(m,'kg')}$. Weight on Earth ($g=9.81$)?`, answers:[ans('W','W',W,'N')], hints:['W=mg'], solution:String.raw`<p>$W=${q(W,'N')}$</p>` }; } },
      { id: 'phy-u1-mc', title: 'Concept check: Newton', kind: 'mc',
        gen: mcPool([
          { q: 'F in F=ma is…', correct: 'the net force', wrong: ['any single force ignoring others', 'always weight', 'power'], why: 'Sum of forces.' },
          { q: 'Mass vs weight…', correct: 'mass is kg; weight is a force (N)', wrong: ['identical units', 'weight is always in kg', 'mass changes on the Moon, weight does not'], why: 'Weight = mg.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'relativity-ideas', title: 'Toward Special Relativity',
    blurb: 'c as invariant, time dilation idea, and why Newtonian intuition fails at high speed.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Special relativity: speed of light $c$ is the same for all inertial observers. Moving clocks run slow by $\\gamma=1/\\sqrt{1-v^2/c^2}$ (read “gamma”). You do not need tensors yet — you need the shock that absolute time is gone.</p>
<ul class="takeaways"><li>$c$ invariant.</li><li>$\\gamma$ grows as $v\\to c$.</li><li>Low speed: $\\gamma\\approx1$, Newton works.</li></ul>`,
    problems: [
      { id: 'phy-u2-gamma-limit', title: 'Gamma at low speed', kind: 'mc',
        gen: mcPool([
          { q: 'When v ≪ c, γ is…', correct: 'approximately 1 (Newtonian limit)', wrong: ['infinite', 'zero', 'exactly 2 always'], why: 'Recovers classical physics.' },
          { q: 'Special relativity’s invariant speed is…', correct: 'the speed of light c', wrong: ['the speed of sound', 'escape velocity only', 'zero'], why: 'Postulate.' },
        ]) },
      { id: 'phy-u2-mc', title: 'Concept check: SR', kind: 'mc',
        gen: mcPool([
          { q: 'Time dilation says moving clocks…', correct: 'run slow as seen from the lab frame', wrong: ['run fast always', 'stop absolute time for everyone', 'ignore c'], why: 'Proper time vs coordinate time idea.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'quantum-ideas', title: 'Quantum Ideas (First Look)',
    blurb: 'Photons, E=hf, and wave–particle language without full formalism.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Light comes in packets: $E=hf$ (energy equals Planck's constant times frequency). Read $h$ as “h” and $f$ as frequency in hertz. Electrons show interference — waves — yet hit detectors as particles. Quantum mechanics is that tension made precise.</p>
<ul class="takeaways"><li>$E=hf$ for photons.</li><li>Quantization ≠ “random mysticism.”</li><li>Classical physics is the large-scale average.</li></ul>`,
    problems: [
      { id: 'phy-u3-mc', title: 'Concept check: quantum', kind: 'mc',
        gen: mcPool([
          { q: 'E = hf says a photon’s energy…', correct: 'is proportional to frequency', wrong: ['depends only on amplitude of a sound wave', 'is always zero', 'ignores Planck’s constant'], why: 'Higher frequency → higher energy packets.' },
          { q: 'Wave–particle duality means…', correct: 'quantum objects show both wave and particle aspects depending on experiment', wrong: ['electrons are tiny billiard balls only', 'light is only a fluid', 'Newton already included photons'], why: 'Core quantum lesson.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('physics'), units);
