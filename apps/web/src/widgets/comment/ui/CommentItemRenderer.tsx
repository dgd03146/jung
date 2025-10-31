'use client';

import { CommentItem } from '@/fsd/entities/comment';
import * as styles from '@/fsd/entities/comment/ui/CommentItem.css';
import {
	CreateCommentForm,
	DeleteCommentButton,
	EditCommentForm,
	useToggleLikeCommentMutation,
} from '@/fsd/features/comment';
import { Box, Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';

interface CommentItemRendererProps {
	comment: Comment;
	postId: string;
	currentUser: User | null;
	postTitle: string;
}

export const CommentItemRenderer = ({
	comment,
	postId,
	currentUser,
	postTitle,
}: CommentItemRendererProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [isReplying, setIsReplying] = useState(false);

	const { toggleLike, isPending: isLiking } = useToggleLikeCommentMutation();

	const isNested = !!comment.parent_id;

	const isOwner = currentUser?.id === comment.user_id;
	const isLiked = currentUser
		? comment.liked_by.includes(currentUser.id)
		: false;

	const canShowReplyButton = !isNested && currentUser;

	const handleToggleEdit = () => setIsEditing((prev) => !prev);
	const handleToggleReply = () => setIsReplying((prev) => !prev);

	const renderReplies = () => {
		if (!comment.replies || comment.replies.length === 0) {
			return null;
		}
		return (
			<Box className={styles.replyContainer}>
				{comment.replies.map((reply) => (
					<CommentItemRenderer
						key={reply.id}
						comment={reply}
						postId={postId}
						currentUser={currentUser}
						postTitle={postTitle}
					/>
				))}
			</Box>
		);
	};

	return (
		<CommentItem
			key={comment.id}
			comment={comment}
			isNested={isNested}
			className={isNested ? styles.nestedCommentItem : ''}
		>
			<CommentItem.UserInfo />

			{isEditing && isOwner ? (
				<EditCommentForm
					commentId={comment.id}
					initialContent={comment.content}
					postId={postId}
					onSuccess={handleToggleEdit}
					onCancel={handleToggleEdit}
				/>
			) : (
				<CommentItem.Content />
			)}

			<CommentItem.Actions>
				<Flex>
					<CommentItem.LikeButtonUI
						onClick={() =>
							currentUser &&
							toggleLike({
								commentId: comment.id,
								postId,
								userId: currentUser.id,
							})
						}
						isLoading={isLiking}
						isLiked={isLiked}
						likesCount={comment.likes}
						disabled={!currentUser || isLiking}
					/>
					{canShowReplyButton && (
						<CommentItem.ReplyButtonUI onClick={handleToggleReply} />
					)}
				</Flex>

				{isOwner && (
					<Flex>
						{!isEditing && (
							<CommentItem.EditButtonUI onClick={handleToggleEdit} />
						)}
						<DeleteCommentButton commentId={comment.id} postId={postId} />
					</Flex>
				)}
			</CommentItem.Actions>

			{isReplying && (
				<CreateCommentForm
					postId={postId}
					postTitle={postTitle}
					parentId={comment.id}
					isReply={true}
					onCancel={handleToggleReply}
				/>
			)}

			{renderReplies()}
		</CommentItem>
	);
};
