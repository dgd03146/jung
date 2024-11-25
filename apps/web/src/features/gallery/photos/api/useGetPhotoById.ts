import { trpc } from '@/fsd/shared';

export function useGetPhotoById(id: string) {
	return trpc.photos.getPhotoById.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 5, // 5분
		gcTime: 1000 * 60 * 30, // 30분
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
}
