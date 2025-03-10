'use client';

import { Box } from '@jung/design-system';
import * as accordionStyles from './FilterPostCategoryAccordion.css';
import * as styles from './FilterPostCategoryAccordionSkeleton.css';

interface FilterPostCategoryAccordionSkeletonProps {
	count?: number;
}

export const FilterPostCategoryAccordionSkeleton = ({
	count = 5,
}: FilterPostCategoryAccordionSkeletonProps) => {
	return (
		<Box
			as='aside'
			className={accordionStyles.sidebar}
			display={{ mobile: 'none', tablet: 'block' }}
		>
			{/* 'All' 카테고리 스켈레톤 */}
			<Box className={`${styles.skeletonBase} ${styles.mainCategoryItem}`} />

			{/* 메인 카테고리 스켈레톤 */}
			{Array.from({ length: count }).map((_, index) => (
				<Box key={`main-${index}`} className={styles.categoryGroup}>
					<Box
						className={`${styles.skeletonBase} ${styles.mainCategoryItem}`}
					/>

					{/* 서브 카테고리 스켈레톤 */}
					{index % 2 === 0 && (
						<>
							{Array.from({ length: 3 }).map((_, subIndex) => (
								<Box
									key={`sub-${index}-${subIndex}`}
									className={`${styles.skeletonBase} ${styles.subCategoryItem}`}
								/>
							))}
						</>
					)}
				</Box>
			))}
		</Box>
	);
};
