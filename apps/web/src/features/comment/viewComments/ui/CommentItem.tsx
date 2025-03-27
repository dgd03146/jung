'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import { useState } from 'react';
import { FaEdit, FaRegComment } from 'react-icons/fa';

import { CommentUserInfo } from '@/fsd/entities';
import { CreateCommentForm } from '../../createComment/ui/CreateCommentForm';
import { DeleteCommentButton } from '../../deleteComment';
import { EditCommentForm } from '../../editComment/ui/EditCommentForm';
import { ToggleLikeCommentButton } from '../../toggleLikeComment';
import { COMMENT_MODES } from '../config/constants';

import type { CommentMode } from '../model/types';
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
	const [commentMode, setCommentMode] = useState<CommentMode>(
		COMMENT_MODES.DEFAULT,
	);
	const isCommentOwner = currentUser?.id === comment.user_id;

	const isLiked = currentUser
		? comment.liked_by.includes(currentUser.id)
		: false;

	const commentUpdatedAt = comment.updated_at || comment.created_at;
	const avatarUrl = comment.user.avatar_url || '/default-avatar.png';
	const userName = comment.user.full_name;

	const isReply = !isNested && currentUser;

	const isEditFormVisible = commentMode === COMMENT_MODES.EDITING;
	const canShowReplyButton = isReply && commentMode === COMMENT_MODES.DEFAULT;
	const canShowEditControls =
		isCommentOwner && commentMode === COMMENT_MODES.DEFAULT;
	const isReplyFormVisible = commentMode === COMMENT_MODES.REPLYING;
	const hasReplies = comment.replies && comment.replies.length > 0;

	const toggleMode = (mode: CommentMode) => {
		setCommentMode((prevMode) =>
			prevMode === mode ? COMMENT_MODES.DEFAULT : mode,
		);
	};

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
			{isEditFormVisible ? (
				<EditCommentForm
					commentId={comment.id}
					initialContent={comment.content}
					targetId={targetId}
					onSuccess={() => setCommentMode(COMMENT_MODES.DEFAULT)}
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
					{canShowReplyButton && (
						<Button
							variant='ghost'
							fontSize='xxs'
							onClick={() => toggleMode(COMMENT_MODES.REPLYING)}
						>
							<FaRegComment size={12} style={{ marginRight: '4px' }} />
							Reply
						</Button>
					)}
				</Flex>
				{canShowEditControls && (
					<Flex>
						<Button
							variant='ghost'
							fontSize='xxs'
							onClick={() => toggleMode(COMMENT_MODES.EDITING)}
						>
							<FaEdit size={12} style={{ marginRight: '4px' }} />
							Edit
						</Button>
						<DeleteCommentButton commentId={comment.id} targetId={targetId} />
					</Flex>
				)}
			</Flex>
			{isReplyFormVisible && (
				<Box>
					<CreateCommentForm
						targetId={targetId}
						parentId={comment.id}
						isReply={true}
						onCancel={() => setCommentMode(COMMENT_MODES.DEFAULT)}
					/>
				</Box>
			)}
			{hasReplies && (
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
