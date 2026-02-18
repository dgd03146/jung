import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { COLLECTION_CACHE } from '../config/gallery';

export function useCollectionQuery(collectionId: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.galleryCollections.getCollectionById.queryOptions(collectionId, {
			staleTime: COLLECTION_CACHE.STALE_TIME,
			gcTime: COLLECTION_CACHE.GC_TIME,
		}),
	);
}
