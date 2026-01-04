import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { fetchPosts } from '@/fsd/features';
import type { PostFilters } from '@/fsd/features/blog/types/postFilters';
import { postKeys } from '@/fsd/shared';

export function useGetAllPosts(filters: PostFilters) {
	return useQuery({
		queryKey: postKeys.list(filters),
		queryFn: () => fetchPosts(filters),
		placeholderData: keepPreviousData,
	});
}
