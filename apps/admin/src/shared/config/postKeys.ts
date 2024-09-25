import type { PostFilters } from '../../features/blog/types/postFilters';

// FIXME: 쿼리키 팩토리?

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
	detail: (id?: string) => [...postKeys.all, id] as const,
};
