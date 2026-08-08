# Visual Phase 5 — Algebra: Grouping & Expanding (the final phase!)

## What changed
Only 1 file: `visuals.js`.

## What's new
Type any multiplier and constant, hit "Animate ↗": two arrows genuinely draw
themselves (using an SVG stroke-dash animation, not an instant swap) from the
multiplier to the x-term, then to the constant term — landing on each one in
sequence before the combined result appears. This directly visualizes the most
common mistake this topic targets: only multiplying the first term inside the
bracket and forgetting the second.

## Testing (jsdom, same rigor as every phase)
- Default 3(x+4) → 3x+12 confirmed
- Negative multiplier -2(x+5) → -2x-10 confirmed, with correct sign display
- Double-negative case -3(x-4) → correctly flips to +12 (the exact concept this
  topic's explanation section emphasizes)
- Zero multiplier → handled sensibly (0x+0, no crash)
- Blank inputs → defaults to 0, no crash
- Animation timing verified: the result text is genuinely empty while the arrows
  are still "flying," only appearing after both have landed — confirming this
  isn't just an instant swap dressed up with a delay
- Confirmed 2 real SVG arrow paths render
- Full regression: all 7 Grade 7 topics still load, no new function-name
  collisions across the whole file

## How to deploy
Copy `visuals.js` into `D:\Tanu\tanusree-tutor\src\`, overwriting the existing one.

## That's all 5 phases — Term 1's visual upgrade is complete
Every topic's "Feel it" sandbox now genuinely animates for whatever numbers she
types, instead of only demonstrating a fixed example:
1. Integer Operations — number-line slide + sign-pairing animation
2. Rational & Irrational — square roots landing on a number line
3. Percentage, Fractions, Mixed Numbers — fill/scale bar animations (plus a real
   bug fix for over-100% percentage increases, found from your feedback)
4. Factors, Multiples, Primes & Indices — a genuinely growing, dynamically-shaped
   factor tree
5. Algebra: Grouping & Expanding — flying distribution arrows

Also still open from earlier conversations, whenever you want to pick them up:
pie-chart views for Fractions/Mixed Numbers, and the paper-photo-analysis
pipeline (needs a Grok API key).
