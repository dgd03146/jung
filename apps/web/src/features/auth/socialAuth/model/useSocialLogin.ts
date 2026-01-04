import { createClient } from '@/fsd/shared';
import type { SocialProvider } from './SocialProvider';

interface LoginOptions {
	redirectTo?: string;
}

export const useSocialLogin = () => {
	const supabase = createClient();

	const handleSocialLogin = async (
		provider: SocialProvider,
		options?: LoginOptions,
	) => {
		const next = options?.redirectTo || '/';

		const redirectTo = `${location.origin}${location.pathname
			.split('/')
			.slice(0, 2)
			.join('/')}/auth/callback?next=${encodeURIComponent(next)}`;

		const { error } = await supabase.auth.signInWithOAuth({
			provider,
			options: {
				redirectTo,
				queryParams: {
					next: next,
				},
			},
		});

		if (error) throw error;
	};

	return { handleSocialLogin };
};
