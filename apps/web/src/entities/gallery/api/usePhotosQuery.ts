import type { PhotoQueryParams } from '@jung/shared/types';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { PHOTO_CACHE, PHOTO_DEFAULTS } from '../config/gallery';

export function usePhotosQuery(params: PhotoQueryParams) {
	const { sort, q } = params;
	const trpc = useTRPC();

	const infiniteOptions = trpc.gallery.getAllPhotos.infiniteQueryOptions(
		{
			limit: PHOTO_DEFAULTS.LIMIT,
			sort,
			q,
		},
		{
			getNextPageParam: (lastPage) => {
				if (lastPage.nextCursor === null) {
					return undefined;
				}
				return lastPage.nextCursor;
			},
			staleTime: PHOTO_CACHE.STALE_TIME,
			gcTime: PHOTO_CACHE.GC_TIME,
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
