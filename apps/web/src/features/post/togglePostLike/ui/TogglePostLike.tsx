import { useTogglePostLike } from '@/fsd/features/post';
import { useSupabaseAuth } from '@/fsd/shared';
import { Button, Flex, useToast } from '@jung/design-system';
import Link from 'next/link';
import { BsPencilSquare } from 'react-icons/bs';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { isPostLiked } from '../lib/isPostLiked';

interface Props {
	postId: string;
	likeCount: number;
	likedBy: string[];
}

export const TogglePostLike = ({ likeCount, postId, likedBy }: Props) => {
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const toggleLike = useTogglePostLike();

	const handleLikeClick = () => {
		if (!user) {
			showToast('Login required', 'error');
			return;
		}

		toggleLike(postId);
	};

	const isLiked = isPostLiked(likedBy, user?.id);

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
			>
				{isLiked ? 'Liked' : 'Like'}
			</Button>

			<Link href='/guestbook'>
				<Button
					variant='secondary'
					borderRadius='md'
					prefix={<BsPencilSquare size={16} />}
					fontSize='sm'
				>
					Visit Guestbook
				</Button>
			</Link>
		</Flex>
	);
};
