import { BLOG_DEFAULTS, PostListSkeleton } from '@/fsd/entities/post';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	ViewPosts,
} from '@/fsd/features/post';
import { SearchBarSkeleton } from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { BlogPageControls } from '@/fsd/views';
import { Box, Flex } from '@jung/design-system/components';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { Suspense } from 'react';

export const revalidate = 21600;

export async function generateStaticParams() {
	const categories = await caller.category.getCategories({ type: 'blog' });

	const params = [
		{ categoryName: BLOG_DEFAULTS.CATEGORY },
		...categories.map((category) => ({
			categoryName: category.name.toLowerCase(),
		})),

		...categories.flatMap((category) =>
			category.subCategories.map((subCategory) => ({
				categoryName: subCategory.name.toLowerCase(),
			})),
		),
	];

	return params;
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
			<Flex gap={{ mobile: '0', tablet: '10' }}>
				<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
					<FilterPostCategoryAccordion currentCategory={categoryName} />
				</Suspense>

				<Box as='main' minWidth='0' flex='1'>
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
