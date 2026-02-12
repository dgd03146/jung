import { Box, Button } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { HiPhotograph } from 'react-icons/hi';
import { usePhotoTable } from '@/fsd/features/gallery/model';
import { useBulkSelection, useConfirmDialog } from '@/fsd/shared';
import {
	BulkActionBar,
	EmptyState,
	TableHeader,
	TablePagination,
	TableSkeleton,
} from '@/fsd/shared/ui';
import { useDeletePhotos } from '../../api/useDeletePhotos';
import { TableBody } from './TableBody';

export const TableContent = () => {
	const { table, isLoading, error } = usePhotoTable();
	const bulk = useBulkSelection();
	const { confirm } = useConfirmDialog();
	const deletePhotosMutation = useDeletePhotos();

	if (isLoading) return <TableSkeleton />;
	if (error) {
		return (
			<Box padding='6' textAlign='center'>
				Failed to load photos. Please try again.
			</Box>
		);
	}

	if (table.getRowModel().rows.length === 0) {
		return (
			<EmptyState
				icon={<HiPhotograph size={48} />}
				title='No photos yet'
				description='Upload your first photo to get started'
				action={
					<Link to='/gallery/photos/new'>
						<Button borderRadius='md' size='md'>
							Upload Photo
						</Button>
					</Link>
				}
			/>
		);
	}

	const allIds = table.getRowModel().rows.map((row) => row.original.id);

	const handleBulkDelete = async () => {
		const ids = Array.from(bulk.selectedIds);
		const ok = await confirm({
			title: 'Delete Photos',
			description: `Are you sure you want to delete ${ids.length} photos? This action cannot be undone.`,
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deletePhotosMutation.mutate(ids, {
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
					loading={deletePhotosMutation.isPending}
					color='white'
				>
					Delete {bulk.count} items
				</Button>
			</BulkActionBar>
		</>
	);
};
