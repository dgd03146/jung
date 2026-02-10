import type { Metadata } from 'next';
import { getGoogleVerificationCode, SITE_URL } from '@/fsd/shared';
import { AboutPage } from '@/fsd/views';
import { type Locale, routing } from '@/i18n/routing';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const description =
		'프론트엔드 개발자 JUNG을 소개합니다. 개발에 대한 열정과 여행을 통해 얻은 경험을 공유합니다.';
	return {
		title: 'About',
		description,
		openGraph: {
			title: 'JUNG (@jung) • About Me',
			description,
			url: `${SITE_URL}/${locale}/about`,
			type: 'profile',
			siteName: 'JUNG',
			locale: 'ko_KR',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'About',
			creator: '@jung',
			description,
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

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

const Page = () => {
	return <AboutPage />;
};

export default Page;
