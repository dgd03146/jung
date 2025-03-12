import type { PostFilters } from '@/fsd/features';
import { useNavigate, useSearch } from '@tanstack/react-router';

import { type ChangeEvent, useCallback, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const usePostTableFilter = () => {
	const searchParams: PostFilters = useSearch({ from: '/blog/' });
	const navigate = useNavigate({ from: '/blog' });

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

	return {
		filter,
		handleFilterChange,
	};
};
