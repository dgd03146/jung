import * as styles from './GalleryListSkeleton.css';

const SectionSkeleton = ({ reverse }: { reverse: boolean }) => {
	return (
		<div className={styles.section({ reverse })}>
			<div className={styles.imageHalf} />
			<div className={styles.contentHalf}>
				<div className={styles.textLine.short} />
				<div className={styles.textLine.title} />
				<div className={styles.textLine.desc} />
				<div className={styles.textLine.desc} />
				<div className={styles.textLine.date} />
				<div className={styles.tagsRow}>
					<div className={styles.tagPill} />
					<div className={styles.tagPill} />
					<div className={styles.tagPill} />
				</div>
				<div className={styles.linkLine} />
			</div>
		</div>
	);
};

export const GalleryListSkeleton = ({ count = 3 }: { count?: number }) => {
	return (
		<div className={styles.container}>
			{Array.from({ length: count }).map((_, index) => (
				<SectionSkeleton key={index} reverse={index % 2 === 1} />
			))}
		</div>
	);
};
