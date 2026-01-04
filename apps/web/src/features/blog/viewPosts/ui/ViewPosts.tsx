'use client';

import { Flex } from '@jung/design-system/components';
import { useParams } from 'next/navigation';
import { BLOG_DEFAULTS, usePostsQuery } from '@/fsd/entities';
import { PostList } from '@/fsd/entities/blog';
import { useViewMode } from '@/fsd/features/blog';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';

const SEARCH_PARAMS_DEFAULTS = {
	sort: BLOG_DEFAULTS.SORT,
	q: BLOG_DEFAULTS.QUERY,
} as const;

export const ViewPosts = () => {
	const { viewMode } = useViewMode();
	const params = useParams();
	const categoryName =
		typeof params.categoryName === 'string'
			? params.categoryName
			: BLOG_DEFAULTS.CATEGORY;

	const { sort, q } = useSearchParamsState({
		defaults: SEARCH_PARAMS_DEFAULTS,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePostsQuery({ cat: categoryName, sort, q });

	const posts = data.pages.flatMap((page) => page.items) ?? [];

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<>
			<PostList viewMode={viewMode} posts={posts} />
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
