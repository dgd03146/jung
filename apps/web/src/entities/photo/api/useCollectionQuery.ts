import { trpc } from '@/fsd/shared';

export function useCollectionQuery(collectionId: string) {
	return trpc.photoCollections.getCollectionById.useSuspenseQuery(
		collectionId,
		{
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		},
	);
}
