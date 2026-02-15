import type { Block } from '@blocknote/core';
import { describe, expect, it } from 'vitest';
import { deserializeContent, serializeContent } from '../serializeContent';

const createBlock = (text: string): Block => ({
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

describe('serializeContent', () => {
	it('Block[]를 JSON 문자열로 직렬화한다', () => {
		const blocks = [createBlock('Hello'), createBlock('World')];
		const result = serializeContent(blocks);

		expect(typeof result).toBe('string');
		expect(JSON.parse(result)).toEqual(blocks);
	});

	it('빈 배열을 직렬화한다', () => {
		const result = serializeContent([]);

		expect(result).toBe('[]');
	});

	it('이미지 블록이 포함된 Block[]를 직렬화한다', () => {
		const blocks: Block[] = [
			createBlock('Before image'),
			{
				id: 'img-1',
				type: 'image',
				props: {
					url: 'articles/abc123.jpg',
					caption: '',
					previewWidth: 512,
					textAlignment: 'left',
					backgroundColor: 'default',
				},
				content: undefined,
				children: [],
			} as unknown as Block,
		];
		const result = serializeContent(blocks);
		const parsed = JSON.parse(result);

		expect(parsed).toHaveLength(2);
		expect(parsed[1].type).toBe('image');
		expect(parsed[1].props.url).toBe('articles/abc123.jpg');
	});
});

describe('deserializeContent', () => {
	it('JSON 문자열을 Block[]로 역직렬화한다', () => {
		const blocks = [createBlock('Test')];
		const json = JSON.stringify(blocks);
		const result = deserializeContent(json);

		expect(result).toEqual(blocks);
	});

	it('빈 배열 JSON을 역직렬화한다', () => {
		const result = deserializeContent('[]');

		expect(result).toEqual([]);
	});

	it('잘못된 JSON에서 SyntaxError를 던진다', () => {
		expect(() => deserializeContent('not json')).toThrow(SyntaxError);
	});

	it('배열이 아닌 JSON에서 에러를 던진다', () => {
		expect(() => deserializeContent('{"key":"value"}')).toThrow(
			'Invalid content: expected an array of blocks',
		);
	});
});

describe('serializeContent <-> deserializeContent 왕복', () => {
	it('직렬화 후 역직렬화하면 원본과 일치한다', () => {
		const original = [createBlock('Hello'), createBlock('World')];
		const serialized = serializeContent(original);
		const deserialized = deserializeContent(serialized);

		expect(deserialized).toEqual(original);
	});
});
