'use client';

import { Button } from '@jung/design-system/components';
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
	const toggleLikeComment = useToggleLikeComment();

	return (
		<Button
			variant='ghost'
			fontSize='xxs'
			onClick={() => toggleLikeComment(commentId, targetId)}
		>
			{isLiked ? (
				<FaHeart size={12} style={{ marginRight: '4px', color: 'red' }} />
			) : (
				<FaRegHeart size={12} style={{ marginRight: '4px' }} />
			)}
			{likesCount}
		</Button>
	);
};
