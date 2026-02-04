import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import type { Post } from '@/fsd/entities';
import { postKeys, Routes } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { updatePost } from './updatePost';

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	// 임베딩 생성 mutation
	const generateEmbedding = useMutation(
		trpc.blog.generateEmbedding.mutationOptions(),
	);

	return useMutation({
		mutationFn: ({ id, post }: { id: string; post: Partial<Post> }) =>
			updatePost(id, post),
		onSuccess: async (updatedPost, { post }) => {
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

			// 제목/설명/태그 변경 시 임베딩 갱신 (비동기)
			if (post.title || post.description || post.tags) {
				generateEmbedding.mutate({ postId: updatedPost.id });
			}
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
