'use client';

import {
	NavigatePhotoButtons,
	ShareModal,
	SharePhotoButton,
	ToggleLikePhotoButton,
	useSharePhoto,
} from '@/fsd/features/photo';
import { AnimatePresence, motion } from 'framer-motion';

import { PhotoTags, usePhotoQuery } from '@/fsd/entities/photo';
import { BlurImage, formatDate } from '@/fsd/shared';
import { Flex, Typography } from '@jung/design-system/components';

import { photoDetailVariants } from '../config/animations';
import * as styles from './PhotoDetailPage.css';

interface PhotoDetailPageProps {
	photoId: string;
	isModal?: boolean;
}

export const PhotoDetailPage = ({ photoId, isModal }: PhotoDetailPageProps) => {
	const { data: currentPhoto } = usePhotoQuery(photoId);
	const { handleShare, isShareModalOpen, setIsShareModalOpen, getShareLinks } =
		useSharePhoto();

	return (
		<>
			<AnimatePresence mode='wait'>
				<motion.div
					key={`container-${photoId}`}
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					{isModal && <NavigatePhotoButtons photoId={photoId} isModal />}

					<motion.div className={styles.container({ isModal })}>
						<motion.div
							className={styles.imageWrapper({ isModal })}
							variants={photoDetailVariants.image}
						>
							<BlurImage
								src={currentPhoto.image_url}
								alt={currentPhoto.alt}
								priority
								fill
								sizes='(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 840px'
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
