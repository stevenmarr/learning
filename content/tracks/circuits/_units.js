'use strict';
const { fmt, q, qty, ans, mcPool } = require('../../helpers');
module.exports = [
  {
    num: 1, slug: 'charge-current-voltage', title: 'Charge, Current, Voltage & Ohm',
    blurb: 'Charge, current, voltage, Ohm’s law, power, and circuit symbols.',
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
      { id: 'cir-u1-current', title: 'Current from charge', kind: 'numeric', gen(r){ const Q=r.step(0.5,20,0.5),t=r.step(0.2,5,0.2); return {prompt:String.raw`A charge of ${qty(Q,'C')} flows past a point in ${qty(t,'s')}. Find the current $I$ in amperes. Enter $I$.`,answers:[ans('I','I',Q/t,'A')],hints:['I=ΔQ/Δt'],solution:String.raw`<p>${fmt(Q/t)}</p>`}; } },
      { id: 'cir-u1-ohm', title: "Ohm: find I", kind: 'numeric', gen(r){ const V=r.pick([5,9,12,15,24]),R=r.pick([2,3,4,5,6,8,10]); return {prompt:String.raw`A resistor of ${qty(R,'\Ω')} has ${qty(V,'V')} across it. Find the current $I$ (Ohm's law). Enter $I$ in amperes.`,answers:[ans('I','I',V/R,'A')],hints:['I=V/R'],solution:String.raw`<p>${fmt(V/R)}</p>`}; } },
      { id: 'cir-u1-ohm-r', title: "Ohm: find R", kind: 'numeric', gen(r){ const V=r.step(3,48,1),I=r.step(0.1,4,0.1); return {prompt:String.raw`A device draws ${qty(I,'A')} with ${qty(V,'V')} across it. Find the resistance $R$ in ohms. Enter $R$.`,answers:[ans('R','R',V/I,'Ω')],hints:['R=V/I'],solution:String.raw`<p>${fmt(V/I)}</p>`}; } },
      { id: 'cir-u1-power', title: 'Power', kind: 'numeric', gen(r){ const V=r.pick([5,9,12,24]),R=r.pick([4,6,8,10,12]); return {prompt:String.raw`A resistor of ${qty(R,'\Ω')} has ${qty(V,'V')} across it. Find the power $P$ in watts. Enter $P$.`,answers:[ans('P','P',V*V/R,'W')],hints:['V²/R'],solution:String.raw`<p>${fmt(V*V/R)}</p>`}; } },
      { id: 'cir-u1-mc', title: 'Concepts: V I R', kind: 'mc', gen: mcPool([{q:'A volt is…',correct:'Joule per coulomb',wrong:['Coulomb per second','Newton only','Ohm times farad'],why:'Energy per charge.'},{q:'V doubles, R fixed → I…',correct:'doubles',wrong:['halves','same','zero'],why:'Ohm.'},{q:'Power in a resistor…',correct:'P=I²R = V²/R = VI',wrong:['only VI for capacitors always','never heats','equals C'],why:'Joule heating.'}]) },
    ],
  },
  {
    num: 2, slug: 'series-parallel', title: 'Series & Parallel Circuits',
    blurb: 'Req, dividers, and mixed networks.',
    lesson: String.raw`<h2>Series & parallel</h2><p>Series: same $I$, $R_\\mathrm{eq}=\\sum R$. Parallel: same $V$, $1/R_\\mathrm{eq}=\\sum(1/R)$. Divider: $V_2=V_s R_2/(R_1+R_2)$.</p>
<div class="example"><h3>Worked example</h3><p>$12\\ \\text{V}$, $3\\text{k}$ top, $1\\text{k}$ bottom → $V_2=3\\ \\text{V}$.</p></div>
<ul class="takeaways"><li>Parallel shrinks Req.</li><li>Dividers are ratios.</li></ul>`,
    problems: [
      { id: 'cir-u2-series', title: 'Series Req', kind: 'numeric', gen(r){ const a=r.int(100,900),b=r.int(100,900); return {prompt:String.raw`Two resistors ${qty(a,'\Ω')} and ${qty(b,'\Ω')} are in series. Find $R_\\mathrm{eq}$ in ohms. Enter $R_\\mathrm{eq}$.`,answers:[ans('Req','R_\\mathrm{eq}',a+b,'Ω')],hints:['Add'],solution:String.raw`<p>${a+b}</p>`}; } },
      { id: 'cir-u2-parallel2', title: 'Parallel Req', kind: 'numeric', gen(r){ const R1=r.pick([2,3,4,6,8,10]),R2=r.pick([2,3,4,6,8,12]); const Req=R1*R2/(R1+R2); return {prompt:String.raw`Two resistors ${qty(R1,'\Ω')} and ${qty(R2,'\Ω')} are in parallel. Find $R_\\mathrm{eq}$ in ohms. Enter $R_\\mathrm{eq}$.`,answers:[ans('Req','R_\\mathrm{eq}',Req,'Ω')],hints:['Product/sum'],solution:String.raw`<p>${fmt(Req)}</p>`}; } },
      { id: 'cir-u2-divider', title: 'Voltage divider', kind: 'numeric', gen(r){ const Vs=r.pick([5,9,12,15,24]),R1=r.pick([1,2,3,4,5,6]),R2=r.pick([1,2,3,4,5,6]); return {prompt:String.raw`A voltage divider has $V_s=${qty(Vs,'V')}, top $R_1=${qty(R1,'k\Ω')}, bottom $R_2=${qty(R2,'k\Ω')}. Find $V_2$ across the bottom resistor. Enter $V_2$ in volts.`,answers:[ans('V2','V_2',Vs*R2/(R1+R2),'V')],hints:['Divider'],solution:String.raw`<p>${fmt(Vs*R2/(R1+R2))}</p>`}; } },
      { id: 'cir-u2-mixed', title: 'Series-parallel', kind: 'numeric', gen(r){ const R1=r.pick([4,6,8,10]),R2=r.pick([4,6,8,12]),R3=r.pick([4,6,8,12]); const Req=R1+R2*R3/(R2+R3); return {prompt:String.raw`Find $R_\\mathrm{eq}$ when $R_1=${qty(R1,'\Ω')} is in series with the parallel pair of $R_2=${qty(R2,'\Ω')} and $R_3=${qty(R3,'\Ω')}. Enter $R_\\mathrm{eq}$ in ohms.`,answers:[ans('Req','R_\\mathrm{eq}',Req,'Ω')],hints:['Parallel first'],solution:String.raw`<p>${fmt(Req)}</p>`}; } },
      { id: 'cir-u2-mc', title: 'Concepts: series/parallel', kind: 'mc', gen: mcPool([{q:'Two 10Ω parallel…',correct:'5Ω',wrong:['20Ω','10Ω','0'],why:'R/2.'},{q:'Series share…',correct:'current',wrong:['voltage always','no current','infinite power'],why:'One path.'}]) },
    ],
  },
  {
    num: 3, slug: 'kirchhoff', title: "Kirchhoff’s Laws",
    blurb: 'KCL and KVL — charge and energy conservation.',
    lesson: String.raw`<h2>KCL & KVL</h2><p>$\\sum I=0$ at a node; $\\sum V=0$ around a loop. Negative current = opposite your arrow.</p>
<div class="example"><h3>Worked example</h3><p>$24\\ \\text{V}$, $3\\Omega+5\\Omega$: $I=3\\ \\text{A}$.</p></div>
<ul class="takeaways"><li>KCL charge; KVL energy.</li></ul>`,
    problems: [
      { id: 'cir-u3-kcl', title: 'KCL', kind: 'numeric', gen(r){ const a=r.step(1,8,0.5),b=r.step(1,8,0.5),c=r.step(0.5,5,0.5); return {prompt:String.raw`At a node, ${qty(a,'A')} and ${qty(b,'A')} enter while ${qty(c,'A')} and unknown $I_x$ leave. Find $I_x$ in amperes. Enter $I_x$.`,answers:[ans('Ix','I_x',a+b-c,'A')],hints:['KCL'],solution:String.raw`<p>${fmt(a+b-c)}</p>`}; } },
      { id: 'cir-u3-kvl-loop', title: 'KVL loop', kind: 'numeric', gen(r){ const Vs=r.pick([9,12,15,24]),R1=r.pick([2,3,4,5]),R2=r.pick([2,3,4,6]); return {prompt:String.raw`A single loop has source ${qty(Vs,'V')} and series resistors ${qty(R1,'\Ω')} and ${qty(R2,'\Ω')}. Find the current $I$ in amperes. Enter $I$.`,answers:[ans('I','I',Vs/(R1+R2),'A')],hints:['Vs/Req'],solution:String.raw`<p>${fmt(Vs/(R1+R2))}</p>`}; } },
      { id: 'cir-u3-drop', title: 'Drop on R2', kind: 'numeric', gen(r){ const Vs=r.pick([12,15,24]),R1=r.pick([1,2,3,4]),R2=r.pick([2,3,4,5]),R3=r.pick([1,2,3]); const I=Vs/(R1+R2+R3); return {prompt:String.raw`Three series resistors ${R1}, ${R2}, ${R3} $\\Omega$ are driven by $V_s=${qty(Vs,'V')}. Find the voltage across the middle resistor $R_2$. Enter $V_{R2}$ in volts.`,answers:[ans('V2','V_2',I*R2,'V')],hints:['IR2'],solution:String.raw`<p>${fmt(I*R2)}</p>`}; } },
      { id: 'cir-u3-mc', title: 'Concepts: Kirchhoff', kind: 'mc', gen: mcPool([{q:'KCL conserves…',correct:'charge',wrong:['energy','spin','money'],why:'Node.'},{q:'KVL conserves…',correct:'energy',wrong:['charge','mass','bits'],why:'Loop.'}]) },
    ],
  },
  {
    num: 4, slug: 'rc-first-order', title: 'Capacitors & RC Transients',
    blurb: 'τ=RC, charge and discharge exponentials.',
    lesson: String.raw`<h2>RC</h2><p>$\\tau=RC$. Charge: $V_s(1-e^{-t/\\tau})$. Discharge: $V_0 e^{-t/\\tau}$. ~5τ ≈ done.</p>
<div class="example"><h3>Worked example</h3><p>$10\\text{k}\\Omega$, $100\\mu\\text{F}$ → $\\tau=1\\text{s}$.</p></div>
<ul class="takeaways"><li>τ sets speed.</li><li>v_C continuous with finite i.</li></ul>`,
    problems: [
      { id: 'cir-u4-tau', title: 'τ=RC', kind: 'numeric', gen(r){ const Rk=r.pick([1,2,10,22,47]),Cu=r.pick([10,47,100,220]); const tau=Rk*1e3*Cu*1e-6; return {prompt:String.raw`An RC circuit has $R=${qty(Rk,'k\Ω')} and $C=${qty(Cu,'\\mu\\text{F}')}. Find $\\tau=RC$ in seconds. Enter $\\tau$.`,answers:[ans('tau','\\tau',tau,'s')],hints:['Convert units'],solution:String.raw`<p>${fmt(tau)}</p>`}; } },
      { id: 'cir-u4-charge', title: 'Charging v(t)', kind: 'numeric', gen(r){ const Vs=r.pick([5,9,12]),tau=r.pick([0.5,1,2]),t=tau; const v=Vs*(1-Math.exp(-1)); return {prompt:String.raw`A capacitor charges toward ${qty(Vs,'V')} with time constant $\\tau=${tau}$ s. Find the capacitor voltage at time $t=\\tau$. Enter $v$ in volts.`,answers:[ans('v','v',v,'V')],hints:['≈0.632 Vs'],solution:String.raw`<p>${fmt(v)}</p>`}; } },
      { id: 'cir-u4-discharge', title: 'Discharge v(t)', kind: 'numeric', gen(r){ const V0=r.pick([5,9,12,20]),tau=r.pick([1,2,4]); return {prompt:String.raw`A capacitor starts at ${qty(V0,'V')} and discharges. Find its voltage at $t=\\tau$. Enter $v$ in volts.`,answers:[ans('v','v',V0*Math.exp(-1),'V')],hints:['0.368 V0'],solution:String.raw`<p>${fmt(V0*Math.exp(-1))}</p>`}; } },
      { id: 'cir-u4-mc', title: 'Concepts: RC', kind: 'mc', gen: mcPool([{q:'~5τ charging…',correct:'~99% of final',wrong:['50%','0%','oscillating'],why:'Exponential.'},{q:'Double R and C…',correct:'τ ×4',wrong:['τ ×2','unchanged','τ /2'],why:'RC.'}]) },
    ],
  },
  {
    num: 5, slug: 'thevenin', title: 'Thévenin Equivalents',
    blurb: 'Vth, Rth, and loaded dividers.',
    lesson: String.raw`<h2>Thévenin</h2><p>Linear port ≡ $V_\\mathrm{th}$ in series with $R_\\mathrm{th}$. $V_L=V_\\mathrm{th}R_L/(R_\\mathrm{th}+R_L)$. Max power when $R_L=R_\\mathrm{th}$.</p>
<div class="example"><h3>Worked example</h3><p>$V_\\mathrm{th}=10\\text{V}$, $R_\\mathrm{th}=R_L=2\\text{k}$ → $V_L=5\\text{V}$.</p></div>
<ul class="takeaways"><li>Two numbers model a port.</li><li>Zero Vs → short for Rth.</li></ul>`,
    problems: [
      { id: 'cir-u5-vl', title: 'Loaded Thévenin', kind: 'numeric', gen(r){ const Vth=r.pick([5,9,10,12]),Rth=r.pick([1,2,3,4]),RL=r.pick([1,2,3,4]); return {prompt:String.raw`Thévenin source $V_\\mathrm{th}=${qty(Vth,'V')} with $R_\\mathrm{th}=${qty(Rth,'k\Ω')} drives $R_L=${qty(RL,'k\Ω')}. Find load voltage $V_L$. Enter $V_L$ in volts.`,answers:[ans('VL','V_L',Vth*RL/(Rth+RL),'V')],hints:['Divider'],solution:String.raw`<p>${fmt(Vth*RL/(Rth+RL))}</p>`}; } },
      { id: 'cir-u5-rth', title: 'Rth=Voc/Isc', kind: 'numeric', gen(r){ const Voc=r.pick([6,10,12]),Isc=r.pick([0.002,0.005,0.01]); return {prompt:String.raw`A port has $V_\\mathrm{oc}=${qty(Voc,'V')} and $I_\\mathrm{sc}=${qty(Isc,'A')}. Find $R_\\mathrm{th}=V_\\mathrm{oc}/I_\\mathrm{sc}$. Enter $R_\\mathrm{th}$ in ohms.`,answers:[ans('R','R_\\mathrm{th}',Voc/Isc,'Ω')],hints:['Voc/Isc'],solution:String.raw`<p>${fmt(Voc/Isc)}</p>`}; } },
      { id: 'cir-u5-mc', title: 'Concepts: Thévenin', kind: 'mc', gen: mcPool([{q:'Zeroing a voltage source for Rth…',correct:'replace with a short',wrong:['replace with open','delete the ground','set C=0'],why:'0 V ideal.'},{q:'Max power (resistive) when…',correct:'RL=Rth',wrong:['RL=0','RL=∞','RL=Rth/100'],why:'Match.'}]) },
    ],
  },
  {
    num: 6, slug: 'ac-rms', title: 'AC Sinusoids & RMS',
    blurb: 'Peak vs RMS and AC power in resistors.',
    lesson: String.raw`<h2>AC & RMS</h2><p>For a sine, $V_\\mathrm{rms}=V_p/\\sqrt{2}$. Outlet labels are RMS. $P=V_\\mathrm{rms}^2/R$. $T=1/f$.</p>
<ul class="takeaways"><li>Peak ≠ RMS.</li><li>Power uses RMS.</li></ul>`,
    problems: [
      { id: 'cir-u6-rms', title: 'Peak→RMS', kind: 'numeric', gen(r){ const Vp=r.pick([10,17,170,311]); return {prompt:String.raw`A sine wave has peak $V_p=${qty(Vp,'V')}. Find $V_\\mathrm{rms}=V_p/\\sqrt{2}$. Enter $V_\\mathrm{rms}$ in volts.`,answers:[ans('V','V_\\mathrm{rms}',Vp/Math.SQRT2,'V')],hints:['/√2'],solution:String.raw`<p>${fmt(Vp/Math.SQRT2)}</p>`}; } },
      { id: 'cir-u6-p', title: 'AC power', kind: 'numeric', gen(r){ const V=r.pick([12,24,120]),R=r.pick([10,20,40,100]); return {prompt:String.raw`AC across a resistor: $V_\\mathrm{rms}=${qty(V,'V')}, $R=${qty(R,'\Ω')}. Find average power $P$. Enter $P$ in watts.`,answers:[ans('P','P',V*V/R,'W')],hints:['V²/R'],solution:String.raw`<p>${fmt(V*V/R)}</p>`}; } },
      { id: 'cir-u6-f', title: 'Period', kind: 'numeric', gen(r){ const f=r.pick([50,60,100,1000]); return {prompt:String.raw`A signal has frequency $f=${f}\\ \\text{Hz}$. Find the period $T=1/f$ in seconds. Enter $T$.`,answers:[ans('T','T',1/f,'s')],hints:['1/f'],solution:String.raw`<p>${fmt(1/f)}</p>`}; } },
      { id: 'cir-u6-mc', title: 'Concepts: AC', kind: 'mc', gen: mcPool([{q:'Sine Vrms/Vp…',correct:'≈0.707',wrong:['1','2','0'],why:'1/√2.'},{q:'“120 V AC” usually means…',correct:'120 V RMS',wrong:['120 V peak always','120 V average of sine (0)','DC'],why:'Labeling.'}]) },
    ],
  },
];
