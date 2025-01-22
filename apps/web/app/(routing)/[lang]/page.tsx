import { HomePage } from '@/fsd/views';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'JUNG',
	description:
		'프론트엔드 개발자 JUNG의 개발 이야기와 좋았던 장소들, 일상을 공유합니다.',
	openGraph: {
		title: 'JUNG (@jung)',
		description:
			'프론트엔드 개발자 JUNG의 개발 이야기와 좋았던 장소들, 일상을 공유합니다.',
		type: 'website',
		siteName: 'JUNG',
		locale: 'ko_KR',
		images: [
			{
				url: '/images/og/home.jpg',
				width: 1200,
				height: 630,
				alt: 'JUNG Website',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'JUNG',
		creator: '@jung',
		description:
			'프론트엔드 개발자 JUNG의 개발 이야기와 좋았던 장소들, 일상을 공유합니다.',
		images: ['/images/og/home.jpg'],
	},
	keywords: [
		'JUNG',
		'프론트엔드',
		'개발자',
		'개발 블로그',
		'좋은 곳',
		'일상',
		'여행',
		'frontend developer',
		'developer blog',
	],
	authors: [{ name: 'JUNG', url: 'https://your-domain.com' }],
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
		canonical: 'https://your-domain.com',
		languages: {
			en: 'https://your-domain.com/en',
			ko: 'https://your-domain.com/ko',
		},
	},
	verification: {
		google: 'your-google-verification-code',
	},
};

export default function Home() {
	return <HomePage />;
}
