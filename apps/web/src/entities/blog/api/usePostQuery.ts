import { useTRPC } from '@/fsd/app';
import { useSuspenseQuery } from '@tanstack/react-query';

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
