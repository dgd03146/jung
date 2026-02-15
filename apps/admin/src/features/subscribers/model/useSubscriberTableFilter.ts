import { useNavigate, useSearch } from '@tanstack/react-router';
import { type ChangeEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { SubscriberFilters } from '@/fsd/features/subscribers/types/subscriberFilters';

export const useSubscriberTableFilter = () => {
	const searchParams: SubscriberFilters = useSearch({
		from: '/subscribers/',
	});
	const navigate = useNavigate({ from: '/subscribers/' });

	const [filter, setFilter] = useState(searchParams.filter ?? '');

	const SEARCH_DEBOUNCE_MS = 300;

	const debouncedNavigate = useDebouncedCallback((value: string) => {
		navigate({
			search: (prev) => ({ ...prev, filter: value || undefined, page: 0 }),
		});
	}, SEARCH_DEBOUNCE_MS);

	const handleFilterChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setFilter(newValue);
			debouncedNavigate(newValue);
		},
		[debouncedNavigate],
	);

	const handleCategoryChange = useCallback(
		(value: string) => {
			navigate({
				search: (prev) => ({
					...prev,
					category: value || undefined,
					page: 0,
				}),
			});
		},
		[navigate],
	);

	const handleStatusChange = useCallback(
		(value: string) => {
			navigate({
				search: (prev) => ({
					...prev,
					status: value || undefined,
					page: 0,
				}),
			});
		},
		[navigate],
	);

	const clearFilters = useCallback(() => {
		setFilter('');
		navigate({
			search: (prev) => ({
				...prev,
				filter: undefined,
				category: undefined,
				status: undefined,
				page: 0,
			}),
		});
	}, [navigate]);

	const hasSearchFilter = !!searchParams.filter;
	const hasCategoryFilter = !!searchParams.category;
	const hasStatusFilter = !!searchParams.status;
	const hasActiveFilters =
		hasSearchFilter || hasCategoryFilter || hasStatusFilter;

	return {
		filter,
		category: searchParams.category ?? '',
		status: searchParams.status ?? '',
		handleFilterChange,
		handleCategoryChange,
		handleStatusChange,
		clearFilters,
		hasActiveFilters,
	};
};
