'use client';

import { useSupabaseAuth } from '@/fsd/shared';
import { Button, useToast } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleLikeComment } from '../model/useToggleLikeComment';

interface ToggleLikeCommentButtonProps {
	commentId: string;
	targetId: string;
	isLiked: boolean;
	likesCount: number;
}

export const ToggleLikeCommentButton = ({
	commentId,
	targetId,
	isLiked,
	likesCount,
}: ToggleLikeCommentButtonProps) => {
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const { toggleLike, isPending } = useToggleLikeComment();

	const handleClick = () => {
		if (!user) {
			showToast('Please log in to like comments', 'error');
			return;
		}

		toggleLike(
			{ commentId, postId: targetId, userId: user.id },
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
