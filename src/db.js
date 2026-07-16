const API = "/api";
const LS_KEY = "tanusree-tutor-v1";
const TOKEN_KEY = "sparky-session-token";
let _dbAvailable = null;

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || null;
}
export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function verifyPin(studentKey, pin) {
  const r = await fetch(`${API}/verify-pin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentKey, pin }),
    signal: AbortSignal.timeout(5000),
  });
  if (!r.ok) {
    const d = await r.json().catch(() => ({}));
    throw new Error(d.error || "Incorrect PIN");
  }
  const d = await r.json();
  setToken(d.token);
  return true;
}

function authHeaders() {
  const t = getToken();
  return t ? { "x-sparky-token": t } : {};
}

export async function checkDbConnection() {
  try {
    const r = await fetch(`${API}/health`, { signal: AbortSignal.timeout(3000) });
    if (r.ok) { _dbAvailable = true; return true; }
  } catch {}
  _dbAvailable = false;
  return false;
}
export function isDbConnected() { return _dbAvailable === true; }
export function getConnectionStatus() {
  if (_dbAvailable === true) return { connected: true, label: "Supabase", detail: "Synced to cloud" };
  if (_dbAvailable === false) return { connected: false, label: "localStorage", detail: "Offline — changes saved on this device only" };
  return { connected: false, label: "Checking...", detail: "" };
}

export async function loadStateFromDb() {
  if (_dbAvailable !== false && getToken()) {
    try {
      const r = await fetch(`${API}/state`, { headers: authHeaders(), signal: AbortSignal.timeout(4000) });
      if (r.ok) {
        const d = await r.json();
        _dbAvailable = true;
        if (d.state) return { state: d.state, source: "supabase", updatedAt: d.updated_at };
      }
    } catch { _dbAvailable = false; }
  }
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) return { state: JSON.parse(raw), source: "localStorage", updatedAt: null };
  } catch {}
  return { state: null, source: "empty", updatedAt: null };
}

export async function saveStateToDb(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
  if (_dbAvailable !== false && getToken()) {
    try {
      const r = await fetch(`${API}/state`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify({ state }),
        signal: AbortSignal.timeout(6000),
      });
      if (r.ok) { _dbAvailable = true; return true; }
    } catch { _dbAvailable = false; }
  }
  return false;
}

let _saveTimer = null;
export function scheduleSave(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch {}
  if (!_saveTimer) {
    _saveTimer = setTimeout(async () => { _saveTimer = null; await saveStateToDb(state); }, 30000);
  }
}
export async function forceSave(state) {
  if (_saveTimer) { clearTimeout(_saveTimer); _saveTimer = null; }
  return await saveStateToDb(state);
}

export async function getDbStats() {
  if (_dbAvailable !== true || !getToken()) return null;
  try {
    const r = await fetch(`${API}/stats`, { headers: authHeaders(), signal: AbortSignal.timeout(4000) });
    if (r.ok) return await r.json();
  } catch {}
  return null;
}
