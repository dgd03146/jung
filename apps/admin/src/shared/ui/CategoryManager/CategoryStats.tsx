import { Box, Typography } from '@jung/design-system/components';
import type { CategoryCount } from '@jung/shared/types';
import * as styles from './CategoryStats.css';

interface CategoryStatsProps {
	allCategories: CategoryCount[];
	type: 'blog' | 'places';
}

export const CategoryStats = ({ allCategories, type }: CategoryStatsProps) => {
	const getTotalCount = () => {
		return allCategories.reduce((sum, cat) => sum + cat.count, 0);
	};

	const getDirectCount = () => {
		return allCategories.reduce((sum, cat) => sum + cat.directCount, 0);
	};

	const getItemLabel = () => {
		return type === 'blog' ? 'Posts' : 'Places';
	};

	return (
		<Box gap='4' className={styles.statsSection}>
			<Box className={styles.statCard}>
				<Typography.Heading level={4} color='primary' fontWeight='medium'>
					{allCategories.length}
				</Typography.Heading>
				<Typography.SubText level={1} color='black100' fontWeight='medium'>
					Total Categories
				</Typography.SubText>
			</Box>
			<Box className={styles.statCard}>
				<Typography.Heading level={4} color='primary' fontWeight='medium'>
					{getTotalCount()}
				</Typography.Heading>
				<Typography.SubText level={1} color='black100' fontWeight='medium'>
					Total {getItemLabel()}
				</Typography.SubText>
			</Box>
			<Box className={styles.statCard}>
				<Typography.Heading level={4} color='primary' fontWeight='medium'>
					{getDirectCount()}
				</Typography.Heading>
				<Typography.SubText level={1} color='black100' fontWeight='medium'>
					Direct {getItemLabel()}
				</Typography.SubText>
			</Box>
		</Box>
	);
};
