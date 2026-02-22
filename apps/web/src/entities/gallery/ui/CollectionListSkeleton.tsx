import * as styles from './CollectionListSkeleton.css';

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

export const CollectionListSkeleton = ({ count = 6 }: { count?: number }) => {
	return (
		<div className={styles.grid}>
			{Array.from({ length: count }).map((_, index) => (
				<CardSkeleton key={index} />
			))}
		</div>
	);
};
