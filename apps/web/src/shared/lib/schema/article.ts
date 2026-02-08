/**
 * Article 스키마 생성 - 2026년 2월 GEO/AEO 베스트 프랙티스 적용
 *
 * 핵심 변화:
 * - 저자 hasCredential, hasOccupation 추가 (E-E-A-T 강화)
 * - TechArticle 타입 지원 (기술 콘텐츠 구분)
 * - 음성 검색 최적화 CSS 셀렉터 확장
 * - AI가 인용하기 좋은 구조화된 저자 정보
 *
 * Reference:
 * - https://www.clearscope.io/blog/2026-seo-aeo-playbook
 * - https://www.superlines.io/articles/generative-engine-optimization-geo-guide
 */
import { AUTHOR, PUBLISHER, SITE_URL } from './constants';
import type { Article, ArticleWithSpeakable, WithContext } from './types';

type ArticleSchemaInput = {
	title: string;
	description?: string;
	image?: string;
	datePublished: string;
	dateModified?: string;
	slug: string;
	tags?: string[];
	category?: string;
	wordCount?: number;
	readingTimeMinutes?: number;
	lang?: string;
	// AEO/GEO 최적화 옵션
	enableSpeakable?: boolean;
	// 2026년 추가: 기술 문서 여부 (TechArticle 타입 사용)
	isTechArticle?: boolean;
};

export const createArticleSchema = ({
	title,
	description,
	image,
	datePublished,
	dateModified,
	slug,
	tags,
	category,
	wordCount,
	readingTimeMinutes,
	lang = 'ko',
	enableSpeakable = false,
	isTechArticle = false,
}: ArticleSchemaInput):
	| WithContext<Article>
	| WithContext<ArticleWithSpeakable> => {
	const baseSchema: WithContext<Article> = {
		'@context': 'https://schema.org',
		// 2026년: 기술 문서는 TechArticle 타입 사용
		'@type': isTechArticle ? 'TechArticle' : 'BlogPosting',
		headline: title,
		description:
			description ||
			(lang === 'ko'
				? `JUNG의 블로그에서 "${title}" 포스트를 읽어보세요.`
				: `Read "${title}" on JUNG's blog.`),
		image: image || `${SITE_URL}/images/og/blog-default.jpg`,
		// 2026년 강화: 저자 정보에 hasCredential, hasOccupation 포함
		author: {
			'@type': 'Person',
			name: AUTHOR.name,
			url: AUTHOR.url,
			image: AUTHOR.image,
			sameAs: [...AUTHOR.sameAs],
			// E-E-A-T 최적화: 저자 전문성 정보
			jobTitle: AUTHOR.jobTitle,
			description: AUTHOR.description,
			knowsAbout: [...AUTHOR.knowsAbout],
			// 2026년 추가: 자격/인증 정보
			hasCredential: AUTHOR.hasCredential,
			// 2026년 추가: 경력 정보
			hasOccupation: AUTHOR.hasOccupation,
		},
		publisher: {
			'@type': 'Organization',
			name: PUBLISHER.name,
			url: PUBLISHER.url,
			logo: PUBLISHER.logo,
		},
		datePublished,
		dateModified: dateModified || datePublished,
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': `${SITE_URL}/${lang}/blog/${slug}`,
		},
		keywords: tags,
		articleSection: category,
		wordCount,
		inLanguage: lang,
		// 2026년 추가: 읽기 시간 (ISO 8601 duration)
		...(readingTimeMinutes != null && {
			timeRequired: `PT${readingTimeMinutes}M`,
		}),
	};

	// 음성 검색 최적화 (Speakable) 추가 - 2026년 CSS 셀렉터 확장
	if (enableSpeakable) {
		return {
			...baseSchema,
			speakable: {
				'@type': 'SpeakableSpecification',
				cssSelector: [
					'.article-summary',
					'.tldr',
					'h2',
					'p:first-of-type',
					'.key-takeaway',
					...(lang === 'ko'
						? ['[aria-label="정의"] p', '[aria-label="요약"] ul']
						: ['[aria-label="definition"] p', '[aria-label="summary"] ul']),
					'.definition',
					'.conclusion',
				],
			},
		} as WithContext<ArticleWithSpeakable>;
	}

	return baseSchema;
};
