'use client';

import {
	CommentList,
	CommentListSkeleton,
	CommentStats,
	EmptyComments,
	useCommentsQuery,
} from '@/fsd/entities/comment';
import { usePostQuery } from '@/fsd/entities/post';
import { CreateCommentForm } from '@/fsd/features/comment';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSupabaseAuth,
} from '@/fsd/shared';
import { Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import { CommentItemRenderer } from './CommentItemRenderer';

interface CommentSectionProps {
	postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
	const {
		data: commentsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
	} = useCommentsQuery(postId);

	const { data: post } = usePostQuery(postId);

	const { user: currentUser } = useSupabaseAuth();

	const { ref } = useInfiniteScroll({ hasNextPage, fetchNextPage });

	const commentCount = commentsData?.pages[0]?.totalCount ?? 0;
	const comments =
		commentsData?.pages.flatMap((page: { items: Comment[] }) => page.items) ??
		[];

	const renderItem = (comment: Comment) => (
		<CommentItemRenderer
			key={comment.id}
			comment={comment}
			postId={postId}
			postTitle={post?.title || ''}
			currentUser={currentUser}
		/>
	);

	const isEmptyComments = !isLoading && commentCount === 0;

	return (
		<>
			<CommentStats commentCount={commentCount} />
			<CreateCommentForm postId={postId} postTitle={post?.title || ''} />

			{isLoading ? (
				<CommentListSkeleton />
			) : isEmptyComments ? (
				<EmptyComments />
			) : (
				<CommentList
					comments={comments.filter((c) => !c.parent_id)}
					renderItem={renderItem}
				/>
			)}

			<Flex justify='center' align='center' ref={ref} minHeight='4'>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
