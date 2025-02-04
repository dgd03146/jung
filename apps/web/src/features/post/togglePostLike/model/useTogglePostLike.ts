import { trpc, useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import { togglePostLikeAction } from '../api/togglePostLikeAction';
import { updatePostLikes } from './../lib/updatePostLikes';

export const useTogglePostLike = () => {
	const utils = trpc.useUtils();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const toggleLike = async (postId: string) => {
		if (!user) {
			showToast('Please log in to like posts', 'error');
			return;
		}

		const previousData = utils.post.getPostById.getData(postId);
		const isLiked = previousData?.liked_by.includes(user.id);

		// Optimistic update
		utils.post.getPostById.setData(postId, (old) =>
			updatePostLikes(old, postId, isLiked ? -1 : 1, user.id),
		);

		try {
			await togglePostLikeAction(postId, user.id);
		} catch (error) {
			// Rollback on error
			utils.post.getPostById.setData(postId, previousData);
			if (error instanceof Error) {
				showToast(`Failed to update like: ${error.message}`, 'error');
			}
		}
	};

	return toggleLike;
};
