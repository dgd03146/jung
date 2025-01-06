import { photoKeys } from '@/fsd/shared';
import type { Photo } from '@jung/shared/types';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
	type ColumnDef,
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
import { useGetPhotos } from '../api/useGetPhotos';
import { fetchPhotos } from '../services/getPhotos';

interface PhotoFilters {
	page: number;
	pageSize: number;
	sortField?: keyof Photo;
	sortOrder?: 'asc' | 'desc';
	filter?: string;
}

export const photoColumns: ColumnDef<Photo>[] = [
	{ header: 'Title', accessorKey: 'title' },
	{ header: 'Image', accessorKey: 'image_url' },
	{ header: 'Description', accessorKey: 'description' },
	{ header: 'Tags', accessorKey: 'tags' },
	{ header: 'Views', accessorKey: 'views' },
	{ header: 'Likes', accessorKey: 'likes' },
	{ header: 'Created At', accessorKey: 'created_at' },
];

const PAGE_SIZE = 10;

export const usePhotoTable = () => {
	const navigate = useNavigate();
	const searchParams = useSearch({ from: '/gallery/photos/' }) as PhotoFilters;
	const queryClient = useQueryClient();

	const filters: PhotoFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = useGetPhotos(filters);

	const columns = useMemo(() => photoColumns, []);

	// Prefetch next page
	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery({
				queryKey: photoKeys.list({ ...filters, page: nextPage }),
				queryFn: () => fetchPhotos({ ...filters, page: nextPage }),
			});
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<PhotoFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: data?.photos ?? [],
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
				sortField: sort?.id as keyof Photo,
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

	return { table, isLoading, error, refetch };
};
