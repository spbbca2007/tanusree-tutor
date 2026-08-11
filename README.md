# Sparky update — Factors/LCM/HCF + Indices, from the Term 1 workbook

Source material: the 28-page workbook PDF you uploaded (pages 1–15 cover this
topic; Congruency and Statistics pages were intentionally left out — parked
for a later term as agreed).

## Files changed
- `curriculum.js` — only the `g7-factors-indices` topic touched
- `visuals.js` — only the `g7-factors-indices` topic's `interactive` field touched

Every other topic in both files is byte-for-byte identical to what you
uploaded (verified programmatically, not just by eye).

## curriculum.js changes

**2 new lesson blocks**, added after the existing content:
- "Working backwards — solving for the exponent" (uses the bacteria-doubling
  story from your workbook: 2^h = 32, count the 2's)
- A tip on negative bases (odd exponent → stays negative, even → positive)

**13 new practice questions**, all sourced from real problems in the
workbook, covering skills the question bank didn't have before:
- HCF/LCM word problems with real contexts (gift bags, buses, saplings —
  straight from the workbook's own numbers)
- HCF/LCM of consecutive numbers and of two primes (the "conjecture" pages)
- Solving *for* the exponent (2^?=16, 10^x=100000, 7^?=16807) — this was a
  totally new question type, the bank only had "evaluate the power" before
- Negative base powers: (-4)³
- Powers-of-ten sanity check (is 10⁷ really a million? — no, it's ten times that)
- Base conversion: writing 4³ as a power of 2
- A genuine reasoning question (Mary/David, squares vs. cubes) that isn't
  answerable by rote calculation alone

Total bank for this topic: 20 → 33 questions.

## visuals.js changes

The existing factor-tree "Feel it" visual is **completely untouched** —
same code, same behavior. Added alongside it:

- A **"Next visual →" button** that toggles to a new second view
- **Power Blocks**: type a base and a whole-number exponent, and it animates
  group-by-group (like the bacteria doubling each hour), landing on the
  correct total, with the full multiplication written out underneath

Handles: exponent 0, 0^0 (flagged as a special case), negative bases,
non-integer exponents (rejected with a message — this app covers whole-number
exponents), blank inputs, and large exponents (visual caps at 8 groups but
the math stays exact and it says how many more there are).

## Testing performed

- `node --check` on both files
- Every new question's answer verified against real computation (not just
  eyeballed) — HCF/LCM via actual Euclidean algorithm, powers via `Math.pow`,
  cross-checked against what the workbook itself worked out
- Structural integrity check: every question's `answer` is confirmed present
  in its own `options`, no duplicate IDs, no duplicate options, valid tiers
- `questionBank` auto-derivation re-run against the new curriculum — confirms
  the existing `questionbank.js` picks up all 33 questions with no code
  changes needed there
- Power Blocks widget: full jsdom DOM execution, 10 scenarios — the bacteria
  case (2^5=32), zero exponent, 0^0, negative base, blank base, negative
  exponent, non-integer exponent, large-exponent capping, large-base
  fallback, decimal-base fallback. One real bug caught and fixed during this
  testing: `parseInt("2.5")` was silently truncating to `2` instead of being
  rejected as non-integer — fixed by parsing as float first
- Diffed the actual spliced files against your uploads line-by-line —
  confirmed only the intended lines changed
- Loaded the real spliced `visuals.js` as a module and ran a full
  integration test: original factor tree still renders and computes
  correctly, toggle switches both directions, Power Blocks renders and
  computes correctly, and switching back to the factor tree and re-running
  it on a new number (36) still works

## Collision check
`window.riDraw` and `window.fiDraw` are still the only duplicate global
names — both are the pre-existing Grade 6 collisions you flagged as
out-of-scope. No new collisions introduced.
