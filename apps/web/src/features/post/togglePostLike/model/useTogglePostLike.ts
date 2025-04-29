import { useTRPC } from '@/fsd/app';
import { useSupabaseAuth } from '@/fsd/shared';
import { useToast } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { togglePostLikeAction } from '../api/togglePostLikeAction';
import { updatePostLikes } from './../lib/updatePostLikes';

export const useTogglePostLike = () => {
	const queryClient = useQueryClient();
	const trpc = useTRPC();
	const { user } = useSupabaseAuth();
	const showToast = useToast();

	const mutation = useMutation({
		mutationFn: async (postId: string) => {
			if (!user) {
				throw new Error('Please log in to like posts');
			}

			await togglePostLikeAction(postId, user.id);
			return { postId };
		},
		onMutate: async (postId: string) => {
			if (!user) {
				showToast('Please log in to like posts', 'error');

				throw new Error('Please log in to like posts');
			}
			await queryClient.cancelQueries({
				queryKey: trpc.post.getPostById.queryOptions({ postId }).queryKey,
			});

			const previousData = queryClient.getQueryData<Post>(
				trpc.post.getPostById.queryOptions({ postId }).queryKey,
			);

			if (previousData) {
				const isLiked = previousData.liked_by.includes(user.id);
				queryClient.setQueryData(
					trpc.post.getPostById.queryOptions({ postId }).queryKey,
					(old) => updatePostLikes(old, postId, isLiked ? -1 : 1, user.id),
				);
			}

			return { previousData, postId };
		},
		onError: (error: Error, postId, context) => {
			if (context?.previousData) {
				queryClient.setQueryData(
					trpc.post.getPostById.queryOptions({ postId }).queryKey,
					context.previousData,
				);
			}
			if (error.message !== 'Please log in to like posts') {
				showToast(`Failed to update like: ${error.message}`, 'error');
			}
			console.error('Error toggling post like:', error);
		},
		onSettled: (data, error, postId, context) => {
			queryClient.invalidateQueries({
				queryKey: trpc.post.getPostById.queryOptions({ postId: postId })
					.queryKey,
			});
		},
	});

	return {
		toggleLike: mutation.mutate,
		isPending: mutation.isPending,
	};
};
