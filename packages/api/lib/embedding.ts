/**
 * Embedding 생성 유틸리티
 *
 * Gemini gemini-embedding-001 모델 사용
 * - 무료 할당량: 1500 RPM (requests per minute)
 * - 출력 차원: 3072 (고정밀 시맨틱 검색)
 * - 텍스트 → 벡터 변환
 */

import { GoogleGenerativeAI, TaskType } from '@google/generative-ai';
import { extractTextFromBlockNote, truncateText } from './extractText';

const EMBEDDING_MODEL = 'gemini-embedding-001';

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(
	process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
);

/**
 * 텍스트를 임베딩 벡터로 변환
 *
 * Google 공식 문서 권장: 문서 인덱싱 시 RETRIEVAL_DOCUMENT,
 * 검색 쿼리 시 RETRIEVAL_QUERY task type 사용
 *
 * @param text - 임베딩할 텍스트
 * @param taskType - 임베딩 용도 (기본: RETRIEVAL_QUERY)
 * @returns 3072 차원의 벡터
 *
 * @example
 * // 검색 쿼리용
 * const queryEmbed = await generateEmbedding('React 성능 최적화', TaskType.RETRIEVAL_QUERY);
 * // 문서 인덱싱용
 * const docEmbed = await generateEmbedding(docText, TaskType.RETRIEVAL_DOCUMENT);
 */
export async function generateEmbedding(
	text: string,
	taskType: TaskType = TaskType.RETRIEVAL_QUERY,
): Promise<number[]> {
	if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
		console.warn(
			'[embedding] GOOGLE_GENERATIVE_AI_API_KEY is not set, skipping embedding generation',
		);
		return [];
	}

	try {
		const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

		const result = await model.embedContent({
			content: { parts: [{ text }], role: 'user' },
			taskType,
		});

		return result.embedding.values;
	} catch (error) {
		console.warn(
			'[embedding] Failed to generate embedding:',
			error instanceof Error ? error.message : error,
		);
		return [];
	}
}

export { TaskType };

/**
 * 여러 텍스트를 배치로 임베딩
 *
 * Rate limit 고려하여 순차 처리 (delay 포함)
 *
 * @param texts - 임베딩할 텍스트 배열
 * @param delayMs - 요청 간 딜레이 (기본 100ms)
 * @returns 임베딩 벡터 배열
 */
export async function generateEmbeddingsBatch(
	texts: string[],
	delayMs = 100,
): Promise<number[][]> {
	const embeddings: number[][] = [];

	for (const text of texts) {
		const embedding = await generateEmbedding(text);
		embeddings.push(embedding);

		// Rate limit 방지를 위한 딜레이
		if (delayMs > 0) {
			await new Promise((resolve) => setTimeout(resolve, delayMs));
		}
	}

	return embeddings;
}

/**
 * 포스트 콘텐츠를 임베딩용 텍스트로 변환
 *
 * title + description + content 본문을 조합하여 검색에 적합한 텍스트 생성
 * content는 BlockNote JSON에서 순수 텍스트를 추출하여 포함
 *
 * 구조: [제목] [설명] [본문 (truncated)] [태그]
 * - 제목/설명은 검색 매칭의 핵심 시그널
 * - 본문은 의미적 차별화를 위한 컨텍스트
 * - 태그는 키워드 보강
 */
export function preparePostTextForEmbedding(post: {
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
	content_ko?: unknown;
	content_en?: unknown;
	tags?: string[];
}): string {
	const parts: string[] = [];

	// 제목 (한국어 우선)
	if (post.title_ko) parts.push(post.title_ko);
	if (post.title_en && post.title_en !== post.title_ko) {
		parts.push(post.title_en);
	}

	// 설명 (한국어 우선)
	if (post.description_ko) parts.push(post.description_ko);
	if (post.description_en && post.description_en !== post.description_ko) {
		parts.push(post.description_en);
	}

	// 본문 텍스트 (BlockNote JSON → 순수 텍스트, truncate)
	const bodyKo = extractTextFromBlockNote(post.content_ko);
	const bodyEn = extractTextFromBlockNote(post.content_en);

	if (bodyKo) parts.push(truncateText(bodyKo, 2000));
	if (bodyEn && bodyEn !== bodyKo) parts.push(truncateText(bodyEn, 1000));

	// 태그
	if (post.tags && post.tags.length > 0) {
		parts.push(post.tags.join(' '));
	}

	return parts.join('\n');
}
