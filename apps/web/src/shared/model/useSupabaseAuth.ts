'use client';

import { createClient } from '@/fsd/shared';
import type { Session, Subscription, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export const useSupabaseAuth = () => {
	const [session, setSession] = useState<Session | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const supabase = createClient();
	useEffect(() => {
		supabase.auth
			.getSession()
			.then(({ data: { session } }: { data: { session: Session | null } }) => {
				setSession(session);
				setUser(session?.user ?? null);
			});

		const {
			data: { subscription },
		}: { data: { subscription: Subscription } } =
			supabase.auth.onAuthStateChange(
				(_event: string, session: Session | null) => {
					setSession(session);
					setUser(session?.user ?? null);
				},
			);

		return () => subscription.unsubscribe();
	}, [supabase]);

	const signOut = async () => {
		await supabase.auth.signOut();
	};

	return { session, user, signOut };
};
