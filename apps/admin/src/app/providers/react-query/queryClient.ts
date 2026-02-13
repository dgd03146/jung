import { MutationCache, QueryClient } from '@tanstack/react-query';

const THIRTY_SECONDS_MS = 30 * 1000;
const FIVE_MINUTES_MS = 5 * 60 * 1000;

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: THIRTY_SECONDS_MS,
				gcTime: FIVE_MINUTES_MS,
				refetchOnWindowFocus: true,
				retry: 2,
			},
		},
		mutationCache: new MutationCache({
			onError: (error) => {
				console.error('[Mutation Error]', error);
			},
		}),
	});
}
