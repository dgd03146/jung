import { useToast } from '@jung/design-system/components';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useTRPC } from '@/fsd/app';
import type { Post } from '@/fsd/entities';
import { postKeys, Routes } from '@/fsd/shared';
import { ApiError } from '@/fsd/shared/lib/errors/apiError';
import { createPost } from './createPost';

export const useCreatePost = () => {
	const queryClient = useQueryClient();
	const showToast = useToast();
	const navigate = useNavigate();
	const trpc = useTRPC();

	// 임베딩 생성 mutation
	const generateEmbedding = useMutation(
		trpc.blog.generateEmbedding.mutationOptions(),
	);

	return useMutation({
		mutationFn: (post: Omit<Post, 'id'>) => createPost(post),
		onSuccess: (newPost) => {
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });
			queryClient.setQueryData(postKeys.detail(newPost.id), newPost);
			showToast('Post created successfully!', 'success');
			navigate({ to: Routes.blog.path });

			// 비동기로 임베딩 생성 (UI 블로킹 없음)
			generateEmbedding.mutate({ postId: newPost.id });
		},
		onError: (error: unknown) => {
			if (error instanceof ApiError) {
				switch (error.code) {
					case 'NO_DATA':
						showToast(
							'Failed to create post: No data returned from server',
							'error',
						);
						break;
					case 'UNKNOWN_ERROR':
						showToast(
							'An unexpected error occurred. Please try again later.',
							'error',
						);
						break;
					default:
						showToast(`Failed to create post: ${error.message}`, 'error');
				}
			} else {
				showToast('An unknown error occurred. Please try again.', 'error');
			}
		},
	});
};
