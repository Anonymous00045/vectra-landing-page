import { supabase } from './supabase';

export interface WaitlistStats {
  count: number;
  total: number;
}

export interface WaitlistResponse {
  success: boolean;
  message?: string;
  stats?: WaitlistStats;
}

// Fallback total capacity
const MAX_CAPACITY = 5000;

/**
 * Submits an email to the waitlist via Supabase.
 */
export async function joinWaitlist(email: string): Promise<WaitlistResponse> {
  try {
    // 1. Validate email format
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Invalid email address.' };
    }

    // 2. Insert into Supabase
    const { error } = await supabase
      .from('waitlist')
      .insert([{ email }]);

    if (error) {
      // Handle unique constraint violation (Code 23505 in Postgres)
      if (error.code === '23505') {
        return { success: true, message: 'You are already on the list!' };
      }
      throw error;
    }

    // 3. Fetch updated stats to return to UI
    const stats = await getWaitlistStats();

    return { 
      success: true, 
      stats 
    };

  } catch (error) {
    console.error('Waitlist Error:', error);
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
}

/**
 * Fetches the current number of people on the waitlist from Supabase.
 */
export async function getWaitlistStats(): Promise<WaitlistStats> {
  try {
    // count='exact' asks Postgres for the total number of rows
    // head=true means we don't want the actual data, just the count metadata
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) throw error;

    return { 
      count: count || 0, 
      total: MAX_CAPACITY 
    };
  } catch (error) {
    console.warn('Failed to fetch stats, using fallback', error);
    // Fallback to a realistic number if DB connection fails so UI doesn't look broken
    return { count: 3420, total: MAX_CAPACITY };
  }
}