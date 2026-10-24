'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'scene-assessment', title: 'Scene Safety & Primary Assessment',
    blurb: 'Scene safe → ABCs mindset → rapid vs focused exam. Training principles, not a certification.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Order saves lives: <strong>scene safety</strong> first, then a primary survey (airway, breathing, circulation — the classic ABC framing). This module teaches thinking patterns for study; it is <strong>not</strong> a substitute for accredited paramedic training or protocols.</p>
<ul class="takeaways"><li>You cannot help if you become a patient.</li><li>Primary survey finds immediate killers.</li><li>Seek formal training/certification for real response.</li></ul>`,
    problems: [
      { id: 'med-u1-mc', title: 'Assessment order', kind: 'mc',
        gen: mcPool([
          { q: 'First priority on arrival?', correct: 'Scene safety', wrong: ['Start an IV on yourself', 'Ignore hazards to save seconds always', 'Ask for insurance first'], why: 'Responder safety enables care.' },
          { q: 'This module is…', correct: 'educational principles — not a certification', wrong: ['a license to practice independently', 'a replacement for medical direction', 'permission to invent drug doses'], why: 'Scope boundary.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'airway-breathing', title: 'Airway & Breathing Principles',
    blurb: 'Patency, oxygenation vs ventilation ideas, red flags — principles only.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Airway patency and adequate breathing precede almost everything else. Recognize obstruction signs and respiratory distress; definitive skills belong in supervised labs/courses.</p>
<ul class="takeaways"><li>Open airway before fancy diagnostics.</li><li>Distress signs: work of breathing, color, mental status.</li></ul>`,
    problems: [
      { id: 'med-u2-mc', title: 'Airway concepts', kind: 'mc',
        gen: mcPool([
          { q: 'A talking adult generally demonstrates…', correct: 'at least a temporarily adequate airway', wrong: ['no need to ever reassess', 'perfect oxygen forever', 'cardiac arrest'], why: 'Speech needs an open airway — still reassess.' },
          { q: 'Drug doses in this course?', correct: 'Not provided as DIY protocols — learn under proper training', wrong: ['Invented freely here', 'Copied from random videos as gospel', 'Optional for kids to practice on siblings'], why: 'Safety.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'trauma-cardiac-ideas', title: 'Trauma & Cardiac Red Flags',
    blurb: 'Bleed control idea, shock recognition, cardiac arrest chain-of-survival concept.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Life-threatening bleed → direct pressure / appropriate hemorrhage control training. Shock is inadequate perfusion. Cardiac arrest: early CPR and defibrillation in the chain of survival — train with certified courses (AHA/etc.).</p>
<ul class="takeaways"><li>Stop severe bleed; think perfusion.</li><li>Get certified for CPR/ALS skills.</li></ul>`,
    problems: [
      { id: 'med-u3-mc', title: 'Trauma/cardiac concepts', kind: 'mc',
        gen: mcPool([
          { q: 'Severe external hemorrhage first principle…', correct: 'control the bleed with appropriate pressure/hemorrhage-control training', wrong: ['ignore bleeding to take a full history first always', 'give random kitchen chemicals', 'wait for lab results only'], why: 'March toward life threats.' },
          { q: 'Best place to learn CPR performance?', correct: 'A certified hands-on course', wrong: ['Only this multiple-choice unit', 'Unsupervised experimentation', 'Movie scenes'], why: 'Skills need practice under instructors.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('paramedic'), units);
