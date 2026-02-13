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
import type { SubscriberFilters } from '@/fsd/features/subscribers/types/subscriberFilters';
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

	const table = useReactTable({
		columns,
		data: data?.subscribers ?? [],
		state: {
			sorting: filters.sortField
				? [{ id: filters.sortField, desc: filters.sortOrder === 'desc' }]
				: [],
			globalFilter: filters.filter,
			pagination: { pageIndex: filters.page, pageSize: filters.pageSize },
		},
		onPaginationChange: (updater: Updater<PaginationState>) => {
			const newPagination =
				typeof updater === 'function'
					? updater({ pageIndex: filters.page, pageSize: filters.pageSize })
					: updater;
			updateSearchParams({
				page: newPagination.pageIndex,
				pageSize: newPagination.pageSize,
			});
		},
		onSortingChange: (updater: Updater<SortingState>) => {
			const newSorting =
				typeof updater === 'function'
					? updater(
							filters.sortField
								? [
										{
											id: filters.sortField,
											desc: filters.sortOrder === 'desc',
										},
									]
								: [],
						)
					: updater;
			const sort = newSorting[0];
			updateSearchParams({
				sortField: sort?.id,
				sortOrder: sort?.desc ? 'desc' : 'asc',
			});
		},
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
