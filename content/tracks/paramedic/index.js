'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

/** Educational principles only — not certification, not protocols, no drug doses. */

const units = [
  {
    num: 1, slug: 'scene-safety', title: 'Scene Safety & Body Substance Isolation',
    blurb: 'You cannot help if you become a patient. Hazards, PPE mindset, and calling for the right resources.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Every textbook primary survey assumes a <strong>safe scene</strong>. Traffic, fire, electrical lines, violence, unstable structures, hazardous materials — if the scene is unsafe, stage for professionals with the right gear. This module teaches <em>thinking patterns for study</em>. It is <strong>not</strong> a paramedic certification, medical direction, or permission to practice.</p>
<h2>Habits</h2>
<ul>
<li>Pause at the threshold: What can hurt me or my partner?</li>
<li>PPE / body substance isolation appropriate to the exposure risk.</li>
<li>Number of patients? Mechanism? Need for ALS/fire/law?</li>
<li>If unsafe → do not rush in; make it safer or wait for resources.</li>
</ul>
<div class="tip"><strong>Hard boundary:</strong> No drug doses, invasive skills, or “protocols” are taught here. Take accredited courses for real response work.</div>
<ul class="takeaways"><li>Scene safety first.</li><li>Resources match the problem.</li><li>Study ≠ license.</li></ul>`,
    problems: [
      { id: 'med-u1-mc', title: 'Scene safety choices', kind: 'mc',
        gen: mcPool([
          { q: 'First priority on arrival?', correct: 'Scene safety', wrong: ['Start an IV on yourself', 'Ignore downed power lines to save seconds always', 'Demand insurance cards first'], why: 'Responder safety enables care.' },
          { q: 'This track is…', correct: 'educational principles — not a certification', wrong: ['a license to practice independently', 'a replacement for medical direction', 'permission to invent drug doses'], why: 'Scope.' },
          { q: 'Multiple patients and ongoing traffic hazard — best study answer?', correct: 'Prioritize safety and call appropriate additional resources', wrong: ['Send untrained bystanders into the roadway without traffic control', 'Leave without notifying anyone', 'Begin complex procedures in the travel lane casually'], why: 'System response.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'primary-survey', title: 'Primary Survey: Find Immediate Killers',
    blurb: 'ABC / CAB framing, general impression, and the difference between sick and not-yet-sick.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>The <strong>primary survey</strong> hunts problems that kill in minutes: airway compromise, failure to breathe/oxygenate, catastrophic hemorrhage / no pulse. Different training systems order letters slightly differently (ABC vs CAB in cardiac arrest). The idea is shared: fix life threats before a leisurely history.</p>
<p><strong>General impression:</strong> Does the patient look sick? Work of breathing? Color? Mental status? A talking adult usually has a temporarily adequate airway — and still needs reassessment.</p>
<ul class="takeaways"><li>Life threats before paperwork.</li><li>Reassess after every intervention.</li><li>Sick vs not-sick drives urgency.</li></ul>`,
    problems: [
      { id: 'med-u2-mc', title: 'Primary survey concepts', kind: 'mc',
        gen: mcPool([
          { q: 'Primary survey focuses on…', correct: 'immediate life threats', wrong: ['only past surgical history', 'billing codes', 'long-term nutrition counseling first'], why: 'Minutes matter.' },
          { q: 'A speaking adult generally shows…', correct: 'at least a temporarily adequate airway', wrong: ['no need to ever reassess', 'perfect oxygenation forever', 'cardiac arrest'], why: 'Speech needs an open path — still watch them.' },
          { q: 'In cardiac arrest training algorithms, CAB emphasizes…', correct: 'circulation/compressions early', wrong: ['coffee, apples, bananas', 'only spinal clearance first always', 'ignoring defibrillation forever'], why: 'Modern CPR emphasis — learn in a certified course.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'airway-breathing', title: 'Airway & Breathing Principles',
    blurb: 'Patency, obstruction signs, oxygenation vs ventilation ideas — skills belong in supervised labs.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Airway patency</strong> means air can move. Snoring, stridor, gurgling, silent chest with effort — red flags. Positioning and basic maneuvers are taught hands-on in certified classes; here you learn what to notice.</p>
<p><strong>Oxygenation</strong> (getting O₂ into blood) vs <strong>ventilation</strong> (moving air) are related but not identical. Respiratory distress: rate, depth, accessory muscles, tripoding, cyanosis, anxiety.</p>
<div class="tip"><strong>No DIY airway devices or drug recipes in this course.</strong></div>
<ul class="takeaways"><li>Listen/look for obstruction and distress.</li><li>Support breathing per training — not improvisation.</li><li>Escalate early when work-of-breathing is high.</li></ul>`,
    problems: [
      { id: 'med-u3-mc', title: 'Airway/breathing checks', kind: 'mc',
        gen: mcPool([
          { q: 'Gurgling in an unresponsive patient suggests…', correct: 'possible airway compromise needing trained intervention', wrong: ['perfect airway', 'that drugs should be invented at home', 'ignore and take a full SAMPLE history first only'], why: 'Noise = problem until proven otherwise.' },
          { q: 'Tripoding and accessory muscle use suggest…', correct: 'increased work of breathing / distress', wrong: ['relaxation', 'only ankle injury', 'hyperthermia always'], why: 'Mechanics of distress.' },
          { q: 'Drug doses for respiratory emergencies in this course?', correct: 'Not provided — learn under proper training and medical direction', wrong: ['Invented freely here', 'Copied from random videos as gospel', 'Optional for siblings to practice'], why: 'Safety boundary.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'circulation-shock', title: 'Circulation, Bleeding & Shock',
    blurb: 'Pulse/perfusion ideas, hemorrhage control principles, and shock as inadequate tissue perfusion.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Shock</strong> means inadequate perfusion — cells not getting what they need. Skin, mental status, pulse quality, and mechanism clue you in. <strong>Catastrophic external bleeding</strong> is a life threat: trained hemorrhage control (direct pressure, appropriate tourniquet use per training) comes before leisurely exams.</p>
<p>Internal bleeding may hide; mechanism (falls, crashes) and signs of poor perfusion matter. This is recognition and prioritization — not surgery.</p>
<ul class="takeaways"><li>Perfusion over perfect vital-sign calligraphy.</li><li>Stop severe external bleed with trained methods.</li><li>Shock is a metabolism problem, not just “low BP number.”</li></ul>`,
    problems: [
      { id: 'med-u4-mc', title: 'Circulation concepts', kind: 'mc',
        gen: mcPool([
          { q: 'Shock, at root, is…', correct: 'inadequate tissue perfusion', wrong: ['always only fear', 'high blood sugar by definition', 'a skin disease'], why: 'Delivery failure.' },
          { q: 'Severe external hemorrhage — first principle…', correct: 'control the bleed with appropriate trained pressure/hemorrhage control', wrong: ['ignore bleeding for a 20-minute history', 'apply random kitchen chemicals', 'wait solely for lab results'], why: 'Life threat.' },
          { q: 'Tourniquets…', correct: 'belong in trained hemorrhage-control practice — not casual home invention', wrong: ['should be made from random wire as a first hobby project', 'are never used in modern care', 'replace scene safety'], why: 'Training.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'trauma-disability', title: 'Trauma Overview & Disability Check',
    blurb: 'Mechanism of injury, c-spine caution as a mindset, and rapid neurologic/disability assessment ideas.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Mechanism of injury (MOI)</strong> predicts hidden trauma. High energy → higher suspicion. Disability/neuro check: responsiveness, pupils (as taught), movement of extremities — looking for stroke-like or spinal-injury patterns that change packaging and destination decisions in real systems.</p>
<p>Spinal motion restriction is protocol- and training-dependent. Here: do not wrestle necks; learn caution and get formal instruction.</p>
<ul class="takeaways"><li>MOI informs suspicion.</li><li>Disability check is part of primary/secondary flow.</li><li>Immobilization details = certified training.</li></ul>`,
    problems: [
      { id: 'med-u5-mc', title: 'Trauma mindset', kind: 'mc',
        gen: mcPool([
          { q: 'High-energy mechanism means…', correct: 'higher suspicion for serious occult injury', wrong: ['guaranteed no injury', 'ignore ABCs', 'skip scene size-up'], why: 'Physics of trauma.' },
          { q: 'Disability assessment roughly asks…', correct: 'neurologic status / deficits', wrong: ['favorite color only', 'insurance tier', 'molar mass of oxygen'], why: 'Neuro check.' },
          { q: 'Best place to learn hands-on trauma skills?', correct: 'Accredited courses with supervised practice', wrong: ['Only this quiz', 'Unsupervised street experiments', 'Movie stunts'], why: 'Skills.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'cardiac-arrest', title: 'Cardiac Arrest & Chain of Survival',
    blurb: 'Early recognition, CPR, defibrillation, ALS, and post-arrest care — get certified; do not learn compressions from text alone.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>The <strong>chain of survival</strong> (public framing): recognition/activation → high-quality CPR → defibrillation → advanced care → post-arrest care. Bystander CPR and AEDs change outcomes. Compression quality (rate/depth/recoil/minimize pauses) is a motor skill — <strong>AHA or equivalent hands-on courses</strong> are the right place to learn.</p>
<p>Teamwork, clear roles, and rapid defibrillation for shockable rhythms are system goals. This unit explains why the chain exists, not how to run a code from a webpage.</p>
<ul class="takeaways"><li>Time to CPR and defibrillation matters.</li><li>Get certified for skills.</li><li>Codes are team events.</li></ul>`,
    problems: [
      { id: 'med-u6-mc', title: 'Chain of survival', kind: 'mc',
        gen: mcPool([
          { q: 'Early links in the chain of survival include…', correct: 'recognition, CPR, and defibrillation', wrong: ['only billing', 'only long-term rehab without CPR', 'ignoring AEDs always'], why: 'Classic chain.' },
          { q: 'High-quality CPR is best learned…', correct: 'in a certified hands-on course', wrong: ['only by reading this paragraph', 'from action movies', 'by practicing on siblings unsupervised'], why: 'Psychomotor skill.' },
          { q: 'AEDs are designed so…', correct: 'trained and many lay rescuers can defibrillate shockable rhythms quickly', wrong: ['they replace scene safety', 'they give opioid doses', 'they measure soil potassium'], why: 'Public access defibrillation idea.' },
          { q: 'After ROSC (return of spontaneous circulation), systems focus on…', correct: 'post-arrest care (as trained) — the chain continues', wrong: ['stopping all monitoring forever immediately', 'farm chore order', 'Boolean algebra'], why: 'Final links matter.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('paramedic'), units);
