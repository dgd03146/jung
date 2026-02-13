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

	const debouncedNavigate = useDebouncedCallback((value: string) => {
		navigate({
			search: (prev) => ({ ...prev, filter: value || '', page: 0 }),
		});
	}, 300);

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

	const hasActiveFilters = !!(
		searchParams.filter ||
		searchParams.category ||
		searchParams.status
	);

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
