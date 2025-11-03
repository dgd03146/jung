import { TablePagination } from '@/fsd/features/blog/ui/PostTable/TablePagination';
import { Box } from '@jung/design-system/components';
import { usePlaceTable } from '../../model/usePlaceTable';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const TableContent = () => {
	const { table, isLoading, error } = usePlaceTable();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error</div>;

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
