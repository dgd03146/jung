import type { Photo } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import { useTRPC } from '@/fsd/app';
import type { Sort } from '@/fsd/shared';

interface UseAdjacentPhotosPrefetchParams {
	photoId: string;
	previousPhoto: Photo | null;
	nextPhoto: Photo | null;
	sort?: Sort;
	collectionId?: string;
}

export function useAdjacentPhotosPrefetch({
	photoId,
	previousPhoto,
	nextPhoto,
	sort,
	collectionId,
}: UseAdjacentPhotosPrefetchParams) {
	const queryClient = useQueryClient();
	const trpc = useTRPC();

	const prefetchPhotoData = useCallback(
		(photo: Photo) => {
			if (!photo || photo.id === photoId) return;

			try {
				const photoIdStr = String(photo.id);
				const collectionIdStr = collectionId ? String(collectionId) : undefined;

				const photoDetailOptions =
					trpc.gallery.getPhotoById.queryOptions(photoIdStr);
				queryClient.prefetchQuery(photoDetailOptions);

				const adjacentInput = {
					id: photoIdStr,
					sort,
					collectionId: collectionIdStr,
				};

				const adjacentOptions =
					trpc.gallery.getAdjacentPhotos.queryOptions(adjacentInput);
				queryClient.prefetchQuery(adjacentOptions);
			} catch (error) {
				console.error('Failed to prefetch photo data:', error);
				console.error(
					'Error details:',
					error instanceof Error ? error.message : String(error),
				);
			}
		},
		[queryClient, trpc, photoId, sort, collectionId],
	);

	useEffect(() => {
		if (!previousPhoto && !nextPhoto) return;

		const photosToPreload = [previousPhoto, nextPhoto].filter(
			Boolean,
		) as Photo[];

		photosToPreload.forEach(prefetchPhotoData);
	}, [previousPhoto, nextPhoto, prefetchPhotoData]);
}
