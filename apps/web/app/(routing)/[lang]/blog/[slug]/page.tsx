import { getQueryClient } from '@/fsd/shared';
import PostDetail from '@/fsd/views/blog/ui/PostDetail';
import { appRouter } from '@jung/server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { createServerSideHelpers } from '@trpc/react-query/server';

export default async function Page({ params }: { params: { slug: string } }) {
	const queryClient = getQueryClient();
	const postId = params.slug;

	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {}, // 세션 정보, 로깅 등
		queryClient,
	});

	await helpers.post.getPostById.prefetch(postId);
	const prefetchedData = queryClient.getQueryData([
		['post', 'getPostById'],
		{ input: postId, type: 'query' },
	]);
	console.log('🚀 ~ Page ~ prefetchedData:', prefetchedData);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PostDetail postId={postId} />
		</HydrationBoundary>
	);
}
