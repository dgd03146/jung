/**
 * HyDE (Hypothetical Document Embedding) - 가상 문서 기반 쿼리 확장
 *
 * 논문: "Precise Zero-Shot Dense Retrieval without Relevance Labels" (Gao et al., 2022)
 * 참고: arXiv:2401.06311 - 소규모 데이터셋에서 HyDE가 단순 키워드 확장보다 효과적
 *
 * 원리:
 * 1. 사용자 쿼리로부터 LLM이 "가상의 관련 문서"를 생성
 * 2. 그 가상 문서를 RETRIEVAL_DOCUMENT task type으로 임베딩
 * 3. 기존 문서 임베딩과 비교 → 같은 임베딩 공간에서 매칭되므로 더 정확
 *
 * 적용 조건: 짧은 쿼리(20자 이하)에만 적용. 긴 쿼리는 이미 의미 충분.
 * 언어: 쿼리 언어를 감지하여 해당 언어로 가상 문서 생성.
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(
	process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
);

/**
 * 쿼리에 한글이 포함되어 있는지 감지
 */
function isKorean(text: string): boolean {
	return /[\uac00-\ud7af\u1100-\u11ff\u3130-\u318f]/.test(text);
}

/**
 * HyDE: 쿼리에서 가상의 문서 텍스트를 생성
 *
 * - 짧은 쿼리(20자 이하)에만 적용
 * - 쿼리 언어를 감지하여 해당 언어로 생성
 * - 100~200자 정도의 블로그 요약 스타일
 * - 실패 시 원본 쿼리를 그대로 반환 (graceful degradation)
 */
export async function generateHypotheticalDocument(
	query: string,
): Promise<string> {
	if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) return query;

	// 긴 쿼리는 이미 의미 정보가 충분
	if (query.length > 20) return query;

	const lang = isKorean(query) ? 'ko' : 'en';

	try {
		const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

		const prompt =
			lang === 'ko'
				? `주어진 검색어에 대해, 개인 기술 블로그 글의 도입부처럼 짧은 요약문을 작성하세요.

규칙:
- 한국어로 2~3문장, 100~200자
- 실제 블로그 글 본문처럼 작성 (메타 설명 금지)
- 기술 용어와 구체적인 키워드를 자연스럽게 포함

검색어: "${query}"

요약문:`
				: `Write a short blog post introduction (2-3 sentences, 100-200 characters) for the given search query.

Rules:
- Write as actual blog content, not a meta description
- Include specific technical keywords naturally

Query: "${query}"

Summary:`;

		const result = await model.generateContent(prompt);
		const hypothetical = result.response.text().trim();

		if (!hypothetical || hypothetical.length > 500) return query;

		return hypothetical;
	} catch {
		return query;
	}
}
