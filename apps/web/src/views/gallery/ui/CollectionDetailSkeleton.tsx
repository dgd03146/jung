import { GalleryListSkeleton } from '@/fsd/entities/gallery';
import * as styles from './CollectionDetailSkeleton.css';

export const CollectionDetailSkeleton = () => {
	return (
		<>
			<div className={styles.headerSection}>
				<div className={styles.gradientOverlay}>
					<div className={styles.titleLine} />
					<div className={styles.descriptionLine} />
					<div className={styles.countLine} />
				</div>
			</div>
			<GalleryListSkeleton count={3} />
		</>
	);
};
