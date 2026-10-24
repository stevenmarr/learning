'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

/** Sandy Boots Farm livestock curriculum — practices from farm guidance.
 *  Do not invent phone numbers, fixed herd sizes, or prices beyond noted context.
 */

const units = [
  {
    num: 1, slug: 'stewardship-rhythm', title: 'Farm Stewardship & Daily Rhythm',
    blurb: 'Observation first; chore order water→feed→fences→shelter; biosecurity; safety around pigs, goats, and turkeys.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>At Sandy Boots Farm, good days start with <strong>looking</strong> before doing. Animals tell you what they need if you watch: appetite, gait, manure, breathing, social position in the group. Then chores follow a fixed order so nothing critical gets skipped when you are tired or in a hurry.</p>

<h2>1. Observation first</h2>
<ul>
<li>Count heads / notice who is missing from the usual group.</li>
<li>Scan for limping, isolation, diarrhea, labored breathing, dull eyes.</li>
<li>Listen: distress calls, unusual quiet, predator alarm from poultry.</li>
<li>Check waterers and feeders with your eyes before you assume “they’re fine.”</li>
</ul>

<h2>2. Chore order (memorize this)</h2>
<ol>
<li><strong>Water</strong> — nothing else matters if they cannot drink.</li>
<li><strong>Feed</strong> — after water is confirmed.</li>
<li><strong>Fences</strong> — walk or drive the line; look for dig-outs, loose posts, hot-wire gaps.</li>
<li><strong>Shelter</strong> — shade, dry bedding, wallows (pigs), roosts locked at night (poultry).</li>
</ol>
<div class="tip"><strong>Why this order?</strong> Dehydration and heat kill faster than a missed flake of hay. A fence failure can undo months of careful pasture work in one afternoon.</div>

<h2>3. Biosecurity (farm-scale, not hospital-scale)</h2>
<ul>
<li>New animals quarantine away from the main herd/flock before mixing.</li>
<li>Do not wear the same boots from a sale barn straight into your pens without cleaning.</li>
<li>Separate sick animals when practical; do not “wait and see” for days with poultry or pigs showing acute signs.</li>
<li>Visitors and borrowed equipment are vectors — keep it simple and consistent.</li>
</ul>

<h2>4. Safety around the species you keep</h2>
<table class="tbl"><thead><tr><th>Species</th><th>Respect</th></tr></thead><tbody>
<tr><td>Kunekune pigs</td><td>Strong, curious, can bowl over a kid; never trust a hot wire you have not tested; boars and protective sows need space.</td></tr>
<tr><td>Nubian goats</td><td>Climb and test fences; horns and sudden bolts; do not corner a nervous animal.</td></tr>
<tr><td>Spanish turkeys</td><td>Can be territorial; watch kids near breeding toms; move calmly.</td></tr>
</tbody></table>

<ul class="takeaways">
<li>Look first, then chore.</li>
<li>Water → feed → fences → shelter.</li>
<li>Quarantine newcomers; clean boots/equipment between high-risk sites.</li>
<li>Respect mass, horns, and maternal instinct.</li>
</ul>`,
    problems: [
      { id: 'liv-u1-order', title: 'Chore order', kind: 'mc',
        gen: mcPool([
          { q: 'Correct daily chore priority order?', correct: 'Water → feed → fences → shelter', wrong: ['Feed → water → shelter → fences', 'Fences → feed → water → shelter', 'Shelter → fences → feed → water'], why: 'Water first; then feed; then containment; then housing/comfort.' },
          { q: 'You are short on time. What must not be skipped?', correct: 'Confirming water is available and clean enough to drink', wrong: ['Extra grain for the pigs', 'A second photo for social media', 'Rearranging decorative fencing'], why: 'Dehydration and heat stress escalate fast.' },
          { q: 'Best first action when you enter a pen?', correct: 'Observe animals and count / scan for odd behavior', wrong: ['Immediately dump feed without looking', 'Chase animals to “exercise” them', 'Turn off water to clean later'], why: 'Observation catches problems early.' },
        ]) },
      { id: 'liv-u1-bio', title: 'Biosecurity choice', kind: 'mc',
        gen: mcPool([
          { q: 'A new goat arrives from another farm. Best practice?', correct: 'Quarantine away from the main herd before mixing', wrong: ['Turn it out with the Cedar Crew the same hour', 'Skip quarantine if it looks healthy', 'House it with the turkeys overnight'], why: 'Incubation periods hide illness; quarantine protects the herd.' },
          { q: 'You visited a livestock auction. Before chores at home…', correct: 'Clean or change boots / avoid tracking manure into pens', wrong: ['Walk straight through every pen in auction boots', 'Dip boots in the drinking water', 'Skip chores for a week'], why: 'Boots move pathogens.' },
        ]) },
      { id: 'liv-u1-safety', title: 'Species safety', kind: 'mc',
        gen: mcPool([
          { q: 'Around Kunekune pigs, a fair safety habit is…', correct: 'Test fence / hot wire and give sows with piglets space', wrong: ['Corner a sow with newborns for photos', 'Assume pet-pig manners always', 'Leave gates propped with a stick “for a minute”'], why: 'Mass + maternal instinct + weak gates = injuries and escapes.' },
          { q: 'Nubian goats often defeat…', correct: 'Weak or low fencing they can climb or slip through', wrong: ['All concrete walls instantly', 'Electric fences that are actually hot and well built', 'Locked metal buildings with no gaps'], why: 'Browsers test boundaries; fencing is non-negotiable.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'pasture-soil-seasons', title: 'Pasture, Soil & East Texas Seasons',
    blurb: 'Sandy/acid soils; winter forages for pigs and goats; shade, wallows, parasites in warm/wet weather.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Sandy Boots sits on <strong>East Texas sandy, often acidic soils</strong>. Soil tests (including SFA-context testing the farm uses) commonly show <strong>low potassium (K) and magnesium (Mg)</strong>, while <strong>phosphorus (P) is often already high</strong> — so you do not blindly add “complete” fertilizer. Lime, potash, and nitrogen decisions follow the <strong>soil test</strong>, not a bag slogan.</p>

<h2>1. Winter forage plan (East Texas Seed–style thinking)</h2>
<ul>
<li><strong>~8 acres ryegrass + crimson clover</strong> aimed at <strong>pigs on pasture</strong> — pasture-first; do not push grain as the main plan.</li>
<li><strong>~4 acres cereal rye + hairy vetch</strong> for complementary winter cover / browse-friendly biomass.</li>
<li><strong>Low Boy ryegrass</strong> for lawn / high-traffic green near the house.</li>
<li><strong>Plant after rain</strong> when moisture will actually start the seed — dry dust-ins fail.</li>
</ul>

<h2>2. Spring and warm season</h2>
<p>Spring forbs and warm-season growth change what is on offer. Rotate and rest paddocks when you can. <strong>Shade and wallows</strong> are not luxuries for pigs in East Texas heat — they are welfare gear.</p>

<h2>3. Parasite pressure</h2>
<p>Warm + wet = higher parasite challenge (especially goats and young stock). Pasture rotation, avoiding forced grazing of short dirty grass, and watching animals beat “worm every calendar date because a bottle said so.”</p>

<div class="tip"><strong>Fertility habit:</strong> Retest soil on a schedule your extension / agronomy advice recommends. High P means do not keep stacking phosphorus “just in case.”</div>

<ul class="takeaways">
<li>Sandy/acid; watch K, Mg; P often high — follow the soil test.</li>
<li>Winter: ryegrass+crimson (~8ac pigs), cereal rye+vetch (~4ac), Low Boy for lawn.</li>
<li>Seed after meaningful rain; shade/wallows for pigs; parasites rise warm/wet.</li>
</ul>`,
    problems: [
      { id: 'liv-u2-soil', title: 'East Texas soil pattern', kind: 'mc',
        gen: mcPool([
          { q: 'On this farm’s sandy East Texas soils, a common pattern is…', correct: 'Low K and Mg; phosphorus often already high', wrong: ['Always low P and sky-high K', 'Never needs lime consideration', 'Salt marsh fertility'], why: 'Matches the SFA-context soil-test story: do not blind-add P.' },
          { q: 'Best guide for lime / potash / N?', correct: 'Current soil test recommendations', wrong: ['Whatever the feed store stacks by the door', 'Last year’s social media trend', 'Double every nutrient every spring'], why: 'Soil tests beat guesswork — especially with high P.' },
        ]) },
      { id: 'liv-u2-forage', title: 'Winter forage roles', kind: 'mc',
        gen: mcPool([
          { q: 'The ~8 ac ryegrass + crimson clover block is aimed at…', correct: 'Pasture-first nutrition for pigs (not a grain-push plan)', wrong: ['Only turkey roosts', 'Replacing all goat browse year-round', 'Selling seed commercially as the main farm plan'], why: 'Pigs on pasture; grain is not the centerpiece.' },
          { q: 'When to plant winter annuals?', correct: 'After rain so moisture can germinate seed', wrong: ['In hard drought dust for “early start”', 'Only in midsummer heat', 'Never — buy all hay forever'], why: 'Moisture starts the stand.' },
          { q: 'Low Boy ryegrass here is for…', correct: 'Lawn / high-traffic green near the house', wrong: ['The only pig pasture', 'Turkey night lockup', 'Goat mineral'], why: 'Separate from the livestock forage blocks.' },
        ]) },
      { id: 'liv-u2-heat', title: 'Heat & parasites', kind: 'mc',
        gen: mcPool([
          { q: 'For Kunekunes in East Texas summer, prioritize…', correct: 'Shade and wallows (plus water)', wrong: ['Full sun pens with no mud option', 'Removing all water midday', 'Only indoor concrete forever with no plan'], why: 'Heat stress management is welfare.' },
          { q: 'Parasite pressure tends to rise when…', correct: 'Weather is warm and wet', wrong: ['Only during ice storms', 'Never on sand', 'Only if you use alfalfa'], why: 'Classic small-ruminant / pasture pattern.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'kunekune', title: 'Kunekune Pigs',
    blurb: 'Grazing breed; pasture-first; alfalfa hay; fencing, wallows, farrowing risk; live sale & custom-exempt path.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Kunekunes are a <strong>grazing breed</strong>. At Sandy Boots the model is <strong>pasture-first</strong>, not finishing on a mountain of bagged feed. That changes fencing, forage, and how you talk to buyers.</p>

<h2>1. Feed & forage</h2>
<ul>
<li>Pasture first (see Unit 2 winter plan).</li>
<li><strong>Alfalfa hay</strong> from a reliable source (e.g. Tractor Supply when that is what you use) — <strong>do not casually substitute random grass hay</strong> and assume it is the same.</li>
<li>Bagged feed exists as a tool; as <em>context only</em>, a common ~50 lb bag might run on the order of <strong>~$14</strong> depending on store and week — not a price you quote as gospel, and not a reason to abandon pasture.</li>
</ul>

<h2>2. Housing & fencing</h2>
<p>Wallows, shade, and fencing that actually holds pigs. Weak fence is how neighbors meet your herd. Hot wire must be <em>hot</em>; check it.</p>

<h2>3. Farrowing</h2>
<p>Crushing risk is real. Give sows space and setup that reduces overlay; watch closely in the first days. Records beat memory.</p>

<h2>4. Sales reality (critical ethics)</h2>
<ul>
<li><strong>Many processors refuse Kunekunes</strong> — do not promise a buyer “any butcher will take them.”</li>
<li>Typical path discussed for this farm: <strong>sell live</strong>; optional transport to <strong>Whispering Pines (Emory, TX)</strong>, a <strong>custom-exempt</strong> plant — roughly <strong>~116 miles</strong> context from the farm area.</li>
<li>Under that model: <strong>the buyer owns the animal before slaughter</strong> and <strong>pays the plant</strong>. This is <strong>not</strong> the farm selling packaged meat out of the freezer under that arrangement.</li>
</ul>

<div class="tip"><strong>Classic mistakes:</strong> overfeeding grain, weak fence, assuming any butcher takes Kunekunes, skipping records.</div>

<ul class="takeaways">
<li>Grazing breed → pasture-first; alfalfa hay thoughtfully.</li>
<li>Shade, wallows, real fencing; respect farrowing crush risk.</li>
<li>Live sale + honest processor limits; Whispering Pines custom-exempt path; buyer owns animal before slaughter.</li>
</ul>`,
    problems: [
      { id: 'liv-u3-feed', title: 'Kunekune feeding model', kind: 'mc',
        gen: mcPool([
          { q: 'Core Kunekune feeding philosophy here?', correct: 'Pasture-first grazing breed; grain is not the main plan', wrong: ['Feedlot grain finishing as the only model', 'No water if pasture is green', 'Only kitchen scraps'], why: 'Breed and farm plan align on pasture.' },
          { q: 'Hay note for this farm’s pigs?', correct: 'Alfalfa hay as specified — don’t casually swap random hay', wrong: ['Any square bale is identical nutrition', 'Hay replaces all water', 'Never offer forage'], why: 'Substitution changes nutrition.' },
        ]) },
      { id: 'liv-u3-sales', title: 'Sales & processor ethics', kind: 'mc',
        gen: mcPool([
          { q: 'Many processors…', correct: 'Refuse Kunekunes — set buyer expectations honestly', wrong: ['All accept Kunekunes without question', 'Require you to invent USDA retail labels at home', 'Ban live sales everywhere'], why: 'Honesty prevents failed appointments and angry buyers.' },
          { q: 'Custom-exempt path described for Whispering Pines (Emory, TX) means…', correct: 'Buyer owns the animal before slaughter and pays the plant; not farm meat retail under that model', wrong: ['Farm sells cut meat to the public from the porch as inspected retail', 'No ownership transfer needed', 'Plant buys the pig from you at the chute always'], why: 'Live animal sale + custom-exempt processing for the owner.' },
          { q: 'Whispering Pines distance context from the farm area?', correct: 'On the order of ~116 miles (plan the trip; do not treat as next door)', wrong: ['Across the driveway', 'Only accessible by plane', 'Unknown on purpose — never tell buyers'], why: 'Logistics honesty.' },
        ]) },
      { id: 'liv-u3-mistakes', title: 'Kunekune mistakes', kind: 'mc',
        gen: mcPool([
          { q: 'A listed classic mistake is…', correct: 'Weak fence / assuming any butcher takes them / skipping records', wrong: ['Providing shade', 'Walking fences', 'Keeping sale records'], why: 'Those three bite farms repeatedly.' },
          { q: 'Farrowing concern to take seriously?', correct: 'Crushing / overlay risk to piglets', wrong: ['Piglets never need warmth or space planning', 'Sows never lie down', 'Only turkey brooders matter'], why: 'Setup and watching matter.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'nubian-goats', title: 'Nubian Goats & the Cedar Crew',
    blurb: 'Browsers on pines/juniper; fencing & predators; copper mineral awareness; sale vs land-clearing lease.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>The <strong>Cedar Crew</strong> Nubians are <strong>browsers</strong> — they work woody plants (pines, juniper/cedar-type browse) in a way grass-only cows do not. Treat them like lawn ornaments on bare dirt and they fail; treat them like tools + livestock with real fence and minerals and they earn their keep.</p>

<h2>1. Browse vs bare dirt</h2>
<p>They need something to browse and a rotation story. Bare dirt only is a welfare and parasite problem, not a business model.</p>

<h2>2. Fencing & predators</h2>
<p>Goats test fence. Predators test your night habits. Plan both — do not assume “rural” means safe.</p>

<h2>3. Copper (Cu) mineral awareness</h2>
<p>Goats have specific mineral needs; copper status is a known goat topic in the industry. Use <strong>goat-appropriate mineral</strong> per label and vet/extension guidance — do not freestyle cattle mineral or homemade copper experiments.</p>

<h2>4. Breeding basics & business lanes</h2>
<ul>
<li>Breeding: keep simple records (dates, buck, outcomes).</li>
<li><strong>Sale</strong> of animals vs <strong>land-clearing lease</strong> (goats as living brush control): different promises. <strong>Do not overpromise</strong> how fast a crew will clear a jungle.</li>
</ul>

<div class="tip"><strong>Mistakes:</strong> bare dirt only, poor fence, petting-zoo treatment that ignores goat behavior and browse needs.</div>

<ul class="takeaways">
<li>Browsers ≠ lawn sheep on dirt.</li>
<li>Fence + predators + goat mineral (Cu awareness).</li>
<li>Sale vs clearing lease — honest scope.</li>
</ul>`,
    problems: [
      { id: 'liv-u4-browse', title: 'Browser ecology', kind: 'mc',
        gen: mcPool([
          { q: 'Nubians on this farm are best described as…', correct: 'Browsers that can work pines/juniper-type woody plants', wrong: ['Obligate grain feedlot cattle', 'Animals that need zero forage', 'Waterfowl'], why: 'Cedar Crew identity is browse work.' },
          { q: 'Bare dirt only as a long-term pen…', correct: 'Is a mistake for these goats', wrong: ['Is ideal browse', 'Replaces minerals', 'Stops all predators'], why: 'Welfare + parasites + nothing to do.' },
        ]) },
      { id: 'liv-u4-mineral', title: 'Mineral caution', kind: 'mc',
        gen: mcPool([
          { q: 'Copper mineral awareness means…', correct: 'Use goat-appropriate mineral per guidance — don’t freestyle DIY copper', wrong: ['Make homemade copper recipes from internet myths', 'Never offer any mineral', 'Only give horse mineral blocks'], why: 'Species-appropriate products; no DIY drug/mineral recipes.' },
        ]) },
      { id: 'liv-u4-biz', title: 'Sale vs clearing lease', kind: 'mc',
        gen: mcPool([
          { q: 'When quoting goats for land clearing…', correct: 'Do not overpromise speed or total kill of every plant', wrong: ['Guarantee a parking lot in one weekend always', 'Skip fencing talk', 'Promise they replace all herbicides and dozers forever'], why: 'Honest scope protects reputation.' },
          { q: 'Petting-zoo treatment (ignoring goat behavior/browse)…', correct: 'Is listed as a classic mistake', wrong: ['Is the Cedar Crew SOP', 'Replaces fencing', 'Fixes copper status'], why: 'They are livestock with a job, not plush toys.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'spanish-turkeys', title: 'Spanish Turkeys',
    blurb: 'Brooding, outdoor life, roosts, predators; blackhead awareness with chickens; honest direct sales.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Spanish turkeys need a dry start, a real outdoor life, and <strong>night lockup</strong>. Predators write the ending of many “free range” stories that skip the latch.</p>

<h2>1. Brooding & grow-out</h2>
<ul>
<li>Dry brooder — wet brooders chill and sicken poults.</li>
<li>Transition outdoors with shelter and roosts.</li>
<li>Night lockup is non-negotiable in coyote/owl country.</li>
</ul>

<h2>2. Blackhead awareness</h2>
<p>Histomoniasis (“blackhead”) is a known turkey risk, historically tied up with chicken interactions in many farm settings. Practical takeaway: <strong>be cautious about mixing</strong> and about dirty shared ground — follow current extension/vet guidance; this course does not invent a drug protocol.</p>

<h2>3. Sales</h2>
<p>Direct sales: be honest about <strong>weight and age</strong>. Do not dress up a bird with fiction.</p>

<div class="tip"><strong>Mistakes:</strong> wet brooders, no night lockup, mixing sick birds into the healthy flock.</div>

<ul class="takeaways">
<li>Dry brood → outdoor + roosts → lock at night.</li>
<li>Blackhead awareness around chickens / shared ground.</li>
<li>Honest weight and age at sale.</li>
</ul>`,
    problems: [
      { id: 'liv-u5-brood', title: 'Turkey brooding', kind: 'mc',
        gen: mcPool([
          { q: 'Wet brooders are…', correct: 'A classic mistake — keep brooding dry', wrong: ['Required for Spanish turkeys', 'How you feed alfalfa', 'A predator deterrent'], why: 'Chill and disease follow wet bedding.' },
          { q: 'Night lockup…', correct: 'Matters — predators hunt the unlocked flock', wrong: ['Is optional if the lawn looks peaceful', 'Replaces all fencing daytime', 'Only applies to pigs'], why: 'Latch the roost.' },
        ]) },
      { id: 'liv-u5-health', title: 'Flock health habits', kind: 'mc',
        gen: mcPool([
          { q: 'Blackhead awareness implies…', correct: 'Caution about chicken/turkey interactions and dirty shared ground; follow vet/extension', wrong: ['A DIY drug recipe in this lesson', 'Turkeys never get parasites', 'Mixing sick and well birds is fine'], why: 'Awareness ≠ homemade pharmacy.' },
          { q: 'Mixing sick birds into the healthy flock…', correct: 'Is a listed mistake', wrong: ['Is best biosecurity', 'Cures blackhead', 'Replaces quarantine'], why: 'Isolate illness.' },
        ]) },
      { id: 'liv-u5-sales', title: 'Turkey sales honesty', kind: 'mc',
        gen: mcPool([
          { q: 'At sale, be honest about…', correct: 'Weight and age', wrong: ['Imaginary USDA stamps you invented', 'Guaranteed zero-predator history forever', 'Exact dollar prices this course invents'], why: 'Direct sales run on trust.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'layers-eggs', title: 'Layers & Eggs',
    blurb: 'Pullets, coop/nests/ventilation, oyster shell, collect/clean/store; Texas egg sales — verify law.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Layers are a daily system: birds, nest boxes, ventilation, clean eggs, and storage. Slack shows up in dirty nests and cracked inventory.</p>

<h2>1. Birds & housing</h2>
<ul>
<li>Pullets need time to come into lay — do not panic on day one of an empty nest.</li>
<li>Coop: dry, ventilated (not drafty wet), predator-tight at night.</li>
<li>Nests: clean enough that eggs do not sit in manure.</li>
</ul>

<h2>2. Calcium</h2>
<p><strong>Oyster shell</strong> (or equivalent free-choice calcium strategy you actually manage) supports shells. Layer feed helps; still watch shell quality.</p>

<h2>3. Collect, clean, store</h2>
<p>Collect regularly. Clean appropriately (avoid soaking guidance myths — prefer dry clean when possible; follow sound egg-handling practice). Store cool and consistent.</p>

<h2>4. Texas egg sales — legal caution</h2>
<p><strong>Flag: verify current Texas law and local rules before selling eggs.</strong> This course does <strong>not</strong> invent legal advice, license numbers, or “you’re fine if…” shortcuts. Check official Texas Department of Agriculture / local requirements yourself or with a qualified advisor.</p>

<ul class="takeaways">
<li>Ventilated, predator-tight coop; clean nests.</li>
<li>Oyster shell / calcium plan; collect often.</li>
<li>Egg sales: verify Texas law — no invented legal advice here.</li>
</ul>`,
    problems: [
      { id: 'liv-u6-coop', title: 'Layer housing', kind: 'mc',
        gen: mcPool([
          { q: 'A layer coop should be…', correct: 'Dry, ventilated, and predator-tight at night', wrong: ['Sealed with zero airflow year-round', 'Open to coyotes for “fresh air”', 'Optional if you have nests in tall grass only'], why: 'Air + dry + night security.' },
          { q: 'Oyster shell is offered mainly for…', correct: 'Calcium to support eggshells', wrong: ['Replacing all water', 'Turkey blackhead treatment', 'Goat copper'], why: 'Shell quality.' },
        ]) },
      { id: 'liv-u6-eggs', title: 'Egg handling & law', kind: 'mc',
        gen: mcPool([
          { q: 'Before selling eggs in Texas…', correct: 'Verify current state/local rules yourself — this course does not invent legal advice', wrong: ['Assume this lesson’s silence means no rules exist', 'Invent a license number', 'Skip cleaning and labeling thoughts entirely without checking'], why: 'Legal flag is intentional.' },
          { q: 'Collecting eggs regularly…', correct: 'Reduces dirt, cracks, and broodiness problems', wrong: ['Is only for show birds', 'Makes oyster shell unnecessary', 'Replaces night lockup'], why: 'Daily habit.' },
        ]) },
      { id: 'liv-u6-collect', title: 'Egg handling habits', kind: 'mc',
        gen: mcPool([
          { q: 'Collecting eggs regularly helps…', correct: 'reduce breakage, broodiness pressure, and dirty/lost eggs', wrong: ['raise invented market prices automatically', 'replace the need for clean nesting areas', 'make roosters lay'], why: 'Fresh collection is husbandry, not a price claim.' },
          { q: 'A dirty nest box usually means you should…', correct: 'clean/refresh bedding and check for broken eggs or wet spots', wrong: ['publish a phone number', 'count a made-up flock size as the fix', 'stop providing water'], why: 'Hygiene and observation.' },
        ]) },
      
    ],
  },
  {
    num: 7, slug: 'health-parasites', title: 'Health, Parasites & First Aid Mindset',
    blurb: 'Early sick signs; FAMACHA-style thinking for goats; red flags; quarantine — no DIY drug recipes.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Early detection beats heroics. This unit teaches <strong>what to notice</strong> and <strong>when to escalate</strong> — not how to concoct medications on the kitchen counter.</p>

<h2>1. Early sick signs (all species)</h2>
<ul>
<li>Off feed / off water</li>
<li>Isolation from the group</li>
<li>Diarrhea, coughing, labored breathing</li>
<li>Sudden lameness, bloating, neurological oddness</li>
</ul>

<h2>2. Goats — FAMACHA-style concept</h2>
<p>FAMACHA is a <strong>conjunctiva color scoring idea</strong> used in parasite management programs for small ruminants (anemia from barber pole worm pressure). Learn the <em>concept</em> from extension/vet training; do not treat this paragraph as certification. Decision rules for wormers belong to <strong>vet and extension teaching</strong>, not internet recipes.</p>

<h2>3. Red flags</h2>
<ul>
<li><strong>Pigs:</strong> down, distressed breathing, not rising, neurologic signs — urgent.</li>
<li><strong>Poultry:</strong> sudden flock deaths, facial swelling, drastic drop in activity — isolate and get advice.</li>
</ul>

<h2>4. Hard rule</h2>
<p><strong>Vaccines and wormers only as vet/extension teach. NO DIY drug recipes in this course.</strong> Quarantine sick/new animals. Dispose of carcasses ethically and legally.</p>

<ul class="takeaways">
<li>Watch appetite, manure, breathing, social isolation.</li>
<li>FAMACHA = trained anemia scoring concept for goats — not a DIY pharmacy.</li>
<li>Quarantine; ethical disposal; professional guidance for drugs.</li>
</ul>`,
    problems: [
      { id: 'liv-u7-signs', title: 'Early sick signs', kind: 'mc',
        gen: mcPool([
          { q: 'An early warning sign across species is…', correct: 'Off feed / isolation / abnormal manure or breathing', wrong: ['Extra curiosity at the gate only', 'Bright eyes and aggressive appetite', 'Normal roosting and chewing cud'], why: 'Behavior and output change first.' },
          { q: 'FAMACHA-style scoring is about…', correct: 'Checking conjunctiva color as an anemia / parasite management concept in goats', wrong: ['A DIY injectable recipe', 'Turkey egg grading', 'Pig wallow depth'], why: 'Concept from small-ruminant parasite programs.' },
        ]) },
      { id: 'liv-u7-drugs', title: 'Drug & quarantine rules', kind: 'mc',
        gen: mcPool([
          { q: 'This course’s rule on wormers/vaccines?', correct: 'Only as vet/extension teach — no DIY drug recipes', wrong: ['Mix random cattle pour-ons for goats from memory', 'Dose by Facebook poll', 'Skip all quarantine forever'], why: 'Safety and stewardship.' },
          { q: 'New or sick animals should be…', correct: 'Quarantined when practical', wrong: ['Mixed immediately with neonates', 'Hidden from observation', 'Given unlabeled powders'], why: 'Biosecurity.' },
        ]) },
      { id: 'liv-u7-vet', title: 'When to call for help', kind: 'mc',
        gen: mcPool([
          { q: 'Withdrawal times and labeled use matter because…', correct: 'food safety and legal/responsible drug use depend on them', wrong: ['they set the farm’s public phone tree', 'they invent headcounts', 'parasites enjoy paperwork'], why: 'Stewardship and compliance — no invented prices.' },
          { q: 'Best early response to an animal that is off-feed and dull…', correct: 'observe vitals/behavior, isolate if needed, and get experienced/vet guidance rather than guessing strong drugs', wrong: ['post a sale price first', 'ignore for a month on purpose', 'share someone else’s private phone number as content'], why: 'Assessment before treatment.' },
        ]) },
      
    ],
  },
  {
    num: 8, slug: 'breeding-sales-honesty', title: 'Breeding, Sales & Customer Honesty',
    blurb: 'Live-sale ethics; processor logistics; goat clearing quotes; turkey/egg direct sales; stewardship frame.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Reputation is a farm asset. Breeding records and honest sales pitches keep Sandy Boots sustainable when processors are picky and buyers are learning.</p>

<h2>1. Live-sale ethics</h2>
<ul>
<li>Describe age, sex, temperament, and known health honestly.</li>
<li>For Kunekunes: remind buyers that <strong>many plants refuse the breed</strong>; explain live sale and optional <strong>Whispering Pines (Emory, TX)</strong> custom-exempt logistics (~<strong>116 mi</strong> context).</li>
<li>Buyer owns the animal before slaughter and pays the plant under that model — you are not improvising retail meat claims.</li>
</ul>

<h2>2. Goats as clearing</h2>
<p>Quote land-clearing jobs with fence needs, duration realism, and plant types. Underpromise; overdeliver.</p>

<h2>3. Turkeys & eggs</h2>
<p>Direct to customer: honest weight/age; eggs only after you <strong>verified Texas rules</strong>.</p>

<h2>4. Optional stewardship frame</h2>
<p>If it fits your family’s voice: animals as a trust — water, fence, shade, and honest dealing are moral habits, not only chores. Keep it sincere; never use faith language to excuse cutting corners on welfare or truth.</p>

<ul class="takeaways">
<li>Honest live sales; processor limits disclosed.</li>
<li>Clearing quotes with realistic scope.</li>
<li>Stewardship = care + truth.</li>
</ul>`,
    problems: [
      { id: 'liv-u8-ethics', title: 'Customer honesty', kind: 'mc',
        gen: mcPool([
          { q: 'Before a Kunekune live sale, disclose…', correct: 'That many processors refuse Kunekunes and explain the live/custom-exempt path', wrong: ['That every grocery butcher will take them gladly', 'Nothing about logistics', 'A fake inspection stamp'], why: 'Avoid failed slaughter appointments.' },
          { q: 'Under the Whispering Pines custom-exempt model described…', correct: 'Buyer owns the animal before slaughter and pays the plant', wrong: ['Farm sells boxed retail chops by default under that story', 'Ownership never transfers', 'The plant always buys the live pig from you as packer'], why: 'Live animal → owner → custom plant.' },
        ]) },
      { id: 'liv-u8-quotes', title: 'Clearing quotes', kind: 'mc',
        gen: mcPool([
          { q: 'Goat clearing quotes should…', correct: 'Stay realistic on time/scope and mention fencing needs', wrong: ['Guarantee instant bare soil always', 'Ignore predators and water', 'Promise copper cures brush'], why: 'Underpromise; overdeliver.' },
        ]) },
      { id: 'liv-u8-honesty', title: 'Sales honesty check', kind: 'mc',
        gen: mcPool([
          { q: 'Honest livestock sales emphasize…', correct: 'accurate descriptions of health, temperament, and known issues', wrong: ['invented phone numbers in lessons', 'made-up herd headcounts as curriculum facts', 'fake market prices presented as farm data'], why: 'Ethics over hype; this course does not invent farm commercial figures.' },
          { q: 'If you do not know an answer a buyer asks…', correct: 'say you do not know and offer to find out', wrong: ['invent a confident number', 'guess a phone contact for someone else', 'change the subject to headcount bragging'], why: 'Integrity.' },
        ]) },
      
    ],
  },
  {
    num: 9, slug: 'capstone', title: 'Capstone: Week Plan & Customer FAQ',
    blurb: 'Plan a chore week; fence/water checklist; answer one tough customer FAQ honestly.',
    lesson: String.raw`
<h2>Capstone goals</h2>
<p>Pull the farm together: a <strong>week of chores</strong> with the Unit 1 order baked in, a <strong>fence/water checklist</strong> you could actually run, and a <strong>customer FAQ answer</strong> that is honest about pigs, goats, turkeys, or eggs.</p>

<h2>1. Chore week (template)</h2>
<ul>
<li>Daily: water → feed → quick fence glance → shelter/roost lock.</li>
<li>2–3× week: deeper fence walk, wallow/shade check, egg collect discipline, browse/pasture glance.</li>
<li>Weekly: records (breeding, sales, treatments per vet advice only), quarantine check, supply list (alfalfa, mineral, oyster shell).</li>
</ul>

<h2>2. Fence / water checklist</h2>
<ul>
<li>Waterers full, clean enough, not frozen/algae-choked.</li>
<li>Hot wire voltage / physical barrier integrity.</li>
<li>Gates latch; no “temporary” prop sticks left behind.</li>
<li>Dig-outs at pig pressure points; goat climb spots.</li>
</ul>

<h2>3. Sample FAQ (practice honesty)</h2>
<p><em>“Can I just take these Kunekunes to the processor in town?”</em> — Many plants refuse Kunekunes. We sell live; some buyers use Whispering Pines in Emory (custom-exempt, on the order of ~116 miles). You own the animal before slaughter and pay the plant. We do not pretend every butcher will say yes.</p>

<ul class="takeaways">
<li>Write the week; run the checklist.</li>
<li>FAQ answers disclose limits.</li>
<li>Stewardship shows in boring consistency.</li>
</ul>`,
    problems: [
      { id: 'liv-u9-checklist', title: 'Fence/water checklist', kind: 'mc',
        gen: mcPool([
          { q: 'A fence/water checklist should include…', correct: 'Water working + fence/hot-wire integrity + gates latching', wrong: ['Only Instagram photos', 'Only bagged feed prices', 'Skipping water if pasture is green'], why: 'Containment + hydration.' },
          { q: 'Daily backbone of the chore week?', correct: 'Water → feed → fences → shelter/lockup', wrong: ['Sales calls → grain → ignore water', 'Shelter only on Sundays', 'Fences once a year'], why: 'Unit 1 order scales to a week plan.' },
        ]) },
      { id: 'liv-u9-faq', title: 'Customer FAQ quality', kind: 'mc',
        gen: mcPool([
          { q: 'A good Kunekune processor FAQ answer…', correct: 'Admits many plants refuse them and explains live/custom-exempt logistics honestly', wrong: ['Promises every town butcher will take them', 'Invent a phone number for Whispering Pines in this course', 'Avoids mentioning buyer ownership before slaughter'], why: 'Honesty + correct model; no invented phone numbers.' },
          { q: 'This curriculum avoids inventing…', correct: 'Phone numbers, fixed headcounts, and off-script prices/legal claims', wrong: ['Chore order', 'Pasture-first Kunekune framing', 'Night lockup for turkeys'], why: 'Farm-accurate boundaries.' },
        ]) },
      { id: 'liv-u9-scenario', title: 'Capstone scenario', kind: 'mc',
        gen: mcPool([
          { q: 'Saturday AM: empty pig waterer, loose gate pin, and a buyer asking if “any butcher” takes Kunekunes. First move?', correct: 'Fix water, secure the gate, then answer the buyer honestly about processor limits', wrong: ['Ignore water; close the sale with a guarantee any butcher will take them', 'Drive to Emory before watering', 'Turn goats in with turkeys while you think'], why: 'Animals first; honesty second — same visit.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('livestock'), units);
