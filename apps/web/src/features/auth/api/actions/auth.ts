'use server';

import { createClientForServer } from '@/fsd/shared/index.server';
import { redirect } from 'next/navigation';

export async function signOut() {
	const supabase = createClientForServer();
	await supabase.auth.signOut();
	redirect('/');
}
