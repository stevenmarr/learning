# Marr Learning Hub

Gamified, adaptive multi-curriculum platform for the Marr family — live at
**https://performance-video.com/learning/** (DigitalOcean droplet, port **3119**, `BASE_PATH=/learning`).

Same stack as the original StaticsForEngineers app (Node 22+, Express, better-sqlite3, KaTeX, Montserrat, dark theme). Progress, review queues, XP, and **adaptive gates** (remedial / more practice / ready) are tracked per module.

## Curricula

| Module | Path | v1 depth |
|--------|------|----------|
| Engineering Statics (+ Farm game, math toolkit) | `/learning/statics`, `/learning/units`, `/learning/game` | Full (migrated) |
| Advanced Math (Alg → Calc 1–3 → DE) | `/learning/t/math` | 12 units + level readiness map |
| Electrical Circuits | `/learning/t/circuits` | 4 units |
| Digital Design | `/learning/t/digital` | 4 units |
| CS Principles | `/learning/t/cs` | 4 units |
| Physics (Newtonian → modern) | `/learning/t/physics` | 3 units (scaffold+) |
| EM Waves | `/learning/t/emwaves` | 2 units |
| Chemistry → Organic | `/learning/t/chemistry` | 3 units |
| Paramedic training principles | `/learning/t/paramedic` | 3 units (not a certification) |
| Junior-High Supplemental | `/learning/t/junior` | 3 units |
| Livestock — Sandy Boots Farm | `/learning/t/livestock` | **9 units** (stewardship through capstone) |

### Livestock notes (Sandy Boots)

Practices follow farm guidance: chore order water→feed→fences→shelter; East Texas sandy/acid soils (low K/Mg, P often high); winter forage blocks; Kunekune pasture-first + alfalfa hay; live sale / Whispering Pines (Emory, TX) custom-exempt model (~116 mi context); Nubian Cedar Crew browse; Spanish turkeys; layers; health without DIY drug recipes; Texas egg sales **verify law** (no invented legal advice). No invented phone numbers, headcounts, or off-script prices.

## Pedagogy

- Build knowledge with lessons + randomized practice + solutions.
- **Adaptive gate** after practice: remedial review, more practice, or ready to move on (80% mastery unlocks the next unit).
- Math spine soft-gates Calc levels behind Algebra mastery, etc.
- Optional light stewardship framing in livestock; engineering-serious tone elsewhere.

## Cutover from StaticsForEngineers

Legacy app: `https://performance-video.com/StaticsForEngineers/` (port 3117).

Recommended Caddy cutover (when ready):

```
redir /StaticsForEngineers /learning/statics 302
redir /StaticsForEngineers/* /learning/statics 302
```

Or keep both until Andrew is moved. Statics content in this hub is the migrated curriculum.

## Deploy / update on the droplet

```
bash /opt/learning/deploy/update-from-git.sh
```

No `set -e` in that script. It backs up `data/` + `.env`, pulls `main`, `npm ci`, restarts systemd unit `learning`, health-checks `/learning/healthz`.

First-time setup sketch (adapt paths; do **not** paste secrets into chat):

1. Clone to `/opt/learning`, create user `learning`, copy `.env.example` → `.env`, set `SESSION_SECRET`, `DEFAULT_USER` / `DEFAULT_PASS`, `PORT=3119`, `BASE_PATH=/learning`.
2. `npm ci`, install `deploy/learning.service`, enable linger/service.
3. Add Caddy `handle` for `/learning*` → `host.docker.internal:3119` (see `deploy/caddy.conf`).

## Local

```
cp .env.example .env   # set SESSION_SECRET, DEFAULT_USER, DEFAULT_PASS, COOKIE_SECURE=false
npm install
npm test
npm start
```

Open `http://127.0.0.1:3119/learning/`.

## Version

**2.1.2** — Fix paramedic next-question crash (`pickProblem` empty pool); plain `qty()` prompts (no leaked KaTeX); pedagogy pass on circuits U1, paramedic, chem/junior U1; audit in `docs/pedagogy-audit.md`.

**2.1.1** — Accept fractions in numeric answers (e.g. `1/4`); clearer problem prompts; `scripts/ensure-users.js` for account setup.

**2.1.0** — Deepened curricula across tracks (physics→EM→chem→paramedic already in tree; circuits, digital, CS, junior expanded; advanced math & livestock thickened). Tests green; no droplet deploy.

**2.0.0** — Learning Hub launch: multi-module academy under `/learning`.
