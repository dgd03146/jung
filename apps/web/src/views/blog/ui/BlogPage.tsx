'use client';

import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	SelectViewMode,
	ViewPosts,
} from '@/fsd/features/post';

import { PostListSkeleton } from '@/fsd/entities';
import type { ViewMode } from '@/fsd/entities/post';

import { SearchBar, SearchBarSkeleton } from '@/fsd/shared';
import { Box, Flex } from '@jung/design-system/components';
import { Suspense, useState } from 'react';

export const BlogPage = () => {
	const [viewMode, setViewMode] = useState<ViewMode>('list');

	return (
		<Flex gap={{ mobile: '0', tablet: '10' }}>
			<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
				<FilterPostCategoryAccordion />
			</Suspense>
			<Box as='main' minWidth='0' flex='1'>
				<Flex
					align='center'
					gap={{ mobile: '1', tablet: '2.5' }}
					marginBottom='2'
				>
					<Suspense fallback={<SearchBarSkeleton />}>
						<SearchBar />
					</Suspense>
					<SelectViewMode selected={viewMode} onSelect={setViewMode} />
				</Flex>
				<Suspense fallback={<PostListSkeleton count={6} />}>
					<ViewPosts viewMode={viewMode} />
				</Suspense>
			</Box>
		</Flex>
	);
};
