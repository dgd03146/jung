import { createClient } from '@/fsd/shared';

export type SocialProvider = 'kakao' | 'google';

export const useAuth = () => {
	const supabase = createClient();

	const handleSocialLogin = async (provider: SocialProvider) => {
		const next = location.pathname;
		const redirectTo = `${location.origin}${location.pathname
			.split('/')
			.slice(0, 2)
			.join('/')}/auth/callback?next=${encodeURIComponent(next)}`;

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo,
			},
		});

		if (error) throw error;
	};

	return { handleSocialLogin };
};
