import { queryOptions } from '@tanstack/react-query';
import type { ArticleFilters } from '../types';
import { getArticleById } from './getArticle';
import { fetchArticles } from './getArticles';

export const articleQueryOptions = {
	all: () => ['articles'] as const,
	lists: () => [...articleQueryOptions.all(), 'list'] as const,
	list: (filters: ArticleFilters) =>
		queryOptions({
			queryKey: [...articleQueryOptions.lists(), filters] as const,
			queryFn: () => fetchArticles(filters),
		}),
	details: () => [...articleQueryOptions.all(), 'detail'] as const,
	detail: (articleId: string | undefined) =>
		queryOptions({
			queryKey: [...articleQueryOptions.details(), articleId] as const,
			queryFn: () => {
				if (!articleId) throw new Error('articleId is required');
				return getArticleById(articleId);
			},
			enabled: !!articleId,
		}),
};
