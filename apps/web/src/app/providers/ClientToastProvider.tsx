'use client';

import { ToastContainer, ToastProvider } from '@jung/design-system';

export function ClientToastProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ToastProvider>
			{children}
			<ToastContainer />
		</ToastProvider>
	);
}
