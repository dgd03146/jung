import {
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { HomePage } from '@/fsd/views';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JUNG',
	description:
		'개발 이야기, 일상에서 마주친 순간들, 그리고 삶의 기록을 공유합니다.',
	openGraph: {
		title: 'JUNG (@jung)',
		description:
			'개발 이야기, 일상에서 마주친 순간들, 그리고 삶의 기록을 공유합니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JUNG',
		creator: '@jung',
		description:
			'개발 이야기, 일상에서 마주친 순간들, 그리고 삶의 기록을 공유합니다.',
	},
	keywords: [
		'JUNG',
		'프론트엔드 개발자',
		'웹 개발',
		'개발 블로그',
		'프로그래밍',
		'코딩',
		'기록',
		'일상 이야기',
		'여행 기록',
		'travel log',
		'frontend developer',
		'web development',
		'developer blog',
		'coding life',
	],
	authors: [{ name: 'JUNG', url: getApiUrl() }],
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	alternates: {
		canonical: getApiUrl(),
		languages: {
			en: `${getApiUrl()}/en`,
			ko: `${getApiUrl()}/ko`,
		},
	},
	verification: {
		google: getGoogleVerificationCode(),
	},
};

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default function Home() {
	return <HomePage />;
}
