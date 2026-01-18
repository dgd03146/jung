'use client';

import {
	Box,
	Button,
	Flex,
	Stack,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system/components';
import type { User } from '@supabase/supabase-js';
import { getUserDisplayName } from '@/fsd/shared';
import { useCreateCommentMutation } from '../model/useCreateCommentMutation';
import * as styles from './CreateCommentForm.css';

interface LoggedInCommentFormProps {
	postId: string;
	postTitle: string;
	user: User;
	parentId?: string;
	isReply?: boolean;
	onSuccess?: () => void;
	onCancel?: () => void;
	onSignOut: () => void;
}

export const LoggedInCommentForm = ({
	postId,
	postTitle,
	user,
	parentId,
	isReply = false,
	onSuccess,
	onCancel,
	onSignOut,
}: LoggedInCommentFormProps) => {
	const showToast = useToast();
	const { newComment, setNewComment, submitComment } =
		useCreateCommentMutation(onSuccess);
	const userAvatar = user.user_metadata?.avatar_url || '/default-avatar.png';

	const handleSubmit = () => {
		if (!newComment || newComment.trim() === '') {
			showToast('Please enter a comment.', 'error');
			return;
		}
		submitComment({ postId, parentId, newComment, postTitle });
	};

	const handleCancel = () => {
		setNewComment('');
		onCancel?.();
	};

	return (
		<Box
			className={
				isReply ? styles.nestedCommentContainer : styles.commentContainer
			}
			marginBottom='4'
		>
			<Flex gap='4' align='flex-start'>
				{!isReply && (
					<Stack align='center'>
						<Box
							as='img'
							src={userAvatar}
							alt='User Avatar'
							className={styles.userAvatar}
						/>
						<Typography.SubText level={2}>
							{getUserDisplayName(user)}
						</Typography.SubText>
					</Stack>
				)}
				<Box flex={1}>
					<Textarea
						borderRadius='md'
						fontSize='sm'
						placeholder={isReply ? 'Write a reply...' : 'Write a comment...'}
						value={newComment}
						onChange={(e) => setNewComment(e.target.value)}
						rows={isReply ? 2 : 4}
					/>
					<Flex justify='flex-end' gap='3' marginTop='3'>
						{isReply ? (
							<Button
								variant='outline'
								borderRadius='md'
								fontSize='xs'
								onClick={handleCancel}
							>
								Cancel
							</Button>
						) : (
							<Button
								variant='outline'
								borderRadius='md'
								fontSize='xs'
								onClick={onSignOut}
							>
								Sign Out
							</Button>
						)}
						<Button
							variant='primary'
							borderRadius='md'
							fontSize='xs'
							onClick={handleSubmit}
						>
							{isReply ? 'Reply' : 'Submit'}
						</Button>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
