import { PostListSkeleton } from '@/fsd/entities/post';
// import FeaturedPost from './FeaturedPost';
// import FeaturedSkeleton from './FeaturedSkeleton';
import { PostList } from '@/fsd/features/blog/post';
import { CategoryList } from '@/fsd/shared';
import { Container } from '@jung/design-system/components';
import { Suspense } from 'react';

const BlogPage = () => {
	return (
		<Container>
			<CategoryList />
			{/* <Suspense fallback={<FeaturedSkeleton />}>
        <FeaturedPost />
      </Suspense> */}
			<Suspense fallback={<PostListSkeleton count={6} />}>
				<PostList />
			</Suspense>
		</Container>
	);
};

export default BlogPage;
