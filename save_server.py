#!/usr/bin/env python3
"""
save_server.py — Sparky SQLite backend
Run: python save_server.py
Serves on localhost:5000
"""
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3, json, os
from datetime import datetime

app = Flask(__name__)
CORS(app)
DB_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "tanusree_progress.db")

SCHEMA = """
CREATE TABLE IF NOT EXISTS tbl_state (id INTEGER PRIMARY KEY CHECK(id=1), state_json TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS tbl_attempts (id INTEGER PRIMARY KEY AUTOINCREMENT, topic_id TEXT, question_id TEXT, skill TEXT, correct INTEGER, timestamp TEXT, UNIQUE(question_id,timestamp));
CREATE TABLE IF NOT EXISTS tbl_exam_records (id INTEGER PRIMARY KEY AUTOINCREMENT, subject TEXT, chapter TEXT, score REAL, total REAL, exam_date TEXT, notes TEXT, UNIQUE(subject,chapter,exam_date));
CREATE TABLE IF NOT EXISTS tbl_daily_activity (id INTEGER PRIMARY KEY AUTOINCREMENT, activity_date TEXT UNIQUE, minutes_studied INTEGER);
"""

def get_db():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA journal_mode=WAL")
    return conn

def init_db():
    conn = get_db()
    conn.executescript(SCHEMA)
    conn.commit()
    conn.close()

@app.route("/api/health")
def health():
    return jsonify({"status":"ok","db":os.path.basename(DB_FILE),"db_size_kb":round(os.path.getsize(DB_FILE)/1024,1) if os.path.exists(DB_FILE) else 0,"timestamp":datetime.now().isoformat()})

@app.route("/api/state", methods=["POST"])
def save_state():
    try:
        state = request.get_json().get("state",{})
        now = datetime.now().isoformat()
        conn = get_db()
        conn.execute("INSERT INTO tbl_state(id,state_json,updated_at) VALUES(1,?,?) ON CONFLICT(id) DO UPDATE SET state_json=excluded.state_json,updated_at=excluded.updated_at",(json.dumps(state),now))
        for a in state.get("attempts",[]):
            try: conn.execute("INSERT OR IGNORE INTO tbl_attempts(topic_id,question_id,skill,correct,timestamp) VALUES(?,?,?,?,?)",(a.get("topicId",""),a.get("questionId",""),a.get("skill",""),1 if a.get("correct") else 0,a.get("timestamp","")))
            except: pass
        for r in state.get("examRecords",[]):
            try: conn.execute("INSERT OR IGNORE INTO tbl_exam_records(subject,chapter,score,total,exam_date,notes) VALUES(?,?,?,?,?,?)",(r.get("subject",""),r.get("chapter",""),float(r.get("score",0)),float(r.get("total",1)),r.get("date",""),r.get("notes","")))
            except: pass
        for date,mins in state.get("dailyActivity",{}).items():
            try: conn.execute("INSERT INTO tbl_daily_activity(activity_date,minutes_studied) VALUES(?,?) ON CONFLICT(activity_date) DO UPDATE SET minutes_studied=MAX(minutes_studied,excluded.minutes_studied)",(date,int(mins)))
            except: pass
        conn.commit(); conn.close()
        return jsonify({"status":"saved","updated_at":now})
    except Exception as e:
        return jsonify({"error":str(e)}),500

@app.route("/api/state", methods=["GET"])
def load_state():
    try:
        conn = get_db()
        row = conn.execute("SELECT state_json,updated_at FROM tbl_state WHERE id=1").fetchone()
        conn.close()
        if not row: return jsonify({"state":None,"updated_at":None})
        return jsonify({"state":json.loads(row["state_json"]),"updated_at":row["updated_at"]})
    except Exception as e:
        return jsonify({"error":str(e)}),500

@app.route("/api/stats")
def stats():
    try:
        conn = get_db()
        def c(t): return conn.execute(f"SELECT COUNT(*) FROM {t}").fetchone()[0]
        lu = conn.execute("SELECT updated_at FROM tbl_state WHERE id=1").fetchone()
        conn.close()
        return jsonify({"db_file":os.path.basename(DB_FILE),"db_size_kb":round(os.path.getsize(DB_FILE)/1024,1) if os.path.exists(DB_FILE) else 0,"last_updated":lu[0] if lu else None,"counts":{"attempts":c("tbl_attempts"),"exam_records":c("tbl_exam_records"),"active_days":c("tbl_daily_activity")}})
    except Exception as e:
        return jsonify({"error":str(e)}),500

if __name__=="__main__":
    print("\n"+"="*45)
    print("  Sparky — Save Server")
    print("="*45)
    init_db()
    print(f"  DB: {DB_FILE}")
    print(f"  API: http://localhost:5000/api/health")
    print("="*45+"\n")
    app.run(host="localhost",port=5000,debug=False)
