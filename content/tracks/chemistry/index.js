'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { fmt, q, ans, mcPool } = require('../../helpers');
const { byId: reg } = require('../registry');

const units = [
  {
    num: 1, slug: 'atoms-moles', title: 'Atoms, Moles & Stoichiometry',
    blurb: 'Mole as a counting unit; balancing the idea of atoms conserved in reactions.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>A mole is $N_A\\approx6.022\\times10^{23}$ entities. Molar mass converts grams ↔ moles. Balanced equations conserve atoms.</p>
<ul class="takeaways"><li>Mole = counting unit.</li><li>Balance atoms before computing masses.</li></ul>`,
    problems: [
      { id: 'chem-u1-moles', title: 'Grams to moles', kind: 'numeric',
        gen(r) { const MM=r.pick([18,28,32,44]); const g=r.pick([18,36,56,88]); const n=g/MM; return { prompt: String.raw`$${g}\\ \\text{g}$ of a substance with molar mass $${MM}\\ \\text{g/mol}$. Moles?`, answers:[ans('n','n',n,'mol')], hints:['n=m/M'], solution:String.raw`<p>$n=${fmt(n)}\\ \\text{mol}$</p>` }; } },
      { id: 'chem-u1-mc', title: 'Concept check: moles', kind: 'mc',
        gen: mcPool([
          { q: 'A mole counts…', correct: 'a huge fixed number of particles (Avogadro’s number)', wrong: ['only liters of gas always', 'temperature', 'pH'], why: 'Counting unit.' },
        ]) },
    ],
  },
  {
    num: 2, slug: 'bonding-imf', title: 'Bonding & Intermolecular Forces',
    blurb: 'Ionic vs covalent ideas; why water’s polarity matters.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Ionic: electrons transferred; covalent: shared. Polarity and hydrogen bonding explain water’s odd high boiling point for a small molecule.</p>
<ul class="takeaways"><li>Bond type shapes properties.</li><li>IMFs ≠ intramolecular bonds.</li></ul>`,
    problems: [
      { id: 'chem-u2-mc', title: 'Concept check: bonding', kind: 'mc',
        gen: mcPool([
          { q: 'Covalent bonds…', correct: 'share electrons between atoms', wrong: ['always transfer electrons completely', 'are only in metals', 'ignore valence'], why: 'Sharing.' },
          { q: 'Hydrogen bonding is…', correct: 'an intermolecular attraction (e.g. in water)', wrong: ['a nuclear reaction', 'the same as a peptide covalent backbone always', 'gravity'], why: 'IMF.' },
        ]) },
    ],
  },
  {
    num: 3, slug: 'organic-intro', title: 'Organic Chemistry: Functional Groups',
    blurb: 'Carbon frameworks and groups (alcohol, carbonyl, carboxyl) that drive reactivity patterns.',
    lesson: String.raw`
<h2>Why this unit matters</h2>
<p>Organic chemistry organizes molecules by <strong>functional groups</strong>. An alcohol has $-\\mathrm{OH}$; carboxylic acids $-\\mathrm{COOH}$. Same group → similar reactions across many molecules.</p>
<ul class="takeaways"><li>Carbon scaffolds + functional groups.</li><li>Patterns over memorizing every molecule.</li></ul>`,
    problems: [
      { id: 'chem-u3-mc', title: 'Concept check: organic', kind: 'mc',
        gen: mcPool([
          { q: 'A hydroxyl (−OH) on carbon typically marks…', correct: 'an alcohol (among common teaching examples)', wrong: ['always a metal alloy', 'only noble gases', 'a neutron star'], why: 'Functional group language.' },
          { q: 'Organic chemistry focuses heavily on…', correct: 'carbon-based molecules and their groups/reactions', wrong: ['only nuclear decay', 'only circuit boards', 'only Newtonian gravity'], why: 'Scope.' },
        ]) },
    ],
  },
];

module.exports = buildTrack(reg.get('chemistry'), units);
