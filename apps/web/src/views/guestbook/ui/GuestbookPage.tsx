'use client';

import {
	MessageList,
	MessageWallError,
	useMessagesQuery,
} from '@/fsd/entities/message';
import { CreateMessageForm } from '@/fsd/features/message';

import { LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';
import {
	Box,
	Container,
	Stack,
	Typography,
} from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import { motion } from 'framer-motion';
import { Suspense } from 'react';

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

const GuestbookPage = () => {
	const [data, { fetchNextPage, hasNextPage, isFetchingNextPage }] =
		useMessagesQuery();
	const messages = data.pages.flatMap((page) => page.items) ?? [];

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<Container position='relative' marginX='auto'>
			<Stack
				gap={{ base: '6', laptop: '10' }}
				align='center'
				marginY={{ base: '6', laptop: '10' }}
			>
				<Typography.Heading level={4} color='primary'>
					Leave your message 💙
				</Typography.Heading>
				<motion.div variants={itemAnimation}>
					<CreateMessageForm />
				</motion.div>
			</Stack>

			<motion.div variants={itemAnimation}>
				<ErrorBoundary fallback={(error) => <MessageWallError error={error} />}>
					<Suspense fallback={<LoadingSpinner />}>
						<MessageList messages={messages} />
					</Suspense>
				</ErrorBoundary>
			</motion.div>
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

export default GuestbookPage;
