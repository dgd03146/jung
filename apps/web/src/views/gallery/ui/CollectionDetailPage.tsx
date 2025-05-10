'use client';

import {
	PhotoCard,
	PhotoList,
	transformPhoto,
	useCollectionQuery,
} from '@/fsd/entities/photo';
import { BlurImage, EmptyState } from '@/fsd/shared';
import { Box, Container, Typography } from '@jung/design-system/components';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePhotoFilter } from '../model/PhotoFilterContext';
import * as styles from './CollectionDetailPage.css';

interface CollectionDetailPageProps {
	collectionId: string;
}

export const CollectionDetailPage = ({
	collectionId,
}: CollectionDetailPageProps) => {
	const pathname = usePathname();
	const { setSort, setCollectionId } = usePhotoFilter();

	useEffect(() => {
		// 인터셉팅 라우트 감지
		const isPhotoIntercepting = /\/gallery\/photo\/\d+/.test(pathname);

		if (!isPhotoIntercepting) {
			const isTrending = pathname.includes('/trending');
			if (isTrending) {
				setSort('popular');
			} else {
				setSort('latest');
			}

			const collectionMatch = pathname.match(/\/collections\/([^\/]+)/);
			setCollectionId(collectionMatch ? collectionMatch[1] : undefined);
		}
	}, [pathname, setSort, setCollectionId]);

	const { data } = useCollectionQuery(collectionId);
	const { collection, photos } = data;
	const formattedPhotos = photos.map((photo) => transformPhoto(photo));

	if (photos.length === 0) {
		return <EmptyState content='photos' />;
	}

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
				<PhotoList
					photos={formattedPhotos}
					renderPhoto={{
						image: (props, context) => (
							<PhotoCard imageProps={props} contextProps={context} />
						),
					}}
				/>
			</Box>
		</Container>
	);
};
