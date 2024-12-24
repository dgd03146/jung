import { trpc } from '@/fsd/shared';
export function useGetCategoryCounts() {
	return trpc.post.getCategoryCounts.useQuery(undefined, {
		staleTime: 1000 * 60 * 60 * 6, // 6시간
		gcTime: 1000 * 60 * 60 * 12, // 12시간
	});
}
