# Sparky — Supabase + Netlify Deploy Guide

## What's in this folder
- `netlify/functions/` — replaces `save_server.py`. Talks to Supabase using the service role key (never exposed to the browser).
- `src/db.js` — replaces your current `db.js`. Same function names/contract as before, so `app.js`/`state.js` barely changed.
- `src/auth.js` — new. Self-mounting PIN screen, no `index.html` edits needed.
- `src/app.js` — your original `app.js` with two small patches: imports `auth.js`, and `boot()` now waits for the PIN before loading state.
- `netlify.toml` — routes `/api/*` to the functions so `db.js`'s existing `/api/state`, `/api/health`, `/api/stats` calls keep working unchanged.
- `package.json` — `@supabase/supabase-js` dependency for the functions.

## What's already done (by me, in Supabase)
- New Supabase project `sparky-tutor` created in your `Chennai_Pallavan` org, `ap-south-1` region, **$0/month** (free tier).
- Tables: `sparky_students`, `sparky_state`, `sparky_attempts`, `sparky_exam_records`, `sparky_daily_activity` — mirror your SQLite schema.
- RLS enabled on all tables — nothing is readable/writable except via the service role key (used only inside your Netlify functions).
- Auth functions `sparky_verify_pin` / `sparky_set_pin`, locked to `service_role` only after a linter caught them being publicly callable.
- Tanusree's login created: `studentKey = tanusree`, temporary **PIN: 7307** — change this any time (see below).

## Steps for you to do

### 1. Drop these files into your project
Copy `netlify/`, `src/db.js`, `src/auth.js`, `src/app.js`, `netlify.toml`, and `package.json` into your `tanusree-tutor/` folder (overwrite the existing `db.js` and `app.js`).

### 2. Get your service role key
In the Supabase dashboard → your `sparky-tutor` project → Project Settings → API — copy the **service_role** key. This is secret; never put it in frontend code (it isn't, in this setup — only the Netlify functions use it).

Project URL: `https://xqnvfdyfziaajbodvcxa.supabase.co`

### 3. Push to a GitHub repo
Netlify deploys from a repo. If `tanusree-tutor` isn't already on GitHub, create a repo and push it.

### 4. Create the Netlify site
- New site from Git → pick the repo
- Build command: (leave blank — no build step)
- Publish directory: `.`
- Add environment variables under Site settings → Environment variables:
  - `SUPABASE_URL` = `https://xqnvfdyfziaajbodvcxa.supabase.co`
  - `SUPABASE_SERVICE_ROLE_KEY` = *(the service_role key from step 2)*
  - `SESSION_SECRET` = *(any random long string — used to sign session tokens)*
- Deploy

### 5. Test it
- Open the Netlify URL
- Enter PIN `7307` — you should land on the dashboard
- Do a practice question, check Parent View shows "Supabase — Synced to cloud"
- In Supabase, `select * from sparky_state;` should show her progress

### 6. Change her PIN (optional, recommended)
Run this once in the Supabase SQL editor (or ask me to do it):
```sql
select sparky_set_pin('tanusree', 'Tanusree', 'NEW_PIN_HERE');
```

### 7. Give her the link
Send her the Netlify URL — she can bookmark it. The PIN is remembered on her device (localStorage) so she won't be asked again unless she clears browser data or uses a new device.

## Notes
- Local dev (`python -m http.server 4173`) will now fail to reach `/api/*` since there's no Flask server — that's expected. Local testing should point at the deployed Netlify functions, or you can run `netlify dev` locally if you install the Netlify CLI.
- Your old `save_server.py` and local `tanusree_progress.db` are untouched — nothing here deletes local data. If she has existing progress in that SQLite file, let me know and I'll write a one-time import script into Supabase before you retire the local server.
