import { Box, Button, Flex } from '@jung/design-system/components';
import { Link } from '@tanstack/react-router';
// TableBody.tsx
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as styles from './PostTable.css';

// FIXME: 굳이 제네릭?..
interface TableBodyProps<T> {
	table: Table<T>;
}

export const TableBody = <T,>({ table }: TableBodyProps<T>) => (
	<Box as='tbody'>
		{table.getRowModel().rows.map((row) => (
			<Box as='tr' key={row.id}>
				{row.getVisibleCells().map((cell) => (
					<Box as='td' key={cell.id} className={styles.td}>
						{flexRender(cell.column.columnDef.cell, cell.getContext())}
					</Box>
				))}

				<Box as='td' className={styles.td}>
					<Flex>
						<Link
							to={'/blog/edit/$postId'}
							params={{ postId: row.getValue('id') as string }}
						>
							<Button variant='ghost' color='primary'>
								<FaEdit />
							</Button>
						</Link>
						<Button variant='ghost' color='primary'>
							<FaTrash />
						</Button>
					</Flex>
				</Box>
			</Box>
		))}
	</Box>
);
