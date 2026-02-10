import { Container } from '@jung/design-system/components';
import * as styles from './GalleryListSkeleton.css';

const SKELETON_HEIGHTS = [
	styles.heightShort,
	styles.heightMedium,
	styles.heightTall,
	styles.heightSquare,
];

const GalleryCardSkeleton = ({ index }: { index: number }) => {
	const heightClass = SKELETON_HEIGHTS[index % SKELETON_HEIGHTS.length];

	return <div className={`${styles.skeletonCard} ${heightClass}`} />;
};

export const GalleryListSkeleton = ({ count = 12 }: { count?: number }) => {
	return (
		<Container>
			<div className={styles.galleryGrid}>
				{Array.from({ length: count }).map((_, index) => (
					<GalleryCardSkeleton key={index} index={index} />
				))}
			</div>
		</Container>
	);
};
