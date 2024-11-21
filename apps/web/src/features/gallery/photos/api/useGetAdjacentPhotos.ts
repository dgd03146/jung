import { trpc } from '@/fsd/shared';

export function useGetAdjacentPhotos(id: string) {
	return trpc.photos.getAdjacentPhotos.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 5,
		gcTime: 1000 * 60 * 30,
	});
}
