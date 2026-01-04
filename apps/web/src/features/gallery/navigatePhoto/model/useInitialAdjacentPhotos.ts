import type {
	AdjacentPhotosData,
	Photo,
	PhotoQueryParams,
	PhotoQueryResult,
} from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';
import { PHOTO_DEFAULTS } from '@/fsd/entities/gallery';
import type { Sort } from '@/fsd/shared';

interface UseInitialAdjacentPhotosParams {
	photoId: string;
	sort?: Sort;
	collectionId?: string;
}

/**
 * 이미 갤러리에서 로드된 데이터를 활용하여 인접 사진 정보를 제공하는 훅
 *
 * 이 훅은 네트워크 요청을 하지 않고 캐시된 데이터만 활용하므로 매우 빠르게 동작합니다.
 * NavigatePhotoButtons 컴포넌트가 처음 렌더링될 때 이 데이터를 initialData로 사용하여
 * 사용자가 버튼을 즉시 볼 수 있게 합니다.
 */
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

	const photosListQueryOptions = trpc.gallery.getAllPhotos.infiniteQueryOptions(
		{
			limit: PHOTO_DEFAULTS.LIMIT,
			sort: currentListParams.sort,
			q: currentListParams.q,
		},
	);
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
