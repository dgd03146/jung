import { PlaceTable } from '@/fsd/features/places/ui';
import * as styles from './PlacePage.css';

export const PlacePage = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>42</span>
					<span className={styles.statLabel}>Total Places</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>8</span>
					<span className={styles.statLabel}>Categories</span>
				</div>

				{/* <div className={styles.statCard}>
					<span className={styles.statValue}>4.8</span>
					<span className={styles.statLabel}>Avg Rating</span>
				</div> */}
			</div>
			<PlaceTable />
		</div>
	);
};
