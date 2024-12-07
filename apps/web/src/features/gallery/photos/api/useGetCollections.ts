import { trpc } from '@/fsd/shared';

type QueryParams = {
	sort?: 'latest' | 'popular';
};

export function useGetCollections(params: QueryParams = {}) {
	const { sort = 'latest' } = params;

	return trpc.photoCollections.getAllCollections.useSuspenseQuery(
		{ sort },
		{
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
