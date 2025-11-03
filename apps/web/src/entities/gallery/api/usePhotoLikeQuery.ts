import { useTRPC } from '@/fsd/app';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';
import { useQuery } from '@tanstack/react-query';

export function usePhotoLikeQuery(photoId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.gallery.getLikeInfo.queryOptions(photoId, LIKE_QUERY_OPTIONS),
	);
}
