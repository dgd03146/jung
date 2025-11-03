import { placeKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { getPlaceById } from '../services/getPlaceById';

export function useGetPlaceById(id: string) {
	return useQuery({
		queryKey: placeKeys.detail(id),
		queryFn: () => getPlaceById(id),
		enabled: !!id,
	});
}
