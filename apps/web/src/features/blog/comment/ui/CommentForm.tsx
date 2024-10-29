import { SocialLogin } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import {
	Box,
	Button,
	Flex,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system';
import { useState } from 'react';
import { useCreateComment, useUpdateComment } from '../model';
import * as styles from './CommentList.css';

interface CommentFormProps {
	postId: string;
	parentId?: string;
	commentId?: string;
	initialContent?: string;
	placeholder?: string;
	isReply?: boolean;
	isEditing?: boolean;
	handleIsEditing?: () => void;
}

const CommentForm = ({
	postId,
	parentId,
	placeholder = 'Write a comment...',
	commentId,
	initialContent,
	isReply = false,
	isEditing = false,
	handleIsEditing,
}: CommentFormProps) => {
	const showToast = useToast();

	const { session, user, signOut } = useSupabaseAuth();
	const { newComment, setNewComment, submitComment } = useCreateComment();
	const updateComment = useUpdateComment();

	const [updatedComment, setUpdatedComment] = useState(initialContent);

	const handleSubmit = async () => {
		const commentContent = isEditing ? updatedComment : newComment;
		if (!commentContent || commentContent.trim() === '') {
			showToast('Please enter a comment.', 'error');
			return;
		}

		if (isEditing && commentId) {
			updateComment(commentId, commentContent, postId);
			handleIsEditing?.();
		} else {
			submitComment(postId, parentId);
		}
	};

	return (
		<Box
			className={
				isReply ? styles.nestedCommentContainer : styles.commentContainer
			}
			marginBottom='4'
		>
			{session ? (
				<Flex className={styles.commentInputContainer}>
					{!isReply && !isEditing && (
						<Box className={styles.userInfoContainer}>
							<Box
								as='img'
								src={user?.user_metadata?.avatar_url || '/default-avatar.png'}
								alt='User Avatar'
								className={styles.userAvatar}
							/>
							<Typography.SubText level={2}>
								{user?.user_metadata?.full_name ||
									user?.email?.split('@')[0] ||
									'User'}
							</Typography.SubText>
						</Box>
					)}
					<Box className={styles.textareaContainer}>
						<Textarea
							className={styles.textarea}
							placeholder={placeholder}
							value={isEditing ? updatedComment : newComment}
							onChange={(e) =>
								isEditing
									? setUpdatedComment(e.target.value)
									: setNewComment(e.target.value)
							}
							rows={isReply || isEditing ? 2 : 4}
						/>
						<Flex className={styles.buttonContainer}>
							{!isEditing && (
								<Button onClick={signOut} className={styles.signOutButton}>
									Sign Out
								</Button>
							)}
							{isEditing && (
								<Button
									onClick={handleIsEditing}
									className={styles.signOutButton}
								>
									Cancel
								</Button>
							)}
							<Button onClick={handleSubmit} className={styles.submitButton}>
								{isEditing ? 'Update' : isReply ? 'Reply' : 'Submit'}
							</Button>
						</Flex>
					</Box>
				</Flex>
			) : (
				<>
					<Textarea
						className={styles.textarea}
						placeholder='Sign in to write a comment'
						disabled
						rows={4}
					/>
					<SocialLogin />
				</>
			)}
		</Box>
	);
};

export default CommentForm;
