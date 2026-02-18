import { useQuery } from '@tanstack/react-query';
import { LIKE_QUERY_OPTIONS, useTRPC } from '@/fsd/shared';

export function usePhotoLikeQuery(photoId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.gallery.getLikeInfo.queryOptions(photoId, LIKE_QUERY_OPTIONS),
	);
}
