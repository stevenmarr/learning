import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { parseNumber, checkNumeric, ans } = require('../content/helpers');

describe('parseNumber', () => {
  it('accepts decimals and leading-dot', () => {
    assert.equal(parseNumber('0.25'), 0.25);
    assert.equal(parseNumber('.25'), 0.25);
    assert.equal(parseNumber('-0.5'), -0.5);
    assert.equal(parseNumber('-.5'), -0.5);
  });
  it('accepts fractions equal to decimals', () => {
    assert.equal(parseNumber('1/4'), 0.25);
    assert.equal(parseNumber('-3/2'), -1.5);
    assert.equal(parseNumber('1 / 4'), 0.25);
    assert.equal(parseNumber('+5/2'), 2.5);
    assert.equal(parseNumber('0.5/2'), 0.25);
  });
  it('rejects bad input and div-by-zero', () => {
    assert.equal(parseNumber('1/0'), null);
    assert.equal(parseNumber('abc'), null);
    assert.equal(parseNumber(''), null);
    assert.equal(parseNumber('1/2/3'), null);
  });
  it('grades 1/4 correct for slope 0.25', () => {
    const spec = ans('m', 'm', 0.25, '');
    assert.equal(checkNumeric(spec, '1/4').ok, true);
    assert.equal(checkNumeric(spec, '0.25').ok, true);
    assert.equal(checkNumeric(spec, '.25').ok, true);
    assert.equal(checkNumeric(spec, '1/3').ok, false);
  });
});
