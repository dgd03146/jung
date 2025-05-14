'use client';

import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Button, useToast } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTogglePhotoLike } from '../model/useTogglePhotoLike';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
	isInitiallyLiked: boolean;
}

export function ToggleLikePhotoButton({
	photoId,
	isInitiallyLiked,
}: ToggleLikePhotoButtonProps) {
	const { toggleLike } = useTogglePhotoLike();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const isLiked = isInitiallyLiked;

	const handleClick = () => {
		if (!user) {
			showToast('Login is required to like a photo.', 'warning');
			return;
		}

		toggleLike(
			{ photoId, userId: user.id },
			{
				onError: (_error) => {
					showToast('Failed to update like status. Please try again.', 'error');
				},
			},
		);
	};

	return (
		<Button
			variant='ghost'
			color='primary'
			className={styles.toggleLikePhotoButton}
			onClick={handleClick}
			aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
			disabled={!user && !isLiked}
		>
			{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
		</Button>
	);
}
