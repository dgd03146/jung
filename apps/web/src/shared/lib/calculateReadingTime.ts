import readingTime from 'reading-time';

type InlineContent = {
	type: string;
	text?: string;
};

type BlockContent = {
	id?: string;
	type: string;
	content?: InlineContent[];
	children?: BlockContent[];
};

const DEFAULTS = {
	READING_TIME: '1 min read',
	READING_MINUTES: 1,
	WORD_COUNT: 0,
} as const;

const isValidBlockContent = (content: unknown): content is BlockContent[] =>
	Boolean(content && Array.isArray(content));

const extractTextFromBlocks = (blocks: BlockContent[]): string => {
	let text = '';

	const traverse = (block: BlockContent) => {
		if (block.content && Array.isArray(block.content)) {
			for (const item of block.content) {
				if (item.type === 'text' && item.text) {
					text += `${item.text} `;
				}
			}
		}
		if (block.children) {
			for (const child of block.children) {
				traverse(child);
			}
		}
	};

	for (const block of blocks) {
		traverse(block);
	}

	return text;
};

const getReadingStats = (content: unknown) => {
	if (!isValidBlockContent(content)) return null;
	const text = extractTextFromBlocks(content);
	return readingTime(text);
};

export const calculateReadingTime = (content: unknown): string => {
	const stats = getReadingStats(content);
	return stats?.text ?? DEFAULTS.READING_TIME;
};

export const getReadingTimeMinutes = (content: unknown): number => {
	const stats = getReadingStats(content);
	return stats ? Math.ceil(stats.minutes) : DEFAULTS.READING_MINUTES;
};

export const getWordCount = (content: unknown): number => {
	const stats = getReadingStats(content);
	return stats?.words ?? DEFAULTS.WORD_COUNT;
};
