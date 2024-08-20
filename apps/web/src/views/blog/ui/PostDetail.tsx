'use client';

import { usePostQuery } from '@/fsd/features';
import { Container, Flex } from '@jung/design-system/components';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostSidebar from './PostSidebar';

const PostDetail = ({ postId }: { postId: string }) => {
	const { data: post, isLoading } = usePostQuery(postId);

	// FIXME: Suspense랑 활용
	if (isLoading) return <div>Loading...</div>;
	if (!post) return <div>Post not found</div>;

	const { title, imagesrc, date, tags } = post;

	return (
		<Container>
			<PostHeader title={title} imagesrc={imagesrc} date={date} />
			<Flex paddingY='10' columnGap='20'>
				<PostSidebar tags={tags} />
				<PostContent />
			</Flex>
		</Container>
	);
};

export default PostDetail;
