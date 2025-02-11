'use client';

import {
	FilterPostCategoryAccordion,
	SelectViewMode,
} from '@/fsd/features/post';

import { PostList, type ViewMode, usePostsQuery } from '@/fsd/entities/post';
import { LoadingSpinner, SearchBar, useInfiniteScroll } from '@/fsd/shared';
import { useSearchParamsState } from '@/fsd/shared';
import { Box, Flex } from '@jung/design-system/components';
import type { CategoryTree } from '@jung/shared/types';
import { useState } from 'react';

export const BlogPage = ({ categories }: { categories: CategoryTree[] }) => {
	const [viewMode, setViewMode] = useState<ViewMode>('list');

	const { cat, sort, q } = useSearchParamsState({
		defaults: {
			cat: 'all',
			sort: 'latest',
			q: '',
		} as const,
	});

	const [data, query] = usePostsQuery({ cat, sort, q });
	const posts = data.pages.flatMap((page) => page.items) ?? [];
	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

	const { ref } = useInfiniteScroll({
		fetchNextPage,
		hasNextPage,
	});

	return (
		<>
			<Flex gap={{ mobile: '0', tablet: '10' }}>
				<FilterPostCategoryAccordion categories={categories} />
				<Box as='main' minWidth='0' flex='1'>
					<Flex
						align='center'
						justify='space-between'
						gap='2.5'
						paddingBottom='2'
					>
						<SearchBar />
						<SelectViewMode selected={viewMode} onSelect={setViewMode} />
					</Flex>
					<PostList viewMode={viewMode} posts={posts} />
				</Box>
			</Flex>
			<Flex justify='center' align='center' minHeight='10' ref={ref}>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
