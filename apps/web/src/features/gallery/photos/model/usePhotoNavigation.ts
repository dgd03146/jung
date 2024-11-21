import type { PhotoQueryResult } from '@jung/shared/types';

import { type InfiniteData, useQueryClient } from '@tanstack/react-query';
import { useGetAdjacentPhotos, useGetPhotoById } from '../api';

type PhotoInfiniteData = InfiniteData<PhotoQueryResult, number | null>;

export function usePhotoNavigation(id: string) {
	const queryClient = useQueryClient();

	const [currentPhotoData] = useGetPhotoById(id);
	const [adjacentPhotos] = useGetAdjacentPhotos(id);

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

			previousPhoto:
				currentIndex < allPhotos.length - 1
					? allPhotos[currentIndex + 1]
					: null,
			nextPhoto: currentIndex > 0 ? allPhotos[currentIndex - 1] : null,
		};
	}

	return {
		currentPhoto: currentPhotoData,
		previousPhoto: adjacentPhotos.previous,
		nextPhoto: adjacentPhotos.next,
	};
}
