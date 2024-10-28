import { useCreateBlockNote } from '@blocknote/react';
import { Container } from '@jung/design-system/components';
import { Stack, Typography } from '@jung/design-system/components';
import type { Post } from '@jung/shared/types';
import { ErrorBoundary } from '@jung/shared/ui';
import { Suspense } from 'react';
// FIXME: 절대경로
import Comments from '../../../features/comments/ui/Comments';
import CommentsSkeleton from '../../../features/comments/ui/CommentsSkeleton';
import BlockNote from './BlockNote';

type Props = {
	post: Post;
};

const BlockNoteErrorFallback = ({
	error,
	// resetErrorBoundary,
}: {
	error: Error;
	// resetErrorBoundary: () => void;
}) => {
	return (
		<Stack space='4' align='center' padding='6'>
			<Typography.Text level={3} color='error'>
				포스트 내용을 불러오는데 실패했습니다
			</Typography.Text>
			<Typography.SubText level={2} color='gray'>
				{error.message}
			</Typography.SubText>
			{/* <Button onClick={resetErrorBoundary} variant="ghost" color="primary">
        다시 시도
      </Button> */}
		</Stack>
	);
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
			<Suspense fallback={<CommentsSkeleton />}>
				<Comments postId={post.id} postLikeCount={post.likes} />
			</Suspense>
		</Container>
	);
};

export default PostContent;
