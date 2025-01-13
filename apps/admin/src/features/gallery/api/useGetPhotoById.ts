import { photoKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { getPhotoById } from '../services/getPhotoById';

export const useGetPhotoById = (id: string) => {
	return useQuery({
		queryKey: photoKeys.detail(id),
		queryFn: () => getPhotoById(id),
		enabled: !!id,
	});
};
