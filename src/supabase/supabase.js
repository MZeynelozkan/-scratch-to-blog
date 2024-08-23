import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ubdkewhszfatpktidcvx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InViZGtld2hzemZhdHBrdGlkY3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQzNTQ2MjIsImV4cCI6MjAzOTkzMDYyMn0.pjnh8CuqqPwZm_eahA8AjvpPX6heovYoS7E0TljnPhw";
export const supabase = createClient(supabaseUrl, supabaseKey);
