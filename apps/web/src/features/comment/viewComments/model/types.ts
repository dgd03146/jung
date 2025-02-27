import type { COMMENT_MODES } from '../config/constants';

export type CommentMode = (typeof COMMENT_MODES)[keyof typeof COMMENT_MODES];
