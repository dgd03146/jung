import type { CategoryWithCount } from '@jung/shared/types';
import * as styles from './CategoryStats.css';

interface CategoryStatsProps {
	allCategories: CategoryWithCount[];
}

export const CategoryStats = ({ allCategories }: CategoryStatsProps) => {
	return (
		<div className={styles.statsSection}>
			<div className={styles.statCard}>
				<span className={styles.statValue}>{allCategories.length}</span>
				<span className={styles.statLabel}>Total Categories</span>
			</div>
			<div className={styles.statCard}>
				<span className={styles.statValue}>
					{allCategories.reduce((sum, cat) => sum + (cat.postCount || 0), 0)}
				</span>
				<span className={styles.statLabel}>Total Posts</span>
			</div>
		</div>
	);
};
