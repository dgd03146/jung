'use client';

import { Box } from '@jung/design-system/components';
import type { Comment } from '@jung/shared/types';
import type React from 'react';
import * as styles from './CommentItem.css';
import { CommentUserInfo } from './CommentUserInfo';

const URL_REGEX = /(https?:\/\/[^\s]+)/g;
const URL_TEST = /^https?:\/\/[^\s]+$/;

const renderTextWithLinks = (text: string): React.ReactNode[] => {
	const parts = text.split(URL_REGEX);
	return parts.map((part, i) => {
		if (URL_TEST.test(part)) {
			return (
				<a
					key={i}
					href={part}
					target='_blank'
					rel='noopener noreferrer'
					className={styles.commentLink}
				>
					{part}
				</a>
			);
		}
		return part;
	});
};

const renderContent = (content: string): React.ReactNode => {
	const lines = content.split('\n');
	const result: React.ReactNode[] = [];
	let bulletGroup: string[] = [];

	const flushBullets = () => {
		if (bulletGroup.length > 0) {
			result.push(
				<ul key={`ul-${result.length}`} className={styles.bulletList}>
					{bulletGroup.map((item, i) => (
						<li key={i} className={styles.bulletItem}>
							{renderTextWithLinks(item)}
						</li>
					))}
				</ul>,
			);
			bulletGroup = [];
		}
	};

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]!;
		if (line.startsWith('- ') || line.startsWith('• ')) {
			bulletGroup.push(line.slice(2));
		} else {
			flushBullets();
			result.push(
				<span key={`line-${result.length}`}>{renderTextWithLinks(line)}</span>,
			);
			if (i < lines.length - 1) {
				result.push(<br key={`br-${i}`} />);
			}
		}
	}

	flushBullets();
	return result;
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

	const commentUpdatedAt = comment.updated_at || comment.created_at;
	const avatarUrl = comment.user.avatar_url;
	const userName = comment.user.full_name;

	const displayContent = comment.content.replace(/\n{2,}/g, '\n').trim();

	return (
		<Box className={containerClassName}>
			<CommentUserInfo
				avatarUrl={avatarUrl}
				userName={userName}
				createdAt={commentUpdatedAt}
			/>

			<div className={styles.commentContent}>
				{renderContent(displayContent)}
			</div>

			{children}
		</Box>
	);
};
