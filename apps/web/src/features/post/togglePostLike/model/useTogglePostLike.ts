import { useTRPC } from '@/fsd/app';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system';
import { useQueryClient } from '@tanstack/react-query';
import { togglePostLikeAction } from '../api/togglePostLikeAction';
import { updatePostLikes } from './../lib/updatePostLikes';

export const useTogglePostLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const toggleLike = async (postId: string) => {
		if (!user) {
			showToast('Please log in to like posts', 'error');
			return;
		}

		const previousData = queryClient.getQueryData(
			trpc.post.getPostById.queryOptions({ postId }).queryKey,
		);

		const isLiked = previousData?.liked_by.includes(user.id);

		// Optimistic update
		queryClient.setQueryData(
			trpc.post.getPostById.queryOptions({ postId }).queryKey,
			(old) => updatePostLikes(old, postId, isLiked ? -1 : 1, user.id),
		);

		try {
			await togglePostLikeAction(postId, user.id);
		} catch (error) {
			queryClient.setQueryData(
				trpc.post.getPostById.queryOptions({ postId }).queryKey,
				previousData,
			);

			if (error instanceof Error) {
				showToast(`Failed to update like: ${error.message}`, 'error');
			}
		}
	};

	return toggleLike;
};
