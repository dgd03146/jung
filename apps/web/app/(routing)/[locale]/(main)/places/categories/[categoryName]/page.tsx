import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { PLACE_DEFAULTS } from '@/fsd/entities/place';
import {
	capitalizeFirstLetter,
	getApiUrl,
	getGoogleVerificationCode,
	SUPPORTED_LANGS,
} from '@/fsd/shared';
import { getCaller, getQueryClient, trpc } from '@/fsd/shared/index.server';
import { PlacesLayout } from '../../_components/PlacesLayout';

export async function generateMetadata({
	params,
}: {
	params: Promise<{ categoryName: string; locale: string }>;
}): Promise<Metadata> {
	const { categoryName: rawCategoryName } = await params;
	const categoryName = capitalizeFirstLetter(rawCategoryName);

	const categoryDescription = `JUNG 여행지의 "${categoryName}" 카테고리 글 모음입니다.`;

	return {
		title: `${categoryName} • JUNG Place`,
		description: categoryDescription,
		openGraph: {
			title: `${categoryName} • JUNG Place`,
			description: categoryDescription,
			type: 'website',
			siteName: 'JUNG Place',
			locale: 'ko_KR',
			images: [
				{
					url: '/images/og/place-default.jpg',
					width: 1200,
					height: 630,
					alt: `${categoryName} 카테고리`,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title: `${categoryName} • JUNG Place`,
			creator: '@jung',
			description: categoryDescription,
			images: ['/images/og/place-default.jpg'],
		},
		authors: [{ name: 'JUNG', url: getApiUrl() }],
		keywords: [categoryName, 'JUNG Place', '여행지 추천'],
		alternates: {
			canonical: `${getApiUrl()}/places/categories/${categoryName}`,
			languages: {
				en: `${getApiUrl()}/en/places/categories/${categoryName}`,
				ko: `${getApiUrl()}/ko/places/categories/${categoryName}`,
			},
		},
		verification: {
			google: getGoogleVerificationCode(),
		},
	};
}

export const revalidate = 0;

export async function generateStaticParams() {
	const categories = await getCaller().category.getCategories({
		type: 'places',
	});

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

export default async function CategoryPlacesPage({
	params,
}: {
	params: Promise<{ categoryName: string }>;
}) {
	const { categoryName } = await params;
	const queryClient = getQueryClient();

	queryClient.prefetchInfiniteQuery(
		trpc.place.getAllPlaces.infiniteQueryOptions({
			limit: PLACE_DEFAULTS.LIMIT,
			cat: categoryName,
			sort: PLACE_DEFAULTS.SORT,
			q: PLACE_DEFAULTS.QUERY,
		}),
	);

	queryClient.prefetchQuery(
		trpc.category.getCategories.queryOptions({ type: 'places' }),
	);

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PlacesLayout currentCategory={categoryName} />
		</HydrationBoundary>
	);
}
