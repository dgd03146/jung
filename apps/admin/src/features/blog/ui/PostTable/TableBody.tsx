import { Box, Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useDeletePost } from '../../api/useDeletePost';
import * as styles from './PostTable.css';

// FIXME: 굳이 제네릭?..
interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => {
	const deletePostMutation = useDeletePost();

	const handleDelete = (id: string) => {
		if (window.confirm('Are you sure you want to delete this post?')) {
			deletePostMutation.mutate(id);
		} else return;
	};

	return (
		<Box as='tbody'>
			{table.getRowModel().rows.map((row) => {
				const postId = row.getValue('id') as string;

				return (
					<Box as='tr' key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<Box as='td' key={cell.id} className={styles.td}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</Box>
						))}

						<Box as='td' className={styles.td}>
							<Flex>
								<Link to={'/blog/edit/$postId'} params={{ postId }}>
									<Button variant='ghost' color='primary'>
										<FaEdit />
									</Button>
								</Link>
								<Button
									variant='ghost'
									color='primary'
									onClick={() => handleDelete(postId)}
								>
									<FaTrash />
								</Button>
							</Flex>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};
