import * as styles from './PlaceCategoryNavigationSkeleton.css';

export const PlaceCategoryNavigationSkeleton = ({
	length = 4,
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
