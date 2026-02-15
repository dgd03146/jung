import { describe, expect, it } from 'vitest';
import { textToBlocks } from '../textToBlocks';

describe('textToBlocks', () => {
	it('줄바꿈으로 분리된 텍스트를 paragraph 블록 배열로 변환한다', () => {
		const result = textToBlocks('Line 1\nLine 2\nLine 3');

		expect(result).toHaveLength(3);
		expect(result[0].content).toEqual([
			{ type: 'text', text: 'Line 1', styles: {} },
		]);
		expect(result[1].content).toEqual([
			{ type: 'text', text: 'Line 2', styles: {} },
		]);
		expect(result[2].content).toEqual([
			{ type: 'text', text: 'Line 3', styles: {} },
		]);
	});

	it('단일 줄 텍스트를 1개 블록으로 변환한다', () => {
		const result = textToBlocks('Single line');

		expect(result).toHaveLength(1);
		expect(result[0].content).toEqual([
			{ type: 'text', text: 'Single line', styles: {} },
		]);
	});

	it('빈 문자열을 1개 빈 블록으로 변환한다', () => {
		const result = textToBlocks('');

		expect(result).toHaveLength(1);
		expect(result[0].content).toEqual([{ type: 'text', text: '', styles: {} }]);
	});

	it('각 블록의 type이 paragraph이다', () => {
		const result = textToBlocks('Line 1\nLine 2');

		for (const block of result) {
			expect(block.type).toBe('paragraph');
		}
	});

	it('각 블록에 고유한 id가 있다', () => {
		const result = textToBlocks('A\nB\nC');
		const ids = result.map((block) => block.id);
		const uniqueIds = new Set(ids);

		expect(uniqueIds.size).toBe(ids.length);
	});

	it('블록의 props에 기본 정렬/색상이 설정된다', () => {
		const result = textToBlocks('Test');

		expect(result[0].props).toEqual({
			textColor: 'default',
			backgroundColor: 'default',
			textAlignment: 'left',
		});
	});

	it('연속 빈 줄을 각각 빈 블록으로 변환한다', () => {
		const result = textToBlocks('Hello\n\nWorld');

		expect(result).toHaveLength(3);
		expect(result[1].content).toEqual([{ type: 'text', text: '', styles: {} }]);
	});
});
