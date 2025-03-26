import { Box, Card, Container } from '@jung/design-system/components';
import * as styles from './SpotListSkeleton.css';

export const SpotSkeleton = () => {
	return (
		<Card variant='outline' className={styles.skeletonCardStyle}>
			<Box className={styles.imageSkeleton} /> {/* 이미지 스켈레톤 */}
			<Card.Content rowGap='2'>
				<Box className={styles.titleSkeleton} /> {/* 제목 스켈레톤 */}
				<Box className={styles.addressSkeleton} /> {/* 주소 스켈레톤 */}
				<Box className={styles.descriptionSkeleton} /> {/* 설명 스켈레톤 */}
			</Card.Content>
		</Card>
	);
};

export const SpotListSkeleton = ({ count = 3 }: { count?: number }) => {
	return (
		<Container>
			<Box
				display='grid'
				columnGap='4'
				rowGap='8'
				className={styles.spotListGrid}
			>
				{Array.from({ length: count }).map((_, index) => (
					<SpotSkeleton key={index} />
				))}
			</Box>
		</Container>
	);
};
