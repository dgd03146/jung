import { useTRPC } from '@/fsd/app';
import { useQuery } from '@tanstack/react-query';

export function usePhotoLikeQuery(photoId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.photos.getLikeInfo.queryOptions(photoId, {
			staleTime: 10 * 1000, // 10초
			refetchOnMount: true,
			refetchOnWindowFocus: 'always',
			refetchOnReconnect: true,
		}),
	);
}
