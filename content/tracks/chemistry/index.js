'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool , qty} = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'atoms-moles', title: 'Atoms, Moles & Molar Mass',
    blurb: 'Atomic identity, Avogadro’s number, and converting grams ↔ moles — the counting unit of chemistry.',
    lesson: String.raw`
<h2>Learning goals</h2>
<ul>
<li>Connect grams, moles, and molar mass with $n=m/M$.</li>
<li>Keep units visible in every step.</li>
<li>Estimate whether an answer size makes sense.</li>
</ul>
<h2>Hook</h2>
<p>Recipes on a farm and recipes in a flask both need a fair way to count “how much stuff” when pieces are tiny — that count is the <strong>mole</strong>.</p>
<h2>Intuition</h2>
<p>Molar mass $M$ tells you how many grams weigh one mole. If a bag is heavier, it holds more moles of that substance.</p>
<h2>Formal</h2>
<p>$n = m/M$ with $m$ in grams and $M$ in g/mol. Rearrange: $m=nM$.</p>
<div class="example"><h3>Worked example</h3>
<p>$36\ \text{g}$ of a substance with $M=18\ \text{g/mol}$: $n=36/18=2\ \text{mol}$.</p></div>
<div class="tip"><strong>Common mistake:</strong> dividing molar mass by mass ($M/m$) instead of $m/M$.</div>
<ul class="takeaways"><li>Mole is a counting unit.</li><li>$n=m/M$.</li><li>Track g vs g/mol vs mol.</li></ul>
`,
    problems: [
      { id: 'chem-u1-n', title: 'Grams to moles', kind: 'numeric',
        gen(r) {
          const M = r.pick([18, 28, 32, 44, 58.5]);
          const g = r.pick([M, 2 * M, 0.5 * M, 3 * M]);
          return { prompt: String.raw`$${qty(g,'g')} of substance with $M=${qty(M,'g/mol')}. Moles?`, answers: [ans('n', 'n', g / M, 'mol')], hints: ['n=m/M'], solution: String.raw`<p>$n=${fmt(g/M)}$</p>` };
        } },
      { id: 'chem-u1-m', title: 'Moles to grams', kind: 'numeric',
        gen(r) {
          const M = r.pick([18, 40, 44, 98]);
          const n = r.pick([0.5, 1, 2, 2.5]);
          return { prompt: String.raw`$n=${qty(n,'mol')}, $M=${qty(M,'g/mol')}. Mass?`, answers: [ans('m', 'm', n * M, 'g')], hints: ['m=nM'], solution: String.raw`<p>$m=${fmt(n*M)}$</p>` };
        } },
      { id: 'chem-u1-mc', title: 'Concept check: moles', kind: 'mc',
        gen: mcPool([
          { q: 'One mole of any atoms contains…', correct: 'Avogadro’s number of atoms', wrong: ['one gram always', 'one liter always', '12 atoms'], why: 'Definition.' },
          { q: 'Molar mass units are typically…', correct: 'g/mol', wrong: ['mol/g only', 'newtons', 'Hz'], why: 'Lab scale.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'stoich', title: 'Balanced Equations & Stoichiometry',
    blurb: 'Atom conservation, mole ratios from coefficients, and limiting reactants.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>A balanced equation conserves atoms. Coefficients are <strong>mole ratios</strong>. For $2\\mathrm{H_2}+\\mathrm{O_2}\\to 2\\mathrm{H_2O}$, 2 mol H₂ react with 1 mol O₂.</p>
<p><strong>Limiting reactant:</strong> the reactant that runs out first caps the product. Convert everything to moles, compare via the ratio, compute product from the limiter.</p>
<div class="example"><h3>Worked example</h3>
<p>$N_2 + 3H_2 \\to 2NH_3$. From 2 mol $N_2$ and 3 mol $H_2$, H₂ limits (needs 6 mol H₂ for 2 mol N₂). Product from 3 mol H₂: $2\\ \\mathrm{mol\\ NH_3}$.</p></div>
<ul class="takeaways"><li>Balance atoms first.</li><li>Coefficients → mole ratios.</li><li>Limiter determines yield.</li></ul>`,
    problems: [
      { id: 'chem-u2-ratio', title: 'Mole ratio product', kind: 'numeric',
        gen(r) {
          const nH2 = r.pick([3, 6, 9]);
          const nNH3 = (2 / 3) * nH2;
          return { prompt: String.raw`For $N_2+3H_2\\to 2NH_3$, how many moles $NH_3$ from $${nH2}\\ \\text{mol }H_2$ (excess $N_2$)?`, answers: [ans('n', 'n', nNH3, 'mol')], hints: ['2 mol NH3 per 3 mol H2'], solution: String.raw`<p>$n=${fmt(nNH3)}$</p>` };
        } },
      { id: 'chem-u2-limit', title: 'Which limits? (numeric code)', kind: 'numeric',
        gen(r) {
          // 2H2 + O2 -> 2H2O; return 1 if H2 limits, 2 if O2 limits
          const nH2 = r.pick([2, 4]), nO2 = r.pick([1, 3]);
          const needO2 = nH2 / 2;
          const code = nO2 < needO2 - 1e-9 ? 2 : 1;
          return { prompt: String.raw`$2H_2+O_2\\to 2H_2O$ with $${nH2}\\ \\text{mol }H_2$ and $${nO2}\\ \\text{mol }O_2$. Enter 1 if $H_2$ limits, 2 if $O_2$ limits.`, answers: [ans('c', 'c', code, '')], hints: ['Compare O2 available to nH2/2.'], solution: String.raw`<p>code ${code}</p>` };
        } },
      { id: 'chem-u2-mc', title: 'Concept check: stoich', kind: 'mc',
        gen: mcPool([
          { q: 'Balancing changes…', correct: 'coefficients, not subscripts inside formulas', wrong: ['the identity of elements arbitrarily', 'Avogadro’s number', 'c'], why: 'H2O stays H2O.' },
          { q: 'Limiting reactant…', correct: 'is used up first and caps product', wrong: ['is always the product', 'has the largest molar mass always', 'is leftover excess'], why: 'Bottleneck.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'periodic-bonding', title: 'Electrons, Periodic Trends & Bonding',
    blurb: 'Valence electrons, ionic vs covalent bonding, and electronegativity as a tug-of-war.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Valence electrons</strong> drive bonding. Metals + nonmetals often form <strong>ionic</strong> compounds (electron transfer, lattices of ions). Nonmetals share electrons in <strong>covalent</strong> bonds. <strong>Electronegativity</strong> measures attraction for bonding electrons; unequal sharing → polar bonds.</p>
<p>Periodic trends (teaching level): ionization energy and electronegativity generally increase across a period; atomic radius generally decreases across a period.</p>
<ul class="takeaways"><li>Valence shell rules of thumb (octet) guide many main-group cases.</li><li>Ionic vs covalent is a spectrum with polar covalent in between.</li><li>Trends explain reactivity patterns.</li></ul>`,
    problems: [
      { id: 'chem-u3-mc', title: 'Concept check: bonding', kind: 'mc',
        gen: mcPool([
          { q: 'NaCl is best first-described as…', correct: 'ionic (Na⁺ and Cl⁻ lattice)', wrong: ['a covalent network diamond twin', 'a metal alloy only', 'a noble gas mixture'], why: 'Metal + nonmetal salt.' },
          { q: 'A covalent bond…', correct: 'shares electrons between atoms', wrong: ['always fully transfers electrons', 'is gravity', 'requires superconductivity'], why: 'Sharing.' },
          { q: 'Polar covalent means…', correct: 'unequal sharing due to electronegativity difference', wrong: ['no electrons exist', 'only ionic crystals', 'nuclear fusion'], why: 'Partial charges.' },
          { q: 'Across a period, atomic radius generally…', correct: 'decreases (effective nuclear charge rises)', wrong: ['always explodes', 'becomes infinite', 'is unrelated to electrons'], why: 'Trend.' },
        ]) },
    ],
  },
  {
    num: 4, slug: 'imf-states', title: 'Intermolecular Forces & States of Matter',
    blurb: 'Why water is weird: hydrogen bonding, boiling points, and solid/liquid/gas particle pictures.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p><strong>Intramolecular</strong> bonds hold a molecule together; <strong>intermolecular forces (IMFs)</strong> hold molecules to each other. Stronger IMFs → higher boiling points (roughly). Hydrogen bonding (N/O/F with H) makes water’s boiling point high for such a small molecule.</p>
<p>Gases: far apart, compressible. Liquids: close, flowing. Solids: structured or rigid packing. Phase changes absorb/release energy without changing temperature during a pure plateau (idealized heating curve).</p>
<ul class="takeaways"><li>IMFs ≠ covalent bonds inside the molecule.</li><li>H-bonding explains much of water’s behavior.</li><li>Heating curves: slopes vs flat phase-change regions.</li></ul>`,
    problems: [
      { id: 'chem-u4-mc', title: 'Concept check: IMFs', kind: 'mc',
        gen: mcPool([
          { q: 'Hydrogen bonding is…', correct: 'an intermolecular attraction involving H with N/O/F', wrong: ['a nuclear bond', 'identical to a C–C sigma bond always', 'gravity between planets'], why: 'IMF.' },
          { q: 'Stronger IMFs usually mean…', correct: 'higher boiling point (comparable molecules)', wrong: ['lower molar mass always', 'no liquid phase', 'zero vapor pressure always at all T'], why: 'Harder to separate molecules.' },
          { q: 'During a pure ice→water plateau…', correct: 'temperature stays ~constant while energy breaks the solid structure', wrong: ['temperature must skyrocket', 'mass disappears', 'IMFs become nuclear'], why: 'Latent heat.' },
        ]) },
    ],
  },
  {
    num: 5, slug: 'organic-groups', title: 'Organic Chemistry: Carbon & Functional Groups',
    blurb: 'Carbon frameworks, isomers idea, and functional groups that dictate reactivity patterns.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Organic chemistry is the chemistry of carbon frameworks. Carbon forms four bonds (in ordinary teaching compounds), making chains, branches, and rings. <strong>Isomers</strong> share a formula but differ in connectivity/arrangement.</p>
<p><strong>Functional groups</strong> are recurring atom patterns:</p>
<ul>
<li>Alkane: C–C, C–H only</li>
<li>Alkene: C=C</li>
<li>Alcohol: $-\\mathrm{OH}$</li>
<li>Haloalkane: $-\\mathrm{X}$ (F/Cl/Br/I)</li>
<li>Carbonyl: $\\mathrm{C=O}$ (aldehydes/ketones)</li>
<li>Carboxylic acid: $-\\mathrm{COOH}$</li>
<li>Amine: $-\\mathrm{NH_2}$ (and related)</li>
</ul>
<p>Same group → similar reactions across many molecules — that is the organizing principle.</p>
<ul class="takeaways"><li>Carbon scaffolds + groups.</li><li>Learn patterns, not every molecule as a unique snowflake.</li><li>Isomers can differ wildly in property.</li></ul>`,
    problems: [
      { id: 'chem-u5-mc', title: 'Functional group ID', kind: 'mc',
        gen: mcPool([
          { q: 'An −OH on carbon (typical teaching example) indicates…', correct: 'an alcohol', wrong: ['always a metal', 'a noble gas', 'only a salt lattice'], why: 'Functional group.' },
          { q: 'C=C marks…', correct: 'an alkene', wrong: ['an alkane with no pi bond', 'a carboxylic acid always', 'NaCl'], why: 'Double bond.' },
          { q: '−COOH is…', correct: 'a carboxylic acid group', wrong: ['an alkane', 'metallic sodium', 'a photon'], why: 'Organic acids.' },
          { q: 'Isomers have…', correct: 'the same molecular formula but different structure', wrong: ['different formulas always', 'identical connectivity always', 'no carbon'], why: 'Definition.' },
        ]) },
    ],
  },
  {
    num: 6, slug: 'organic-reactions', title: 'Organic Reaction Patterns',
    blurb: 'Addition to alkenes, substitution ideas, and acid–base at carboxyl — pattern recognition over memorizing thousands of named reactions.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>You will meet named reactions later; start with <strong>verbs</strong>:</p>
<ul>
<li><strong>Addition:</strong> atoms add across a π bond (e.g. HBr adding to an alkene).</li>
<li><strong>Substitution:</strong> one group replaces another (e.g. haloalkane chemistry).</li>
<li><strong>Elimination:</strong> forms a π bond while losing atoms (reverse flavor of addition).</li>
<li><strong>Acid–base:</strong> carboxylic acids donate protons; amines can accept — functional groups as acid/base sites.</li>
</ul>
<p>Arrow-pushing (electron-pair moves) is the grammar of mechanisms — introduced gently here as “electrons flow from source to sink.”</p>
<div class="tip"><strong>Safety:</strong> Lab organic work needs proper training, ventilation, and supervision. This track teaches ideas, not unsupervised experiments.</div>
<ul class="takeaways"><li>Classify by what happens to bonds/groups.</li><li>Functional group predicts the verb.</li><li>Mechanisms track electron pairs.</li></ul>`,
    problems: [
      { id: 'chem-u6-mc', title: 'Reaction pattern check', kind: 'mc',
        gen: mcPool([
          { q: 'Adding HBr across C=C is typically…', correct: 'an addition reaction', wrong: ['nuclear fission', 'only sublimation', 'a metal displacement in the alkali sense only'], why: 'π bond opens.' },
          { q: 'Substitution means…', correct: 'one group replaces another', wrong: ['the molecule vanishes', 'only phase change', 'c doubles'], why: 'Replace.' },
          { q: 'Carboxylic acids in water…', correct: 'can donate a proton (act as acids)', wrong: ['are always strong bases like NaOH', 'have no hydrogen', 'are metallic conductors only'], why: '−COOH.' },
          { q: 'Arrow-pushing in mechanisms tracks…', correct: 'electron pair movement', wrong: ['goat chore order', 'GPS relativistic corrections only', 'Boolean XOR'], why: 'Electrons.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('chemistry'), units);
