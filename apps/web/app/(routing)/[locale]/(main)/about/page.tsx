import type { Metadata } from 'next';
import {
	getGoogleVerificationCode,
	SITE_URL,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { AboutPage } from '@/fsd/views';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ locale: string }>;
}): Promise<Metadata> {
	const { locale } = await params;

	return {
		title: 'About',
		description:
			'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.',
		openGraph: {
			title: 'JUNG (@jung) • About Me',
			description:
				'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.',
			type: 'profile',
			siteName: 'JUNG',
			locale: locale === 'ko' ? 'ko_KR' : 'en_US',
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
		authors: [{ name: 'JUNG', url: SITE_URL }],
		alternates: {
			canonical: `${SITE_URL}/${locale}/about`,
			languages: {
				en: `${SITE_URL}/en/about`,
				ko: `${SITE_URL}/ko/about`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((locale) => ({ locale }));
}

const Page = () => {
	return <AboutPage />;
};

export default Page;
