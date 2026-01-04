import { Box } from '@jung/design-system/components';
import * as styles from './TableSkeleton.css';

const SKELETON_COLUMNS = 5;
const SKELETON_ROWS = 10;

const TableSkeleton = () => {
	return (
		<Box overflow='auto' width='full' boxShadow='primary' borderRadius='2xl'>
			<Box as='table' fontSize={{ mobile: 'sm', laptop: 'base' }} width='full'>
				<Box as='thead'>
					<Box as='tr'>
						{[...Array(SKELETON_COLUMNS)].map((_, index) => (
							<Box as='th' key={index} className={styles.th}>
								<Box
									height='8'
									width='4/5'
									background='gray'
									borderRadius='md'
								/>
							</Box>
						))}
					</Box>
				</Box>
				<Box as='tbody'>
					{[...Array(SKELETON_ROWS)].map((_, rowIndex) => (
						<Box as='tr' key={rowIndex}>
							{[...Array(SKELETON_COLUMNS)].map((_, cellIndex) => (
								<Box as='td' key={cellIndex} className={styles.td}>
									<Box
										height='8'
										width='full'
										background='gray'
										borderRadius='md'
									/>
								</Box>
							))}
						</Box>
					))}
				</Box>
			</Box>
		</Box>
	);
};

export default TableSkeleton;
