'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool, G } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'kinematics', title: 'Kinematics in One Dimension',
    blurb: 'Position, velocity, acceleration, and the constant-acceleration equations — the language of motion.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Before forces, describe motion cleanly. <strong>Position</strong> $x$, <strong>velocity</strong> $v=dx/dt$, <strong>acceleration</strong> $a=dv/dt$. Read $dx/dt$ as “dee-x dee-tee” — how $x$ changes with time. With constant $a$:</p>
$$v = v_0 + at, \qquad x = x_0 + v_0 t + \tfrac12 at^2, \qquad v^2 = v_0^2 + 2a(x-x_0)$$
<p>Signs matter: pick a positive direction and stick to it. Free fall near Earth uses $a=-g$ if up is positive ($g=9.81\ \mathrm{m/s}^2$).</p>
<div class="example"><h3>Worked example</h3>
<p>A bike starts at rest and accelerates at $2\ \mathrm{m/s}^2$ for $5\ \mathrm{s}$. Final speed: $v=0+2\cdot5=10\ \mathrm{m/s}$. Distance: $x=\tfrac12(2)(25)=25\ \mathrm{m}$.</p></div>
<div class="tip"><strong>Sanity check:</strong> If $a$ and $v_0$ have opposite signs, the object is slowing down (in that 1D sense).</div>
<ul class="takeaways"><li>Pick a positive axis; keep signs consistent.</li><li>Constant-$a$ trio: $v$, $x$, $v^2$ equations.</li><li>$g\approx9.81$ downward for free fall.</li></ul>`,
    problems: [
      { id: 'phy-u1-vf', title: 'Final velocity', kind: 'numeric',
        gen(r) {
          const v0 = r.step(0, 10, 1), a = r.step(1, 4, 0.5), t = r.step(2, 8, 1);
          return { prompt: String.raw`$v_0=${q(v0,'m/s')}$, $a=${q(a,'m/s^2')}$, $t=${q(t,'s')}$. Find $v$.`, answers: [ans('v', 'v', v0 + a * t, 'm/s')], hints: [String.raw`$v=v_0+at$.`], solution: String.raw`<p>$v=${fmt(v0+a*t)}\ \\text{m/s}$</p>` };
        } },
      { id: 'phy-u1-x', title: 'Displacement under constant a', kind: 'numeric',
        gen(r) {
          const v0 = r.step(0, 8, 1), a = r.step(1, 3, 0.5), t = r.step(2, 6, 1);
          const x = v0 * t + 0.5 * a * t * t;
          return { prompt: String.raw`From rest-ish: $v_0=${q(v0,'m/s')}$, $a=${q(a,'m/s^2')}$, $t=${q(t,'s')}$. Displacement $x$? (use $x=v_0t+\\frac12 at^2$).`, answers: [ans('x', 'x', x, 'm')], hints: [String.raw`$x=v_0 t + \\frac12 a t^2$.`], solution: String.raw`<p>$x=${fmt(x)}\\ \\text{m}$</p>` };
        } },
      { id: 'phy-u1-v2', title: 'Speed from distance', kind: 'numeric',
        gen(r) {
          const v0 = r.pick([0, 2, 4]), a = r.pick([2, 3, 4]), dx = r.pick([8, 9, 18, 32]);
          const v2 = v0 * v0 + 2 * a * dx;
          return { prompt: String.raw`$v_0=${q(v0,'m/s')}$, $a=${q(a,'m/s^2')}$, $\\Delta x=${q(dx,'m')}$. Find $v^2$ (enter $v^2$ numerically).`, answers: [ans('v2', 'v^2', v2, 'm²/s²')], hints: [String.raw`$v^2=v_0^2+2a\\Delta x$.`], solution: String.raw`<p>$v^2=${fmt(v2)}$</p>` };
        } },
      { id: 'phy-u1-fall', title: 'Free-fall time', kind: 'numeric',
        gen(r) {
          const h = r.pick([5, 10, 20, 45]);
          const t = Math.sqrt(2 * h / G);
          return { prompt: String.raw`Dropped from rest through $${q(h,'m')}$. Time to fall? Use $g=9.81$, $h=\\frac12 gt^2$.`, answers: [ans('t', 't', t, 's')], hints: [String.raw`$t=\\sqrt{2h/g}$.`], solution: String.raw`<p>$t=${fmt(t)}\\ \\text{s}$</p>` };
        } },
      { id: 'phy-u1-mc', title: 'Concept check: kinematics', kind: 'mc',
        gen: mcPool([
          { q: 'Acceleration is…', correct: 'the rate of change of velocity', wrong: ['the same as velocity always', 'only speed', 'position squared'], why: 'a = dv/dt.' },
          { q: 'If up is positive, free-fall a is…', correct: 'about −9.81 m/s²', wrong: ['+9.81 always', 'zero', '+1 m/s²'], why: 'Gravity pulls down.' },
          { q: 'Constant-a equations fail when…', correct: 'acceleration is not constant', wrong: ['mass is large', 'you use SI units', 'time is positive'], why: 'Derivation assumes constant a.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'newton-laws', title: "Newton's Laws & Force Diagrams",
    blurb: 'Inertia, F=ma with net force, action–reaction — free-body diagrams that match statics habits.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Law 1:</strong> If net force is zero, velocity is constant (including zero). <strong>Law 2:</strong> $\sum\mathbf F = m\mathbf a$ — net force, not “the biggest force.” <strong>Law 3:</strong> Forces come in equal-and-opposite pairs on <em>different</em> bodies.</p>
<p>Draw a <strong>free-body diagram</strong> (FBD): one object, every force on it as an arrow. Weight $W=mg$ downward; normal force perpendicular to a surface; tension along a rope.</p>
<div class="example"><h3>Worked example</h3>
<p>A $5\ \mathrm{kg}$ crate on ice (frictionless) pulled by $10\ \mathrm{N}$ horizontal: $a=F/m=2\ \mathrm{m/s}^2$.</p></div>
<ul class="takeaways"><li>Net force → acceleration.</li><li>FBDs first, algebra second.</li><li>3rd-law pairs never cancel on the same FBD.</li></ul>`,
    problems: [
      { id: 'phy-u2-a', title: 'a from net force', kind: 'numeric',
        gen(r) {
          const m = r.step(2, 10, 1), F = r.step(6, 40, 2);
          return { prompt: String.raw`Net force $${q(F,'N')}$ on mass $${q(m,'kg')}$. Acceleration?`, answers: [ans('a', 'a', F / m, 'm/s²')], hints: [String.raw`$a=F/m$.`], solution: String.raw`<p>$a=${fmt(F/m)}$</p>` };
        } },
      { id: 'phy-u2-weight', title: 'Weight', kind: 'numeric',
        gen(r) {
          const m = r.step(3, 80, 1);
          return { prompt: String.raw`Mass $${q(m,'kg')}$. Weight on Earth ($g=9.81$)?`, answers: [ans('W', 'W', m * G, 'N')], hints: ['W=mg'], solution: String.raw`<p>$W=${fmt(m*G)}$</p>` };
        } },
      { id: 'phy-u2-net', title: 'Net force two pulls', kind: 'numeric',
        gen(r) {
          const F1 = r.int(5, 20), F2 = r.int(1, 10), m = r.int(2, 5);
          const a = (F1 - F2) / m;
          return { prompt: String.raw`Rightward $${q(F1,'N')}$, leftward $${q(F2,'N')}$, $m=${q(m,'kg')}$. Acceleration to the right?`, answers: [ans('a', 'a', a, 'm/s²')], hints: ['Net = F1−F2, then /m.'], solution: String.raw`<p>$a=${fmt(a)}$</p>` };
        } },
      { id: 'phy-u2-mc', title: 'Concept check: Newton', kind: 'mc',
        gen: mcPool([
          { q: 'In ΣF = ma, F is…', correct: 'the vector sum of forces on that object', wrong: ['any one force', 'only gravity', 'force on the other object in a 3rd-law pair'], why: 'Net force on the free-body.' },
          { q: 'Action–reaction pairs…', correct: 'act on two different objects', wrong: ['cancel on the same FBD always', 'have different magnitudes', 'only exist for gravity'], why: 'Law 3.' },
          { q: 'Zero net force means…', correct: 'constant velocity (maybe zero)', wrong: ['zero mass', 'infinite acceleration', 'no forces exist in the universe'], why: 'Law 1.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'energy-momentum', title: 'Work, Energy & Momentum',
    blurb: 'Work–energy theorem, kinetic and potential energy, and conservation of momentum in 1D collisions.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Work</strong> by a constant force: $W=F\\Delta x\\cos\\theta$. Kinetic energy $K=\\tfrac12 mv^2$. Work–energy: net work equals $\\Delta K$. Gravitational PE near Earth: $U=mgh$ (with a chosen zero of height).</p>
<p><strong>Momentum</strong> $\\mathbf p = m\\mathbf v$. If external impulse is negligible, total momentum is conserved in a collision. Elastic vs inelastic: kinetic energy conserved only in the elastic idealization.</p>
<div class="example"><h3>Worked example</h3>
<p>$m=2\\ \\mathrm{kg}$, $v=3\\ \\mathrm{m/s}$ → $K=\\tfrac12(2)(9)=9\\ \\mathrm{J}$. A $4\\ \\mathrm{kg}$ cart at $2\\ \\mathrm{m/s}$ hits and sticks to $2\\ \\mathrm{kg}$ at rest: $p_i=8$, $v_f=8/6\\approx1.33\\ \\mathrm{m/s}$.</p></div>
<ul class="takeaways"><li>$W_\\mathrm{net}=\\Delta K$.</li><li>$U=mgh$ needs a height zero.</li><li>Momentum conserved when external impulse ≈ 0.</li></ul>`,
    problems: [
      { id: 'phy-u3-K', title: 'Kinetic energy', kind: 'numeric',
        gen(r) {
          const m = r.step(1, 5, 0.5), v = r.step(2, 10, 1);
          return { prompt: String.raw`$m=${q(m,'kg')}$, $v=${q(v,'m/s')}$. Kinetic energy?`, answers: [ans('K', 'K', 0.5 * m * v * v, 'J')], hints: [String.raw`$K=\\frac12 mv^2$.`], solution: String.raw`<p>$K=${fmt(0.5*m*v*v)}$</p>` };
        } },
      { id: 'phy-u3-W', title: 'Work by constant force', kind: 'numeric',
        gen(r) {
          const F = r.int(5, 20), dx = r.int(2, 10);
          return { prompt: String.raw`Force $${q(F,'N')}$ along displacement $${q(dx,'m')}$ ($\\theta=0$). Work?`, answers: [ans('W', 'W', F * dx, 'J')], hints: ['W=F Δx when aligned.'], solution: String.raw`<p>$W=${F*dx}$</p>` };
        } },
      { id: 'phy-u3-p', title: '1D inelastic stick', kind: 'numeric',
        gen(r) {
          const m1 = r.pick([2, 3, 4]), v1 = r.pick([3, 4, 6]), m2 = r.pick([1, 2, 3]);
          const vf = (m1 * v1) / (m1 + m2);
          return { prompt: String.raw`$m_1=${q(m1,'kg')}$ at $${q(v1,'m/s')}$ sticks to $m_2=${q(m2,'kg')}$ at rest. Final speed?`, answers: [ans('vf', 'v_f', vf, 'm/s')], hints: ['Momentum: m1 v1 = (m1+m2) vf.'], solution: String.raw`<p>$v_f=${fmt(vf)}$</p>` };
        } },
      { id: 'phy-u3-mc', title: 'Concept check: energy/momentum', kind: 'mc',
        gen: mcPool([
          { q: 'Work–energy theorem links…', correct: 'net work to change in kinetic energy', wrong: ['mass to charge', 'momentum to temperature only', 'only potential to time'], why: 'W_net = ΔK.' },
          { q: 'In a perfectly inelastic collision…', correct: 'objects stick; momentum conserved if isolated', wrong: ['kinetic energy always conserved', 'momentum never conserved', 'mass disappears'], why: 'Stick → KE not conserved; p can be.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'special-relativity', title: 'Special Relativity',
    blurb: 'Invariant c, Lorentz factor γ, time dilation and length contraction — and the Newtonian limit.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Einstein’s special relativity: the speed of light $c$ is the same for all inertial observers. Define</p>
$$\\gamma = \\frac{1}{\\sqrt{1-v^2/c^2}}$$
<p>Read “gamma.” Moving clocks run slow: $\\Delta t = \\gamma \\Delta t_0$ (lab time vs proper time $\\Delta t_0$ on the moving clock). Lengths parallel to motion contract: $L = L_0/\\gamma$.</p>
<p>When $v\\ll c$, $\\gamma\\approx 1$ and Newton works. Energy: $E=\\gamma mc^2$; rest energy $E_0=mc^2$.</p>
<div class="example"><h3>Worked example</h3>
<p>At $v=0.6c$, $v^2/c^2=0.36$, $\\gamma=1/\\sqrt{0.64}=1.25$. A 1 µs proper tick looks like 1.25 µs in the lab.</p></div>
<ul class="takeaways"><li>$c$ invariant; $\\gamma\\ge 1$.</li><li>Time dilation / length contraction.</li><li>Low speed → Newton.</li></ul>`,
    problems: [
      { id: 'phy-u4-gamma', title: 'Compute γ', kind: 'numeric',
        gen(r) {
          const frac = r.pick([0.6, 0.8, 0.5]);
          const g = 1 / Math.sqrt(1 - frac * frac);
          return { prompt: String.raw`Speed $v=${frac}c$. Find $\\gamma$.`, answers: [ans('g', '\\gamma', g, '')], hints: [String.raw`$\\gamma=1/\\sqrt{1-v^2/c^2}$.`], solution: String.raw`<p>$\\gamma=${fmt(g)}$</p>` };
        } },
      { id: 'phy-u4-dilate', title: 'Time dilation', kind: 'numeric',
        gen(r) {
          const t0 = r.pick([1, 2, 4]), frac = 0.6, g = 1.25, t = g * t0;
          return { prompt: String.raw`Proper time $\\Delta t_0=${q(t0,'\\mu s')}$ at $v=0.6c$ ($\\gamma=1.25$). Lab time $\\Delta t$?`, answers: [ans('t', '\\Delta t', t, 'µs')], hints: ['Δt = γ Δt0'], solution: String.raw`<p>$\\Delta t=${fmt(t)}$</p>` };
        } },
      { id: 'phy-u4-mc', title: 'Concept check: SR', kind: 'mc',
        gen: mcPool([
          { q: 'As v → c, γ…', correct: 'grows without bound', wrong: ['goes to 0', 'stays 1', 'becomes negative'], why: 'Denominator → 0.' },
          { q: 'Proper time is…', correct: 'time in the clock’s rest frame (between two colocated events)', wrong: ['always the longest possible for those events in SR', 'independent of path in all cases without care', 'measured only by GPS'], why: 'Δt0 on the traveling clock.' },
          { q: 'Newtonian physics is recovered when…', correct: 'v ≪ c so γ ≈ 1', wrong: ['v = c', 'mass is zero', 'time stops'], why: 'Low-speed limit.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'general-relativity-ideas', title: 'General Relativity — Ideas',
    blurb: 'Gravity as spacetime curvature, equivalence principle, and why GPS needs relativity — conceptual, not tensor calculus.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>General relativity (GR): gravity is not a force in Newton’s sense but <strong>curvature of spacetime</strong> caused by energy and mass. Freely falling observers feel weightless — the <strong>equivalence principle</strong> (gravity ≈ acceleration locally).</p>
<p>Light bends near the Sun; clocks run slower deeper in a gravity well (gravitational time dilation). GPS satellites correct for both special and general relativistic clock rates — engineering, not sci-fi.</p>
<div class="tip"><strong>Scope:</strong> This unit builds intuition. Full GR uses differential geometry; you are not expected to manipulate Einstein’s field equations here.</div>
<ul class="takeaways"><li>Equivalence: free fall ↔ no gravity locally.</li><li>Mass–energy curves spacetime; matter follows geodesics.</li><li>Real tech (GPS) uses relativistic corrections.</li></ul>`,
    problems: [
      { id: 'phy-u5-mc', title: 'Concept check: GR ideas', kind: 'mc',
        gen: mcPool([
          { q: 'Equivalence principle (weak form) links…', correct: 'gravity and acceleration locally', wrong: ['charge and mass always', 'temperature and color only', 'sound and light speed'], why: 'Free fall feels like zero g.' },
          { q: 'In GR, planets orbit because…', correct: 'they follow curved spacetime geodesics', wrong: ['a mysterious pull that needs no geometry', 'electric charge of the Sun', 'air currents in space'], why: 'Geometry of spacetime.' },
          { q: 'GPS clocks…', correct: 'need relativistic corrections to stay accurate', wrong: ['ignore all relativity', 'only use quantum chromodynamics', 'run on steam'], why: 'Engineering application.' },
          { q: 'Gravitational time dilation says clocks…', correct: 'run slower deeper in a gravity well (as seen from farther out)', wrong: ['always run faster near mass', 'are unaffected by gravity', 'only tick on Earth'], why: 'Potential affects rates.' },
        ]) },
      { id: 'phy-u5-order', title: 'Scale of effects', kind: 'mc',
        gen: mcPool([
          { q: 'Everyday Earth speeds (cars) need GR for…', correct: 'essentially nothing in casual life — Newton suffices', wrong: ['every stopwatch reading by eye', 'baking recipes', 'counting goats'], why: 'Effects tiny unless precision systems.' },
          { q: 'Light bending by the Sun was a classic test of…', correct: 'general relativity', wrong: ['Ohm’s law', 'Boyle’s law', 'Boolean algebra'], why: '1919 eclipse fame.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'quantum-photons', title: 'Quantum: Photons & Spectra',
    blurb: 'E=hf, photoelectric effect idea, emission spectra — particles of light with wave frequency.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Light delivers energy in packets: <strong>photons</strong> with $E=hf=hc/\\lambda$. Read $h$ as Planck’s constant ($6.626\\times10^{-34}\\ \\mathrm{J\\cdot s}$), $f$ frequency, $\\lambda$ wavelength. Higher frequency (bluer light) means more energy per photon — not “brighter,” which is more photons.</p>
<p><strong>Photoelectric effect (idea):</strong> electrons ejected from a metal only if $f$ exceeds a threshold; brightness changes the number of electrons, not the energy-per-electron threshold story. That forced Einstein’s photon picture.</p>
<div class="example"><h3>Worked example</h3>
<p>Red light $\\lambda\\approx650\\ \\mathrm{nm}$: $E=hc/\\lambda$ is smaller per photon than blue $\\lambda\\approx450\\ \\mathrm{nm}$.</p></div>
<ul class="takeaways"><li>$E=hf$; $c=f\\lambda$.</li><li>Photon energy ≠ intensity.</li><li>Spectra fingerprint atoms.</li></ul>`,
    problems: [
      { id: 'phy-u6-cfl', title: 'Frequency from wavelength', kind: 'numeric',
        gen(r) {
          const lam_nm = r.pick([400, 500, 600, 700]);
          const f = 3e8 / (lam_nm * 1e-9);
          return { prompt: String.raw`$\\lambda=${lam_nm}\\ \\text{nm}$ in vacuum. Frequency $f$? (use $c=3\\times10^8$).`, answers: [ans('f', 'f', f, 'Hz')], hints: ['f=c/λ with λ in meters.'], solution: String.raw`<p>$f=${fmt(f)}$</p>` };
        } },
      { id: 'phy-u6-ratio', title: 'Photon energy ratio', kind: 'numeric',
        gen(r) {
          const l1 = 400, l2 = 800;
          return { prompt: String.raw`Ratio $E(400\\ \\text{nm})/E(800\\ \\text{nm})$ for photons?`, answers: [ans('r', 'R', 2, '')], hints: ['E ∝ 1/λ.'], solution: String.raw`<p>$R=2$</p>` };
        } },
      { id: 'phy-u6-mc', title: 'Concept check: photons', kind: 'mc',
        gen: mcPool([
          { q: 'Doubling intensity at fixed color…', correct: 'roughly doubles photon arrival rate, not energy per photon', wrong: ['doubles each photon’s energy', 'halves c', 'stops the photoelectric effect always'], why: 'Brightness = rate.' },
          { q: 'E = hf says…', correct: 'photon energy proportional to frequency', wrong: ['energy proportional only to mass', 'frequency equals energy in joules with no h', 'wavelength equals h'], why: 'Planck relation.' },
          { q: 'A threshold frequency in photoelectric effect means…', correct: 'below it, electrons are not ejected (ideally), regardless of brightness', wrong: ['brightness never matters for current above threshold', 'c changes', 'metals become insulators for sound'], why: 'Energy-per-photon gate.' },
        ]) },
    ],
  },
  {
    num: 7, slug: 'quantum-waves', title: 'Quantum: Waves, Uncertainty & Atoms',
    blurb: 'Matter waves, uncertainty as a limit on definite pairs, and discrete atomic energy levels — intuition first.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Electrons show interference — they have <strong>wave aspects</strong> (de Broglie $\\lambda=h/p$). Bound electrons in atoms sit in <strong>discrete energy levels</strong>; jumps emit or absorb photons with $E=hf$.</p>
<p><strong>Uncertainty (Heisenberg idea):</strong> you cannot paste arbitrary precision on certain pairs (e.g. position and momentum) simultaneously. It is not “measurement clumsiness” alone; it is built into quantum states.</p>
<div class="tip"><strong>Tone:</strong> Serious engineering path — quantum is how semiconductors and lasers work, not mysticism.</div>
<ul class="takeaways"><li>Matter waves: λ = h/p.</li><li>Atomic spectra ↔ level differences.</li><li>Uncertainty limits conjugate pairs.</li></ul>`,
    problems: [
      { id: 'phy-u7-mc', title: 'Concept check: quantum waves', kind: 'mc',
        gen: mcPool([
          { q: 'de Broglie wavelength is smaller when…', correct: 'momentum p is larger (λ = h/p)', wrong: ['mass is ignored always and p is zero', 'h is zero', 'only for photons with no p'], why: 'Inverse to p.' },
          { q: 'Discrete atomic emission lines mean…', correct: 'only certain ΔE jumps are allowed', wrong: ['atoms emit all frequencies equally always', 'electrons have no energy', 'c is quantized in vacuum only'], why: 'Level structure.' },
          { q: 'Uncertainty principle is best heard as…', correct: 'a limit on simultaneous definite values of certain pairs of properties', wrong: ['proof that science is impossible', 'only about thermometer error', 'Newton’s third law'], why: 'Quantum states.' },
          { q: 'Classical physics remains useful because…', correct: 'it approximates the large-scale / high-action average of quantum behavior', wrong: ['quantum is false', 'atoms do not exist', 'relativity repealed Newton for cars'], why: 'Correspondence.' },
        ]) },
      { id: 'phy-u7-order', title: 'Which theory when', kind: 'mc',
        gen: mcPool([
          { q: 'Designing a goat-pen gate hinge — use…', correct: 'Newtonian mechanics', wrong: ['full GR field equations first', 'photoelectric thresholds only', 'Boolean XOR only'], why: 'Right tool.' },
          { q: 'Explaining a laser’s photon energy — use…', correct: 'quantum / E = hf ideas', wrong: ['only statics trusses', 'only FAMACHA', 'only Ohm’s law'], why: 'Photon energy.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('physics'), units);
