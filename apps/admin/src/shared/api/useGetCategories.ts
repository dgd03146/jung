import type { CategoriesResponse, CategoryType } from '@jung/shared/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { categoryKeys } from '@/fsd/shared/config/queryKey';
import { fetchCategories } from '../services/getCategories';

const ONE_HOUR_MS = 1000 * 60 * 60;
const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export function useGetCategories(type: CategoryType) {
	return useSuspenseQuery<CategoriesResponse>({
		queryKey: categoryKeys.all(type),
		queryFn: () => fetchCategories(type),
		staleTime: ONE_HOUR_MS,
		gcTime: ONE_DAY_MS,
	});
}
