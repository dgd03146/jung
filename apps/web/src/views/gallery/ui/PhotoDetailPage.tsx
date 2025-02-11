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
	const [currentPhoto] = usePhotoQuery(photoId);
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
					{isModal && <NavigatePhotoButtons photoId={photoId} />}

					<motion.div className={styles.container({ isModal })}>
						<motion.div
							className={styles.imageWrapper({ isModal })}
							variants={photoDetailVariants.image}
						>
							<BlurImage
								src={currentPhoto.image_url}
								alt={currentPhoto.alt}
								fill
								priority
								sizes='(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 840px'
							/>
						</motion.div>

						<motion.div
							className={styles.content({ isModal })}
							variants={photoDetailVariants.content}
						>
							<Flex gap='1' flexDirection='column'>
								<Typography.Heading level={4}>
									{currentPhoto.title}
								</Typography.Heading>
							</Flex>

							<Typography.Text level={1} fontWeight='medium'>
								{currentPhoto.description}
							</Typography.Text>

							<Typography.SubText level={3} color='primary'>
								{formatDate(currentPhoto.created_at)}
							</Typography.SubText>

							<PhotoTags tags={currentPhoto.tags} />

							<Flex
								paddingY='4'
								justify='space-between'
								align='center'
								borderTopWidth='hairline'
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
