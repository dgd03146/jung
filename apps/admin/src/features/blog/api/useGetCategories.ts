import { categoryKeys } from '@/fsd/shared/config/queryKey';
import type { CategoriesResponse } from '@jung/shared/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchBlogCategories } from './getCategories';

export function useGetCategories() {
	return useSuspenseQuery<CategoriesResponse>({
		queryKey: categoryKeys.all('blog'),
		queryFn: fetchBlogCategories,
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
	});
}
