import { useTogglePostLike } from '@/fsd/features/post';
import { useSupabaseAuth } from '@/fsd/shared';
import { Button, Flex, Typography, useToast } from '@jung/design-system';
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
		<Flex justify='center' align='center' columnGap='2' marginY='25'>
			<Button
				variant='outline'
				color={isLiked ? 'primary' : 'primary100'}
				onClick={handleLikeClick}
				aria-label={isLiked ? 'Unlike post' : 'Like post'}
				border='none'
			>
				{isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
			</Button>
			<Typography.Text level={4} color='primary'>
				{likeCount} {likeCount === 1 ? 'like' : 'likes'}
			</Typography.Text>
		</Flex>
	);
};
