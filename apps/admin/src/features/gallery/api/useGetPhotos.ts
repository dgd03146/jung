import type { Photo } from '@jung/shared/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { photoKeys } from '@/fsd/shared';
import { fetchPhotos } from '../services/getPhotos';

interface PhotoFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Photo;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export function useGetPhotos(filters: PhotoFilters) {
	return useQuery({
		queryKey: photoKeys.list(filters),
		queryFn: () => fetchPhotos(filters),
		placeholderData: keepPreviousData,
		staleTime: 1000 * 60 * 60 * 24, // 24시간
		gcTime: 1000 * 60 * 60 * 24 * 7, // 7일
	});
}
