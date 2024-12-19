'use client';

import { LoadingSpinner } from '@/fsd/shared';
import { Box } from '@jung/design-system';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { motion } from 'framer-motion';
import * as styles from './MessageWall.css';

export interface Message {
	id: string;
	content: string;
	author: {
		name: string;
		avatar: string;
	};
	createdAt: string;
	backgroundColor?:
		| '#FFFFFF'
		| '#FFF3E0'
		| '#E8F5E9'
		| '#E3F2FD'
		| '#F3E5F5'
		| '#FFF8E1'
		| '#E0F7FA';
	likes: number;
	emoji?: string;
}

const COLORS = [
	'#FFF3E0', // 연한 주황
	'#E8F5E9', // 연한 초록
	'#E3F2FD', // 연한 파랑
	'#F3E5F5', // 연한 보라
	'#FFF8E1', // 연한 노랑
	'#E0F7FA', // 연한 청록
] as const;

const EMOJIS = ['💖', '✨', '👻', '🎉', '👋', '🙌', '💫', '💭', '💀', '👽'];

// 하드코딩된 mock messages
export const MOCK_MESSAGES: Message[] = [
	{
		id: '1',
		content: '안녕하세요! 이곳은 정말 멋진 공간이에요.',
		author: {
			name: '홍길동',
			avatar: 'https://i.pravatar.cc/150?img=1',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[0],
		likes: 10,
		emoji: EMOJIS[0],
	},
	{
		id: '2',
		content: '여기서 좋은 추억을 만들고 싶어요!',
		author: {
			name: '김철수',
			avatar: 'https://i.pravatar.cc/150?img=2',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[1],
		likes: 5,
		emoji: EMOJIS[1],
	},
	{
		id: '3',
		content: '이 공간이 너무 마음에 들어요!',
		author: {
			name: '이영희',
			avatar: 'https://i.pravatar.cc/150?img=3',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[2],
		likes: 8,
		emoji: EMOJIS[2],
	},
	{
		id: '4',
		content: '모두에게 행복이 가득하길 바랍니다!',
		author: {
			name: '박지민',
			avatar: 'https://i.pravatar.cc/150?img=4',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[3],
		likes: 12,
		emoji: EMOJIS[3],
	},
	{
		id: '5',
		content: '여기서 많은 사람들과 소통하고 싶어요!',
		author: {
			name: '최민수',
			avatar: 'https://i.pravatar.cc/150?img=5',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[4],
		likes: 15,
		emoji: EMOJIS[4],
	},
	{
		id: '6',
		content: '이곳에서 좋은 사람들을 만나고 싶어요!',
		author: {
			name: '정수빈',
			avatar: 'https://i.pravatar.cc/150?img=6',
		},
		createdAt: new Date().toISOString(),
		backgroundColor: COLORS[5],
		likes: 20,
		emoji: EMOJIS[5],
	},
];

const MessageCard = ({
	message,
	index,
}: {
	message: Message;
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
				backgroundColor: message.backgroundColor,
			})}
		>
			{message.emoji && (
				<div className={styles.messageEmoji}>{message.emoji}</div>
			)}

			<div className={styles.messageHeader}>
				<img
					src={message.author.avatar}
					alt={message.author.name}
					className={styles.avatar}
				/>
				<div className={styles.authorInfo}>
					<div className={styles.authorName}>{message.author.name}</div>
					<div className={styles.messageDate}>
						{new Date(message.createdAt).toLocaleDateString()}
					</div>
				</div>
			</div>

			<div className={styles.messageContent}>{message.content}</div>
		</motion.div>
	);
};

export const MessageWall = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [page, setPage] = useState(1);
	const { ref, inView } = useInView();

	// Mock infinite scroll
	useEffect(() => {
		if (inView && messages.length < MOCK_MESSAGES.length) {
			setTimeout(() => {
				const nextMessages = MOCK_MESSAGES.slice(
					messages.length,
					messages.length + 6,
				);
				setMessages((prev) => [...prev, ...nextMessages]);
				setPage((prev) => prev + 1);
			}, 1000);
		}
	}, [inView, messages.length]);

	// Initial load
	useEffect(() => {
		setMessages(MOCK_MESSAGES.slice(0, 6));
	}, []);

	return (
		<div className={styles.messageWallContainer}>
			{messages.map((message, index) => (
				<MessageCard key={message.id} message={message} index={index} />
			))}
			<Box
				ref={ref}
				minHeight='10'
				display='flex'
				justifyContent='center'
				paddingY='4'
			>
				{inView && messages.length < MOCK_MESSAGES.length && (
					<LoadingSpinner size='small' />
				)}
			</Box>
		</div>
	);
};
