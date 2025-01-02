import { TableHeader } from '@/fsd/features/blog/ui/PostTable/TableHeader';
import { TablePagination } from '@/fsd/features/blog/ui/PostTable/TablePagination';
import { usePhotoTable } from '@/fsd/features/gallery/model';
import { Box } from '@jung/design-system/components';
import { TableBody } from './TableBody';

export const TableContent = () => {
	const { table, isLoading, error, refetch } = usePhotoTable();

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
