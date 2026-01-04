import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

export function usePlaceQuery(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.place.getPlaceById.queryOptions(id, {
			staleTime: 1000 * 60 * 60 * 5, // 5시간
			gcTime: 1000 * 60 * 60 * 24, // 24시간
		}),
	);
}
