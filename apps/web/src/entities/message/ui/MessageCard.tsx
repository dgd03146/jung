'use client';

import { formatDate } from '@/fsd/shared';
import { Box, Flex, Stack, Typography } from '@jung/design-system/components';
import type { GuestbookMessage } from '@jung/shared/types';
import { motion } from 'framer-motion';
import { DEFAULT_BACKGROUND_COLOR } from '../config/guestbook';
import type { GuestbookColor } from '../model/guestbook';
import * as styles from './MessageCard.css';

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
				<Box className={styles.messageEmoji}>{message.emoji}</Box>
			)}

			<Flex gap='2' marginBottom='5'>
				<Box
					as='img'
					src={message.author_avatar}
					alt={message.author_name}
					className={styles.avatar}
				/>
				<Stack>
					<Typography.Text level={4}>{message.author_name}</Typography.Text>
					<Typography.FootNote level={2} color='primary200'>
						{formatDate(message.created_at)}
					</Typography.FootNote>
				</Stack>
			</Flex>

			<Typography.Text level={3} color='black100'>
				{message.content}
			</Typography.Text>
		</motion.div>
	);
};
