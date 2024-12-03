'use client';

import { BlurImage } from '@/fsd/shared';
import {
	Box,
	Grid,
	GridItem,
	Typography,
} from '@jung/design-system/components';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import * as styles from './CollectionGrid.css';

interface Collection {
	id: string;
	title: string;
	description: string;
	coverImage: string;
	photoCount: number;
}

interface CollectionGridProps {
	collections: Collection[];
}

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: {
		opacity: 0,
		y: 40,
		rotateX: 45,
		scale: 0.9,
	},
	visible: {
		opacity: 1,
		y: 0,
		rotateX: 0,
		scale: 1,
		transition: {
			type: 'spring',
			stiffness: 100,
			damping: 20,
			mass: 0.8,
		},
	},
};

function Card({
	collection,
	index,
}: {
	collection: Collection;
	index: number;
}) {
	const cardRef = useRef<HTMLDivElement>(null);
	const rotateX = useMotionValue(0);
	const rotateY = useMotionValue(0);
	const transformX = useTransform(rotateY, [-10, 10], ['25px', '-25px']);
	const transformY = useTransform(rotateX, [-10, 10], ['25px', '-25px']);

	function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
		if (!cardRef.current) return;

		const card = cardRef.current;
		const rect = card.getBoundingClientRect();
		const centerX = rect.left + rect.width / 2;
		const centerY = rect.top + rect.height / 2;
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		const rotateXValue = ((mouseY - centerY) / (rect.height / 2)) * -10;
		const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 10;

		animate(rotateX, rotateXValue, { duration: 0.2 });
		animate(rotateY, rotateYValue, { duration: 0.2 });
	}

	function handleMouseLeave() {
		animate(rotateX, 0, { duration: 0.5 });
		animate(rotateY, 0, { duration: 0.5 });
	}

	return (
		<motion.div
			ref={cardRef}
			variants={itemVariants}
			className={styles.motionWrapper}
			style={{
				rotateX,
				rotateY,
				transformStyle: 'preserve-3d',
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<motion.div
				style={{
					translateX: transformX,
					translateY: transformY,
				}}
			>
				<Box className={styles.imageWrapper}>
					<BlurImage
						src={collection.coverImage}
						alt={collection.title}
						fill
						sizes='(max-width: 768px) 50vw, 33vw'
					/>
					<Box className={styles.overlay}>
						<Typography.Text level={2} color='white'>
							{collection.title}
						</Typography.Text>
						<Typography.SubText level={3} color='gray100'>
							{collection.photoCount} photos
						</Typography.SubText>
					</Box>
				</Box>
			</motion.div>
		</motion.div>
	);
}

export function CollectionGrid({ collections }: CollectionGridProps) {
	return (
		<motion.div initial='hidden' animate='visible' variants={containerVariants}>
			<Grid
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					desktop: '1/3',
				}}
				gap='6'
			>
				{collections.map((collection, index) => (
					<GridItem key={collection.id} colStart='auto' colEnd='auto'>
						<Link
							href={`/gallery/collections/${collection.id}`}
							className={styles.gridLink}
						>
							<Card collection={collection} index={index} />
						</Link>
					</GridItem>
				))}
			</Grid>
		</motion.div>
	);
}
