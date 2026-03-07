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
	isLiked: boolean;
	canReply: boolean;
	isOwner: boolean;
	isAnonymousOwner: boolean;
	onReply: () => void;
}

export const CommentActions = ({
	comment,
	postId,
	isLiked,
	canReply,
	isOwner,
	isAnonymousOwner,
	onReply,
}: CommentActionsProps) => {
	return (
		<Flex justify='space-between' align='center' marginTop='4'>
			<Flex gap='2'>
				<LikeCommentButton
					commentId={comment.id}
					targetId={postId}
					isLiked={isLiked}
					likesCount={comment.likes}
				/>
				<ReplyCommentButton canShow={canReply} onReply={onReply} />
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
