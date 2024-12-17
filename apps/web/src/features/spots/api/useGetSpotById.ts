import { trpc } from '@/fsd/shared';

export function useGetSpotById(id: string) {
	return trpc.spot.getSpotById.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 60 * 5, // 5시간
		gcTime: 1000 * 60 * 60 * 24, // 24시간
	});
}
