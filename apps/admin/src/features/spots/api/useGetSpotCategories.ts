import { categoryKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { fetchSpotCategories } from '../services/getCategories';

export function useGetSpotCategories() {
	return useQuery({
		queryKey: categoryKeys.all('spots'),
		queryFn: fetchSpotCategories,
		staleTime: 1000 * 60 * 60,
	});
}
