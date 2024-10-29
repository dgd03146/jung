import { createBrowserClient } from '@supabase/ssr';

let supabaseClientInstance: ReturnType<typeof createBrowserClient> | null =
	null;

export const createClient = () => {
	if (supabaseClientInstance) return supabaseClientInstance;

	supabaseClientInstance = createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
	);

	return supabaseClientInstance;
};
