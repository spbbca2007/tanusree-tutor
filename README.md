# Visual Phase 1 — Integer Operations sandbox

## What changed
Only 1 file: `visuals.js`.

## What's new
**"Feel it" stage (interactive):** Type ANY two integers and pick an operation —
watch it actually animate for those exact numbers:
- Add/Subtract: a real number line that rescales to fit whatever you typed, with a
  dot that visibly slides from the start value to the answer (not an instant jump)
- Multiply/Divide: a genuine sign-pairing animation — two tokens (red for negative,
  green for positive) slide together; if both are negative they merge into one
  green token (paired and cancelled → positive), if only one is negative it stays
  red (unpaired → negative)

**"See it" stage (animated):** Upgraded from click-through static steps to a real
auto-playing animation. A "🔀 New example" button cycles through 5 different
number pairs so it doesn't feel identical every visit, and "▶ Play" animates the
dot sliding to the answer.

## How this was tested (more rigorously than previous batches)
Puppeteer's Chromium download is blocked by this environment's network rules, so I
used `jsdom` instead — a real JavaScript DOM implementation — to actually execute
the widget's code, not just check that it parses:
- Confirmed -7 + -9 animates to exactly -16
- Confirmed -7 × -9 animates to 63 with the correct "two negatives cancelled"
  explanation
- Confirmed 6 × -4 stays -24 with "one negative had no partner" explanation
- Confirmed -20 ÷ -5 animates to 4
- Confirmed the SVG actually renders real elements, not an empty shell
- Tested edge cases: divide by zero (shows "undefined", doesn't crash), blank
  inputs (defaults to 0, doesn't crash), zero values
- Cycled through all 5 shuffle examples and confirmed the Play animation lands on
  the correct final answer
- Re-confirmed no new function-name collisions, and all 7 Grade 7 topics plus
  Grade 6 still work end-to-end

## How to deploy
Copy `visuals.js` into `D:\Tanu\tanusree-tutor\src\`, overwriting the existing one.
Commit and push via GitHub Desktop, Netlify auto-deploys.

## What's next
Phase 2 — the same live-animation treatment for Rational & Irrational (numbers
landing on a number line based on where their square root falls). Say "continue
with Phase 2" whenever you're ready.
