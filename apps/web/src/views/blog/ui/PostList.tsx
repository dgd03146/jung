'use client';

// TODO: 경로 수정
import { usePostsQuery } from '@/fsd/features/blog/api/usePostQueries';
import { Container, Grid } from '@jung/design-system/components';
import Post from './Post';

const PostList = () => {
	const [data] = usePostsQuery();
	const posts = data;

	return (
		<Container>
			<Grid
				columnGap='4'
				rowGap='8'
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					laptop: '1/3',
				}}
			>
				{posts.map((post, index) => (
					<Post key={post.id} index={index} {...post} />
				))}
			</Grid>
		</Container>
	);
};

export default PostList;
