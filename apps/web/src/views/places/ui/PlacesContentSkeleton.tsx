import { PlaceSkeleton } from '@/fsd/entities/place';
import * as styles from './PlacesContent.css';

export const PlacesContentSkeleton = ({ count = 6 }: { count?: number }) => {
	return (
		<div className={styles.splitContainer}>
			<div className={styles.listSection}>
				{Array.from({ length: count }, (_, i) => (
					<PlaceSkeleton key={i} />
				))}
			</div>
			<div className={`${styles.mapSection} ${styles.mapSkeleton}`} />
		</div>
	);
};
