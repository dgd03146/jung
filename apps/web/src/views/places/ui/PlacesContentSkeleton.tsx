import { PlaceSkeleton } from '@/fsd/entities/place';
import * as styles from './PlacesContent.css';

const DEFAULT_SKELETON_COUNT = 6;

export const PlacesContentSkeleton = ({
	count = DEFAULT_SKELETON_COUNT,
}: {
	count?: number;
}) => {
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
