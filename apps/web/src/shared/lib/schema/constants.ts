// JSON-LD Schema Constants
// Single source of truth for site URL: delegates to getSiteUrl() in config/env.ts
// Updated: 2026-02 - Applied GEO/AEO best practices for AI search optimization

import { getSiteUrl } from '../../config/env';

// For static contexts where a function call isn't possible,
// use this constant (evaluated at module load time)
export const SITE_URL = getSiteUrl();

export const SITE_NAME = 'JUNG Archive';
export const SITE_DESCRIPTION =
	'감정, 기억, 경험을 아카이빙하는 개인 디지털 공간. 개발, 여행, 일상에 대한 이야기를 담고 있습니다.';

/**
 * 저자 정보 - 2026년 2월 GEO/AEO 베스트 프랙티스 적용
 *
 * E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) 강화:
 * - hasCredential: 자격/인증 정보
 * - hasOccupation: 경력 정보
 * - alumniOf: 학력 정보
 *
 * 2026년 핵심 변화:
 * - AI 검색 엔진(ChatGPT, Claude, Gemini)이 저자 전문성을 더 중요시
 * - Share of Model (SoM) 지표를 위한 브랜드 일관성 강화
 */
export const AUTHOR = {
	name: 'JUNG',
	url: SITE_URL,
	image: `${SITE_URL}/images/profile.jpg`,
	sameAs: [
		'https://github.com/dgd03146',
		'https://x.com/jung_dev',
		'https://www.linkedin.com/in/dgd03146',
	],
	// E-E-A-T 최적화 필드 (2026년 강화)
	jobTitle: 'Frontend Developer',
	description:
		'5년차 프론트엔드 개발자. React, Next.js, TypeScript 전문. 웹 성능 최적화와 SEO/GEO 전략에 깊은 관심.',
	knowsAbout: [
		'React',
		'Next.js',
		'TypeScript',
		'Frontend Development',
		'Web Performance',
		'SEO',
		'GEO',
		'AI Search Optimization',
	],
	workLocation: {
		'@type': 'Place' as const,
		name: 'South Korea',
		addressCountry: 'KR',
	},
	// 2026년 추가: 자격/인증 정보 (E-E-A-T 강화)
	hasCredential: [
		{
			'@type': 'EducationalOccupationalCredential' as const,
			name: 'AWS Solutions Architect',
			credentialCategory: 'certification',
		},
	],
	// 2026년 추가: 경력 정보 (경험 증명)
	hasOccupation: {
		'@type': 'Occupation' as const,
		name: 'Frontend Developer',
		occupationalCategory: 'Software Developer',
		experienceRequirements: '5+ years',
		skills: ['React', 'Next.js', 'TypeScript', 'Web Performance'],
	},
} as const;

export const PUBLISHER = {
	name: SITE_NAME,
	url: SITE_URL,
	logo: `${SITE_URL}/images/logo.png`,
} as const;

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/default.jpg`;
