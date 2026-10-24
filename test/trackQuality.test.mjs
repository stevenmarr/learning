import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { qty, q, parseNumber, checkNumeric, ans } = require('../content/helpers');
const trackProgress = require('../src/trackProgress');
const catalog = require('../content/catalog');

describe('qty / q rendering contract', () => {
  it('qty is plain prose', () => {
    assert.equal(qty(1.9, 'A'), '1.9 A');
    assert.equal(qty(38, 'V'), '38 V');
    assert.equal(qty(10, '\\Omega'), '10 Ω');
  });
  it('q is for inside math only', () => {
    assert.equal(q(1.9, 'A'), '1.9\\,\\text{A}');
  });
  it('circuits ohm-r prompt has no leaked LaTeX', () => {
    const eng = require('../content/tracks/circuits');
    const raw = eng.instance('cir-u1-ohm-r', 7).data.prompt;
    assert.match(raw, /draws .+ A with .+ V across/);
    assert.doesNotMatch(raw, /\\\\text/);
    assert.doesNotMatch(raw, /\\\\,/);
    const view = eng.publicView(eng.instance('cir-u1-ohm-r', 7)).prompt;
    assert.doesNotMatch(view, /\\\\text/);
  });
});

describe('pickProblem with single-type units', () => {
  it('does not throw when exclude is the only problem id', () => {
    const eng = catalog.getTrack('chemistry');
    const unit = eng.units.find((u) => u.problems.length === 1) || eng.units[0];
    const only = unit.problems[0].id;
    const id = trackProgress.pickProblem(1, 'chemistry', unit.num, only);
    assert.equal(id, only);
  });
  it('paramedic unit 1 can advance to a different type', () => {
    const id = trackProgress.pickProblem(1, 'paramedic', 1, 'med-u1-mc');
    assert.ok(id);
    assert.notEqual(id, 'med-u1-mc');
  });
});

describe('fraction answers still accepted', () => {
  it('1/4 grades for 0.25', () => {
    assert.equal(checkNumeric(ans('m', 'm', 0.25, ''), '1/4').ok, true);
    assert.equal(parseNumber('1/4'), 0.25);
  });
});
