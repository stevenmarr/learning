#!/usr/bin/env node
'use strict';
/**
 * Create or reset listed users. Password comes ONLY from env NEW_PASSWORD
 * (never argv, never logged).
 *
 *   NEW_PASSWORD='…' node scripts/ensure-users.js Steven Jill Andrew Nathan Nicole
 *
 * Or: ENSURE_USERS=Steven,Jill,… NEW_PASSWORD='…' node scripts/ensure-users.js
 */
const users = require('../src/users');
require('../src/db'); // open DB

const pass = process.env.NEW_PASSWORD;
if (!pass || pass.length < 8) {
  console.error('Error: set NEW_PASSWORD in the environment (min 8 chars). It will not be printed.');
  process.exit(1);
}

let names = process.argv.slice(2).filter(Boolean);
if (!names.length && process.env.ENSURE_USERS) {
  names = process.env.ENSURE_USERS.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean);
}
if (!names.length) {
  console.error('Error: pass usernames as args or set ENSURE_USERS=Name1,Name2');
  process.exit(1);
}

let created = 0, reset = 0;
for (const name of names) {
  if (!users.validUsername(name)) {
    console.error(`Error: invalid username "${name}"`);
    process.exit(1);
  }
  const existing = users.findByName(name);
  if (existing) {
    users.setPassword(existing.id, pass);
    console.log(`reset\t${name}`);
    reset++;
  } else {
    users.createUser(name, pass);
    console.log(`created\t${name}`);
    created++;
  }
}
console.log(`Done. created=${created} reset=${reset} (password not shown)`);
