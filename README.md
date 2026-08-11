# Sparky update — free question navigation

Addresses both things you raised: "only 1–6 questions" and "can't move on
without solving."

## What was actually happening (not a bug)

`engine.js`'s `buildPracticeQueue(state, topicId, count=6)` was serving a
fixed queue of 6 adaptively-picked questions per session, and the practice
UI walked through that queue by index, one at a time, only revealing "Next
question" after she'd submitted an answer to the current one. That's where
both symptoms came from — the fixed queue size, and the answer-gated
progression.

## What changed

**Only `app.js` was touched.** `engine.js`, `curriculum.js`, `visuals.js`,
`questionbank.js` are all untouched by this batch (this pairs with the
separate Factors/Indices content batch, but is independent of it — free
navigation now applies to every topic automatically, not just that one).

The practice stage is now a **question list, not a queue**:
- Shows the *entire* bank for the topic (all difficulty tiers, grouped
  Easy/Medium/Hard), not a capped subset
- Tap any question, in any order — no gating, no suggested "next"
- Each question shows a status mark: unmarked (not attempted), ✓ (last
  attempt correct), ✕ (last attempt incorrect) — based on her real attempt
  history, always reflecting the *most recent* attempt so re-tries update it
- A "← All questions" button is visible on the question screen **before**
  she answers, not just after — she can back out any time without solving
  anything
- After answering (right or wrong), she gets three equal options: see the
  step-by-step solver, go back to the list, or jump to the next question in
  the list — none of them forced
- A running summary ("X of Y attempted, Z correct so far") replaces the old
  end-of-queue percentage screen, since there's no longer a fixed end

`buildPracticeQueue` in `engine.js` is no longer called from `app.js` (the
import was removed), but the function itself is untouched in case it's
useful later for something like a "quick practice" shortcut — didn't delete
it since that wasn't asked for.

## Testing performed

This changes core session/interaction logic, not an isolated widget, so it
got a correspondingly bigger test:

- `node --check` on the final file
- Diffed against your upload — 13 changed regions, all accounted for by the
  intended edit (nothing accidentally touched)
- Built a real test harness: minimal but functionally genuine stand-ins for
  `state.js`, `tutor.js`, `db.js`, `backup.js`, `solver.js`, `auth.js` (the
  modules this app.js depends on that weren't shared), then loaded the
  **actual** `app.js` in jsdom with a real DOM and **clicked through the
  real UI** — not a logic simulation, actual `element.click()` dispatched
  through the same event-delegation code that runs in the browser
- End-to-end scenarios verified this way, against the full 33-question
  Factors/Indices bank:
  - All 33 questions listed (not capped at 6)
  - Opening a question out of order (jumped straight to a "hard" tier
    question, skipping everything before it)
  - Backing out of a question **before answering it** — confirms she's never
    stuck
  - Answering incorrectly still leaves a way forward (list + solver + next
    all present, nothing blocked)
  - Status icon updates to ✕ after a wrong answer
  - Re-attempting the same question and getting it right flips the status
    to ✓ (confirms "most recent attempt" logic, not "first attempt ever")
  - All three tier sections (Easy/Medium/Hard) render
- Regression pass on top of that: Parent view and Topics view still render
  cleanly, and the same free-navigation flow was independently re-tested
  end-to-end on a *second* topic (`g7-integer-ops`) to confirm this isn't
  special-cased to one topic — it's generic, the same way the rest of the
  codebase already auto-derives from `curriculum.topics`
