'use client';

import { Flex, Typography } from '@jung/design-system/components';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useRef } from 'react';
import {
	PhotoTags,
	usePhotoLikeQuery,
	usePhotoQuery,
} from '@/fsd/entities/gallery';
import {
	NavigatePhotoButtons,
	SharePhotoButton,
	ToggleLikePhotoButton,
} from '@/fsd/features/gallery';
import { BlurImage, formatDate } from '@/fsd/shared';
import { useAspectRatio } from '../model/useAspectRatio';
import { useImageSizes } from '../model/useImageSizes';
import * as styles from './PhotoDetailPage.css';

interface PhotoDetailPageProps {
	photoId: string;
	isModal?: boolean;
}

export const PhotoDetailPage = ({ photoId, isModal }: PhotoDetailPageProps) => {
	const { data: currentPhoto } = usePhotoQuery(photoId);
	const { data: likeInfo } = usePhotoLikeQuery(photoId);

	const containerRef = useRef<HTMLDivElement>(null);

	const { ratio: aspectRatio, cssValue: aspectRatioForCss } =
		useAspectRatio(currentPhoto);

	const { imageSizes } = useImageSizes({
		containerRef,
		aspectRatio,
		isModal,
	});

	return (
		<div key={`container-${photoId}`}>
			{isModal && <NavigatePhotoButtons photoId={photoId} isModal={isModal} />}

			<div className={styles.container({ isModal })}>
				<div
					className={styles.imageWrapper({ isModal })}
					style={assignInlineVars({
						[styles.aspectRatioVar]: aspectRatioForCss,
					})}
					ref={containerRef}
				>
					<BlurImage
						src={currentPhoto.image_url}
						alt={currentPhoto.alt}
						className={styles.image}
						fill
						sizes={imageSizes}
						priority
					/>
				</div>

				<div className={styles.content({ isModal })}>
					<Typography.Text level={2} fontWeight='semibold'>
						{currentPhoto.title}
					</Typography.Text>

					<Typography.SubText level={2}>
						{currentPhoto.description}
					</Typography.SubText>

					<Typography.SubText level={3} color='primary'>
						{formatDate(currentPhoto.created_at)}
					</Typography.SubText>

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
