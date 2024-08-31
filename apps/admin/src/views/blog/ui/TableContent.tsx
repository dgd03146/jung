import { Box } from '@jung/design-system/components';
import { usePostTable } from '../model/usePostTable';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

type TableContentProps = {
	globalFilter: string;
	setGlobalFilter: (filter: string) => void;
};

export const TableContent = ({
	globalFilter,
	setGlobalFilter,
}: TableContentProps) => {
	const { table } = usePostTable({ globalFilter, setGlobalFilter });

	return (
		<>
			<Box overflow='auto' width='full' boxShadow='primary' borderRadius='2xl'>
				<Box
					as='table'
					fontSize={{ mobile: 'sm', laptop: 'base' }}
					width='full'
				>
					<TableHeader table={table} />
					<TableBody table={table} />
				</Box>
			</Box>
			<TablePagination table={table} />
		</>
	);
};
