import * as styles from './CollectionListSkeleton.css';

const DEFAULT_SKELETON_COUNT = 6;

const CardSkeleton = () => {
	return (
		<div className={styles.card}>
			<div className={styles.cardImage} />
			<div className={styles.cardOverlay}>
				<div className={styles.titleLine} />
				<div className={styles.countLine} />
			</div>
		</div>
	);
};

export const CollectionListSkeleton = ({
	count = DEFAULT_SKELETON_COUNT,
}: {
	count?: number;
}) => {
	return (
		<div className={styles.grid}>
			{Array.from({ length: count }).map((_, index) => (
				<CardSkeleton key={index} />
			))}
		</div>
	);
};
