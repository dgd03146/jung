import type { ArticleFilters } from '../../features/articles/types/article';
import type { PostFilters } from '../../features/blog/types/postFilters';
import type { SubscriberFilters } from '../../features/subscribers/types/subscriberFilters';

// FIXME: 쿼리키 팩토리, PostFilters 수정?

export const articleKeys = {
	all: ['articles'] as const,
	lists: () => [...articleKeys.all, 'list'] as const,
	list: (filters: ArticleFilters) => [...articleKeys.lists(), filters] as const,
	detail: (id?: string) => [...articleKeys.all, id] as const,
};

export const postKeys = {
	all: ['posts'] as const,
	lists: () => [...postKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...postKeys.lists(), filters] as const,
	detail: (id?: string) => [...postKeys.all, id] as const,
};

export const categoryKeys = {
	all: (type: 'blog' | 'places') => ['categories', type] as const,
};

export const photoKeys = {
	all: ['photos'] as const,
	lists: () => [...photoKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...photoKeys.lists(), filters] as const,
	detail: (id?: string) => [...photoKeys.all, id] as const,
	byCollection: (collectionId: string, page?: number, limit?: number) =>
		[...photoKeys.all, 'collection', collectionId, page, limit] as const,
};

export const placeKeys = {
	all: ['places'] as const,
	lists: () => [...placeKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...placeKeys.lists(), filters] as const,
	detail: (id?: string) => [...placeKeys.all, id] as const,
};

export const collectionKeys = {
	all: ['collections'] as const,
	lists: () => [...collectionKeys.all, 'list'] as const,
	list: (filters: PostFilters) => [...collectionKeys.lists(), filters] as const,
	detail: (id?: string) => [...collectionKeys.all, id] as const,
};

export const subscriberKeys = {
	all: ['subscribers'] as const,
	lists: () => [...subscriberKeys.all, 'list'] as const,
	list: (filters: SubscriberFilters) =>
		[...subscriberKeys.lists(), filters] as const,
	stats: () => [...subscriberKeys.all, 'stats'] as const,
};
