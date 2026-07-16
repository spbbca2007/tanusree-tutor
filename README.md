# Sparky — Tanusree's Study Tutor

Local-first personalised math learning app for Tanusree (Grade 6 → 7).

## Quick start

**Easiest:** Right-click `start_tutor.ps1` → "Run with PowerShell"

**Manual (two PowerShell windows):**

Window 1 (database):
```
python save_server.py
```

Window 2 (app):
```
python -m http.server 4173
```

Then open Chrome at **http://localhost:4173**

## First time setup
1. Start the app (above)
2. Go to **Parent View → Restore from backup**
3. Pick Tanusree's latest `tanusree-backup-*.json`

## Daily backup
Just copy the file `tanusree_progress.db` — that's the complete backup.

## What's inside
- **11 topics**: Algebra, Fractions, Ratio, Patterns, Graphs, Measurement, Probability + 4 from her actual school papers (Rounding Decimals, Integers, Function Machines, Surface Area)
- **94 questions** with animated visuals and interactive explorers
- **Step-by-step solver** on every question
- **SQLite database** with auto-save and localStorage fallback
- **Parent View** with mastery tracking and backup tools

## Topics from her school papers
- **Rounding Decimals** — she confused "tenth" with "ten" (wrote 10 for 6.84). Fixed with a clear place-value visual.
- **Integers** — she scored 20/20 comparing; extended to operations.
- **Function Machines** — from her Term 3 test (cube→+2); consolidated.
- **Surface Area** — left blank in homework; full first-principles intro.
