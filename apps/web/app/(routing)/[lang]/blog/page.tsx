import { BLOG_DEFAULTS, PostListSkeleton } from '@/fsd/entities/post';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	ViewPosts,
} from '@/fsd/features/post';
import { SearchBarSkeleton, siteUrl } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { BlogPageControls } from '@/fsd/views';
import { Box, Flex } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

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

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'blog' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Flex gap={{ mobile: '0', tablet: '10' }}>
				<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
					<FilterPostCategoryAccordion />
				</Suspense>
				<Box as='main' minWidth='0' flex={1}>
					<Suspense fallback={<SearchBarSkeleton />}>
						<BlogPageControls />
					</Suspense>
					<Suspense fallback={<PostListSkeleton count={6} />}>
						<ViewPosts />
					</Suspense>
				</Box>
			</Flex>
		</HydrationBoundary>
	);
}
