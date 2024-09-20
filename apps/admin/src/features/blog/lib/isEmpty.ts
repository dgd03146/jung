import type { Block } from '@blocknote/core';
import type { PostData } from '../types/postData';

export const isNonEmptyBlock = (block: Block) =>
	block.type !== 'paragraph' ||
	block.content.some(
		(content) => content.type === 'text' && content.text.trim() !== '',
	);

export const isPostEmpty = (post: PostData) =>
	post.title.trim() === '' && post.content.length === 0;
