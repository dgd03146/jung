'use client';

import { BLOG_DEFAULTS, usePostsQuery } from '@/fsd/entities';
import { PostList, type ViewMode } from '@/fsd/entities/post';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';
import { Flex } from '@jung/design-system/components';

interface ViewPostsProps {
	viewMode: ViewMode;
}

export const ViewPosts = ({ viewMode }: ViewPostsProps) => {
	const { cat, sort, q } = useSearchParamsState({
		defaults: {
			cat: BLOG_DEFAULTS.CATEGORY,
			sort: BLOG_DEFAULTS.SORT,
			q: BLOG_DEFAULTS.QUERY,
		} as const,
	});

	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		usePostsQuery({ cat, sort, q });

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
