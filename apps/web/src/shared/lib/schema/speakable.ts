import type { SpeakableSpecification } from './types';

/**
 * SpeakableSpecification 생성 함수
 * 음성 검색(Google Assistant, Siri, Alexa) 최적화를 위한 스키마
 *
 * AI 검색 엔진이 콘텐츠의 핵심 부분을 음성으로 읽어줄 때 사용
 * "질문하면 바로 답이 나오는" 콘텐츠 구조 지원
 */

type SpeakableType = 'article' | 'faq' | 'howto';

const SPEAKABLE_SELECTORS: Record<SpeakableType, string[]> = {
	article: [
		'.article-summary', // 글 첫머리 3줄 요약
		'h2', // 주요 소제목
		'p:first-of-type', // 각 섹션의 첫 문단
		'.key-takeaway', // 핵심 요점
	],
	faq: [
		'.faq-question', // FAQ 질문
		'.faq-answer', // FAQ 답변
		'h2', // 섹션 제목
	],
	howto: [
		'.howto-step', // 각 단계
		'.howto-title', // 단계 제목
		'h2', // 주요 단계 제목
		'.step-description', // 단계 설명
	],
};

export const createSpeakableSpecification = (
	type: SpeakableType = 'article',
	customSelectors?: string[],
): SpeakableSpecification => {
	const selectors = customSelectors || SPEAKABLE_SELECTORS[type];

	return {
		'@type': 'SpeakableSpecification',
		cssSelector: selectors,
	};
};

/**
 * Article 스키마에 Speakable을 추가하는 헬퍼
 * 기존 Article 스키마와 함께 사용
 */
export const withSpeakable = <T extends object>(
	schema: T,
	type: SpeakableType = 'article',
): T & { speakable: SpeakableSpecification } => {
	return {
		...schema,
		speakable: createSpeakableSpecification(type),
	};
};
