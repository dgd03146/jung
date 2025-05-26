import { useTRPC } from '@/fsd/app';

import { useSuspenseQuery } from '@tanstack/react-query';

export function usePhotoQuery(id: string) {
	const trpc = useTRPC();

	return useSuspenseQuery(
		trpc.photos.getPhotoById.queryOptions(id, {
			staleTime: 1000 * 60 * 60 * 24, // 24시간
			gcTime: 1000 * 60 * 60 * 48, // 48시간
		}),
	);
}
