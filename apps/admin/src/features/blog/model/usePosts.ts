import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postApi';

export function usePostsQuery() {
	return useSuspenseQuery({
		// FIXME: query key 관리하기
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});
}
