export const SITE_CONFIG = {
	name: 'Curated by Jung',
	description: 'Frontend & AI Articles I Actually Read',
	url: import.meta.env.VITE_SITE_URL || 'https://jung-subscription.vercel.app',
	kakaoAppKey: import.meta.env.VITE_KAKAO_APP_KEY || '',
} as const;
