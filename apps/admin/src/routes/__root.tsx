import { Layout } from '@/fsd/widgets';
import { ToastContainer, ToastProvider } from '@jung/design-system/components';
import { createClient } from '@supabase/supabase-js';
import type { QueryClient } from '@tanstack/react-query';
import {
	Outlet,
	createRootRouteWithContext,
	redirect,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

const supabase = createClient(
	import.meta.env.VITE_SUPABASE_URL,
	import.meta.env.VITE_SUPABASE_KEY,
);

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
	beforeLoad: async () => {
		const {
			data: { session },
		} = await supabase.auth.getSession();

		if (window.location.pathname === '/login' && session) {
			throw redirect({
				to: '/',
			});
		}

		if (window.location.pathname !== '/login' && !session) {
			throw redirect({
				to: '/login',
			});
		}

		if (session) {
			const { data: profile } = await supabase
				.from('profiles')
				.select('role')
				.eq('id', session.user.id)
				.single();

			if (profile?.role !== 'admin' && profile?.role !== 'demo_admin') {
				await supabase.auth.signOut();
				throw redirect({
					to: '/login',
				});
			}
		}
	},
});

function RootComponent() {
	return (
		<ToastProvider>
			<ToastContainer />
			<Layout>
				<Outlet />
				<TanStackRouterDevtools position='bottom-left' />
			</Layout>
		</ToastProvider>
	);
}
