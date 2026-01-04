'use client';

import dynamic from 'next/dynamic';

import { usePostQuery } from '@/fsd/entities/blog';
import { TogglePostLike } from '@/fsd/features/blog';
import { EditorSkeleton } from '@/fsd/shared/ui/EditorSkeleton';

const BlockNoteEditor = dynamic(
	() => import('@/fsd/shared/ui/BlockNote').then((mod) => mod.BlockNote),
	{
		ssr: false,
		loading: () => <EditorSkeleton />,
	},
);

export const PostDetailContent = ({ postId }: { postId: string }) => {
	const { data: post } = usePostQuery(postId);

	if (!post) {
		throw new Error('Post not found');
	}

	return (
		<>
			<BlockNoteEditor initialContent={post.content} />
			<TogglePostLike postId={postId} />
		</>
	);
};
