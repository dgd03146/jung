import { Box, Button, Flex } from '@jung/design-system/components';
// TableBody.tsx
import { type Table, flexRender } from '@tanstack/react-table';
import { FaEdit, FaTrash } from 'react-icons/fa';
import * as styles from './PostTable.css';

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
						<Button variant='ghost' color='primary'>
							<FaEdit />
						</Button>
						<Button variant='ghost' color='primary'>
							<FaTrash />
						</Button>
					</Flex>
				</Box>
			</Box>
		))}
	</Box>
);
