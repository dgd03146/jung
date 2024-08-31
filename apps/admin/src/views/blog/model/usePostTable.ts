import { fetchPosts, usePostsQuery } from '@/fsd/features';
import { useQueryClient } from '@tanstack/react-query';
import {
	type ColumnDef,
	type Getter,
	type SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useEffect, useMemo, useState } from 'react';

// FIXME: 타입 공용으로 빼기
interface BlogPost {
	id: string;
	date: string;
	tags: string[];
	title: string;
	description: string;
	link: string;
}

interface UsePostTableProps {
	globalFilter: string;
	setGlobalFilter: (filter: string) => void;
}

export const postColumns = [
	{ header: 'Title', accessorKey: 'title' },
	{ header: 'Date', accessorKey: 'date' },
	{
		header: 'Tags',
		accessorKey: 'tags',
		cell: ({ getValue }: { getValue: Getter<unknown> }) =>
			(getValue() as string[]).join(', '),
	},
	{ header: 'Description', accessorKey: 'description' },
];

export const usePostTable = ({
	globalFilter,
	setGlobalFilter,
}: UsePostTableProps) => {
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [sorting, setSorting] = useState<SortingState>([]);

	const queryClient = useQueryClient();

	const { data, isLoading, error, refetch } = usePostsQuery(
		pagination.pageIndex,
		pagination.pageSize,
	);

	useEffect(() => {
		if (data?.hasMore) {
			const nextPage = pagination.pageIndex + 1;
			queryClient.prefetchQuery({
				queryKey: ['posts', nextPage],
				queryFn: () => fetchPosts(nextPage, pagination.pageSize),
			});
		}
	}, [pagination.pageIndex, pagination.pageSize, data?.hasMore, queryClient]);

	const columns = useMemo<ColumnDef<BlogPost>[]>(() => postColumns, []);

	const table = useReactTable({
		columns,
		data: data?.posts ?? [],
		state: { sorting, globalFilter, pagination },
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),

		getSortedRowModel: getSortedRowModel(),
		manualPagination: true,
		pageCount: data?.totalPages ?? -1,
	});

	return { table, isLoading, error, refetch };
};

// FIXME: 추가
