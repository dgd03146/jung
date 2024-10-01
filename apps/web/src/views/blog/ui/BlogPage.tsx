import { Container, Typography } from '@jung/design-system/components';
import { Suspense } from 'react';
import CategoryList from './CategoryList';
// import FeaturedPost from './FeaturedPost';
// import FeaturedSkeleton from './FeaturedSkeleton';
import PostList from './PostList';
import PostListSkeleton from './PostListSkeleton';

const BlogPage = () => {
	return (
		<Container>
			{/* FIXME: 나중에 TYPGORAPHY 공용 LAYOUT으로 빼기 */}
			<Typography.Heading level={3} color='primary' marginBottom='8'>
				blog.
			</Typography.Heading>
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
