import type { Block } from '@blocknote/core';

/**
 * BlockNote 에디터 블록 배열이 실질적으로 비어있는지 확인.
 * 모든 블록이 paragraph이면서 텍스트가 없으면 empty로 판정.
 * 이미지, 테이블 등 비텍스트 블록이 있으면 비어있지 않은 것으로 판정.
 */
export const isEditorEmpty = (blocks: Block[]): boolean => {
	if (blocks.length === 0) return true;

	return blocks.every((block) => {
		if (block.type !== 'paragraph') return false;

		const content = block.content;
		if (!Array.isArray(content) || content.length === 0) return true;

		return content.every((item) => item.type === 'text' && !item.text?.trim());
	});
};
