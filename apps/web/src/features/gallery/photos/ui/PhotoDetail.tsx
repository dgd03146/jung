// PhotoDetail.tsx
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
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShareAlt } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi2';
import * as styles from './PhotoDetail.css';

interface PhotoDetailProps {
	id: string;
	isModal?: boolean;
}

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			duration: 0.4,
			ease: [0.22, 1, 0.36, 1],
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const imageVariants = {
	hidden: { opacity: 0, scale: 1.02 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

const contentVariants = {
	hidden: { opacity: 0, x: 10 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
			staggerChildren: 0.08,
		},
	},
};

const mockPhoto = {
	id: '40',
	image_url: 'https://images.unsplash.com/photo-1731484636246-ba9365148d60',
	alt: 'Random photo',
	width: 1200,
	height: 800,
	title: '아름다운 풍경',
	description: '자연의 아름다움을 담은 한 컷',
	created_at: '2024-03-15',
	views: 1234,
	likes: 567,
	tags: ['nature', 'landscape', 'photography'],
};

export function PhotoDetail({ id, isModal }: PhotoDetailProps) {
	const photo = mockPhoto;
	const [isLiked, setIsLiked] = useState(false);

	const handleLikeClick = () => {
		setIsLiked(!isLiked);
		// TODO: API 호출
	};

	const handleShareClick = () => {
		// TODO: 공유 기능 구현
	};

	return (
		<AnimatePresence>
			<motion.div
				variants={containerVariants}
				initial='hidden'
				animate='visible'
				exit='exit'
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
						src={photo.image_url}
						alt={photo.alt}
						fill
						priority
						sizes='(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 840px'
					/>
				</motion.div>

				<motion.div
					className={`${styles.content} ${isModal ? styles.modalContent : ''}`}
					variants={contentVariants}
				>
					<Box className={styles.header}>
						<Typography.Heading level={4}>{photo.title}</Typography.Heading>
						<Typography.SubText level={3} color='gray100'>
							{formatDate(photo.created_at)}
						</Typography.SubText>
					</Box>

					<Box className={styles.description}>
						<Typography.Text level={3}>{photo.description}</Typography.Text>
					</Box>

					<Box className={styles.interactionSection}>
						<Box className={styles.stats}>
							<Box display='flex' alignItems='center' columnGap='1'>
								<HiOutlineEye size={18} />
								<Typography.SubText level={3} color='gray100'>
									{photo.views.toLocaleString()}
								</Typography.SubText>
							</Box>
							<Flex align='center' gap='1'>
								<FaHeart size={16} />
								<Typography.SubText level={3} color='gray100'>
									{photo.likes.toLocaleString()}
								</Typography.SubText>
							</Flex>
						</Box>

						<Flex gap='2'>
							<Button
								variant='ghost'
								onClick={() => setIsLiked(!isLiked)}
								aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
								className={styles.actionButton}
							>
								{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
							</Button>
							<Button
								variant='ghost'
								aria-label='Share photo'
								className={styles.actionButton}
							>
								<FaShareAlt size={18} />
							</Button>
						</Flex>
					</Box>

					<Flex gap='2'>
						{photo.tags.map((tag) => (
							<Tag key={tag} rounded>
								#{tag}
							</Tag>
						))}
					</Flex>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
