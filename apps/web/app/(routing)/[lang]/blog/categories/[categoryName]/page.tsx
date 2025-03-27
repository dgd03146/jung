import { BLOG_DEFAULTS } from '@/fsd/entities/post';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { BlogLayout } from '../../_components/BlogLayout';

export const revalidate = 21600;

export async function generateStaticParams() {
	return [];
}

export default async function CategoryPostsPage({
	params,
}: {
	params: { categoryName: string };
}) {
	const queryClient = getQueryClient();
	const categoryName = params.categoryName;

	await queryClient.prefetchInfiniteQuery(
		trpc.post.getAllPosts.infiniteQueryOptions({
			limit: BLOG_DEFAULTS.LIMIT,
			cat: categoryName,
			sort: BLOG_DEFAULTS.SORT,
			q: BLOG_DEFAULTS.QUERY,
		}),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BlogLayout currentCategory={categoryName} />
		</HydrationBoundary>
	);
}
