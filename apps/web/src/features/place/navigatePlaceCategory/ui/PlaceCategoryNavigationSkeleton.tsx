import * as styles from './PlaceCategoryNavigationSkeleton.css';

const DEFAULT_SKELETON_TAB_COUNT = 4;

export const PlaceCategoryNavigationSkeleton = ({
	length = DEFAULT_SKELETON_TAB_COUNT,
}: {
	length?: number;
}) => {
	return (
		<nav className={styles.nav}>
			{Array.from({ length }, (_, i) => (
				<div key={i} className={styles.skeletonTab} />
			))}
		</nav>
	);
};
