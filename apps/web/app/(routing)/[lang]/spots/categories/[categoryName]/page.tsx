import { SPOT_DEFAULTS } from '@/fsd/entities/spot';

import {
	SUPPORTED_LANGS,
	capitalizeFirstLetter,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { SpotsLayout } from '../../_components/SpotsLayout';

export async function generateMetadata({
	params,
}: {
	params: { categoryName: string; lang: string };
}): Promise<Metadata> {
	const categoryName = capitalizeFirstLetter(params.categoryName);

	const categoryDescription = `JUNG 여행지의 "${categoryName}" 카테고리 글 모음입니다.`;

	return {
		title: `${categoryName} • JUNG Spot`,
		description: categoryDescription,
		openGraph: {
			title: `${categoryName} • JUNG Spot`,
			description: categoryDescription,
			type: 'website',
			siteName: 'JUNG Spot',
			locale: 'ko_KR',
			images: [
				{
					url: '/images/og/spot-default.jpg',
					width: 1200,
					height: 630,
					alt: `${categoryName} 카테고리`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${categoryName} • JUNG Spot`,
			creator: '@jung',
			description: categoryDescription,
			images: ['/images/og/spot-default.jpg'],
		},
		authors: [{ name: 'JUNG', url: getApiUrl() }],
		keywords: [categoryName, 'JUNG Spot', '여행지 추천'],
		alternates: {
			canonical: `${getApiUrl()}/spots/categories/${categoryName}`,
			languages: {
				en: `${getApiUrl()}/en/spots/categories/${categoryName}`,
				ko: `${getApiUrl()}/ko/spots/categories/${categoryName}`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

export const revalidate = 21600;

export async function generateStaticParams() {
	const categories = await caller.category.getCategories({ type: 'spots' });

	const params = [];
	for (const lang of SUPPORTED_LANGS) {
		for (const category of categories) {
			params.push({
				lang,
				categoryName: category.name,
			});
		}
	}

	return params;
}

export default async function CategorySpotsPage({
	params,
}: {
	params: { categoryName: string };
}) {
	const queryClient = getQueryClient();
	const categoryName = params.categoryName;

	queryClient.prefetchInfiniteQuery(
		trpc.spot.getAllSpots.infiniteQueryOptions({
			limit: SPOT_DEFAULTS.LIMIT,
			cat: categoryName,
			sort: SPOT_DEFAULTS.SORT,
			q: SPOT_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'spots' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<SpotsLayout currentCategory={categoryName} />
		</HydrationBoundary>
	);
}
