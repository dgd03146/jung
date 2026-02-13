import type { Block } from '@blocknote/core';
import { describe, expect, it } from 'vitest';
import { isEditorEmpty } from '../isEditorEmpty';

const createTextBlock = (text: string): Block => ({
	id: `block-${text}`,
	type: 'paragraph',
	props: {
		textColor: 'default',
		backgroundColor: 'default',
		textAlignment: 'left',
	},
	content: [{ type: 'text', text, styles: {} }],
	children: [],
});

const createEmptyBlock = (): Block => ({
	id: 'empty',
	type: 'paragraph',
	props: {
		textColor: 'default',
		backgroundColor: 'default',
		textAlignment: 'left',
	},
	content: [{ type: 'text', text: '', styles: {} }],
	children: [],
});

describe('isEditorEmpty', () => {
	it('빈 배열이면 true를 반환한다', () => {
		expect(isEditorEmpty([])).toBe(true);
	});

	it('빈 paragraph 블록만 있으면 true를 반환한다', () => {
		expect(isEditorEmpty([createEmptyBlock()])).toBe(true);
	});

	it('공백만 있는 텍스트 블록이면 true를 반환한다', () => {
		expect(isEditorEmpty([createTextBlock('   ')])).toBe(true);
	});

	it('텍스트가 있는 블록이면 false를 반환한다', () => {
		expect(isEditorEmpty([createTextBlock('Hello')])).toBe(false);
	});

	it('빈 블록과 텍스트 블록이 섞여있으면 false를 반환한다', () => {
		expect(isEditorEmpty([createEmptyBlock(), createTextBlock('Hi')])).toBe(
			false,
		);
	});

	it('paragraph가 아닌 블록이 있으면 false를 반환한다', () => {
		const imageBlock = {
			id: 'img-1',
			type: 'image',
			props: {
				url: 'test.jpg',
				textAlignment: 'left',
				backgroundColor: 'default',
			},
			content: undefined,
			children: [],
		} as unknown as Block;

		expect(isEditorEmpty([imageBlock])).toBe(false);
	});

	it('content가 빈 배열인 paragraph는 empty로 판정한다', () => {
		const block = {
			id: 'no-content',
			type: 'paragraph',
			props: {
				textColor: 'default',
				backgroundColor: 'default',
				textAlignment: 'left',
			},
			content: [],
			children: [],
		} as unknown as Block;

		expect(isEditorEmpty([block])).toBe(true);
	});
});
