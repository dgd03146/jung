import type { PostWithBlockContent } from '@/fsd/entities/post/model/post';
import type {
	Block,
	DefaultInlineContentSchema,
	DefaultStyleSchema,
	InlineContent,
} from '@blocknote/core';

/**
 * Checks if inline content is non-empty.
 * Used for validation only.
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

/**
 * Checks if a block has meaningful content.
 * Used for validation only, not for display filtering.
 */
const hasContent = (block: Block): boolean => {
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
 * Checks if a post is completely empty (for validation).
 */
export const isPostEmpty = (post: PostWithBlockContent): boolean => {
	const isTitleEmpty = post.title.trim() === '';
	const isDescriptionEmpty = post.description.trim() === '';
	const isCategoryEmpty = post.category_id.trim() === '';
	const isImageSrcEmpty = post.imagesrc.trim() === '';
	const isContentEmpty =
		post.content.length === 0 ||
		!post.content.some((block) => hasContent(block));

	return (
		isTitleEmpty &&
		isDescriptionEmpty &&
		isCategoryEmpty &&
		isImageSrcEmpty &&
		isContentEmpty
	);
};
