import { Box, Button, Typography } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import type { Table } from '@tanstack/react-table';
import { HiDocumentText } from 'react-icons/hi';
import { useBulkSelection, useConfirmDialog } from '@/fsd/shared';
import {
	BulkActionBar,
	EmptyState,
	TableHeader,
	TablePagination,
	TableSkeleton,
} from '@/fsd/shared/ui';
import { useDeleteArticles } from '../../api/useDeleteArticles';
import type { Article } from '../../types';
import { TableBody } from './TableBody';

interface TableContentProps {
	table: Table<Article>;
	isLoading: boolean;
	error: Error | null;
}

export const TableContent = ({
	table,
	isLoading,
	error,
}: TableContentProps) => {
	const bulk = useBulkSelection();
	const { confirm } = useConfirmDialog();
	const deleteArticlesMutation = useDeleteArticles();

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
			<EmptyState
				icon={<HiDocumentText size={48} />}
				title='No articles yet'
				description='Create your first article to get started'
				action={
					<Link to='/articles/new'>
						<Button borderRadius='md' size='md'>
							Create Article
						</Button>
					</Link>
				}
			/>
		);
	}

	const allIds = table.getRowModel().rows.map((row) => row.original.id);

	const handleBulkDelete = async () => {
		const currentPageIdSet = new Set(allIds);
		const ids = Array.from(bulk.selectedIds).filter((id) =>
			currentPageIdSet.has(id),
		);
		if (ids.length === 0) return;
		const ok = await confirm({
			title: 'Delete Articles',
			description: `Are you sure you want to delete ${ids.length} articles? This action cannot be undone.`,
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deleteArticlesMutation.mutate(ids, {
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
					loading={deleteArticlesMutation.isPending}
					color='white'
				>
					Delete {bulk.count} items
				</Button>
			</BulkActionBar>
		</>
	);
};
