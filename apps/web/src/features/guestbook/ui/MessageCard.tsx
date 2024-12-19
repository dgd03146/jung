import { DEFAULT_BACKGROUND_COLOR, type GuestbookColor } from '../config';

import { formatDate } from '@/fsd/shared';
import type { GuestbookMessage } from '@jung/shared/types';
import { motion } from 'framer-motion';
import * as styles from './MessageWall.css';

export const MessageCard = ({
	message,
	index,
}: {
	message: GuestbookMessage;
	index: number;
}) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{
				duration: 0.3,
				delay: index * 0.05,
				ease: 'easeOut',
			}}
			className={styles.messageCard({
				backgroundColor:
					(message.background_color as GuestbookColor) ||
					DEFAULT_BACKGROUND_COLOR,
			})}
		>
			{message.emoji && (
				<div className={styles.messageEmoji}>{message.emoji}</div>
			)}

			<div className={styles.messageHeader}>
				<img
					src={message.author_avatar}
					alt={message.author_name}
					className={styles.avatar}
				/>
				<div className={styles.authorInfo}>
					<div className={styles.authorName}>{message.author_name}</div>
					<div className={styles.messageDate}>
						{formatDate(message.created_at)}
					</div>
				</div>
			</div>

			<div className={styles.messageContent}>{message.content}</div>
		</motion.div>
	);
};
