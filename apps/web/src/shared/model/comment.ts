import type { CommentQueryResult } from '@jung/shared/types';
import type { InfiniteData } from '@tanstack/react-query';

/** Type representing infinite scroll comment data */
export type CommentData = InfiniteData<CommentQueryResult, string | null>;
