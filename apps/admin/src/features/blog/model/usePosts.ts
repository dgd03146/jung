import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postApi';

export function usePostsQuery(page: number, pageSize: number) {
	return useQuery({
		// FIXME: 쿼리키 관리
		queryKey: ['posts', page],
		queryFn: () => fetchPosts(page, pageSize),
		placeholderData: keepPreviousData,
	});
}
