# Factors, Multiples, Primes & Indices — expanded

## What changed
Only 1 file: `curriculum.js`. No other files touched.

## What's new in this topic
Two new explanation blocks:
- **Divisibility rules** — quick mental checks for ÷2, ÷3, ÷5, ÷9, ÷10 without long
  division (e.g. "digits add up to a multiple of 3" for ÷3)
- **Power of a power** — the third index law: (a^m)^n = a^(m×n), with a worked
  example showing it matches the slow "expand it all out" method

5 new practice questions (2 easy divisibility-rule checks, 2 medium power-of-a-power,
1 hard combining both power rules together) — topic now has 20 questions total
(was 15), still spread across easy/medium/hard.

## A build note, for transparency
My first attempt at this had a missing comma that would have broken the page for
anyone who opened this topic — caught it because I test by actually importing the
file and simulating what the app does with it, not just a syntax check (which,
it turns out, didn't catch this particular error). Re-checked and confirmed clean
before packaging this version.

## How to deploy
Copy `curriculum.js` into `D:\Tanu\tanusree-tutor\src\`, overwriting the existing
one. Commit and push via GitHub Desktop, Netlify auto-deploys.

If she's already partway through this topic, her existing progress isn't affected —
the new questions just join the same pool the adaptive queue pulls from.
