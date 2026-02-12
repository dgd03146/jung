import { Box, Button } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { HiDocumentText } from 'react-icons/hi';
import type { AdminPost } from '@/fsd/entities/post/model/post';
import { useBulkSelection, useConfirmDialog } from '@/fsd/shared';
import {
	BulkActionBar,
	EmptyState,
	TableHeader,
	TablePagination,
	TableSkeleton,
} from '@/fsd/shared/ui';
import { useDeletePosts } from '../../api/useDeletePosts';
import ErrorFallback from '../ErrorFallback';
import { TableBody } from './TableBody';

interface TableContentProps {
	table: Table<AdminPost>;
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
	const bulk = useBulkSelection();
	const { confirm } = useConfirmDialog();
	const deletePostsMutation = useDeletePosts();

	if (isLoading) return <TableSkeleton />;
	if (error)
		return <ErrorFallback error={error} resetErrorBoundary={refetch} />;

	if (table.getRowModel().rows.length === 0) {
		return (
			<EmptyState
				icon={<HiDocumentText size={48} />}
				title='No posts yet'
				description='Create your first post to get started'
				action={
					<Link to='/blog/new'>
						<Button borderRadius='md' size='md'>
							Create Post
						</Button>
					</Link>
				}
			/>
		);
	}

	const allIds = table.getRowModel().rows.map((row) => String(row.original.id));

	const handleBulkDelete = async () => {
		const currentPageIdSet = new Set(allIds);
		const ids = Array.from(bulk.selectedIds).filter((id) =>
			currentPageIdSet.has(id),
		);
		if (ids.length === 0) return;
		const ok = await confirm({
			title: 'Delete Posts',
			description: `Are you sure you want to delete ${ids.length} posts? This action cannot be undone.`,
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deletePostsMutation.mutate(ids, {
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
					loading={deletePostsMutation.isPending}
					color='white'
				>
					Delete {bulk.count} items
				</Button>
			</BulkActionBar>
		</>
	);
};
