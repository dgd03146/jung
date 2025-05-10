import { useTRPC } from '@/fsd/app';
import { PHOTO_DEFAULTS } from '@/fsd/entities/photo';
import type { Sort } from '@/fsd/shared';
import type {
	AdjacentPhotosData,
	Photo,
	PhotoQueryParams,
	PhotoQueryResult,
} from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

interface UseInitialAdjacentPhotosParams {
	photoId: string;
	sort?: Sort;
	collectionId?: string;
}

export function useInitialAdjacentPhotos({
	photoId,
	sort,
	collectionId,
}: UseInitialAdjacentPhotosParams): AdjacentPhotosData | undefined {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const currentListParams: PhotoQueryParams = {
		sort,
		q: collectionId,
	};

	const photosListQueryOptions = trpc.photos.getAllPhotos.infiniteQueryOptions({
		limit: PHOTO_DEFAULTS.LIMIT,
		sort: currentListParams.sort,
		q: currentListParams.q,
	});
	const photosListQueryKey = photosListQueryOptions.queryKey;

	const cachedPhotosListData =
		queryClient.getQueryData<InfiniteData<PhotoQueryResult>>(
			photosListQueryKey,
		);

	if (cachedPhotosListData) {
		const allPhotos: Photo[] = cachedPhotosListData.pages.flatMap(
			(page) => page.items,
		);
		const currentIndex = allPhotos.findIndex((p) => p.id === photoId);

		if (currentIndex !== -1) {
			const previous = allPhotos[currentIndex - 1] ?? null;
			const next = allPhotos[currentIndex + 1] ?? null;
			return { previous, next };
		}
	}
	return undefined;
}
