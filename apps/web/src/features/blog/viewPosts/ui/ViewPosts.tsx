'use client';

import { Flex } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { useParams } from 'next/navigation';
import {
	BLOG_DEFAULTS,
	type BlogSort,
	usePostsQuery,
	useSemanticSearchQuery,
} from '@/fsd/entities';
import { PostList } from '@/fsd/entities/blog';
import { useViewMode } from '@/fsd/features/blog';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSearchParamsState,
} from '@/fsd/shared';

const SEARCH_PARAMS_DEFAULTS: { sort: BlogSort; q: string } = {
	sort: BLOG_DEFAULTS.SORT,
	q: BLOG_DEFAULTS.QUERY,
};

const normalizeImageSrc = (value: string | string[] | undefined): string => {
	if (Array.isArray(value)) {
		return value[0] || '';
	}
	return value || '';
};

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

	// 검색어가 있으면 semantic search 사용
	const isSearching = Boolean(q && q.trim().length > 0);

	// 일반 목록
	const postsQuery = usePostsQuery({
		cat: categoryName,
		sort: sort as BlogSort,
		q: '',
	});

	// 시맨틱 검색 (검색어 있을 때만 실행)
	const searchQuery = useSemanticSearchQuery({
		query: q || '',
		limit: 10,
		mode: 'hybrid',
		enabled: isSearching,
	});

	// 검색 결과를 Post 타입으로 변환
	const searchPosts: Post[] =
		searchQuery.data?.items.map((item) => ({
			id: item.id,
			title: item.title,
			description: item.description,
			date: item.date || '',
			likes: item.likes || 0,
			liked_by: [] as string[],
			category: item.category || '',
			tags: item.tags || [],
			imagesrc: normalizeImageSrc(item.imagesrc),
		})) || [];

	const posts = isSearching
		? searchPosts
		: (postsQuery.data.pages.flatMap((page) => page.items) ?? []);

	const { ref } = useInfiniteScroll({
		fetchNextPage: postsQuery.fetchNextPage,
		hasNextPage: postsQuery.hasNextPage,
	});

	// 검색 중 로딩 상태
	if (isSearching && searchQuery.isLoading) {
		return (
			<Flex justify='center' align='center' minHeight='40'>
				<LoadingSpinner size='medium' />
			</Flex>
		);
	}

	return (
		<>
			<PostList viewMode={viewMode} posts={posts} />
			{!isSearching && (
				<Flex justify='center' align='center' minHeight='40' ref={ref}>
					{postsQuery.isFetchingNextPage && postsQuery.hasNextPage && (
						<LoadingSpinner size='small' />
					)}
				</Flex>
			)}
		</>
	);
};
