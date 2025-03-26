import { useDeletePost } from '@/fsd/features/blog/api';
import { useGetCategories } from '@/fsd/shared';
import { CategoryCell } from '@/fsd/shared/ui';
import { Button, Flex } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as styles from './Table.css';

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

	// TODO: 테이블 디자인 시스템 만들기
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
							<Flex gap='2'>
								<Link to={'/blog/edit/$postId'} params={{ postId }}>
									<Button variant='ghost'>
										<FaEdit size={16} />
									</Button>
								</Link>
								<Button variant='ghost' onClick={() => handleDelete(postId)}>
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
