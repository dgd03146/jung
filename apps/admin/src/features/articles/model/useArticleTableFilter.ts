import { useNavigate, useSearch } from '@tanstack/react-router';
import { type ChangeEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import type { ArticleFilters } from '../types';

export const useArticleTableFilter = () => {
	const searchParams: ArticleFilters = useSearch({ from: '/articles/' });
	const navigate = useNavigate({ from: '/articles' });

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
				status: undefined,
				category: undefined,
				page: 0,
			}),
		});
	}, [navigate]);

	const hasActiveFilters = !!(
		searchParams.filter ||
		searchParams.status ||
		searchParams.category
	);

	return {
		filter,
		status: searchParams.status ?? '',
		category: searchParams.category ?? '',
		handleFilterChange,
		handleStatusChange,
		handleCategoryChange,
		clearFilters,
		hasActiveFilters,
	};
};
