import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_APP_BE_URL;
const supabaseAnonKey = import.meta.env.VITE_APP_BE_ANON;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
