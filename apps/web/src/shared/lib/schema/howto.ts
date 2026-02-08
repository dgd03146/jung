/**
 * HowTo 스키마 생성 - 2026년 2월 AEO 베스트 프랙티스 적용
 *
 * 핵심 변화:
 * - 저자 정보 추가 (E-E-A-T 강화)
 * - 발행일/수정일 추가 (최신성 평가)
 * - 난이도 레벨 추가 (AI가 적절한 답변 선택 시 참고)
 * - 도구/재료 구조화 (HowToTool, HowToSupply)
 *
 * Reference: https://www.superlines.io/articles/generative-engine-optimization-geo-guide
 */
import { AUTHOR, SITE_URL } from './constants';
import type { HowTo, HowToStep, WithContext } from './types';

type HowToStepInput = {
	name: string;
	text: string;
	image?: string;
};

type HowToSchemaInput = {
	title: string;
	description?: string;
	image?: string;
	steps: HowToStepInput[];
	totalTimeMinutes?: number;
	tools?: string[];
	supplies?: string[];
	lang?: string;
	slug?: string;
	// 2026년 추가 필드
	datePublished?: string;
	dateModified?: string;
	educationalLevel?: 'Beginner' | 'Intermediate' | 'Advanced';
	includeAuthor?: boolean;
};

/**
 * HowTo 스키마 생성 함수
 * 튜토리얼, 가이드, 설명서 형태의 콘텐츠에 사용
 * AI 검색 엔진이 단계별 가이드를 인식할 수 있도록 구조화
 */
export const createHowToSchema = ({
	title,
	description,
	image,
	steps,
	totalTimeMinutes,
	tools,
	supplies,
	lang = 'ko',
	slug,
	datePublished,
	dateModified,
	educationalLevel,
	includeAuthor = true,
}: HowToSchemaInput): WithContext<HowTo> => {
	const baseUrl = slug ? `${SITE_URL}/${lang}/blog/${slug}` : SITE_URL;

	const formattedSteps: HowToStep[] = steps.map((step, index) => ({
		'@type': 'HowToStep',
		position: index + 1,
		name: step.name,
		text: step.text,
		image: step.image,
		url: `${baseUrl}#step-${index + 1}`,
	}));

	// 도구를 HowToTool 형식으로 구조화
	const formattedTools = tools?.map((tool) => ({
		'@type': 'HowToTool' as const,
		name: tool,
	}));

	// 재료를 HowToSupply 형식으로 구조화
	const formattedSupplies = supplies?.map((supply) => ({
		'@type': 'HowToSupply' as const,
		name: supply,
	}));

	return {
		'@context': 'https://schema.org',
		'@type': 'HowTo',
		name: title,
		description:
			description ||
			(lang === 'en'
				? `${title} step-by-step guide.`
				: `${title}에 대한 단계별 가이드입니다.`),
		image: image || `${SITE_URL}/images/og/blog-default.jpg`,
		totalTime: totalTimeMinutes ? `PT${totalTimeMinutes}M` : undefined,
		step: formattedSteps,
		tool: formattedTools,
		supply: formattedSupplies,
		// 2026년 추가: 저자 정보 (E-E-A-T 강화)
		...(includeAuthor && {
			author: {
				'@type': 'Person' as const,
				name: AUTHOR.name,
				url: AUTHOR.url,
				jobTitle: AUTHOR.jobTitle,
				knowsAbout: [...AUTHOR.knowsAbout],
			},
		}),
		// 2026년 추가: 날짜 정보 (최신성 평가)
		...(datePublished && { datePublished }),
		...(dateModified && { dateModified }),
		// 2026년 추가: 난이도 (AI가 적절한 답변 선택 시 참고)
		...(educationalLevel && { educationalLevel }),
	};
};

/**
 * 블로그 포스트의 제목(h2/h3)을 HowTo 단계로 변환하는 헬퍼
 * Markdown 콘텐츠에서 자동으로 단계를 추출할 때 사용
 */
export const extractStepsFromHeadings = (
	headings: { level: number; text: string; content: string }[],
): HowToStepInput[] => {
	return headings
		.filter((h) => h.level === 2 || h.level === 3)
		.map((h) => ({
			name: h.text,
			text: h.content,
		}));
};
