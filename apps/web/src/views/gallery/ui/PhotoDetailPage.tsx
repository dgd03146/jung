'use client';

import { Flex, Typography } from '@jung/design-system/components';
import { getImageUrl } from '@jung/shared/lib';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useRef } from 'react';
import {
	PhotoTags,
	usePhotoLikeQuery,
	usePhotoQuery,
} from '@/fsd/entities/gallery';
import {
	SharePhotoButton,
	ToggleLikePhotoButton,
} from '@/fsd/features/gallery';
import { BlurImage, formatDate } from '@/fsd/shared';
import { useAspectRatio } from '../model/useAspectRatio';
import { useImageSizes } from '../model/useImageSizes';
import * as styles from './PhotoDetailPage.css';

interface PhotoDetailPageProps {
	photoId: string;
}

export const PhotoDetailPage = ({ photoId }: PhotoDetailPageProps) => {
	const { data: currentPhoto } = usePhotoQuery(photoId);
	const { data: likeInfo } = usePhotoLikeQuery(photoId);

	const containerRef = useRef<HTMLDivElement>(null);

	const { ratio: aspectRatio, cssValue: aspectRatioForCss } =
		useAspectRatio(currentPhoto);

	const { imageSizes } = useImageSizes({
		containerRef,
		aspectRatio,
	});

	return (
		<div key={`container-${photoId}`}>
			<div className={styles.container}>
				<div
					className={styles.imageWrapper}
					style={assignInlineVars({
						[styles.aspectRatioVar]: aspectRatioForCss,
					})}
					ref={containerRef}
				>
					<BlurImage
						src={getImageUrl(currentPhoto.image_url)}
						alt={currentPhoto.alt}
						className={styles.image}
						fill
						sizes={imageSizes}
						priority
					/>
				</div>

				<div className={styles.content}>
					<span className={styles.exhibitionDate}>
						{formatDate(currentPhoto.created_at)}
					</span>

					<h1 className={styles.exhibitionTitle}>{currentPhoto.title}</h1>

					{currentPhoto.description && (
						<p className={styles.exhibitionDesc}>{currentPhoto.description}</p>
					)}

					<PhotoTags tags={currentPhoto.tags} />

					<Flex
						className={styles.likesContainer}
						paddingY='4'
						justify='space-between'
						align='center'
						borderColor='primary50'
						borderStyle='solid'
					>
						<Typography.Text level={4} color='primary'>
							{likeInfo?.likes ?? currentPhoto.likes} likes
						</Typography.Text>

						<Flex gap='4'>
							<ToggleLikePhotoButton photoId={photoId} />
							<SharePhotoButton photo={currentPhoto} />
						</Flex>
					</Flex>
				</div>
			</div>
		</div>
	);
};
