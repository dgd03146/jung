import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import { FaRegComment, FaRegHeart } from 'react-icons/fa';
import * as styles from './Comments.css';

import { formatRelativeTime } from '@/fsd/shared/lib';
import type { Comment } from '../model/comment';

interface CommentItemProps {
	comment: Comment;
	isReply?: boolean;
}

const CommentItem = ({ comment, isReply = false }: CommentItemProps) => (
	<Box className={isReply ? styles.replyContainer : styles.commentContainer}>
		<Flex className={styles.commentHeader}>
			<Box
				as='img'
				loading='lazy'
				src={comment.userProfileImage}
				alt={comment.userName}
				className={styles.userAvatar}
			/>
			<Flex direction='column'>
				<Typography.SubText level={2}>{comment.userName}</Typography.SubText>
				<Typography.FootNote level={1} color='gray100'>
					{formatRelativeTime(comment.createdAt)}
				</Typography.FootNote>
			</Flex>
		</Flex>
		<Typography.SubText className={styles.commentContent}>
			{comment.content}
		</Typography.SubText>
		<Flex className={styles.commentFooter}>
			<Flex>
				<Button
					className={`${styles.actionButton} ${styles.actionButtonHover}`}
				>
					<FaRegHeart size={12} style={{ marginRight: '4px' }} />
					{comment.likes}
				</Button>
				<Button
					className={`${styles.actionButton} ${styles.actionButtonHover}`}
				>
					<FaRegComment size={12} style={{ marginRight: '4px' }} />
					답글
				</Button>
			</Flex>
		</Flex>
		{comment.replies?.map((reply) => (
			<CommentItem key={reply.id} comment={reply} isReply={true} />
		))}
	</Box>
);

export default CommentItem;
