import { useQueryClient } from '@tanstack/react-query';
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
import { articleKeys } from '@/fsd/shared';
import { fetchArticles, useGetArticles } from '../api';
import type { Article, ArticleFilters } from '../types';

export const articleColumns: ColumnDef<Article>[] = [
	{ header: 'Title', accessorKey: 'title' },
	{ header: 'Category', accessorKey: 'category' },
	{ header: 'Status', accessorKey: 'status' },
	{ header: 'Summary', accessorKey: 'summary' },
	{ header: 'Published', accessorKey: 'published_at' },
	{ header: 'Created', accessorKey: 'created_at' },
];

const PAGE_SIZE = 10;

export const useArticleTable = () => {
	const navigate = useNavigate({ from: '/articles' });
	const searchParams = useSearch({ from: '/articles/' }) as ArticleFilters;
	const queryClient = useQueryClient();

	const filters: ArticleFilters = useMemo(
		() => ({
			page: Number(searchParams.page) || 0,
			pageSize: Number(searchParams.pageSize) || PAGE_SIZE,
			sortField: searchParams.sortField || 'created_at',
			sortOrder: searchParams.sortOrder || 'desc',
			filter: searchParams.filter,
			status: searchParams.status,
			category: searchParams.category,
		}),
		[searchParams],
	);

	const { data, isLoading, error, refetch } = useGetArticles(filters);

	const columns = useMemo(() => articleColumns, []);

	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = filters.page + 1;
			queryClient.prefetchQuery({
				queryKey: articleKeys.list({ ...filters, page: nextPage }),
				queryFn: () => fetchArticles({ ...filters, page: nextPage }),
			});
		}
	}, [data?.hasMore, filters, queryClient]);

	const updateSearchParams = useCallback(
		(newParams: Partial<ArticleFilters>) => {
			navigate({ search: (prev) => ({ ...prev, ...newParams }) });
		},
		[navigate],
	);

	const table = useReactTable({
		columns,
		data: data?.articles ?? [],
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

	return {
		table,
		isLoading,
		error,
		refetch,
		totalCount: data?.totalCount ?? 0,
	};
};
