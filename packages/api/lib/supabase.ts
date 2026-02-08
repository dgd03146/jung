import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
	if (_supabase) return _supabase;

	const supabaseUrl =
		process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
	const supabaseKey =
		process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!supabaseUrl || !supabaseKey) {
		throw new Error('Missing Supabase environment variables');
	}

	_supabase = createClient(supabaseUrl, supabaseKey);
	return _supabase;
}

export const supabase = new Proxy({} as SupabaseClient, {
	get(_, prop) {
		return getSupabase()[prop as keyof SupabaseClient];
	},
});
