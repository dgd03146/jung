'use client';

import { BlurImage, LoadingSpinner, MotionCard } from '@/fsd/shared';
import { Box, Container, Typography } from '@jung/design-system/components';
import type { CustomPhoto } from '@jung/shared/types';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
	MasonryPhotoAlbum,
	type RenderImageContext,
	type RenderImageProps,
} from 'react-photo-album';
import 'react-photo-album/masonry.css';
import { useGetPhotos } from '../api';
import * as styles from './PhotoList.css';

const renderNextImage = (
	{ alt = '', sizes }: RenderImageProps,
	{ photo, width, height }: RenderImageContext<CustomPhoto>,
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

const PhotoList = () => {
	const { ref, inView } = useInView();
	const [data, { fetchNextPage, hasNextPage, isFetchingNextPage }] =
		useGetPhotos({
			sort: 'latest',
			q: '',
		});

	const photos = data?.pages.flatMap((page) => page.items) ?? [];

	// FIXME: 백에서 처리하도록 수정
	const formattedPhotos: CustomPhoto[] = photos.map((photo) => ({
		key: `list-${photo.id}`,
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

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	return (
		<Container>
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

			<Box ref={ref} minHeight='10'>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Box>
		</Container>
	);
};

export default PhotoList;
