'use client';
// ^-- to make sure we can mount the Provider from a server component

import { getQueryClient } from '@/fsd/shared';
import type { AppRouter } from '@jung/server';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
	createTRPCClient,
	httpBatchLink,
	httpLink,
	splitLink,
} from '@trpc/client';
import { createTRPCContext } from '@trpc/tanstack-react-query';
import fetchPonyfill from 'fetch-ponyfill';
import { useState } from 'react';

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

export function getUrl() {
	const base = (() => {
		if (typeof window !== 'undefined') return '';
		if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
		return 'http://localhost:3000';
	})();
	return `${base}/api/trpc`;
}

export function TRPCReactProvider(
	props: Readonly<{
		children: React.ReactNode;
	}>,
) {
	// NOTE: Avoid useState when initializing the query client if you don't
	//       have a suspense boundary between this and the code that may
	//       suspend because React will throw away the client on the initial
	//       render if it suspends and there is no boundary
	const queryClient = getQueryClient();
	const [trpcClient] = useState(() =>
		createTRPCClient<AppRouter>({
			links: [
				splitLink({
					condition(op) {
						// check for context property `skipBatch`
						return op.context.skipBatch === true;
					},
					// when condition is true, use normal request
					true: httpLink({
						// vercel issue with fetch undici
						fetch: fetchPonyfill().fetch,
						url: `${getUrl()}`,
					}),
					// when condition is false, use batching
					false: httpBatchLink({
						fetch: fetchPonyfill().fetch,
						url: `${getUrl()}`,
					}),
				}),
			],
		}),
	);
	return (
		<QueryClientProvider client={queryClient}>
			<TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
				{props.children}
			</TRPCProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
