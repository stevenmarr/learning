'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

/** Educational principles only — not certification, not protocols, no drug doses. */

function mc(id, title, variants) {
  return { id, title, kind: 'mc', gen: mcPool(variants) };
}

const units = [
  {
    num: 1, slug: 'scene-safety', title: 'Scene Safety & Body Substance Isolation',
    blurb: 'You cannot help if you become a patient. Hazards, PPE mindset, and calling for the right resources.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Pause and scan for hazards before patient contact.</li>
<li>Match PPE / body-substance isolation to exposure risk.</li>
<li>Know when to stage and call more resources.</li>
</ul>
<h2>Hook</h2>
<p>Every heroic rescue story that ends with a second patient started with someone skipping the first ten seconds of looking around.</p>
<h2>Intuition</h2>
<p>If the scene can hurt you (traffic, fire, power lines, violence, unstable structure, hazmat), you are not “brave” for walking in unprotected — you are removing help from the system. Make it safer or wait for the right team.</p>
<h2>Formal habit loop</h2>
<ol>
<li>Stop at the threshold: what can hurt me or my partner?</li>
<li>Number of patients? Mechanism? Need for fire / law / ALS?</li>
<li>PPE appropriate to blood, airway, chemicals, or unknown fluids.</li>
<li>If unsafe → stage, control traffic, or wait — then care.</li>
</ol>
<div class="example"><h3>Worked example (thinking, not a protocol)</h3>
<p>Car vs pole, wires down on the hood, one driver waving. Study answer: treat wires as live, keep clear, request utility/fire, speak to the patient from a safe distance until the electrical hazard is controlled.</p></div>
<div class="tip"><strong>Common mistakes:</strong> tunnel vision on the patient; ignoring traffic; treating this web module as a license. It is <strong>not</strong> certification or medical direction.</div>
<ul class="takeaways"><li>Scene safety first.</li><li>Resources match the problem.</li><li>Study ≠ license to practice.</li></ul>`,
    problems: [
      mc('med-u1-mc', 'Scene safety choices', [
        { q: 'First priority on arrival?', correct: 'Scene safety', wrong: ['Start an IV on yourself', 'Ignore downed power lines to save seconds', 'Demand insurance cards first'], why: 'Responder safety enables care.' },
        { q: 'This track is…', correct: 'educational principles — not a certification', wrong: ['a license to practice independently', 'a replacement for medical direction', 'permission to invent drug doses'], why: 'Scope boundary.' },
        { q: 'Multiple patients and ongoing traffic hazard — best study answer?', correct: 'Prioritize safety and call appropriate additional resources', wrong: ['Send untrained bystanders into the travel lane without control', 'Leave without notifying anyone', 'Begin complex procedures in the lane casually'], why: 'System response.' },
      ]),
      mc('med-u1-ppe', 'PPE & staging judgment', [
        { q: 'Body substance isolation means…', correct: 'choosing barriers that match likely exposure', wrong: ['never wearing gloves', 'only fashion PPE', 'skipping hand hygiene after'], why: 'Match protection to risk.' },
        { q: 'Staging away from a violent scene until law arrives is…', correct: 'appropriate when the scene is unsafe', wrong: ['always cowardly', 'forbidden in all systems', 'the same as abandoning without notification'], why: 'You cannot treat if you become a patient.' },
      ]),
    ],
  },
  {
    num: 2, slug: 'primary-survey', title: 'Primary Survey: Find Immediate Killers',
    blurb: 'ABC / CAB framing, general impression, and sick vs not-yet-sick.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Name the life threats the primary survey is hunting.</li>
<li>Use a general impression (sick vs not-sick) to set urgency.</li>
<li>Remember reassessment after every major change.</li>
</ul>
<h2>Hook</h2>
<p>Paperwork never saved an airway. The primary survey is a fast hunt for problems that kill in minutes.</p>
<h2>Intuition</h2>
<p>Ask: is air moving? Is blood staying inside and circulating? Is the brain getting a share? Fix those before a leisurely history.</p>
<h2>Formal idea</h2>
<p>Training systems order letters slightly differently (<strong>ABC</strong> vs <strong>CAB</strong> in cardiac arrest). Shared idea: life threats before details. <strong>General impression:</strong> look sick? work of breathing? color? mental status? A talking adult usually has a temporarily adequate airway — and still needs reassessment.</p>
<div class="example"><h3>Worked example</h3>
<p>Pale, sweaty, barely speaking after a crash → treat as sick; hunt airway/breathing/circulation threats; do not start with a long medication list.</p></div>
<div class="tip"><strong>Common mistake:</strong> reassuring yourself with one good vital sign while the patient looks dreadful — believe the whole picture.</div>
<ul class="takeaways"><li>Life threats before paperwork.</li><li>Reassess after interventions.</li><li>Sick vs not-sick drives urgency.</li></ul>`,
    problems: [
      mc('med-u2-mc', 'Primary survey concepts', [
        { q: 'Primary survey focuses on…', correct: 'immediate life threats', wrong: ['only past surgical history', 'billing codes', 'long-term nutrition first'], why: 'Minutes matter.' },
        { q: 'A speaking adult generally shows…', correct: 'at least a temporarily adequate airway', wrong: ['no need to ever reassess', 'perfect oxygenation forever', 'cardiac arrest'], why: 'Speech needs an open path — still watch them.' },
        { q: 'In cardiac arrest algorithms, CAB emphasizes…', correct: 'circulation/compressions early', wrong: ['coffee, apples, bananas', 'only spinal clearance first always', 'ignoring defibrillation forever'], why: 'Modern CPR emphasis — learn details in a certified course.' },
      ]),
      mc('med-u2-sick', 'Sick vs not-sick', [
        { q: 'General impression is useful because…', correct: 'it quickly sets urgency before a full workup', wrong: ['it replaces all vitals forever', 'it is only for billing', 'it forbids calling for help'], why: 'Pattern recognition.' },
        { q: 'After you open an airway successfully you should…', correct: 'reassess breathing and circulation', wrong: ['stop all monitoring', 'leave the scene', 'invent a drug dose'], why: 'Primary survey is a loop.' },
      ]),
    ],
  },
  {
    num: 3, slug: 'airway-breathing', title: 'Airway & Breathing Principles',
    blurb: 'Patency, obstruction signs, oxygenation vs ventilation — skills belong in supervised labs.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Recognize noisy or silent airway danger signs.</li>
<li>Separate oxygenation (O₂ into blood) from ventilation (moving air).</li>
<li>Respect the boundary: no DIY airway devices or drug recipes here.</li>
</ul>
<h2>Hook</h2>
<p>Airway problems announce themselves with sound — or with terrifying silence plus effort.</p>
<h2>Intuition</h2>
<p>If the pipe is blocked or the bellows cannot move air, nothing else you know about medicine matters in the next minute.</p>
<h2>Formal ideas</h2>
<p><strong>Patency</strong> means air can move. Red flags: snoring, stridor, gurgling, silent chest with effort. <strong>Distress signs:</strong> rate, depth, accessory muscles, tripoding, cyanosis, panic. Positioning and basic maneuvers are hands-on skills for certified classes.</p>
<div class="example"><h3>Worked example</h3>
<p>Unresponsive patient with gurgling → think secretions/obstruction risk; call for trained help; do not invent suction or meds from a webpage.</p></div>
<div class="tip"><strong>Common mistake:</strong> equating “I hear wheezes” with a complete treatment plan — recognition ≠ full protocol.</div>
<ul class="takeaways"><li>Look and listen for obstruction and distress.</li><li>Support breathing only as trained.</li><li>Escalate early when work-of-breathing is high.</li></ul>`,
    problems: [
      mc('med-u3-mc', 'Airway/breathing checks', [
        { q: 'Gurgling in an unresponsive patient suggests…', correct: 'possible airway compromise needing trained intervention', wrong: ['a perfect airway', 'that home drug invention is required', 'ignore and take a long history first'], why: 'Noise = problem until proven otherwise.' },
        { q: 'Tripoding and accessory muscle use suggest…', correct: 'increased work of breathing / distress', wrong: ['relaxation', 'only ankle injury', 'hyperthermia always'], why: 'Mechanics of distress.' },
        { q: 'Drug doses for respiratory emergencies in this course?', correct: 'Not provided — learn under proper training and medical direction', wrong: ['Invented freely here', 'Copied from random videos as gospel', 'Optional practice on siblings'], why: 'Safety boundary.' },
      ]),
      mc('med-u3-oxy', 'Oxygenation vs ventilation', [
        { q: 'Ventilation mainly refers to…', correct: 'moving air in and out of the lungs', wrong: ['only blood sugar control', 'only spinal clearance', 'billing for oxygen'], why: 'Air movement.' },
        { q: 'Oxygenation mainly refers to…', correct: 'getting oxygen into the blood', wrong: ['only writing essays', 'ignoring airway sounds', 'farm chore order'], why: 'Gas exchange / delivery idea.' },
      ]),
    ],
  },
  {
    num: 4, slug: 'circulation-shock', title: 'Circulation, Bleeding & Shock',
    blurb: 'Perfusion ideas, hemorrhage control principles, shock as inadequate tissue perfusion.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Define shock as inadequate tissue perfusion.</li>
<li>Prioritize catastrophic external bleeding with trained methods.</li>
<li>Avoid inventing tourniquet or drug techniques from text alone.</li>
</ul>
<h2>Hook</h2>
<p>Shock is not a feeling of surprise — it is cells missing what they need because delivery failed.</p>
<h2>Intuition</h2>
<p>Skin, mentation, pulse quality, and mechanism often warn you before a single blood-pressure number tells the whole story.</p>
<h2>Formal ideas</h2>
<p><strong>Shock</strong> = inadequate perfusion. <strong>Severe external bleed</strong> is a life threat: direct pressure and appropriate tourniquet use belong in trained hemorrhage-control practice. Internal bleeding can hide; mechanism matters.</p>
<div class="example"><h3>Worked example</h3>
<p>Arterial spurting from a limb wound → study priority is hemorrhage control with trained pressure/tourniquet skills, not a leisurely SAMPLE history in a pool of blood.</p></div>
<div class="tip"><strong>Common mistake:</strong> waiting for “perfect vitals paperwork” while obvious catastrophic bleeding continues.</div>
<ul class="takeaways"><li>Perfusion over calligraphy.</li><li>Stop severe external bleed as trained.</li><li>Shock ≠ only “low BP.”</li></ul>`,
    problems: [
      mc('med-u4-mc', 'Circulation concepts', [
        { q: 'Shock, at root, is…', correct: 'inadequate tissue perfusion', wrong: ['always only fear', 'high blood sugar by definition', 'a skin disease'], why: 'Delivery failure.' },
        { q: 'Severe external hemorrhage — first principle…', correct: 'control the bleed with appropriate trained pressure/hemorrhage control', wrong: ['ignore bleeding for a long history', 'apply random kitchen chemicals', 'wait solely for lab results'], why: 'Life threat.' },
        { q: 'Tourniquets…', correct: 'belong in trained hemorrhage-control practice — not casual home invention', wrong: ['should be made from random wire as a hobby', 'are never used in modern care', 'replace scene safety'], why: 'Training required.' },
      ]),
      mc('med-u4-signs', 'Perfusion clues', [
        { q: 'Cool, clammy skin with confusion after trauma may suggest…', correct: 'poor perfusion / shock physiology until proven otherwise', wrong: ['perfect health', 'only a skin lotion problem', 'a reason to skip ABCs'], why: 'Whole-picture perfusion.' },
        { q: 'Internal bleeding is dangerous because…', correct: 'it may be hidden while perfusion worsens', wrong: ['it always announces with a loud noise', 'it cannot affect mental status', 'it replaces scene safety'], why: 'Occult loss.' },
      ]),
    ],
  },
  {
    num: 5, slug: 'trauma-disability', title: 'Trauma Overview & Disability Check',
    blurb: 'Mechanism of injury, c-spine caution mindset, rapid disability/neuro check ideas.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Use mechanism of injury to raise or lower suspicion.</li>
<li>Include a rapid disability / neurologic check in the flow.</li>
<li>Leave immobilization details to accredited training.</li>
</ul>
<h2>Hook</h2>
<p>High energy does not always leave a dramatic wound — but it should leave you suspicious.</p>
<h2>Intuition</h2>
<p>Physics predicts hidden injury. Disability checks ask whether the brain and cord still seem to be doing their jobs.</p>
<h2>Formal ideas</h2>
<p><strong>MOI</strong> informs suspicion. Disability: responsiveness, pupils as taught, extremity movement — patterns that change packaging and destination in real systems. Spinal motion restriction is protocol-dependent; do not wrestle necks from a blog post.</p>
<div class="example"><h3>Worked example</h3>
<p>Rollover with intrusion and a distracted patient → higher occult-injury suspicion; careful movement; get formal trauma training for packaging skills.</p></div>
<ul class="takeaways"><li>MOI informs suspicion.</li><li>Disability check belongs in the survey flow.</li><li>Hands-on immobilization = certified course.</li></ul>`,
    problems: [
      mc('med-u5-mc', 'Trauma mindset', [
        { q: 'High-energy mechanism means…', correct: 'higher suspicion for serious occult injury', wrong: ['guaranteed no injury', 'ignore ABCs', 'skip scene size-up'], why: 'Physics of trauma.' },
        { q: 'Disability assessment roughly asks…', correct: 'neurologic status / deficits', wrong: ['favorite color only', 'insurance tier', 'molar mass of oxygen'], why: 'Neuro check.' },
        { q: 'Best place to learn hands-on trauma skills?', correct: 'Accredited courses with supervised practice', wrong: ['Only this quiz', 'Unsupervised street experiments', 'Movie stunts'], why: 'Skills.' },
      ]),
      mc('med-u5-moi', 'Mechanism judgment', [
        { q: 'A fall from significant height mainly increases…', correct: 'suspicion for multi-system trauma', wrong: ['certainty of zero injury', 'the need to skip airway checks', 'soil potassium'], why: 'Energy transfer.' },
        { q: 'C-spine caution in study terms means…', correct: 'avoid careless neck motion; learn formal restriction in training', wrong: ['yank the neck to test pain', 'ignore MOI', 'replace breathing support'], why: 'Do no further harm.' },
      ]),
    ],
  },
  {
    num: 6, slug: 'cardiac-arrest', title: 'Cardiac Arrest & Chain of Survival',
    blurb: 'Early recognition, CPR, defibrillation, ALS, post-arrest care — get certified; text is not a CPR class.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>List the early links of the chain of survival.</li>
<li>Explain why CPR and defibrillation are time-critical.</li>
<li>Commit to learning compressions in a certified hands-on course.</li>
</ul>
<h2>Hook</h2>
<p>Seconds of hesitation at the start of arrest are minutes of brain time you cannot buy back.</p>
<h2>Intuition</h2>
<p>Blood needs a pump and, for some rhythms, an electrical reset. Bystanders and AEDs are part of the designed system — not optional flavor text.</p>
<h2>Formal ideas</h2>
<p>Chain of survival (public framing): recognition/activation → high-quality CPR → defibrillation → advanced care → post-arrest care. Rate, depth, recoil, and minimizing pauses are motor skills — <strong>AHA or equivalent courses</strong> teach them. This unit explains <em>why</em> the chain exists.</p>
<div class="example"><h3>Worked example</h3>
<p>Adult collapses, unresponsive, not breathing normally → activate help, start CPR as trained, apply AED when available; do not learn hand position from an action movie.</p></div>
<div class="tip"><strong>Common mistake:</strong> thinking reading about CPR equals being able to perform CPR.</div>
<ul class="takeaways"><li>Time to CPR and defibrillation matters.</li><li>Get certified for skills.</li><li>Codes are team events; the chain continues after ROSC.</li></ul>`,
    problems: [
      mc('med-u6-mc', 'Chain of survival', [
        { q: 'Early links in the chain of survival include…', correct: 'recognition, CPR, and defibrillation', wrong: ['only billing', 'only long-term rehab without CPR', 'ignoring AEDs always'], why: 'Classic chain.' },
        { q: 'High-quality CPR is best learned…', correct: 'in a certified hands-on course', wrong: ['only by reading this paragraph', 'from action movies', 'by practicing on siblings unsupervised'], why: 'Psychomotor skill.' },
        { q: 'AEDs are designed so…', correct: 'trained and many lay rescuers can defibrillate shockable rhythms quickly', wrong: ['they replace scene safety', 'they give opioid doses', 'they measure soil potassium'], why: 'Public access defibrillation.' },
        { q: 'After ROSC, systems focus on…', correct: 'post-arrest care (as trained) — the chain continues', wrong: ['stopping all monitoring forever immediately', 'farm chore order', 'Boolean algebra'], why: 'Final links matter.' },
      ]),
      mc('med-u6-roles', 'Team & timing', [
        { q: 'Clear roles during a resuscitation mainly help…', correct: 'reduce chaos and wasted pauses', wrong: ['replace compressions entirely', 'avoid calling for help', 'invent drug doses'], why: 'Crew resource idea.' },
        { q: 'Why minimize pauses in compressions (as taught in class)?', correct: 'blood flow falls quickly when compressions stop', wrong: ['pauses increase soil nitrogen', 'AEDs forbid any rhythm check ever', 'paperwork requires constant pauses'], why: 'Perfusion depends on the pump.' },
      ]),
    ],
  },
];

module.exports = buildTrack(reg.get('paramedic'), units);
