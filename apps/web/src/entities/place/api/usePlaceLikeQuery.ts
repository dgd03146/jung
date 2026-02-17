import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/shared';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';

export function usePlaceLikeQuery(placeId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.place.getLikeInfo.queryOptions(placeId, LIKE_QUERY_OPTIONS),
	);
}
