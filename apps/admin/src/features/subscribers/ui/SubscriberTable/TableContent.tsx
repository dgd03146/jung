import { Box, Button } from '@jung/design-system/components';
import type { Table } from '@tanstack/react-table';
import { HiMail } from 'react-icons/hi';
import type { Subscriber } from '@/fsd/entities/subscriber';
import {
	EmptyState,
	TableHeader,
	TablePagination,
	TableSkeleton,
} from '@/fsd/shared/ui';
import { TableBody } from './TableBody';

const EMPTY_STATE_ICON_SIZE = 48;

interface TableContentProps {
	table: Table<Subscriber>;
	isLoading: boolean;
	error: Error | null;
	refetch: () => void;
}

export const TableContent = ({
	table,
	isLoading,
	error,
	refetch,
}: TableContentProps) => {
	if (isLoading) return <TableSkeleton />;

	if (error) {
		return (
			<EmptyState
				icon={<HiMail size={EMPTY_STATE_ICON_SIZE} />}
				title='Failed to load subscribers'
				description={error.message}
				action={
					<Button variant='outline' size='sm' onClick={() => refetch()}>
						Retry
					</Button>
				}
			/>
		);
	}

	if (table.getRowModel().rows.length === 0) {
		return (
			<EmptyState
				icon={<HiMail size={EMPTY_STATE_ICON_SIZE} />}
				title='No subscribers yet'
				description='Subscribers will appear here once they sign up'
			/>
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
