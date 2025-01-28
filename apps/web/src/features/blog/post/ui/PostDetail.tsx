'use client';

import { CommentError, CommentListSkeleton } from '@/fsd/entities/comment';
import { PostHeader } from '@/fsd/entities/post';
import { CommentList } from '@/fsd/features/blog/comment';
import { useGetPostById } from '@/fsd/features/blog/post';
import { BlockNote } from '@/fsd/shared';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';
import * as styles from './PostDetail.css';
import PostLike from './PostLike';
import PostSidebar from './PostSidebar';

const PostDetail = ({ postId }: { postId: string }) => {
	const [post] = useGetPostById(postId);

	if (!post) {
		throw new Error('Post not found');
	}

	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex columnGap='10' className={styles.flexContainer}>
				<PostSidebar tags={post.tags} postId={postId} />
				<Container className={styles.contentContainer}>
					<BlockNote editor={editor} />
					<PostLike
						postId={postId}
						likeCount={post.likes}
						likedBy={post.liked_by}
					/>

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
