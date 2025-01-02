import { Box, Typography } from '@jung/design-system/components';
import { type Table, flexRender } from '@tanstack/react-table';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';
import { RxCaretSort } from 'react-icons/rx';
import * as styles from './SpotTable.css';

interface TableHeaderProps<T> {
	table: Table<T>;
}

export const TableHeader = <T extends {}>({ table }: TableHeaderProps<T>) => (
	<Box as='thead'>
		{table.getHeaderGroups().map((headerGroup) => (
			<Box as='tr' key={headerGroup.id}>
				{headerGroup.headers.map((header) => (
					<Box as='th' key={header.id} className={styles.th}>
						<Box
							as='button'
							width='full'
							color={{ base: 'primary', hover: 'primary200' }}
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
