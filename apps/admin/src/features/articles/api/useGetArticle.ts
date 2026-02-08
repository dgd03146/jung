import { useQuery } from '@tanstack/react-query';
import { articleKeys } from '@/fsd/shared';
import { getArticleById } from './getArticle';

export const useGetArticle = (articleId: string | undefined) => {
	return useQuery({
		queryKey: articleKeys.detail(articleId),
		queryFn: () => getArticleById(articleId!),
		enabled: !!articleId,
	});
};
