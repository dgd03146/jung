import { useQuery } from '@tanstack/react-query';
import { subscriberKeys } from '@/fsd/shared';
import { fetchSubscriberStats } from './getSubscriberStats';

export function useGetSubscriberStats() {
	return useQuery({
		queryKey: subscriberKeys.stats(),
		queryFn: fetchSubscriberStats,
		staleTime: 5 * 60 * 1000,
	});
}
