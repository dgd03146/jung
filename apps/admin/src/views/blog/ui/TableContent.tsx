import { Box } from '@jung/design-system/components';
import { usePostTable } from '../model/usePostTable';
import ErrorFallback from './ErrorFallback';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import TableSkeleton from './TableSkeleton';

export const TableContent = () => {
	const { table, isLoading, error, refetch } = usePostTable();

	if (isLoading) return <TableSkeleton />;
	if (error)
		return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

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
