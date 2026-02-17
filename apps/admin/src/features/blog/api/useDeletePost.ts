import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
// import { useNavigate } from '@tanstack/react-router';
import { deletePostById } from './deletePost';
import { postQueryOptions } from './postQueryOptions';

export const useDeletePost = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	// const navigate = useNavigate();

	return useMutation({
		mutationFn: (id: string) => deletePostById(id),
		onSuccess: async (_, deletedId) => {
			await queryClient.invalidateQueries({
				queryKey: postQueryOptions.lists(),
			});
			queryClient.removeQueries({
				queryKey: postQueryOptions.detail(deletedId).queryKey,
			});

			showToast('Post deleted successfully!');

			// navigate({ to: Routes.blog.path });
		},
		onError: (error: ApiError) => {
			switch (error.code) {
				case 'NOT_FOUND':
					showToast('Failed to delete post: Post not found');
					break;
				case 'UNKNOWN_ERROR':
					showToast('An unexpected error occurred. Please try again later.');
					break;
				default:
					showToast(`Failed to delete post: ${error.message}`);
			}
			console.error('Post deletion error:', error);
		},
	});
};
