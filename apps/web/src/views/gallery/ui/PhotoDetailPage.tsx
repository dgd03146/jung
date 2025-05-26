'use client';

import {
	NavigatePhotoButtons,
	SharePhotoButton,
	ToggleLikePhotoButton,
} from '@/fsd/features/photo';

import { PhotoTags, usePhotoQuery } from '@/fsd/entities/photo';
import { BlurImage, formatDate } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Flex, Typography } from '@jung/design-system/components';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useMemo, useRef } from 'react';
import { useImageSizes } from '../model/useImageSizes';
import * as styles from './PhotoDetailPage.css';

const FALLBACK_ASPECT_RATIO = 4 / 3;

interface PhotoDetailPageProps {
	photoId: string;
	isModal?: boolean;
}

export const PhotoDetailPage = ({ photoId, isModal }: PhotoDetailPageProps) => {
	const { data: currentPhoto } = usePhotoQuery(photoId, {
		staleTime: Number.POSITIVE_INFINITY,
		gcTime: 24 * 60 * 60 * 1000,
	});
	const { user } = useSupabaseAuth();
	const containerRef = useRef<HTMLDivElement>(null);

	const aspectRatio = useMemo(() => {
		if (
			currentPhoto.width &&
			currentPhoto.height &&
			currentPhoto.height !== 0
		) {
			return currentPhoto.width / currentPhoto.height;
		}
		return FALLBACK_ASPECT_RATIO;
	}, [currentPhoto]);

	const aspectRatioForCss = useMemo(() => {
		if (
			currentPhoto.width &&
			currentPhoto.height &&
			currentPhoto.height !== 0
		) {
			return `${currentPhoto.width} / ${currentPhoto.height}`;
		}
		return `${Math.round(FALLBACK_ASPECT_RATIO * 100)} / 100`;
	}, [currentPhoto]);

	const { imageSizes } = useImageSizes({
		containerRef,
		aspectRatio,
		isModal,
	});

	return (
		<>
			<div key={`container-${photoId}`}>
				{isModal && (
					<NavigatePhotoButtons photoId={photoId} isModal={isModal} />
				)}

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
							priority={isModal}
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
								{currentPhoto.likes} likes
							</Typography.Text>

							<Flex gap='4'>
								<ToggleLikePhotoButton
									photoId={photoId}
									likedBy={currentPhoto.liked_by}
									likesCount={currentPhoto.likes}
								/>
								<SharePhotoButton photo={currentPhoto} />
							</Flex>
						</Flex>
					</div>
				</div>
			</div>
		</>
	);
};
