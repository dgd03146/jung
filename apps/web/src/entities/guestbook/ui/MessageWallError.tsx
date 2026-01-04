'use client';

import { motion } from 'motion/react';
import { FiAlertCircle } from 'react-icons/fi';
import * as styles from './MessageWallError.css';

interface MessageWallErrorProps {
	error: Error;
	onReset?: () => void;
}

export const MessageWallError = ({ error, onReset }: MessageWallErrorProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className={styles.container}
		>
			<motion.div
				initial={{ scale: 0.8 }}
				animate={{ scale: 1 }}
				transition={{
					type: 'spring' as const,
					stiffness: 260,
					damping: 20,
					delay: 0.2,
				}}
				className={styles.content}
			>
				<div className={styles.iconWrapper}>
					<FiAlertCircle size={28} />
				</div>
				<h3 className={styles.title}>Unable to Load Guestbook</h3>
				<p className={styles.description}>Please try again in a moment</p>
				<p className={styles.errorMessage}>{error.message}</p>
				{onReset && (
					<motion.button
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						onClick={onReset}
						className={styles.refreshButton}
					>
						Refresh
					</motion.button>
				)}
			</motion.div>
		</motion.div>
	);
};
