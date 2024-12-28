import { postKeys } from '@/fsd/shared';
import { useQuery } from '@tanstack/react-query';
import { fetchCategories } from './getCategories';

export function useGetCategories() {
	return useQuery({
		queryKey: postKeys.categories(),
		queryFn: fetchCategories,
	});
}
