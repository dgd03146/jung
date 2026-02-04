'use client';

import { Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import {
	AnonymousCommentActions,
	DeleteCommentButton,
	EditCommentButton,
	LikeCommentButton,
	ReplyCommentButton,
} from '@/fsd/features/blog';

interface CommentActionsProps {
	comment: Comment;
	postId: string;
	postTitle: string;
	isLiked: boolean;
	canReply: boolean;
	isOwner: boolean;
	isAnonymousOwner: boolean;
}

export const CommentActions = ({
	comment,
	postId,
	postTitle,
	isLiked,
	canReply,
	isOwner,
	isAnonymousOwner,
}: CommentActionsProps) => {
	return (
		<Flex justify='space-between' align='center' marginTop='4'>
			<Flex gap='2'>
				<LikeCommentButton
					commentId={comment.id}
					postId={postId}
					isLiked={isLiked}
					likesCount={comment.likes}
				/>
				<ReplyCommentButton
					commentId={comment.id}
					postId={postId}
					postTitle={postTitle}
					canShow={canReply}
				/>
			</Flex>

			{isOwner && (
				<Flex gap='2'>
					<EditCommentButton
						commentId={comment.id}
						initialContent={comment.content}
						postId={postId}
						canShow={isOwner}
					/>
					<DeleteCommentButton commentId={comment.id} postId={postId} />
				</Flex>
			)}

			{isAnonymousOwner && (
				<Flex gap='2'>
					<AnonymousCommentActions
						comment={comment}
						postId={postId}
						canShow={isAnonymousOwner}
					/>
				</Flex>
			)}
		</Flex>
	);
};
