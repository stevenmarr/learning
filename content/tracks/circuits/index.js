'use strict';
const { buildTrack } = require('../../lib/trackContent');
const { byId: reg } = require('../registry');
const units = require('./_units');
module.exports = buildTrack(reg.get('circuits'), units);
