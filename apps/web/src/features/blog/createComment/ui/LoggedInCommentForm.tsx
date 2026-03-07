'use client';

import {
	Box,
	Button,
	Flex,
	Stack,
	Textarea,
	Typography,
} from '@jung/design-system/components';
import type { User } from '@supabase/supabase-js';
import { useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { getUserDisplayName, useTrackEvent } from '@/fsd/shared';
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
	const [newComment, setNewComment] = useState('');

	const handleSubmitSuccess = () => {
		setNewComment('');
		onSuccess?.();
	};

	const { submitComment, isPending } =
		useCreateCommentMutation(handleSubmitSuccess);
	const { trackEvent } = useTrackEvent();
	const userAvatar = user.user_metadata?.avatar_url;

	const handleSubmit = () => {
		trackEvent({
			event_name: 'create_comment',
			event_category: 'engagement',
			resource_type: 'post',
			resource_id: postId,
			properties: { is_reply: !!parentId },
		});
		submitComment({ postId, parentId, content: newComment, postTitle });
	};

	const handleCancel = () => {
		setNewComment('');
		onCancel?.();
	};

	return (
		<Box className={styles.commentContainer} marginBottom='4'>
			<Flex gap='4' align='flex-start'>
				{!isReply && (
					<Stack align='center'>
						{userAvatar ? (
							<Box
								as='img'
								src={userAvatar}
								alt='User Avatar'
								className={styles.userAvatar}
							/>
						) : (
							<div className={styles.defaultAvatar}>
								<IoPerson size={16} />
							</div>
						)}
						<Typography.FootNote level={1}>
							{getUserDisplayName(user)}
						</Typography.FootNote>
					</Stack>
				)}
				<Box flex={1}>
					<Textarea
						borderRadius='md'
						fontSize='xs'
						fontWeight='normal'
						placeholder='Write a comment...'
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
							disabled={isPending}
						>
							{isReply ? 'Reply' : 'Submit'}
						</Button>
					</Flex>
				</Box>
			</Flex>
		</Box>
	);
};
