import type { AdminPost } from '@/fsd/entities/post/model/post';
import { type PostFilters, fetchPosts, usePostsQuery } from '@/fsd/features';
import { postKeys } from '@/fsd/shared';
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

export const postColumns: ColumnDef<AdminPost>[] = [
	{ header: 'ID', accessorKey: 'id' },
	{ header: 'Title', accessorKey: 'title' },
	{ header: 'Date', accessorKey: 'date' },
	{ header: 'Category', accessorKey: 'category' },
	{
		header: 'Tags',
		accessorKey: 'tags',
		cell: ({ getValue }) => (getValue() as string[]).join(', '),
	},
	{ header: 'Description', accessorKey: 'description' },
];

const PAGE_SIZE = 10;

export const usePostTable = () => {
	const navigate = useNavigate();
	const searchParams = useSearch({ from: '/blog/' }) as PostFilters;
	const queryClient = useQueryClient();

	const filters: PostFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'date',
			sortOrder: searchParams.sortOrder || 'desc',

			filter: searchParams.filter,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = usePostsQuery(filters);

	const columns = useMemo(() => postColumns, []);

	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery({
				queryKey: postKeys.list({ ...filters, page: nextPage }),
				queryFn: () => fetchPosts({ ...filters, page: nextPage }),
			});
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<PostFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: data?.posts ?? [],
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
