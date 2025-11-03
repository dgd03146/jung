'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { Button, useToast } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleLikeCommentMutation } from '../../toggleLikeComment/model/useToggleLikeCommentMutation';

interface LikeCommentButtonProps {
	commentId: string;
	postId: string;
	isLiked: boolean;
	likesCount: number;
}

export const LikeCommentButton = ({
	commentId,
	postId,
	isLiked,
	likesCount,
}: LikeCommentButtonProps) => {
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const { toggleLike, isPending } = useToggleLikeCommentMutation();

	const handleClick = () => {
		if (!user) {
			showToast('Please log in to like comments', 'error');
			return;
		}

		toggleLike(
			{ commentId, postId, userId: user.id },
			{
				onError: () => {
					showToast('Failed to update like status. Please try again.', 'error');
				},
			},
		);
	};

	return (
		<Button
			variant='ghost'
			fontSize='xxs'
			onClick={handleClick}
			disabled={isPending}
		>
			{isLiked ? (
				<FaHeart size={12} style={{ marginRight: '4px', color: 'red' }} />
			) : (
				<FaRegHeart size={12} style={{ marginRight: '4px' }} />
			)}
			{isPending ? '...' : likesCount}
		</Button>
	);
};
