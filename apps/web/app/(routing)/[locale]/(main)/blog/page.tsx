import { REVALIDATE_ONE_HOUR } from '@jung/shared/config';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import { getApiUrl, getGoogleVerificationCode } from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
import { type Locale, routing } from '@/i18n/routing';
import { BlogLayout } from './_components/BlogLayout';

export const metadata: Metadata = {
	title: 'Blog',

	keywords: ['블로그', '개발', '여행', '사진', 'JUNG', '프로그래밍'],
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
		canonical: `${getApiUrl()}/blog`,
		languages: {
			en: `${getApiUrl()}/en/blog`,
			ko: `${getApiUrl()}/ko/blog`,
		},
	},
	verification: {
		google: getGoogleVerificationCode(),
	},
};

// Revalidate every hour for fresh content with ISR
export const revalidate = REVALIDATE_ONE_HOUR;

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

interface Props {
	params: Promise<{ locale: Locale }>;
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
