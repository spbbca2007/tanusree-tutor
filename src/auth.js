import { getToken, verifyPin } from "./db.js";

const STUDENT_KEY = "tanusree";

function buildOverlay() {
  const el = document.createElement("div");
  el.id = "sparky-auth-overlay";
  el.innerHTML = `
    <style>
      #sparky-auth-overlay {
        position: fixed; inset: 0; z-index: 9999;
        display: flex; align-items: center; justify-content: center;
        background: linear-gradient(135deg, #0f172a, #1e293b);
        font-family: inherit;
      }
      #sparky-auth-overlay .box {
        background: #fff; border-radius: 20px; padding: 36px 32px;
        width: 300px; text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,.35);
      }
      #sparky-auth-overlay .emoji { font-size: 42px; margin-bottom: 8px; }
      #sparky-auth-overlay h2 { margin: 0 0 4px; font-size: 20px; }
      #sparky-auth-overlay p { margin: 0 0 20px; font-size: 13px; color: #64748b; }
      #sparky-auth-overlay input {
        width: 100%; box-sizing: border-box; font-size: 22px; letter-spacing: 6px;
        text-align: center; padding: 12px; border-radius: 12px; border: 2px solid #e2e8f0;
        outline: none; margin-bottom: 14px;
      }
      #sparky-auth-overlay input:focus { border-color: #14b8a6; }
      #sparky-auth-overlay button {
        width: 100%; padding: 12px; border: none; border-radius: 12px;
        background: #14b8a6; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer;
      }
      #sparky-auth-overlay button:disabled { opacity: .6; cursor: default; }
      #sparky-auth-overlay .err { color: #ef4444; font-size: 13px; margin-top: 10px; min-height: 16px; }
    </style>
    <div class="box">
      <div class="emoji">✨</div>
      <h2>Hi Tanusree!</h2>
      <p>Enter your PIN to open Sparky</p>
      <input id="sparky-pin-input" type="password" inputmode="numeric" maxlength="8" autofocus />
      <button id="sparky-pin-submit">Let's go</button>
      <div class="err" id="sparky-pin-err"></div>
    </div>
  `;
  document.body.appendChild(el);
  return el;
}

export async function ensureAuthenticated() {
  if (getToken()) return true;

  return new Promise((resolve) => {
    const overlay = buildOverlay();
    const input = overlay.querySelector("#sparky-pin-input");
    const btn = overlay.querySelector("#sparky-pin-submit");
    const err = overlay.querySelector("#sparky-pin-err");

    async function submit() {
      const pin = input.value.trim();
      if (!pin) return;
      btn.disabled = true; err.textContent = "";
      try {
        await verifyPin(STUDENT_KEY, pin);
        overlay.remove();
        resolve(true);
      } catch (e) {
        err.textContent = e.message || "Incorrect PIN, try again";
        input.value = ""; input.focus();
        btn.disabled = false;
      }
    }

    btn.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") submit(); });
  });
}
