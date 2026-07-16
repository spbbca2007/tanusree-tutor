const { getSupabase, verifyToken, json } = require("./_supabase");

exports.handler = async (event) => {
  const token = event.headers["x-sparky-token"] || event.headers["X-Sparky-Token"];
  const studentId = verifyToken(token);
  if (!studentId) return json(401, { error: "Not authenticated" });

  const supabase = getSupabase();

  if (event.httpMethod === "GET") {
    try {
      const { data, error } = await supabase
        .from("sparky_state")
        .select("state_json, updated_at")
        .eq("student_id", studentId)
        .maybeSingle();
      if (error) return json(500, { error: error.message });
      if (!data) return json(200, { state: null, updated_at: null });
      return json(200, { state: data.state_json, updated_at: data.updated_at });
    } catch (e) {
      return json(500, { error: String(e) });
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const body = JSON.parse(event.body || "{}");
      const state = body.state || {};
      const now = new Date().toISOString();

      const { error: stateErr } = await supabase
        .from("sparky_state")
        .upsert({ student_id: studentId, state_json: state, updated_at: now }, { onConflict: "student_id" });
      if (stateErr) return json(500, { error: stateErr.message });

      const attempts = (state.attempts || []).map((a) => ({
        student_id: studentId,
        topic_id: a.topicId || "",
        question_id: a.questionId || "",
        skill: a.skill || "",
        correct: !!a.correct,
        ts: a.timestamp || "",
      }));
      if (attempts.length) {
        await supabase.from("sparky_attempts").upsert(attempts, {
          onConflict: "student_id,question_id,ts",
          ignoreDuplicates: true,
        });
      }

      const examRecords = (state.examRecords || []).map((r) => ({
        student_id: studentId,
        subject: r.subject || "",
        chapter: r.chapter || "",
        score: Number(r.score || 0),
        total: Number(r.total || 1),
        exam_date: r.date || "",
        notes: r.notes || "",
      }));
      if (examRecords.length) {
        await supabase.from("sparky_exam_records").upsert(examRecords, {
          onConflict: "student_id,subject,chapter,exam_date",
          ignoreDuplicates: true,
        });
      }

      const dailyEntries = Object.entries(state.dailyActivity || {});
      for (const [date, mins] of dailyEntries) {
        const { data: existing } = await supabase
          .from("sparky_daily_activity")
          .select("minutes_studied")
          .eq("student_id", studentId)
          .eq("activity_date", date)
          .maybeSingle();
        const merged = Math.max(existing?.minutes_studied || 0, Number(mins) || 0);
        await supabase
          .from("sparky_daily_activity")
          .upsert(
            { student_id: studentId, activity_date: date, minutes_studied: merged },
            { onConflict: "student_id,activity_date" }
          );
      }

      return json(200, { status: "saved", updated_at: now });
    } catch (e) {
      return json(500, { error: String(e) });
    }
  }

  return json(405, { error: "Method not allowed" });
};
