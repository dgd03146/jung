import { Box, Typography } from '@jung/design-system/components';
import { flexRender, type Table } from '@tanstack/react-table';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { GiClick } from 'react-icons/gi';
import { RxCaretSort } from 'react-icons/rx';
import * as styles from './Table.css';

interface TableHeaderProps<T> {
	table: Table<T>;
}

export const TableHeader = <T extends {}>({ table }: TableHeaderProps<T>) => (
	// TODO: 나중에 테이블 디자인 시스템으로 만들기
	<Box as='thead'>
		{table.getHeaderGroups().map((headerGroup) => (
			<Box as='tr' key={headerGroup.id}>
				{headerGroup.headers.map((header) => (
					<Box as='th' key={header.id} className={styles.th}>
						<Box
							as='button'
							className={styles.toggleSortingButton}
							width='full'
							display='flex'
							onClick={header.column.getToggleSortingHandler()}
						>
							<Typography.Text
								level={3}
								fontWeight='medium'
								display='flex'
								alignItems='center'
								columnGap='0.5'
								width='full'
								justifyContent='center'
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
											display='flex'
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
