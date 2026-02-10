import { ToastContainer, ToastProvider } from '@jung/design-system/components';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '../styles/global.css';

export const Route = createRootRoute({
	component: RootComponent,
});

function RootComponent() {
	return (
		<ToastProvider>
			<Outlet />
			<ToastContainer />
			<TanStackRouterDevtools position='bottom-left' />
		</ToastProvider>
	);
}
