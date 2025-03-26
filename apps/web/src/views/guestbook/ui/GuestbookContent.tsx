'use client';

import { MessageList, useMessagesQuery } from '@/fsd/entities/message';

import { LoadingSpinner, useInfiniteScroll } from '@/fsd/shared';
import { Box } from '@jung/design-system/components';
import { motion } from 'framer-motion';
import { animations } from '../config/animations';

export const GuestbookContent = () => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useMessagesQuery();
	const messages = data.pages.flatMap((page) => page.items) ?? [];

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<>
			<motion.div variants={animations.fadeInUp}>
				<MessageList messages={messages} />
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
		</>
	);
};
