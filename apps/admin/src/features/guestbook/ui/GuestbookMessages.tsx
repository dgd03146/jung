import {
	Box,
	Button,
	Flex,
	Grid,
	Stack,
	Typography,
} from '@jung/design-system/components';
import type { GuestbookMessage } from '@jung/shared/types';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { HiCheck, HiTrash, HiXMark } from 'react-icons/hi2';
import * as styles from './GuestbookMessages.css';

export const GuestbookMessages = () => {
	const [messages, setMessages] = useState<GuestbookMessage[]>([
		{
			id: '123e4567-e89b-12d3-a456-426614174000',
			content: 'Love this website! Keep up the great work! 👍',
			author_id: 'user-123',
			author_name: 'John Smith',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
			created_at: '2024-03-15T10:00:00Z',
			background_color: '#E8F5E9',
			emoji: '👍',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174001',
			content: 'Amazing experience using this platform! ⭐',
			author_id: 'user-124',
			author_name: 'Emma Wilson',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
			created_at: '2024-03-15T09:30:00Z',
			background_color: '#E3F2FD',
			emoji: '⭐',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174002',
			content: 'The interface is so intuitive and user-friendly! 🎯',
			author_id: 'user-125',
			author_name: 'Michael Chen',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
			created_at: '2024-03-15T09:00:00Z',
			background_color: '#F3E5F5',
			emoji: '🎯',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174003',
			content: 'Great community here! Thanks for creating this space 🙏',
			author_id: 'user-126',
			author_name: 'Sarah Kim',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
			created_at: '2024-03-14T23:45:00Z',
			background_color: '#FFF3E0',
			emoji: '🙏',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174004',
			content: 'Looking forward to future updates! 🚀',
			author_id: 'user-127',
			author_name: 'David Park',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
			created_at: '2024-03-14T22:15:00Z',
			background_color: '#E1F5FE',
			emoji: '🚀',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174005',
			content: 'Such a helpful resource for developers! 💻',
			author_id: 'user-128',
			author_name: 'Lisa Johnson',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
			created_at: '2024-03-14T21:30:00Z',
			background_color: '#F1F8E9',
			emoji: '💻',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174006',
			content: 'The design is absolutely beautiful! 🎨',
			author_id: 'user-129',
			author_name: 'Tom Wilson',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tom',
			created_at: '2024-03-14T20:45:00Z',
			background_color: '#FCE4EC',
			emoji: '🎨',
		},
		{
			id: '123e4567-e89b-12d3-a456-426614174007',
			content: 'Really impressed with the performance! ⚡',
			author_id: 'user-130',
			author_name: 'Anna Lee',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
			created_at: '2024-03-14T19:20:00Z',
			background_color: '#FFFDE7',
			emoji: '⚡',
		},

		{
			id: '123e4567-e89b-12d3-a456-426614174009',
			content: 'Loving the new features! Keep innovating! 🎉',
			author_id: 'user-132',
			author_name: 'Sophie Chen',
			author_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie',
			created_at: '2024-03-14T17:30:00Z',
			background_color: '#F3E5F5',
			emoji: '🎉',
		},
	]);

	const handleApprove = (id: string) => {
		setMessages((prev) => prev.filter((m) => m.id !== id));
	};

	const handleReject = (id: string) => {
		setMessages((prev) => prev.filter((m) => m.id !== id));
	};

	const handleDelete = (id: string) => {
		setMessages((prev) => prev.filter((m) => m.id !== id));
	};

	return (
		<Stack flexDirection='column' gap='6'>
			<Grid className={styles.statsSection}>
				<Box className={styles.statCard}>
					<Typography.Heading level={4} color='primary' fontWeight='medium'>
						{messages.length}
					</Typography.Heading>
					<Typography.SubText level={1}>Total Messages</Typography.SubText>
				</Box>
				<Box className={styles.statCard}>
					<Typography.Heading level={4} color='primary' fontWeight='medium'>
						{
							messages.filter(
								(m) =>
									new Date(m.created_at).toDateString() ===
									new Date().toDateString(),
							).length
						}
					</Typography.Heading>
					<Typography.SubText level={1}>Today</Typography.SubText>
				</Box>
			</Grid>

			<Box className={styles.mainSection}>
				<Flex
					paddingY='5'
					paddingX='6'
					justify='space-between'
					align='center'
					borderStyle='solid'
					borderColor='primary50'
					borderBottomWidth='hairline'
				>
					<Typography.Heading level={4} color='primary'>
						Guestbook Messages
					</Typography.Heading>
				</Flex>

				<Stack gap='4' padding='6'>
					<AnimatePresence>
						{messages.map((message) => (
							<motion.div
								key={message.id}
								initial={{ opacity: 0, y: -20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								className={styles.listViewItem}
								style={assignInlineVars({
									[styles.backgroundColor]: message.background_color || 'white',
								})}
							>
								<Flex align='center' gap='4' paddingX='4'>
									<Box padding='4' flex='1'>
										<Flex align='center' gap='3' marginBottom='2'>
											<Box
												as='img'
												src={message.author_avatar}
												alt={message.author_name}
												width='8'
												height='8'
												borderRadius='half'
												objectFit='cover'
											/>
											<Typography.SubText>
												{message.author_name}
											</Typography.SubText>
											<Typography.SubText color='gray300'>
												{new Date(message.created_at).toLocaleDateString()}
											</Typography.SubText>
										</Flex>
										<Typography.Text level={3}>
											{message.emoji && (
												<Typography.SubText as='span' level={2} marginRight='2'>
													{message.emoji}
												</Typography.SubText>
											)}
											{message.content}
										</Typography.Text>
									</Box>
									<Flex gap='2' paddingY='3' paddingX='4'>
										<Button
											className={styles.actionButton}
											data-variant='approve'
											title='Approve message'
											onClick={() => handleApprove(message.id)}
										>
											<HiCheck className={styles.actionIcon} />
										</Button>
										<Button
											className={styles.actionButton}
											data-variant='reject'
											title='Reject message'
											onClick={() => handleReject(message.id)}
										>
											<HiXMark className={styles.actionIcon} />
										</Button>
										<Button
											className={styles.actionButton}
											data-variant='delete'
											title='Delete message'
											onClick={() => handleDelete(message.id)}
										>
											<HiTrash className={styles.actionIcon} />
										</Button>
									</Flex>
								</Flex>
							</motion.div>
						))}
					</AnimatePresence>
				</Stack>
			</Box>
		</Stack>
	);
};
