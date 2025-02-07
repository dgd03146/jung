import type { PhotoQueryResult } from '@jung/shared/types';

import { useAdjacentPhotosQuery } from '@/fsd/entities/photo';
import { type InfiniteData, useQueryClient } from '@tanstack/react-query';

type PhotoInfiniteData = InfiniteData<PhotoQueryResult, number | null>;

interface UseAdjacentPhotosProps {
	id: string;
	isModal?: boolean;
}

export function useAdjacentPhotos({ id, isModal }: UseAdjacentPhotosProps) {
	const queryClient = useQueryClient();

	if (isModal) {
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

		const currentPhoto = allPhotos[currentIndex];

		if (allPhotos.length > 0 && currentIndex !== -1 && currentPhoto) {
			return {
				currentPhoto,
				previousPhoto:
					currentIndex < allPhotos.length - 1
						? allPhotos[currentIndex + 1]
						: null,
				nextPhoto: currentIndex > 0 ? allPhotos[currentIndex - 1] : null,
			};
		}
	}

	const [adjacentPhotos] = isModal
		? useAdjacentPhotosQuery(id)
		: [{ previous: null, next: null }];

	return {
		previousPhoto: isModal ? adjacentPhotos.previous : null,
		nextPhoto: isModal ? adjacentPhotos.next : null,
	};
}
