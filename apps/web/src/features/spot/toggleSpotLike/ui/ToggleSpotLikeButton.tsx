'use client';

import { LoginModal } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared';
import { Button } from '@jung/design-system/components';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useToggleSpotLike } from '../model/useToggleSpotLike';
import * as styles from './ToggleSpotLikeButton.css';

interface ToggleSpotLikeButtonProps {
	spotId: string;
}

export function ToggleSpotLikeButton({ spotId }: ToggleSpotLikeButtonProps) {
	const { toggleLike, getIsLiked, isPending } = useToggleSpotLike();
	const { user } = useSupabaseAuth();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const isLiked = getIsLiked(spotId, user?.id);

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		if (!user || !user.id) {
			setIsLoginModalOpen(true);
			return;
		}
		toggleLike({ spotId, userId: user.id });
	};

	return (
		<>
			<Button
				data-like-button
				className={styles.likeButton}
				type='button'
				onClick={handleLikeClick}
				aria-label={isLiked ? '좋아요 취소' : '좋아요'}
				disabled={isPending}
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
