'use client';

import { useSpotLikeQuery } from '@/fsd/entities/spot';
import { LoginModal } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import { Button, useToast } from '@jung/design-system/components';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleSpotLike } from '../api/useToggleSpotLike';
import * as styles from './ToggleSpotLikeButton.css';

interface ToggleSpotLikeButtonProps {
	spotId: string;
}

export function ToggleSpotLikeButton({ spotId }: ToggleSpotLikeButtonProps) {
	const { toggleLike, isPending } = useToggleSpotLike();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		useSpotLikeQuery(spotId);

	const isLiked = !!(user && likeInfo?.liked_by?.includes(user.id));

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();

		if (!user || !user.id) {
			setIsLoginModalOpen(true);
			return;
		}

		toggleLike(
			{ spotId, userId: user.id },
			{
				onError: () => {
					showToast('Failed to update like status. Please try again.', 'error');
				},
			},
		);
	};

	return (
		<>
			<Button
				data-like-button
				className={styles.likeButton}
				type='button'
				onClick={handleLikeClick}
				aria-label={isLiked ? '좋아요 취소' : '좋아요'}
				disabled={isPending || isLikeInfoLoading}
			>
				{isLiked ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
			</Button>

			{isLoginModalOpen && (
				<LoginModal
					isOpen={isLoginModalOpen}
					onClose={() => setIsLoginModalOpen(false)}
				/>
			)}
		</>
	);
}
