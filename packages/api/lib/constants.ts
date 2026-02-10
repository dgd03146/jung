/**
 * Reciprocal Rank Fusion (RRF) k parameter.
 * Controls how much weight is given to higher-ranked items.
 * Higher k = more equal weighting across ranks.
 * Common values: 60 (default), 20-100 range.
 * Formula: score = 1 / (k + rank)
 */
export const RRF_K = 60;

/**
 * Weighted RRF: vector vs keyword 가중치
 *
 * vector 검색이 의미적 매칭에 더 강하므로 가중치를 높게 설정.
 * 기존 동일 가중치(0.5/0.5) 대비 vector 우선(0.7/0.3)으로
 * 시맨틱 관련성이 높은 결과가 상위에 올라옴.
 */
export const VECTOR_WEIGHT = 0.7;
export const KEYWORD_WEIGHT = 0.3;

/**
 * Vector 검색 similarity threshold.
 *
 * pgvector match 함수에서 이 값 이하인 결과는 DB 레벨에서 제거.
 * 0.3(기존) → 0.4로 올려 노이즈 감소. Hybrid 검색이므로
 * vector에서 놓친 결과는 keyword 검색이 보완함.
 */
export const MATCH_THRESHOLD = 0.4;

/**
 * 동적 similarity gap 필터링.
 *
 * 1위 결과와의 similarity 차이가 이 값 이상이면 결과에서 제외.
 * 예: 1위 similarity=0.85, gap=0.3이면 0.55 미만 결과 제거.
 * 추상적 쿼리에서 관련 없는 결과를 자동 필터링.
 */
export const SIMILARITY_GAP_THRESHOLD = 0.3;

/**
 * Gemini embedding model for vector search.
 * gemini-embedding-001: 3072 dimensions (high accuracy semantic search)
 */
export const EMBEDDING_MODEL = 'gemini-embedding-001';

/**
 * Escapes special characters for PostgREST ilike/like patterns.
 * Prevents SQL injection via wildcard manipulation.
 */
export function escapePostgrestPattern(input: string): string {
	return input
		.replace(/\\/g, '\\\\') // Escape backslashes first
		.replace(/%/g, '\\%') // Escape percent signs
		.replace(/_/g, '\\_'); // Escape underscores
}
