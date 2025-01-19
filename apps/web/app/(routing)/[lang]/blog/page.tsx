import { PostList } from '@/fsd/features';

import { HydrateClient, getCategories, trpc } from '@/fsd/shared/index.server';

type Sort = 'latest' | 'oldest' | 'popular';

type PageProps = {
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
	const cat = (searchParams.cat as string) || 'all';
	const sort = (searchParams.sort as Sort) || 'latest';
	const q = (searchParams.q as string) || '';

	void trpc.post.getAllPosts.prefetchInfinite({ limit: 9, cat, sort, q });
	const categories = await getCategories('blog');

	return (
		// FIXME: 전체를 HydrationBoundary로 감싸야하나?..
		<HydrateClient>
			<PostList categories={categories} />
		</HydrateClient>
	);
}
