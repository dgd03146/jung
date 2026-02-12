import { MutationCache, QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 30 * 1000, // 30 seconds
				gcTime: 5 * 60 * 1000, // 5 minutes
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
