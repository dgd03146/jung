'use client';

import { BlurImage, MotionCard } from '@/fsd/shared';
import { Box, Container, Typography } from '@jung/design-system/components';
import type { CustomPhoto } from '@jung/shared/types';
import Link from 'next/link';
import {
	MasonryPhotoAlbum,
	type RenderImageContext,
	type RenderImageProps,
} from 'react-photo-album';
import 'react-photo-album/masonry.css';
import { useGetCollectionById } from '../api';
import * as styles from './CollectionDetail.css';

// FIXME: 컬렉션 상세 페이지, PhotoList 컴포넌트 재사용할 수 있도록 수정

const renderNextImage = (
	{ alt = '', sizes }: RenderImageProps,
	{ photo, width, height, index }: RenderImageContext<CustomPhoto>,
) => {
	return (
		<Link href={`/gallery/photo/${photo.data.id}`} scroll={false}>
			<MotionCard>
				<Box
					width='full'
					position='relative'
					style={{
						aspectRatio: `${width} / ${height}`,
					}}
					className={styles.imageContainer}
				>
					<BlurImage
						fill
						src={photo.src}
						alt={alt}
						sizes={sizes}
						className={styles.image}
						priority={index < 4}
					/>
					<Box
						position='absolute'
						className={styles.overlay}
						display='flex'
						alignItems='end'
						padding='4'
					>
						<Typography.SubText
							level={3}
							color='white'
							className={styles.title}
						>
							{photo.data.description}
						</Typography.SubText>
					</Box>
				</Box>
			</MotionCard>
		</Link>
	);
};

interface CollectionDetailProps {
	id: string;
}

export function CollectionDetail({ id }: CollectionDetailProps) {
	const [data] = useGetCollectionById(id);
	const { collection, photos } = data;

	// FIXME: 백에서 처리
	const formattedPhotos: CustomPhoto[] = photos.map((photo) => ({
		key: `collection-${photo.id}`,
		src: photo.image_url,
		width: photo.width,
		height: photo.height,
		alt: photo.alt ?? '',
		data: {
			id: photo.id,
			title: photo.title,
			description: photo.description,
			createdAt: photo.created_at,
			likes: photo.likes,
			views: photo.views,
			tags: photo.tags,
		},
	}));

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
				<MasonryPhotoAlbum
					photos={formattedPhotos}
					spacing={24}
					columns={(containerWidth) => {
						if (containerWidth < 768) return 2;
						if (containerWidth < 1024) return 3;
						return 4;
					}}
					render={{
						image: renderNextImage,
					}}
				/>
			</Box>
		</Container>
	);
}
