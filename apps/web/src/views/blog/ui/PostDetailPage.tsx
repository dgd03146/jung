'use client';

import {
	PostHeader,
	PostNavigation,
	useAdjacentPostsQuery,
	usePostQuery,
} from '@/fsd/entities/post';
import { ViewComments } from '@/fsd/features/comment';
import { TogglePostLike } from '@/fsd/features/post';
import { useCreateBlockNote } from '@blocknote/react';
import { Container, Flex } from '@jung/design-system/components';
import dynamic from 'next/dynamic';
import * as styles from './PostDetailPage.css';

const BlockNoteEditor = dynamic(
	() => import('@/fsd/shared/ui/BlockNote').then((mod) => mod.BlockNote),
	{
		ssr: false,
	},
);

export const PostDetailPage = ({ postId }: { postId: string }) => {
	const { data: post } = usePostQuery(postId);
	const { data: adjacentPosts } = useAdjacentPostsQuery(postId);

	if (!post) {
		throw new Error('Post not found');
	}

	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container marginX='auto'>
			<PostHeader post={post} />
			<Flex
				flexDirection={{ base: 'column-reverse', laptop: 'row' }}
				gap={{ base: '0', laptop: '10' }}
				marginY={{ base: '4', laptop: '10' }}
			>
				<PostNavigation tags={post.tags} adjacentPosts={adjacentPosts} />
				<Container className={styles.contentContainer}>
					<BlockNoteEditor editor={editor} />
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
