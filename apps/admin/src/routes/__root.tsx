import { Layout } from '@/fsd/widgets';
import { ToastContainer, ToastProvider } from '@jung/design-system/components';
import type { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
}>()({
	component: RootComponent,
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
