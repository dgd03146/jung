'use client';

import { Box, Typography } from '@jung/design-system/components';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { containerAnimation, contentAnimation } from '../config/animations';
import * as styles from './EmptyMessageWall.css';

export const EmptyMessageWall = () => {
	const t = useTranslations('empty');

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
				<Typography.Heading level={4}>{t('guestbook')}</Typography.Heading>
				<Typography.Text>{t('guestbookDesc')}</Typography.Text>
			</motion.div>
		</motion.div>
	);
};
