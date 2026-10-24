'use strict';
/**
 * Marr Learning Hub — curriculum modules.
 * href: in-app path under BASE_PATH. status: live | scaffold | stub
 */

const TRACKS = [
  {
    id: 'statics', slug: 'statics', title: 'Engineering Statics', short: 'Statics',
    blurb: 'Forces, moments, trusses, friction, centroids — mechanical engineering foundation. Includes Farm Engineering game.',
    accent: '#e0b25a', icon: 'Δ', order: 1, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: true, tags: ['engineering', 'mechanics'],
  },
  {
    id: 'math', slug: 'math', title: 'Advanced Math Spine', short: 'Math',
    blurb: 'College algebra → Calculus 1–3 → Differential equations, with soft readiness gating between levels.',
    accent: '#f0a070', icon: '∫', order: 2, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['math'],
    levels: [
      { id: 'alg', title: 'College Algebra', short: 'Algebra', units: [1, 2, 3] },
      { id: 'calc1', title: 'Calculus 1', short: 'Calc 1', units: [4, 5, 6], requires: 'alg' },
      { id: 'calc2', title: 'Calculus 2', short: 'Calc 2', units: [7, 8], requires: 'calc1' },
      { id: 'calc3', title: 'Calculus 3', short: 'Calc 3', units: [9, 10], requires: 'calc2' },
      { id: 'de', title: 'Differential Equations', short: 'Diff Eq', units: [11, 12], requires: 'calc3' },
    ],
  },
  {
    id: 'circuits', slug: 'circuits', title: 'Electrical Circuits', short: 'Circuits',
    blurb: 'Ohm through AC RMS with full teachable lessons: series/parallel, Kirchhoff, RC, Thévenin, and sinusoids.',
    accent: '#6ec6ff', icon: '⚡', order: 3, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['engineering', 'electrical'],
  },
  {
    id: 'digital', slug: 'digital', title: 'Digital Design', short: 'Digital',
    blurb: 'Binary through hex/two’s complement, gates, adders/muxes, flip-flops, counters, and FSM timing.',
    accent: '#9d8cff', icon: '01', order: 4, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['engineering', 'digital'],
  },
  {
    id: 'cs', slug: 'cs', title: 'CS Principles', short: 'CS 101',
    blurb: 'Computational thinking, algorithms, data, complexity, debugging/testing, and internet/cyber awareness.',
    accent: '#7dcea0', icon: '{}', order: 5, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['cs'],
  },
  {
    id: 'physics', slug: 'physics', title: 'Physics: Newtonian → Modern', short: 'Physics',
    blurb: 'Classical mechanics through special & general relativity and an introduction to quantum ideas.',
    accent: '#5dade2', icon: 'ℏ', order: 6, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['physics'],
  },
  {
    id: 'emwaves', slug: 'emwaves', title: 'Electromagnetic Waves', short: 'EM Waves',
    blurb: 'From Maxwell’s picture to light, spectrum, antennas, and wave propagation.',
    accent: '#48c9b0', icon: '≋', order: 7, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['physics', 'electrical'],
  },
  {
    id: 'chemistry', slug: 'chemistry', title: 'Chemistry → Organic', short: 'Chemistry',
    blurb: 'General chemistry foundations through organic functional groups and reaction patterns.',
    accent: '#e87461', icon: '⚗', order: 8, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['chemistry'],
  },
  {
    id: 'paramedic', slug: 'paramedic', title: 'Paramedic Training', short: 'Paramedic',
    blurb: 'Emergency care principles: assessment, airway, cardiac, trauma — scenario-driven practice.',
    accent: '#e74c3c', icon: '+', order: 9, status: 'live', audience: 'andrew',
    hasGame: true, hasToolkit: false, tags: ['medical'],
  },
  {
    id: 'junior', slug: 'junior', title: 'Junior-High Supplemental', short: 'Junior High',
    blurb: 'Fractions, percent, integers, geometry, science habits, and rates — warm middle-school boosters.',
    accent: '#f5b041', icon: '★', order: 10, status: 'live', audience: 'nicole',
    hasGame: true, hasToolkit: false, tags: ['middle-school'],
  },
  {
    id: 'livestock', slug: 'livestock', title: 'Livestock Care — Sandy Boots Farm', short: 'Livestock',
    blurb: 'Sandy Boots Farm care & management: Kunekune pigs, Nubian goats (Cedar Crew), Spanish turkeys, layers — pasture, health, sales ethics.',
    accent: '#a3cb38', icon: '🐐', order: 11, status: 'live', audience: 'family',
    hasGame: true, hasToolkit: false, tags: ['farm', 'animals'],
  },
];

const byId = new Map(TRACKS.map((t) => [t.id, t]));
const bySlug = new Map(TRACKS.map((t) => [t.slug, t]));

module.exports = { TRACKS, byId, bySlug };
