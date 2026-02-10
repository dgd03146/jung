import type { Metadata } from 'next';
import {
	createWebSiteSchema,
	getGoogleVerificationCode,
	SITE_URL,
} from '@/fsd/shared';
import { JsonLd } from '@/fsd/shared/ui';
import { HomePage } from '@/fsd/views';
import { type Locale, routing } from '@/i18n/routing';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const description =
		'개발 이야기, 일상에서 마주친 순간들, 그리고 삶의 기록을 공유합니다.';
	return {
		title: 'JUNG',
		description,
		openGraph: {
			title: 'JUNG (@jung)',
			description,
			type: 'website',
			siteName: 'JUNG',
			locale: 'ko_KR',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'JUNG',
			creator: '@jung',
			description,
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
		authors: [{ name: 'JUNG', url: SITE_URL }],
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
			canonical: `${SITE_URL}/${locale}`,
			languages: {
				en: `${SITE_URL}/en`,
				ko: `${SITE_URL}/ko`,
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

export default async function Home({ params }: Props) {
	const { locale } = await params;
	const websiteSchema = createWebSiteSchema({ lang: locale });

	return (
		<>
			<JsonLd data={websiteSchema} />
			<HomePage />
		</>
	);
}
