import * as styles from './CategorySkeleton.css';

interface CategorySkeletonProps {
	cardCount?: number;
}

export function CategorySkeleton({ cardCount = 8 }: CategorySkeletonProps) {
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.statsSection}>
				<div className={styles.statCard}>
					<div className={styles.statValueSkeleton} />
					<div className={styles.statLabelSkeleton} />
				</div>
				<div className={styles.statCard}>
					<div className={styles.statValueSkeleton} />
					<div className={styles.statLabelSkeleton} />
				</div>
			</div>

			<div className={styles.mainSection}>
				<div className={styles.header}>
					<div className={styles.titleSkeleton} />
					<div className={styles.actionsSkeleton} />
				</div>

				<div className={styles.gridView}>
					{Array.from({ length: cardCount }, (_, i) => (
						<div key={i} className={styles.cardSkeleton}>
							<div className={styles.cardHeaderSkeleton}>
								<div className={styles.cardTitleSkeleton} />
								<div className={styles.cardActionsSkeleton} />
							</div>
							<div className={styles.cardContentSkeleton}>
								<div className={styles.descriptionSkeleton} />
								<div className={styles.descriptionSkeleton} />
							</div>
							<div className={styles.cardFooterSkeleton}>
								<div className={styles.postCountSkeleton} />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
