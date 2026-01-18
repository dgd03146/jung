'use client';

import { Flex } from '@jung/design-system';
import {
	DeleteCommentButton,
	EditCommentButton,
	LikeCommentButton,
	ReplyCommentButton,
} from '@/fsd/features/blog';

interface CommentActionsProps {
	commentId: string;
	postId: string;
	postTitle: string;
	content: string;
	isLiked: boolean;
	likesCount: number;
	canReply: boolean;
	isOwner: boolean;
}

export const CommentActions = ({
	commentId,
	postId,
	postTitle,
	content,
	isLiked,
	likesCount,
	canReply,
	isOwner,
}: CommentActionsProps) => {
	return (
		<Flex justify='space-between' align='center' marginTop='4'>
			<Flex gap='2'>
				<LikeCommentButton
					commentId={commentId}
					postId={postId}
					isLiked={isLiked}
					likesCount={likesCount}
				/>
				<ReplyCommentButton
					commentId={commentId}
					postId={postId}
					postTitle={postTitle}
					canShow={canReply}
				/>
			</Flex>

			{isOwner && (
				<Flex gap='2'>
					<EditCommentButton
						commentId={commentId}
						initialContent={content}
						postId={postId}
						canShow={isOwner}
					/>
					<DeleteCommentButton commentId={commentId} postId={postId} />
				</Flex>
			)}
		</Flex>
	);
};
