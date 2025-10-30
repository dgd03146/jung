'use client';

import { SocialLoginButtons } from '@/fsd/features/auth';
import { getUserDisplayName, useSupabaseAuth } from '@/fsd/shared';
import {
	Box,
	Button,
	Flex,
	Stack,
	Textarea,
	Typography,
	useToast,
} from '@jung/design-system/components';

import { useCreateCommentMutation } from '../model/useCreateCommentMutation';
import * as styles from './CreateCommentForm.css';

interface CreateCommentFormProps {
	postId: string;
	parentId?: string;
	isReply?: boolean;
	postTitle: string;
	onCancel?: () => void;
}

export const CreateCommentForm = ({
	postId,
	postTitle,
	parentId,
	isReply = false,
	onCancel,
}: CreateCommentFormProps) => {
	const showToast = useToast();
	const { session, user, signOut } = useSupabaseAuth();
	const { newComment, setNewComment, submitComment } =
		useCreateCommentMutation();
	const userAvatar = user?.user_metadata?.avatar_url || '/default-avatar.png';

	const handleSubmit = () => {
		if (!newComment || newComment.trim() === '') {
			showToast('Please enter a comment.', 'error');
			return;
		}

		onCancel?.();
		submitComment({ postId, parentId, newComment, postTitle });
	};

	return (
		<Box
			className={
				isReply ? styles.nestedCommentContainer : styles.commentContainer
			}
			marginBottom='4'
		>
			{session && user ? (
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
							{!isReply && (
								<Button
									variant='outline'
									borderRadius='md'
									fontSize='xs'
									onClick={signOut}
								>
									Sign Out
								</Button>
							)}
							{isReply && (
								<Button
									variant='outline'
									borderRadius='md'
									fontSize='xs'
									onClick={onCancel}
								>
									Cancel
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
			) : (
				<>
					<Textarea
						borderRadius='md'
						fontSize='sm'
						placeholder='Sign in to write a comment'
						disabled
						rows={4}
					/>
					<SocialLoginButtons />
				</>
			)}
		</Box>
	);
};
