import { useCreateBlockNote } from '@blocknote/react';
import { Container } from '@jung/design-system/components';
import type { Post } from '@jung/server/schemas/post';
import { Suspense } from 'react';
// FIXME: 절대경로
import Comments from '../../../features/comments/ui/Comments';
import CommentsSkeleton from '../../../features/comments/ui/CommentsSkeleton';
import BlockNote from './BlockNote';

type Props = {
	post: Post;
};

const PostContent = ({ post }: Props) => {
	const editor = useCreateBlockNote({ initialContent: post.content });

	return (
		<Container>
			<BlockNote editor={editor} />
			<Suspense fallback={<CommentsSkeleton />}>
				<Comments />
			</Suspense>
		</Container>
	);
};

export default PostContent;
