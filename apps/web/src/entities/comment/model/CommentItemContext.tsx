'use client';

import type { Comment } from '@jung/shared/types';
import { createContext, useContext } from 'react';

interface CommentItemContextValue {
	comment: Comment | null;
}

const CommentItemContext = createContext<CommentItemContextValue | null>(null);

interface CommentItemProviderProps {
	comment: Comment;
	children: React.ReactNode;
}

export const CommentItemProvider = ({
	comment,
	children,
}: CommentItemProviderProps) => {
	const value = { comment };

	return (
		<CommentItemContext.Provider value={value}>
			{children}
		</CommentItemContext.Provider>
	);
};

export const useCommentItemContext = () => {
	const context = useContext(CommentItemContext);
	if (!context) {
		throw new Error(
			'useCommentItemContext must be used within a CommentItemProvider',
		);
	}
	return context;
};

export const CommentContext = createContext<Comment | null>(null);

export const useCommentContext = () => {
	const context = useContext(CommentContext);
	if (!context) {
		throw new Error(
			'useCommentContext must be used within a CommentItem provider',
		);
	}
	return context;
};
