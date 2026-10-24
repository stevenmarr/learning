'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool, sind, cosd } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  // ===== COLLEGE ALGEBRA =====
  {
    num: 1, slug: 'alg-functions', title: 'College Algebra: Functions & Graphs',
    blurb: 'Function notation, domain thinking, linear and quadratic shapes.',
    level: 'alg',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Calculus is the study of change in functions. First: what a function <em>is</em>. $f(x)$ reads “f of x” — the output when the input is $x$. It is not $f$ times $x$.</p>
<h2>Linear and quadratic</h2>
$$y = mx + b, \qquad y = ax^2 + bx + c$$
<p>Slope $m$ is rise/run. A parabola opens up if $a>0$. Vertex of $ax^2+bx+c$ at $x=-b/(2a)$.</p>
<div class="example"><h3>Worked example</h3>
<p>$f(x)=2x+3$: $f(4)=11$. $g(x)=x^2-4x$: vertex at $x=2$, $g(2)=-4$.</p></div>
<ul class="takeaways"><li>$f(x)$ means “apply f to x.”</li><li>Linear: constant slope.</li><li>Quadratic vertex at $-b/(2a)$.</li></ul>`,
    problems: [
      { id: 'math-u1-eval', title: 'Evaluate f(x)', kind: 'numeric',
        gen(r) {
          const m = r.int(1, 5), b = r.int(-5, 8), x = r.int(-3, 6);
          const y = m * x + b;
          return { prompt: String.raw`$f(x)=${m}x${b<0?b:'+'+b}$. Find $f(${x})$.`, answers: [ans('y', 'f(x)', y, '')], hints: ['Substitute x, then arithmetic.'], solution: String.raw`<p>$f(${x})=${y}$</p>` };
        } },
      { id: 'math-u1-slope', title: 'Slope between points', kind: 'numeric',
        gen(r) {
          const x1 = r.int(-3, 3), y1 = r.int(-5, 5), x2 = x1 + r.int(1, 4), y2 = y1 + r.int(-6, 6);
          const m = (y2 - y1) / (x2 - x1);
          return { prompt: String.raw`Slope through $(${x1},${y1})$ and $(${x2},${y2})$?`, answers: [ans('m', 'm', m, '')], hints: [String.raw`$m=\\Delta y/\\Delta x$.`], solution: String.raw`<p>$m=${fmt(m)}$</p>` };
        } },
      { id: 'math-u1-vertex', title: 'Parabola vertex x', kind: 'numeric',
        gen(r) {
          const a = r.pick([1, 2, -1, -2]), b = r.int(-6, 6), c = r.int(-5, 5);
          const xv = -b / (2 * a);
          return { prompt: String.raw`$y=${a}x^2${b<0?b:'+'+b}x${c<0?c:'+'+c}$. $x$-coordinate of the vertex?`, answers: [ans('x', 'x', xv, '')], hints: [String.raw`$x=-b/(2a)$.`], solution: String.raw`<p>$x=${fmt(xv)}$</p>` };
        } },
      { id: 'math-u1-mc', title: 'Concept check: functions', kind: 'mc',
        gen: mcPool([
          { q: 'f(x) means…', correct: 'the output of f at input x', wrong: ['f times x', 'the inverse of f', 'f to the power x'], why: 'Function notation, not multiplication.' },
          { q: 'A function assigns…', correct: 'exactly one output to each allowed input', wrong: ['many outputs to one input always', 'no outputs', 'only integers'], why: 'Vertical-line idea.' },
          { q: 'Slope of a line is…', correct: 'rise over run', wrong: ['run over rise', 'always positive', 'the y-intercept'], why: 'm = Δy/Δx.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'alg-equations', title: 'College Algebra: Equations & Systems',
    blurb: 'Solving linear equations and 2×2 systems — the algebra statics uses constantly.',
    level: 'alg',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Equilibrium equations are linear systems. Comfort with $ax+b=c$ and two equations in two unknowns pays off in every engineering course.</p>
<h2>One variable</h2>
<p>Undo operations symmetrically. Check by substitution.</p>
<h2>2×2 systems</h2>
<p>Substitution or elimination. Example: $2x+y=5$, $x-y=1$ → add → $3x=6$ → $x=2$, $y=1$.</p>
<ul class="takeaways"><li>Do the same to both sides.</li><li>Elimination cancels a variable.</li><li>Always check in both equations.</li></ul>`,
    problems: [
      { id: 'math-u2-linear', title: 'Solve ax+b=c', kind: 'numeric',
        gen(r) {
          const a = r.int(2, 9), x = r.int(-5, 8), b = r.int(-10, 10), c = a * x + b;
          return { prompt: String.raw`Solve $${a}x${b<0?b:'+'+b}=${c}$.`, answers: [ans('x', 'x', x, '')], hints: ['Isolate x.'], solution: String.raw`<p>$x=${x}$</p>` };
        } },
      { id: 'math-u2-sys', title: '2×2 system', kind: 'numeric',
        gen(r) {
          const x = r.int(1, 5), y = r.int(1, 5);
          const a1 = 1, b1 = 1, c1 = x + y;
          const a2 = 1, b2 = -1, c2 = x - y;
          return { prompt: String.raw`Solve $\\begin{cases}x+y=${c1}\\\\ x-y=${c2}\\end{cases}$. Enter $x$.`, answers: [ans('x', 'x', x, '')], hints: ['Add the equations to eliminate y.'], solution: String.raw`<p>$x=${x}$, $y=${y}$</p>` };
        } },
      { id: 'math-u2-sys-y', title: '2×2 system (find y)', kind: 'numeric',
        gen(r) {
          const x = r.int(1, 6), y = r.int(-3, 6);
          const c1 = 2 * x + y, c2 = x + y;
          return { prompt: String.raw`Solve $\\begin{cases}2x+y=${c1}\\\\ x+y=${c2}\\end{cases}$. Enter $y$.`, answers: [ans('y', 'y', y, '')], hints: ['Subtract after aligning.'], solution: String.raw`<p>$x=${x}$, $y=${y}$</p>` };
        } },
      { id: 'math-u2-mc', title: 'Concept check: equations', kind: 'mc',
        gen: mcPool([
          { q: 'Elimination works by…', correct: 'adding multiples so a variable cancels', wrong: ['guessing', 'graphing only', 'taking derivatives'], why: 'Cancel one unknown.' },
          { q: 'If both sides of an equation are multiplied by 2…', correct: 'solutions stay the same', wrong: ['all solutions double', 'no solutions remain', 'it becomes quadratic'], why: 'Equivalent equation.' },
          { q: 'A 2×2 linear system typically has…', correct: 'one solution (intersecting lines)', wrong: ['always none', 'always infinitely many', 'three solutions'], why: 'Generic case: unique intersection.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'alg-exp-log', title: 'College Algebra: Exponentials & Logs',
    blurb: 'Exponent rules and logarithms as inverses — prep for growth models and DE.',
    level: 'alg',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Radioactive decay, RC circuits, and interest all use $a^x$. Logarithms undo exponentials: $\\log_b(b^x)=x$.</p>
<h2>Rules</h2>
$$a^m a^n=a^{m+n}, \\quad (a^m)^n=a^{mn}, \\quad \\log(xy)=\\log x+\\log y$$
<p>Natural log $\\ln$ is log base $e\\approx2.718$.</p>
<ul class="takeaways"><li>Logs undo exponentials.</li><li>Add exponents when multiplying same base.</li><li>$\\ln$ is log base $e$.</li></ul>`,
    problems: [
      { id: 'math-u3-exp', title: 'Simplify exponent product', kind: 'numeric',
        gen(r) {
          const a = r.int(2, 5), m = r.int(1, 4), n = r.int(1, 4);
          return { prompt: String.raw`Simplify $${a}^{${m}}\\cdot ${a}^{${n}}$ and enter the exponent of $${a}$ (so answer $k$ means $${a}^k$).`, answers: [ans('k', 'k', m + n, '')], hints: ['Add exponents.'], solution: String.raw`<p>$k=${m+n}$</p>` };
        } },
      { id: 'math-u3-log', title: 'Log as inverse', kind: 'numeric',
        gen(r) {
          const b = r.pick([2, 3, 5, 10]), k = r.int(1, 4), n = b ** k;
          return { prompt: String.raw`$\\log_{${b}}(${n})=?$`, answers: [ans('x', 'x', k, '')], hints: [String.raw`$b^x=n$.`], solution: String.raw`<p>$x=${k}$</p>` };
        } },
      { id: 'math-u3-growth', title: 'Exponential evaluation', kind: 'numeric',
        gen(r) {
          const a = r.pick([2, 3]), t = r.int(1, 5), y = a ** t;
          return { prompt: String.raw`$y=$${a}$^{t}$. Find $y$ when $t=${t}$.`, answers: [ans('y', 'y', y, '')], hints: ['Repeated multiply.'], solution: String.raw`<p>$y=${y}$</p>` };
        } },
      { id: 'math-u3-mc', title: 'Concept check: exp/log', kind: 'mc',
        gen: mcPool([
          { q: 'ln means log base…', correct: 'e (≈2.718)', wrong: ['10', '2', 'π'], why: 'Natural logarithm.' },
          { q: 'log_b(b^x) equals…', correct: 'x', wrong: ['b', '0', 'b^x'], why: 'Logs invert exponentials.' },
          { q: 'a^m · a^n equals…', correct: 'a^{m+n}', wrong: ['a^{mn}', 'a^{m-n}', 'm+n'], why: 'Product rule for exponents.' },
        ]) },
    ],
  },
  // ===== CALC 1 =====
  {
    num: 4, slug: 'calc1-limits', title: 'Calculus 1: Limits & Continuity Idea',
    blurb: 'What a limit means in plain language, and why continuity matters.',
    level: 'calc1',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>The derivative is a limit. Read $\\lim_{x\\to a}f(x)=L$ as: “as $x$ approaches $a$, $f(x)$ approaches $L$.” $f(a)$ itself may differ or be undefined.</p>
<div class="example"><h3>Worked example</h3>
<p>$\\lim_{x\\to 2}(3x+1)=7$. Plug in when the function is a polynomial (continuous everywhere).</p></div>
<ul class="takeaways"><li>Limits describe approaching, not necessarily arriving.</li><li>Polynomials: substitute.</li><li>Continuity ≈ pencil never lifts (informal).</li></ul>`,
    problems: [
      { id: 'math-u4-lim-poly', title: 'Limit of a polynomial', kind: 'numeric',
        gen(r) {
          const a = r.int(1, 4), b = r.int(-3, 5), x0 = r.int(-2, 4);
          const L = a * x0 + b;
          return { prompt: String.raw`$\\lim_{x\\to ${x0}}(${a}x${b<0?b:'+'+b})=?$`, answers: [ans('L', 'L', L, '')], hints: ['Substitute for polynomials.'], solution: String.raw`<p>$L=${L}$</p>` };
        } },
      { id: 'math-u4-lim-quad', title: 'Limit of quadratic', kind: 'numeric',
        gen(r) {
          const x0 = r.int(-3, 3), L = x0 * x0 - 1;
          return { prompt: String.raw`$\\lim_{x\\to ${x0}}(x^2-1)=?$`, answers: [ans('L', 'L', L, '')], hints: ['Substitute.'], solution: String.raw`<p>$L=${L}$</p>` };
        } },
      { id: 'math-u4-mc', title: 'Concept check: limits', kind: 'mc',
        gen: mcPool([
          { q: 'A limit as x→a…', correct: 'describes values approaching a, not necessarily f(a)', wrong: ['always equals f(a)', 'never exists', 'requires integration'], why: 'Approach ≠ arrive.' },
          { q: 'For a polynomial, lim x→a f(x)…', correct: 'equals f(a)', wrong: ['is always 0', 'does not exist', 'equals f\'(a)'], why: 'Polynomials are continuous.' },
          { q: 'If a limit equals 5…', correct: 'outputs get arbitrarily close to 5 near a', wrong: ['f(a) must be 5', 'the derivative is 5', 'the integral is 5'], why: 'Definition idea.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'calc1-derivatives', title: 'Calculus 1: Derivatives as Rates',
    blurb: 'Definition idea, power rule, and reading f′(x) as instantaneous rate.',
    level: 'calc1',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>$f'(x)$ reads “f prime of x” — the instantaneous rate of change, slope of the tangent. Definition idea:</p>
$$f'(x)=\\lim_{h\\to 0}\\frac{f(x+h)-f(x)}{h}$$
<h2>Power rule</h2>
$$\\frac{d}{dx}x^n = n x^{n-1}$$
<p>Also $(cf)'=c f'$, $(f+g)'=f'+g'$.</p>
<div class="example"><h3>Worked example</h3>
<p>$f(x)=3x^4-2x$ → $f'(x)=12x^3-2$. At $x=1$, slope $=10$.</p></div>
<ul class="takeaways"><li>Derivative = instantaneous slope/rate.</li><li>Power rule: bring down the exponent.</li><li>Units: output-units per input-unit.</li></ul>`,
    problems: [
      { id: 'math-u5-power', title: 'Power rule coefficient', kind: 'numeric',
        gen(r) {
          const n = r.int(2, 6), c = r.int(1, 5);
          // derivative of c x^n is (c*n) x^{n-1}; ask for coefficient c*n
          return { prompt: String.raw`If $f(x)=${c}x^{${n}}$, then $f'(x)=A x^{${n-1}}$. What is $A$?`, answers: [ans('A', 'A', c * n, '')], hints: ['Multiply coefficient by exponent.'], solution: String.raw`<p>$A=${c*n}$</p>` };
        } },
      { id: 'math-u5-eval', title: 'Evaluate derivative', kind: 'numeric',
        gen(r) {
          const x0 = r.int(1, 4);
          // f = x^3 - 2x, f' = 3x^2 - 2
          const yp = 3 * x0 * x0 - 2;
          return { prompt: String.raw`$f(x)=x^3-2x$. Find $f'(${x0})$.`, answers: [ans('yp', "f'", yp, '')], hints: [String.raw`$f'=3x^2-2$.`], solution: String.raw`<p>$f'(${x0})=${yp}$</p>` };
        } },
      { id: 'math-u5-mc', title: 'Concept check: derivatives', kind: 'mc',
        gen: mcPool([
          { q: 'f′(x) measures…', correct: 'instantaneous rate of change of f', wrong: ['area under f', 'average value only', 'f(x)/x always'], why: 'Slope of tangent.' },
          { q: 'd/dx of x^5 is…', correct: '5x^4', wrong: ['x^4', '5x^5', 'x^6/6'], why: 'Power rule.' },
          { q: 'If f′(x)=0 at a point…', correct: 'the tangent is horizontal there', wrong: ['f is undefined', 'f must be zero', 'the limit fails'], why: 'Zero slope.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'calc1-applications', title: 'Calculus 1: Related Rates & Linearization',
    blurb: 'Using derivatives for approximation and related rates — engineering style.',
    level: 'calc1',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Engineers use derivatives to relate rates (“if radius grows at 2 cm/s, how fast does area grow?”) and to linearize: near $a$, $f(x)\\approx f(a)+f'(a)(x-a)$.</p>
<div class="example"><h3>Worked example</h3>
<p>$A=\\pi r^2$, $dA/dt=2\\pi r\\,dr/dt$. If $r=5$ and $dr/dt=0.1$, then $dA/dt=\\pi$.</p></div>
<ul class="takeaways"><li>Differentiate both sides with respect to $t$.</li><li>Linearization is the tangent-line model.</li></ul>`,
    problems: [
      { id: 'math-u6-lin', title: 'Linear approximation', kind: 'numeric',
        gen(r) {
          // f(x)=x^2 at a=3, approx f(3.1)
          const a = r.pick([2, 3, 4]), h = r.pick([0.1, 0.2]);
          const approx = a * a + 2 * a * h;
          return { prompt: String.raw`Use the tangent line to $f(x)=x^2$ at $x=${a}$ to approximate $f(${fmt(a+h)})$.`, answers: [ans('y', 'y', approx, '')], hints: [String.raw`$f'=2x$, so $f(a+h)\\approx a^2+2a h$.`], solution: String.raw`<p>$\\approx ${fmt(approx)}$</p>` };
        } },
      { id: 'math-u6-rate', title: 'Related rate (circle area)', kind: 'numeric',
        gen(r) {
          const rr = r.pick([2, 3, 4, 5]), dr = r.pick([0.1, 0.2, 0.5]);
          const dA = 2 * Math.PI * rr * dr;
          return { prompt: String.raw`$A=\\pi r^2$. If $r=${rr}$ and $dr/dt=${dr}$, find $dA/dt$ (use $\\pi\\approx3.1416$).`, answers: [ans('dA', 'dA/dt', dA, '')], hints: [String.raw`$dA/dt=2\\pi r\\,dr/dt$.`], solution: String.raw`<p>$dA/dt=${fmt(dA)}$</p>` };
        } },
      { id: 'math-u6-mc', title: 'Concept check: applications', kind: 'mc',
        gen: mcPool([
          { q: 'Linearization uses…', correct: 'the tangent line at a point', wrong: ['the second derivative only', 'Riemann sums', 'complex numbers'], why: 'Local straight-line model.' },
          { q: 'Related rates problems…', correct: 'differentiate both sides with respect to time', wrong: ['integrate both sides always', 'set derivatives to zero always', 'avoid the chain rule'], why: 'Chain rule in time.' },
          { q: 'If r increases and A=πr²…', correct: 'A increases faster when r is larger', wrong: ['dA/dt is constant', 'A decreases', 'rate independent of r'], why: '2πr factor grows with r.' },
        ]) },
    ],
  },
  // ===== CALC 2 =====
  {
    num: 7, slug: 'calc2-integrals', title: 'Calculus 2: Integrals as Accumulation',
    blurb: 'Antiderivatives, definite integrals, and the idea of area/net change.',
    level: 'calc2',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>The integral adds up little pieces. $\\int_a^b f(x)\\,dx$ reads “integral from a to b of f of x dx” — signed area / net accumulation. Fundamental Theorem: if $F'=f$, then $\\int_a^b f=F(b)-F(a)$.</p>
$$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1}+C \\quad (n\\neq -1)$$
<ul class="takeaways"><li>Integral accumulates.</li><li>FTC links derivatives and integrals.</li><li>$dx$ marks the variable.</li></ul>`,
    problems: [
      { id: 'math-u7-anti', title: 'Antiderivative coefficient', kind: 'numeric',
        gen(r) {
          const n = r.int(1, 5);
          // ∫ x^n = x^{n+1}/(n+1); ask for denominator n+1 in the coefficient of x^{n+1}
          return { prompt: String.raw`$\\int x^{${n}}\\,dx = \\frac{1}{k}x^{${n+1}}+C$. What is $k$?`, answers: [ans('k', 'k', n + 1, '')], hints: ['k = n+1.'], solution: String.raw`<p>$k=${n+1}$</p>` };
        } },
      { id: 'math-u7-def', title: 'Definite integral of x', kind: 'numeric',
        gen(r) {
          const a = r.int(0, 2), b = a + r.int(2, 5);
          const val = 0.5 * (b * b - a * a);
          return { prompt: String.raw`$\\int_{${a}}^{${b}} x\\,dx=?$`, answers: [ans('I', 'I', val, '')], hints: [String.raw`$\\int x=x^2/2$.`], solution: String.raw`<p>$I=${fmt(val)}$</p>` };
        } },
      { id: 'math-u7-mc', title: 'Concept check: integrals', kind: 'mc',
        gen: mcPool([
          { q: 'A definite integral primarily measures…', correct: 'net accumulation / signed area', wrong: ['instantaneous slope', 'a limit that never exists', 'only probability'], why: 'Area under curve idea.' },
          { q: 'If F′=f, then ∫_a^b f equals…', correct: 'F(b)−F(a)', wrong: ['F(a)−F(b)', 'F(a)F(b)', 'F\'(b)'], why: 'Fundamental Theorem.' },
          { q: 'dx in an integral…', correct: 'marks the variable of integration', wrong: ['means divide by x', 'is always 1', 'cancels f(x)'], why: 'With respect to x.' },
        ]) },
    ],
  },
  {
    num: 8, slug: 'calc2-techniques', title: 'Calculus 2: Substitution & Applications',
    blurb: 'u-substitution idea and average value — tools you will reuse in DE and physics.',
    level: 'calc2',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>u-sub</strong> is the chain rule backwards. Average value on $[a,b]$:</p>
$$f_{\\mathrm{avg}}=\\frac{1}{b-a}\\int_a^b f(x)\\,dx$$
<ul class="takeaways"><li>Pick $u$ = inside of a composition.</li><li>Average value = integral / width.</li></ul>`,
    problems: [
      { id: 'math-u8-avg', title: 'Average value of linear f', kind: 'numeric',
        gen(r) {
          const a = 0, b = r.pick([2, 4, 5, 10]);
          // f(x)=x on [0,b], avg = b/2
          return { prompt: String.raw`Average value of $f(x)=x$ on $[0,${b}]$?`, answers: [ans('m', 'f_{avg}', b / 2, '')], hints: [String.raw`$\\frac{1}{b}\\int_0^b x\\,dx=b/2$.`], solution: String.raw`<p>${b/2}</p>` };
        } },
      { id: 'math-u8-sub', title: 'Power after sub (conceptual numeric)', kind: 'numeric',
        gen(r) {
          const n = r.int(2, 5);
          // ∫ 2x (x^2+1)^n dx → u=x^2+1, result (u^{n+1})/(n+1); ask n+1
          return { prompt: String.raw`For $\\int 2x(x^2+1)^{${n}}\\,dx$, with $u=x^2+1$, the antiderivative is $\\frac{u^{k}}{k}+C$. What is $k$?`, answers: [ans('k', 'k', n + 1, '')], hints: ['Power increases by 1.'], solution: String.raw`<p>$k=${n+1}$</p>` };
        } },
      { id: 'math-u8-mc', title: 'Concept check: calc2 tools', kind: 'mc',
        gen: mcPool([
          { q: 'u-substitution undoes…', correct: 'the chain rule', wrong: ['the product rule only', 'matrix inversion', 'Boolean OR'], why: 'Composite functions.' },
          { q: 'Average value formula divides the integral by…', correct: 'the width (b−a)', wrong: ['the midpoint only', 'f(a)', 'zero'], why: 'Mean height.' },
          { q: '∫_a^a f(x) dx equals…', correct: '0', wrong: ['1', 'f(a)', '∞'], why: 'Zero width.' },
        ]) },
    ],
  },
  // ===== CALC 3 =====
  {
    num: 9, slug: 'calc3-vectors', title: 'Calculus 3: Vectors in Space',
    blurb: '3D vectors, dot products, and equations of lines — the language of multivariable calc.',
    level: 'calc3',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Statics already used $\\mathbf i,\\mathbf j,\\mathbf k$. Calc 3 extends this: lines, planes, and vector-valued paths $\\mathbf r(t)$.</p>
$$\\mathbf a\\cdot\\mathbf b = a_xb_x+a_yb_y+a_zb_z = |\\mathbf a||\\mathbf b|\\cos\\theta$$
<ul class="takeaways"><li>Dot product → angles and projections.</li><li>Position vector $\\mathbf r(t)$ traces a path.</li></ul>`,
    problems: [
      { id: 'math-u9-dot', title: 'Dot product', kind: 'numeric',
        gen(r) {
          const a = [r.int(-3, 4), r.int(-3, 4), r.int(-3, 4)];
          const b = [r.int(-3, 4), r.int(-3, 4), r.int(-3, 4)];
          const d = a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
          return { prompt: String.raw`$\\mathbf a=\\langle ${a.join(',')}\\rangle$, $\\mathbf b=\\langle ${b.join(',')}\\rangle$. Find $\\mathbf a\\cdot\\mathbf b$.`, answers: [ans('d', 'a\\cdot b', d, '')], hints: ['Multiply matching components; add.'], solution: String.raw`<p>${d}</p>` };
        } },
      { id: 'math-u9-mag', title: 'Vector magnitude', kind: 'numeric',
        gen(r) {
          const x = r.pick([3, 4, 5, 6, 8]), y = r.pick([4, 3, 12, 8]);
          // use 3-4-5 family sometimes
          const pairs = [[3,4],[5,12],[8,15],[7,24]];
          const [A,B] = r.pick(pairs);
          const mag = Math.hypot(A, B);
          return { prompt: String.raw`Magnitude of $\\langle ${A},${B}\\rangle$?`, answers: [ans('m', '|v|', mag, '')], hints: [String.raw`$\\sqrt{x^2+y^2}$.`], solution: String.raw`<p>${fmt(mag)}</p>` };
        } },
      { id: 'math-u9-mc', title: 'Concept check: vectors', kind: 'mc',
        gen: mcPool([
          { q: 'a·b = 0 means…', correct: 'vectors are perpendicular (if nonzero)', wrong: ['parallel always', 'same length', 'zero vectors only'], why: 'cos θ = 0 → 90°.' },
          { q: 'A unit vector has magnitude…', correct: '1', wrong: ['0', '∞', 'equal to its angle'], why: 'Length 1.' },
          { q: 'r(t) as a vector function…', correct: 'traces a curve as t varies', wrong: ['is always constant', 'is a scalar only', 'cannot be differentiated'], why: 'Path in space.' },
        ]) },
    ],
  },
  {
    num: 10, slug: 'calc3-partial', title: 'Calculus 3: Partial Derivatives',
    blurb: 'Holding one variable fixed — slopes on a surface.',
    level: 'calc3',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>For $z=f(x,y)$, the partial $\\partial f/\\partial x$ (read “partial f partial x”) differentiates treating $y$ as constant. It is the slope of the surface in the $x$-direction.</p>
<div class="example"><h3>Worked example</h3>
<p>$f(x,y)=x^2 y$: $f_x=2xy$, $f_y=x^2$.</p></div>
<ul class="takeaways"><li>Partial = one variable at a time.</li><li>Notation $\\partial$ signals multivariable.</li></ul>`,
    problems: [
      { id: 'math-u10-fx', title: 'Partial fx', kind: 'numeric',
        gen(r) {
          const a = r.int(1, 4), b = r.int(1, 4), x = r.int(1, 3), y = r.int(1, 3);
          // f = a x^2 y + b y, fx = 2 a x y
          const fx = 2 * a * x * y;
          return { prompt: String.raw`$f(x,y)=${a}x^2 y + ${b}y$. Find $f_x(${x},${y})$.`, answers: [ans('fx', 'f_x', fx, '')], hints: ['Treat y constant; derivative in x.'], solution: String.raw`<p>$f_x=2\\cdot${a} x y$ → ${fx}</p>` };
        } },
      { id: 'math-u10-fy', title: 'Partial fy', kind: 'numeric',
        gen(r) {
          const x = r.int(1, 4), y = r.int(1, 4);
          // f = x y^2, fy = 2 x y
          return { prompt: String.raw`$f(x,y)=x y^2$. Find $f_y(${x},${y})$.`, answers: [ans('fy', 'f_y', 2 * x * y, '')], hints: ['Treat x constant.'], solution: String.raw`<p>${2*x*y}</p>` };
        } },
      { id: 'math-u10-mc', title: 'Concept check: partials', kind: 'mc',
        gen: mcPool([
          { q: '∂f/∂x means…', correct: 'differentiate in x treating other vars constant', wrong: ['integrate in x', 'set x=0', 'full gradient always'], why: 'Partial derivative.' },
          { q: 'On z=f(x,y), f_x is…', correct: 'slope in the x-direction', wrong: ['always the maximum slope', 'the area', 'independent of f'], why: 'Directional along x.' },
          { q: 'The symbol ∂ (partial)…', correct: 'signals a partial derivative', wrong: ['means multiply by pi', 'is the same as d always', 'means discrete difference only'], why: 'Multivariable notation.' },
        ]) },
    ],
  },
  // ===== DE =====
  {
    num: 11, slug: 'de-first-order', title: 'Diff Eq: First-Order Separable & Linear',
    blurb: 'Differential equations as models; separable growth/decay and integrating factors idea.',
    level: 'de',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>A <strong>differential equation</strong> relates a function to its derivatives. Example: $y'=ky$ models exponential growth/decay. Solution $y=y_0 e^{kt}$.</p>
<p><strong>Separable:</strong> $dy/dx=g(x)h(y)$ → $\\int dy/h = \\int g\\,dx$.</p>
<div class="tip"><strong>Reading $y'$.</strong> Same as $dy/dx$ — derivative of $y$ with respect to the independent variable (often $x$ or $t$).</div>
<ul class="takeaways"><li>DE = model for rates.</li><li>$y'=ky$ → exponentials.</li><li>Separate variables when possible.</li></ul>`,
    problems: [
      { id: 'math-u11-exp', title: 'Exponential growth value', kind: 'numeric',
        gen(r) {
          const y0 = r.pick([10, 20, 50, 100]), k = r.pick([0.1, 0.2, 0.5]), t = r.pick([1, 2, 3]);
          const y = y0 * Math.exp(k * t);
          return { prompt: String.raw`$y'=ky$ with $y(0)=${y0}$, $k=${k}$. Find $y(${t})$ (use $e^{${fmt(k*t)}}$).`, answers: [ans('y', 'y', y, '')], hints: [String.raw`$y=y_0 e^{kt}$.`], solution: String.raw`<p>$y=${fmt(y)}$</p>` };
        } },
      { id: 'math-u11-halflife', title: 'Half-life remaining', kind: 'numeric',
        gen(r) {
          const y0 = r.pick([80, 100, 200]), n = r.pick([1, 2, 3]);
          const y = y0 / (2 ** n);
          return { prompt: String.raw`A quantity starts at $${y0}$ and halves every half-life. After $${n}$ half-lives, how much remains?`, answers: [ans('y', 'y', y, '')], hints: ['Divide by 2 each half-life.'], solution: String.raw`<p>$y=${y}$</p>` };
        } },
      { id: 'math-u11-mc', title: 'Concept check: first-order DE', kind: 'mc',
        gen: mcPool([
          { q: 'y′ = ky has solutions that are…', correct: 'exponentials', wrong: ['always lines', 'only polynomials', 'sines only'], why: 'Growth/decay.' },
          { q: 'Separable means…', correct: 'you can collect y with dy and x with dx', wrong: ['the DE is linear always', 'no solution exists', 'coefficients are constant only'], why: 'dy/h(y)=g(x)dx.' },
          { q: 'In y′ = ky, if k<0…', correct: 'solutions decay toward 0', wrong: ['solutions grow', 'solutions oscillate always', 'no real solutions'], why: 'Negative growth rate.' },
        ]) },
    ],
  },
  {
    num: 12, slug: 'de-second-order', title: 'Diff Eq: Second-Order Constant Coefficient',
    blurb: 'Characteristic equation idea for y″+by′+cy=0 — springs and circuits.',
    level: 'de',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Mass-spring and RLC circuits lead to $y''+by'+cy=0$. Guess $y=e^{rt}$; the <strong>characteristic equation</strong> $r^2+br+c=0$ decides over/under/critical damping.</p>
<ul class="takeaways"><li>Characteristic equation from exponential trial.</li><li>Two real roots → overdamped sum of exponentials.</li><li>Complex roots → oscillation (underdamped).</li></ul>`,
    problems: [
      { id: 'math-u12-char', title: 'Characteristic root sum', kind: 'numeric',
        gen(r) {
          const r1 = r.int(-5, -1), r2 = r.int(-5, -1);
          // (r-r1)(r-r2)=r^2-(r1+r2)r+r1 r2 → for y'' - (r1+r2)y' + ... 
          // Ask: for r^2 - (r1+r2)r + r1 r2 = 0, sum of roots
          return { prompt: String.raw`Characteristic equation $(r-${r1})(r-${r2})=0$. Sum of roots $r_1+r_2$?`, answers: [ans('s', 's', r1 + r2, '')], hints: ['Add the roots.'], solution: String.raw`<p>${r1+r2}</p>` };
        } },
      { id: 'math-u12-disc', title: 'Discriminant sign class', kind: 'numeric',
        gen(r) {
          // y'' + b y' + c y = 0; discriminant b^2-4c; return 1 overdamped, 0 critical, -1 under
          const kind = r.pick(['over', 'crit', 'under']);
          let b, c, code;
          if (kind === 'over') { b = 5; c = 4; code = 1; } // 25-16>0
          else if (kind === 'crit') { b = 4; c = 4; code = 0; } // 16-16=0
          else { b = 2; c = 5; code = -1; } // 4-20<0
          return { prompt: String.raw`For $y''+${b}y'+${c}y=0$, enter $1$ if overdamped (two real roots), $0$ if critically damped, $-1$ if underdamped (complex roots).`, answers: [ans('k', 'k', code, '')], hints: [String.raw`Look at $b^2-4c$.`], solution: String.raw`<p>Discriminant ${b*b-4*c} → code ${code}</p>` };
        } },
      { id: 'math-u12-mc', title: 'Concept check: 2nd order DE', kind: 'mc',
        gen: mcPool([
          { q: 'Characteristic equation comes from trying…', correct: 'y = e^{rt}', wrong: ['y = r^t only', 'y = sin only always', 'y = constant only'], why: 'Exponential trial solution.' },
          { q: 'Underdamped free response…', correct: 'oscillates while decaying (typically)', wrong: ['never crosses zero', 'grows without bound always', 'is a straight line'], why: 'Complex roots → sinusoid × exponential.' },
          { q: 'y″ means…', correct: 'second derivative of y', wrong: ['y squared', '1/y', 'integral of y'], why: 'Prime/double-prime notation.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('math'), units);
