import { useTogglePostLike } from '@/fsd/features/blog/post';
import { useSupabaseAuth } from '@/fsd/shared';
import { Box, Button, Flex, Typography, useToast } from '@jung/design-system';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import * as styles from './PostLike.css.ts';

interface PostLikeProps {
	postId: string;
	likeCount: number;
	isLiked?: boolean;
}

const PostLike = ({ likeCount, isLiked = false, postId }: PostLikeProps) => {
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

	return (
		<Box marginY='20'>
			<Flex justify='center' align='center' columnGap='2'>
				<Button
					variant='ghost'
					color={isLiked ? 'primary' : 'secondary'}
					onClick={handleLikeClick}
					aria-label={isLiked ? 'Unlike post' : 'Like post'}
					className={styles.likeButton}
				>
					{isLiked ? (
						<FaHeart size={20} color='#0142C0' />
					) : (
						<FaRegHeart size={20} color='#0142C0' />
					)}
				</Button>
				<Typography.Text level={3} color='primary'>
					{likeCount} {likeCount === 1 ? 'like' : 'likes'}
				</Typography.Text>
			</Flex>
		</Box>
	);
};

export default PostLike;
