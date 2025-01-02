import { PhotoTable } from '@/fsd/features/gallery';
import * as styles from './GalleryPage.css';

export default function GalleryPage() {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<span className={styles.statValue}>156</span>
					<span className={styles.statLabel}>Total Photos</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>12</span>
					<span className={styles.statLabel}>Collections</span>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statValue}>24</span>
					<span className={styles.statLabel}>Featured</span>
				</div>
			</div>
			<PhotoTable />
		</div>
	);
}
