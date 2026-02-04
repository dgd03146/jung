'use client';

import { Box } from '@jung/design-system';
import { useAnonymousId } from '@jung/shared/hooks';
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
	const { anonymousId } = useAnonymousId();

	const isNested = !!comment.parent_id;
	const isOwner = currentUserId === comment.user_id;
	const isAnonymous = comment.user.is_anonymous;
	const isAnonymousOwner = isAnonymous && comment.anonymous_id === anonymousId;
	const isLiked = currentUserId
		? comment.liked_by.includes(currentUserId)
		: anonymousId
			? comment.liked_by.includes(anonymousId)
			: false;
	const canReply = !isNested && (!!currentUserId || !!anonymousId);

	return (
		<CommentItem
			comment={comment}
			isNested={isNested}
			className={isNested ? styles.nestedCommentItem : ''}
		>
			<CommentActions
				comment={comment}
				postId={postId}
				postTitle={postTitle}
				isLiked={isLiked}
				canReply={canReply}
				isOwner={isOwner}
				isAnonymousOwner={isAnonymousOwner}
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
