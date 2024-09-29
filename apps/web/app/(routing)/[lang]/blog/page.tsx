import { HydrateClient, trpc } from '@/fsd/shared/index.server';
import { BlogPage } from '@/fsd/views';

export default async function Page() {
	void trpc.post.getAllPosts.prefetch();

	return (
		// FIXME: 전체를 HydrationBoundary로 감싸야하나?..
		<HydrateClient>
			<BlogPage />
		</HydrateClient>
	);
}
