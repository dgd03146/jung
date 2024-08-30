import { usePostsQuery } from '@/fsd/features';
import {
	Box,
	Button,
	Container,
	Flex,
	Input,
} from '@jung/design-system/components';
import {
	type ColumnDef,
	type SortingState,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
// PostTable.tsx
import { useMemo, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

interface BlogPost {
	id: string;
	date: string;
	tags: string[];
	title: string;
	description: string;
	link: string;
}

const fallbackData: BlogPost[] = [];

const PostTable = () => {
	const { data: posts } = usePostsQuery();

	const columns = useMemo<ColumnDef<BlogPost>[]>(
		() => [
			{ header: 'Title', accessorKey: 'title' },
			{ header: 'Date', accessorKey: 'date' },
			{
				header: 'Tags',
				accessorKey: 'tags',
				cell: ({ getValue }) => (getValue() as string[]).join(', '),
			},
			{ header: 'Description', accessorKey: 'description' },
		],
		[],
	);

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		columns,
		data: posts ?? fallbackData,
		state: { sorting, globalFilter },
		onSortingChange: setSorting,
		onGlobalFilterChange: setGlobalFilter,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
	});

	return (
		<Container marginTop='1'>
			<Flex justifyContent='space-between' marginBottom='6'>
				<Input
					boxShadow='primary'
					border='none'
					rounded
					value={globalFilter ?? ''}
					onChange={(e) => setGlobalFilter(e.target.value)}
					placeholder='search...'
				/>
				<Button boxShadow='primary' border='none' rounded>
					<FaPlus /> new
				</Button>
			</Flex>
			<Box overflow='auto' width='full' boxShadow='primary' borderRadius='2xl'>
				<Box
					as='table'
					fontSize={{ mobile: 'sm', laptop: 'base' }}
					width='full'
				>
					<TableHeader<BlogPost> table={table} />
					<TableBody<BlogPost> table={table} />
				</Box>
			</Box>
			<TablePagination<BlogPost> table={table} />
		</Container>
	);
};

export default PostTable;
