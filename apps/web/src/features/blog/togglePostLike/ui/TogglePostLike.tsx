'use client';

import { Button, Flex, useToast } from '@jung/design-system/components';
import { useAnonymousId } from '@jung/shared/hooks';
import { BsPencilSquare } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { usePostLikeQuery } from '@/fsd/entities/blog';
import { useTogglePostLikeMutation } from '@/fsd/features/blog';
import { useSupabaseAuth, useTrackEvent } from '@/fsd/shared';
import { Link } from '@/i18n/routing';

interface Props {
	postId: string;
}

export const TogglePostLike = ({ postId }: Props) => {
	const { user } = useSupabaseAuth();
	const { anonymousId } = useAnonymousId();
	const showToast = useToast();
	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		usePostLikeQuery(postId);
	const { toggleLike, isPending } = useTogglePostLikeMutation();
	const { trackEvent } = useTrackEvent();

	const identifier = user?.id || anonymousId;
	const isLiked = Boolean(
		identifier && likeInfo?.liked_by?.includes(identifier),
	);
	const likeCount = likeInfo?.likes || 0;

	const handleToggleLike = () => {
		if (!identifier) {
			showToast('잠시 후 다시 시도해주세요.', 'error');
			return;
		}

		trackEvent({
			event_name: isLiked ? 'unlike_post' : 'like_post',
			event_category: 'engagement',
			resource_type: 'post',
			resource_id: postId,
		});

		toggleLike(
			{
				postId,
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
		<Flex
			justify='center'
			align='center'
			gap='4'
			marginTop='20'
			marginBottom='24'
		>
			<Button
				variant='outline'
				onClick={handleToggleLike}
				aria-label={isLiked ? 'Unlike post' : 'Like post'}
				fontSize='sm'
				borderRadius='md'
				prefix={isLiked ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
				disabled={isPending || isLikeInfoLoading}
			>
				{likeCount} {likeCount > 1 ? 'Likes' : 'Like'}
			</Button>

			<Link href='/guestbook'>
				<Button
					variant='primary'
					borderRadius='md'
					prefix={<BsPencilSquare size={16} />}
					fontSize='sm'
				>
					Guestbook
				</Button>
			</Link>
		</Flex>
	);
};
