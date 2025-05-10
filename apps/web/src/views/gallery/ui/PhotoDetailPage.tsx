'use client';

import {
	NavigatePhotoButtons,
	ShareModal,
	SharePhotoButton,
	ToggleLikePhotoButton,
	useSharePhoto,
} from '@/fsd/features/photo';
import { AnimatePresence, motion } from 'framer-motion';

import {
	// PHOTO_DEFAULTS, // useInitialPhotoDetail 훅 내부에서 사용
	PhotoTags,
	usePhotoQuery,
} from '@/fsd/entities/photo';
// 새로 만든 커스텀 훅 import (경로 수정)
import { useInitialPhotoDetail } from '@/fsd/entities/photo/model/useInitialPhotoDetail';
import { BlurImage, formatDate } from '@/fsd/shared';
import { Flex, Typography } from '@jung/design-system/components';

import { assignInlineVars } from '@vanilla-extract/dynamic';
import { photoDetailVariants } from '../config/animations';
import { useImageSizes } from '../model/useImageSizes';
import * as styles from './PhotoDetailPage.css';

import { usePhotoFilter } from '@/fsd/views/gallery';

interface PhotoDetailPageProps {
	photoId: string;
	isModal?: boolean;
}

export const PhotoDetailPage = ({ photoId, isModal }: PhotoDetailPageProps) => {
	const { sort, collectionId } = usePhotoFilter();

	const initialData = useInitialPhotoDetail({
		photoId,
		sort,
		collectionId,
	});

	const { data: currentPhoto } = usePhotoQuery(photoId, {
		initialData: initialData,
	});

	const { handleShare, isShareModalOpen, setIsShareModalOpen, getShareLinks } =
		useSharePhoto();

	const { imageSizes } = useImageSizes({
		width: currentPhoto?.width || 1,
		height: currentPhoto?.height || 1,
		isModal,
	});

	return (
		<>
			<AnimatePresence mode='wait'>
				<motion.div
					key={`container-${photoId}`}
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					{isModal && (
						<NavigatePhotoButtons photoId={photoId} isModal={isModal} />
					)}

					<motion.div className={styles.container({ isModal })}>
						<motion.div
							className={styles.imageWrapper({ isModal })}
							variants={photoDetailVariants.image}
							style={assignInlineVars({
								[styles.aspectRatioVar]: `${currentPhoto.width} / ${currentPhoto.height}`,
							})}
						>
							<BlurImage
								src={currentPhoto.image_url}
								alt={currentPhoto.alt}
								style={{ objectFit: 'contain' }}
								fill
								sizes={imageSizes}
							/>
						</motion.div>

						<motion.div
							className={styles.content({ isModal })}
							variants={photoDetailVariants.content}
						>
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
									<ToggleLikePhotoButton photoId={photoId} />
									<SharePhotoButton
										photo={currentPhoto}
										onShare={handleShare}
									/>
								</Flex>
							</Flex>
						</motion.div>
					</motion.div>
				</motion.div>
			</AnimatePresence>

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
