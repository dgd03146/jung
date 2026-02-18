import type { CollectionQueryParams } from '@jung/shared/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { COLLECTION_CACHE, COLLECTION_DEFAULTS } from '../config/gallery';

export function useCollectionsQuery(params: CollectionQueryParams = {}) {
	const { sort = COLLECTION_DEFAULTS.sort } = params;
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.galleryCollections.getAllCollections.queryOptions(
			{ sort },
			{
				staleTime: COLLECTION_CACHE.STALE_TIME,
				gcTime: COLLECTION_CACHE.GC_TIME,
			},
		),
	);
}
