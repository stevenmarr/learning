'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'charge-current-voltage', title: 'Charge, Current, Voltage & Ohm',
    blurb: 'What current and voltage really mean, Ohm\'s law, and reading circuit symbols.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Every electrical system — phone charger, farm pump controller, EV battery pack — is built from the same three ideas: <strong>charge</strong>, <strong>current</strong> (how fast charge moves), and <strong>voltage</strong> (the push). Master these and Ohm's law, and every later circuit topic is an application.</p>
<h2>1. Charge and current</h2>
<p>Charge is measured in <strong>coulombs</strong> (C). <strong>Current</strong> $I$ is the rate charge flows:</p>
$$I = \frac{\Delta Q}{\Delta t}$$
<p>Read “I equals delta-Q over delta-t.” The unit is the <strong>ampere</strong> (A): one coulomb per second. Engineers draw current arrows in the direction a <em>positive</em> charge would move (conventional current).</p>
<h2>2. Voltage</h2>
<p><strong>Voltage</strong> $V$ between two points is energy per unit charge (volt = joule/coulomb). A 9 V battery gives each coulomb 9 J. Voltage is always <em>between two points</em> relative to a chosen ground.</p>
<h2>3. Circuit symbols</h2>
<table class="tbl"><thead><tr><th>Part</th><th>Symbol idea</th><th>Role</th></tr></thead><tbody>
<tr><td>DC source</td><td>battery long/short lines</td><td>Fixed voltage push</td></tr>
<tr><td>Resistor</td><td>zigzag or rectangle</td><td>Opposes current; makes heat</td></tr>
<tr><td>Capacitor</td><td>two plates</td><td>Stores charge in an E-field</td></tr>
<tr><td>Ground</td><td>triangle / chassis</td><td>0 V reference</td></tr>
</tbody></table>
<h2>4. Ohm's law and power</h2>
$$V = IR, \qquad P = VI = I^2R = \frac{V^2}{R}$$
<p>$R$ is in ohms ($\Omega$). Double $V$ at fixed $R$ → double $I$.</p>
<div class="example"><h3>Worked example</h3>
<p>A $12\ \text{V}$ battery drives a $4\ \Omega$ heater. $I = 12/4 = 3\ \text{A}$, $P = 12\times3 = 36\ \text{W}$.</p></div>
<ul class="takeaways"><li>$I=\Delta Q/\Delta t$.</li><li>Voltage is always between two points.</li><li>$V=IR$; $P=VI=I^2R=V^2/R$.</li></ul>`,
    problems: [
      { id: 'cir-u1-current', title: 'Current from charge flow', kind: 'numeric',
        gen(r) {
          const Q = r.step(0.5, 20, 0.5), t = r.step(0.2, 5, 0.2), I = Q / t;
          return {
            prompt: String.raw`A wire carries $${q(Q, 'C')}$ of charge past a point in $${q(t, 's')}$. What is the average current?`,
            answers: [ans('I', 'I', I, 'A')],
            hints: [String.raw`Current is charge per time: $I = \Delta Q / \Delta t$.`],
            solution: String.raw`<ol class="steps"><li>$I = \Delta Q/\Delta t = ${fmt(Q)}/${fmt(t)} = ${q(I, 'A')}$</li></ol>`,
          };
        } },
      { id: 'cir-u1-ohm', title: "Ohm's law: find current", kind: 'numeric',
        gen(r) {
          const V = r.pick([5, 9, 12, 15, 24]), R = r.pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]), I = V / R;
          return {
            prompt: String.raw`A $${q(V, 'V')}$ source is across a $${q(R, '\\Omega')}$ resistor. Find the current.`,
            answers: [ans('I', 'I', I, 'A')],
            hints: [String.raw`$I = V/R$.`],
            solution: String.raw`<ol class="steps"><li>$I = V/R = ${fmt(V)}/${fmt(R)} = ${q(I, 'A')}$</li></ol>`,
          };
        } },
      { id: 'cir-u1-ohm-r', title: "Ohm's law: find resistance", kind: 'numeric',
        gen(r) {
          const V = r.step(3, 48, 1), I = r.step(0.1, 4, 0.1), R = V / I;
          return {
            prompt: String.raw`A resistor has $${q(V, 'V')}$ across it and $${q(I, 'A')}$ through it. What is $R$?`,
            answers: [ans('R', 'R', R, 'Ω')],
            hints: [String.raw`$R = V/I$.`],
            solution: String.raw`<ol class="steps"><li>$R = V/I = ${fmt(V)}/${fmt(I)} = ${q(R, '\\Omega')}$</li></ol>`,
          };
        } },
      { id: 'cir-u1-power', title: 'Resistor power', kind: 'numeric',
        gen(r) {
          const V = r.pick([5, 9, 12, 24]), R = r.pick([4, 6, 8, 10, 12, 16]), P = (V * V) / R;
          return {
            prompt: String.raw`A $${q(R, '\\Omega')}$ resistor has $${q(V, 'V')}$ across it. Power dissipated?`,
            answers: [ans('P', 'P', P, 'W')],
            hints: [String.raw`$P = V^2/R$.`],
            solution: String.raw`<ol class="steps"><li>$P = V^2/R = ${fmt(V)}^2/${fmt(R)} = ${q(P, 'W')}$</li></ol>`,
          };
        } },
      { id: 'cir-u1-mc', title: 'Concept check: V, I, R', kind: 'mc',
        gen: mcPool([
          { q: 'What does a volt measure?', correct: 'Energy per unit charge (J/C)', wrong: ['Charge per second', 'Force on an electron', 'Resistance of a wire'], why: 'Voltage is work per coulomb.' },
          { q: 'Conventional current is drawn in the direction…', correct: 'a positive charge would move', wrong: ['electrons actually move', 'from low V to high V', 'of the magnetic field'], why: 'Historical convention: arrows follow positive charge.' },
          { q: String.raw`If $V$ doubles across a fixed resistor, current…`, correct: 'doubles', wrong: ['halves', 'stays the same', 'quadruples'], why: String.raw`$I=V/R$.` },
        ]) },
    ],
  },
  {
    num: 2, slug: 'series-parallel', title: 'Series & Parallel Circuits',
    blurb: 'Equivalent resistance, voltage dividers, and current dividers.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Reduce a resistor network to one $R_\mathrm{eq}$ and the battery current falls out in one step. Then work outward for every voltage and current.</p>
<h2>Series</h2>
<p>Same current. Resistances add: $R_\mathrm{eq} = \sum R_i$. The $\sum$ (sigma) means “add them all.”</p>
<h2>Parallel</h2>
$$\frac{1}{R_\mathrm{eq}} = \sum\frac{1}{R_i}, \qquad\text{two:}\quad R_\mathrm{eq}=\frac{R_1R_2}{R_1+R_2}$$
<p>Parallel always makes $R_\mathrm{eq}$ smaller than the smallest branch.</p>
<h2>Voltage divider</h2>
$$V_2 = V_s\cdot\frac{R_2}{R_1+R_2}$$
<p>Bigger bottom resistor → larger share of $V_s$.</p>
<div class="example"><h3>Worked example</h3>
<p>$V_s=12\ \text{V}$, $R_1=3\ \text{k}\Omega$ top, $R_2=1\ \text{k}\Omega$ bottom → $V_2=3\ \text{V}$.</p></div>
<ul class="takeaways"><li>Series: same $I$, $R$ adds.</li><li>Parallel: same $V$, $1/R$ adds.</li><li>Divider: $V_2=V_s R_2/(R_1+R_2)$.</li></ul>`,
    problems: [
      { id: 'cir-u2-series', title: 'Series Req', kind: 'numeric',
        gen(r) {
          const a = r.int(100, 900), b = r.int(100, 900), c = r.next() < 0.5 ? r.int(100, 900) : 0;
          const vals = c ? [a, b, c] : [a, b], Req = vals.reduce((s, x) => s + x, 0);
          return {
            prompt: String.raw`Series resistors: ${vals.map((v) => `$${q(v, '\\Omega')}$`).join(', ')}. Find $R_\\mathrm{eq}$.`,
            answers: [ans('Req', 'R_\\mathrm{eq}', Req, 'Ω')],
            hints: ['Series resistances add.'],
            solution: String.raw`<ol class="steps"><li>$R_\\mathrm{eq}=${vals.map(fmt).join('+')}=${q(Req, '\\Omega')}$</li></ol>`,
          };
        } },
      { id: 'cir-u2-parallel2', title: 'Two in parallel', kind: 'numeric',
        gen(r) {
          const R1 = r.pick([2, 3, 4, 6, 8, 10, 12]), R2 = r.pick([2, 3, 4, 6, 8, 10, 12]);
          const Req = (R1 * R2) / (R1 + R2);
          return {
            prompt: String.raw`$${q(R1, '\\Omega')}$ || $${q(R2, '\\Omega')}$. Find $R_\\mathrm{eq}$.`,
            answers: [ans('Req', 'R_\\mathrm{eq}', Req, 'Ω')],
            hints: [String.raw`$R_\\mathrm{eq}=R_1R_2/(R_1+R_2)$.`],
            solution: String.raw`<ol class="steps"><li>$R_\\mathrm{eq}=\\frac{${fmt(R1)}\\cdot${fmt(R2)}}{${fmt(R1)}+${fmt(R2)}}=${q(Req, '\\Omega')}$</li></ol>`,
          };
        } },
      { id: 'cir-u2-divider', title: 'Voltage divider', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([5, 9, 10, 12, 15, 24]), R1 = r.pick([1, 2, 3, 4, 5, 6, 8, 10]), R2 = r.pick([1, 2, 3, 4, 5, 6, 8, 10]);
          const V2 = Vs * R2 / (R1 + R2);
          return {
            prompt: String.raw`Divider: $V_s=${q(Vs, 'V')}$, top $R_1=${q(R1, 'k\\Omega')}$, bottom $R_2=${q(R2, 'k\\Omega')}$. Find $V_2$.`,
            answers: [ans('V2', 'V_2', V2, 'V')],
            hints: [String.raw`$V_2=V_s R_2/(R_1+R_2)$.`],
            solution: String.raw`<ol class="steps"><li>$V_2=${fmt(Vs)}\\cdot\\frac{${fmt(R2)}}{${fmt(R1)}+${fmt(R2)}}=${q(V2, 'V')}$</li></ol>`,
          };
        } },
      { id: 'cir-u2-mixed', title: 'Series-parallel Req', kind: 'numeric',
        gen(r) {
          const R1 = r.pick([4, 6, 8, 10]), R2 = r.pick([4, 6, 8, 12]), R3 = r.pick([4, 6, 8, 12]);
          const Rp = (R2 * R3) / (R2 + R3), Req = R1 + Rp;
          return {
            prompt: String.raw`$R_1=${q(R1, '\\Omega')}$ in series with ($R_2=${q(R2, '\\Omega')}$ || $R_3=${q(R3, '\\Omega')}$). Find $R_\\mathrm{eq}$.`,
            answers: [ans('Req', 'R_\\mathrm{eq}', Req, 'Ω')],
            hints: ['Parallel first, then add series.'],
            solution: String.raw`<ol class="steps"><li>$R_p=${fmt(Rp)}\\ \\Omega$</li><li>$R_\\mathrm{eq}=${fmt(R1)}+${fmt(Rp)}=${q(Req, '\\Omega')}$</li></ol>`,
          };
        } },
      { id: 'cir-u2-mc', title: 'Concept check: series/parallel', kind: 'mc',
        gen: mcPool([
          { q: 'Two 10 Ω in parallel equal…', correct: '5 Ω', wrong: ['20 Ω', '10 Ω', '100 Ω'], why: 'Equal parallels: R/2.' },
          { q: 'In series, every resistor has the same…', correct: 'current', wrong: ['voltage', 'power', 'resistance'], why: 'One path → one current.' },
          { q: 'Adding a resistor in parallel…', correct: 'always decreases Req', wrong: ['always increases Req', 'leaves Req unchanged', 'may go either way'], why: 'More paths → smaller Req.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'kirchhoff', title: "Kirchhoff's Laws (KCL & KVL)",
    blurb: 'Node currents and loop voltages — systematic DC analysis.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>When series/parallel reduction fails (bridges, multiple sources), <strong>KCL</strong> and <strong>KVL</strong> still work. They are conservation laws: charge at a node, energy around a loop.</p>
<h2>KCL</h2>
$$\sum I_\mathrm{in}=\sum I_\mathrm{out}\quad\text{or}\quad\sum I=0$$
<h2>KVL</h2>
$$\sum V=0$$
<p>around any closed loop with a consistent sign walk.</p>
<div class="example"><h3>Worked example</h3>
<p>$24\ \text{V}$ with $3\ \Omega$ and $5\ \Omega$ series: $24-3I-5I=0$ ⇒ $I=3\ \text{A}$; drops $9\ \text{V}$ and $15\ \text{V}$.</p></div>
<ul class="takeaways"><li>KCL: charge conservation.</li><li>KVL: energy conservation.</li><li>Negative current means “opposite your arrow.”</li></ul>`,
    problems: [
      { id: 'cir-u3-kcl', title: 'KCL at a node', kind: 'numeric',
        gen(r) {
          const I1 = r.step(1, 8, 0.5), I2 = r.step(1, 8, 0.5), I3 = r.step(0.5, 5, 0.5), Ix = I1 + I2 - I3;
          return {
            prompt: String.raw`Currents $${q(I1, 'A')}$ and $${q(I2, 'A')}$ enter a node; $${q(I3, 'A')}$ leaves. Find the other leaving current $I_x$.`,
            answers: [ans('Ix', 'I_x', Ix, 'A')],
            hints: [String.raw`$\sum I_\mathrm{in}=\sum I_\mathrm{out}$.`],
            solution: String.raw`<ol class="steps"><li>$I_x=${fmt(I1)}+${fmt(I2)}-${fmt(I3)}=${q(Ix, 'A')}$</li></ol>`,
          };
        } },
      { id: 'cir-u3-kvl-loop', title: 'Single-loop KVL', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([9, 12, 15, 18, 24]), R1 = r.pick([2, 3, 4, 5]), R2 = r.pick([2, 3, 4, 6]), I = Vs / (R1 + R2);
          return {
            prompt: String.raw`Loop: battery $${q(Vs, 'V')}$, series $${q(R1, '\\Omega')}$ and $${q(R2, '\\Omega')}$. Find $I$.`,
            answers: [ans('I', 'I', I, 'A')],
            hints: [String.raw`$V_s-(R_1+R_2)I=0$.`],
            solution: String.raw`<ol class="steps"><li>$I=${fmt(Vs)}/(${fmt(R1)}+${fmt(R2)})=${q(I, 'A')}$</li></ol>`,
          };
        } },
      { id: 'cir-u3-drop', title: 'Series voltage drop', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([12, 15, 24]), R1 = r.pick([1, 2, 3, 4]), R2 = r.pick([2, 3, 4, 5]), R3 = r.pick([1, 2, 3]);
          const I = Vs / (R1 + R2 + R3), V2 = I * R2;
          return {
            prompt: String.raw`Series: $V_s=${q(Vs, 'V')}$, $R_1=${q(R1, '\\Omega')}$, $R_2=${q(R2, '\\Omega')}$, $R_3=${q(R3, '\\Omega')}$. Find voltage across $R_2$.`,
            answers: [ans('V2', 'V_2', V2, 'V')],
            hints: ['Find $I$, then $V_2=IR_2$.'],
            solution: String.raw`<ol class="steps"><li>$I=${fmt(I)}\\ \\text{A}$</li><li>$V_2=${q(V2, 'V')}$</li></ol>`,
          };
        } },
      { id: 'cir-u3-mc', title: 'Concept check: KCL/KVL', kind: 'mc',
        gen: mcPool([
          { q: 'KCL is conservation of…', correct: 'charge', wrong: ['energy', 'momentum', 'flux'], why: 'Charge in = charge out at a node.' },
          { q: 'KVL is conservation of…', correct: 'energy', wrong: ['charge', 'mass', 'power only'], why: 'Net energy per charge around a loop is zero.' },
          { q: 'A result of −2 A means…', correct: '2 A opposite your assumed arrow', wrong: ['impossible circuit', 'discard the sign', 'AC only'], why: 'Sign flips the direction; magnitude is fine.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'rc-first-order', title: 'Capacitors & First-Order RC',
    blurb: 'Capacitance, time constants, and charging/discharging exponentials.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Add a capacitor and the circuit has memory. The key parameter is the <strong>time constant</strong> $\tau=RC$.</p>
<h2>Capacitance</h2>
$$Q=CV, \qquad i=C\frac{dv}{dt}, \qquad E=\tfrac12 CV^2$$
<h2>RC transients</h2>
<p>Charging from 0 toward $V_s$: $v(t)=V_s(1-e^{-t/\tau})$. Discharging from $V_0$: $v(t)=V_0 e^{-t/\tau}$.</p>
<p>After one $\tau$, charging reaches ~63% of final; after $5\tau$, ~99%.</p>
<div class="tip"><strong>Reading $e^{-t/\tau}$.</strong> $e\approx2.718$. The exponent “minus t over tau” is dimensionless. At $t=\tau$, $e^{-1}\approx0.368$.</div>
<div class="example"><h3>Worked example</h3>
<p>$R=10\ \text{k}\Omega$, $C=100\ \mu\text{F}$ → $\tau=1\ \text{s}$. Charging to $12\ \text{V}$: $v(0.5)=12(1-e^{-0.5})\approx4.72\ \text{V}$.</p></div>
<ul class="takeaways"><li>$i=C\,dv/dt$; capacitor voltage cannot jump with finite current.</li><li>$\tau=RC$.</li><li>Charge $V_s(1-e^{-t/\tau})$; discharge $V_0 e^{-t/\tau}$.</li></ul>`,
    problems: [
      { id: 'cir-u4-tau', title: 'RC time constant', kind: 'numeric',
        gen(r) {
          const Rk = r.pick([1, 2, 4.7, 10, 22, 47]), Cu = r.pick([1, 10, 22, 47, 100, 220]);
          const tau = (Rk * 1e3) * (Cu * 1e-6);
          return {
            prompt: String.raw`$\tau=RC$ for $R=${q(Rk, 'k\\Omega')}$, $C=${q(Cu, '\\mu\\text{F}')}$.`,
            answers: [ans('tau', '\\tau', tau, 's')],
            hints: [String.raw`$1\\ \\text{k}\\Omega=10^3\\ \\Omega$, $1\\ \\mu\\text{F}=10^{-6}\\ \\text{F}$.`],
            solution: String.raw`<ol class="steps"><li>$\\tau=(${fmt(Rk)}\\times10^3)(${fmt(Cu)}\\times10^{-6})=${q(tau, 's')}$</li></ol>`,
          };
        } },
      { id: 'cir-u4-charge', title: 'Charging voltage', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([5, 9, 12, 15]), tau = r.pick([0.5, 1, 2]), t = tau * r.pick([0.5, 1, 2]);
          const v = Vs * (1 - Math.exp(-t / tau));
          return {
            prompt: String.raw`Charge from 0 toward $${q(Vs, 'V')}$, $\\tau=${q(tau, 's')}$. Find $v(${fmt(t)}\\ \\text{s})$.`,
            answers: [ans('v', 'v', v, 'V')],
            hints: [String.raw`$v=V_s(1-e^{-t/\\tau})$.`],
            solution: String.raw`<ol class="steps"><li>$v=${fmt(Vs)}(1-e^{-${fmt(t)}/${fmt(tau)}})=${q(v, 'V')}$</li></ol>`,
          };
        } },
      { id: 'cir-u4-discharge', title: 'Discharge voltage', kind: 'numeric',
        gen(r) {
          const V0 = r.pick([5, 9, 12, 20]), tau = r.pick([1, 2, 4]), t = tau;
          const v = V0 * Math.exp(-t / tau);
          return {
            prompt: String.raw`Discharge from $${q(V0, 'V')}$ with $\\tau=${q(tau, 's')}$. Find $v$ at $t=${q(t, 's')}$.`,
            answers: [ans('v', 'v', v, 'V')],
            hints: [String.raw`$v=V_0 e^{-t/\\tau}$. At $t=\\tau$, ~$0.368 V_0$.`],
            solution: String.raw`<ol class="steps"><li>$v=${fmt(V0)}e^{-1}\\approx${q(v, 'V')}$</li></ol>`,
          };
        } },
      { id: 'cir-u4-mc', title: 'Concept check: RC', kind: 'mc',
        gen: mcPool([
          { q: 'After ~5τ of charging, a capacitor is…', correct: 'essentially at final voltage (~99%)', wrong: ['at 50%', 'still near zero', 'oscillating'], why: '1−e^{-5}≈99.3%.' },
          { q: 'Capacitor voltage…', correct: 'cannot jump with finite current', wrong: ['equals resistor voltage always', 'proportional to di/dt', 'is always zero in DC'], why: 'i=C dv/dt.' },
          { q: 'Doubling R and C…', correct: 'quadruples τ', wrong: ['doubles τ', 'no change', 'halves τ'], why: 'τ=RC.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('circuits'), units);
