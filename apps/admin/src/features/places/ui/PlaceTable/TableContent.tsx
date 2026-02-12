import { Box, Button, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiLocationMarker } from 'react-icons/hi';
import { TablePagination } from '@/fsd/features/blog/ui/PostTable/TablePagination';
import { useBulkSelection, useConfirmDialog } from '@/fsd/shared';
import { BulkActionBar, EmptyState, TableSkeleton } from '@/fsd/shared/ui';
import { useDeletePlaces } from '../../api/useDeletePlaces';
import { usePlaceTable } from '../../model/usePlaceTable';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';

export const TableContent = () => {
	const { table, isLoading, error } = usePlaceTable();
	const bulk = useBulkSelection();
	const { confirm } = useConfirmDialog();
	const deletePlacesMutation = useDeletePlaces();

	if (isLoading) return <TableSkeleton />;
	if (error) {
		return (
			<Box padding='6' textAlign='center'>
				<Typography.Text color='secondary'>
					Failed to load places. Please try again.
				</Typography.Text>
			</Box>
		);
	}

	if (table.getRowModel().rows.length === 0) {
		return (
			<EmptyState
				icon={<HiLocationMarker size={48} />}
				title='No places yet'
				description='Create your first place to get started'
				action={
					<Link to='/places/new'>
						<Button borderRadius='md' size='md'>
							Create Place
						</Button>
					</Link>
				}
			/>
		);
	}

	const allIds = table
		.getRowModel()
		.rows.map((row) => (row.original as { id: string }).id);

	const handleBulkDelete = async () => {
		const ids = Array.from(bulk.selectedIds);
		const ok = await confirm({
			title: 'Delete Places',
			description: `Are you sure you want to delete ${ids.length} places? This action cannot be undone.`,
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deletePlacesMutation.mutate(ids, {
				onSuccess: () => bulk.clear(),
			});
		}
	};

	return (
		<>
			<Box overflow='auto' width='full' boxShadow='primary' borderRadius='lg'>
				<Box
					as='table'
					fontSize={{ mobile: 'sm', laptop: 'base' }}
					width='full'
				>
					<TableHeader
						table={table}
						isAllSelected={bulk.isAllSelected(allIds)}
						isIndeterminate={bulk.isIndeterminate(allIds)}
						onToggleAll={() => bulk.toggleAll(allIds)}
					/>
					<TableBody
						table={table}
						isSelected={bulk.isSelected}
						onToggle={bulk.toggle}
					/>
				</Box>
			</Box>
			<TablePagination table={table} />
			<BulkActionBar count={bulk.count} onClear={bulk.clear}>
				<Button
					variant='outline'
					size='sm'
					borderRadius='md'
					onClick={handleBulkDelete}
					loading={deletePlacesMutation.isPending}
					color='white'
				>
					Delete {bulk.count} items
				</Button>
			</BulkActionBar>
		</>
	);
};
