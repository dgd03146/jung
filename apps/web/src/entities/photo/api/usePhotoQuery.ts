import { trpc } from '@/fsd/shared';

export function usePhotoQuery(id: string) {
	return trpc.photos.getPhotoById.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 60 * 24, // 24시간
		gcTime: 1000 * 60 * 60 * 48, // 48시간
	});
}
