import type { Post } from '@/fsd/entities';
import { Routes, postKeys } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { updatePost } from './updatePost';

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: ({ id, post }: { id: string; post: Partial<Post> }) =>
			updatePost(id, post),
		onSuccess: async (updatedPost) => {
			await queryClient.invalidateQueries({ queryKey: postKeys.lists() });
			await queryClient.invalidateQueries({
				queryKey: postKeys.detail(updatedPost.id),
			});

			queryClient.setQueryData(
				postKeys.detail(String(updatedPost.id)),
				updatedPost,
			);
			showToast('Post updated successfully!');

			navigate({ to: Routes.blog.path });
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NO_DATA':
					showToast('Failed to update post: No data returned from server');
					break;
				case 'UNKNOWN_ERROR':
					showToast('An unexpected error occurred. Please try again later.');
					break;
				default:
					showToast(`Failed to update post: ${error.message}`);
			}
			console.error('Post update error:', error);
		},
	});
};
