import { Box } from '@jung/design-system/components';
import ErrorFallback from '@/fsd/features/blog/ui/ErrorFallback';
import { TableHeader } from '@/fsd/features/blog/ui/PostTable/TableHeader';
import { TablePagination } from '@/fsd/features/blog/ui/PostTable/TablePagination';
import { usePhotoTable } from '@/fsd/features/gallery/model';
import { TableSkeleton } from '@/fsd/shared/ui';
import { TableBody } from './TableBody';

export const TableContent = () => {
	const { table, isLoading, error, refetch } = usePhotoTable();

	if (isLoading) return <TableSkeleton />;
	if (error)
		// FIXME: 공용 에러 컴포넌트 사용
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
