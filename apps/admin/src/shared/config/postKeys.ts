import type { PostFilters } from '../../features/blog/types/postFilters';

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
	detail: (id: string) => [...postKeys.all, id] as const,
};
