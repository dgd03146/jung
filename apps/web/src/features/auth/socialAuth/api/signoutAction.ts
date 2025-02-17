'use server';

import { createClientForServer } from '@/fsd/shared/index.server';

export async function signOut() {
	const supabase = createClientForServer();
	await supabase.auth.signOut();
}
