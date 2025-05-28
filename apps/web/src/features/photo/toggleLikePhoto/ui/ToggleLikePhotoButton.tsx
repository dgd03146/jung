'use client';

import { usePhotoLikeQuery } from '@/fsd/entities/photo';
import { LoginModal } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Button, useToast } from '@jung/design-system/components';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTogglePhotoLike } from '../api/useTogglePhotoLike';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
}

export function ToggleLikePhotoButton({ photoId }: ToggleLikePhotoButtonProps) {
	const { toggleLike, isPending } = useTogglePhotoLike();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		usePhotoLikeQuery(photoId);

	const isLiked = !!(user && likeInfo?.liked_by?.includes(user.id));

	const handleToggleLike = () => {
		if (!user) {
			setIsLoginModalOpen(true);
			return;
		}

		toggleLike(
			{
				photoId,
				userId: user.id,
			},
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
				variant='ghost'
				color='primary'
				className={styles.toggleLikePhotoButton}
				onClick={handleToggleLike}
				aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
				disabled={isPending || isLikeInfoLoading}
			>
				{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
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
