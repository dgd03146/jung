import { useQuery } from '@tanstack/react-query';
import { deserializeContent } from '@/fsd/features/blog/lib';
import { postKeys } from '@/fsd/shared';
import { EMPTY_CONTENT } from '../config/initialPost';
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
