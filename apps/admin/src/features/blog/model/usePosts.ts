import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postApi';
import { type PostFilters, postKeys } from './postKeys';

export function usePostsQuery(filters: PostFilters) {
	return useQuery({
		queryKey: postKeys.list(filters),
		queryFn: () => fetchPosts(filters),
		placeholderData: keepPreviousData,
	});
}
