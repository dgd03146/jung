import { getQueryClient } from '@/fsd/shared';
import { BlogPage } from '@/fsd/views';
import { appRouter } from '@jung/server';
import { createServerSideHelpers } from '@trpc/react-query/server';

export default async function Page() {
	const queryClient = getQueryClient();

	const helpers = createServerSideHelpers({
		router: appRouter,
		ctx: {}, // 세션 정보, 로깅 등
		queryClient,
	});

	await helpers.post.getAllPosts.prefetch();

	return <BlogPage />;
}
