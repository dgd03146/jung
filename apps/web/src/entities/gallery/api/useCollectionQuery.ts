import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

export function useCollectionQuery(collectionId: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.galleryCollections.getCollectionById.queryOptions(collectionId, {
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		}),
	);
}
