import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL || "Missing SUPABASE_URL";
const SUPABASE_KEY =
  process.env.REACT_APP_SUPABASE_KEY || "Missing SUPABASE_KEY";

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Key:", SUPABASE_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const supabaseUrl = SUPABASE_URL;
export default supabase;
