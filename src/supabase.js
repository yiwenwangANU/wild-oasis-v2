import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.REACT_APP_SUPABASE_URL ||
  "https://kyjkvmtqkfvbenttjrma.supabase.co";
const SUPABASE_KEY =
  process.env.REACT_APP_SUPABASE_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt5amt2bXRxa2Z2YmVudHRqcm1hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEwMTkyNTksImV4cCI6MjAzNjU5NTI1OX0.V7wE07QllKOgophn69YVdZj1QW-W13FZsgV8DEt-k3A";

console.log("Supabase URL:", SUPABASE_URL);
console.log("Supabase Key:", SUPABASE_KEY);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export const supabaseUrl = SUPABASE_URL;
export default supabase;
