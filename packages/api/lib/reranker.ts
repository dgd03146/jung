/**
 * RRF (Reciprocal Rank Fusion) 가중치 최적화
 *
 * 2026년 2월 기준 연구 결과:
 * - LLM-as-reranker는 소규모 데이터셋에서 오히려 성능 저하 (Voyage AI, 2025.10)
 * - Gemini Flash NDCG@10 = 79.49% < baseline 81.58%
 * - 전용 reranker(Cohere rerank-2.5)가 60x 저렴하고 48x 빠름
 *
 * 따라서 이 프로젝트에서는:
 * - RRF 가중치를 vector/keyword별로 차등 적용
 * - similarity score 기반 부스트로 정밀도 향상
 */

/**
 * 가중 RRF (Weighted Reciprocal Rank Fusion)
 *
 * 기존 RRF: score = 1/(k + rank)
 * 가중 RRF: score = weight * 1/(k + rank) + similarity_boost
 *
 * vector 검색이 의미적 매칭에 더 강하므로 가중치를 높게 설정
 *
 * @param vectorResults - vector 검색 결과 (id + similarity)
 * @param keywordResults - keyword 검색 결과 (id)
 * @param options - RRF 파라미터
 * @returns 점수순 정렬된 id 배열
 */
export function weightedRRF<
	V extends { id: string | number; similarity?: number },
	K extends { id: string | number },
>(
	vectorResults: V[],
	keywordResults: K[],
	options: {
		k?: number;
		vectorWeight?: number;
		keywordWeight?: number;
		limit?: number;
	} = {},
): string[] {
	const {
		k = 60,
		vectorWeight = 0.7,
		keywordWeight = 0.3,
		limit = 10,
	} = options;

	const scores = new Map<string, number>();

	// Vector 결과 스코어링 (가중치 + similarity 부스트)
	for (let rank = 0; rank < vectorResults.length; rank++) {
		const item = vectorResults[rank];
		if (!item) continue;
		const id = String(item.id);
		const rrfScore = vectorWeight / (k + rank + 1);
		// similarity가 있으면 부스트 (0~0.1 범위)
		const similarityBoost = item.similarity ? item.similarity * 0.1 : 0;
		scores.set(id, (scores.get(id) || 0) + rrfScore + similarityBoost);
	}

	// Keyword 결과 스코어링
	for (let rank = 0; rank < keywordResults.length; rank++) {
		const item = keywordResults[rank];
		if (!item) continue;
		const id = String(item.id);
		const rrfScore = keywordWeight / (k + rank + 1);
		scores.set(id, (scores.get(id) || 0) + rrfScore);
	}

	// 점수 내림차순 정렬
	return [...scores.entries()]
		.sort((a, b) => b[1] - a[1])
		.slice(0, limit)
		.map(([id]) => id);
}
