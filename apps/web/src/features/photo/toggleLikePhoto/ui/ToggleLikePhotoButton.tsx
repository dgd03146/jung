'use client';

import { usePhotoQuery } from '@/fsd/entities/photo';
import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Button, useToast } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTogglePhotoLike } from '../model/useTogglePhotoLike';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
}

export function ToggleLikePhotoButton({ photoId }: ToggleLikePhotoButtonProps) {
	const { toggleLike, isError, error } = useTogglePhotoLike();
	const { user } = useSupabaseAuth();

	const { data: photo, error: photoError } = usePhotoQuery(photoId);
	const showToast = useToast();

	if (photoError || !photo) {
		return (
			<Button
				variant='ghost'
				color='primary'
				className={styles.toggleLikePhotoButton}
				disabled
				onClick={() => {
					showToast('Photo not found', 'error');
				}}
			>
				<FaRegHeart size={16} />
			</Button>
		);
	}

	const isLiked = user ? photo.liked_by?.includes(user.id) : false;

	const handleClick = () => {
		if (!user) {
			showToast('Login is required to like a photo.', 'warning');
			return false;
		}

		toggleLike(
			{ photoId, userId: user.id },
			{
				onError: (error) => {
					if (error instanceof Error) {
						showToast('Failed to toggle like', 'error');
					}
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
		>
			{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
		</Button>
	);
}
