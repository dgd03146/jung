import { Box, Card, Container } from '@jung/design-system/components';
import * as styles from './PlaceListSkeleton.css';

export const PlaceSkeleton = () => {
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

export const PlaceListSkeleton = ({ count = 3 }: { count?: number }) => {
	return (
		<Container>
			<Box
				display='grid'
				columnGap='4'
				rowGap='8'
				className={styles.placeListGrid}
			>
				{Array.from({ length: count }).map((_, index) => (
					<PlaceSkeleton key={index} />
				))}
			</Box>
		</Container>
	);
};
