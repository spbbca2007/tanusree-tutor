#!/usr/bin/env python3
"""migrate.py — Import a JSON backup into SQLite directly (optional helper)."""
import sys, json, sqlite3, os
from datetime import datetime
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tanusree_progress.db")
if len(sys.argv) < 2:
    print("Usage: python migrate.py <backup.json>"); sys.exit(1)
with open(sys.argv[1]) as f: backup = json.load(f)
state = backup.get("state", backup)
conn = sqlite3.connect(DB_FILE)
conn.execute("CREATE TABLE IF NOT EXISTS tbl_state (id INTEGER PRIMARY KEY CHECK(id=1), state_json TEXT, updated_at TEXT)")
conn.execute("INSERT INTO tbl_state(id,state_json,updated_at) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET state_json=excluded.state_json,updated_at=excluded.updated_at",(json.dumps(state),datetime.now().isoformat()))
conn.commit(); conn.close()
print(f"Imported into {DB_FILE}")
