'use client';

// TODO: 경로 수정
import { usePostsQuery } from '@/src/features/blog/api/usePostQueries';
import { Container, Grid } from '@jung/design-system/components';
import Post from './Post';

const PostList = () => {
	// trpc로 client에서 data fetching하기 react query처럼 사용
	const result = usePostsQuery();
	const posts = result[0];

	return (
		<Container marginY='12'>
			<Grid
				columnGap='4'
				rowGap='8'
				gridTemplateColumns={{
					mobile: '1',
					tablet: '1/2',
					laptop: '1/3',
				}}
			>
				{posts?.slice(1)?.map((post, index) => (
					<Post key={post.id} index={index} {...post} />
				))}
			</Grid>
		</Container>
	);
};

export default PostList;
