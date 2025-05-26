import { useTRPC } from '@/fsd/app';
import type { Sort } from '@/fsd/shared';
import type { Photo } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

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
			if (photo.id === photoId) return;

			queryClient.prefetchQuery({
				queryKey: trpc.photos.getPhotoById.queryOptions(photo.id).queryKey,
				queryFn: trpc.photos.getPhotoById.queryOptions(photo.id).queryFn,
				staleTime: 5 * 60 * 1000,
			});

			const adjacentQueryKey = trpc.photos.getAdjacentPhotos.queryOptions({
				id: photo.id,
				sort,
				collectionId,
			}).queryKey;

			queryClient.prefetchQuery({
				queryKey: adjacentQueryKey,
				queryFn: trpc.photos.getAdjacentPhotos.queryOptions({
					id: photo.id,
					sort,
					collectionId,
				}).queryFn,
				staleTime: 5 * 60 * 1000,
			});

			const existingData = queryClient.getQueryData(adjacentQueryKey);

			if (!existingData) {
				if (photo.id === previousPhoto?.id) {
					queryClient.setQueryData(adjacentQueryKey, {
						previous: null,
						next: { ...photo, id: photoId },
					});
				} else if (photo.id === nextPhoto?.id) {
					queryClient.setQueryData(adjacentQueryKey, {
						previous: { ...photo, id: photoId },
						next: null,
					});
				}
			} else {
				if (photo.id === previousPhoto?.id) {
					queryClient.setQueryData(adjacentQueryKey, {
						...existingData,
						next: { ...photo, id: photoId },
					});
				} else if (photo.id === nextPhoto?.id) {
					queryClient.setQueryData(adjacentQueryKey, {
						...existingData,
						previous: { ...photo, id: photoId },
					});
				}
			}
		},
		[queryClient, trpc, photoId, previousPhoto, nextPhoto, sort, collectionId],
	);

	useEffect(() => {
		if (!previousPhoto && !nextPhoto) return;

		const photosToPreload = [previousPhoto, nextPhoto].filter(
			Boolean,
		) as Photo[];

		photosToPreload.forEach(prefetchPhotoData);
	}, [previousPhoto, nextPhoto, prefetchPhotoData]);
}
