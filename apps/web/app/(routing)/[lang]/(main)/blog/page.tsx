import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import {
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getQueryClient, trpc } from '@/fsd/shared/index.server';
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

export const revalidate = 21600;

export async function generateStaticParams() {
	return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function Page() {
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
