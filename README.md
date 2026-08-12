# Sparky update — working space (pen/stylus canvas)

Continues from the free-navigation update — only `app.js` changed again,
same file, additive on top of that batch.

## What this adds

Every question now has a **working space** alongside the multiple-choice
answers (not replacing them — confirmed that's the design you wanted).
It's a canvas she can write or draw on with the mouse, a finger, or — the
actual point of this batch — a real pen/stylus tablet, using the browser's
Pointer Events API, which treats mouse and stylus identically. Pressure
data comes through when the hardware reports it (your XP-Pen tablet
should), so strokes get thicker or thinner based on how hard she presses.

Also included:
- **Clear** — wipes the canvas
- **Save as image** — downloads what she drew as a PNG, so you can
  actually inspect stroke quality once you're testing with the tablet
- **"Check my work"** button — always available, any time
- **Automatic pause check-in** — if she's written something and then
  stops for the threshold period (defaults to 20 seconds, tunable — see
  below) without finishing, a banner appears on its own

## Important: this is capture only, not evaluation — on purpose

Per what we discussed: no Grok key is wired in yet, and it shouldn't be,
because Grok needs to be called from a server (a Netlify function reading
an environment variable), never from code that ships to her browser — a
key embedded in client-side JS is visible to anyone who opens dev tools.

So right now, both triggers (the manual button and the automatic pause
check-in) call a single function, `requestStepReview(reason)`, which just
shows an honest placeholder banner ("AI review isn't connected yet")
instead of pretending to review anything. This is the one integration
point for later — once the Netlify function and env var exist, only the
*body* of that one function needs to change to a real API call. Nothing
about the canvas, the pause-detection, or the button wiring needs to be
touched.

## Why triggers are separate from the AI call — this is the token-usage design

The pause-detection and "Check my work" button both run entirely in the
browser, for free — no network call, no tokens spent, regardless of how
often she pauses or how long she works. The *only* thing that will ever
cost an API call, once it's wired up, is an actual invocation of
`requestStepReview`. Two triggers, and only two: her asking directly, or a
genuine multi-second pause with unfinished work. Nothing polls the AI
continuously — that would burn tokens exactly the way you didn't want.

## Tuning knobs (for when you're testing pause timing)

Two values control this, both overridable from outside without touching
the function body:
- `window.SPARKY_PAUSE_THRESHOLD_MS` — how long she must pause before the
  check-in fires (default 20000 = 20 seconds)
- `window.SPARKY_WS_POLL_MS` — how often the pause is checked (default
  1000 = every second; this is just a local timer comparison, effectively
  free)

If 20 seconds feels wrong once you've watched her actually use it — too
eager, or too slow — it's a one-line change, no logic restructuring.

## Testing performed

This is genuinely new interactive surface (a `<canvas>`, pointer events,
timers), so it got the same real-execution rigor as the free-navigation
batch, plus a wrinkle worth knowing about:

**A real testing gap was found and worked around, not papered over.**
jsdom (the DOM-in-Node.js library used for these tests) has a mode needed
so Node can directly `import` the real `app.js` — but that same mode
silently skips *dynamically inserted* `<script>` tags, which is exactly
the mechanism the app already uses (`executeScripts`) to make injected
visuals and this new workspace script actually run. Real browsers (Chrome,
which is what you're using) execute these correctly — this was purely a
test-environment gap. It was caught because the first test run showed zero
canvas activity despite no errors, which didn't match expected behavior,
so it was investigated rather than assumed passing. Switching jsdom to its
full script-execution mode for this specific test resolved it, and all
scenarios below were then verified against the *actual* rendered,
executing code:

- `node --check` on the final file; diffed against the free-navigation
  version — only the intended addition present
- Installed a recording mock canvas context (jsdom has no real pixel
  renderer without a native add-on) to verify the exact drawing calls your
  code makes — proves the wiring is correct, not that ink looks good on a
  real screen; that part still needs the physical tablet
- Drawing a stroke produces the right sequence of canvas calls
- Higher stylus pressure produces a measurably thicker line than lower
  pressure (simulated via `PointerEvent.pressure`)
- "Check my work" with an empty canvas asks her to write first, rather
  than pretending to review nothing
- "Check my work" with content shows the honest not-yet-connected
  placeholder
- The pause trigger fires automatically after the threshold with no
  drawing — and does NOT fire again repeatedly while she's still paused
  (would be an obviously wrong/annoying behavior)
- Drawing again resets the pause detector, and a *second* pause after
  resuming triggers again (confirms it's not a one-shot-ever flag)
- "Save as image" genuinely creates and clicks a download link with real
  image data
- Switching to a different question tears down the old pause-checker
  timer and gives a completely fresh, clean workspace — no leftover
  banner or stale state carried over
- Re-ran the full free-navigation regression suite from the last batch on
  top of this change — all 33 questions, out-of-order navigation,
  answer-without-blocking, status icons, Parent View, Topics View, and a
  second independent topic all still pass unchanged
