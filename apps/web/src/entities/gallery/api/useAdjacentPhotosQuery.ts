import { useTRPC } from '@/fsd/app';
import type { Sort } from '@/fsd/shared';
import type { AdjacentPhotosData } from '@jung/shared/types';
import { useQuery } from '@tanstack/react-query';

interface UseAdjacentPhotosQueryParams {
	id: string;
	sort?: Sort;
	collectionId?: string;
	enabled?: boolean;
	initialData?: AdjacentPhotosData;
}

export function useAdjacentPhotosQuery({
	id,
	sort,
	collectionId,
	enabled = true,
	initialData,
}: UseAdjacentPhotosQueryParams) {
	const trpc = useTRPC();

	const queryOptions = trpc.gallery.getAdjacentPhotos.queryOptions(
		{ id, sort, collectionId },
		{
			staleTime: 1000 * 60 * 5,
			gcTime: 1000 * 60 * 30,
			initialData: initialData,
		},
	);

	return useQuery({
		...queryOptions,
		enabled: enabled && !!id,
	});
}
