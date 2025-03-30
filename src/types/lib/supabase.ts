import { SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 */
export interface SupabaseConfig {
  url: string;
  key: string;
}

/**
 * Supabase client instance
 */
export type SupabaseInstance = SupabaseClient;
