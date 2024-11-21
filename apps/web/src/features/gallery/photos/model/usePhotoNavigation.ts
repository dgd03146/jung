import { trpc } from '@/fsd/shared';
import type { PhotoQueryResult } from '@jung/shared/types';

import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

type PhotoInfiniteData = InfiniteData<PhotoQueryResult, number | null>;

export function usePhotoNavigation(id: string) {
	const queryClient = useQueryClient();

	const [currentPhotoData] = trpc.photos.getPhotoById.useSuspenseQuery(id, {
		staleTime: 1000 * 60 * 5,
	});

	const cachedData = queryClient.getQueriesData<PhotoInfiniteData>({
		queryKey: [['photos', 'getAllPhotos']],
		exact: false,
	});

	const allPhotos = cachedData.flatMap(
		([, data]) => data?.pages?.flatMap((page) => page.items) ?? [],
	);

	const currentIndex = allPhotos.findIndex(
		(photo) => String(photo.id) === String(id),
	);

	if (allPhotos.length > 0 && currentIndex !== -1) {
		return {
			currentPhoto: allPhotos[currentIndex],
			previousPhoto: currentIndex > 0 ? allPhotos[currentIndex - 1] : null,
			nextPhoto:
				currentIndex < allPhotos.length - 1
					? allPhotos[currentIndex + 1]
					: null,
		};
	}

	return {
		currentPhoto: currentPhotoData,
		previousPhoto: null,
		nextPhoto: null,
	};
}
