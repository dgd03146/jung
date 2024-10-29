'use client';

import { CommentError, CommentListSkeleton } from '@/fsd/entities/comment';
import { PostHeader, PostSidebar } from '@/fsd/entities/post';
import { CommentList } from '@/fsd/features/blog/comment';
import { checkIsLiked, useGetPostById } from '@/fsd/features/blog/post';
import { BlockNote, useSupabaseAuth } from '@/fsd/shared';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';

import PostNavigation from '@/fsd/entities/post/ui/PostNavigation';
import PostLike from './PostLike';

const PostDetail = ({ postId }: { postId: string }) => {
	const results = useGetPostById(postId);
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
					<PostNavigation postId={postId} />
					<ErrorBoundary fallback={(error) => <CommentError error={error} />}>
						<Suspense fallback={<CommentListSkeleton />}>
							<CommentList postId={postId} postLikeCount={post.likes} />
						</Suspense>
					</ErrorBoundary>
				</Container>
			</Flex>
		</Container>
	);
};

export default PostDetail;
