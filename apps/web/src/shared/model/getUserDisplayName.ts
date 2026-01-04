import type { User } from '@supabase/supabase-js';

export const getUserDisplayName = (user: User): string => {
	const provider = user.app_metadata.provider;
	const metadata = user.user_metadata;

	switch (provider) {
		case 'github':
			return metadata.user_name || metadata.name || 'GitHub User';
		case 'google':
			return metadata.email?.split('@')[0] || metadata.name || 'Google User';
		case 'kakao':
			return metadata.nickname || metadata.name || 'Kakao User';
		default:
			return metadata.name || 'Anonymous';
	}
};
