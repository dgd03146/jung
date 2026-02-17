export interface ProfileData {
	personal: {
		name: string;
		title: string;
		location: string;
		email: string;
		github: string;
		linkedin?: string;
	};
	summary: Record<'ko' | 'en', string>;
	skills: {
		frontend: string[];
		backend: string[];
		tools: string[];
	};
	interests: Record<'ko' | 'en', string[]>;
}

export const profileData: ProfileData = {
	personal: {
		name: 'Jung',
		title: 'Frontend Developer',
		location: 'Seoul, Korea',
		email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
		github: 'https://github.com/dgd03146',
	},
	summary: {
		ko: '프론트엔드 개발자로서 React, Next.js, TypeScript를 주로 사용합니다. 사용자 경험과 성능 최적화에 관심이 많으며, 클린 코드와 테스트 가능한 아키텍처를 추구합니다. 이 사이트는 제가 좋아하는 것들을 모아둔 공간입니다.',
		en: 'A frontend developer who primarily works with React, Next.js, and TypeScript. Passionate about user experience and performance optimization, pursuing clean code and testable architecture. This site is a space where I collect things I love.',
	},
	skills: {
		frontend: [
			'React',
			'Next.js',
			'TypeScript',
			'Vanilla Extract',
			'React Query',
		],
		backend: ['Node.js', 'tRPC', 'Supabase', 'PostgreSQL'],
		tools: ['Git', 'Turbo', 'pnpm', 'Vercel', 'Playwright'],
	},
	interests: {
		ko: [
			'여행과 새로운 장소 발견',
			'사진 촬영',
			'기술 블로그 작성',
			'오픈소스 기여',
		],
		en: [
			'Traveling and discovering new places',
			'Photography',
			'Writing tech blog posts',
			'Contributing to open source',
		],
	},
};

export function getLocalizedProfile(locale: 'ko' | 'en') {
	return {
		...profileData,
		summary: profileData.summary[locale],
		interests: profileData.interests[locale],
	};
}
