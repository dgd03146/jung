/**
 * Embedding 생성 유틸리티
 *
 * Gemini gemini-embedding-001 모델 사용
 * - 무료 할당량: 1000 RPD (requests per day)
 * - 기본 차원: 3072 (768, 1536, 3072 지원)
 * - 텍스트 → 벡터 변환
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const EMBEDDING_MODEL = 'gemini-embedding-001';
const DEFAULT_DIMENSIONS = 768; // 768, 1536, 3072 지원

// Gemini API 클라이언트 초기화
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * 텍스트를 임베딩 벡터로 변환
 *
 * @param text - 임베딩할 텍스트
 * @param dimensions - 출력 벡터 차원 (768, 1536, 3072 중 선택, 기본값 768)
 * @returns 지정된 차원의 벡터
 *
 * @example
 * const embedding = await generateEmbedding('React 성능 최적화 방법');
 * // [0.123, -0.456, 0.789, ...] (768개)
 */
export async function generateEmbedding(
	text: string,
	dimensions: number = DEFAULT_DIMENSIONS,
): Promise<number[]> {
	if (!process.env.GEMINI_API_KEY) {
		throw new Error('GEMINI_API_KEY environment variable is not set');
	}

	const model = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

	const result = await model.embedContent({
		content: { parts: [{ text }], role: 'user' },
		taskType: 'RETRIEVAL_DOCUMENT',
		outputDimensionality: dimensions,
	});

	return result.embedding.values;
}

/**
 * 여러 텍스트를 배치로 임베딩
 *
 * Rate limit 고려하여 순차 처리 (delay 포함)
 *
 * @param texts - 임베딩할 텍스트 배열
 * @param delayMs - 요청 간 딜레이 (기본 100ms)
 * @param dimensions - 출력 벡터 차원 (기본값 768)
 * @returns 임베딩 벡터 배열
 */
export async function generateEmbeddingsBatch(
	texts: string[],
	delayMs = 100,
	dimensions: number = DEFAULT_DIMENSIONS,
): Promise<number[][]> {
	const embeddings: number[][] = [];

	for (const text of texts) {
		const embedding = await generateEmbedding(text, dimensions);
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
 * title + description을 조합하여 검색에 적합한 텍스트 생성
 */
export function preparePostTextForEmbedding(post: {
	title_ko?: string;
	title_en?: string;
	description_ko?: string;
	description_en?: string;
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

	// 태그
	if (post.tags && post.tags.length > 0) {
		parts.push(post.tags.join(' '));
	}

	return parts.join('\n');
}
