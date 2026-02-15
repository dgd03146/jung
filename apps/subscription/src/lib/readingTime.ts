const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(text: string): number {
	const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
	const minutes = Math.ceil(wordCount / WORDS_PER_MINUTE);
	return Math.max(1, minutes);
}
