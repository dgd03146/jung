import { createFileRoute } from '@tanstack/react-router';

import PostFormPage from '@/fsd/views/blog/ui/PostFormPage';
// import { fetchPostById } from '@/fsd/features/blog/api/getPostById';
// import { queryClient } from '@/fsd/app/providers/react-query/ReactQueryProvider';
// import { postKeys } from '@/fsd/features';

// FIXME: Prefetching??

export const Route = createFileRoute('/blog/edit/$postId')({
	// loader: async ({ params: { postId } }) => {
	//   await queryClient.ensureQueryData({
	//     queryKey: postKeys.detail(postId),
	//     queryFn: () => fetchPostById(postId),
	//     staleTime: 6 * 60 * 60 * 1000, // 6시간
	//   });
	//   return { postId };
	// },

	component: PostFormPage,
});
