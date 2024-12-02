'use client';

import { BlurImage } from '@/fsd/shared';
import { formatDate } from '@/fsd/shared/lib';
import {
	Box,
	Button,
	Flex,
	Tag,
	Typography,
} from '@jung/design-system/components';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { HiArrowLeft, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
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
					{isModal ? (
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
					) : (
						<div className={styles.backLinkWrapper}>
							<Link
								href='/gallery'
								className={styles.backLink}
								aria-label='Back to gallery'
							>
								<HiArrowLeft size={24} />
								<span>Gallery</span>
							</Link>
						</div>
					)}

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
							<Box className={styles.header}>
								<Typography.Text level={1}>
									{currentPhoto.title}
								</Typography.Text>
							</Box>

							<Box className={styles.description}>
								<Typography.Text level={3}>
									{currentPhoto.description}
								</Typography.Text>
							</Box>

							<Typography.SubText level={3} color='primary200'>
								{currentPhoto.likes} likes
							</Typography.SubText>

							<Flex gap='2'>
								{currentPhoto.tags?.map((tag) => (
									<Tag key={tag} rounded>
										#{tag}
									</Tag>
								))}
							</Flex>

							<Box className={styles.interactionSection}>
								<Typography.SubText level={3} color='gray100'>
									{formatDate(currentPhoto.created_at)}
								</Typography.SubText>

								<Flex gap='2'>
									<Button
										variant='ghost'
										onClick={() => toggleLike(id)}
										aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
										className={styles.actionButton}
									>
										{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
									</Button>

									<Button
										variant='ghost'
										aria-label='Share photo'
										className={styles.actionButton}
										onClick={() => handleShare(currentPhoto)}
									>
										<FaShareAlt size={18} />
									</Button>
								</Flex>
							</Box>
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
