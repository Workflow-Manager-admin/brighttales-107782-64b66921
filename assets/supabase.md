# Supabase Integration for BrightTales Storybook Frontend

## Project Supabase Settings
- **Supabase Project URL:** https://krtgthvlsqcyehlczelp.supabase.co
- **Anon Public Key:** eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGd0aHZscXFjeWVobGN6ZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzI1MDUsImV4cCI6MjA2NzMwODUwNX0.mRUUpm7VsJs089dm3jL-fN8_o-cTT5KH2JKsxL1x4r4

These values are safe to use in production/public web UIs for read/write access (security is handled by Supabase RLS).

## Configuration

Frontend (`storybook_frontend/src/supabase.js`) is configured with the project URL and anon key:
```js
import { createClient } from "@supabase/supabase-js";
const SUPABASE_URL = "https://krtgthvlsqcyehlczelp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtydGd0aHZscXFjeWVobGN6ZWxwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3MzI1MDUsImV4cCI6MjA2NzMwODUwNX0.mRUUpm7VsJs089dm3jL-fN8_o-cTT5KH2JKsxL1x4r4";
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

## Progress Table

The `progress` table tracks user progress:
- **user_id**: `text` (name or ID, provided by frontend)
- **last_chapter**: `int` (last chapter index reached)

The frontend loads and saves progress using Supabase JS SDK:
- On start, progress is loaded with `.select("last_chapter").eq("user_id", uid)`
- On chapter change, progress is upserted with `.upsert({ user_id, last_chapter })`

## Security

- The anon key and project URL are public and safe for frontend usage.
- Use Supabase RLS for additional row-level security in production.

_Last updated: Supabase client set to direct values, May 2024_
