'use client';

import { TogglePostLike } from '@/fsd/features/post';

import { usePostQuery } from '@/fsd/entities/post';

import { ViewComments } from '@/fsd/features/comment';
import { Container } from '@jung/design-system/components';
import dynamic from 'next/dynamic';

const BlockNoteEditor = dynamic(
	() => import('@/fsd/shared/ui/BlockNote').then((mod) => mod.BlockNote),
	{
		ssr: false,
		// loading: () => <EditorSkeleton />,
	},
);

export const PostDetailContent = ({ postId }: { postId: string }) => {
	const { data: post } = usePostQuery(postId);

	if (!post) {
		throw new Error('Post not found');
	}

	return (
		<Container flex={1} maxWidth='180'>
			<BlockNoteEditor initialContent={post.content} />
			<TogglePostLike
				postId={postId}
				likeCount={post.likes}
				likedBy={post.liked_by}
			/>
			<ViewComments targetId={postId} likeCount={post.likes} />
		</Container>
	);
};
