'use client';

import {
	CommentItem,
	CommentList,
	CommentListSkeleton,
	CommentStats,
	EmptyComments,
	useCommentsQuery,
	usePostQuery,
} from '@/fsd/entities/blog';
import {
	CreateCommentForm,
	DeleteCommentButton,
	EditCommentButton,
	LikeCommentButton,
	ReplyCommentButton,
} from '@/fsd/features/blog';
import {
	LoadingSpinner,
	useInfiniteScroll,
	useSupabaseAuth,
} from '@/fsd/shared';
import { Box, Flex } from '@jung/design-system';
import type { Comment } from '@jung/shared/types';
import * as styles from './CommentSection.css';

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

	const renderComment = (comment: Comment): React.ReactNode => {
		const isNested = !!comment.parent_id;
		const isOwner = currentUser?.id === comment.user_id;
		const isLiked = currentUser
			? comment.liked_by.includes(currentUser.id)
			: false;
		const canReply = !isNested && !!currentUser;

		return (
			<CommentItem
				key={comment.id}
				comment={comment}
				isNested={isNested}
				className={isNested ? styles.nestedCommentItem : ''}
			>
				<Flex justify='space-between' align='center' marginTop='4'>
					<Flex gap='2'>
						<LikeCommentButton
							commentId={comment.id}
							postId={postId}
							isLiked={isLiked}
							likesCount={comment.likes}
						/>
						<ReplyCommentButton
							commentId={comment.id}
							postId={postId}
							postTitle={post?.title || ''}
							canShow={canReply}
						/>
					</Flex>

					{isOwner && (
						<Flex gap='2'>
							<EditCommentButton
								commentId={comment.id}
								initialContent={comment.content}
								postId={postId}
								canShow={isOwner}
							/>
							<DeleteCommentButton commentId={comment.id} postId={postId} />
						</Flex>
					)}
				</Flex>

				{comment.replies && comment.replies.length > 0 && (
					<Box className={styles.replyContainer}>
						{comment.replies.map((reply) => renderComment(reply))}
					</Box>
				)}
			</CommentItem>
		);
	};

	const commentCount = commentsData?.pages[0]?.totalCount ?? 0;
	const comments =
		commentsData?.pages.flatMap((page: CommentPage) => page.items) ?? [];

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
					comments={comments.filter((c: Comment) => !c.parent_id)}
					renderItem={renderComment}
				/>
			)}

			<Flex justify='center' align='center' ref={ref} minHeight='4'>
				{isFetchingNextPage && hasNextPage && <LoadingSpinner size='small' />}
			</Flex>
		</>
	);
};
