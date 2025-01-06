import { usePostTable } from '@/fsd/features/blog/model';
import { TableSkeleton } from '@/fsd/shared/ui';
import { Box } from '@jung/design-system/components';
import ErrorFallback from '../ErrorFallback';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

export const TableContent = () => {
	const { table, isLoading, error, refetch } = usePostTable();

	if (isLoading) return <TableSkeleton />;
	if (error)
		return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

	return (
		<>
			<Box overflow='auto' width='full' boxShadow='primary' borderRadius='lg'>
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
