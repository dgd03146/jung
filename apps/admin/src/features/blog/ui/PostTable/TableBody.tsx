import { Button, Checkbox, Flex } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { flexRender, type Table } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeletePost } from '@/fsd/features/blog/api';
import { useConfirmDialog, useGetCategories } from '@/fsd/shared';
import { CategoryCell } from '@/fsd/shared/ui';
import * as styles from './Table.css';

interface TableBodyProps<T> {
	table: Table<T>;
	isSelected?: (id: string) => boolean;
	onToggle?: (id: string) => void;
}

export const TableBody = <T,>({
	table,
	isSelected,
	onToggle,
}: TableBodyProps<T>) => {
	const deletePostMutation = useDeletePost();
	const { data: categoriesData } = useGetCategories('blog');
	const { confirm } = useConfirmDialog();

	const handleDelete = async (id: string) => {
		const ok = await confirm({
			title: 'Delete Post',
			description:
				'Are you sure you want to delete this post? This action cannot be undone.',
			confirmText: 'Delete',
			variant: 'destructive',
		});
		if (ok) {
			deletePostMutation.mutate(id);
		}
	};

	return (
		<tbody>
			{table.getRowModel().rows.map((row) => {
				const post = row.original as Post;
				const category = categoriesData?.allCategories.find(
					(cat) => cat.id === post.category_id,
				);

				const postId = post.id;

				return (
					<tr key={row.id} className={styles.row}>
						{onToggle && (
							<td className={styles.td} style={{ width: '40px' }}>
								<Checkbox
									checked={isSelected?.(postId)}
									onChange={() => onToggle(postId)}
								/>
							</td>
						)}
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id} className={styles.td}>
								{cell.column.id === 'category' ? (
									<CategoryCell category={category} />
								) : (
									flexRender(cell.column.columnDef.cell, cell.getContext())
								)}
							</td>
						))}
						<td className={styles.td}>
							<Flex gap='2'>
								<Link to={'/blog/edit/$postId'} params={{ postId }}>
									<Button variant='ghost'>
										<FaEdit size={16} />
									</Button>
								</Link>
								<Button
									variant='ghost'
									onClick={() => handleDelete(postId)}
									disabled={deletePostMutation.isPending}
								>
									<FaTrash size={16} />
								</Button>
							</Flex>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
