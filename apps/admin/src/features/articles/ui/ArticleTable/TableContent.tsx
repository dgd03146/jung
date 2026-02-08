import { Box, Typography } from '@jung/design-system/components';
import { TableSkeleton } from '@/fsd/shared/ui';
import { useArticleTable } from '../../model';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';

export const TableContent = () => {
	const { table, isLoading, error } = useArticleTable();

	if (isLoading) return <TableSkeleton />;
	if (error) {
		return (
			<Box padding='6' textAlign='center'>
				<Typography.Text color='secondary'>
					Failed to load articles. Please try again.
				</Typography.Text>
			</Box>
		);
	}

	if (table.getRowModel().rows.length === 0) {
		return (
			<Box padding='6' textAlign='center'>
				<Typography.Text color='secondary'>
					No articles found. Create your first article!
				</Typography.Text>
			</Box>
		);
	}

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
