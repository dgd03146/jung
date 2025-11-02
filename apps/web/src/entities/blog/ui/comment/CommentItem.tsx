'use client';

import { Box, Typography } from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import type React from 'react';
import * as styles from './CommentItem.css';
import { CommentUserInfo } from './CommentUserInfo';

interface CommentItemProps {
	comment: Comment;
	isNested?: boolean;
	actions?: React.ReactNode;
	className?: string;
}

export const CommentItem = ({
	comment,
	isNested = false,
	actions,
	className = '',
}: CommentItemProps) => {
	const containerClassName = `${
		isNested ? styles.nestedCommentContainer : styles.commentContainer
	} ${className}`;

	const commentUpdatedAt = comment.updated_at || comment.created_at;
	const avatarUrl = comment.user.avatar_url || '/default-avatar.png';
	const userName = comment.user.full_name;

	return (
		<Box className={containerClassName}>
			<CommentUserInfo
				avatarUrl={avatarUrl}
				userName={userName}
				createdAt={commentUpdatedAt}
			/>

			<Typography.SubText className={styles.commentContent}>
				{comment.content}
			</Typography.SubText>

			{actions}
		</Box>
	);
};
