const { getSupabase, verifyToken, json } = require("./_supabase");

exports.handler = async (event) => {
  const token = event.headers["x-sparky-token"] || event.headers["X-Sparky-Token"];
  const studentId = verifyToken(token);
  if (!studentId) return json(401, { error: "Not authenticated" });

  const supabase = getSupabase();
  try {
    const [attempts, activeDays, stateRow] = await Promise.all([
      supabase.from("sparky_attempts").select("id", { count: "exact", head: true }).eq("student_id", studentId),
      supabase.from("sparky_daily_activity").select("activity_date", { count: "exact", head: true }).eq("student_id", studentId),
      supabase.from("sparky_state").select("updated_at").eq("student_id", studentId).maybeSingle(),
    ]);

    return json(200, {
      db_file: "supabase",
      db_size_kb: null,
      last_updated: stateRow.data?.updated_at || null,
      counts: {
        attempts: attempts.count || 0,
        exam_records: 0,
        active_days: activeDays.count || 0,
      },
    });
  } catch (e) {
    return json(500, { error: String(e) });
  }
};
