import { Box, Checkbox, Typography } from '@jung/design-system/components';
import { flexRender, type Table } from '@tanstack/react-table';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';
import { RxCaretSort } from 'react-icons/rx';
import * as styles from './PlaceTable.css';

interface TableHeaderProps<T> {
	table: Table<T>;
	isAllSelected?: boolean;
	isIndeterminate?: boolean;
	onToggleAll?: () => void;
}

export const TableHeader = <T extends {}>({
	table,
	isAllSelected,
	isIndeterminate: _isIndeterminate,
	onToggleAll,
}: TableHeaderProps<T>) => (
	<Box as='thead'>
		{table.getHeaderGroups().map((headerGroup) => (
			<Box as='tr' key={headerGroup.id}>
				{onToggleAll && (
					<Box as='th' className={styles.th} style={{ width: '40px' }}>
						<Checkbox
							checked={isAllSelected}
							onChange={onToggleAll}
							aria-label='Select all'
						/>
					</Box>
				)}
				{headerGroup.headers.map((header) => (
					<Box as='th' key={header.id} className={styles.th}>
						<Box
							as='button'
							width='full'
							className={styles.toggleSortingButton}
							onClick={header.column.getToggleSortingHandler()}
						>
							<Typography.Text
								level={3}
								fontWeight='medium'
								display='flex'
								alignItems='center'
								columnGap='0.5'
							>
								{header.isPlaceholder ? null : (
									<>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
										<Box
											as='span'
											marginLeft='0.5'
											display='inline-flex'
											alignItems='center'
										>
											{{
												asc: <BiChevronUp size={16} />,
												desc: <BiChevronDown size={16} />,
											}[header.column.getIsSorted() as string] ?? (
												<RxCaretSort size={16} opacity={0.7} />
											)}
										</Box>
									</>
								)}
							</Typography.Text>
						</Box>
					</Box>
				))}
				<Box as='th' className={styles.th}>
					<Typography.Text
						level={3}
						fontWeight='medium'
						display='flex'
						alignItems='center'
						columnGap='0.5'
						color='primary'
					>
						Actions
						<GiClick opacity={0.7} />
					</Typography.Text>
				</Box>
			</Box>
		))}
	</Box>
);
