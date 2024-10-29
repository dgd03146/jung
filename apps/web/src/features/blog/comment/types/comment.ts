import type { Comment } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';

export interface CommentPage {
	items: Comment[];
	nextCursor: string | null;
	hasNextPage: boolean;
}

export type CommentData = InfiniteData<CommentPage, string | null>;
