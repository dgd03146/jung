import { motion } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import * as styles from './MessageWallError.css';

interface MessageWallErrorProps {
	error: Error;
}

export const MessageWallError = ({ error }: MessageWallErrorProps) => {
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
					type: 'spring',
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
				<motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					onClick={() => window.location.reload()}
					className={styles.refreshButton}
				>
					Refresh
				</motion.button>
			</motion.div>
		</motion.div>
	);
};
