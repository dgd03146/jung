'use client';

import { Button, useToast } from '@jung/design-system/components';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePlaceLikeQuery } from '@/fsd/entities/place';
import { LoginModal } from '@/fsd/features/auth';
import { useSupabaseAuth, useTrackEvent } from '@/fsd/shared';
import { useTogglePlaceLikeMutation } from '../api/useTogglePlaceLikeMutation';
import * as styles from './TogglePlaceLikeButton.css';

interface TogglePlaceLikeButtonProps {
	placeId: string;
}

export function TogglePlaceLikeButton({ placeId }: TogglePlaceLikeButtonProps) {
	const { toggleLike, isPending } = useTogglePlaceLikeMutation();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		usePlaceLikeQuery(placeId);

	const isLiked = !!(user && likeInfo?.liked_by?.includes(user.id));

	const { trackEvent } = useTrackEvent();

	const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();

		if (!user || !user.id) {
			setIsLoginModalOpen(true);
			return;
		}

		trackEvent({
			event_name: isLiked ? 'unlike_place' : 'like_place',
			event_category: 'engagement',
			resource_type: 'place',
			resource_id: placeId,
		});

		toggleLike(
			{ placeId, userId: user.id },
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
