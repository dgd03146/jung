import { Container, Typography } from '@jung/design-system/components';
import CategoryList from './CategoryList';
import Featured from './FeaturedPost';
import PostList from './PostList';

const BlogPage = () => {
	return (
		<Container>
			{/* FIXME: 나중에 TYPGORAPHY LAYOUT으로 빼기 */}
			<Typography.Heading level={1} color='primary' marginBottom='8'>
				blog.
			</Typography.Heading>
			<CategoryList />
			<Featured />
			<PostList />
		</Container>
	);
};

export default BlogPage;
