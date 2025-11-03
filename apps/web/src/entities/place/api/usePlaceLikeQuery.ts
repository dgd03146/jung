import { useTRPC } from '@/fsd/app';
import { LIKE_QUERY_OPTIONS } from '@/fsd/shared/api';
import { useQuery } from '@tanstack/react-query';

export function usePlaceLikeQuery(placeId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.place.getLikeInfo.queryOptions(placeId, LIKE_QUERY_OPTIONS),
	);
}
