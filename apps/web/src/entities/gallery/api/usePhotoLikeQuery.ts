import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';

export function usePhotoLikeQuery(photoId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.gallery.getLikeInfo.queryOptions(photoId, LIKE_QUERY_OPTIONS),
	);
}
