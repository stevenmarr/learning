'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool , qty} = require('../../helpers');
const { byId: reg } = require('../registry');
const C = 3e8;

const units = [
  {
    num: 1, slug: 'maxwell-waves', title: 'Maxwell’s Equations → EM Waves',
    blurb: 'Changing E and B fields sustain each other and travel at c — light as electromagnetism.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Maxwell unified electricity and magnetism. A time-varying magnetic field makes an electric field (Faraday); a time-varying electric field (and currents) relates to magnetic field (Ampère–Maxwell). Together they allow <strong>waves</strong> of $\\mathbf E$ and $\\mathbf B$ that travel through empty space.</p>
<p>In vacuum the wave speed is</p>
$$c = \\frac{1}{\\sqrt{\\mu_0\\epsilon_0}} \\approx 3.00\\times10^8\\ \\mathrm{m/s}$$
<p>That number is the speed of light — light <em>is</em> an electromagnetic wave. $\\mathbf E$, $\\mathbf B$, and the propagation direction are mutually perpendicular in a plane wave.</p>
<div class="example"><h3>Worked example</h3>
<p>If someone quotes $\\epsilon_0$ and $\\mu_0$ correctly, $1/\\sqrt{\\mu_0\\epsilon_0}$ matches measured $c$. Optics and radio are one family.</p></div>
<ul class="takeaways"><li>Light = EM wave at speed $c$.</li><li>E, B, and travel direction form a triad.</li><li>No medium required in vacuum.</li></ul>`,
    problems: [
      { id: 'em-u1-mc', title: 'Concept check: Maxwell waves', kind: 'mc',
        gen: mcPool([
          { q: 'In vacuum, EM waves travel at…', correct: 'c ≈ 3×10^8 m/s', wrong: ['speed of sound', 'any speed chosen by the antenna alone', 'zero until observed'], why: 'Maxwell → c.' },
          { q: 'A plane EM wave’s E and B fields…', correct: 'are perpendicular to each other and to the travel direction', wrong: ['are always parallel to travel', 'exist only inside wires', 'are scalar pressures'], why: 'Transverse EM wave.' },
          { q: 'c = 1/√(μ₀ε₀) shows…', correct: 'optics speed fixed by electromagnetic constants', wrong: ['gravity sets c', 'c depends on loudness', 'c is infinite'], why: 'Unification.' },
        ]) },
      { id: 'em-u1-period', title: 'Period from frequency', kind: 'numeric',
        gen(r) {
          const f = r.pick([1e6, 2e6, 5e6, 1e8]);
          return { prompt: String.raw`Wave frequency $f=${f}\\ \\text{Hz}$. Period $T=1/f$?`, answers: [ans('T', 'T', 1 / f, 's')], hints: ['T=1/f'], solution: String.raw`<p>$T=${fmt(1/f)}$</p>` };
        } },
    ],
  },
  {
    num: 2, slug: 'spectrum', title: 'The Electromagnetic Spectrum',
    blurb: 'c=fλ across radio, microwave, IR, visible, UV, X-ray, gamma — one physics, many bands.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>One relation rules the spectrum:</p>
$$c = f\\lambda \\qquad\\Rightarrow\\qquad f = \\frac{c}{\\lambda},\\quad \\lambda = \\frac{c}{f}$$
<p>Radio: long $\\lambda$, small $f$. Gamma: tiny $\\lambda$, huge $f$. Visible light is a thin slice (~400–700 nm). Photon energy $E=hf$ rises with $f$ — same story as the quantum track.</p>
<table class="tbl"><thead><tr><th>Band (rough)</th><th>Uses / notes</th></tr></thead><tbody>
<tr><td>Radio / microwave</td><td>Comms, radar, Wi‑Fi, ovens</td></tr>
<tr><td>Infrared</td><td>Heat radiation, remotes, night cameras</td></tr>
<tr><td>Visible</td><td>Human vision</td></tr>
<tr><td>Ultraviolet</td><td>Sunburn, sterilization (handle with care)</td></tr>
<tr><td>X-ray / gamma</td><td>Medical imaging / nuclear; shielding matters</td></tr>
</tbody></table>
<div class="example"><h3>Worked example</h3>
<p>$f=100\\ \\mathrm{MHz}$ FM radio: $\\lambda=c/f=3\\ \\mathrm{m}$.</p></div>
<ul class="takeaways"><li>$c=f\\lambda$ always in vacuum.</li><li>Higher $f$ → shorter $\\lambda$ → more energetic photons.</li><li>Bands are labels on one continuum.</li></ul>`,
    problems: [
      { id: 'em-u2-lambda', title: 'Wavelength from f', kind: 'numeric',
        gen(r) {
          const f = r.pick([1e6, 3e6, 1e8, 2.4e9]);
          return { prompt: String.raw`Vacuum: $f=${f}\\ \\text{Hz}$. $\\lambda$? ($c=3\\times10^8$)`, answers: [ans('l', '\\lambda', C / f, 'm')], hints: ['λ=c/f'], solution: String.raw`<p>$\\lambda=${fmt(C/f)}$</p>` };
        } },
      { id: 'em-u2-f', title: 'Frequency from λ', kind: 'numeric',
        gen(r) {
          const lam = r.pick([0.01, 0.12, 3, 1500]);
          return { prompt: String.raw`Vacuum: $\\lambda=${qty(lam,'m')}. Frequency?`, answers: [ans('f', 'f', C / lam, 'Hz')], hints: ['f=c/λ'], solution: String.raw`<p>$f=${fmt(C/lam)}$</p>` };
        } },
      { id: 'em-u2-vis', title: 'Visible wavelength order', kind: 'mc',
        gen: mcPool([
          { q: 'Visible wavelengths are about…', correct: 'hundreds of nanometers (e.g. 400–700 nm)', wrong: ['kilometers', 'only femtometers', 'exactly 1 meter always'], why: 'Optics scale.' },
          { q: 'If λ halves in vacuum, f…', correct: 'doubles', wrong: ['halves', 'unchanged', 'becomes c'], why: 'c fixed.' },
          { q: 'X-rays vs radio photons…', correct: 'X-ray photons are much more energetic each', wrong: ['radio photons always more energetic', 'same energy always', 'X-rays are sound'], why: 'E=hf.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'polarization-intensity', title: 'Polarization, Intensity & the Inverse-Square Idea',
    blurb: 'Linear polarization, Malus’s law idea, and why intensity falls with distance from a point source.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Polarization</strong> describes the direction of the oscillating $\\mathbf E$ field. Linear polarizers pass the component along their axis. <strong>Malus’s law</strong> (ideal polarizer after polarized light): $I = I_0\\cos^2\\theta$.</p>
<p><strong>Intensity</strong> $I$ is power per area. For a point-like source radiating equally all ways, $I\\propto 1/r^2$ — same power spread over a sphere of area $4\\pi r^2$.</p>
<div class="example"><h3>Worked example</h3>
<p>$\\theta=60^\\circ$: $\\cos60=1/2$, so $I=I_0/4$. Double distance from isotropic source → intensity ÷4.</p></div>
<ul class="takeaways"><li>Polarizers act on E’s direction.</li><li>$I=I_0\\cos^2\\theta$ (Malus).</li><li>Point source: $1/r^2$ intensity law.</li></ul>`,
    problems: [
      { id: 'em-u3-malus', title: 'Malus factor', kind: 'numeric',
        gen(r) {
          const th = r.pick([0, 30, 45, 60, 90]);
          const factor = Math.cos(th * Math.PI / 180) ** 2;
          return { prompt: String.raw`Ideal polarizer at $\\theta=${th}^\\circ$ to polarized light. Factor $I/I_0=\\cos^2\\theta$?`, answers: [ans('k', 'I/I_0', factor, '')], hints: ['cos²θ'], solution: String.raw`<p>${fmt(factor)}</p>` };
        } },
      { id: 'em-u3-r2', title: 'Inverse-square scale', kind: 'numeric',
        gen(r) {
          const k = r.pick([2, 3, 4]);
          return { prompt: String.raw`Isotropic point source: if distance grows ×${k}, intensity falls by what factor? (enter the divisor, e.g. 4 means ÷4)`, answers: [ans('d', 'd', k * k, '')], hints: ['∝ 1/r² → factor k²'], solution: String.raw`<p>${k*k}</p>` };
        } },
      { id: 'em-u3-mc', title: 'Concept check: polarization', kind: 'mc',
        gen: mcPool([
          { q: 'At θ = 90° in Malus’s law, ideal I…', correct: 'is zero', wrong: ['equals I0', 'is infinite', 'equals c'], why: 'cos90=0.' },
          { q: 'Polarization refers primarily to…', correct: 'the orientation of the electric field oscillation', wrong: ['the battery polarity only', 'temperature', 'mass of the photon'], why: 'E direction.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'antennas', title: 'Antennas & Radiation (Engineering View)',
    blurb: 'Accelerating charges radiate; antennas couple circuits to waves; wavelength sets size scale.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Steady currents make steady B fields; <strong>accelerating</strong> charges radiate EM waves. An antenna is a structure that couples a circuit’s oscillating currents to free-space waves (and vice versa for receiving).</p>
<p>Rule of thumb: efficient antennas are often on the order of $\\lambda/2$ or $\\lambda/4$ in a key dimension — that is why AM towers are huge and Wi‑Fi antennas are tiny.</p>
<div class="tip"><strong>Near vs far:</strong> Close to an antenna the fields are messy (“near field”). Far away, the wave looks locally like a plane wave. Comm links usually care about the far field.</div>
<ul class="takeaways"><li>Radiation needs time-varying currents / acceleration.</li><li>Size scales with λ.</li><li>Reciprocity: good transmit antennas are good receive antennas (in the usual linear passive sense).</li></ul>`,
    problems: [
      { id: 'em-u4-quarter', title: 'Quarter-wave length', kind: 'numeric',
        gen(r) {
          const f = r.pick([1e8, 1.5e8, 3e8, 2.4e9]);
          const L = (C / f) / 4;
          return { prompt: String.raw`Approximate $\\lambda/4$ length for $f=${f}\\ \\text{Hz}$ in vacuum/air?`, answers: [ans('L', 'L', L, 'm')], hints: ['λ=c/f, then /4'], solution: String.raw`<p>$L=${fmt(L)}\\ \\text{m}$</p>` };
        } },
      { id: 'em-u4-mc', title: 'Concept check: antennas', kind: 'mc',
        gen: mcPool([
          { q: 'A steady DC current in a straight wire…', correct: 'does not radiate a propagating EM wave the way an RF antenna does', wrong: ['always emits visible light', 'sets c to zero', 'is identical to a radio broadcast'], why: 'Need time variation / acceleration.' },
          { q: 'Wi‑Fi antennas are small mainly because…', correct: 'λ is short at GHz frequencies', wrong: ['radio waves do not exist at GHz', 'c is smaller indoors', 'Ohm’s law forbids large metal'], why: 'Size ~ λ.' },
          { q: 'Far from an antenna, waves…', correct: 'locally resemble plane EM waves', wrong: ['become pure DC', 'stop carrying energy', 'only exist as sound'], why: 'Far-field radiation.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'propagation', title: 'Propagation, Reflection & Atmosphere',
    blurb: 'Reflection/refraction ideas, line-of-sight vs skywave (qualitative), and why weather/terrain matter.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Waves bounce (reflection), bend at interfaces (refraction), and can diffract around edges. Optical fiber traps light by total internal reflection. Radio links may be line-of-sight, ground-wave, or (at some HF frequencies) skywave via the ionosphere — details depend on band and conditions.</p>
<p>Engineering takeaway: path loss, obstacles, and multipath (multiple delayed copies) shape real links. Rain fades microwave links; hills block UHF.</p>
<ul class="takeaways"><li>Interfaces reflect/refract.</li><li>Band choice changes propagation mode.</li><li>Multipath and obstacles are normal, not bugs in Maxwell.</li></ul>`,
    problems: [
      { id: 'em-u5-mc', title: 'Concept check: propagation', kind: 'mc',
        gen: mcPool([
          { q: 'Total internal reflection is used in…', correct: 'optical fiber light guiding', wrong: ['stopping c in vacuum', 'Newtonian gravity', 'Boolean NAND only'], why: 'Fiber optics.' },
          { q: 'Multipath means…', correct: 'multiple delayed copies of a signal arrive', wrong: ['only one possible path ever', 'the wave has zero frequency', 'antennas must be superconducting'], why: 'Reflections.' },
          { q: 'A hill between a UHF transmitter and receiver often…', correct: 'blocks or weakens the line-of-sight path', wrong: ['increases c', 'converts radio to X-rays', 'removes the need for antennas'], why: 'Obstacles.' },
          { q: 'Choosing a radio band matters because…', correct: 'propagation and antenna size change with frequency', wrong: ['Maxwell’s equations fail above 1 MHz', 'all bands behave identically always', 'only color changes'], why: 'Engineering tradeoffs.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('emwaves'), units);
