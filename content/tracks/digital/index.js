'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'binary-boolean', title: 'Binary Numbers & Boolean Basics',
    blurb: 'Bits, binary/decimal conversion, and AND/OR/NOT — the alphabet of digital systems.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Digital design talks in <strong>bits</strong> (0 or 1). Everything in a computer is patterns of bits. Boolean algebra is the algebra of true/false that gates implement in hardware.</p>
<h2>Binary</h2>
<p>Place weights are powers of 2: $\ldots 16,8,4,2,1$. Example: $1101_2 = 8+4+1 = 13_{10}$.</p>
<p>An $n$-bit unsigned number ranges from $0$ to $2^n-1$.</p>
<h2>Boolean operations</h2>
<table class="tbl"><thead><tr><th>Op</th><th>Symbol</th><th>Meaning</th></tr></thead><tbody>
<tr><td>AND</td><td>$\cdot$ or $\wedge$</td><td>1 only if both inputs are 1</td></tr>
<tr><td>OR</td><td>$+$ or $\vee$</td><td>1 if either input is 1</td></tr>
<tr><td>NOT</td><td>bar or $\neg$</td><td>Flips 0↔1</td></tr>
</tbody></table>
<p>In Boolean algebra, $+$ means OR, not arithmetic plus. Read $\bar A$ as “not A”.</p>
<div class="example"><h3>Worked example</h3>
<p>$A=1,B=0$: $A\cdot B=0$, $A+B=1$, $\bar A=0$.</p></div>
<ul class="takeaways"><li>Binary weights are powers of 2.</li><li>AND, OR, NOT are the primitives.</li><li>Boolean $+$ means OR.</li></ul>`,
    problems: [
      { id: 'dig-u1-bin2dec', title: 'Binary to decimal', kind: 'numeric',
        gen(r) {
          const n = r.int(5, 15);
          const bin = n.toString(2);
          return {
            prompt: String.raw`Convert $${bin}_2$ to decimal.`,
            answers: [ans('n', 'N', n, '')],
            hints: ['Add place values where bits are 1.'],
            solution: String.raw`<ol class="steps"><li>$${bin}_2 = ${n}_{10}$</li></ol>`,
          };
        } },
      { id: 'dig-u1-dec2bin', title: 'Bits needed for N', kind: 'numeric',
        gen(r) {
          const n = r.pick([5, 6, 7, 9, 10, 12, 14, 15, 17, 20, 25, 31]);
          const bits = n.toString(2).length;
          return {
            prompt: String.raw`How many bits to represent $${n}$ as unsigned binary (no leading zeros)?`,
            answers: [ans('b', 'b', bits, '')],
            hints: ['Convert and count digits, or smallest k with 2^k−1 ≥ n.'],
            solution: String.raw`<ol class="steps"><li>$${n}_{10}=${n.toString(2)}_2$ → ${bits} bits</li></ol>`,
          };
        } },
      { id: 'dig-u1-bool', title: 'Evaluate AND/OR/NAND', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]);
          const kind = r.pick(['and', 'or', 'nand']);
          let val, label, prompt;
          if (kind === 'and') { val = A & B; label = 'A\\cdot B'; prompt = String.raw`$A=${A}$, $B=${B}$. Evaluate $A\cdot B$ (AND).`; }
          else if (kind === 'or') { val = A | B; label = 'A+B'; prompt = String.raw`$A=${A}$, $B=${B}$. Evaluate $A+B$ (Boolean OR).`; }
          else { val = (A & B) ? 0 : 1; label = '\\overline{A\\cdot B}'; prompt = String.raw`$A=${A}$, $B=${B}$. Evaluate $\overline{A\cdot B}$ (NAND).`; }
          return { prompt, answers: [ans('y', label, val, '')], hints: ['AND=1 iff both 1; OR=1 if either 1; NAND flips AND.'], solution: String.raw`<p>Result: $${val}$</p>` };
        } },
      { id: 'dig-u1-range', title: 'n-bit max value', kind: 'numeric',
        gen(r) {
          const n = r.pick([3, 4, 5, 6, 8]);
          return {
            prompt: String.raw`Largest unsigned integer with $${n}$ bits?`,
            answers: [ans('m', 'M', 2 ** n - 1, '')],
            hints: [String.raw`$2^n-1$.`],
            solution: String.raw`<ol class="steps"><li>$2^{${n}}-1=${2 ** n - 1}$</li></ol>`,
          };
        } },
      { id: 'dig-u1-mc', title: 'Concept check: binary/Boolean', kind: 'mc',
        gen: mcPool([
          { q: 'In Boolean algebra, A + B means…', correct: 'A OR B', wrong: ['A plus B (arithmetic)', 'A AND B', 'A XOR B'], why: '+ is OR in Boolean notation.' },
          { q: 'A bit can take…', correct: 'two values: 0 or 1', wrong: ['ten values', 'any real', 'only 1'], why: 'Binary digit.' },
          { q: '8 bits can represent how many unsigned values?', correct: '256', wrong: ['8', '255', '128'], why: '2^8=256 (0…255).' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'gates-truth', title: 'Logic Gates & Truth Tables',
    blurb: 'AND, OR, NOT, NAND, NOR, XOR — schematics and truth tables.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Gates are the bricks of digital chips. A <strong>truth table</strong> lists every input combination and the output.</p>
<h2>Common gates</h2>
<ul>
<li><strong>NAND</strong>: 0 only when all inputs are 1. Universal.</li>
<li><strong>NOR</strong>: also universal.</li>
<li><strong>XOR</strong> ($\oplus$): 1 when inputs differ. Read “A xor B”.</li>
<li><strong>XNOR</strong>: 1 when inputs match.</li>
</ul>
<div class="example"><h3>XOR truth table</h3>
<p>$00→0$, $01→1$, $10→1$, $11→0$.</p></div>
<ul class="takeaways"><li>Truth tables define combinational behavior.</li><li>NAND/NOR are universal.</li><li>XOR detects difference.</li></ul>`,
    problems: [
      { id: 'dig-u2-xor', title: 'XOR evaluate', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]);
          return { prompt: String.raw`$A=${A}$, $B=${B}$. Find $A\oplus B$.`, answers: [ans('y', 'Y', A ^ B, '')], hints: ['1 when bits differ.'], solution: String.raw`<p>${A ^ B}</p>` };
        } },
      { id: 'dig-u2-nand', title: 'NAND evaluate', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]), y = (A & B) ? 0 : 1;
          return { prompt: String.raw`$A=${A}$, $B=${B}$. Find $\overline{A\cdot B}$.`, answers: [ans('y', 'Y', y, '')], hints: ['Opposite of AND.'], solution: String.raw`<p>${y}</p>` };
        } },
      { id: 'dig-u2-count', title: 'Truth table rows', kind: 'numeric',
        gen(r) {
          const n = r.pick([2, 3, 4, 5]);
          return { prompt: String.raw`Combinational circuit with $${n}$ inputs: how many truth-table rows?`, answers: [ans('r', 'R', 2 ** n, '')], hints: [String.raw`$2^n$.`], solution: String.raw`<p>$2^{${n}}=${2 ** n}$</p>` };
        } },
      { id: 'dig-u2-mc', title: 'Concept check: gates', kind: 'mc',
        gen: mcPool([
          { q: 'Gate that is 0 only when all inputs are 1?', correct: 'NAND', wrong: ['AND', 'OR', 'XOR'], why: 'NAND = NOT AND.' },
          { q: 'XOR is 1 when…', correct: 'inputs differ', wrong: ['both 1', 'both 0', 'at least one 1'], why: 'Difference detector.' },
          { q: 'Universal gate:', correct: 'NAND (or NOR)', wrong: ['XOR only', 'AND only', 'buffer'], why: 'Functionally complete.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'combinational', title: 'Combinational Logic & Building Blocks',
    blurb: 'De Morgan, half adders, and multiplexers.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Combinational</strong> logic: outputs depend only on current inputs (no memory).</p>
<h2>De Morgan</h2>
$$\overline{A\cdot B}=\bar A+\bar B, \qquad \overline{A+B}=\bar A\cdot\bar B$$
<h2>Blocks</h2>
<ul><li><strong>Mux:</strong> select one input with select bits.</li>
<li><strong>Half adder:</strong> Sum $=A\oplus B$, Carry $=A\cdot B$.</li></ul>
<div class="example"><h3>Half adder</h3>
<p>$A=B=1$ → Sum $=0$, Carry $=1$ (binary two).</p></div>
<ul class="takeaways"><li>No memory in combinational circuits.</li><li>De Morgan flips AND/OR and complements.</li><li>Half adder = XOR + AND.</li></ul>`,
    problems: [
      { id: 'dig-u3-demorgan', title: 'De Morgan / NAND', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]), y = (A & B) ? 0 : 1;
          return { prompt: String.raw`$A=${A}$, $B=${B}$. Evaluate $\overline{A\cdot B}$.`, answers: [ans('y', 'Y', y, '')], hints: [String.raw`$=\bar A+\bar B$.`], solution: String.raw`<p>${y}</p>` };
        } },
      { id: 'dig-u3-halfsum', title: 'Half-adder sum', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]);
          return { prompt: String.raw`Half adder $A=${A}$, $B=${B}$. Sum?`, answers: [ans('s', 'S', A ^ B, '')], hints: ['XOR.'], solution: String.raw`<p>${A ^ B}</p>` };
        } },
      { id: 'dig-u3-halfcarry', title: 'Half-adder carry', kind: 'numeric',
        gen(r) {
          const A = r.pick([0, 1]), B = r.pick([0, 1]);
          return { prompt: String.raw`Half adder $A=${A}$, $B=${B}$. Carry?`, answers: [ans('c', 'C', A & B, '')], hints: ['AND.'], solution: String.raw`<p>${A & B}</p>` };
        } },
      { id: 'dig-u3-mux', title: '2:1 mux', kind: 'numeric',
        gen(r) {
          const I0 = r.pick([0, 1]), I1 = r.pick([0, 1]), S = r.pick([0, 1]);
          return { prompt: String.raw`Mux: $I_0=${I0}$, $I_1=${I1}$, $S=${S}$. Output?`, answers: [ans('y', 'Y', S ? I1 : I0, '')], hints: ['S=0→I0, S=1→I1.'], solution: String.raw`<p>${S ? I1 : I0}</p>` };
        } },
      { id: 'dig-u3-mc', title: 'Concept check: combinational', kind: 'mc',
        gen: mcPool([
          { q: 'Combinational logic…', correct: 'has no memory of past inputs', wrong: ['always uses flip-flops', 'needs a clock', 'forbids XOR'], why: 'y = f(inputs only).' },
          { q: String.raw`$\overline{A+B}$ equals…`, correct: String.raw`$\bar A \cdot \bar B$`, wrong: [String.raw`$\bar A + \bar B$`, String.raw`$A\cdot B$`, String.raw`$A+B$`], why: 'De Morgan.' },
          { q: 'Half-adder carry is…', correct: 'A AND B', wrong: ['A OR B', 'A XOR B', 'A NAND B'], why: 'Both bits 1.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'sequential', title: 'Sequential Logic: Flip-Flops & State',
    blurb: 'Memory elements, clocks, and counting states.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Sequential</strong> circuits remember: outputs depend on inputs and past <strong>state</strong>.</p>
<h2>D flip-flop</h2>
<p>On the active clock edge, $Q \leftarrow D$. Most common 1-bit memory.</p>
<h2>State space</h2>
<p>$n$ flip-flops → up to $2^n$ states. Counters and FSMs walk those states each clock.</p>
<div class="tip"><strong>Edge-triggered:</strong> capture happens at the clock transition, not for the whole time the clock is high.</div>
<ul class="takeaways"><li>Sequential = memory + logic.</li><li>D FF samples D on the edge.</li><li>$n$ FFs → ≤ $2^n$ states.</li></ul>`,
    problems: [
      { id: 'dig-u4-states', title: 'Max states from FFs', kind: 'numeric',
        gen(r) {
          const n = r.pick([2, 3, 4, 5, 6, 8]);
          return { prompt: String.raw`$${n}$ flip-flops: max distinct states?`, answers: [ans('s', 'S', 2 ** n, '')], hints: [String.raw`$2^n$.`], solution: String.raw`<p>${2 ** n}</p>` };
        } },
      { id: 'dig-u4-dff', title: 'D FF next state', kind: 'numeric',
        gen(r) {
          const D = r.pick([0, 1]), Q = r.pick([0, 1]);
          return { prompt: String.raw`D FF has $Q=${Q}$, $D=${D}$. After next active edge, $Q$?`, answers: [ans('q', 'Q', D, '')], hints: ['Q follows D; old Q irrelevant.'], solution: String.raw`<p>$Q\\leftarrow ${D}$</p>` };
        } },
      { id: 'dig-u4-countbits', title: 'FFs to count N states', kind: 'numeric',
        gen(r) {
          const N = r.pick([4, 5, 8, 10, 16, 60]);
          const bits = Math.ceil(Math.log2(N));
          return { prompt: String.raw`Min flip-flops for $${N}$ distinct states?`, answers: [ans('b', 'b', bits, '')], hints: [String.raw`$2^b\\ge N$.`], solution: String.raw`<p>${bits}</p>` };
        } },
      { id: 'dig-u4-mc', title: 'Concept check: sequential', kind: 'mc',
        gen: mcPool([
          { q: 'On its clock edge, a D FF…', correct: 'copies D into Q', wrong: ['always toggles', 'clears Q', 'ignores D'], why: 'Q ← D.' },
          { q: 'Sequential vs combinational:', correct: 'sequential has memory/state', wrong: ['sequential forbids AND', 'combinational needs a clock', 'no difference'], why: 'State remembers the past.' },
          { q: 'Edge-triggered means…', correct: 'update at the clock transition', wrong: ['update while clock is high', 'no clock', 'power-up only'], why: 'Capture at the edge.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('digital'), units);
