// ── CONFIGURATION SUPABASE ────────────────────────────────────
const SUPABASE_URL = 'https://azpyhkwynaplqfiembln.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6cHloa3d5bmFwbHFmaWVtYmxuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNDgyNjIsImV4cCI6MjA4ODgyNDI2Mn0.g3TyKHnsf8A9IQclSDBp3fFcxBjcJEedYyobWKcr_TQ';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
