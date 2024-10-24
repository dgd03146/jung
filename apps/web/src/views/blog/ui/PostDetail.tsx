'use client';

import { usePostQuery } from '@/fsd/features';
import CommentError from '@/fsd/features/comments/ui/CommentError';
import Comments from '@/fsd/features/comments/ui/Comments';
import CommentsSkeleton from '@/fsd/features/comments/ui/CommentsSkeleton';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';
import BlockNote from './BlockNote';
// import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostSidebar from './PostSidebar';

const PostDetail = ({ postId }: { postId: string }) => {
	const results = usePostQuery(postId);
	const post = results[0];

	if (!post) return <div>Post not found</div>;

	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex paddingY='10' columnGap='10'>
				<PostSidebar tags={post.tags} />
				<Container>
					<BlockNote editor={editor} />
					<ErrorBoundary fallback={<CommentError />}>
						<Suspense fallback={<CommentsSkeleton />}>
							<Comments postId={postId} postLikeCount={post.likes} />
						</Suspense>
					</ErrorBoundary>
				</Container>
			</Flex>
		</Container>
	);
};

export default PostDetail;
