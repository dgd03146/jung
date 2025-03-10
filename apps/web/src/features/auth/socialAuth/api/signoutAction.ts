'use server';

import { createClient } from '@/fsd/shared/index.server';

export async function signOut() {
	const supabase = await createClient();
	await supabase.auth.signOut();
}
