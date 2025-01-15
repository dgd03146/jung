import type { CategoryWithCount } from '@jung/shared/types';
import * as styles from './CategoryStats.css';

interface CategoryStatsProps {
	allCategories: CategoryWithCount[];
	type: 'blog' | 'spots';
}

export const CategoryStats = ({ allCategories, type }: CategoryStatsProps) => {
	const getTotalCount = () => {
		return allCategories.reduce((sum, cat) => sum + cat.count, 0);
	};

	const getDirectCount = () => {
		return allCategories.reduce((sum, cat) => sum + cat.directCount, 0);
	};

	const getItemLabel = () => {
		return type === 'blog' ? 'Posts' : 'Spots';
	};

	return (
		<div className={styles.statsSection}>
			<div className={styles.statCard}>
				<span className={styles.statValue}>{allCategories.length}</span>
				<span className={styles.statLabel}>Total Categories</span>
			</div>
			<div className={styles.statCard}>
				<span className={styles.statValue}>{getTotalCount()}</span>
				<span className={styles.statLabel}>Total {getItemLabel()}</span>
			</div>
			<div className={styles.statCard}>
				<span className={styles.statValue}>{getDirectCount()}</span>
				<span className={styles.statLabel}>Direct {getItemLabel()}</span>
			</div>
		</div>
	);
};
