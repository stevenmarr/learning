'use strict';
const { fmt, q, ans, mcPool } = require('../../helpers');

module.exports = [
  {
    num: 1, slug: 'binary-boolean', title: 'Binary Numbers & Boolean Basics',
    blurb: 'Bits, place values, binary↔decimal, and AND/OR/NOT — the alphabet of digital systems.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Digital design talks in <strong>bits</strong> (0 or 1). Everything in a computer is patterns of bits. Boolean algebra is the algebra of true/false that gates implement in hardware.</p>
<h2>Binary place values</h2>
<p>Weights are powers of 2: $\\ldots 16,8,4,2,1$. Example: $1101_2=8+4+1=13_{10}$. An $n$-bit unsigned number ranges from $0$ to $2^n-1$.</p>
<h2>Boolean operations</h2>
<table class="tbl"><thead><tr><th>Op</th><th>Symbol</th><th>Meaning</th></tr></thead><tbody>
<tr><td>AND</td><td>$\\cdot$ or $\\wedge$</td><td>1 only if both inputs are 1</td></tr>
<tr><td>OR</td><td>$+$ or $\\vee$</td><td>1 if either input is 1</td></tr>
<tr><td>NOT</td><td>bar or $\\neg$</td><td>Flips 0↔1</td></tr>
</tbody></table>
<p>In Boolean algebra, $+$ means OR, not arithmetic plus. Read $\\bar A$ as “not A”.</p>
<div class="example"><h3>Worked example</h3>
<p>$A=1,B=0$: $A\\cdot B=0$, $A+B=1$, $\\bar A=0$. Convert $10110_2$: $16+4+2=22_{10}$.</p></div>
<ul class="takeaways"><li>Binary weights are powers of 2.</li><li>AND, OR, NOT are the primitives.</li><li>Boolean $+$ means OR.</li></ul>`,
    problems: [
      { id: 'dig-u1-bin2dec', title: 'Binary to decimal', kind: 'numeric',
        gen(r){ const n=r.int(5,31); const bin=n.toString(2); return {prompt:String.raw`Convert the binary number ${bin}_2$ to decimal. Enter the decimal value.`,answers:[ans('n','N',n,'')],hints:['Add place values where bits are 1.'],solution:String.raw`<p>$${bin}_2=${n}_{10}$</p>`}; } },
      { id: 'dig-u1-dec2bin-bits', title: 'Bits needed for N', kind: 'numeric',
        gen(r){ const n=r.pick([5,6,7,9,10,12,14,15,17,20,25,31]); return {prompt:String.raw`How many bits are needed to represent ${n}$ as an unsigned binary integer with no leading zeros? Enter the bit count.`,answers:[ans('b','b',n.toString(2).length,'')],hints:['Convert and count digits.'],solution:String.raw`<p>${n.toString(2)} → ${n.toString(2).length} bits</p>`}; } },
      { id: 'dig-u1-range', title: 'Unsigned range', kind: 'numeric',
        gen(r){ const n=r.pick([3,4,5,6,8]); return {prompt:String.raw`What is the maximum unsigned integer value that fits in ${n}$ bits? Enter that maximum.`,answers:[ans('m','M',2**n-1,'')],hints:['2^n − 1'],solution:String.raw`<p>$2^{${n}}-1=${2**n-1}$</p>`}; } },
      { id: 'dig-u1-bool', title: 'Evaluate AND/OR', kind: 'numeric',
        gen(r){ const A=r.int(0,1),B=r.int(0,1); const mode=r.pick(['and','or']); const v=mode==='and'?(A&B):(A|B); return {prompt:String.raw`Given $A=${A}$ and $B=${B}$, evaluate $A\\ ${mode==='and'?'\\cdot':'+'}\\ B$ (Boolean). Enter 0 or 1.`,answers:[ans('y','Y',v,'')],hints:[mode.toUpperCase()],solution:String.raw`<p>${v}</p>`}; } },
      { id: 'dig-u1-mc', title: 'Concepts: binary & Boolean', kind: 'mc',
        gen: mcPool([
          {q:'A bit can be…',correct:'0 or 1',wrong:['any integer','only 1','a float'],why:'Binary digit.'},
          {q:'In Boolean algebra, A+B means…',correct:'OR',wrong:['arithmetic sum always','AND','exclusive divide'],why:'+ is OR.'},
          {q:'8-bit unsigned max is…',correct:'255',wrong:['128','256','127'],why:'2^8−1.'},
        ]) },
    ],
  },
  {
    num: 2, slug: 'gates-truth', title: 'Logic Gates & Truth Tables',
    blurb: 'NAND, NOR, XOR, truth tables, and reading gate schematics.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Gates are the LEGO bricks of digital chips. A <strong>truth table</strong> lists every input combination and the output. NAND = NOT(AND); NOR = NOT(OR); XOR is 1 when inputs differ.</p>
<table class="tbl"><thead><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th><th>NAND</th></tr></thead><tbody>
<tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
<tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
</tbody></table>
<p>NAND (and NOR) are <strong>functionally complete</strong>: you can build any Boolean function from NAND alone.</p>
<div class="example"><h3>Worked example</h3>
<p>$F=A\\cdot\\bar B + \\bar A\\cdot B$ is exactly XOR. For $A=1,B=1$: $F=0$.</p></div>
<ul class="takeaways"><li>Truth tables exhaust 2^n rows for n inputs.</li><li>XOR detects difference.</li><li>NAND/NOR can rebuild everything.</li></ul>`,
    problems: [
      { id: 'dig-u2-xor', title: 'XOR value', kind: 'numeric',
        gen(r){ const A=r.int(0,1),B=r.int(0,1); return {prompt:String.raw`Given $A=${A}$ and $B=${B}$, find $A\\oplus B$ (XOR). Enter 0 or 1.`,answers:[ans('y','Y',A^B,'')],hints:['1 iff different'],solution:String.raw`<p>${A^B}</p>`}; } },
      { id: 'dig-u2-nand', title: 'NAND value', kind: 'numeric',
        gen(r){ const A=r.int(0,1),B=r.int(0,1); return {prompt:String.raw`Given $A=${A}$ and $B=${B}$, evaluate NAND $\\overline{A\\cdot B}$. Enter 0 or 1.`,answers:[ans('y','Y',+(!(A&&B)),'')],hints:['NOT of AND'],solution:String.raw`<p>${+(!(A&&B))}</p>`}; } },
      { id: 'dig-u2-rows', title: 'Truth-table rows', kind: 'numeric',
        gen(r){ const n=r.pick([2,3,4,5]); return {prompt:String.raw`A truth table has ${n}$ input variables. How many rows does it need? Enter the row count.`,answers:[ans('r','R',2**n,'')],hints:['2^n'],solution:String.raw`<p>$2^{${n}}=${2**n}$</p>`}; } },
      { id: 'dig-u2-mc', title: 'Concepts: gates', kind: 'mc',
        gen: mcPool([
          {q:'XOR is 1 when…',correct:'inputs differ',wrong:['both 1 only','both 0 only','never'],why:'Exclusive.'},
          {q:'NAND(1,1) equals…',correct:'0',wrong:['1','Z','X'],why:'NOT AND.'},
          {q:'Functionally complete gate (alone)…',correct:'NAND (or NOR)',wrong:['AND alone','buffer alone','wire alone'],why:'Can build NOT/AND/OR.'},
        ]) },
    ],
  },
  {
    num: 3, slug: 'combinational', title: 'Combinational Building Blocks',
    blurb: 'Adders, muxes, decoders — outputs depend only on current inputs.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p><strong>Combinational</strong> logic has no memory: outputs are functions of inputs now. A <strong>half adder</strong> adds two bits → sum $S=A\\oplus B$, carry $C=A\\cdot B$. A <strong>full adder</strong> also takes carry-in. An $n$-bit ripple adder chains full adders.</p>
<p>A <strong>multiplexer (mux)</strong> selects one of several inputs using select bits. A $2^k$-to-1 mux needs $k$ select lines. A <strong>decoder</strong> turns an $n$-bit code into one of $2^n$ one-hot lines.</p>
<div class="example"><h3>Worked example</h3>
<p>Half adder $A=1,B=1$: $S=0$, $C=1$ (binary two). 4-to-1 mux → 2 select bits.</p></div>
<ul class="takeaways"><li>Combinational = no stored state.</li><li>Half adder: XOR + AND.</li><li>Mux selects; decoder expands.</li></ul>`,
    problems: [
      { id: 'dig-u3-half-sum', title: 'Half-adder sum', kind: 'numeric',
        gen(r){ const A=r.int(0,1),B=r.int(0,1); return {prompt:String.raw`For a half adder with inputs $A=${A}$ and $B=${B}$, find the sum bit $S$. Enter 0 or 1.`,answers:[ans('S','S',A^B,'')],hints:['XOR'],solution:String.raw`<p>${A^B}</p>`}; } },
      { id: 'dig-u3-half-carry', title: 'Half-adder carry', kind: 'numeric',
        gen(r){ const A=r.int(0,1),B=r.int(0,1); return {prompt:String.raw`For a half adder with inputs $A=${A}$ and $B=${B}$, find the carry bit $C$. Enter 0 or 1.`,answers:[ans('C','C',A&B,'')],hints:['AND'],solution:String.raw`<p>${A&B}</p>`}; } },
      { id: 'dig-u3-mux-sel', title: 'Mux select bits', kind: 'numeric',
        gen(r){ const k=r.pick([2,3,4]); const inputs=2**k; return {prompt:String.raw`A ${inputs}$-to-1 multiplexer needs how many select bits? Enter the number of select lines.`,answers:[ans('k','k',k,'')],hints:['log2(inputs)'],solution:String.raw`<p>${k}</p>`}; } },
      { id: 'dig-u3-dec-out', title: 'Decoder outputs', kind: 'numeric',
        gen(r){ const n=r.pick([2,3,4]); return {prompt:String.raw`An ${n}$-to-$2^{n}$ decoder has how many output lines? Enter the count.`,answers:[ans('o','O',2**n,'')],hints:['2^n'],solution:String.raw`<p>${2**n}</p>`}; } },
      { id: 'dig-u3-mc', title: 'Concepts: combinational', kind: 'mc',
        gen: mcPool([
          {q:'Combinational logic…',correct:'has outputs determined only by current inputs',wrong:['always stores past inputs','needs a clock by definition','cannot use XOR'],why:'No memory.'},
          {q:'Full adder inputs…',correct:'A, B, and carry-in',wrong:['only A','clock and reset only','eight bits always'],why:'Three bits in.'},
        ]) },
    ],
  },
  {
    num: 4, slug: 'sequential', title: 'Latches, Flip-Flops & Counters',
    blurb: 'Memory elements, edge-triggered FFs, and simple binary counters.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p><strong>Sequential</strong> logic has state: outputs depend on inputs <em>and</em> history. An SR latch remembers; a <strong>D flip-flop</strong> captures $D$ on a clock edge and holds $Q$. A chain of T or D flip-flops makes a <strong>binary counter</strong>: after $N$ bits, it rolls over every $2^N$ clocks.</p>
<p>Setup/hold times: $D$ must be stable around the capturing edge. Metastability is what happens when you violate that — avoid async inputs into clocks without synchronizers.</p>
<div class="example"><h3>Worked example</h3>
<p>3-bit counter: states $000\\to001\\to\\ldots\\to111\\to000$ — period 8. After 5 clocks from 000 you are at $101_2=5$.</p></div>
<ul class="takeaways"><li>FF stores one bit synchronized to a clock.</li><li>$N$-bit counter period $2^N$.</li><li>Sequential ≠ combinational.</li></ul>`,
    problems: [
      { id: 'dig-u4-period', title: 'Counter period', kind: 'numeric',
        gen(r){ const n=r.pick([2,3,4,5,8]); return {prompt:String.raw`An ${n}$-bit binary counter returns to its start after how many distinct states? Enter the period.`,answers:[ans('p','P',2**n,'')],hints:['2^n'],solution:String.raw`<p>${2**n}</p>`}; } },
      { id: 'dig-u4-state', title: 'Counter value after k clocks', kind: 'numeric',
        gen(r){ const n=r.pick([3,4]); const k=r.int(1,2**n-1); return {prompt:String.raw`An ${n}$-bit binary counter starts at 0. After ${k}$ clock pulses, what decimal value does it show? Enter the value.`,answers:[ans('v','v',k%(2**n),'')],hints:['mod 2^n'],solution:String.raw`<p>${k%(2**n)}</p>`}; } },
      { id: 'dig-u4-bits-store', title: 'Bits in register', kind: 'numeric',
        gen(r){ const w=r.pick([4,8,16,32]); return {prompt:String.raw`A ${w}$-bit register stores how many bits? Enter the width.`,answers:[ans('b','b',w,'')],hints:['Width = bit count'],solution:String.raw`<p>${w}</p>`}; } },
      { id: 'dig-u4-mc', title: 'Concepts: sequential', kind: 'mc',
        gen: mcPool([
          {q:'A D flip-flop…',correct:'captures D on a clock edge and holds Q',wrong:['is purely combinational','never needs a clock','only stores when D=0'],why:'Edge-triggered memory.'},
          {q:'Sequential logic…',correct:'depends on history/state',wrong:['ignores past always','forbids clocks','is only analog'],why:'Memory.'},
        ]) },
    ],
  },
  {
    num: 5, slug: 'hex-twos', title: 'Hex, Bytes & Two’s Complement',
    blurb: 'Hex shorthand, byte size, and signed integers with two’s complement.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p><strong>Hexadecimal</strong> (base 16) digits 0–9,A–F each map to 4 bits. $0\\text{x}2A=42_{10}$. A <strong>byte</strong> is 8 bits. <strong>Two’s complement</strong> represents signed integers: for $n$ bits, range $-2^{n-1}\\ldots 2^{n-1}-1$. Negate by invert bits then add 1. The high bit is the sign (1 ⇒ negative).</p>
<div class="example"><h3>Worked example</h3>
<p>8-bit: $-1$ is $11111111_2$. $00000101_2=5$; $-5$ → invert $11111010$ +1 → $11111011_2$.</p></div>
<ul class="takeaways"><li>1 hex digit = 4 bits; 2 hex digits = 1 byte.</li><li>Two’s complement: invert + 1.</li><li>Sign bit is MSB.</li></ul>`,
    problems: [
      { id: 'dig-u5-hex', title: 'Hex to decimal', kind: 'numeric',
        gen(r){ const n=r.int(10,255); return {prompt:String.raw`Convert hexadecimal $\\mathrm{0x}${n.toString(16).toUpperCase()}$ to decimal. Enter the decimal value.`,answers:[ans('n','N',n,'')],hints:['16×high + low'],solution:String.raw`<p>${n}</p>`}; } },
      { id: 'dig-u5-bytes', title: 'Bits in N bytes', kind: 'numeric',
        gen(r){ const b=r.pick([1,2,4,8]); return {prompt:String.raw`How many bits are in ${b}$ byte(s)? Enter the bit count.`,answers:[ans('x','x',b*8,'')],hints:['8 per byte'],solution:String.raw`<p>${b*8}</p>`}; } },
      { id: 'dig-u5-tmax', title: 'Two’s complement max', kind: 'numeric',
        gen(r){ const n=r.pick([4,5,8]); return {prompt:String.raw`In ${n}$-bit two’s complement, what is the largest positive integer? Enter that maximum.`,answers:[ans('m','M',2**(n-1)-1,'')],hints:['2^{n-1}−1'],solution:String.raw`<p>${2**(n-1)-1}</p>`}; } },
      { id: 'dig-u5-mc', title: 'Concepts: hex & signed', kind: 'mc',
        gen: mcPool([
          {q:'One hex digit represents…',correct:'4 bits',wrong:['8 bits','1 bit','16 bits'],why:'Nibble.'},
          {q:'In two’s complement, MSB=1 means…',correct:'the value is negative',wrong:['always zero','unsigned only','overflow forever'],why:'Sign bit.'},
        ]) },
    ],
  },
  {
    num: 6, slug: 'fsm-timing', title: 'Finite State Machines & Timing Intro',
    blurb: 'Mealy/Moore idea, state counting, and a gentle timing constraint.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>A <strong>finite state machine (FSM)</strong> is sequential logic with named states and transition rules. <strong>Moore</strong> outputs depend on state; <strong>Mealy</strong> outputs can depend on state and inputs. Design steps: list states → transition diagram → encode states → next-state/output logic → flip-flops.</p>
<p>Rough timing: clock period must be long enough for combinational delay between FFs ($T_{clk} \\ge t_{clk\\to q}+t_{logic}+t_{setup}$). If the clock is too fast, the chip misbehaves.</p>
<div class="example"><h3>Worked example</h3>
<p>Traffic light: states G,Y,R. 3 states need at least 2 bits to encode ($2^2=4\\ge3$).</p></div>
<ul class="takeaways"><li>FSM = states + transitions + outputs.</li><li>Bits to encode ≥ ceil(log2(#states)).</li><li>Clock must respect setup time.</li></ul>`,
    problems: [
      { id: 'dig-u6-encode', title: 'Bits to encode states', kind: 'numeric',
        gen(r){ const s=r.pick([3,4,5,6,7,8,9,16]); const bits=Math.ceil(Math.log2(s)); return {prompt:String.raw`What is the minimum number of bits needed to encode ${s}$ distinct FSM states? Enter the bit count.`,answers:[ans('b','b',bits,'')],hints:['ceil(log2 s)'],solution:String.raw`<p>${bits}</p>`}; } },
      { id: 'dig-u6-period', title: 'Min clock period', kind: 'numeric',
        gen(r){ const cq=r.pick([1,2]),logic=r.pick([3,4,5,6]),su=r.pick([1,2]); return {prompt:String.raw`Given $t_{\\mathrm{clk}\\to q}=${cq}$ ns, $t_{logic}=${logic}$ ns, and $t_{setup}=${su}$ ns, find the minimum clock period $T_{clk}$ in ns. Enter $T_{clk}$.`,answers:[ans('T','T',cq+logic+su,'ns')],hints:['sum the three'],solution:String.raw`<p>${cq+logic+su} ns</p>`}; } },
      { id: 'dig-u6-mc', title: 'Concepts: FSM & timing', kind: 'mc',
        gen: mcPool([
          {q:'Moore outputs depend on…',correct:'current state',wrong:['only future inputs','the PCB color','RNG'],why:'State→output.'},
          {q:'If T_clk is too small…',correct:'setup may fail / wrong values captured',wrong:['power always drops to zero','FSMs become combinational','hex turns into decimal'],why:'Timing violation.'},
        ]) },
    ],
  },
];
