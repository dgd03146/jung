import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ReactNode } from 'react';
import React, { lazy, useEffect } from 'react';
import { makeQueryClient } from './queryClient';

export const queryClient = makeQueryClient();

const ReactQueryDevtoolsProduction = lazy(() =>
	import('@tanstack/react-query-devtools/build/modern/production.js').then(
		(d) => ({
			default: d.ReactQueryDevtools,
		}),
	),
);

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
	const [showDevtools, setShowDevtools] = React.useState(false);

	useEffect(() => {
		// @ts-expect-error
		window.toggleDevtools = () => setShowDevtools((old) => !old);
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen />
			{showDevtools && (
				<React.Suspense fallback={null}>
					<ReactQueryDevtoolsProduction />
				</React.Suspense>
			)}
		</QueryClientProvider>
	);
};

export default ReactQueryProvider;
