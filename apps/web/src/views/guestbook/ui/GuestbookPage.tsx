'use client';

import { MessageForm, MessageWall } from '@/fsd/features/guestbook/ui';
import { LoadingSpinner } from '@/fsd/shared';
import { motion } from 'framer-motion';
import { Suspense } from 'react';
import * as styles from './GuestbookPage.css';

const GuestbookPage = () => {
	const containerAnimation = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				staggerChildren: 0.2,
			},
		},
	};

	const itemAnimation = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: 'spring',
				damping: 20,
				stiffness: 100,
			},
		},
	};

	return (
		<div className={styles.container}>
			<motion.div
				initial='hidden'
				animate='visible'
				variants={containerAnimation}
				className={styles.content}
			>
				<div className={styles.header}>
					<motion.h1 variants={itemAnimation} className={styles.title}>
						GuestBook
					</motion.h1>
					<motion.p variants={itemAnimation} className={styles.subtitle}>
						Share Your Thoughts ✨
					</motion.p>
				</div>

				<motion.div variants={itemAnimation}>
					<MessageForm />
				</motion.div>

				<motion.div variants={itemAnimation}>
					<Suspense fallback={<LoadingSpinner />}>
						<MessageWall />
					</Suspense>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default GuestbookPage;
