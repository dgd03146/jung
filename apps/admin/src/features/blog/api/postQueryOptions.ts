import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { deserializeContent, EMPTY_CONTENT } from '@/fsd/shared';
import type { PostFilters } from '../types/postFilters';
import { fetchPostById } from './getPost';
import { fetchPosts } from './getPosts';

export const postQueryOptions = {
	all: () => ['posts'] as const,
	lists: () => [...postQueryOptions.all(), 'list'] as const,
	list: (filters: PostFilters) =>
		queryOptions({
			queryKey: [...postQueryOptions.lists(), filters] as const,
			queryFn: () => fetchPosts(filters),
			placeholderData: keepPreviousData,
		}),
	details: () => [...postQueryOptions.all(), 'detail'] as const,
	detail: (postId: string) =>
		queryOptions({
			queryKey: [...postQueryOptions.details(), postId] as const,
			queryFn: () => fetchPostById(postId),
			enabled: !!postId,
			select: (data) => ({
				...data,
				content:
					data.content === '[]'
						? [EMPTY_CONTENT]
						: deserializeContent(data.content),
			}),
		}),
};
