/**
 * BlockNote JSON 콘텐츠에서 순수 텍스트를 추출
 *
 * BlockNote 구조: [{id, type, content: [{type: 'text', text: '...'}], children: [...]}]
 *
 * 임베딩 생성, 읽기 시간 계산 등에서 재사용
 */

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

/**
 * BlockNote JSON 블록 배열에서 순수 텍스트 추출
 *
 * @param content - BlockNote JSON (unknown 타입으로 받아 안전하게 파싱)
 * @returns 추출된 텍스트 문자열
 */
export function extractTextFromBlockNote(content: unknown): string {
	if (!content || !Array.isArray(content)) return '';

	const blocks = content as BlockContent[];
	const parts: string[] = [];

	const traverse = (block: BlockContent) => {
		if (block.content && Array.isArray(block.content)) {
			for (const item of block.content) {
				if (item.type === 'text' && item.text) {
					parts.push(item.text);
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

	return parts.join(' ');
}

/**
 * 텍스트를 최대 길이로 잘라서 반환
 *
 * 임베딩 모델의 토큰 제한을 고려하여 적절한 길이로 truncate.
 * 단어 경계에서 잘라 의미 손실 최소화.
 *
 * @param text - 원본 텍스트
 * @param maxChars - 최대 문자 수 (기본 3000자 ≈ 약 1500 토큰)
 */
export function truncateText(text: string, maxChars = 3000): string {
	if (text.length <= maxChars) return text;

	// 단어 경계에서 자르기
	const truncated = text.slice(0, maxChars);
	const lastSpace = truncated.lastIndexOf(' ');
	return lastSpace > maxChars * 0.8 ? truncated.slice(0, lastSpace) : truncated;
}
