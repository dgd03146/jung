import * as styles from './PhotoCollectionDetailSkeleton.css.ts';

export const PhotoCollectionDetailSkeleton = () => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title} />
				<div className={styles.actions}>
					<div className={styles.button} />
					<div className={styles.button} />
				</div>
			</div>
			<div className={styles.grid}>
				{Array.from({ length: 12 }).map((_, index) => (
					<div key={index} className={styles.photo} />
				))}
			</div>
		</div>
	);
};
