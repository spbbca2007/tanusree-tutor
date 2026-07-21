#!/usr/bin/env python3
"""
migrate_to_cloud.py — One-time migration of Tanusree's local progress
into the deployed Sparky (Supabase + Netlify) backend.

Run this from inside D:\\Tanu\\tanusree-tutor (same folder as tanusree_progress.db).
Usage:
    python migrate_to_cloud.py

It will:
  1. Read the saved state blob out of tanusree_progress.db
  2. Log in to the live site using the PIN (same one Tanusree uses)
  3. Push that state to the live Supabase-backed API

Safe to re-run — it just overwrites the cloud state with local state,
it does not delete or duplicate anything.
"""
import sqlite3
import json
import urllib.request
import urllib.error
import os
import getpass

DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tanusree_progress.db")
SITE_URL = "https://tanusree-tutor.netlify.app"
STUDENT_KEY = "tanusree"


def http_post(url, payload, headers=None):
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, method="POST")
    req.add_header("Content-Type", "application/json")
    for k, v in (headers or {}).items():
        req.add_header(k, v)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return resp.status, json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8")
        try:
            body = json.loads(body)
        except Exception:
            pass
        return e.code, body


def main():
    print("=" * 50)
    print("  Sparky — migrate local progress to the cloud")
    print("=" * 50)

    if not os.path.exists(DB_FILE):
        print(f"  ERROR: {DB_FILE} not found.")
        print("  Run this script from inside D:\\Tanu\\tanusree-tutor")
        return

    conn = sqlite3.connect(DB_FILE)
    row = conn.execute("SELECT state_json, updated_at FROM tbl_state WHERE id=1").fetchone()
    conn.close()

    if not row:
        print("  No saved state found in the local database. Nothing to migrate.")
        return

    state = json.loads(row[0])
    print(f"  Found local state, last updated {row[1]}")
    print(f"  Attempts: {len(state.get('attempts', []))}, "
          f"Exam records: {len(state.get('examRecords', []))}, "
          f"Stars: {state.get('stars', 0)}, Streak: {state.get('streak', 0)}")

    pin = getpass.getpass("  Enter Tanusree's PIN: ").strip()
    if not pin:
        print("  No PIN entered, aborting.")
        return

    print("  Logging in...")
    status, resp = http_post(f"{SITE_URL}/api/verify-pin", {"studentKey": STUDENT_KEY, "pin": pin})
    if status != 200:
        print(f"  Login failed ({status}): {resp}")
        return
    token = resp["token"]
    print("  Logged in. Uploading state...")

    status, resp = http_post(f"{SITE_URL}/api/state", {"state": state}, headers={"x-sparky-token": token})
    if status != 200:
        print(f"  Upload failed ({status}): {resp}")
        return

    print(f"  Success! Cloud state updated at {resp.get('updated_at')}")
    print("  Open the site and check Parent View / Dashboard to confirm her progress shows up.")


if __name__ == "__main__":
    main()
