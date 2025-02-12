import { AboutPage } from '@/fsd/views';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
	description:
		'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.',
	openGraph: {
		title: 'JUNG (@jung) • About Me',
		description:
			'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.',
		type: 'profile',
		siteName: 'JUNG',
		locale: 'ko_KR',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'About',
		creator: '@jung',
		description:
			'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.',
	},
	keywords: [
		'JUNG',
		'프론트엔드 개발자',
		'웹 개발',
		'React',
		'Next.js',
		'TypeScript',
		'여행',
		'frontend developer',
	],
	authors: [{ name: 'JUNG', url: 'https://your-domain.com' }],
	alternates: {
		canonical: 'https://your-domain.com/about',
		languages: {
			en: 'https://your-domain.com/en/about',
			ko: 'https://your-domain.com/ko/about',
		},
	},
};

const Page = () => {
	return <AboutPage />;
};

export default Page;
