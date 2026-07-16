// Shared Supabase admin client — used only server-side inside Netlify functions.
// Uses the SERVICE ROLE key, which bypasses RLS. Never expose this key to the browser.
const { createClient } = require("@supabase/supabase-js");

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars");
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

// All requests must carry a valid session token (returned by verify-pin.js).
// We keep this intentionally simple: the token IS the student_id (a uuid),
// signed with a server secret so the browser can't forge one for a different student.
const crypto = require("crypto");

function sign(studentId) {
  const secret = process.env.SESSION_SECRET || "sparky-dev-secret-change-me";
  const h = crypto.createHmac("sha256", secret).update(studentId).digest("hex");
  return `${studentId}.${h}`;
}

function verifyToken(token) {
  if (!token || typeof token !== "string" || !token.includes(".")) return null;
  const [studentId, sig] = token.split(".");
  const expected = sign(studentId).split(".")[1];
  if (sig !== expected) return null;
  return studentId;
}

function json(statusCode, body) {
  return {
    statusCode,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(body),
  };
}

module.exports = { getSupabase, sign, verifyToken, json };
