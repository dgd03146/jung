import { useMutation } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

/**
 * 포스트 임베딩 생성 mutation
 * tRPC를 통해 서버에서 임베딩 생성
 */
export function useGenerateEmbeddingMutation() {
	const trpc = useTRPC();

	return useMutation(
		trpc.blog.generateEmbedding.mutationOptions({
			onError: (err, variables) => {
				console.error(
					`Failed to generate embedding for post ${variables.postId}:`,
					err,
				);
			},
		}),
	);
}
