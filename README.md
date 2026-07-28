# Visual Phase 2 — Rational & Irrational number-line placement

## What changed
Only 1 file: `visuals.js`.

## What's new
Type any number under a square root, hit "Animate ↗":
- The number line automatically shows the exact whole numbers surrounding the
  result (e.g. √50 shows 7 and 8, since 49 and 64 are the nearest perfect squares)
- A dot genuinely animates sliding to the true position of the root
- Perfect squares (like √36) land exactly on a whole number and turn green —
  "Rational"
- Non-perfect squares land between two whole numbers and stay purple —
  "Irrational, never landing exactly on a whole number"

This directly builds the intuition behind the "which two whole numbers does √20
lie between" question style from her practice set — instead of just calculating
it, she sees why.

## Testing (via jsdom, same rigor as Phase 1)
- √20 correctly shown between 4 and 5
- √36 (perfect square) correctly lands exactly on 6, marked rational
- √50 correctly shown between 7 and 8
- √0 handled correctly (edge case)
- Negative input handled gracefully — clamped to 0, no crash
- Confirmed real SVG elements render (8 children), not an empty shell
- No new function-name collisions
- All 7 Grade 7 topics still load their visuals correctly

## How to deploy
Copy `visuals.js` into `D:\Tanu\tanusree-tutor\src\`, overwriting the existing one.

## What's next
Phase 3 — fill/scale animations for Percentage Deep Dive, Fractions & Recurring
Decimals, and Mixed Numbers & FDP (3 topics sharing one animation pattern). Say
"continue with Phase 3" whenever you're ready.
