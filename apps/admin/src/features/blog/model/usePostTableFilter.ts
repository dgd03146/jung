import { useNavigate, useSearch } from '@tanstack/react-router';
import { type ChangeEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { PostFilters } from '@/fsd/features';

export const usePostTableFilter = () => {
	const searchParams: PostFilters = useSearch({ from: '/blog/' });
	const navigate = useNavigate({ from: '/blog/' });

	const [filter, setFilter] = useState(searchParams.filter ?? '');

	const debouncedNavigate = useDebouncedCallback((value: string) => {
		navigate({ search: (prev) => ({ ...prev, filter: value || '', page: 0 }) });
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

	const clearFilters = useCallback(() => {
		setFilter('');
		navigate({
			search: (prev) => ({
				...prev,
				filter: undefined,
				category: undefined,
				page: 0,
			}),
		});
	}, [navigate]);

	const hasActiveFilters = !!(searchParams.filter || searchParams.category);

	return {
		filter,
		category: searchParams.category ?? '',
		handleFilterChange,
		handleCategoryChange,
		clearFilters,
		hasActiveFilters,
	};
};
