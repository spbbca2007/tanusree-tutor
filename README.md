# Sparky update — side-by-side workspace, mark complete/redo, focus ring

Replaces the previous `app.js` again (same file, builds on the hotfix
batch).

## What changed, matching what we prototyped and agreed

**Layout**: the working space now starts full-width, single column. Only
once there's something to actually show — "Check my work" clicked, or the
automatic pause check-in fires — does a second column slide in beside it
for AI feedback (currently the honest not-yet-connected placeholder, same
as before). No permanently-reserved empty panel taking up space.

**Focus ring**: tapping into the canvas now shows a visible blue border,
the same visual language as tapping into any text field — a real, if
small, usability fix for a device where she's not looking at a mouse
cursor for feedback.

**Mark complete / Redo**: a status badge on the question ("Not attempted"
/ "Complete") with buttons to toggle it. This is deliberately **self-reported
and completely separate from AI review or multiple-choice correctness** —
tapping Mark complete doesn't require or wait on any AI judgment, and
doesn't touch her MC-answer mastery tracking. Two independent signals,
not merged into one, since they can genuinely disagree (right MC answer
picked without real working-out, or solid working-out with a slipped
final answer). Persisted per-question via `localStorage`, so it survives
closing the browser, restores correctly when she revisits a question, and
doesn't leak between different questions.

## Two real bugs found and fixed during this batch — not glossed over

**1. The panel could get stuck open showing stale feedback.** Once
expanded, nothing made it collapse back — so after getting a review and
then starting to write again (fixing a mistake, trying a new approach),
the old feedback just sat there, permanently claiming space, defeating
the entire point of "only expand when there's something to show." Fixed:
starting a new stroke, or hitting Clear, now collapses the panel back if
it was showing something — since that feedback is about to be stale
either way.

**2. A more serious one: expanding/collapsing the panel could silently
erase her drawing.** Resizing a `<canvas>` element's width/height —
which is exactly what happens every time the layout shifts between one
and two columns — wipes its pixel content. That's just how canvases work,
not a Sparky-specific quirk. Since resizing now happens every time she
asks for a review (not just once at page load like before), the original
code would have deleted her work at the exact moment she clicked "Check
my work." This was caught by a test that expected the panel to still be
collapsed at a specific point and wasn't — investigating *why* surfaced
the deeper issue underneath, not just the surface-level test mismatch.

Fixed properly, not papered over: before any resize, the canvas's current
content gets copied to an offscreen canvas; after the resize, that
snapshot gets drawn back onto the now-differently-sized canvas. Verified
this actually happens with a dedicated test — confirmed the snapshot/
restore fires when there's real content to protect, and confirmed it does
*not* fire pointlessly on an empty canvas.

## Testing performed

- `node --check` on the final file
- Full workspace test suite (9 scenarios): canvas renders styled and
  collapsed by default; real drawing + pressure-sensitive width still
  work after the restructuring; empty-canvas "Check my work" nudges her
  to write first; content-bearing "Check my work" shows the honest
  placeholder; pause trigger fires once and doesn't repeat; Mark complete
  updates the badge, swaps to Redo, and persists to `localStorage`; Redo
  fully resets badge, storage, canvas, and layout; completion status is
  correctly per-question (verified against a second, different question);
  switching questions tears down the old pause-timer with no leak
- Separate dedicated test specifically for the content-preservation fix —
  confirms the snapshot/restore mechanism actually engages when needed and
  stays out of the way when it isn't
- Re-ran both the free-navigation regression suite and the earlier
  workspace-hotfix checks from prior batches — full 33-question bank,
  out-of-order navigation, answer-without-blocking, status icons, Parent
  View, Topics View, and a second independent topic all still pass

## Still honestly placeholder, on purpose

Same as before: "Check my work" and the pause check-in both show
"AI review isn't connected yet" — no Grok key wired in, since that
requires the Netlify environment variable to be set up first (steps
below). The integration point (`requestStepReview`) is unchanged in
shape from the last batch — only its trigger plumbing and where its
output renders have changed.

---

# Steps to add the Grok API key to Netlify

1. Log into **console.x.ai** (not console.groq.com — different company,
   confirmed this is the one you're using) and generate an API key from
   there if you haven't already got one issued for this specific use.
2. Go to your **Sparky site's Netlify dashboard** (not the expense
   tracker's — that one's a separate Oracle/PM2 deployment with its own,
   unrelated config) → **Site settings** → **Environment variables**.
3. Click **Add a variable**, name it something clear like `GROK_API_KEY`,
   paste the key as the value, save.
4. **Trigger a redeploy** — Netlify functions only pick up new
   environment variables on the next deploy, not automatically. A "Clear
   cache and deploy site" from the Deploys tab is the safest way to be
   sure it's picked up.
5. That's it on your end — don't paste the key anywhere else, including
   here in chat. Once it's set, just tell me it's done and I'll build
   `netlify/functions/review-work.js` to read it server-side and start
   wiring up the real Grok call behind the same trigger points already
   built and tested in this batch.
