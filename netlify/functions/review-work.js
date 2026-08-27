// review-work.js — sends a photo of Tanusree's working space to a
// vision-capable LLM for a step-by-step review. Server-side only: the API
// key never reaches the browser, matching the pattern in _supabase.js for
// the Supabase service role key.
//
// Provider-configurable via env vars, not hardcoded, since the model this
// actually ends up using may change (started on X.AI/Grok, may move to
// Groq or elsewhere depending on cost/quality). Most providers that claim
// "OpenAI compatibility" (Groq included) use the same request shape and
// the same Authorization: Bearer <key> header, so switching providers is
// just these two env vars plus swapping the SPARKY key value — no code
// change needed.
//
//   AI_REVIEW_API_URL — full chat-completions endpoint URL
//   AI_REVIEW_MODEL   — exact model ID string the provider expects
//
// Both fall back to the X.AI defaults below if unset.
const { verifyToken, json } = require("./_supabase");

const DEFAULT_API_URL = "https://api.x.ai/v1/chat/completions";

// TODO: confirm this exact string against console.x.ai (or the X.AI API
// docs) before relying on the X.AI default. The console shows the display
// name "Grok 4.6" — the API model slug is sometimes worded slightly
// differently from the marketing name.
const DEFAULT_MODEL = "grok-4.6";

const API_URL = process.env.AI_REVIEW_API_URL || DEFAULT_API_URL;
const MODEL = process.env.AI_REVIEW_MODEL || DEFAULT_MODEL;

function buildPrompt(questionPrompt, correctAnswer) {
  return `You are reviewing a Grade 7 student's handwritten math working, shown in the attached image. She is 12 years old — be encouraging, never harsh.

The question is: "${questionPrompt}"
${correctAnswer ? `The correct final answer is: "${correctAnswer}".` : ""}

Respond with ONLY valid JSON, no other text before or after it, no markdown code fences, in exactly this shape:
{
  "transcription": "<your best-effort reading of everything visible in the image, as plain text/math notation>",
  "situation": "empty" | "partial" | "complete",
  "verdict": "correct" | "incorrect" | "on-track" | "unclear",
  "feedback": "<one short sentence, under 20 words, encouraging tone>"
}

Rules:
- ALWAYS attempt a real transcription of whatever marks are visible, even faint, messy, or partial ones. Never leave transcription empty or null unless the image is genuinely, completely blank — that is what "empty" situation means, not "hard to read." If you're uncertain about a specific character, write your best guess for it rather than omitting it, and note the uncertainty in the feedback field instead — uncertainty is never a reason to return an empty transcription.
- If the image shows nothing or almost nothing written, set situation to "empty". feedback must nudge toward the FIRST move as a question back at her — do not solve it for her.
- If it shows partial, unfinished work, set situation to "partial" and verdict to "on-track" or "incorrect" based only on whether the steps so far are valid — do NOT judge partial work as if it were a final wrong answer.
- If it looks like a complete attempt, set situation to "complete". If verdict is "incorrect", feedback must point to the exact first line where it goes wrong and why, not just "wrong".
- Set verdict to "unclear" only when you genuinely cannot form any reasonable reading at all — and even then, transcription should describe what you can make out (e.g. "a few digits, hard to make out which") rather than being empty.
- feedback must stay under 20 words. This is a strict limit, not a suggestion.`;
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const { questionPrompt, correctAnswer, imageDataUrl } = JSON.parse(event.body || "{}");

    // Client sends the token as a header (x-sparky-token), matching how
    // db.js's authHeaders() attaches it for every other authenticated
    // call — not in the request body. Netlify normalizes header names to
    // lowercase on the event object.
    const token = event.headers && (event.headers["x-sparky-token"] || event.headers["X-Sparky-Token"]);
    const studentId = verifyToken(token);
    if (!studentId) return json(401, { error: "Invalid or expired session" });

    if (!questionPrompt || !imageDataUrl) {
      return json(400, { error: "questionPrompt and imageDataUrl are required" });
    }

    const apiKey = process.env.SPARKY;
    if (!apiKey) return json(500, { error: "Grok API key not configured (expected env var SPARKY)" });

    let response;
    try {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "user",
              content: [
                { type: "text", text: buildPrompt(questionPrompt, correctAnswer) },
                { type: "image_url", image_url: { url: imageDataUrl } },
              ],
            },
          ],
          temperature: 0.2,
        }),
      });
    } catch (networkErr) {
      return json(502, { error: "Could not reach Grok", detail: String(networkErr) });
    }

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      return json(502, { error: "Grok API returned an error", status: response.status, detail: errText });
    }

    const data = await response.json();
    const raw = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
    if (!raw) return json(502, { error: "Unexpected response shape from Grok", raw: data });

    // Diagnostic only — visible in Netlify's function logs. Lets us see
    // exactly what the model sent back, distinct from whatever the parsed/
    // fallback response ends up showing in the UI. Cheap to leave in.
    console.log("[review-work] raw model content:", raw);

    // Models frequently wrap JSON in ```json ... ``` fences despite being
    // told not to — strip that before attempting to parse, rather than
    // treating it as a parse failure.
    const stripped = raw.trim().replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");

    let parsed;
    try {
      parsed = JSON.parse(stripped);
    } catch (parseErr) {
      console.log("[review-work] JSON.parse failed on:", stripped);
      // The model didn't return clean JSON even after stripping fences.
      // Don't crash the request over it — fall back to an honest
      // "couldn't read it" response so the UI still has something
      // sensible to show instead of an error screen.
      return json(200, {
        transcription: null,
        situation: "unclear",
        verdict: "unclear",
        feedback: "Couldn't read that clearly — try writing a little larger or check the lighting.",
        raw,
      });
    }

    console.log("[review-work] parsed result:", JSON.stringify(parsed));
    return json(200, parsed);
  } catch (e) {
    return json(500, { error: String(e) });
  }
};
