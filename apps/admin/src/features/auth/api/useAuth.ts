import { Routes } from '@/fsd/shared/config/routes';
import { useToast } from '@jung/design-system/components/Toast/hooks/useToast';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from '@tanstack/react-router';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY,
);

export const useAuth = () => {
	const showToast = useToast();
	const navigate = useNavigate();

	const login = async (email: string, password: string) => {
		console.log(email, password, 'email, password');
		try {
			const { data: authData, error: authError } =
				await supabase.auth.signInWithPassword({
					email,
					password,
				});

			if (authError) {
				throw new Error(authError.message);
			}

			if (!authData.user) {
				throw new Error('Can not get user');
			}

			const { data: profile, error: profileError } = await supabase
				.from('profiles')
				.select('role')
				.eq('id', authData.user.id)
				.maybeSingle();

			if (profileError) {
				await supabase.auth.signOut();
				throw new Error(profileError.message);
			}

			if (!profile) {
				await supabase.auth.signOut();
				throw new Error('No profile yet, Ask admin to create one');
			}

			if (profile.role !== 'admin' && profile.role !== 'demo_admin') {
				await supabase.auth.signOut();
				throw new Error('Admin permission is required');
			}

			return { ...authData, role: profile.role };
		} catch (error) {
			await supabase.auth.signOut();
			throw error;
		}
	};

	const logout = async () => {
		try {
			const { error } = await supabase.auth.signOut();

			if (error) throw error;

			showToast('Logout successfully!', 'success');

			navigate({ to: Routes.login.path });
		} catch (error) {
			showToast('Logout failed!', 'error');
			throw error;
		}
	};

	return { login, logout };
};
