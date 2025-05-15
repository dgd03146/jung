'use client';

import {
	NavigatePhotoButtons,
	ShareModal,
	SharePhotoButton,
	ToggleLikePhotoButton,
	useSharePhoto,
} from '@/fsd/features/photo';

import { PhotoTags, usePhotoQuery } from '@/fsd/entities/photo';
import { BlurImage, formatDate } from '@/fsd/shared';
import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Flex, Typography } from '@jung/design-system/components';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { useImageSizes } from '../model/useImageSizes';
import * as styles from './PhotoDetailPage.css';

interface PhotoDetailPageProps {
	photoId: string;
	isModal?: boolean;
}

export const PhotoDetailPage = ({ photoId, isModal }: PhotoDetailPageProps) => {
	const { data: currentPhoto } = usePhotoQuery(photoId);
	const { user } = useSupabaseAuth();

	const { imageSizes, containerRef } = useImageSizes({
		width: currentPhoto?.width || 0,
		height: currentPhoto?.height || 0,
		isModal,
	});

	const { handleShare, isShareModalOpen, setIsShareModalOpen, getShareLinks } =
		useSharePhoto();

	const isInitiallyLiked =
		user && currentPhoto.liked_by
			? currentPhoto.liked_by.includes(user.id)
			: false;

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
							[styles.aspectRatioVar]: `${currentPhoto.width} / ${currentPhoto.height}`,
						})}
						ref={containerRef}
					>
						<BlurImage
							src={currentPhoto.image_url}
							alt={currentPhoto.alt}
							className={styles.image}
							fill
							sizes={imageSizes}
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
									isInitiallyLiked={isInitiallyLiked}
								/>
								<SharePhotoButton photo={currentPhoto} onShare={handleShare} />
							</Flex>
						</Flex>
					</div>
				</div>
			</div>

			{isShareModalOpen && (
				<ShareModal
					isOpen={isShareModalOpen}
					onClose={() => setIsShareModalOpen(false)}
					links={getShareLinks(currentPhoto)}
				/>
			)}
		</>
	);
};
