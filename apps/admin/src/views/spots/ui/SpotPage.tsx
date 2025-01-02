import { SpotTable } from '@/fsd/features/spots/ui';
import * as styles from './SpotPage.css';

export const SpotPage = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>42</span>
					<span className={styles.statLabel}>Total Spots</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>8</span>
					<span className={styles.statLabel}>Categories</span>
				</div>

				<div className={styles.statCard}>
					<span className={styles.statValue}>4.8</span>
					<span className={styles.statLabel}>Avg Rating</span>
				</div>
			</div>
			<SpotTable />
		</div>
	);
};
