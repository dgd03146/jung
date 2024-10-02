'use client';

// TODO: 절대경로로 수정
import { useGetAllPosts } from '@/fsd/features/blog/api/useGetAllPosts';

import LoadingSpinner from '@/fsd/shared/ui/LoadingSpinner';
import { Box, Container, Grid } from '@jung/design-system/components';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Post from './Post';

type Sort = 'latest' | 'oldest' | 'popular';

const PostList = () => {
	const searchParams = useSearchParams();
	const cat = searchParams.get('cat') || 'all';
	const sort = (searchParams.get('sort') as Sort) || 'latest';
	const q = searchParams.get('q') || '';

	// FIXME: 페칭하는거 훅으로 빼면 좋을듯 리팩토링시
	const [data, query] = useGetAllPosts({ cat, sort, q });

	const { fetchNextPage, hasNextPage, isFetchingNextPage } = query;

	const { ref, inView } = useInView();

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, fetchNextPage, hasNextPage]);

	const allPosts = data?.pages.flatMap((page) => page.items) || [];

	// TODO: POSTS 없는 경우 처리

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
				{allPosts.map((post, index) => (
					<Post key={post.id} index={index} {...post} />
				))}
			</Grid>
			<Box ref={ref} minHeight='10'>
				{isFetchingNextPage && <LoadingSpinner size='small' />}
			</Box>
		</Container>
	);
};

export default PostList;
