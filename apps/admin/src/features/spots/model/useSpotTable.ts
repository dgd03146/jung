import { spotKeys } from '@/fsd/shared';
import type { Spot } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
	type PaginationState,
	type SortingState,
	type Updater,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo } from 'react';
import { useGetSpots } from '../api/useGetSpots';
import { fetchSpots } from '../services/getSpots';

export interface SpotFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Spot;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

const PAGE_SIZE = 10;

export const useSpotTable = () => {
	const navigate = useNavigate({ from: '/spots' });
	const searchParams = useSearch({ from: '/spots/' }) as SpotFilters;
	const queryClient = useQueryClient();

	const filters: SpotFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = useGetSpots(filters);

	const columns = useMemo(
		() => [
			{
				header: 'Thumbnails',
				accessorKey: 'photos',
				size: 100,
			},
			{
				header: 'Title',
				accessorKey: 'title',
				size: 200,
			},
			{
				header: 'Category',
				accessorKey: 'category',
				size: 150,
			},
			{
				header: 'Address',
				accessorKey: 'address',
				size: 300,
			},
			{
				header: 'Likes',
				accessorKey: 'likes',
				size: 100,
			},
			{
				header: 'Created At',
				accessorKey: 'created_at',
				size: 150,
			},
		],
		[],
	);

	// Prefetch next page
	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery({
				queryKey: spotKeys.list({ ...filters, page: nextPage }),
				queryFn: () => fetchSpots({ ...filters, page: nextPage }),
			});
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<SpotFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: data?.spots ?? [],
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
				sortField: sort?.id as keyof Spot,
				sortOrder: sort?.desc ? 'desc' : 'asc',
			});
		},
		onGlobalFilterChange: (filter: string) => {
			updateSearchParams({ filter });
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
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
	};
};
