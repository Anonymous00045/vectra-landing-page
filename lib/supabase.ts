import { createClient } from '@supabase/supabase-js';

// Access environment variables securely in Vite
// Cast import.meta to any to avoid TypeScript errors when Vite client types are not loaded
const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase Environment Variables. Check your .env file.');
}

export const supabase = createClient(
  supabaseUrl || '', 
  supabaseAnonKey || ''
);