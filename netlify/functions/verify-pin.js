const { getSupabase, sign, json } = require("./_supabase");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  try {
    const { studentKey, pin } = JSON.parse(event.body || "{}");
    if (!studentKey || !pin) return json(400, { error: "studentKey and pin required" });

    const supabase = getSupabase();
    const { data, error } = await supabase.rpc("sparky_verify_pin", {
      p_student_key: studentKey,
      p_pin: pin,
    });
    if (error) return json(500, { error: error.message });
    if (!data) return json(401, { error: "Incorrect PIN" });

    return json(200, { token: sign(data), studentId: data });
  } catch (e) {
    return json(500, { error: String(e) });
  }
};
