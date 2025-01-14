import { categoryKeys } from '@/fsd/shared/config/queryKey';
import type { CategoriesResponse } from '@jung/shared/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchCategories } from '../services/getCategories';

type CategoryType = 'blog' | 'spots';

export function useGetCategories(type: CategoryType) {
	return useSuspenseQuery<CategoriesResponse>({
		queryKey: categoryKeys.all(type),
		queryFn: () => fetchCategories(type),
		staleTime: 1000 * 60 * 60,
		gcTime: 1000 * 60 * 60 * 24,
	});
}
