import { PlaceDetailSkeleton } from '@/fsd/entities/place';
import { PlaceViewProvider } from '@/fsd/features/place';
import {
	SUPPORTED_LANGS,
	getApiUrl,
	getGoogleVerificationCode,
} from '@/fsd/shared';
import { caller, getQueryClient, trpc } from '@/fsd/shared/index.server';

import { PLACE_DEFAULTS } from '@/fsd/entities/place';

import { PlaceDetailContent } from '@/fsd/views';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { Metadata } from 'next';
import { Suspense } from 'react';

export async function generateMetadata({
	params,
}: {
	params: { id: string; lang: string };
}): Promise<Metadata> {
	try {
		const place = await caller.place.getPlaceById(params.id);

		if (!place) {
			return {
				title: 'Place Not Found',
				description: '요청하신 스팟을 찾을 수 없습니다.',
				robots: { index: false },
			};
		}

		return {
			title: `${place.title}`,
			description:
				place.description ||
				`${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
			openGraph: {
				title: `${place.title}`,
				description:
					place.description ||
					`	${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				type: 'article',
				publishedTime: place.created_at,
				modifiedTime: place.updated_at,
				authors: ['JUNG'],
				siteName: 'JUNG Travel Places',
				locale: 'ko_KR',
				images: [
					{
						url: place.photos[0]?.url || '/images/og/place-default.jpg',
						width: 1200,
						height: 630,
						alt: `${place.title}`,
					},
				],
			},
			twitter: {
				card: 'summary_large_image',
				title: `${place.title}`,
				creator: '@jung',
				description:
					place.description ||
					`${place.title}의 상세 정보와 추천 포인트를 확인해보세요.`,
				images: [place.photos[0]?.url || '/images/og/place-default.jpg'],
			},
			keywords: [
				place.title,
				place.category,
				'여행',
				'여행지 추천',
				'travel place',
				...(place.tags || []),
			].filter(Boolean),
			alternates: {
				canonical: `${getApiUrl()}/places/${params.id}`,
				languages: {
					en: `${getApiUrl()}/en/places/${params.id}`,
					ko: `${getApiUrl()}/ko/places/${params.id}`,
				},
			},
			verification: {
				google: getGoogleVerificationCode(),
			},
			authors: [{ name: 'JUNG', url: getApiUrl() }],
		};
	} catch (error) {
		console.error('Error generating metadata:', error);

		return {
			title: 'Place',
			description: 'JUNG이 추천하는 스팟을 확인해보세요.',
			robots: { index: false },
		};
	}
}

export const revalidate = 21600;

export async function generateStaticParams() {
	const places = await caller.place.getAllPlaces({
		limit: PLACE_DEFAULTS.LIMIT,
		sort: PLACE_DEFAULTS.SORT,
		cat: PLACE_DEFAULTS.CAT,
		q: PLACE_DEFAULTS.QUERY,
	});

	const popularPlaceIds = places.items.map((place) => place.id);

	const params = [];
	for (const lang of SUPPORTED_LANGS) {
		for (const id of popularPlaceIds) {
			params.push({ lang, id });
		}
	}

	return params;
}

export default async function Page({ params }: { params: { id: string } }) {
	const placeId = params.id;

	const queryClient = getQueryClient();
	queryClient.prefetchQuery(trpc.place.getPlaceById.queryOptions(placeId));

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<PlaceViewProvider>
				<Suspense fallback={<PlaceDetailSkeleton />}>
					<PlaceDetailContent placeId={placeId} />
				</Suspense>
			</PlaceViewProvider>
		</HydrationBoundary>
	);
}
