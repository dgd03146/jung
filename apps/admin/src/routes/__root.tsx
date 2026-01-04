import { ToastContainer, ToastProvider } from '@jung/design-system/components';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Layout } from '@/fsd/widgets';

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
