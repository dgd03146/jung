'use client';

import { Box, Button, Flex, Typography } from '@jung/design-system/components';
import { vars } from '@jung/design-system/styles/theme.css';
import type { Comment } from '@jung/shared/types';
import type React from 'react';
import {
	FaEdit,
	FaHeart,
	FaRegComment,
	FaRegHeart,
	FaTrash,
} from 'react-icons/fa';
import {
	CommentItemProvider,
	useCommentItemContext,
} from '../model/CommentItemContext';
import * as styles from './CommentItem.css.ts';
import { CommentUserInfo } from './CommentUserInfo';

const UserInfo = () => {
	const { comment } = useCommentItemContext();
	if (!comment) return null;

	const commentUpdatedAt = comment.updated_at || comment.created_at;
	const avatarUrl = comment.user.avatar_url || '/default-avatar.png';
	const userName = comment.user.full_name;

	return (
		<CommentUserInfo
			avatarUrl={avatarUrl}
			userName={userName}
			createdAt={commentUpdatedAt}
		/>
	);
};

const Content = () => {
	const { comment } = useCommentItemContext();
	if (!comment) return null;

	return (
		<Typography.SubText className={styles.commentContent}>
			{comment.content}
		</Typography.SubText>
	);
};

interface ActionsProps {
	children?: React.ReactNode;
}
const Actions = ({ children }: ActionsProps) => {
	return (
		<Flex justify='space-between' align='center' marginTop='4'>
			{children}
		</Flex>
	);
};

interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean;
	children?: React.ReactNode;
	color?: keyof typeof vars.palette;
}

interface LikeButtonUIProps extends ButtonUIProps {
	isLiked?: boolean;
	likesCount?: number;
}

const LikeButtonUI = ({
	isLoading,
	isLiked,
	likesCount,
	children,
	...props
}: LikeButtonUIProps) => {
	return (
		<Button variant='ghost' fontSize='xxs' disabled={isLoading} {...props}>
			{isLiked ? (
				<FaHeart
					size={12}
					style={{ marginRight: '4px' }}
					color={vars.palette.error}
				/>
			) : (
				<FaRegHeart size={12} style={{ marginRight: '4px' }} />
			)}
			{children ?? likesCount ?? 0}
		</Button>
	);
};

const EditButtonUI = ({ isLoading, children, ...props }: ButtonUIProps) => {
	return (
		<Button variant='ghost' fontSize='xxs' disabled={isLoading} {...props}>
			<FaEdit size={12} style={{ marginRight: '4px' }} />
			{children ?? 'Edit'}
		</Button>
	);
};

const DeleteButtonUI = ({ isLoading, children, ...props }: ButtonUIProps) => {
	return (
		<Button
			variant='ghost'
			fontSize='xxs'
			disabled={isLoading}
			color='error'
			{...props}
		>
			<FaTrash size={12} style={{ marginRight: '4px' }} />
			{children ?? 'Delete'}
		</Button>
	);
};

const ReplyButtonUI = ({ isLoading, children, ...props }: ButtonUIProps) => {
	return (
		<Button variant='ghost' fontSize='xxs' disabled={isLoading} {...props}>
			<FaRegComment size={12} style={{ marginRight: '4px' }} />
			{children ?? 'Reply'}
		</Button>
	);
};

interface CommentItemProps {
	comment: Comment;
	children: React.ReactNode;
	isNested?: boolean;
	className?: string;
}

export const CommentItem = ({
	comment,
	children,
	isNested = false,
	className = '',
}: CommentItemProps) => {
	const containerClassName = `${
		isNested ? styles.nestedCommentContainer : styles.commentContainer
	} ${className}`;

	return (
		<CommentItemProvider comment={comment}>
			<Box className={containerClassName}>{children}</Box>
		</CommentItemProvider>
	);
};

CommentItem.UserInfo = UserInfo;
CommentItem.Content = Content;
CommentItem.Actions = Actions;
CommentItem.LikeButtonUI = LikeButtonUI;
CommentItem.EditButtonUI = EditButtonUI;
CommentItem.DeleteButtonUI = DeleteButtonUI;
CommentItem.ReplyButtonUI = ReplyButtonUI;
