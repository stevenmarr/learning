'use strict';
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

function bool(v, def) {
  if (v === undefined || v === '') return def;
  return /^(1|true|yes|on)$/i.test(String(v));
}

function normBase(p) {
  if (p === undefined) p = '/learning';
  p = String(p).trim();
  if (p === '' || p === '/') return '';
  if (!p.startsWith('/')) p = '/' + p;
  return p.replace(/\/+$/, '');
}

const config = {
  port: parseInt(process.env.PORT || '3119', 10),
  host: process.env.HOST || '0.0.0.0',
  basePath: normBase(process.env.BASE_PATH !== undefined ? process.env.BASE_PATH : '/learning'),
  sessionSecret: process.env.SESSION_SECRET || '',
  cookieSecure: bool(process.env.COOKIE_SECURE, false),
  trustProxy: process.env.TRUST_PROXY === undefined ? 'loopback,172.16.0.0/12' : process.env.TRUST_PROXY,
  dataDir: path.resolve(path.join(__dirname, '..'), process.env.DATA_DIR || 'data'),
  defaultUser: process.env.DEFAULT_USER || '',
  defaultPass: process.env.DEFAULT_PASS || '',
  timeZone: process.env.APP_TZ || 'America/Chicago',
  masteryThreshold: 0.8,
  productName: 'Marr Learning',
  productTag: 'Learning Hub',
};

if (!config.sessionSecret) {
  if (process.env.NODE_ENV === 'production') {
    console.error('FATAL: SESSION_SECRET is not set in .env');
    process.exit(1);
  }
  config.sessionSecret = 'dev-only-insecure-secret-change-me';
  console.warn('WARNING: SESSION_SECRET not set; using an insecure development secret.');
}

module.exports = config;
