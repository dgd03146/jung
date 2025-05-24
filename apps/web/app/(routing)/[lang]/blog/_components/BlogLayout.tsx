import { PostListSkeleton } from '@/fsd/entities/post';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	ViewModeProvider,
	ViewPosts,
} from '@/fsd/features/post';
import { SearchBarSkeleton } from '@/fsd/shared';
import { BlogPageControls } from '@/fsd/views';
import { Box, Flex } from '@jung/design-system/components';
import { Suspense } from 'react';

interface BlogLayoutProps {
	currentCategory?: string;
}

export const BlogLayout = ({ currentCategory }: BlogLayoutProps) => {
	return (
		<Flex gap={{ tablet: '10' }}>
			<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
				<FilterPostCategoryAccordion currentCategory={currentCategory} />
			</Suspense>

			<ViewModeProvider>
				<Box as='main' minWidth='0' flex={1}>
					<Suspense fallback={<SearchBarSkeleton />}>
						<BlogPageControls />
					</Suspense>
					<Suspense fallback={<PostListSkeleton count={6} />}>
						<ViewPosts />
					</Suspense>
				</Box>
			</ViewModeProvider>
		</Flex>
	);
};
