'use strict';
const { fmt, q, ans, mcPool } = require('../../helpers');

module.exports = [
  {
    num: 1, slug: 'jh-fractions-ratios', title: 'Fractions, Equivalents & Ratios',
    blurb: 'Parts of a whole, equivalent fractions, simplifying, and farm-friendly ratios.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Fractions show up when you split feed, share chores, or read a recipe. $\\frac{a}{b}$ means $a$ equal parts when the whole is cut into $b$ pieces. <strong>Equivalent fractions</strong> name the same amount: multiply (or divide) top and bottom by the same nonzero number. A <strong>ratio</strong> $a:b$ compares two quantities — “2 scoops grain for every 3 scoops hay.”</p>
<h2>Simplify</h2>
<p>Divide numerator and denominator by their greatest common factor. $\\frac{6}{8}=\\frac{3}{4}$.</p>
<div class="example"><h3>Worked example</h3>
<p>You need $\\frac{2}{3}$ of a 12-cup bag of feed. $\\frac{2}{3}\\times 12 = 8$ cups. Ratio of water to concentrate $3:1$ for 4 cups concentrate → 12 cups water.</p></div>
<div class="tip"><strong>Sanity check:</strong> A proper fraction is less than 1. If your answer is bigger than the whole you started with, re-read the problem.</div>
<ul class="takeaways"><li>Same size, different names (equivalents).</li><li>Simplify by a common factor.</li><li>Ratios compare two quantities; keep units clear.</li></ul>`,
    problems: [
      { id: 'jh-u1-eq', title: 'Equivalent fraction', kind: 'numeric',
        gen(r){ const a=r.pick([1,2,3,4]); const den=a*2; const k=r.pick([2,3,4,5]); return {prompt:String.raw`$\\frac{${a}}{${den}}$ equals $\\frac{?}{${den*k}}$. Numerator?`,answers:[ans('n','n',a*k,'')],hints:['Multiply top and bottom by the same number.'],solution:String.raw`<p>Multiply by ${k}: numerator ${a*k}.</p>`}; } },
      { id: 'jh-u1-of', title: 'Fraction of a quantity', kind: 'numeric',
        gen(r){ const n=r.pick([1,2,3]),d=r.pick([2,3,4,5]),total=r.pick([12,18,20,24,30]); const ansV=(n/d)*total; return {prompt:String.raw`What is $\\frac{${n}}{${d}}$ of $${total}$?`,answers:[ans('x','x',ansV,'')],hints:['Multiply: (n/d)×total.'],solution:String.raw`<p>$\\frac{${n}}{${d}}\\times${total}=${fmt(ansV)}$</p>`}; } },
      { id: 'jh-u1-ratio', title: 'Ratio parts', kind: 'numeric',
        gen(r){ const a=r.int(2,5),b=r.int(2,5),parts=a+b,total=r.pick([parts*2,parts*3,parts*4]); const shareA=total*(a/parts); return {prompt:String.raw`Mix grain:hay in ratio $${a}:${b}$. Total $${total}$ scoops. How many scoops of grain?`,answers:[ans('g','g',shareA,'')],hints:['Grain gets a/(a+b) of the total.'],solution:String.raw`<p>Parts=${parts}; grain=${fmt(shareA)}.</p>`}; } },
      { id: 'jh-u1-mc', title: 'Concepts: fractions & ratios', kind: 'mc',
        gen: mcPool([
          {q:'1/2 of a dozen eggs is…',correct:'6',wrong:['2','12','24'],why:'Half of 12.'},
          {q:'A ratio 2:3 compares…',correct:'two quantities as two parts to three parts',wrong:['only subtraction','square roots','speed of light'],why:'Comparison.'},
          {q:'3/6 simplified is…',correct:'1/2',wrong:['3/3','6/3','2/6'],why:'Divide by 3.'},
        ]) },
    ],
  },
  {
    num: 2, slug: 'jh-percent-proportion', title: 'Percent, Decimals & Proportions',
    blurb: 'Percent means per hundred; set up proportions for recipes and growth.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p><strong>Percent</strong> means “per 100.” $25\\%=\\frac{25}{100}=0.25$. To find $p\\%$ of $N$: $\\frac{p}{100}\\times N$. A <strong>proportion</strong> says two ratios are equal: $\\frac{a}{b}=\\frac{c}{d}$. Cross-multiply to solve: $ad=bc$.</p>
<div class="example"><h3>Worked example</h3>
<p>$15\\%$ of 40 eggs cracked: $0.15\\times40=6$. Scale a recipe: if 2 cups flour serves 4, for 10 people need $\\frac{2}{4}=\\frac{x}{10}$ → $x=5$ cups.</p></div>
<ul class="takeaways"><li>% ↔ decimal: move the point two places.</li><li>“Of” often means multiply.</li><li>Proportions: cross-multiply carefully.</li></ul>`,
    problems: [
      { id: 'jh-u2-pct', title: 'Percent of a number', kind: 'numeric',
        gen(r){ const p=r.pick([10,15,20,25,40,50]),N=r.pick([20,40,60,80,100]); return {prompt:String.raw`What is $${p}\\%$ of $${N}$?`,answers:[ans('x','x',(p/100)*N,'')],hints:['(p/100)×N'],solution:String.raw`<p>${fmt((p/100)*N)}</p>`}; } },
      { id: 'jh-u2-prop', title: 'Scale a recipe', kind: 'numeric',
        gen(r){ const cups=r.pick([2,3,4]),serves=r.pick([4,6,8]),want=r.pick([10,12,16]); const x=cups*want/serves; return {prompt:String.raw`$${cups}$ cups flour serves $${serves}$. How many cups for $${want}$ people?`,answers:[ans('c','c',x,'cups')],hints:['cups/serves = x/want'],solution:String.raw`<p>${fmt(x)} cups</p>`}; } },
      { id: 'jh-u2-dec', title: 'Percent → decimal', kind: 'numeric',
        gen(r){ const p=r.pick([5,8,12,25,37,50,75]); return {prompt:String.raw`Write $${p}\\%$ as a decimal.`,answers:[ans('d','d',p/100,'')],hints:['Divide by 100.'],solution:String.raw`<p>${fmt(p/100)}</p>`}; } },
      { id: 'jh-u2-mc', title: 'Concepts: percent', kind: 'mc',
        gen: mcPool([
          {q:'50% means…',correct:'half / 0.5',wrong:['double','zero','only 50 items'],why:'Per hundred.'},
          {q:'Cross-multiplying a/b=c/d gives…',correct:'ad=bc',wrong:['a+b=c+d','ab=cd','a/d=b/c always wrong'],why:'Equality of products.'},
        ]) },
    ],
  },
  {
    num: 3, slug: 'jh-integers-order', title: 'Integers, Order of Operations & Expressions',
    blurb: 'Negative numbers, absolute value, and PEMDAS for reliable calculation.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Temperatures below freezing, account balances, and elevation use <strong>integers</strong> (…−2,−1,0,1,2…). Absolute value $|x|$ is distance from zero. <strong>Order of operations</strong> (PEMDAS): Parentheses, Exponents, Multiply/Divide left-to-right, Add/Subtract left-to-right.</p>
<div class="example"><h3>Worked example</h3>
<p>$3+4\\times2=3+8=11$ (not 14). $(-5)+8=3$. $|-7|=7$.</p></div>
<ul class="takeaways"><li>Multiply/divide before add/subtract.</li><li>Negative + positive: think number line.</li><li>Absolute value is never negative.</li></ul>`,
    problems: [
      { id: 'jh-u3-pemdas', title: 'PEMDAS', kind: 'numeric',
        gen(r){ const a=r.int(2,6),b=r.int(2,5),c=r.int(1,4); const v=a+b*c; return {prompt:String.raw`Evaluate $${a}+${b}\\times${c}$.`,answers:[ans('v','v',v,'')],hints:['Multiply first.'],solution:String.raw`<p>${b}×${c}=${b*c}; +${a} → ${v}</p>`}; } },
      { id: 'jh-u3-neg', title: 'Integer sum', kind: 'numeric',
        gen(r){ const a=-r.int(2,10),b=r.int(3,12); return {prompt:String.raw`Compute $${a}+(${b})$.`,answers:[ans('s','s',a+b,'')],hints:['Number line: start at a, move b right.'],solution:String.raw`<p>${a+b}</p>`}; } },
      { id: 'jh-u3-abs', title: 'Absolute value', kind: 'numeric',
        gen(r){ const x=-r.int(1,20); return {prompt:String.raw`What is $|${x}|$?`,answers:[ans('a','a',Math.abs(x),'')],hints:['Distance from 0.'],solution:String.raw`<p>${Math.abs(x)}</p>`}; } },
      { id: 'jh-u3-mc', title: 'Concepts: integers & order', kind: 'mc',
        gen: mcPool([
          {q:'In 2+3×4, do…',correct:'multiply first → 14',wrong:['add first → 20','square first','ignore ×'],why:'PEMDAS.'},
          {q:'|-3| equals…',correct:'3',wrong:['-3','0','1/3'],why:'Distance.'},
        ]) },
    ],
  },
  {
    num: 4, slug: 'jh-geo-measure', title: 'Area, Perimeter, Volume & Units',
    blurb: 'Pens, tanks, and fences — geometry that measures real space.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Rectangle area $A=L\\times W$; perimeter $P=2(L+W)$. Triangle $A=\\frac12 bh$. Rectangular prism (tank) volume $V=LWH$. Always name units (ft, ft², ft³). Convert carefully: 1 yd = 3 ft, so 1 yd² = 9 ft².</p>
<div class="example"><h3>Worked example</h3>
<p>Pen 10 ft by 6 ft: $A=60$ ft², $P=32$ ft. Water trough $2\\times1\\times1$ ft: $V=2$ ft³.</p></div>
<ul class="takeaways"><li>Area is 2D; volume is 3D.</li><li>Fence ≈ perimeter (plus gates).</li><li>Square units vs linear units — don’t mix.</li></ul>`,
    problems: [
      { id: 'jh-u4-area', title: 'Pen area', kind: 'numeric',
        gen(r){ const L=r.int(4,14),W=r.int(3,10); return {prompt:String.raw`Rectangle $${L}$ ft by $${W}$ ft. Area?`,answers:[ans('A','A',L*W,'ft²')],hints:['A=LW'],solution:String.raw`<p>${L*W} ft²</p>`}; } },
      { id: 'jh-u4-perim', title: 'Fence length', kind: 'numeric',
        gen(r){ const L=r.int(5,15),W=r.int(4,12); return {prompt:String.raw`Rectangular pen $${L}$ by $${W}$ ft. Perimeter (ft of fence if no gate)?`,answers:[ans('P','P',2*(L+W),'ft')],hints:['P=2(L+W)'],solution:String.raw`<p>${2*(L+W)} ft</p>`}; } },
      { id: 'jh-u4-vol', title: 'Tank volume', kind: 'numeric',
        gen(r){ const L=r.int(2,5),W=r.int(1,3),H=r.int(1,3); return {prompt:String.raw`Box tank $${L}\\times${W}\\times${H}$ ft. Volume?`,answers:[ans('V','V',L*W*H,'ft³')],hints:['V=LWH'],solution:String.raw`<p>${L*W*H} ft³</p>`}; } },
      { id: 'jh-u4-tri', title: 'Triangle area', kind: 'numeric',
        gen(r){ const b=r.int(4,12),h=r.int(3,10); return {prompt:String.raw`Triangle base $${b}$, height $${h}$. Area?`,answers:[ans('A','A',0.5*b*h,'')],hints:['½bh'],solution:String.raw`<p>${fmt(0.5*b*h)}</p>`}; } },
      { id: 'jh-u4-mc', title: 'Concepts: measure', kind: 'mc',
        gen: mcPool([
          {q:'Perimeter measures…',correct:'distance around',wrong:['space inside','how heavy','temperature'],why:'Path length.'},
          {q:'ft² is a unit of…',correct:'area',wrong:['length','volume','time'],why:'Two dimensions.'},
        ]) },
    ],
  },
  {
    num: 5, slug: 'jh-science-method', title: 'Science Habits: Observe, Measure & Test',
    blurb: 'Question → hypothesize → fair test → record — curiosity with a notebook.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>Science is organized curiosity. On a farm: watch the animals, ask why one is left out, change <strong>one</strong> thing carefully, write what happened. Being wrong once is data. A <strong>fair test</strong> keeps other conditions steady. Measurements need units and (when you can) repeats.</p>
<h2>Variables</h2>
<p><strong>Independent</strong> — what you change. <strong>Dependent</strong> — what you measure. <strong>Controlled</strong> — what you keep the same.</p>
<div class="example"><h3>Worked example</h3>
<p>Question: Does shade change how much water chickens drink? Independent: shade vs sun pen. Dependent: cups of water / day. Controlled: flock size, feed, weather day type if possible. Record for a week.</p></div>
<ul class="takeaways"><li>Observe → hypothesize → test → record → revise.</li><li>Change one main variable when you can.</li><li>Units and notes beat memory.</li></ul>`,
    problems: [
      { id: 'jh-u5-mean', title: 'Average of trials', kind: 'numeric',
        gen(r){ const a=r.int(4,10),b=r.int(4,10),c=r.int(4,10); return {prompt:String.raw`Three trials measured $${a}$, $${b}$, $${c}$ cm. Mean (average)?`,answers:[ans('m','m',(a+b+c)/3,'cm')],hints:['Sum ÷ 3'],solution:String.raw`<p>${fmt((a+b+c)/3)} cm</p>`}; } },
      { id: 'jh-u5-delta', title: 'Change in measurement', kind: 'numeric',
        gen(r){ const before=r.int(20,40),after=before+r.int(2,15); return {prompt:String.raw`Seedling was $${before}$ mm, later $${after}$ mm. Growth (mm)?`,answers:[ans('d','\\Delta',after-before,'mm')],hints:['after − before'],solution:String.raw`<p>${after-before} mm</p>`}; } },
      { id: 'jh-u5-mc', title: 'Scientific habits', kind: 'mc',
        gen: mcPool([
          {q:'A fair test usually changes…',correct:'one main variable while keeping others steady',wrong:['everything at once on purpose','nothing ever','only your opinion'],why:'Isolate cause.'},
          {q:'Writing results matters because…',correct:'memory fades and patterns appear on paper',wrong:['science forbids notes','goats read journals','only adults may write'],why:'Records.'},
          {q:'The dependent variable is…',correct:'what you measure as the outcome',wrong:['always temperature','what you never change','the hypothesis title only'],why:'Responds to the change.'},
        ]) },
    ],
  },
  {
    num: 6, slug: 'jh-rates-data', title: 'Rates, Time & Farm Math Missions',
    blurb: 'Speed, unit rates, elapsed time, and sticky word problems.',
    lesson: String.raw`<h2>Why this unit matters</h2>
<p>A <strong>rate</strong> compares different units (miles per hour, eggs per day). A <strong>unit rate</strong> has 1 in the denominator (dollars per 1 lb). Distance = rate × time when rate is steady. Elapsed time: subtract clock times carefully (borrow 60 minutes when needed).</p>
<div class="example"><h3>Worked example</h3>
<p>Walk 3 mph for 2 hours → 6 miles. 24 eggs in 3 days → 8 eggs/day. Feed: 5 scoops each for 8 birds → 40 scoops.</p></div>
<ul class="takeaways"><li>Rate × time = distance (same unit system).</li><li>Estimate before you calculate.</li><li>Label every answer with units.</li></ul>`,
    problems: [
      { id: 'jh-u6-dist', title: 'Distance = rate × time', kind: 'numeric',
        gen(r){ const rate=r.pick([2,3,4,5]),t=r.pick([2,3,4]); return {prompt:String.raw`Speed $${rate}$ mph for $${t}$ hours. Distance (miles)?`,answers:[ans('d','d',rate*t,'mi')],hints:['d=rt'],solution:String.raw`<p>${rate*t} mi</p>`}; } },
      { id: 'jh-u6-unitrate', title: 'Unit rate', kind: 'numeric',
        gen(r){ const eggs=r.pick([12,18,24,30]),days=r.pick([2,3,4,5]); return {prompt:String.raw`$${eggs}$ eggs in $${days}$ days. Eggs per day?`,answers:[ans('r','r',eggs/days,'eggs/day')],hints:['Divide total by days.'],solution:String.raw`<p>${fmt(eggs/days)}</p>`}; } },
      { id: 'jh-u6-feed', title: 'Feed scoops', kind: 'numeric',
        gen(r){ const scoops=r.int(2,5),birds=r.int(4,14); return {prompt:String.raw`Each bird gets $${scoops}$ scoops. $${birds}$ birds. Total scoops?`,answers:[ans('t','T',scoops*birds,'')],hints:['Multiply.'],solution:String.raw`<p>${scoops*birds}</p>`}; } },
      { id: 'jh-u6-time', title: 'Elapsed minutes', kind: 'numeric',
        gen(r){ const start=r.pick([8,9,10,13]),dur=r.pick([45,60,75,90]); return {prompt:String.raw`Chores start at $${start}:00$ and last $${dur}$ minutes. How many minutes past the start hour does the clock show when done? (Answer minutes 0–59 on the clock face, or total minutes if you finish exactly on an hour — enter the minute hand reading 0–59.)`,answers:[ans('m','m',dur%60,'')],hints:['dur mod 60.'],solution:String.raw`<p>Minute hand at ${dur%60}.</p>`}; } },
      { id: 'jh-u6-mc', title: 'Concepts: rates', kind: 'mc',
        gen: mcPool([
          {q:'A unit rate has…',correct:'1 in the “per” part (per 1 unit)',wrong:['no units','only fractions >1','negative time'],why:'Per one.'},
          {q:'If rate doubles and time stays the same, distance…',correct:'doubles',wrong:['halves','unchanged','becomes zero'],why:'d=rt.'},
        ]) },
    ],
  },
];
