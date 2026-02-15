import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
	type ColumnDef,
	getCoreRowModel,
	type PaginationState,
	type SortingState,
	type Updater,
	useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo } from 'react';
import type { Subscriber } from '@/fsd/entities/subscriber';
import type {
	SubscriberFilters,
	SubscriberSortField,
} from '@/fsd/features/subscribers/types/subscriberFilters';
import {
	subscriberListQueryOptions,
	useGetSubscribers,
} from '../api/useGetSubscribers';

export const subscriberColumns: ColumnDef<Subscriber>[] = [
	{ header: 'Email', accessorKey: 'email' },
	{ header: 'Category', accessorKey: 'category' },
	{ header: 'Status', accessorKey: 'is_active' },
	{ header: 'Created At', accessorKey: 'created_at' },
];

const PAGE_SIZE = 10;

export const useSubscriberTable = () => {
	const navigate = useNavigate({ from: '/subscribers/' });
	const searchParams = useSearch({
		from: '/subscribers/',
	}) as SubscriberFilters;
	const queryClient = useQueryClient();

	const filters: SubscriberFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
			category: searchParams.category,
			status: searchParams.status,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = useGetSubscribers(filters);

	const columns = subscriberColumns;

	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery(
				subscriberListQueryOptions({ ...filters, page: nextPage }),
			);
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<SubscriberFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const currentPagination: PaginationState = useMemo(
		() => ({
			pageIndex: filters.page,
			pageSize: filters.pageSize,
		}),
		[filters.page, filters.pageSize],
	);

	const currentSorting: SortingState = useMemo(
		() =>
			filters.sortField
				? [{ id: filters.sortField, desc: filters.sortOrder === 'desc' }]
				: [],
		[filters.sortField, filters.sortOrder],
	);

	const handlePaginationChange = useCallback(
		(updater: Updater<PaginationState>) => {
			const next =
				typeof updater === 'function' ? updater(currentPagination) : updater;
			updateSearchParams({ page: next.pageIndex, pageSize: next.pageSize });
		},
		[currentPagination, updateSearchParams],
	);

	const handleSortingChange = useCallback(
		(updater: Updater<SortingState>) => {
			const next =
				typeof updater === 'function' ? updater(currentSorting) : updater;
			const sort = next[0];
			updateSearchParams({
				sortField: sort ? (sort.id as SubscriberSortField) : undefined,
				sortOrder: sort ? (sort.desc ? 'desc' : 'asc') : undefined,
			});
		},
		[currentSorting, updateSearchParams],
	);

	const table = useReactTable({
		columns,
		data: data?.subscribers ?? [],
		state: {
			sorting: currentSorting,
			globalFilter: filters.filter,
			pagination: currentPagination,
		},
		onPaginationChange: handlePaginationChange,
		onSortingChange: handleSortingChange,
		onGlobalFilterChange: (filter: string) => {
			updateSearchParams({ filter });
		},
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
		pageCount: data?.totalPages ?? -1,
	});

	return {
		table,
		isLoading,
		error,
		refetch,
		totalCount: data?.totalCount ?? 0,
	};
};
