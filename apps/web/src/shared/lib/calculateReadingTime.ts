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

const KOREAN_CPM = 500;
const ENGLISH_WPM = 200;
const KOREAN_CHAR_REGEX = /[\u3131-\u318E\uAC00-\uD7A3]/g;

const getReadingStats = (content: unknown) => {
	if (!isValidBlockContent(content)) return null;
	const text = extractTextFromBlocks(content);

	const koreanChars = (text.match(KOREAN_CHAR_REGEX) || []).length;
	const nonKoreanText = text.replace(KOREAN_CHAR_REGEX, ' ');
	const englishWords = nonKoreanText.split(/\s+/).filter(Boolean).length;

	const koreanMinutes = koreanChars / KOREAN_CPM;
	const englishMinutes = englishWords / ENGLISH_WPM;
	const totalMinutes = koreanMinutes + englishMinutes;
	const minutes = Math.max(1, Math.ceil(totalMinutes));
	const words = koreanChars + englishWords;

	return {
		text: `${minutes} min read`,
		minutes: totalMinutes,
		words,
		time: totalMinutes * 60000,
	};
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
