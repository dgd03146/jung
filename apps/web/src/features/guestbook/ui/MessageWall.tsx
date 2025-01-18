'use client';

import { LoadingSpinner } from '@/fsd/shared';
import { Box, Container, Grid, Typography } from '@jung/design-system';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useGetGuestbookMessages } from '../api';
import * as styles from './MessageWall.css';

import { useEffect } from 'react';
import { MessageCard } from './MessageCard';

export const MessageWall = () => {
	const { ref, inView } = useInView();
	const [data, { fetchNextPage, hasNextPage, isFetchingNextPage }] =
		useGetGuestbookMessages();

	const messages = data?.pages.flatMap((page) => page.items) ?? [];

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (!messages || messages.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className={styles.emptyStateContainer}
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
	}

	return (
		<Container marginY='10'>
			<Grid
				gap='4'
				paddingY='4'
				marginX='auto'
				className={styles.messageWallContainer}
			>
				{messages.map((message, index) => (
					<MessageCard key={message.id} message={message} index={index} />
				))}
			</Grid>
			<Box
				margin='auto'
				ref={ref}
				width='full'
				minHeight='10'
				display='flex'
				justifyContent='center'
				paddingY='4'
			>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Box>
		</Container>
	);
};
