import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import type { Post } from '@/fsd/entities';
import { Routes } from '@/fsd/shared';
import type { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { postQueryOptions } from './postQueryOptions';
import { updatePost } from './updatePost';

export const useUpdatePost = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	// 임베딩 생성 mutation
	const generateEmbedding = useMutation(
		trpc.blog.generateEmbedding.mutationOptions({
			onError: (error) => {
				console.error('Embedding generation failed:', error);
				showToast('검색용 임베딩 생성에 실패했습니다.', 'warning');
			},
		}),
	);

	return useMutation({
		mutationFn: ({ id, post }: { id: string; post: Partial<Post> }) =>
			updatePost(id, post),
		onSuccess: (updatedPost, { post }) => {
			queryClient.invalidateQueries({
				queryKey: postQueryOptions.lists(),
			});
			queryClient.invalidateQueries({
				queryKey: postQueryOptions.detail(updatedPost.id).queryKey,
			});
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
