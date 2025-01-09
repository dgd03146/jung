import { HiPlus } from 'react-icons/hi2';
import * as styles from './PhotoCollectionSkeleton.css';

export const PhotoCollectionSkeleton = () => {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.mainSection}>
				<div className={styles.header}>
					<h2 className={styles.title}>Collection Management</h2>
					<button className={styles.addButton} disabled>
						<HiPlus />
						New Collection
					</button>
				</div>

				<div className={styles.gridView}>
					{Array.from({ length: 8 }).map((_, index) => (
						<div key={index} className={styles.collectionCard}>
							<div className={styles.imageContainer}>
								<div className={styles.skeletonImage} />
							</div>
							<div className={styles.content}>
								<div className={styles.skeletonTitle} />
								<div className={styles.skeletonDescription} />
							</div>
							<div className={styles.footer}>
								<div className={styles.skeletonPhotoCount} />
								<div className={styles.skeletonDate} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
