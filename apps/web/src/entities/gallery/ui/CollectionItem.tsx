import { Box, Typography } from '@jung/design-system/components';
import { getImageUrl } from '@jung/shared/lib';
import type { Collection } from '@jung/shared/types';
import { BlurImage, MotionCard, ROUTES } from '@/fsd/shared';
import { Link } from '@/i18n/routing';
import * as styles from './CollectionItem.css';

type CollectionItemProps = {
	collection: Collection;
	index: number;
};

export const CollectionItem = ({ collection, index }: CollectionItemProps) => {
	return (
		<Box className={styles.collectionListGrid}>
			<Link
				href={ROUTES.COLLECTION.pathById(collection.id)}
				className={styles.gridLink}
			>
				<MotionCard>
					<Box className={styles.imageWrapper}>
						<BlurImage
							src={getImageUrl(collection.cover_image)}
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
		</Box>
	);
};
