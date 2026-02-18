import { useQuery } from '@tanstack/react-query';
import { LIKE_QUERY_OPTIONS, useTRPC } from '@/fsd/shared';

export function usePlaceLikeQuery(placeId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.place.getLikeInfo.queryOptions(placeId, LIKE_QUERY_OPTIONS),
	);
}
