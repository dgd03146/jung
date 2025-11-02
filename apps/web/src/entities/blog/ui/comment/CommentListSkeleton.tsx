import { Box, Container, Flex } from '@jung/design-system/components';
import React from 'react';
import * as styles from './CommentListSkeleton.css';

const CommentSkeleton = ({ isReply = false }: { isReply?: boolean }) => (
	<Box
		className={
			isReply ? styles.skeletonReplyContainer : styles.skeletonCommentContainer
		}
	>
		<Flex alignItems='center' marginBottom='3' gap='2'>
			<Box className={styles.skeletonAvatar} />
			<Flex direction='column'>
				<Box className={styles.skeletonUserName} />
				<Box className={styles.skeletonContent} style={{ width: '80px' }} />
			</Flex>
		</Flex>
		<Box className={styles.skeletonContent} style={{ width: '100%' }} />
		<Box className={styles.skeletonContent} style={{ width: '80%' }} />
		<Flex justify='space-between' align='center' marginTop='3'>
			<Flex>
				<Box className={styles.skeletonAction} />
				<Box className={styles.skeletonAction} />
			</Flex>
		</Flex>
	</Box>
);

export const CommentListSkeleton = () => (
	<Container marginY='20'>
		<Flex columnGap='4' alignItems='center' marginBottom='4'>
			<Box className={styles.skeletonAction} />
			<Box className={styles.skeletonAction} />
		</Flex>

		{[...Array(3)].map((_, index) => (
			<React.Fragment key={index}>
				<CommentSkeleton />
				{index === 0 && (
					<>
						<CommentSkeleton isReply />
						<CommentSkeleton isReply />
					</>
				)}
			</React.Fragment>
		))}
	</Container>
);
