import { Button, Flex, Typography } from '@jung/design-system/components';

import type { Table } from '@tanstack/react-table';
import {
	BiChevronLeft,
	BiChevronRight,
	BiFirstPage,
	BiLastPage,
} from 'react-icons/bi';

interface TablePaginationProps<T> {
	table: Table<T>;
}

export const TablePagination = <T,>({ table }: TablePaginationProps<T>) => (
	<Flex justify='flex-end' marginTop='3' columnGap='0.5' align='center'>
		<Typography.SubText level={2} marginRight='4' color='primary200'>
			<Typography.FootNote fontSize='sm' color='primary'>
				{table.getState().pagination.pageIndex + 1}
			</Typography.FootNote>{' '}
			of {table.getPageCount()}
		</Typography.SubText>
		<Button
			boxShadow='primary'
			border='none'
			onClick={() => table.setPageIndex(0)}
			disabled={!table.getCanPreviousPage()}
		>
			<BiFirstPage />
		</Button>
		<Button
			boxShadow='primary'
			border='none'
			onClick={() => table.previousPage()}
			disabled={!table.getCanPreviousPage()}
		>
			<BiChevronLeft />
		</Button>
		<Button
			boxShadow='primary'
			border='none'
			onClick={() => table.nextPage()}
			disabled={!table.getCanNextPage()}
		>
			<BiChevronRight />
		</Button>
		<Button
			boxShadow='primary'
			border='none'
			onClick={() => table.setPageIndex(table.getPageCount() - 1)}
			disabled={!table.getCanNextPage()}
		>
			<BiLastPage />
		</Button>
	</Flex>
);
