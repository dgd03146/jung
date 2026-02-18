import { Box, Flex } from '@jung/design-system/components';
import { Suspense } from 'react';
import { PostListSkeleton } from '@/fsd/entities/blog';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	ViewModeProvider,
	ViewPosts,
} from '@/fsd/features/blog';

interface BlogLayoutProps {
	currentCategory?: string;
}

export const BlogLayout = ({ currentCategory }: BlogLayoutProps) => {
	return (
		<ViewModeProvider>
			<Flex gap={{ tablet: '10' }}>
				<Suspense fallback={<FilterPostCategoryAccordionSkeleton count={3} />}>
					<FilterPostCategoryAccordion currentCategory={currentCategory} />
				</Suspense>

				<Box as='main' minWidth='0' flex={1}>
					<Suspense fallback={<PostListSkeleton count={6} />}>
						<ViewPosts />
					</Suspense>
				</Box>
			</Flex>
		</ViewModeProvider>
	);
};
