const { getSupabase, json } = require("./_supabase");

exports.handler = async () => {
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("sparky_students").select("id").limit(1);
    if (error) return json(200, { status: "error", db: "supabase", detail: error.message });
    return json(200, { status: "ok", db: "supabase", timestamp: new Date().toISOString() });
  } catch (e) {
    return json(200, { status: "error", db: "supabase", detail: String(e) });
  }
};
