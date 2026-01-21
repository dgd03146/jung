import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { BLOG_DEFAULTS } from '@/fsd/entities/blog';
import {
	capitalizeFirstLetter,
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getCaller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { BlogLayout } from '../../_components/BlogLayout';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ categoryName: string; locale: string }>;
}): Promise<Metadata> {
	const { categoryName: rawCategoryName } = await params;
	const categoryName = capitalizeFirstLetter(rawCategoryName);

	const categoryDescription = `JUNG 블로그의 "${categoryName}" 카테고리 글 모음입니다.`;

	return {
		title: `${categoryName} • JUNG Blog`,
		description: categoryDescription,
		openGraph: {
			title: `${categoryName} • JUNG Blog`,
			description: categoryDescription,
			type: 'website',
			siteName: 'JUNG Blog',
			locale: 'ko_KR',
			images: [
				{
					url: '/images/og/blog-default.jpg',
					width: 1200,
					height: 630,
					alt: `${categoryName} 카테고리`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${categoryName} • JUNG Blog`,
			creator: '@jung',
			description: categoryDescription,
			images: ['/images/og/blog-default.jpg'],
		},
		authors: [{ name: 'JUNG', url: getApiUrl() }],
		keywords: [categoryName, 'JUNG Blog', '개발 블로그'],
		alternates: {
			canonical: `${getApiUrl()}/blog/categories/${categoryName}`,
			languages: {
				en: `${getApiUrl()}/en/blog/categories/${categoryName}`,
				ko: `${getApiUrl()}/ko/blog/categories/${categoryName}`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

export const revalidate = 21600;

export async function generateStaticParams() {
	const categories = await getCaller().category.getCategories({ type: 'blog' });

	const params = [];
	for (const locale of SUPPORTED_LANGS) {
		for (const category of categories) {
			params.push({
				locale,
				categoryName: category.name,
			});
		}
	}

	return params;
}

export default async function CategoryPostsPage({
	params,
}: {
	params: Promise<{ categoryName: string }>;
}) {
	const { categoryName } = await params;
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.blog.getAllPosts.infiniteQueryOptions({
			limit: BLOG_DEFAULTS.LIMIT,
			cat: categoryName,
			sort: BLOG_DEFAULTS.SORT,
			q: BLOG_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'blog' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<BlogLayout currentCategory={categoryName} />
		</HydrationBoundary>
	);
}
