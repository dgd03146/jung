import { useTRPC } from '@/fsd/app';
import type { PhotoQueryParams } from '@jung/shared/types';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { PHOTO_PARAMS } from '../config/constants';

export function usePhotosQuery(params: PhotoQueryParams) {
	const { sort, q } = params;
	const trpc = useTRPC();

	const infiniteOptions = trpc.photos.getAllPhotos.infiniteQueryOptions(
		{
			limit: PHOTO_PARAMS.LIMIT,
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
			// FIXME: MAGIC NUMBER 제거
			staleTime: 1000 * 60 * 60 * 24, // 24시간
			gcTime: 1000 * 60 * 60 * 48, // 48시간
		},
	);

	return useSuspenseInfiniteQuery(infiniteOptions);
}
