'use client';

import {
	MessageForm,
	MessageWall,
	MessageWallError,
} from '@/fsd/features/guestbook/ui';
import { LoadingSpinner } from '@/fsd/shared';
import { Container, Stack, Typography } from '@jung/design-system/components';
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
	return (
		<Container position='relative'>
			<Stack space='10' align='center'>
				<Typography.Heading color='primary'>GuestBook</Typography.Heading>
				<Typography.Heading level={4} color='primary'>
					Share Your Thoughts ✨
				</Typography.Heading>
			</Stack>

			<motion.div variants={itemAnimation}>
				<MessageForm />
			</motion.div>

			<motion.div variants={itemAnimation}>
				<ErrorBoundary fallback={(error) => <MessageWallError error={error} />}>
					<Suspense fallback={<LoadingSpinner />}>
						<MessageWall />
					</Suspense>
				</ErrorBoundary>
			</motion.div>
		</Container>
	);
};

export default GuestbookPage;
