'use strict';
const { fmt, q, ans, mcPool } = require('../../helpers');

module.exports = [
  {
    num: 1, slug: 'comp-thinking', title: 'Computational Thinking',
    blurb: 'Decomposition, patterns, abstraction, and algorithms — think before you type.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>CS principles start before syntax. <strong>Computational thinking</strong> means breaking problems into pieces, spotting patterns, hiding detail behind clean interfaces, and writing step-by-step procedures a human or machine can follow.</p>
<h2>Four pillars</h2>
<ol>
<li><strong>Decomposition</strong> — split a hard problem into smaller ones.</li>
<li><strong>Pattern recognition</strong> — reuse structure you’ve seen before.</li>
<li><strong>Abstraction</strong> — ignore irrelevant detail; name what matters.</li>
<li><strong>Algorithms</strong> — finite, unambiguous sequences that terminate.</li>
</ol>
<div class="example"><h3>Worked example: watering schedule</h3>
<p>Task: water 12 pens if moisture &lt; 30%. Decompose: read sensor → decide → open valve → log. Abstraction: “pen” hides hose layout. Algorithm: for each pen, if dry then water 2 minutes.</p></div>
<ul class="takeaways"><li>Think before syntax.</li><li>Algorithms: finite, clear, terminating.</li><li>Abstraction is a feature.</li></ul>`,
    problems: [
      { id: 'cs-u1-steps', title: 'Count algorithm steps', kind: 'numeric',
        gen(r){ const n=r.int(3,12); return {prompt:String.raw`2 setup steps, then 1 step for each of $${n}$ items. Total steps?`,answers:[ans('s','S',2+n,'')],hints:['Setup + one per item'],solution:String.raw`<p>${2+n}</p>`}; } },
      { id: 'cs-u1-decomp', title: 'Even split fraction', kind: 'numeric',
        gen(r){ const n=r.pick([3,4,5,6]); return {prompt:String.raw`Split a job into $${n}$ equal subproblems. Each is what % of the whole?`,answers:[ans('p','p',100/n,'%')],hints:['100/n'],solution:String.raw`<p>${fmt(100/n)}%</p>`}; } },
      { id: 'cs-u1-mc', title: 'Concept check: thinking', kind: 'mc',
        gen: mcPool([
          {q:'Abstraction means…',correct:'hiding detail behind a useful name/interface',wrong:['writing longer code','avoiding math','using a faster computer'],why:'Focus on what matters.'},
          {q:'A good algorithm must…',correct:'be finite, unambiguous, and terminate',wrong:['use recursion','be written in Python','never use memory'],why:'Three properties.'},
          {q:'Decomposition is…',correct:'breaking a problem into smaller parts',wrong:['sorting data','compiling code','encrypting input'],why:'Split to conquer.'},
        ]) },
    ],
  },
  {
    num: 2, slug: 'algorithms', title: 'Algorithms: Search, Sort & Correctness',
    blurb: 'Linear vs binary search, sorting intuition, and checking that a procedure works.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>An algorithm is a recipe with guarantees. <strong>Linear search</strong> checks items one-by-one — up to $n$ looks in a list of $n$. <strong>Binary search</strong> on a sorted list halves the remaining range each step — about $\\log_2 n$ looks. Sorting puts data in order so binary search (and humans) can work.</p>
<p><strong>Correctness</strong>: does it always give the right answer? <strong>Termination</strong>: does it stop? Trace a tiny example by hand before trusting code.</p>
<div class="example"><h3>Worked example</h3>
<p>Find 7 in sorted $[1,3,5,7,9]$: mid=5 → go right → mid=7 → found in 2 steps. Linear might need 4.</p></div>
<ul class="takeaways"><li>Sorted + binary search ≫ linear for large $n$.</li><li>Trace small cases.</li><li>Wrong algorithms can “feel” fine on lucky data.</li></ul>`,
    problems: [
      { id: 'cs-u2-linear-worst', title: 'Linear search worst case', kind: 'numeric',
        gen(r){ const n=r.pick([5,8,10,20,50]); return {prompt:String.raw`Worst-case comparisons to find an item in an unsorted list of $${n}$ (linear search)?`,answers:[ans('c','c',n,'')],hints:['May check every item'],solution:String.raw`<p>${n}</p>`}; } },
      { id: 'cs-u2-binary', title: 'Binary search steps (approx)', kind: 'numeric',
        gen(r){ const n=r.pick([8,16,32,64,128]); const steps=Math.ceil(Math.log2(n)); return {prompt:String.raw`About how many steps for binary search on $${n}$ sorted items? (ceil of $\\log_2 n$)`,answers:[ans('s','s',steps,'')],hints:['ceil(log2 n)'],solution:String.raw`<p>${steps}</p>`}; } },
      { id: 'cs-u2-mc', title: 'Concepts: algorithms', kind: 'mc',
        gen: mcPool([
          {q:'Binary search requires…',correct:'sorted (ordered) data',wrong:['random data only','no comparisons','infinite memory'],why:'Halving assumes order.'},
          {q:'An algorithm that never stops is…',correct:'incorrect as an algorithm (must terminate)',wrong:['always optimal','called a compiler','fine if fast at first'],why:'Termination required.'},
        ]) },
      { id: 'cs-u2-swap', title: 'Swaps to sort 2 items', kind: 'numeric',
        gen(r){ return {prompt:String.raw`List $[2,1]$. Minimum swaps of adjacent items to sort ascending?`,answers:[ans('s','s',1,'')],hints:['One swap'],solution:String.raw`<p>1</p>`}; } },
    ],
  },
  {
    num: 3, slug: 'data-abstraction', title: 'Data, Variables & Abstraction',
    blurb: 'Types, lists vs maps intuition, and APIs as contracts.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Programs store values in <strong>variables</strong>. A <strong>type</strong> says what operations make sense (integer vs text vs true/false). A <strong>list</strong> (array) keeps an ordered sequence indexed from 0 in many languages. A <strong>map</strong> (dictionary) looks up by key.</p>
<p><strong>Abstraction barrier</strong>: callers use an interface (“enqueue”, “pop”) without knowing the guts. That’s how libraries and APIs stay usable when internals change.</p>
<div class="example"><h3>Worked example</h3>
<p>Goat IDs in a list: index 0 is first. Or map tag→name for quick lookup. Count of $n$ items: last index is $n-1$ if 0-based.</p></div>
<ul class="takeaways"><li>Types prevent nonsense operations.</li><li>0-based: last index = length−1.</li><li>APIs hide representation.</li></ul>`,
    problems: [
      { id: 'cs-u3-last-index', title: 'Last index (0-based)', kind: 'numeric',
        gen(r){ const n=r.int(3,20); return {prompt:String.raw`A 0-based list holds $${n}$ items. Index of the last item?`,answers:[ans('i','i',n-1,'')],hints:['n−1'],solution:String.raw`<p>${n-1}</p>`}; } },
      { id: 'cs-u3-bytes-ascii', title: 'ASCII-ish storage', kind: 'numeric',
        gen(r){ const n=r.int(4,12); return {prompt:String.raw`Store $${n}$ characters at 1 byte each. Bytes needed?`,answers:[ans('b','b',n,'')],hints:['1 each'],solution:String.raw`<p>${n}</p>`}; } },
      { id: 'cs-u3-mc', title: 'Concepts: data', kind: 'mc',
        gen: mcPool([
          {q:'A map/dictionary is best when…',correct:'you look up values by a key',wrong:['you only ever need the middle of a sorted array by position and nothing else','types are illegal','clocks are forbidden'],why:'Key→value.'},
          {q:'An API contract…',correct:'tells callers what they can rely on without internals',wrong:['is only comments nobody reads by law','requires assembly','forbids functions'],why:'Interface.'},
        ]) },
      { id: 'cs-u3-len', title: 'Length after appends', kind: 'numeric',
        gen(r){ const start=r.int(0,5),add=r.int(2,8); return {prompt:String.raw`List starts with $${start}$ items; append $${add}$ more. Length?`,answers:[ans('L','L',start+add,'')],hints:['Add'],solution:String.raw`<p>${start+add}</p>`}; } },
    ],
  },
  {
    num: 4, slug: 'complexity', title: 'Efficiency & Big-O Intuition',
    blurb: 'How runtime grows: constant, linear, quadratic, logarithmic — without heavy proofs.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Two correct algorithms can differ wildly as data grows. <strong>Big-O</strong> sketches growth: $O(1)$ constant, $O(\\log n)$ logarithmic (binary search), $O(n)$ linear, $O(n^2)$ quadratic (naive nested loops). For large $n$, the dominant term wins — constants matter in practice, but order of growth decides scalability.</p>
<div class="example"><h3>Worked example</h3>
<p>Nested loop $i=1..n$, $j=1..n$ → about $n^2$ iterations. Double $n$ → about $4\\times$ work for $O(n^2)$.</p></div>
<ul class="takeaways"><li>Ask: if $n$ doubles, what happens to time?</li><li>$O(n^2)$ hurts fast.</li><li>Prefer better growth when $n$ is huge.</li></ul>`,
    problems: [
      { id: 'cs-u4-nested', title: 'Nested loop iterations', kind: 'numeric',
        gen(r){ const n=r.pick([3,4,5,6,8,10]); return {prompt:String.raw`Outer and inner loops each run $${n}$ times. Total inner-body runs?`,answers:[ans('t','t',n*n,'')],hints:['n×n'],solution:String.raw`<p>${n*n}</p>`}; } },
      { id: 'cs-u4-double', title: 'Quadratic when n doubles', kind: 'numeric',
        gen(r){ const t=r.pick([10,20,50]); return {prompt:String.raw`An $O(n^2)$ algorithm takes $${t}$ ms at size $n$. Rough ms at size $2n$?`,answers:[ans('t','t',4*t,'ms')],hints:['(2n)² = 4n²'],solution:String.raw`<p>${4*t} ms</p>`}; } },
      { id: 'cs-u4-mc', title: 'Concepts: complexity', kind: 'mc',
        gen: mcPool([
          {q:'Binary search growth is…',correct:'O(log n)',wrong:['O(n²)','O(2^n) always','O(1) only'],why:'Halving.'},
          {q:'O(1) means…',correct:'time stays roughly constant as n grows',wrong:['instant forever on any machine','n²','never uses memory'],why:'Constant.'},
        ]) },
      { id: 'cs-u4-linear-double', title: 'Linear when n doubles', kind: 'numeric',
        gen(r){ const t=r.pick([12,25,40]); return {prompt:String.raw`$O(n)$ takes $${t}$ ms at size $n$. Rough ms at $2n$?`,answers:[ans('t','t',2*t,'ms')],hints:['Doubles'],solution:String.raw`<p>${2*t}</p>`}; } },
    ],
  },
  {
    num: 5, slug: 'debug-test', title: 'Debugging, Testing & Errors',
    blurb: 'Reproduce, isolate, fix; unit tests and reading error messages.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Real programmers spend serious time <strong>debugging</strong>. Habit loop: reproduce → read the error → form a hypothesis → change one thing → retest. A <strong>test</strong> is an automatic check: given input, expect output. Catch regressions early.</p>
<p>Categories: <strong>syntax</strong> errors (code won’t run), <strong>runtime</strong> errors (crashes), <strong>logic</strong> errors (runs but wrong). Print/log intermediate values. Bisect: comment half the change to find which half breaks.</p>
<div class="example"><h3>Worked example</h3>
<p>Function should return sum of list but returns product. Tests: $[]\\to0$, $[2,3]\\to5$. Failing test pins the bug faster than staring.</p></div>
<ul class="takeaways"><li>Reproduce first.</li><li>Tests document expected behavior.</li><li>Logic bugs are sneaky — assert often.</li></ul>`,
    problems: [
      { id: 'cs-u5-offby', title: 'Off-by-one length', kind: 'numeric',
        gen(r){ const n=r.int(5,15); return {prompt:String.raw`Loop uses indices $0..${n}$ inclusive on a 0-based list of length $${n}$. How many invalid index hits? (count indices ≥ length)`,answers:[ans('k','k',1,'')],hints:['Index n is out of range'],solution:String.raw`<p>Index ${n} invalid → 1</p>`}; } },
      { id: 'cs-u5-tests', title: 'Test cases count', kind: 'numeric',
        gen(r){ const edge=r.int(2,4),norm=r.int(2,5); return {prompt:String.raw`You plan $${edge}$ edge tests and $${norm}$ normal tests. Total test cases?`,answers:[ans('t','t',edge+norm,'')],hints:['Add'],solution:String.raw`<p>${edge+norm}</p>`}; } },
      { id: 'cs-u5-mc', title: 'Concepts: debug & test', kind: 'mc',
        gen: mcPool([
          {q:'A logic error…',correct:'runs but produces wrong results',wrong:['always prevents compiling','is only a hardware fault','means the keyboard is broken'],why:'Silent wrong.'},
          {q:'Best first debugging step…',correct:'reproduce the failure reliably',wrong:['rewrite everything randomly','delete the tests','ignore the message'],why:'Reproduce.'},
        ]) },
    ],
  },
  {
    num: 6, slug: 'internet-cyber', title: 'Internet, Data & Cyber Awareness',
    blurb: 'Packets, clients/servers, and basic privacy/security hygiene for CS principles.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>The internet moves <strong>packets</strong> of data between <strong>clients</strong> (your app) and <strong>servers</strong>. DNS names map to IP addresses. HTTPS encrypts traffic in transit (still trust the endpoints). Passwords: long, unique, stored as hashes on good servers — not shared across sites.</p>
<p><strong>Phishing</strong> tricks you into giving secrets. Verify links and senders. Backups beat tears. Public Wi‑Fi should not get your banking password without care (VPN/HTTPS help; judgment matters more).</p>
<div class="example"><h3>Worked example</h3>
<p>Fetch weather: client → DNS → server API → JSON packet back. If the site asks for your bank password “to check weather,” that’s phishing, not meteorology.</p></div>
<ul class="takeaways"><li>Client/server + packets.</li><li>HTTPS ≠ “site is honest,” but it encrypts the pipe.</li><li>Unique passwords; skepticism for urgent secret requests.</li></ul>`,
    problems: [
      { id: 'cs-u6-packets', title: 'Packet count (toy)', kind: 'numeric',
        gen(r){ const size=r.pick([3000,5000,8000,10000]),mtu=r.pick([1000,1500]); const n=Math.ceil(size/mtu); return {prompt:String.raw`Send $${size}$ bytes in chunks of up to $${mtu}$ bytes. Min packets?`,answers:[ans('p','p',n,'')],hints:['ceil(size/mtu)'],solution:String.raw`<p>${n}</p>`}; } },
      { id: 'cs-u6-mc', title: 'Concepts: internet & safety', kind: 'mc',
        gen: mcPool([
          {q:'HTTPS mainly…',correct:'encrypts data in transit between client and server',wrong:['guarantees the company is ethical','makes PDFs','removes the need for passwords forever'],why:'Transport security.'},
          {q:'Phishing is…',correct:'tricking someone into revealing secrets or installing malware',wrong:['a sorting algorithm','a type of RAM','compiling with -O3'],why:'Social engineering.'},
          {q:'A good password habit…',correct:'long, unique per site, stored in a manager when possible',wrong:['reuse one word everywhere','email it to strangers','share on public Wi‑Fi stickers'],why:'Hygiene.'},
        ]) },
      { id: 'cs-u6-bandwidth', title: 'Transfer time', kind: 'numeric',
        gen(r){ const mb=r.pick([10,20,50]),mbps=r.pick([5,10,25]); const sec=mb*8/mbps; return {prompt:String.raw`$${mb}$ megabytes at $${mbps}$ megabits/s. Seconds? (1 byte = 8 bits)`,answers:[ans('t','t',sec,'s')],hints:['bits = MB×8; ÷ Mbps'],solution:String.raw`<p>${fmt(sec)} s</p>`}; } },
    ],
  },
];
