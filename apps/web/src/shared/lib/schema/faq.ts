/**
 * FAQ 스키마 생성 - 2026년 2월 AEO 베스트 프랙티스 적용
 *
 * 핵심 변화:
 * - 답변에 저자 정보 추가 (E-E-A-T 강화)
 * - 답변 날짜 추가 (최신성 평가)
 * - AI가 FAQ를 가장 선호하는 형식으로 구조화
 *
 * Reference: https://storychief.io/blog/geo-tips-generative-engine-optimization
 */
import { AUTHOR } from './constants';
import type { FAQPage, WithContext } from './types';

type FAQItem = {
	question: string;
	answer: string;
	// 2026년 추가: 답변 날짜 (선택)
	dateCreated?: string;
};

type FAQSchemaOptions = {
	// 저자 정보 포함 여부 (기본: true)
	includeAuthor?: boolean;
	// 페이지 URL (답변 링크용)
	pageUrl?: string;
};

export const createFAQPageSchema = (
	items: FAQItem[],
	options: FAQSchemaOptions = {},
): WithContext<FAQPage> => {
	const { includeAuthor = true, pageUrl } = options;

	return {
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: items.map((item, index) => ({
			'@type': 'Question' as const,
			name: item.question,
			acceptedAnswer: {
				'@type': 'Answer' as const,
				text: item.answer,
				// 2026년 추가: 저자 정보 (AI가 신뢰성 평가 시 사용)
				...(includeAuthor && {
					author: {
						'@type': 'Person' as const,
						name: AUTHOR.name,
						url: AUTHOR.url,
						jobTitle: AUTHOR.jobTitle,
						knowsAbout: [...AUTHOR.knowsAbout],
					},
				}),
				// 2026년 추가: 답변 날짜
				...(item.dateCreated && { dateCreated: item.dateCreated }),
				// 2026년 추가: 답변 URL (앵커 링크)
				...(pageUrl && { url: `${pageUrl}#faq-${index + 1}` }),
			},
		})),
	};
};

/**
 * 블로그 콘텐츠에서 FAQ 항목 자동 추출 헬퍼
 * "Q:" 또는 "질문:" 패턴을 찾아 FAQ 구조로 변환
 */
export const extractFAQFromContent = (content: string): FAQItem[] => {
	const faqPattern =
		/(?:Q:|질문:)\s*(.+?)\r?\n(?:A:|답변:)\s*([\s\S]+?)(?=(?:\r?\n(?:Q:|질문:))|$)/g;
	const items: FAQItem[] = [];

	for (
		let match = faqPattern.exec(content);
		match !== null;
		match = faqPattern.exec(content)
	) {
		if (match[1] && match[2]) {
			items.push({
				question: match[1].trim(),
				answer: match[2].trim(),
			});
		}
	}

	return items;
};
