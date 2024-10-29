import { CommentListSkeleton } from '@/fsd/entities/comment';
import { CommentList } from '@/fsd/features/blog/comment';
import { BlockNote, BlockNoteErrorFallback } from '@/fsd/shared';
import { useCreateBlockNote } from '@blocknote/react';
import { Container } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';

type Props = {
	post: Post;
};

const PostContent = ({ post }: Props) => {
	const editor = useCreateBlockNote({
		initialContent: post.content,
	});

	return (
		<Container>
			<ErrorBoundary
				fallback={(error) => <BlockNoteErrorFallback error={error} />}
			>
				<BlockNote editor={editor} />
			</ErrorBoundary>
			<Suspense fallback={<CommentListSkeleton />}>
				<CommentList postId={post.id} postLikeCount={post.likes} />
			</Suspense>
		</Container>
	);
};

export default PostContent;
