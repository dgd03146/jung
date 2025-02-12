import { trpc } from '@/fsd/shared';

export function useAdjacentPhotosQuery(id: string) {
	return trpc.photos.getAdjacentPhotos.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
	});
}
