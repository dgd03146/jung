'use client';

import { usePostLikeQuery } from '@/fsd/entities/post';
import { useTogglePostLike } from '@/fsd/features/post';
import { useSupabaseAuth } from '@/fsd/shared';
import { Button, Flex, useToast } from '@jung/design-system/components';
import Link from 'next/link';
import { BsPencilSquare } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

interface Props {
	postId: string;
}

export const TogglePostLike = ({ postId }: Props) => {
	const { user } = useSupabaseAuth();
	const showToast = useToast();
	const { data: likeInfo, isLoading: isLikeInfoLoading } =
		usePostLikeQuery(postId);
	const { toggleLike, isPending } = useTogglePostLike();

	const handleLikeClick = () => {
		if (!user) {
			showToast('Login required', 'error');
			return;
		}

		toggleLike(postId);
	};

	const isLiked = (user && likeInfo?.liked_by?.includes(user.id)) || false;
	const likeCount = likeInfo?.likes || 0;

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
				onClick={handleLikeClick}
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
