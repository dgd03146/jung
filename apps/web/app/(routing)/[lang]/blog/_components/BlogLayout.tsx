import { PostListSkeleton } from '@/fsd/entities/post';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
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
		<Flex gap={{ mobile: '0', tablet: '10' }}>
			<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
				<FilterPostCategoryAccordion currentCategory={currentCategory} />
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
	);
};
