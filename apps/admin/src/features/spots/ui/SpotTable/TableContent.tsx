import { TablePagination } from '@/fsd/features/blog/ui/PostTable/TablePagination';
import { Box } from '@jung/design-system/components';
import { useSpotTable } from '../../model/useSpotTable';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const TableContent = () => {
	const { table, isLoading, error, refetch } = useSpotTable();

	// if (isLoading) return <TableSkeleton />;
	// if (error)
	//   return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

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
