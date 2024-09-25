import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/fsd/features';
import { postKeys } from '@/fsd/shared';
import type { PostFilters } from '../types/postFilters';

export function useGetAllPosts(filters: PostFilters) {
	return useQuery({
		queryKey: postKeys.list(filters),
		queryFn: () => fetchPosts(filters),
		placeholderData: keepPreviousData,
	});
}
