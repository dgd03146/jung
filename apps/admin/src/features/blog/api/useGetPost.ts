import { useQuery } from '@tanstack/react-query';
import { deserializeContent, EMPTY_CONTENT, postKeys } from '@/fsd/shared';
import { fetchPostById } from './getPost';

export function useGetPost(postId?: string) {
	return useQuery({
		queryKey: postKeys.detail(String(postId)),
		queryFn: () => fetchPostById(postId),

		select: (data) => ({
			...data,
			content:
				data.content === '[]'
					? [EMPTY_CONTENT]
					: deserializeContent(data.content),
		}),
		enabled: !!postId,
	});
}
