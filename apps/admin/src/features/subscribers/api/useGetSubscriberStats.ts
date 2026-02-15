import { queryOptions, useQuery } from '@tanstack/react-query';
import { subscriberKeys } from '@/fsd/shared';
import { fetchSubscriberStats } from './getSubscriberStats';

const STATS_STALE_TIME_MS = 5 * 60_000;

export const subscriberStatsQueryOptions = () =>
	queryOptions({
		queryKey: subscriberKeys.stats(),
		queryFn: fetchSubscriberStats,
		staleTime: STATS_STALE_TIME_MS,
	});

export function useGetSubscriberStats() {
	return useQuery(subscriberStatsQueryOptions());
}
