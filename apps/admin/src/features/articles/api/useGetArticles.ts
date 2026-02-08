import { useQuery } from '@tanstack/react-query';
import { articleKeys } from '@/fsd/shared';
import type { ArticleFilters } from '../types';
import { fetchArticles } from './getArticles';

export const useGetArticles = (filters: ArticleFilters) => {
	return useQuery({
		queryKey: articleKeys.list(filters),
		queryFn: () => fetchArticles(filters),
	});
};
