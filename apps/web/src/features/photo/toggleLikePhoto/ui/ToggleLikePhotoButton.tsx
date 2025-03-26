'use client';

import { Button } from '@jung/design-system/components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useTogglePhotoLike } from '../model/useTogglePhotoLike';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
}

export function ToggleLikePhotoButton({ photoId }: ToggleLikePhotoButtonProps) {
	const { toggleLike, getIsLiked } = useTogglePhotoLike();
	const isLiked = getIsLiked(photoId);

	return (
		<Button
			variant='ghost'
			color='primary'
			className={styles.toggleLikePhotoButton}
			onClick={() => toggleLike(photoId)}
			aria-label={isLiked ? '사진 좋아요 취소' : '사진 좋아요'}
		>
			{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
		</Button>
	);
}
