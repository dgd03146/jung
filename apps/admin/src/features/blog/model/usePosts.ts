import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postApi';

export function usePostsQuery() {
	return useQuery({
		// FIXME: 쿼리키 관리
		queryKey: ['posts'],
		queryFn: fetchPosts,
		placeholderData: keepPreviousData,
	});
}
