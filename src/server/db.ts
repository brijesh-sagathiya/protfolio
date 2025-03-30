import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

import { SupabaseConfig, SupabaseInstance } from '@/types/lib/supabase';

dotenv.config();

/**
 * Supabase configuration
 */
const supabaseConfig: SupabaseConfig = {
  url: process.env.VITE_SUPABASE_URL as string,
  key: process.env.VITE_SUPABASE_ANON_KEY as string,
};

/**
 * Supabase client instance
 */
export const supabase: SupabaseInstance = createClient(supabaseConfig.url, supabaseConfig.key, {
  auth: { persistSession: false },
});
