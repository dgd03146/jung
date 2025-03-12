import { Box } from '@jung/design-system/components';
import * as styles from './FilterSpotCategorySkeleton.css';

export const FilterSpotCategorySkeleton = ({
	length = 6,
}: { length: number }) => {
	return (
		<Box className={styles.container}>
			{Array.from({ length: length }, (_, i) => (
				<Box key={i} className={styles.skeletonTag} />
			))}
		</Box>
	);
};
