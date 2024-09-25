import { postKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { EmptyContent } from '../config/initialPost';
import { deserializeContent } from '../lib/serializeContent';
import { fetchPostById } from './getPostById';

export function useGetPost(postId?: string) {
	return useQuery({
		queryKey: postKeys.detail(String(postId)),
		queryFn: () => fetchPostById(postId),

		select: (data) => ({
			...data,
			content:
				data.content === '[]'
					? [EmptyContent]
					: deserializeContent(data.content),
		}),
		enabled: !!postId,
		// TODO: onError?
	});
}
