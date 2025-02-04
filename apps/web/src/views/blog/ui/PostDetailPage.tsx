'use client';

import {
	PostHeader,
	PostNavigation,
	useAdjacentPostsQuery,
} from '@/fsd/entities/post';
import { usePostQuery } from '@/fsd/entities/post';
import { ViewComments } from '@/fsd/features/comment';
import { TogglePostLike } from '@/fsd/features/post';
import { BlockNote } from '@/fsd/shared';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import * as styles from './PostDetailPage.css';

export const PostDetailPage = ({ postId }: { postId: string }) => {
	const [post] = usePostQuery(postId);
	const [adjacentPosts] = useAdjacentPostsQuery(postId);

	if (!post) {
		throw new Error('Post not found');
	}

	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex columnGap='10' className={styles.flexContainer}>
				<PostNavigation tags={post.tags} adjacentPosts={adjacentPosts} />
				<Container className={styles.contentContainer}>
					<BlockNote editor={editor} />
					<TogglePostLike
						postId={postId}
						likeCount={post.likes}
						likedBy={post.liked_by}
					/>
					<ViewComments targetId={postId} likeCount={post.likes} />
				</Container>
			</Flex>
		</Container>
	);
};
