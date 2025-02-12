'use client';

import { Box, Typography } from '@jung/design-system';
import { motion } from 'framer-motion';
import { containerAnimation, contentAnimation } from '../config/animations';
import * as styles from './EmptyMessageWall.css';

export const EmptyMessageWall = () => {
	return (
		<motion.div
			initial={containerAnimation.initial}
			animate={containerAnimation.animate}
			transition={containerAnimation.transition}
			className={styles.emptyStateContainer}
		>
			<motion.div
				initial={contentAnimation.initial}
				animate={contentAnimation.animate}
				transition={contentAnimation.transition}
				className={styles.emptyStateContent}
			>
				<Box className={styles.emptyStateEmoji}>✨</Box>
				<Typography.Heading level={4}>
					Waiting for your first message
				</Typography.Heading>
				<Typography.Text>
					Make it feel special by leaving a message
				</Typography.Text>
			</motion.div>
		</motion.div>
	);
};
