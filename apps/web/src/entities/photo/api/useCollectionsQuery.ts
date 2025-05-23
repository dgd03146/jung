import { useTRPC } from '@/fsd/app';
import type { CollectionQueryParams } from '@jung/shared/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { COLLECTION_DEFAULTS } from '../config/photo';

export function useCollectionsQuery(params: CollectionQueryParams = {}) {
	const { sort = COLLECTION_DEFAULTS.sort } = params;
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.photoCollections.getAllCollections.queryOptions(
			{ sort },
			{
				staleTime: 1000 * 60 * 60 * 5, // 5시간
				gcTime: 1000 * 60 * 60 * 24, // 24시간
			},
		),
	);
}
