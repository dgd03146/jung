'use client';

import { Button, useToast } from '@jung/design-system/components';
import { useAnonymousId } from '@jung/shared/hooks';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePhotoLikeQuery } from '@/fsd/entities/gallery';
import { useTrackEvent } from '@/fsd/features/analytics';
import { useSupabaseAuth } from '@/fsd/shared';
import { useTogglePhotoLikeMutation } from '../api/useTogglePhotoLikeMutation';
import * as styles from './ToggleLikePhotoButton.css';

interface ToggleLikePhotoButtonProps {
	photoId: string;
}

export function ToggleLikePhotoButton({ photoId }: ToggleLikePhotoButtonProps) {
	const { toggleLike, isPending } = useTogglePhotoLikeMutation();
	const { user } = useSupabaseAuth();
	const { anonymousId } = useAnonymousId();
	const showToast = useToast();

	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		usePhotoLikeQuery(photoId);

	const identifier = user?.id || anonymousId;
	const isLiked = !!(identifier && likeInfo?.liked_by?.includes(identifier));

	const { trackEvent } = useTrackEvent();

	const handleToggleLike = () => {
		if (!identifier) {
			showToast('잠시 후 다시 시도해주세요.', 'error');
			return;
		}

		trackEvent({
			event_name: isLiked ? 'unlike_photo' : 'like_photo',
			event_category: 'engagement',
			resource_type: 'photo',
			resource_id: photoId,
		});

		toggleLike(
			{
				photoId,
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
			color='primary'
			className={styles.toggleLikePhotoButton}
			onClick={handleToggleLike}
			aria-label={isLiked ? 'Unlike photo' : 'Like photo'}
			disabled={isPending || isLikeInfoLoading}
		>
			{isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
		</Button>
	);
}
