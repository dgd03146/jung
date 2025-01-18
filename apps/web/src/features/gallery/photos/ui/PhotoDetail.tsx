'use client';

import { BlurImage } from '@/fsd/shared';
import { formatDate } from '@/fsd/shared/lib';
import { Button, Flex, Tag, Typography } from '@jung/design-system/components';
import { AnimatePresence, motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import {
	useAdjacentPhotos,
	useKeyboardNavigation,
	useSharePhoto,
	useTogglePhotoLike,
} from '../model';

import * as styles from './PhotoDetail.css';
import { ShareModal } from './ShareModal';

interface PhotoDetailProps {
	id: string;
	isModal?: boolean;
}

const imageVariants = {
	hidden: {
		opacity: 0,
		scale: 1.01,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.4,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

const contentVariants = {
	hidden: {
		opacity: 0,
		y: 5,
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.3,
			ease: [0.16, 1, 0.3, 1],
			staggerChildren: 0.05,
		},
	},
};

export function PhotoDetail({ id, isModal }: PhotoDetailProps) {
	const { toggleLike, getIsLiked } = useTogglePhotoLike();
	const isLiked = getIsLiked(id);

	const { handleShare, isShareModalOpen, setIsShareModalOpen, getShareLinks } =
		useSharePhoto();

	const { currentPhoto, previousPhoto, nextPhoto } = useAdjacentPhotos({
		id,
		isModal,
	});

	const { handleNavigation } = useKeyboardNavigation({
		previousPhoto,
		nextPhoto,
		isModal,
	});

	return (
		<>
			<AnimatePresence mode='wait'>
				<motion.div
					key={`container-${id}`}
					initial='hidden'
					animate='visible'
					exit='exit'
				>
					<div className={styles.modalNavigationWrapper}>
						<div className={styles.modalNavigationButtonsContainer}>
							{previousPhoto && (
								<button
									onClick={() => handleNavigation(previousPhoto.id)}
									className={styles.modalNavigationButton}
									aria-label='previous photo (arrow left)'
								>
									<HiChevronLeft className={styles.modalNavigationIcon} />
								</button>
							)}
							{nextPhoto && (
								<button
									onClick={() => handleNavigation(nextPhoto.id)}
									className={styles.modalNavigationButton}
									aria-label='next photo (arrow right)'
								>
									<HiChevronRight className={styles.modalNavigationIcon} />
								</button>
							)}
						</div>
					</div>

					<motion.div
						className={
							isModal
								? `${styles.container} ${styles.modalContainer}`
								: styles.container
						}
					>
						<motion.div
							className={`
              ${styles.imageWrapper} 
              ${isModal ? styles.modalImageWrapper : ''}
            `}
							variants={imageVariants}
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
							className={`${styles.content} ${
								isModal ? styles.modalContent : ''
							}`}
							variants={contentVariants}
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

							<Flex gap='2'>
								{currentPhoto.tags?.map((tag) => (
									<Tag key={tag} variant='secondary'>
										<Typography.FootNote level={1}># {tag}</Typography.FootNote>
									</Tag>
								))}
							</Flex>

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
									<Button
										variant='ghost'
										color='primary'
										transition='fast'
										onClick={() => toggleLike(id)}
										aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
										className={styles.actionButton}
									>
										{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
									</Button>

									<Button
										variant='ghost'
										aria-label='Share photo'
										color='primary'
										transition='fast'
										className={styles.actionButton}
										onClick={() => handleShare(currentPhoto)}
									>
										<FaShareAlt size={16} />
									</Button>
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
					photo={currentPhoto}
					links={getShareLinks(currentPhoto)}
				/>
			)}
		</>
	);
}
