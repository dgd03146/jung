'use client';

import { Box } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import { CommentItem } from '@/fsd/entities/blog';
import { CommentActions } from './CommentActions';
import * as styles from './CommentSection.css';

interface RecursiveCommentProps {
	comment: Comment;
	postId: string;
	postTitle: string;
	currentUserId?: string;
}

export const RecursiveComment = ({
	comment,
	postId,
	postTitle,
	currentUserId,
}: RecursiveCommentProps) => {
	const isNested = !!comment.parent_id;
	const isOwner = currentUserId === comment.user_id;
	const isLiked = currentUserId
		? comment.liked_by.includes(currentUserId)
		: false;
	const canReply = !isNested && !!currentUserId;

	return (
		<CommentItem
			comment={comment}
			isNested={isNested}
			className={isNested ? styles.nestedCommentItem : ''}
		>
			<CommentActions
				commentId={comment.id}
				postId={postId}
				postTitle={postTitle}
				content={comment.content}
				isLiked={isLiked}
				likesCount={comment.likes}
				canReply={canReply}
				isOwner={isOwner}
			/>

			{comment.replies && comment.replies.length > 0 && (
				<Box className={styles.replyContainer}>
					{comment.replies.map((reply) => (
						<RecursiveComment
							key={reply.id}
							comment={reply}
							postId={postId}
							postTitle={postTitle}
							currentUserId={currentUserId}
						/>
					))}
				</Box>
			)}
		</CommentItem>
	);
};
