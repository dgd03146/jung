import { BLOG_DEFAULTS } from '@/fsd/entities/post';
import { siteUrl } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { BlogPage } from '@/fsd/views';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Blog',

	keywords: ['블로그', '개발', '여행', '사진', 'JUNG', '프로그래밍'],
	authors: [{ name: 'JUNG', url: siteUrl }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
};

export const revalidate = 21600;

export default async function Page() {
	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery(
		trpc.post.getAllPosts.infiniteQueryOptions({
			limit: BLOG_DEFAULTS.LIMIT,
			cat: BLOG_DEFAULTS.CATEGORY,
			sort: BLOG_DEFAULTS.SORT,
			q: BLOG_DEFAULTS.QUERY,
		}),
	);

	await queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'blog' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BlogPage />
		</HydrationBoundary>
	);
}
