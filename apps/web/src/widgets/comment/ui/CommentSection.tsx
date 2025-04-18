import {
	CommentList,
	CommentListSkeleton,
	CommentStats,
	EmptyComments,
	useCommentsQuery,
} from '@/fsd/entities/comment';
import { CreateCommentForm } from '@/fsd/features/comment/createComment';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSupabaseAuth,
} from '@/fsd/shared';

import { Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import { Suspense } from 'react';
import { CommentItemRenderer } from './CommentItemRenderer';

interface CommentSectionProps {
	postId: string;
	likeCount: number;
}

export const CommentSection = ({ postId, likeCount }: CommentSectionProps) => {
	const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
		useCommentsQuery(postId);
	const { user: currentUser } = useSupabaseAuth();

	const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage });

	const commentCount = data?.pages[0]?.totalCount ?? 0;
	const comments =
		data?.pages.flatMap((page: { items: Comment[] }) => page.items) ?? [];

	const renderItem = (comment: Comment) => (
		<CommentItemRenderer
			key={comment.id}
			comment={comment}
			postId={postId}
			currentUser={currentUser}
		/>
	);

	const isEmptyComments = commentCount === 0;

	return (
		<>
			<CommentStats commentCount={commentCount} likeCount={likeCount} />
			<CreateCommentForm postId={postId} />

			<Suspense fallback={<CommentListSkeleton />}>
				{isEmptyComments ? (
					<EmptyComments />
				) : (
					<CommentList
						comments={comments.filter((c) => !c.parent_id)}
						renderItem={renderItem}
					/>
				)}
			</Suspense>

			<Flex justify='center' align='center' ref={ref} minHeight='4'>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
