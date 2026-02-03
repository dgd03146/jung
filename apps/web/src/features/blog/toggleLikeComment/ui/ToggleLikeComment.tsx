'use client';

import { Button, useToast } from '@jung/design-system/components';
import { useAnonymousId } from '@jung/shared/hooks';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToggleLikeCommentMutation } from '../model/useToggleLikeCommentMutation';

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
	const { anonymousId } = useAnonymousId();
	const showToast = useToast();
	const { toggleLike, isPending } = useToggleLikeCommentMutation();

	const handleClick = () => {
		const identifier = user?.id || anonymousId;

		if (!identifier) {
			showToast('잠시 후 다시 시도해주세요.', 'error');
			return;
		}

		toggleLike(
			{
				commentId,
				postId: targetId,
				userId: user?.id,
				anonymousId: user ? undefined : anonymousId || undefined,
			},
			{
				onError: () => {
					showToast('좋아요 처리에 실패했습니다.', 'error');
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
