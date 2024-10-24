import { formatRelativeTime } from '@/fsd/shared/lib';
import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { FaEdit, FaRegComment, FaRegHeart, FaTrash } from 'react-icons/fa';
import CommentForm from './CommentForm';
import * as styles from './Comments.css';

interface CommentItemProps {
	comment: Comment;
	postId: string;
	isNested?: boolean;
	currentUser: User | null;
}

const CommentItem = ({
	comment,
	postId,
	isNested = false,
	currentUser,
}: CommentItemProps) => {
	const [isReplying, setIsReplying] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const isCommentOwner = currentUser?.id === comment.user.id;

	const handleIsEditing = () => {
		setIsEditing(!isEditing);
	};

	const handleDelete = () => {
		if (window.confirm('Are you sure you want to delete this comment?')) {
			// onDeleteComment(comment.id);
		}
	};

	return (
		<Box
			className={`${
				isNested ? styles.nestedCommentContainer : styles.commentContainer
			} ${isNested ? styles.nestedCommentItem : ''}`}
		>
			<Flex className={styles.commentHeader}>
				<Box
					as='img'
					loading='lazy'
					src={comment.user.avatar_url || ''}
					alt={comment.user.full_name}
					className={styles.userAvatar}
				/>
				<Flex direction='column'>
					<Typography.SubText level={2}>
						{comment.user.full_name}
					</Typography.SubText>
					<Typography.FootNote level={1} color='gray100'>
						{formatRelativeTime(comment.created_at)}
					</Typography.FootNote>
				</Flex>
			</Flex>
			{isEditing ? (
				<CommentForm
					postId={postId}
					commentId={comment.id}
					initialContent={comment.content}
					isEditing={isEditing}
					handleIsEditing={handleIsEditing}
				/>
			) : (
				<Typography.SubText className={styles.commentContent}>
					{comment.content}
				</Typography.SubText>
			)}
			<Flex className={styles.commentFooter}>
				<Flex>
					<Button
						className={`${styles.actionButton} ${styles.actionButtonHover}`}
					>
						<FaRegHeart size={12} style={{ marginRight: '4px' }} />
						{comment.likes}
					</Button>
					{!isNested && currentUser && (
						<Button
							className={`${styles.actionButton} ${styles.actionButtonHover}`}
							onClick={() => setIsReplying(!isReplying)}
						>
							<FaRegComment size={12} style={{ marginRight: '4px' }} />
							Reply
						</Button>
					)}
				</Flex>
				{isCommentOwner && (
					<Flex>
						<Button
							className={`${styles.actionButton} ${styles.actionButtonHover}`}
							onClick={handleIsEditing}
						>
							<FaEdit size={12} style={{ marginRight: '4px' }} />
							Edit
						</Button>
						<Button
							className={`${styles.actionButton} ${styles.actionButtonHover}`}
							onClick={handleDelete}
						>
							<FaTrash size={12} style={{ marginRight: '4px' }} />
							Delete
						</Button>
					</Flex>
				)}
			</Flex>
			{isReplying && (
				<Box>
					<CommentForm
						postId={postId}
						parentId={comment.id}
						placeholder='Write a reply...'
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
							postId={postId}
							isNested={true}
							currentUser={currentUser}
						/>
					))}
				</Box>
			)}
		</Box>
	);
};

export default CommentItem;
