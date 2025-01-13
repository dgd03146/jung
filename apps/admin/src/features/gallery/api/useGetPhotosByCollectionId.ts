import { photoKeys } from '@/fsd/shared/config/queryKey';
import type { Photo } from '@jung/shared/types';
import { useQuery } from '@tanstack/react-query';
import { getPhotosByCollectionId } from '../services/getPhotosByCollectionId';

interface UseGetPhotosByCollectionIdParams {
	collectionId: string;
	page?: number;
	limit?: number;
	enabled?: boolean;
}

interface UseGetPhotosByCollectionIdReturn {
	photos: Photo[];
	total: number;
	collectionTitle: string;
	isLoading: boolean;
	error: Error | null;
}

export const useGetPhotosByCollectionId = ({
	collectionId,
	page = 1,
	limit = 20,
	enabled = true,
}: UseGetPhotosByCollectionIdParams): UseGetPhotosByCollectionIdReturn => {
	const { data, isLoading, error } = useQuery({
		queryKey: photoKeys.byCollection(collectionId, page, limit),
		queryFn: () => getPhotosByCollectionId({ collectionId, page, limit }),
		enabled: enabled && Boolean(collectionId),
	});

	return {
		photos: data?.items ?? [],
		total: data?.total ?? 0,
		collectionTitle: data?.collectionTitle ?? '',
		isLoading,
		error: error as Error | null,
	};
};
