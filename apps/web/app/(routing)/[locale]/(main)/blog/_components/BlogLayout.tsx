import { Box, Flex } from '@jung/design-system/components';
import { Suspense } from 'react';
import { PostListSkeleton } from '@/fsd/entities/blog';
import {
	FilterPostCategoryAccordion,
	FilterPostCategoryAccordionSkeleton,
	ViewModeProvider,
	ViewPosts,
} from '@/fsd/features/blog';

const SKELETON_CATEGORY_COUNT = 3;
const SKELETON_POST_COUNT = 6;

interface BlogLayoutProps {
	currentCategory?: string;
}

export const BlogLayout = ({ currentCategory }: BlogLayoutProps) => {
	return (
		<ViewModeProvider>
			<Flex gap={{ tablet: '10' }}>
				<Suspense
					fallback={
						<FilterPostCategoryAccordionSkeleton
							count={SKELETON_CATEGORY_COUNT}
						/>
					}
				>
					<FilterPostCategoryAccordion currentCategory={currentCategory} />
				</Suspense>

				<Box as='main' minWidth='0' flex={1}>
					<Suspense fallback={<PostListSkeleton count={SKELETON_POST_COUNT} />}>
						<ViewPosts />
					</Suspense>
				</Box>
			</Flex>
		</ViewModeProvider>
	);
};
