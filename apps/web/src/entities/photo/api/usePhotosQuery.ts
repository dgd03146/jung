import { trpc } from '@/fsd/shared';
import type { PhotoQueryParams } from '@jung/shared/types';
import { PHOTO_PARAMS } from '../config/constants';

export function usePhotosQuery(params: PhotoQueryParams) {
	const { sort, q } = params;

	return trpc.photos.getAllPhotos.useSuspenseInfiniteQuery(
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
}
