import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('YOUR_SUPABASE') &&
  !supabaseUrl.includes('YOUR_PROJECT_ID')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    })
  : null;

/**
 * Safely executes a Supabase query without breaking if unconfigured or encountering network issues.
 */
export async function safeSupabase(queryPromise: PromiseLike<any>): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await queryPromise;
  } catch (err) {
    console.warn('Supabase operation warning:', err);
  }
}
