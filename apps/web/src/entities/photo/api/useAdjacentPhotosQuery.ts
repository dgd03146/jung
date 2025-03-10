import { useTRPC } from '@/fsd/app';
import type { Sort } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';

export function useAdjacentPhotosQuery({
	id,
	sort,
	collectionId,
	enabled = true,
}: {
	id: string;
	sort?: Sort;
	collectionId?: string;
	enabled?: boolean;
}) {
	const trpc = useTRPC();

	return useQuery(
		trpc.photos.getAdjacentPhotos.queryOptions(
			{ id, sort, collectionId },
			{
				staleTime: 1000 * 60 * 5,
				gcTime: 1000 * 60 * 30,
				enabled: enabled && !!id,
			},
		),
	);
}
