import { keepPreviousData, useQuery } from '@tanstack/react-query';
import type { SubscriberFilters } from '@/fsd/features/subscribers/types/subscriberFilters';
import { subscriberKeys } from '@/fsd/shared';
import { fetchSubscribers } from './getSubscribers';

export function useGetSubscribers(filters: SubscriberFilters) {
	return useQuery({
		queryKey: subscriberKeys.list(filters),
		queryFn: () => fetchSubscribers(filters),
		placeholderData: keepPreviousData,
	});
}
