'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { Box, Button, Flex, Typography } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import { useState } from 'react';
import { FaEdit, FaRegComment } from 'react-icons/fa';

import { CommentUserInfo } from '@/fsd/entities';
import { CreateCommentForm } from '../../createComment/ui/CreateCommentForm';
import { DeleteCommentButton } from '../../deleteComment';
import { EditCommentForm } from '../../editComment/ui/EditCommentForm';
import { ToggleLikeCommentButton } from '../../toggleLikeComment';
import * as styles from './CommentItem.css';

interface CommentItemProps {
	comment: Comment;
	targetId: string;
	isNested?: boolean;
}

export const CommentItem = ({
	comment,
	targetId,
	isNested = false,
}: CommentItemProps) => {
	const { user: currentUser } = useSupabaseAuth();
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const isCommentOwner = currentUser?.id === comment.user_id;

	const isLiked = currentUser
		? comment.liked_by.includes(currentUser.id)
		: false;

	const handleIsEditing = () => {
		setIsEditing(!isEditing);
	};

	const commentUpdatedAt = comment.updated_at || comment.created_at;
	const avatarUrl = comment.user.avatar_url || '/default-avatar.png';
	const userName = comment.user.full_name;

	const isReply = !isNested && currentUser;

	return (
		<Box
			className={`${
				isNested ? styles.nestedCommentContainer : styles.commentContainer
			} ${isNested ? styles.nestedCommentItem : ''}`}
		>
			<CommentUserInfo
				avatarUrl={avatarUrl}
				userName={userName}
				createdAt={commentUpdatedAt}
			/>
			{isEditing ? (
				<EditCommentForm
					commentId={comment.id}
					initialContent={comment.content}
					targetId={targetId}
					onSuccess={handleIsEditing}
				/>
			) : (
				<Typography.SubText className={styles.commentContent}>
					{comment.content}
				</Typography.SubText>
			)}
			<Flex justify='space-between' align='center' marginTop='4'>
				<Flex>
					<ToggleLikeCommentButton
						commentId={comment.id}
						targetId={targetId}
						isLiked={isLiked}
						likesCount={comment.likes}
					/>
					{isReply && (
						<Button
							variant='ghost'
							fontSize='xxs'
							onClick={() => setIsReplying(!isReplying)}
						>
							<FaRegComment size={12} style={{ marginRight: '4px' }} />
							Reply
						</Button>
					)}
				</Flex>
				{isCommentOwner && (
					<Flex>
						<Button variant='ghost' fontSize='xxs' onClick={handleIsEditing}>
							<FaEdit size={12} style={{ marginRight: '4px' }} />
							Edit
						</Button>
						<DeleteCommentButton commentId={comment.id} targetId={targetId} />
					</Flex>
				)}
			</Flex>
			{isReplying && (
				<Box>
					<CreateCommentForm
						targetId={targetId}
						parentId={comment.id}
						isReply={true}
					/>
				</Box>
			)}
			{comment.replies && comment.replies.length > 0 && (
				<Box className={styles.replyContainer}>
					{comment.replies.map((reply) => (
						<CommentItem
							key={reply.id}
							comment={reply}
							targetId={targetId}
							isNested={true}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};
