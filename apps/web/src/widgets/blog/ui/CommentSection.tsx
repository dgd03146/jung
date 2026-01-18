'use client';

import { Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import {
	CommentList,
	CommentListSkeleton,
	CommentStats,
	EmptyComments,
	useCommentsQuery,
	usePostQuery,
} from '@/fsd/entities/blog';
import { CreateCommentForm } from '@/fsd/features/blog';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSupabaseAuth,
} from '@/fsd/shared';
import { RecursiveComment } from './RecursiveComment';

interface CommentSectionProps {
	postId: string;
}

interface CommentPage {
	items: Comment[];
	totalCount: number;
	hasNextPage: boolean;
	nextCursor: string | null;
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

	const postTitle = post?.title || '';
	const commentCount = commentsData?.pages[0]?.totalCount ?? 0;
	const comments =
		commentsData?.pages.flatMap((page: CommentPage) => page.items) ?? [];
	const topLevelComments = comments.filter((c: Comment) => !c.parent_id);
	const isEmptyComments = !isLoading && commentCount === 0;

	const renderComment = (comment: Comment) => (
		<RecursiveComment
			key={comment.id}
			comment={comment}
			postId={postId}
			postTitle={postTitle}
			currentUserId={currentUser?.id}
		/>
	);

	return (
		<>
			<CommentStats commentCount={commentCount} />
			<CreateCommentForm postId={postId} postTitle={postTitle} />

			{isLoading ? (
				<CommentListSkeleton />
			) : isEmptyComments ? (
				<EmptyComments />
			) : (
				<CommentList comments={topLevelComments} renderItem={renderComment} />
			)}

			<Flex justify='center' align='center' ref={ref} minHeight='4'>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
