import { usePostsQuery } from '@/fsd/features';
import {
	type ColumnDef,
	type Getter,
	type SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

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

	const { data: posts, isLoading, error, refetch } = usePostsQuery();

	const columns = useMemo<ColumnDef<BlogPost>[]>(() => postColumns, []);

	const table = useReactTable({
		columns,
		data: posts ?? [],
		state: { sorting, globalFilter, pagination },
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return { table, isLoading, error, refetch };
};
