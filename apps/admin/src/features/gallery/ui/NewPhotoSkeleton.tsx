import * as styles from './NewPhotoSkeleton.css';

export const NewPhotoSkeleton = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.form}>
				<div className={styles.formLayout}>
					<div className={styles.imageSection}>
						<div className={styles.skeletonUploadArea} />
					</div>

					<div className={styles.detailsSection}>
						<div className={styles.skeletonLabel} />
						<div className={styles.skeletonInput} />
						<div className={styles.skeletonLabel} />
						<div className={styles.skeletonTextarea} />
						<div className={styles.skeletonLabel} />
						<div className={styles.skeletonInput} />
						<div className={styles.skeletonLabel} />
						<div className={styles.skeletonInput} />
					</div>
				</div>
			</div>
		</div>
	);
};
