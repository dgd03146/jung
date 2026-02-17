import { queryOptions } from '@tanstack/react-query';
import { getCollections } from '../services/getCollections';
import { getPhotoById } from '../services/getPhotoById';
import type { PhotoFilters } from '../services/getPhotos';
import { fetchPhotos } from '../services/getPhotos';
import { getPhotosByCollectionId } from '../services/getPhotosByCollectionId';

export const photoQueryOptions = {
	all: () => ['photos'] as const,
	lists: () => [...photoQueryOptions.all(), 'list'] as const,
	list: (filters: PhotoFilters) =>
		queryOptions({
			queryKey: [...photoQueryOptions.lists(), filters] as const,
			queryFn: () => fetchPhotos(filters),
		}),
	details: () => [...photoQueryOptions.all(), 'detail'] as const,
	detail: (id: string) =>
		queryOptions({
			queryKey: [...photoQueryOptions.details(), id] as const,
			queryFn: () => getPhotoById(id),
			enabled: !!id,
		}),
	byCollection: (collectionId: string, page?: number, limit?: number) =>
		queryOptions({
			queryKey: [
				...photoQueryOptions.all(),
				'collection',
				collectionId,
				page,
				limit,
			] as const,
			queryFn: () => getPhotosByCollectionId({ collectionId, page, limit }),
		}),
};

export const collectionQueryOptions = {
	all: () => ['collections'] as const,
	lists: () => [...collectionQueryOptions.all(), 'list'] as const,
	list: () =>
		queryOptions({
			queryKey: [...collectionQueryOptions.lists()] as const,
			queryFn: getCollections,
		}),
};
