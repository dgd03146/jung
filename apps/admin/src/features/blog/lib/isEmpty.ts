import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import type {
	Block,
	DefaultInlineContentSchema,
	DefaultStyleSchema,
	InlineContent,
} from '@blocknote/core';

/**
 * Checks if a block is non-empty.
 * @param block The block to check.
 * @returns True if the block is non-empty, false otherwise.
 */
export const isNonEmptyBlock = (block: Block): boolean => {
	switch (block.type) {
		case 'paragraph':
		case 'heading':
		case 'bulletListItem':
		case 'numberedListItem':
		case 'checkListItem':
			return block.content.some(isNonEmptyInlineContent);
		case 'image':
		case 'file':
		case 'video':
		case 'audio':
			return !!block.props.url;
		case 'table':
			return block.content.type === 'tableContent';
		default:
			return false;
	}
};

/**
 * Checks if inline content is non-empty.
 * @param content The inline content to check.
 * @returns True if the inline content is non-empty, false otherwise.
 */
const isNonEmptyInlineContent = (
	content: InlineContent<DefaultInlineContentSchema, DefaultStyleSchema>,
): boolean => {
	switch (content.type) {
		case 'text':
			return content.text.trim() !== '';
		case 'link':
			return !!content.href && content.content.some(isNonEmptyInlineContent);

		default:
			return false;
	}
};

export const isPostEmpty = (post: PostWithBlockContent): boolean => {
	const isTitleEmpty = post.title.trim() === '';
	const isDescriptionEmpty = post.description.trim() === '';
	const isCategoryEmpty = post.category.trim() === '';
	const isImageSrcEmpty = post.imagesrc.trim() === '';
	const isContentEmpty =
		post.content.length === 0 ||
		!post.content.some((block) => isNonEmptyBlock(block));

	return (
		isTitleEmpty &&
		isDescriptionEmpty &&
		isCategoryEmpty &&
		isImageSrcEmpty &&
		isContentEmpty
	);
};
