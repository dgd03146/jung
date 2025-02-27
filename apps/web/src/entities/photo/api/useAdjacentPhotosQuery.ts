import { type Sort, trpc } from '@/fsd/shared';

export function useAdjacentPhotosQuery({
	id,
	sort,
	collectionId,
}: { id: string; sort?: Sort; collectionId?: string }) {
	return trpc.photos.getAdjacentPhotos.useSuspenseQuery(
		{ id, sort, collectionId },
		{
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 30,
		},
	);
}
