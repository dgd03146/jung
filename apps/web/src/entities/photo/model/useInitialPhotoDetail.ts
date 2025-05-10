import { useTRPC } from '@/fsd/app';
import { PHOTO_DEFAULTS } from '@/fsd/entities/photo';
import type { Sort } from '@/fsd/shared';
import type {
	Photo,
	PhotoQueryParams,
	PhotoQueryResult,
} from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';

interface UseInitialPhotoDetailParams {
	photoId: string;
	sort?: Sort;
	collectionId?: string;
}

export function useInitialPhotoDetail({
	photoId,
	sort,
	collectionId,
}: UseInitialPhotoDetailParams): Photo | undefined {
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
		for (const page of cachedPhotosListData.pages) {
			const foundPhoto = page.items.find((p: Photo) => p.id === photoId);
			if (foundPhoto) {
				return foundPhoto;
			}
		}
	}
	return undefined;
}
