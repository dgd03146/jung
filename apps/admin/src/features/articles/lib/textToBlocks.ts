import type { Block } from '@blocknote/core';

/**
 * AI Improve 결과(plain text)를 BlockNote Block[]로 변환
 * 줄바꿈으로 분리하여 paragraph block 배열 생성
 */
export const textToBlocks = (text: string): Block[] => {
	const lines = text.split('\n');

	return lines.map((line, index) => ({
		id: `ai-${index}`,
		type: 'paragraph' as const,
		props: {
			textColor: 'default' as const,
			backgroundColor: 'default' as const,
			textAlignment: 'left' as const,
		},
		content: [
			{
				type: 'text' as const,
				text: line,
				styles: {},
			},
		],
		children: [],
	}));
};
