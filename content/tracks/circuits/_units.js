'use strict';
const { fmt, q, qty, ans, mcPool } = require('../../helpers');

module.exports = [
  {
    num: 1, slug: 'charge-current-voltage', title: 'Charge, Current, Voltage & Ohm',
    blurb: 'Build Ohm’s law from charge, current, and voltage — with language you can say out loud.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Say what current, voltage, and resistance mean in plain words.</li>
<li>Use $V=IR$ and $P=VI=I^2R=V^2/R$ with matching units.</li>
<li>Catch common mistakes (swapping $V$ and $I$, dropping units).</li>
</ul>
<h2>Hook</h2>
<p>A phone charger, a barn light, and a truck starter look different — but each story uses the same three ideas: <strong>how much charge moves</strong>, <strong>how hard it is pushed</strong>, and <strong>how much the path resists</strong>.</p>
<h2>Intuition before symbols</h2>
<p>Think of charge as a crowd of tiny carriers. <strong>Current</strong> is how many coulombs walk past a doorway each second. <strong>Voltage</strong> is how much energy each coulomb gains or loses between two points (a push difference). <strong>Resistance</strong> is how hard the hallway makes the walk.</p>
<h2>Formal ideas</h2>
<p><strong>Current:</strong> $I=\Delta Q/\Delta t$. The ampere (A) is one coulomb per second. Conventional current is the direction a positive charge would move.</p>
<p><strong>Voltage:</strong> energy per charge between two points. The volt (V) is one joule per coulomb. Voltage always needs a reference.</p>
<p><strong>Ohm’s law</strong> (ohmic resistor): $V=IR$, so $I=V/R$ and $R=V/I$.</p>
<p><strong>Power:</strong> $P=VI$. In a resistor also $P=I^2R=V^2/R$ (watts).</p>
<div class="example"><h3>Worked example</h3>
<p>A resistor has $12\ \text{V}$ across it and $R=4\ \Omega$.</p>
<ol class="steps">
<li>Current: $I=V/R=12/4=3\ \text{A}$.</li>
<li>Power: $P=VI=12\times 3=36\ \text{W}$ (check: $P=I^2R=9\times 4=36\ \text{W}$).</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Writing $R=I/V$ instead of $R=V/I$.</li>
<li>Giving a bare number with no unit.</li>
<li>Talking about voltage “at a point” with no second reference.</li>
</ul></div>
<ul class="takeaways"><li>$I=\Delta Q/\Delta t$.</li><li>$V=IR$; check power two ways.</li><li>Say the units out loud when you check.</li></ul>
`,
    problems: [
      { id: 'cir-u1-current', title: 'Current from charge', kind: 'numeric',
        gen(r) {
          const Q = r.step(0.5, 20, 0.5), t = r.step(0.2, 5, 0.2);
          return {
            prompt: String.raw`A charge of ${qty(Q, 'C')} flows past a point in ${qty(t, 's')}. Find the current $I$ in amperes. Enter $I$.`,
            answers: [ans('I', 'I', Q / t, 'A')],
            hints: [String.raw`$I=\Delta Q/\Delta t$.`],
            solution: String.raw`<ol class="steps"><li>$I=\Delta Q/\Delta t=${fmt(Q)}/${fmt(t)}=${fmt(Q / t)}\ \text{A}$.</li></ol>`,
          };
        } },
      { id: 'cir-u1-ohm', title: 'Ohm: find I', kind: 'numeric',
        gen(r) {
          const V = r.pick([5, 9, 12, 15, 24]), R = r.pick([2, 3, 4, 5, 6, 8, 10]);
          return {
            prompt: String.raw`A resistor of ${qty(R, 'Ω')} has ${qty(V, 'V')} across it. Find the current $I$ using Ohm’s law ($I=V/R$). Enter $I$ in amperes.`,
            answers: [ans('I', 'I', V / R, 'A')],
            hints: [String.raw`$I=V/R$.`],
            solution: String.raw`<p>$I=V/R=${V}/${R}=${fmt(V / R)}\ \text{A}$.</p>`,
          };
        } },
      { id: 'cir-u1-ohm-r', title: 'Ohm: find R', kind: 'numeric',
        gen(r) {
          const V = r.step(3, 48, 1), I = r.step(0.1, 4, 0.1);
          return {
            prompt: String.raw`A device draws ${qty(I, 'A')} with ${qty(V, 'V')} across it. Find the resistance $R$ in ohms. Enter $R$ (decimal or fraction OK).`,
            answers: [ans('R', 'R', V / I, 'Ω')],
            hints: [String.raw`$R=V/I$.`],
            solution: String.raw`<p>$R=V/I=${V}/${fmt(I)}=${fmt(V / I)}\ \Omega$.</p>`,
          };
        } },
      { id: 'cir-u1-power', title: 'Power in a resistor', kind: 'numeric',
        gen(r) {
          const V = r.pick([5, 9, 12, 24]), R = r.pick([4, 6, 8, 10, 12]);
          return {
            prompt: String.raw`A resistor of ${qty(R, 'Ω')} has ${qty(V, 'V')} across it. Find the power $P$ in watts. Enter $P$.`,
            answers: [ans('P', 'P', V * V / R, 'W')],
            hints: [String.raw`$P=V^2/R$ (or find $I$ first, then $P=VI$).`],
            solution: String.raw`<p>$P=V^2/R=${V}^2/${R}=${fmt(V * V / R)}\ \text{W}$.</p>`,
          };
        } },
      { id: 'cir-u1-mc', title: 'Concepts: V, I, R', kind: 'mc',
        gen: mcPool([
          { q: 'A volt is…', correct: 'joule per coulomb (energy per charge)', wrong: ['coulomb per second', 'newton only', 'ohm times farad'], why: 'Voltage is energy per charge between two points.' },
          { q: 'If voltage doubles and resistance stays fixed, current…', correct: 'doubles', wrong: ['halves', 'stays the same', 'becomes zero'], why: 'Ohm: I = V/R.' },
          { q: 'Power in a resistor can be written as…', correct: 'P = I²R = V²/R = VI', wrong: ['only VI for capacitors always', 'never related to heat', 'equal to capacitance C'], why: 'Joule heating identities.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'series-parallel', title: 'Series & Parallel Circuits',
    blurb: 'Combine resistors, build voltage dividers, and reduce mixed networks step by step.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Build $R_\mathrm{eq}$ for series and for two (or more) parallel resistors.</li>
<li>Use a voltage divider: know which resistor’s voltage you are finding.</li>
<li>Reduce a simple series–parallel network in the right order.</li>
</ul>
<h2>Hook</h2>
<p>String lights that go dark when one bulb dies are a series story. Household outlets that still work when one lamp is off are a parallel story. Same parts — different wiring rules.</p>
<h2>Intuition</h2>
<p><strong>Series</strong> is one hallway: the same current walks through every resistor; resistances add. <strong>Parallel</strong> is side doors between the same two floors: every branch sees the same voltage; more doors make the overall path easier, so $R_\mathrm{eq}$ shrinks.</p>
<p>A <strong>voltage divider</strong> is two series resistors across a source. The bottom resistor’s share of the voltage is its fraction of the total resistance.</p>
<h2>Formal ideas</h2>
<p>Series: same $I$, $R_\mathrm{eq}=\sum R_i$.</p>
<p>Parallel (two): same $V$, $R_\mathrm{eq}=\dfrac{R_1 R_2}{R_1+R_2}$. More branches: $1/R_\mathrm{eq}=\sum(1/R_i)$.</p>
<p>Divider (top $R_1$, bottom $R_2$, source $V_s$): $V_2=V_s\dfrac{R_2}{R_1+R_2}$ across the bottom.</p>
<div class="example"><h3>Worked example</h3>
<p>$V_s=12\ \text{V}$, top $R_1=3\ \text{k}\Omega$, bottom $R_2=1\ \text{k}\Omega$.</p>
<ol class="steps">
<li>$R_\mathrm{eq}=3+1=4\ \text{k}\Omega$.</li>
<li>$V_2=12\cdot\frac{1}{4}=3\ \text{V}$ across the bottom.</li>
<li>Check: $I=12/4=3\ \text{mA}$, then $V_2=I R_2=3\ \text{V}$.</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Adding parallel resistors like series (overestimates $R_\mathrm{eq}$).</li>
<li>Putting the top resistor in the numerator when you wanted the bottom voltage.</li>
<li>Forgetting to reduce a parallel island before adding a series resistor.</li>
</ul></div>
<ul class="takeaways"><li>Series adds; parallel shrinks.</li><li>Divider voltage is a resistance ratio.</li><li>Reduce inside-out: parallel pockets first.</li></ul>
`,
    problems: [
      { id: 'cir-u2-series', title: 'Series Req', kind: 'numeric',
        gen(r) {
          const a = r.int(100, 900), b = r.int(100, 900);
          return {
            prompt: String.raw`Two resistors ${qty(a, 'Ω')} and ${qty(b, 'Ω')} are connected in series. Find the equivalent resistance $R_\mathrm{eq}$ in ohms. Enter $R_\mathrm{eq}$.`,
            answers: [ans('Req', 'R_\\mathrm{eq}', a + b, 'Ω')],
            hints: ['In series, resistances add.'],
            solution: String.raw`<p>$R_\mathrm{eq}=${a}+${b}=${a + b}\ \Omega$.</p>`,
          };
        } },
      { id: 'cir-u2-parallel2', title: 'Parallel Req', kind: 'numeric',
        gen(r) {
          const R1 = r.pick([2, 3, 4, 6, 8, 10]), R2 = r.pick([2, 3, 4, 6, 8, 12]);
          const Req = R1 * R2 / (R1 + R2);
          return {
            prompt: String.raw`Two resistors ${qty(R1, 'Ω')} and ${qty(R2, 'Ω')} are in parallel. Find $R_\mathrm{eq}$ in ohms. Enter $R_\mathrm{eq}$ (decimal OK).`,
            answers: [ans('Req', 'R_\\mathrm{eq}', Req, 'Ω')],
            hints: [String.raw`$R_\mathrm{eq}=R_1 R_2/(R_1+R_2)$.`],
            solution: String.raw`<p>$R_\mathrm{eq}=\frac{${R1}\cdot${R2}}{${R1}+${R2}}=${fmt(Req)}\ \Omega$.</p>`,
          };
        } },
      { id: 'cir-u2-divider', title: 'Voltage divider', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([5, 9, 12, 15, 24]), R1 = r.pick([1, 2, 3, 4, 5, 6]), R2 = r.pick([1, 2, 3, 4, 5, 6]);
          const V2 = Vs * R2 / (R1 + R2);
          return {
            prompt: String.raw`A voltage divider has source ${qty(Vs, 'V')}, top resistor $R_1=${qty(R1, 'kΩ')}$, and bottom resistor $R_2=${qty(R2, 'kΩ')}$. Find the voltage $V_2$ across the bottom resistor. Enter $V_2$ in volts.`,
            answers: [ans('V2', 'V_2', V2, 'V')],
            hints: [String.raw`$V_2=V_s R_2/(R_1+R_2)$ (kΩ cancels in the ratio).`],
            solution: String.raw`<p>$V_2=${Vs}\cdot\frac{${R2}}{${R1}+${R2}}=${fmt(V2)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u2-mixed', title: 'Series–parallel Req', kind: 'numeric',
        gen(r) {
          const R1 = r.pick([4, 6, 8, 10]), R2 = r.pick([4, 6, 8, 12]), R3 = r.pick([4, 6, 8, 12]);
          const Req = R1 + R2 * R3 / (R2 + R3);
          return {
            prompt: String.raw`Resistor $R_1=${qty(R1, 'Ω')}$ is in series with the parallel combination of $R_2=${qty(R2, 'Ω')}$ and $R_3=${qty(R3, 'Ω')}$. Find $R_\mathrm{eq}$ in ohms. Enter $R_\mathrm{eq}$.`,
            answers: [ans('Req', 'R_\\mathrm{eq}', Req, 'Ω')],
            hints: ['Reduce the parallel pair first, then add $R_1$.'],
            solution: String.raw`<ol class="steps"><li>Parallel: $\frac{${R2}\cdot${R3}}{${R2}+${R3}}=${fmt(R2 * R3 / (R2 + R3))}\ \Omega$.</li><li>Add series $R_1$: $R_\mathrm{eq}=${fmt(Req)}\ \Omega$.</li></ol>`,
          };
        } },
      { id: 'cir-u2-current-series', title: 'Series current', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([9, 12, 15, 24]), R1 = r.pick([2, 3, 4]), R2 = r.pick([2, 4, 6]);
          const I = Vs / (R1 + R2);
          return {
            prompt: String.raw`A ${qty(Vs, 'V')} source drives ${qty(R1, 'Ω')} and ${qty(R2, 'Ω')} in series. Find the current $I$ through both resistors. Enter $I$ in amperes.`,
            answers: [ans('I', 'I', I, 'A')],
            hints: [String.raw`$I=V_s/(R_1+R_2)$. Series share one current.`],
            solution: String.raw`<p>$I=${Vs}/(${R1}+${R2})=${fmt(I)}\ \text{A}$.</p>`,
          };
        } },
      { id: 'cir-u2-mc', title: 'Concepts: series & parallel', kind: 'mc',
        gen: mcPool([
          { q: 'Two 10 Ω resistors in parallel have Req…', correct: '5 Ω', wrong: ['20 Ω', '10 Ω', '0 Ω'], why: 'Equal parallels: R/2.' },
          { q: 'Resistors in series share the same…', correct: 'current', wrong: ['voltage always', 'power always', 'zero resistance'], why: 'One path.' },
          { q: 'In a divider, a larger bottom resistor (vs the top) means…', correct: 'a larger share of Vs appears across the bottom', wrong: ['zero voltage on the bottom', 'infinite current always', 'the source disappears'], why: 'Ratio R2/(R1+R2).' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'kirchhoff', title: 'Kirchhoff’s Laws',
    blurb: 'KCL and KVL — charge conservation at nodes and energy around loops.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Apply KCL: currents into a node balance currents out.</li>
<li>Apply KVL: signed voltage drops around a loop sum to zero.</li>
<li>Find a resistor’s voltage once the loop current is known.</li>
</ul>
<h2>Hook</h2>
<p>If charge piled up forever at a wire junction, something would eventually arc. Kirchhoff’s current law (KCL) is the accountant for charge. Kirchhoff’s voltage law (KVL) is the accountant for energy around a closed path.</p>
<h2>Intuition</h2>
<p><strong>KCL:</strong> what flows into a junction must leave it in steady state. Draw arrows; if your guessed direction is wrong, the math returns a negative number — keep the magnitude and flip the meaning.</p>
<p><strong>KVL:</strong> walk around a loop summing “ups” and “downs” of potential. You return to the same point, so the net change is zero.</p>
<h2>Formal ideas</h2>
<p>KCL at a node: $\sum I_\mathrm{in}=\sum I_\mathrm{out}$, or $\sum I=0$ with a consistent sign convention.</p>
<p>KVL around a loop: $\sum V=0$ with a consistent walk (e.g. rise through a source, drop $IR$ through a resistor along the current).</p>
<div class="example"><h3>Worked example</h3>
<p>Single loop: $V_s=24\ \text{V}$, $R_1=3\ \Omega$, $R_2=5\ \Omega$ series.</p>
<ol class="steps">
<li>$R_\mathrm{eq}=8\ \Omega$, so $I=24/8=3\ \text{A}$.</li>
<li>Drop on $R_2$: $V_2=IR_2=15\ \text{V}$.</li>
<li>KVL check: $24-3\cdot3-3\cdot5=0$.</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Forgetting a current that leaves the node.</li>
<li>Mixing rise/drop signs on a KVL walk.</li>
<li>Using $V=IR$ with the wrong resistor’s current.</li>
</ul></div>
<ul class="takeaways"><li>KCL ↔ charge; KVL ↔ energy.</li><li>Negative current means “opposite your arrow.”</li><li>Check a loop sum when you can.</li></ul>
`,
    problems: [
      { id: 'cir-u3-kcl', title: 'KCL at a node', kind: 'numeric',
        gen(r) {
          const a = r.step(1, 8, 0.5), b = r.step(1, 8, 0.5), c = r.step(0.5, 5, 0.5);
          return {
            prompt: String.raw`At a node, currents ${qty(a, 'A')} and ${qty(b, 'A')} enter, while ${qty(c, 'A')} leaves along with an unknown current $I_x$ (also leaving). Find $I_x$ in amperes. Enter $I_x$.`,
            answers: [ans('Ix', 'I_x', a + b - c, 'A')],
            hints: ['KCL: in = out, so $I_x=(a+b)-c$.'],
            solution: String.raw`<p>$I_x=${fmt(a)}+${fmt(b)}-${fmt(c)}=${fmt(a + b - c)}\ \text{A}$.</p>`,
          };
        } },
      { id: 'cir-u3-kvl-loop', title: 'KVL loop current', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([9, 12, 15, 24]), R1 = r.pick([2, 3, 4, 5]), R2 = r.pick([2, 3, 4, 6]);
          return {
            prompt: String.raw`A single loop has a ${qty(Vs, 'V')} source and series resistors ${qty(R1, 'Ω')} and ${qty(R2, 'Ω')}. Find the loop current $I$ in amperes. Enter $I$.`,
            answers: [ans('I', 'I', Vs / (R1 + R2), 'A')],
            hints: [String.raw`KVL ⇒ $I=V_s/(R_1+R_2)$.`],
            solution: String.raw`<p>$I=${Vs}/(${R1}+${R2})=${fmt(Vs / (R1 + R2))}\ \text{A}$.</p>`,
          };
        } },
      { id: 'cir-u3-drop', title: 'Voltage across R2', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([12, 15, 24]), R1 = r.pick([1, 2, 3, 4]), R2 = r.pick([2, 3, 4, 5]), R3 = r.pick([1, 2, 3]);
          const I = Vs / (R1 + R2 + R3);
          return {
            prompt: String.raw`Three series resistors ${qty(R1, 'Ω')}, ${qty(R2, 'Ω')}, and ${qty(R3, 'Ω')} are driven by ${qty(Vs, 'V')}. Find the voltage across the middle resistor $R_2$. Enter $V_{R2}$ in volts.`,
            answers: [ans('V2', 'V_2', I * R2, 'V')],
            hints: ['Find $I=V_s/\\sum R$, then $V_{R2}=I R_2$.'],
            solution: String.raw`<ol class="steps"><li>$I=${Vs}/(${R1}+${R2}+${R3})=${fmt(I)}\ \text{A}$.</li><li>$V_{R2}=I R_2=${fmt(I * R2)}\ \text{V}$.</li></ol>`,
          };
        } },
      { id: 'cir-u3-kcl-in', title: 'KCL find entering current', kind: 'numeric',
        gen(r) {
          const out1 = r.step(1, 6, 0.5), out2 = r.step(1, 6, 0.5), inn = r.step(0.5, 4, 0.5);
          const Ix = out1 + out2 - inn;
          return {
            prompt: String.raw`At a node, one known current ${qty(inn, 'A')} enters, and currents ${qty(out1, 'A')} and ${qty(out2, 'A')} leave. An unknown current $I_x$ also enters. Find $I_x$ in amperes. Enter $I_x$.`,
            answers: [ans('Ix', 'I_x', Ix, 'A')],
            hints: ['Total in = total out.'],
            solution: String.raw`<p>$I_x=(${fmt(out1)}+${fmt(out2)})-${fmt(inn)}=${fmt(Ix)}\ \text{A}$.</p>`,
          };
        } },
      { id: 'cir-u3-mc', title: 'Concepts: Kirchhoff', kind: 'mc',
        gen: mcPool([
          { q: 'KCL is a statement about conserving…', correct: 'charge', wrong: ['energy', 'spin', 'money'], why: 'Node current balance.' },
          { q: 'KVL is a statement about conserving…', correct: 'energy (around a closed path)', wrong: ['charge', 'mass', 'bits'], why: 'Loop voltage sum.' },
          { q: 'If KCL gives $I=-2$ A for your drawn arrow…', correct: '2 A flows opposite the arrow you drew', wrong: ['the circuit is impossible', 'charge is destroyed', 'voltage is zero everywhere'], why: 'Sign encodes direction.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'rc-first-order', title: 'Capacitors & RC Transients',
    blurb: 'Time constant τ = RC, charging and discharging exponentials.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Compute $\tau=RC$ with consistent units (seconds).</li>
<li>Evaluate capacitor voltage while charging or discharging at $t=\tau$.</li>
<li>Explain why about $5\tau$ means “basically settled.”</li>
</ul>
<h2>Hook</h2>
<p>A capacitor is a temporary bucket for charge. With a resistor, the bucket fills or empties on a predictable schedule — not instantly, not forever.</p>
<h2>Intuition</h2>
<p>Large $R$ or large $C$ means a sluggish circuit (big $\tau$). Charging starts fast and levels off toward the source. Discharging starts fast and fades toward zero. At one time constant ($t=\tau$), you have covered about 63% of the journey toward the final value.</p>
<h2>Formal ideas</h2>
<p>Time constant: $\tau=RC$ (ohms × farads = seconds).</p>
<p>Charging toward $V_s$ from $0$: $v(t)=V_s(1-e^{-t/\tau})$. At $t=\tau$: $v\approx 0.632\,V_s$.</p>
<p>Discharging from $V_0$: $v(t)=V_0 e^{-t/\tau}$. At $t=\tau$: $v\approx 0.368\,V_0$.</p>
<p>After about $5\tau$, $|e^{-5}|\approx 0.007$, so you are within roughly 1% of the final value.</p>
<div class="example"><h3>Worked example</h3>
<p>$R=10\ \text{k}\Omega$, $C=100\ \mu\text{F}$.</p>
<ol class="steps">
<li>$R=10\times10^3\ \Omega$, $C=100\times10^{-6}\ \text{F}$.</li>
<li>$\tau=RC=10^4\cdot10^{-4}=1\ \text{s}$.</li>
<li>Charging to $12\ \text{V}$: at $t=1\ \text{s}$, $v\approx 0.632\times12\approx 7.58\ \text{V}$.</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Forgetting to convert kΩ and µF before multiplying.</li>
<li>Using the charging formula while the capacitor is discharging.</li>
<li>Thinking capacitor voltage can jump instantly with only finite current.</li>
</ul></div>
<ul class="takeaways"><li>$\tau=RC$ sets the speed.</li><li>At $t=\tau$: ~63% charged or ~37% left discharging.</li><li>~$5\tau$ ≈ settled.</li></ul>
`,
    problems: [
      { id: 'cir-u4-tau', title: 'Find τ = RC', kind: 'numeric',
        gen(r) {
          const Rk = r.pick([1, 2, 10, 22, 47]), Cu = r.pick([10, 47, 100, 220]);
          const tau = Rk * 1e3 * Cu * 1e-6;
          return {
            prompt: String.raw`An RC circuit has $R=${qty(Rk, 'kΩ')}$ and $C=${qty(Cu, 'µF')}$. Find the time constant $\tau=RC$ in seconds. Enter $\tau$.`,
            answers: [ans('tau', '\\tau', tau, 's')],
            hints: ['Convert: kΩ → Ω, µF → F, then multiply.'],
            solution: String.raw`<p>$\tau=(${Rk}\times10^3)(${Cu}\times10^{-6})=${fmt(tau)}\ \text{s}$.</p>`,
          };
        } },
      { id: 'cir-u4-charge', title: 'Charging voltage at t = τ', kind: 'numeric',
        gen(r) {
          const Vs = r.pick([5, 9, 12]), tau = r.pick([0.5, 1, 2]);
          const v = Vs * (1 - Math.exp(-1));
          return {
            prompt: String.raw`A capacitor charges toward ${qty(Vs, 'V')} with time constant $\tau=${tau}\ \text{s}$ (starting from 0 V). Find the capacitor voltage at time $t=\tau$. Enter $v$ in volts.`,
            answers: [ans('v', 'v', v, 'V')],
            hints: [String.raw`At $t=\tau$, $v=V_s(1-e^{-1})\approx 0.632\,V_s$.`],
            solution: String.raw`<p>$v=${Vs}(1-e^{-1})=${fmt(v)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u4-discharge', title: 'Discharge voltage at t = τ', kind: 'numeric',
        gen(r) {
          const V0 = r.pick([5, 9, 12, 20]);
          const v = V0 * Math.exp(-1);
          return {
            prompt: String.raw`A capacitor starts at ${qty(V0, 'V')} and discharges through a resistor. Find its voltage at time $t=\tau$. Enter $v$ in volts.`,
            answers: [ans('v', 'v', v, 'V')],
            hints: [String.raw`$v=V_0 e^{-1}\approx 0.368\,V_0$.`],
            solution: String.raw`<p>$v=${V0}e^{-1}=${fmt(v)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u4-pct', title: 'Percent left after τ', kind: 'numeric',
        gen(r) {
          return {
            prompt: String.raw`During a capacitor discharge, about what percent of the initial voltage remains at $t=\tau$? Enter an integer percent (e.g. 37 for about 37%).`,
            answers: [ans('p', 'p', 37, '%', { abs: 2 })],
            hints: [String.raw`$e^{-1}\approx 0.368$ → about 37%.`],
            solution: String.raw`<p>$\approx 37\%$ (from $e^{-1}$).</p>`,
          };
        } },
      { id: 'cir-u4-mc', title: 'Concepts: RC', kind: 'mc',
        gen: mcPool([
          { q: 'After about 5τ of charging toward a DC source…', correct: 'the capacitor is ~99% of its final voltage', wrong: ['still at 50%', 'still at 0%', 'oscillating forever'], why: 'Exponential settles.' },
          { q: 'If you double both R and C…', correct: 'τ becomes 4× larger', wrong: ['τ ×2', 'τ unchanged', 'τ /2'], why: 'τ = RC.' },
          { q: 'Capacitor voltage with finite current…', correct: 'cannot jump instantly', wrong: ['must jump every second', 'is always zero', 'equals R always'], why: 'i = C dv/dt.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'thevenin', title: 'Thévenin Equivalents',
    blurb: 'Replace a linear network at a port with Vth and Rth — then load it.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Treat a linear two-terminal port as $V_\mathrm{th}$ in series with $R_\mathrm{th}$.</li>
<li>Find the loaded voltage $V_L$ with a divider.</li>
<li>Find $R_\mathrm{th}$ from $V_\mathrm{oc}/I_\mathrm{sc}$ when those are known.</li>
</ul>
<h2>Hook</h2>
<p>You do not always need every resistor inside a gadget — only how that gadget behaves at two terminals. Thévenin’s theorem packs the whole linear mess into two numbers.</p>
<h2>Intuition</h2>
<p>$V_\mathrm{th}$ is the open-circuit voltage you would measure with nothing attached. $R_\mathrm{th}$ is how “stiff” the port is — the series resistance that explains why the voltage sags when you attach a load. Loading is just another voltage divider: $R_\mathrm{th}$ on top, $R_L$ on the bottom.</p>
<h2>Formal ideas</h2>
<p>Equivalent: $V_\mathrm{th}$ in series with $R_\mathrm{th}$.</p>
<p>Loaded: $V_L=V_\mathrm{th}\dfrac{R_L}{R_\mathrm{th}+R_L}$.</p>
<p>Also: $R_\mathrm{th}=V_\mathrm{oc}/I_\mathrm{sc}$ (open-circuit voltage over short-circuit current).</p>
<p>From a schematic (lab skill): zero independent voltage sources (replace with shorts) and open independent current sources, then find equivalent resistance at the port.</p>
<p>Maximum average power to a resistive load when $R_L=R_\mathrm{th}$.</p>
<div class="example"><h3>Worked example</h3>
<p>$V_\mathrm{th}=10\ \text{V}$, $R_\mathrm{th}=2\ \text{k}\Omega$, $R_L=2\ \text{k}\Omega$.</p>
<ol class="steps">
<li>$V_L=10\cdot\frac{2}{2+2}=5\ \text{V}$.</li>
<li>Matched load: half the Thévenin voltage appears on $R_L$.</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Leaving a voltage source as an open when computing $R_\mathrm{th}$ (use a short for an ideal independent $V$ source).</li>
<li>Forgetting $R_\mathrm{th}$ in the divider when a load is attached.</li>
<li>Confusing $V_\mathrm{th}$ with the loaded $V_L$.</li>
</ul></div>
<ul class="takeaways"><li>Two numbers model a linear port.</li><li>Load makes a divider with $R_\mathrm{th}$.</li><li>$R_\mathrm{th}=V_\mathrm{oc}/I_\mathrm{sc}$.</li></ul>
`,
    problems: [
      { id: 'cir-u5-vl', title: 'Loaded Thévenin voltage', kind: 'numeric',
        gen(r) {
          const Vth = r.pick([5, 9, 10, 12]), Rth = r.pick([1, 2, 3, 4]), RL = r.pick([1, 2, 3, 4]);
          const VL = Vth * RL / (Rth + RL);
          return {
            prompt: String.raw`A Thévenin source of ${qty(Vth, 'V')} with $R_\mathrm{th}=${qty(Rth, 'kΩ')}$ drives a load $R_L=${qty(RL, 'kΩ')}$. Find the load voltage $V_L$. Enter $V_L$ in volts.`,
            answers: [ans('VL', 'V_L', VL, 'V')],
            hints: [String.raw`$V_L=V_\mathrm{th} R_L/(R_\mathrm{th}+R_L)$ (kΩ cancels).`],
            solution: String.raw`<p>$V_L=${Vth}\cdot\frac{${RL}}{${Rth}+${RL}}=${fmt(VL)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u5-rth', title: 'Rth from Voc and Isc', kind: 'numeric',
        gen(r) {
          const Voc = r.pick([6, 10, 12]), Isc = r.pick([0.002, 0.005, 0.01]);
          return {
            prompt: String.raw`A linear port has open-circuit voltage ${qty(Voc, 'V')} and short-circuit current ${qty(Isc, 'A')}. Find $R_\mathrm{th}=V_\mathrm{oc}/I_\mathrm{sc}$. Enter $R_\mathrm{th}$ in ohms.`,
            answers: [ans('R', 'R_\\mathrm{th}', Voc / Isc, 'Ω')],
            hints: [String.raw`$R_\mathrm{th}=V_\mathrm{oc}/I_\mathrm{sc}$.`],
            solution: String.raw`<p>$R_\mathrm{th}=${Voc}/${Isc}=${fmt(Voc / Isc)}\ \Omega$.</p>`,
          };
        } },
      { id: 'cir-u5-match', title: 'Matched-load voltage', kind: 'numeric',
        gen(r) {
          const Vth = r.pick([8, 10, 12, 20]);
          return {
            prompt: String.raw`For maximum power transfer to a resistive load, $R_L=R_\mathrm{th}$. If $V_\mathrm{th}=${qty(Vth, 'V')}$, what is $V_L$ on that matched load? Enter $V_L$ in volts.`,
            answers: [ans('VL', 'V_L', Vth / 2, 'V')],
            hints: ['Matched divider splits $V_\mathrm{th}$ in half.'],
            solution: String.raw`<p>$V_L=V_\mathrm{th}/2=${fmt(Vth / 2)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u5-mc', title: 'Concepts: Thévenin', kind: 'mc',
        gen: mcPool([
          { q: 'When computing Rth, an independent voltage source is replaced by…', correct: 'a short circuit (0 V ideal)', wrong: ['an open circuit', 'a capacitor', 'a random resistor'], why: 'Zero voltage → short.' },
          { q: 'Maximum power to a resistive load occurs when…', correct: 'RL = Rth', wrong: ['RL = 0', 'RL = ∞', 'RL = Rth/100'], why: 'Matched load.' },
          { q: 'Vth equals…', correct: 'the open-circuit port voltage', wrong: ['always the loaded voltage', 'always zero', 'the short-circuit current'], why: 'Definition.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'ac-rms', title: 'AC Sinusoids & RMS',
    blurb: 'Peak vs RMS, period and frequency, and average power in a resistor.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Convert sine peak voltage to RMS: $V_\mathrm{rms}=V_p/\sqrt{2}$.</li>
<li>Relate frequency and period: $T=1/f$.</li>
<li>Compute average resistor power using RMS: $P=V_\mathrm{rms}^2/R$.</li>
</ul>
<h2>Hook</h2>
<p>Wall outlets are labeled “120 V,” but a scope shows a swinging sine — not a flat line. That label is an <strong>RMS</strong> number: a fair way to compare AC to the DC voltage that would heat a resistor the same way.</p>
<h2>Intuition</h2>
<p>Peak is the tip of the sine. The average of a pure sine over a cycle is zero (equal positive and negative). RMS is a special “heating average.” For a sine, RMS is about 70.7% of peak — so peak is larger than the number on the outlet.</p>
<h2>Formal ideas</h2>
<p>Sine: $V_\mathrm{rms}=V_p/\sqrt{2}\approx 0.707\,V_p$. Also $V_p=\sqrt{2}\,V_\mathrm{rms}$.</p>
<p>Period and frequency: $T=1/f$ (seconds and hertz).</p>
<p>Average power in a resistor: $P=V_\mathrm{rms}^2/R=I_\mathrm{rms}^2 R=V_\mathrm{rms} I_\mathrm{rms}$.</p>
<div class="example"><h3>Worked example</h3>
<p>Sine with $V_p=170\ \text{V}$ (rough US peak for about 120 V RMS).</p>
<ol class="steps">
<li>$V_\mathrm{rms}=170/\sqrt{2}\approx 120\ \text{V}$.</li>
<li>Across $R=40\ \Omega$: $P\approx 120^2/40=360\ \text{W}$.</li>
<li>$f=60\ \text{Hz}$ ⇒ $T=1/60\approx 0.0167\ \text{s}$.</li>
</ol></div>
<div class="tip"><strong>Common mistakes</strong>
<ul>
<li>Using peak in $P=V^2/R$ instead of RMS.</li>
<li>Thinking the average of a sine is the RMS value.</li>
<li>Confusing period (seconds) with frequency (hertz).</li>
</ul></div>
<ul class="takeaways"><li>Outlet labels are RMS, not peak.</li><li>Sine: $V_\mathrm{rms}=V_p/\sqrt{2}$.</li><li>Power in $R$ uses RMS.</li></ul>
`,
    problems: [
      { id: 'cir-u6-rms', title: 'Peak to RMS', kind: 'numeric',
        gen(r) {
          const Vp = r.pick([10, 17, 170, 311]);
          return {
            prompt: String.raw`A sine wave has peak voltage ${qty(Vp, 'V')}. Find the RMS voltage $V_\mathrm{rms}=V_p/\sqrt{2}$. Enter $V_\mathrm{rms}$ in volts.`,
            answers: [ans('V', 'V_\\mathrm{rms}', Vp / Math.SQRT2, 'V')],
            hints: [String.raw`Divide the peak by $\sqrt{2}$.`],
            solution: String.raw`<p>$V_\mathrm{rms}=${Vp}/\sqrt{2}=${fmt(Vp / Math.SQRT2)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u6-p', title: 'AC power in a resistor', kind: 'numeric',
        gen(r) {
          const V = r.pick([12, 24, 120]), R = r.pick([10, 20, 40, 100]);
          return {
            prompt: String.raw`An AC voltage of ${qty(V, 'V')} RMS is across a ${qty(R, 'Ω')} resistor. Find the average power $P=V_\mathrm{rms}^2/R$. Enter $P$ in watts.`,
            answers: [ans('P', 'P', V * V / R, 'W')],
            hints: [String.raw`Use RMS in $P=V^2/R$.`],
            solution: String.raw`<p>$P=${V}^2/${R}=${fmt(V * V / R)}\ \text{W}$.</p>`,
          };
        } },
      { id: 'cir-u6-f', title: 'Period from frequency', kind: 'numeric',
        gen(r) {
          const f = r.pick([50, 60, 100, 1000]);
          return {
            prompt: String.raw`A signal has frequency ${qty(f, 'Hz')}. Find the period $T=1/f$ in seconds. Enter $T$.`,
            answers: [ans('T', 'T', 1 / f, 's')],
            hints: [String.raw`$T=1/f$.`],
            solution: String.raw`<p>$T=1/${f}=${fmt(1 / f)}\ \text{s}$.</p>`,
          };
        } },
      { id: 'cir-u6-peak', title: 'RMS to peak', kind: 'numeric',
        gen(r) {
          const Vrms = r.pick([12, 24, 120]);
          const Vp = Vrms * Math.SQRT2;
          return {
            prompt: String.raw`A sine wave is labeled ${qty(Vrms, 'V')} RMS. Find the peak voltage $V_p=\sqrt{2}\,V_\mathrm{rms}$. Enter $V_p$ in volts.`,
            answers: [ans('Vp', 'V_p', Vp, 'V')],
            hints: [String.raw`Multiply RMS by $\sqrt{2}$.`],
            solution: String.raw`<p>$V_p=\sqrt{2}\cdot${Vrms}=${fmt(Vp)}\ \text{V}$.</p>`,
          };
        } },
      { id: 'cir-u6-mc', title: 'Concepts: AC & RMS', kind: 'mc',
        gen: mcPool([
          { q: 'For a sine wave, Vrms / Vp is about…', correct: '0.707', wrong: ['1', '2', '0'], why: '1/√2.' },
          { q: 'A wall outlet labeled “120 V AC” usually means…', correct: '120 V RMS', wrong: ['120 V peak always', '120 V average of a sine (0)', 'pure DC'], why: 'Standard labeling.' },
          { q: 'Average power in a resistor from AC should use…', correct: 'RMS voltage (or RMS current)', wrong: ['peak voltage alone in V²/R without converting', 'the average of the sine (0) as if it heated', 'only frequency'], why: 'Heating equivalence.' },
        ]) },
    ],
  },
];
