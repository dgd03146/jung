import { useTRPC } from '@/fsd/app';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useSpotQuery(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.spot.getSpotById.queryOptions(id, {
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		}),
	);
}
