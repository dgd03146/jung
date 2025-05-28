import { useTRPC } from '@/fsd/app';
import { useQuery } from '@tanstack/react-query';

export function useSpotLikeQuery(spotId: string) {
	const trpc = useTRPC();

	return useQuery(
		trpc.spot.getLikeInfo.queryOptions(spotId, {
			staleTime: 10 * 1000, // 10초
			refetchOnMount: true,
			refetchOnWindowFocus: 'always',
			refetchOnReconnect: true,
		}),
	);
}
