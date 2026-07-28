# Rational & Irrational — real step-by-step solutions added

## The root cause (now confirmed)
`solver.js` has a hand-written `solutions` object with genuinely good 4-step
breakdowns — but before this fix, it only had **6 entries total**, all from the
original Grade 6 build. Every question I've written for Grade 7 (all ~106 of them,
across 7 topics) had no entry there, so clicking "Show me how to solve this" always
fell through to `generateGenericSolution()` — a thin fallback that just recycles the
`hint` and `explanation` fields already shown inline, wrapped as 3 generic steps.
That's exactly why Rational & Irrational felt thin — it was never given real content,
not a bug in the code.

## What changed
Only 1 file: `solver.js`. Added 14 curated 4-step solutions — one for every question
in Rational & Irrational — matching the depth and style of the original hand-written
examples (a clear reasoning step, worked math, and a tip where useful).

## Validation done
- Confirmed all 14 questions in the topic now have a curated entry (zero left
  falling back to the generic version)
- Cross-checked every solution's final step against the question's actual answer key
  — all 14 consistent
- Syntax-checked every file in the project, not just this one

## How to deploy
Copy `solver.js` into `D:\Tanu\tanusree-tutor\src\`, overwriting the existing one.
Commit and push via GitHub Desktop, Netlify auto-deploys.

## What's still outstanding
The same gap exists for the other 6 Grade 7 topics (Integer Operations, Factors/
Indices, Percentage, Recurring Decimals, Mixed Numbers, Algebra Grouping/Expanding)
— roughly 92 more questions still falling back to the generic 3-step version.
Worth deciding: extend this to all of Term 1 now, or prioritize differently (e.g.
only hard/challenge-tier questions, since those are where real scaffolding matters
most) — let me know and I'll pick up the next batch.
