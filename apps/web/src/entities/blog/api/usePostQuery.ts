import { useSuspenseQuery } from '@tanstack/react-query';
import { useTRPC } from '@/fsd/app';

export function usePostQuery(postId: string) {
	const trpc = useTRPC();
	return useSuspenseQuery(
		trpc.blog.getPostById.queryOptions(
			{
				postId,
			},
			{
				staleTime: 1000 * 60 * 5, // 5분
				gcTime: 1000 * 60 * 60, // 1시간
			},
		),
	);
}
