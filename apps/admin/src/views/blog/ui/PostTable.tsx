import { usePostsQuery } from '@/fsd/features/blog/usePostsQuery';
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
	index: number;
}

const fallbackData: BlogPost[] = [];

const PostTable = () => {
	const results = usePostsQuery();
	const data = results[0] ?? fallbackData;

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

	// const [data] = useState(
	// 	() =>
	// 		[
	// 			{
	// 				id: '1',
	// 				date: '2024-01-15',
	// 				tags: ['React', 'JavaScript'],
	// 				title: 'React 18의 새로운 기능',
	// 				description: 'React 18에서 추가된 주요 기능들에 대한 개요와 사용법',
	// 				link: 'https://example.com/react-18-features',
	// 				index: 1,
	// 			},
	// 			{
	// 				id: '2',
	// 				date: '2024-01-15',
	// 				tags: ['React', 'JavaScript'],
	// 				title: 'React 18의 새로운 기능',
	// 				description: 'React 18에서 추가된 주요 기능들에 대한 개요와 사용법',
	// 				link: 'https://example.com/react-18-features',
	// 				index: 1,
	// 			},
	// 			{
	// 				id: '3',
	// 				date: '2024-01-15',
	// 				tags: ['React', 'JavaScript'],
	// 				title: 'React 18의 새로운 기능',
	// 				description: 'React 18에서 추가된 주요 기능들에 대한 개요와 사용법',
	// 				link: 'https://example.com/react-18-features',
	// 				index: 1,
	// 			},
	// 			{
	// 				id: '3',
	// 				date: '2024-01-15',
	// 				tags: ['React', 'JavaScript'],
	// 				title: 'React 18의 새로운 기능',
	// 				description: 'React 18에서 추가된 주요 기능들에 대한 개요와 사용법',
	// 				link: 'https://example.com/react-18-features',
	// 				index: 1,
	// 			},
	// 			{
	// 				id: '3',
	// 				date: '2024-01-15',
	// 				tags: ['React', 'JavaScript'],
	// 				title: 'React 18의 새로운 기능',
	// 				description: 'React 18에서 추가된 주요 기능들에 대한 개요와 사용법',
	// 				link: 'https://example.com/react-18-features',
	// 				index: 1,
	// 			},
	// 			// Additional blog post data...
	// 		] ?? fallbackData,
	// );

	const [sorting, setSorting] = useState<SortingState>([]);
	const [globalFilter, setGlobalFilter] = useState('');

	const table = useReactTable({
		columns,
		data,
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
