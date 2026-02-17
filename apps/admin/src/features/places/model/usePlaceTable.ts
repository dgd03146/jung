import type { Place } from '@jung/shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
	type ColumnDef,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	type Updater,
	useReactTable,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo } from 'react';
import { placeQueryOptions } from '../api/placeQueryOptions';
import type { PlaceFilters } from '../services/getPlaces';

const PAGE_SIZE = 10;

export const usePlaceTable = () => {
	const navigate = useNavigate({ from: '/places/' });
	const searchParams = useSearch({ from: '/places/' }) as PlaceFilters;
	const queryClient = useQueryClient();

	const filters: PlaceFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
			category: searchParams.category,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = useQuery(
		placeQueryOptions.list(filters),
	);

	const columns: ColumnDef<Place>[] = useMemo(
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
			queryClient.prefetchQuery(
				placeQueryOptions.list({ ...filters, page: nextPage }),
			);
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<PlaceFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: data?.places ?? [],
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
				sortField: sort?.id as string,
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
		totalCount: data?.totalCount ?? 0,
	};
};
