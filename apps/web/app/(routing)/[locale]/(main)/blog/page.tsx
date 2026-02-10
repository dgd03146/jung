import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import { getGoogleVerificationCode, SITE_URL } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { type Locale, routing } from '@/i18n/routing';
import { BlogLayout } from './_components/BlogLayout';

interface Props {
	params: Promise<{ locale: Locale }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const description = '개발, 여행, 일상에 대한 이야기를 공유합니다.';
	return {
		title: 'Blog',
		description,
		openGraph: {
			title: 'JUNG (@jung) • Blog',
			description,
			url: `${SITE_URL}/${locale}/blog`,
			type: 'website',
			siteName: 'JUNG',
			locale: 'ko_KR',
		},
		twitter: {
			card: 'summary_large_image',
			title: 'Blog • JUNG',
			creator: '@jung',
			description,
		},
		keywords: ['블로그', '개발', '여행', '사진', 'JUNG', '프로그래밍'],
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
			canonical: `${SITE_URL}/${locale}/blog`,
			languages: {
				en: `${SITE_URL}/en/blog`,
				ko: `${SITE_URL}/ko/blog`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

// Revalidate every hour for fresh content with ISR
export const revalidate = 3600;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function Page({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const queryClient = getQueryClient();

	await queryClient.prefetchInfiniteQuery(
		trpc.blog.getAllPosts.infiniteQueryOptions({
			limit: BLOG_DEFAULTS.LIMIT,
			cat: BLOG_DEFAULTS.CATEGORY,
			sort: BLOG_DEFAULTS.SORT,
			q: BLOG_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'blog' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BlogLayout />
		</HydrationBoundary>
	);
}
