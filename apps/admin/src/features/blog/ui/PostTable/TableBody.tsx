import { useDeletePost } from '@/fsd/features/blog/api';
import { useGetCategories } from '@/fsd/shared';
import { CategoryCell } from '@/fsd/shared/ui';
import type { Post } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as styles from './PostTable.css';

interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deletePostMutation = useDeletePost();
	const { data: categoriesData } = useGetCategories('blog');

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
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
							<div style={{ display: 'flex', gap: '8px' }}>
								<Link to={'/blog/edit/$postId'} params={{ postId }}>
									<button className={styles.actionButton}>
										<FaEdit size={16} />
									</button>
								</Link>
								<button
									className={styles.actionButton}
									onClick={() => handleDelete(postId)}
								>
									<FaTrash size={16} />
								</button>
							</div>
						</td>
					</tr>
				);
			})}
		</tbody>
	);
};
