'use client';

import { LoginModal } from '@/fsd/features/auth';
import { useSupabaseAuth } from '@/fsd/shared/model/useSupabaseAuth';
import { Button, useToast } from '@jung/design-system/components';
import { useMemo, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTogglePhotoLike } from '../model/useTogglePhotoLike';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
	likedBy?: string[];
	likesCount: number;
}

export function ToggleLikePhotoButton({
	photoId,
	likedBy = [],
	likesCount,
}: ToggleLikePhotoButtonProps) {
	const { toggleLike, isPending } = useTogglePhotoLike();
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const isLiked = useMemo(() => {
		return user && likedBy ? likedBy.includes(user.id) : false;
	}, [user, likedBy]);

	const handleClick = () => {
		if (!user) {
			setIsLoginModalOpen(true);
			return;
		}

		toggleLike(
			{
				photoId,
				userId: user.id,
				isCurrentlyLiked: isLiked,
			},
			{
				onError: (error) => {
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
				onClick={handleClick}
				aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
				disabled={isPending}
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
