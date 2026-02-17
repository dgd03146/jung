import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import type { SubscriberFilters } from '../types/subscriberFilters';
import { fetchSubscriberStats } from './getSubscriberStats';
import { fetchSubscribers } from './getSubscribers';

const STATS_STALE_TIME_MS = 5 * 60_000;

export const subscriberQueryOptions = {
	all: () => ['subscribers'] as const,
	lists: () => [...subscriberQueryOptions.all(), 'list'] as const,
	list: (filters: SubscriberFilters) =>
		queryOptions({
			queryKey: [...subscriberQueryOptions.lists(), filters] as const,
			queryFn: () => fetchSubscribers(filters),
			placeholderData: keepPreviousData,
		}),
	stats: () =>
		queryOptions({
			queryKey: [...subscriberQueryOptions.all(), 'stats'] as const,
			queryFn: fetchSubscriberStats,
			staleTime: STATS_STALE_TIME_MS,
		}),
};
