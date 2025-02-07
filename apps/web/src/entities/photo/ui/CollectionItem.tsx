import { BlurImage, MotionCard, ROUTES } from '@/fsd/shared';
import { Box, GridItem, Typography } from '@jung/design-system/components';
import type { Collection } from '@jung/shared/types';
import Link from 'next/link';
import * as styles from './CollectionItem.css';

type CollectionItemProps = {
	collection: Collection;
	index: number;
};

export const CollectionItem = ({ collection, index }: CollectionItemProps) => {
	return (
		<GridItem colStart='auto' colEnd='auto'>
			<Link
				href={ROUTES.COLLECTION.pathById(collection.id)}
				className={styles.gridLink}
			>
				<MotionCard>
					<Box className={styles.imageWrapper}>
						<BlurImage
							src={collection.cover_image}
							alt={collection.title}
							fill
							sizes='(max-width: 768px) 50vw, 33vw'
							priority={index <= 3}
						/>
						<Box className={styles.overlay}>
							<Typography.Text level={2} color='white'>
								{collection.title}
							</Typography.Text>
							<Typography.SubText level={3} color='gray100'>
								{collection.photo_count} photos
							</Typography.SubText>
						</Box>
					</Box>
				</MotionCard>
			</Link>
		</GridItem>
	);
};
