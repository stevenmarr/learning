# Pedagogy audit — Marr Learning Hub

Date: 2026-10-24 (America/Chicago). Audience: Andrew (advanced algebra / engineering tracks), Nicole (junior-high track), family livestock. Standard used: teach concepts (hook → intuition → formal idea → worked example → common mistakes → practice with feedback), introduce notation before use, clear goals, adaptive remedial that teaches.

## Hub-wide findings

| Expectation | Current state | Gap |
|---|---|---|
| Lesson arc (hook→…→practice) | Statics + livestock often close; many newer tracks were “blurb + formulas + MC” | Circuits/paramedic/chem historically thin; first-pass rewrites started |
| Notation before use | Mixed; KaTeX symbols sometimes appeared in prompts before lesson defined them | Prefer plain units in prose (`1.9 A`) and define symbols in lesson first |
| Clear goals per unit | Rarely explicit | Add “Learning goals” lists (done for circuits U1, paramedic, chem U1, junior U1) |
| Worked examples | Present in statics; sparse elsewhere | Expand examples with numbered steps |
| Common mistakes | Rare outside statics | Add tip boxes naming wrong habits |
| Practice with feedback | Hints + worked solutions exist; adaptive gate said “re-read” | Remedial copy now points at worked example + mistakes + hints-on retry |
| Adaptive teaches | Gate labels OK; content under remedial was weak | Still need remedial *micro-lessons* per weak skill (future) |
| Prompt clarity / KaTeX | Prose used `q()` with a lone closing `$` → raw `\\text{}` leaks | Fixed via `qty()` for sentence quantities; audit remaining math-only `q()` |

**Critical bugs fixed in 2.1.2:** (1) `pickProblem` crashed when a unit had one problem type and “next” excluded it (paramedic). (2) Broken KaTeX/prose quantities in circuits and other tracks.

## Per-track shortfalls

### Statics (+ Farm game) — strongest
- Generally meets the arc; toolkit lessons introduce notation.
- Keep as the quality bar. Minor: ensure new problems stay in full-sentence style.

### Math (algebra → DE)
- Problems improved to full sentences; lessons still denser on procedure than intuition in Calc 2–DE.
- Missing: “common mistakes” boxes on many units; goals lists.
- Andrew can handle pace; still add one plain-language paragraph before each formal block.

### Circuits — was worst offender for verbiage
- U1 rewritten with full pedagogical arc; prompts use plain `qty()` (“1.9 A”, “38 V”).
- U2–U6 lessons still shorter than U1; next pass should clone the U1 template.
- Need diagram callouts (schematic sketches) long-term.

### Digital / CS
- Decent structure after deepening; lessons OK for Andrew.
- CS is principles-first (good). Add more worked traces (binary search hand-trace already partial).
- Digital: introduce hex/two’s complement vocabulary more slowly before problems.

### Physics / EM waves
- Physics numeric practice OK; EM still thin (few problems).
- Relativity/quantum units need more intuition metaphors and fewer slogan MCs.
- EM: antennas/propagation deserve another unit with a worked “c = fλ” story.

### Chemistry → organic
- U1 goals/example improved; U3–U6 still single-MC “quiz dump” risk.
- Organic units need mechanism *stories* (what electrons want) not only functional-group names.
- Add mole/stoich numeric reps in later units.

### Paramedic
- Crash root cause: one MC type per unit + exclude-on-next → empty pool.
- Now 2 MC pools/unit and richer lessons with goals, examples, mistakes, hard scope boundaries (no doses/protocols).
- Still not a skills lab — say so every unit (done). Future: scenario branching.

### Junior-high (Nicole)
- U1 thickened; language must stay warm and concrete (feed, pens, eggs).
- Avoid algebra-forward wording; keep pictures/number lines later.
- Science unit should gain a tiny “fair test” worked example with a table.

### Livestock (Sandy Boots)
- Strong farm-authentic lessons; no invented prices/phones/headcounts (keep).
- Pedagogy already closer to standard; add explicit goals bullets per unit when touching next.

## Adaptive remedial — next design (not fully built)
1. When gate = remedial, surface the unit’s worked example + common-mistakes tip above the problem.
2. Force hint 1 unlock before first submit on remedial.
3. Prefer weakest problem *type* with a short “repair card” (2–3 sentences) stored beside each problem id.

## Priority order for future content passes
1. Circuits U2–U6 lesson arcs (match U1).
2. Chemistry U3–U6 (second problem type + mechanism stories).
3. EM waves expansion.
4. Math Calc2–DE mistake boxes + goals.
5. Remedial repair cards in the player UI.
