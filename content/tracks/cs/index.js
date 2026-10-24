'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'comp-thinking', title: 'Computational Thinking',
    blurb: 'Decomposition, patterns, abstraction, and algorithms — how engineers think before they type.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>CS 101 here is not a syntax class. The goal is <strong>computational thinking</strong>: breaking problems into pieces, spotting patterns, hiding detail behind clean interfaces, and writing step-by-step procedures anyone (or any machine) can follow.</p>
<h2>Four pillars</h2>
<ol>
<li><strong>Decomposition</strong> — split a hard problem into smaller ones you can solve.</li>
<li><strong>Pattern recognition</strong> — reuse structure you've seen before.</li>
<li><strong>Abstraction</strong> — ignore irrelevant detail; name the idea that matters.</li>
<li><strong>Algorithms</strong> — finite, unambiguous sequences of steps that terminate.</li>
</ol>
<div class="example"><h3>Worked example: watering schedule</h3>
<p>Farm task: water 12 goat pens if soil moisture &lt; 30%. Decomposition: (1) read sensor, (2) decide, (3) open valve, (4) log. Abstraction: “pen” hides hose layout. Algorithm: for each pen, if dry then water 2 minutes.</p></div>
<ul class="takeaways"><li>Think before syntax.</li><li>Algorithms must be finite, clear, and terminating.</li><li>Abstraction is a feature, not laziness.</li></ul>`,
    problems: [
      { id: 'cs-u1-steps', title: 'Count algorithm steps', kind: 'numeric',
        gen(r) {
          const n = r.int(3, 12);
          // loop i from 1 to n doing 1 step each, plus 2 setup
          const steps = 2 + n;
          return {
            prompt: String.raw`An algorithm does 2 setup steps, then one step for each of $${n}$ items. How many steps total?`,
            answers: [ans('s', 'S', steps, '')],
            hints: ['Setup + one per item.'],
            solution: String.raw`<p>$2+${n}=${steps}$</p>`,
          };
        } },
      { id: 'cs-u1-decomp', title: 'Decomposition pieces', kind: 'numeric',
        gen(r) {
          const n = r.pick([3, 4, 5, 6]);
          return {
            prompt: String.raw`You decompose “build a weather station” into $${n}$ subproblems of similar size. Roughly what fraction of the original difficulty is each piece (as a percent), if work splits evenly?`,
            answers: [ans('p', 'p', 100 / n, '%')],
            hints: ['Even split → 100%/n.'],
            solution: String.raw`<p>$100/${n}=${fmt(100 / n)}\\%$</p>`,
          };
        } },
      { id: 'cs-u1-mc', title: 'Concept check: thinking', kind: 'mc',
        gen: mcPool([
          { q: 'Abstraction means…', correct: 'hiding detail behind a useful name/interface', wrong: ['writing longer code', 'avoiding math', 'using a faster computer'], why: 'Focus on what matters; hide the rest.' },
          { q: 'A good algorithm must…', correct: 'be finite, unambiguous, and terminate', wrong: ['use recursion', 'be written in Python', 'never use memory'], why: 'Those three properties define an algorithm.' },
          { q: 'Decomposition is…', correct: 'breaking a problem into smaller parts', wrong: ['sorting data', 'compiling code', 'encrypting input'], why: 'Split to conquer.' },
        ]) },
      { id: 'cs-u1-trace', title: 'Trace a simple loop', kind: 'numeric',
        gen(r) {
          const start = r.int(1, 5), n = r.int(3, 6);
          let x = start;
          for (let i = 1; i <= n; i++) x += i;
          const add = n * (n + 1) / 2;
          return {
            prompt: String.raw`Start with $x=${start}$. For $i=1,2,\ldots,${n}$, do $x \leftarrow x+i$. Final $x$?`,
            answers: [ans('x', 'x', x, '')],
            hints: [String.raw`You add $1+2+\cdots+${n}=${add}$.`],
            solution: String.raw`<ol class="steps"><li>Add $1+\cdots+${n}=${add}$</li><li>$x=${start}+${add}=${x}$</li></ol>`,
          };
        } },
    ],
  },
  {
    num: 2, slug: 'algorithms', title: 'Algorithms: Search & Sort Thinking',
    blurb: 'Linear vs binary search, why sorting helps, and comparing strategies — without coding syntax.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Two ways to find a name in a phone book: flip page by page (<strong>linear search</strong>), or jump to the middle and discard half each time (<strong>binary search</strong> — needs sorted data).</p>
<h2>Linear search</h2>
<p>Check up to $n$ items. Worst case: $n$ comparisons.</p>
<h2>Binary search</h2>
<p>Each step halves the remaining range. Worst case about $\log_2 n$ comparisons. Read “log base 2 of n” — how many times you can cut $n$ in half before you hit 1.</p>
<div class="example"><h3>Worked example</h3>
<p>$n=1024$ sorted items. Binary search needs at most $10$ probes because $2^{10}=1024$. Linear search could need $1024$.</p></div>
<ul class="takeaways"><li>Sorted structure unlocks faster search.</li><li>Halving → logarithmic steps.</li><li>Pick the algorithm to match the data.</li></ul>`,
    problems: [
      { id: 'cs-u2-linear', title: 'Linear search worst case', kind: 'numeric',
        gen(r) {
          const n = r.pick([10, 25, 50, 100, 200, 500]);
          return {
            prompt: String.raw`Linear search in a list of $${n}$ items: worst-case number of comparisons?`,
            answers: [ans('c', 'C', n, '')],
            hints: ['May have to check every item.'],
            solution: String.raw`<p>$C=${n}$</p>`,
          };
        } },
      { id: 'cs-u2-binary', title: 'Binary search probes', kind: 'numeric',
        gen(r) {
          const k = r.pick([4, 5, 6, 7, 8, 9, 10]);
          const n = 2 ** k;
          return {
            prompt: String.raw`Sorted list of $${n}$ items ($2^{${k}}$). About how many probes for binary search in the worst case?`,
            answers: [ans('p', 'p', k, '')],
            hints: [String.raw`About $\log_2 n$.`],
            solution: String.raw`<p>$\\log_2 ${n}=${k}$</p>`,
          };
        } },
      { id: 'cs-u2-halves', title: 'How many halvings', kind: 'numeric',
        gen(r) {
          const n = r.pick([50, 100, 200, 500, 1000]);
          const h = Math.ceil(Math.log2(n));
          return {
            prompt: String.raw`Starting from $${n}$ items, how many times can you halve (rounding up) until one item remains? (ceil log₂)`,
            answers: [ans('h', 'h', h, '')],
            hints: [String.raw`$\\lceil\\log_2 n\\rceil$.`],
            solution: String.raw`<p>${h}</p>`,
          };
        } },
      { id: 'cs-u2-mc', title: 'Concept check: algorithms', kind: 'mc',
        gen: mcPool([
          { q: 'Binary search requires…', correct: 'sorted (ordered) data', wrong: ['hash tables', 'graphics', 'unsorted data only'], why: 'Halving needs a total order.' },
          { q: 'Linear search worst case grows…', correct: 'proportional to n', wrong: ['proportional to log n', 'constant', 'proportional to n² always'], why: 'Up to n checks.' },
          { q: 'log₂(1024) equals…', correct: '10', wrong: ['8', '12', '1024'], why: '2^10=1024.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'data-abstraction', title: 'Data, Representation & Abstraction',
    blurb: 'How information is structured: lists, maps, trees — as ideas, not code libraries.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Choosing how to <strong>represent</strong> information often matters more than micro-optimizing loops. A phone book as an unsorted list vs a sorted list vs a dictionary (map) changes what is easy.</p>
<h2>Core structures (conceptual)</h2>
<ul>
<li><strong>List / array:</strong> ordered sequence; find-by-position is easy; find-by-value may scan.</li>
<li><strong>Map / dictionary:</strong> keys → values; lookup by key is the point.</li>
<li><strong>Tree:</strong> hierarchical; filesystem folders; fast search if balanced.</li>
<li><strong>Graph:</strong> nodes and edges; roads, circuits, social nets.</li>
</ul>
<p><strong>Interface vs implementation:</strong> “a queue” can be an array or a linked list underneath — callers only need enqueue/dequeue.</p>
<ul class="takeaways"><li>Representation drives algorithm choice.</li><li>Think in interfaces.</li><li>Graphs model connections.</li></ul>`,
    problems: [
      { id: 'cs-u3-index', title: 'Array index access', kind: 'numeric',
        gen(r) {
          const n = r.int(5, 20), i = r.int(0, n - 1);
          return {
            prompt: String.raw`A 0-based list holds $${n}$ sensor readings. What is a valid index for the last element?`,
            answers: [ans('i', 'i', n - 1, '')],
            hints: ['Last index is length − 1 when indexing from 0.'],
            solution: String.raw`<p>$i=${n - 1}$</p>`,
          };
        } },
      { id: 'cs-u3-pairs', title: 'Map entries', kind: 'numeric',
        gen(r) {
          const n = r.int(3, 12);
          return {
            prompt: String.raw`A map stores pen-ID → moisture for $${n}$ pens (one entry each). How many keys?`,
            answers: [ans('k', 'k', n, '')],
            hints: ['One key per pen.'],
            solution: String.raw`<p>$k=${n}$</p>`,
          };
        } },
      { id: 'cs-u3-edges', title: 'Edges in a simple path', kind: 'numeric',
        gen(r) {
          const n = r.int(3, 10);
          return {
            prompt: String.raw`A path visits $${n}$ distinct barns in order (no repeats). How many road segments (edges) are in that path?`,
            answers: [ans('e', 'e', n - 1, '')],
            hints: ['A path with n nodes has n−1 edges.'],
            solution: String.raw`<p>$e=${n - 1}$</p>`,
          };
        } },
      { id: 'cs-u3-mc', title: 'Concept check: data', kind: 'mc',
        gen: mcPool([
          { q: 'Best structure for “lookup value by name”?', correct: 'map/dictionary', wrong: ['unsorted list only', 'a single integer', 'a truth table'], why: 'Keys → values is the map job.' },
          { q: 'A filesystem folder tree is naturally a…', correct: 'tree', wrong: ['flat boolean', 'single bit', 'random number'], why: 'Hierarchy = tree.' },
          { q: 'Interface vs implementation:', correct: 'callers depend on operations, not internals', wrong: ['they are the same', 'interfaces are slower always', 'only OOP languages have this'], why: 'Abstraction boundary.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'complexity', title: 'Efficiency & Complexity Thinking',
    blurb: 'Big-picture cost: constant, linear, log, quadratic — when “good enough” algorithms matter.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>On a microcontroller or a huge dataset, a slow approach isn't just elegant — it fails. We classify growth with <strong>big-O style thinking</strong> (informal here): how does work scale as input size $n$ grows?</p>
<h2>Common classes</h2>
<table class="tbl"><thead><tr><th>Class</th><th>Rough meaning</th><th>Example</th></tr></thead><tbody>
<tr><td>$O(1)$</td><td>Constant work</td><td>Read index 0</td></tr>
<tr><td>$O(\\log n)$</td><td>Halving</td><td>Binary search</td></tr>
<tr><td>$O(n)$</td><td>Proportional to $n$</td><td>Linear scan</td></tr>
<tr><td>$O(n^2)$</td><td>Nested loops over $n$</td><td>Compare all pairs</td></tr>
</tbody></table>
<p>Read $O(n^2)$ as “order n-squared” — if $n$ grows $10\\times$, work grows about $100\\times$.</p>
<div class="example"><h3>Worked example</h3>
<p>All pairs among 100 sensors: ~$100^2=10{,}000$ comparisons. Among 1{,}000: ~$1{,}000{,}000$.</p></div>
<ul class="takeaways"><li>Ask how work scales with $n$.</li><li>Logs beat linear; linear beats quadratic for large $n$.</li><li>Constants matter in engineering too — but class comes first.</li></ul>`,
    problems: [
      { id: 'cs-u4-pairs', title: 'All-pairs comparisons', kind: 'numeric',
        gen(r) {
          const n = r.pick([5, 8, 10, 12, 20]);
          return {
            prompt: String.raw`Comparing every unordered pair among $${n}$ items takes how many comparisons? (Use $\\binom{n}{2}=n(n-1)/2$.)`,
            answers: [ans('c', 'C', n * (n - 1) / 2, '')],
            hints: [String.raw`$n(n-1)/2$.`],
            solution: String.raw`<p>${n}*${n - 1}/2=${n * (n - 1) / 2}</p>`,
          };
        } },
      { id: 'cs-u4-scale', title: 'Quadratic scale factor', kind: 'numeric',
        gen(r) {
          const k = r.pick([2, 3, 4, 5, 10]);
          return {
            prompt: String.raw`An $O(n^2)$ algorithm: if $n$ grows by $${k}\\times$, work grows by about what factor?`,
            answers: [ans('f', 'f', k * k, '')],
            hints: ['Square the growth factor.'],
            solution: String.raw`<p>$${k}^2=${k * k}$</p>`,
          };
        } },
      { id: 'cs-u4-ratio', title: 'Linear vs binary cost ratio', kind: 'numeric',
        gen(r) {
          const k = r.pick([6, 7, 8, 9, 10]);
          const n = 2 ** k;
          return {
            prompt: String.raw`For $n=${n}$, worst-case linear comparisons over binary probes ($\\log_2 n$): what is the ratio (linear/binary)?`,
            answers: [ans('r', 'r', n / k, '')],
            hints: [String.raw`$n / \\log_2 n$.`],
            solution: String.raw`<p>${n}/${k}=${n / k}</p>`,
          };
        } },
      { id: 'cs-u4-mc', title: 'Concept check: complexity', kind: 'mc',
        gen: mcPool([
          { q: 'Binary search cost class…', correct: 'O(log n)', wrong: ['O(n)', 'O(n²)', 'O(1) always'], why: 'Halving each step.' },
          { q: 'Nested loop i=1..n, j=1..n is typically…', correct: 'O(n²)', wrong: ['O(n)', 'O(log n)', 'O(1)'], why: 'About n² iterations.' },
          { q: 'For huge n, which is preferable?', correct: 'O(n) over O(n²)', wrong: ['O(n²) over O(n)', 'always O(n²)', 'complexity never matters'], why: 'Linear scales better.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('cs'), units);
