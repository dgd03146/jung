import type { PostFilters } from '../../features/blog/types/postFilters';

// FIXME: 쿼리키 팩토리, PostFilters 수정?

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
	detail: (id?: string) => [...postKeys.all, id] as const,
};

export const categoryKeys = {
	all: (type: 'blog' | 'spots') => ['categories', type] as const,
};

export const photoKeys = {
	all: ['photos'] as const,
	lists: () => [...photoKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...photoKeys.lists(), filters] as const,
	detail: (id?: string) => [...photoKeys.all, id] as const,
	byCollection: (collectionId: string, page?: number, limit?: number) =>
		[...photoKeys.all, 'collection', collectionId, page, limit] as const,
};

export const spotKeys = {
	all: ['spots'] as const,
	lists: () => [...spotKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...spotKeys.lists(), filters] as const,
	detail: (id?: string) => [...spotKeys.all, id] as const,
};

export const collectionKeys = {
	all: ['collections'] as const,
	lists: () => [...collectionKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...collectionKeys.lists(), filters] as const,
	detail: (id?: string) => [...collectionKeys.all, id] as const,
};
