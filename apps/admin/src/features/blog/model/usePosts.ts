import { useSuspenseQuery } from '@tanstack/react-query';
import { fetchPosts } from '../api/postApi';

export function usePostsQuery() {
	return useSuspenseQuery({
		queryKey: ['posts'],
		queryFn: fetchPosts,
	});
}
