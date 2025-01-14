import { spotKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { getSpotById } from '../services/getSpotById';

export function useGetSpotById(id: string) {
	return useQuery({
		queryKey: spotKeys.detail(id),
		queryFn: () => getSpotById(id),
		enabled: !!id,
	});
}
