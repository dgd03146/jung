import type { Database } from '@jung/shared/types';
import { createClient } from '@supabase/supabase-js';

export function getServerSupabase() {
	const url = process.env.SUPABASE_URL;
	const key = process.env.SUPABASE_KEY;

	if (!url || !key) {
		throw new Error(
			'Missing SUPABASE_URL or SUPABASE_KEY environment variables',
		);
	}

	return createClient<Database>(url, key);
}
