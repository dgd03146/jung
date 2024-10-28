'use client';

import { usePostQuery } from '@/fsd/features';
import { checkIsLiked } from '@/fsd/features/blog/lib/postOptimisticUpdates';
import CommentError from '@/fsd/features/comments/ui/CommentError';
import Comments from '@/fsd/features/comments/ui/Comments';
import CommentsSkeleton from '@/fsd/features/comments/ui/CommentsSkeleton';
import { useSupabaseAuth } from '@/fsd/shared/lib';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';
import BlockNote from './BlockNote';
// import PostContent from './PostContent';
import PostHeader from './PostHeader';
import PostLike from './PostLike';
import PostSidebar from './PostSidebar';

const PostDetail = ({ postId }: { postId: string }) => {
	const results = usePostQuery(postId);
	const post = results[0];

	if (!post) {
		throw new Error('Post not found');
	}

	const editor = useCreateBlockNote({ initialContent: post.content });

	const { user } = useSupabaseAuth();
	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex paddingY='10' columnGap='10'>
				<PostSidebar tags={post.tags} postId={postId} />
				<Container>
					<BlockNote editor={editor} />
					<PostLike
						postId={postId}
						likeCount={post.likes}
						isLiked={checkIsLiked(post, user?.id)}
					/>
					<ErrorBoundary fallback={(error) => <CommentError error={error} />}>
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
