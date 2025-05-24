'use client';

import { useCollectionQuery } from '@/fsd/entities/photo';
import { FilteredCollectionView } from '@/fsd/features/photo';
import { BlurImage } from '@/fsd/shared';
import { Box, Container, Typography } from '@jung/design-system/components';
import * as styles from './CollectionDetailPage.css';

interface CollectionDetailPageProps {
	collectionId: string;
}

export const CollectionDetailPage = ({
	collectionId,
}: CollectionDetailPageProps) => {
	const { data } = useCollectionQuery(collectionId);
	const { collection, photos } = data;

	return (
		<Container>
			<Box className={styles.headerSection}>
				<BlurImage
					src={collection.cover_image}
					alt={collection.title}
					fill
					priority
				/>
				<Box className={styles.gradientOverlay}>
					<Typography.Heading level={1} color='white' marginBottom='2'>
						{collection.title}
					</Typography.Heading>
					<Typography.Text color='gray'>
						{collection.description}
					</Typography.Text>
					<Typography.Text color='gray' fontSize='sm' marginTop='2'>
						{photos.length} photos
					</Typography.Text>
				</Box>
			</Box>
			<Box>
				<FilteredCollectionView collectionId={collectionId} />
			</Box>
		</Container>
	);
};
