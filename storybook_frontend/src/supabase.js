/// Supabase singleton client for saving/loading progress
import { createClient } from "@supabase/supabase-js";

// Supabase configuration: direct, public, browser-safe keys
const SUPABASE_URL = "https://krtgthvlsqcyehlczelp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGd0aHZscXFjeWVobGN6ZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzI1MDUsImV4cCI6MjA2NzMwODUwNX0.mRUUpm7VsJs089dm3jL-fN8_o-cTT5KH2JKsxL1x4r4";

// PUBLIC_INTERFACE
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
