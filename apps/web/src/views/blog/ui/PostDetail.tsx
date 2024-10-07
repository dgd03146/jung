'use client';

import { usePostQuery } from '@/fsd/features';
import { Container, Flex } from '@jung/design-system/components';
import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostSidebar from './PostSidebar';

const PostDetail = ({ postId }: { postId: string }) => {
	const results = usePostQuery(postId);
	const post = results[0];

	if (!post) return <div>Post not found</div>;

	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex paddingY='10' columnGap='10'>
				<PostSidebar tags={post.tags} />
				<PostContent post={post} />
			</Flex>
		</Container>
	);
};

export default PostDetail;
